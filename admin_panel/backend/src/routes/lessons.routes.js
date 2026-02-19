import express from 'express';
import Lesson from '../models/Lesson.js';
import Module from '../models/Module.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import { requirePermission } from '../middleware/permissions.js';
import { generateLessonPaths } from '../services/pathGenerator.js';

const router = express.Router();

/**
 * GET /api/admin/lessons
 * List lessons with optional filtering
 */
router.get('/', requireAdmin, requirePermission('courses.view'), async (req, res) => {
    try {
        const { moduleId } = req.query;

        const filter = moduleId ? { moduleId } : {};

        const lessons = await Lesson.find(filter)
            .populate('moduleId', 'title slug courseId')
            .populate('uploadedBy', 'name email')
            .sort({ orderIndex: 1 });

        res.json({
            success: true,
            data: lessons
        });
    } catch (error) {
        console.error('List lessons error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch lessons' });
    }
});

/**
 * GET /api/admin/lessons/:id
 * Get single lesson
 */
router.get('/:id', requireAdmin, requirePermission('courses.view'), async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id)
            .populate('moduleId', 'title slug courseId')
            .populate('uploadedBy', 'name email');

        if (!lesson) {
            return res.status(404).json({ success: false, error: 'Lesson not found' });
        }

        res.json({ success: true, data: lesson });
    } catch (error) {
        console.error('Get lesson error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch lesson' });
    }
});

/**
 * POST /api/admin/modules/:moduleId/lessons
 * Create new lesson
 */
router.post('/module/:moduleId', requireAdmin, requirePermission('courses.create'), async (req, res) => {
    try {
        // Verify module exists
        const module = await Module.findById(req.params.moduleId).populate('courseId');
        if (!module) {
            return res.status(404).json({ success: false, error: 'Module not found' });
        }

        // Get next order index
        const lastLesson = await Lesson.findOne({ moduleId: req.params.moduleId })
            .sort({ orderIndex: -1 });

        const lessonData = {
            ...req.body,
            moduleId: req.params.moduleId,
            orderIndex: req.body.orderIndex ?? (lastLesson ? lastLesson.orderIndex + 1 : 0),
            uploadedBy: req.user._id,
            updatedBy: req.user._id
        };

        const lesson = await Lesson.create(lessonData);

        // Auto-generate paths for this lesson
        const paths = await generateLessonPaths(lesson._id);
        lesson.videoR2Path = paths.videoPath;
        await lesson.save();

        res.status(201).json({
            success: true,
            data: lesson,
            paths, // Return generated paths so admin knows where to upload
            message: 'Lesson created successfully'
        });
    } catch (error) {
        console.error('Create lesson error:', error);
        res.status(500).json({ success: false, error: error.message || 'Failed to create lesson' });
    }
});

/**
 * PUT /api/admin/lessons/:id
 * Update lesson
 */
router.put('/:id', requireAdmin, requirePermission('courses.edit'), async (req, res) => {
    try {
        const oldLesson = await Lesson.findById(req.params.id);
        if (!oldLesson) {
            return res.status(404).json({ success: false, error: 'Lesson not found' });
        }

        const lesson = await Lesson.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedBy: req.user._id },
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            data: lesson,
            message: 'Lesson updated successfully'
        });
    } catch (error) {
        console.error('Update lesson error:', error);
        res.status(500).json({ success: false, error: 'Failed to update lesson' });
    }
});

/**
 * DELETE /api/admin/lessons/:id
 * Delete lesson
 */
router.delete('/:id', requireAdmin, requirePermission('courses.delete'), async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).json({ success: false, error: 'Lesson not found' });
        }

        await Lesson.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Lesson deleted successfully'
        });
    } catch (error) {
        console.error('Delete lesson error:', error);
        res.status(500).json({ success: false, error: 'Failed to delete lesson' });
    }
});

/**
 * POST /api/admin/lessons/:id/attach-resource
 * Attach resource (PDF, eBook) to lesson
 */
router.post('/:id/attach-resource', requireAdmin, requirePermission('media.upload'), async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).json({ success: false, error: 'Lesson not found' });
        }

        const { title, type, r2Path, size, pages, isDownloadable } = req.body;

        lesson.resources.push({
            title,
            type,
            r2Path,
            size,
            pages,
            isDownloadable
        });

        await lesson.save();

        res.json({
            success: true,
            data: lesson,
            message: 'Resource attached successfully'
        });
    } catch (error) {
        console.error('Attach resource error:', error);
        res.status(500).json({ success: false, error: 'Failed to attach resource' });
    }
});

/**
 * DELETE /api/admin/lessons/:lessonId/resources/:resourceId
 * Remove resource from lesson
 */
router.delete('/:lessonId/resources/:resourceId', requireAdmin, requirePermission('courses.edit'), async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.lessonId);
        if (!lesson) {
            return res.status(404).json({ success: false, error: 'Lesson not found' });
        }

        lesson.resources = lesson.resources.filter(
            r => r._id.toString() !== req.params.resourceId
        );

        await lesson.save();

        res.json({
            success: true,
            data: lesson,
            message: 'Resource removed successfully'
        });
    } catch (error) {
        console.error('Remove resource error:', error);
        res.status(500).json({ success: false, error: 'Failed to remove resource' });
    }
});

export default router;
