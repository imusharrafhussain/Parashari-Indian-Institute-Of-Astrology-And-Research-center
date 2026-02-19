import express from 'express';
import Module from '../models/Module.js';
import Course from '../models/Course.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import { requirePermission } from '../middleware/permissions.js';

const router = express.Router();

/**
 * GET /api/admin/modules
 * List all modules or filter by course
 */
router.get('/', requireAdmin, requirePermission('courses.view'), async (req, res) => {
    try {
        const { courseId } = req.query;

        const filter = courseId ? { courseId } : {};

        const modules = await Module.find(filter)
            .populate('courseId', 'title slug')
            .populate('createdBy', 'name email')
            .sort({ orderIndex: 1 });

        res.json({
            success: true,
            data: modules
        });
    } catch (error) {
        console.error('List modules error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch modules' });
    }
});

/**
 * GET /api/admin/modules/:id
 * Get single module
 */
router.get('/:id', requireAdmin, requirePermission('courses.view'), async (req, res) => {
    try {
        const module = await Module.findById(req.params.id)
            .populate('courseId', 'title slug')
            .populate('createdBy', 'name email');

        if (!module) {
            return res.status(404).json({ success: false, error: 'Module not found' });
        }

        res.json({ success: true, data: module });
    } catch (error) {
        console.error('Get module error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch module' });
    }
});

/**
 * POST /api/admin/courses/:courseId/modules
 * Create new module under a course
 */
router.post('/course/:courseId', requireAdmin, requirePermission('courses.create'), async (req, res) => {
    try {
        // Verify course exists
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ success: false, error: 'Course not found' });
        }

        // Get next order index
        const lastModule = await Module.findOne({ courseId: req.params.courseId })
            .sort({ orderIndex: -1 });

        const moduleData = {
            ...req.body,
            courseId: req.params.courseId,
            orderIndex: req.body.orderIndex ?? (lastModule ? lastModule.orderIndex + 1 : 0),
            createdBy: req.user._id,
            updatedBy: req.user._id
        };

        const module = await Module.create(moduleData);

        res.status(201).json({
            success: true,
            data: module,
            message: 'Module created successfully'
        });
    } catch (error) {
        console.error('Create module error:', error);
        res.status(500).json({ success: false, error: 'Failed to create module' });
    }
});

/**
 * PUT /api/admin/modules/:id
 * Update module
 */
router.put('/:id', requireAdmin, requirePermission('courses.edit'), async (req, res) => {
    try {
        const oldModule = await Module.findById(req.params.id);
        if (!oldModule) {
            return res.status(404).json({ success: false, error: 'Module not found' });
        }

        const module = await Module.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedBy: req.user._id },
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            data: module,
            message: 'Module updated successfully'
        });
    } catch (error) {
        console.error('Update module error:', error);
        res.status(500).json({ success: false, error: 'Failed to update module' });
    }
});

/**
 * DELETE /api/admin/modules/:id
 * Delete module
 */
router.delete('/:id', requireAdmin, requirePermission('courses.delete'), async (req, res) => {
    try {
        const module = await Module.findById(req.params.id);
        if (!module) {
            return res.status(404).json({ success: false, error: 'Module not found' });
        }

        await Module.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Module deleted successfully'
        });
    } catch (error) {
        console.error('Delete module error:', error);
        res.status(500).json({ success: false, error: 'Failed to delete module' });
    }
});

/**
 * POST /api/admin/modules/bulk-reorder
 * Bulk reorder modules
 */
router.post('/bulk-reorder', requireAdmin, requirePermission('courses.edit'), async (req, res) => {
    try {
        const { orders } = req.body; // [{ id, orderIndex }]

        const bulkOps = orders.map(({ id, orderIndex }) => ({
            updateOne: {
                filter: { _id: id },
                update: { orderIndex, updatedBy: req.user._id }
            }
        }));

        await Module.bulkWrite(bulkOps);

        res.json({
            success: true,
            message: `${orders.length} modules reordered successfully`
        });
    } catch (error) {
        console.error('Bulk reorder modules error:', error);
        res.status(500).json({ success: false, error: 'Failed to reorder modules' });
    }
});

export default router;
