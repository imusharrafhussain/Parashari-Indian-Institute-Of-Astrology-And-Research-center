import express from 'express';
import User from '../models/User.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import { requirePermission } from '../middleware/permissions.js';

const router = express.Router();

/**
 * GET /api/admin/users
 * List all users with filtering
 */
router.get('/', requireAdmin, requirePermission('users.view'), async (req, res) => {
    try {
        const {
            page = 1,
            limit = 20,
            role,
            isActive,
            search
        } = req.query;

        const filter = {};
        if (role) filter.role = role;
        if (isActive !== undefined) filter.isActive = isActive === 'true';
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;
        const users = await User.find(filter)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await User.countDocuments(filter);

        res.json({
            success: true,
            data: users,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('List users error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch users' });
    }
});

/**
 * GET /api/admin/users/:id
 * Get single user
 */
router.get('/:id', requireAdmin, requirePermission('users.view'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({ success: true, data: user });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch user' });
    }
});

/**
 * POST /api/admin/users
 * Create new user (admin/student)
 */
router.post('/', requireAdmin, requirePermission('users.create'), async (req, res) => {
    try {
        const userData = {
            ...req.body,
            createdBy: req.user._id
        };

        const user = await User.create(userData);

        // Log action
        await logAdminAction({
            adminId: req.user._id,
            action: 'create',
            targetModel: 'User',
            targetId: user._id,
            req
        });

        res.status(201).json({
            success: true,
            data: user,
            message: 'User created successfully'
        });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({
            success: false,
            error: error.code === 11000 ? 'Email already exists' : 'Failed to create user'
        });
    }
});

/**
 * PUT /api/admin/users/:id
 * Update user
 */
router.put('/:id', requireAdmin, requirePermission('users.edit'), async (req, res) => {
    try {
        const oldUser = await User.findById(req.params.id);
        if (!oldUser) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Don't allow changing password via this endpoint
        const { password, ...updateData } = req.body;
        updateData.updatedBy = req.user._id;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        // Log action
        await logAdminAction({
            adminId: req.user._id,
            action: 'update',
            targetModel: 'User',
            targetId: user._id,
            req
        });

        res.json({
            success: true,
            data: user,
            message: 'User updated successfully'
        });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ success: false, error: 'Failed to update user' });
    }
});

/**
 * DELETE /api/admin/users/:id
 * Delete user
 */
router.delete('/:id', requireAdmin, requirePermission('users.delete'), async (req, res) => {
    try {
        // Prevent deleting yourself
        if (req.params.id === req.user._id.toString()) {
            return res.status(400).json({ success: false, error: 'Cannot delete your own account' });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        await User.findByIdAndDelete(req.params.id);

        // Log action
        await logAdminAction({
            adminId: req.user._id,
            action: 'delete',
            targetModel: 'User',
            targetId: req.params.id,
            req
        });

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ success: false, error: 'Failed to delete user' });
    }
});

/**
 * PATCH /api/admin/users/:id/toggle-status
 * Activate/deactivate user
 */
router.patch('/:id/toggle-status', requireAdmin, requirePermission('users.edit'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        user.isActive = !user.isActive;
        user.updatedBy = req.user._id;
        await user.save();

        // Log action
        await logAdminAction({
            adminId: req.user._id,
            action: 'update',
            targetModel: 'User',
            targetId: user._id,
            changes: { field: 'isActive', value: user.isActive },
            req
        });

        res.json({
            success: true,
            data: user,
            message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`
        });
    } catch (error) {
        console.error('Toggle status error:', error);
        res.status(500).json({ success: false, error: 'Failed to update user status' });
    }
});

/**
 * PATCH /api/admin/users/:id/role
 * Change user role
 */
router.patch('/:id/role', requireAdmin, async (req, res) => {
    try {
        // Only super-admin can change roles
        if (req.user.role !== 'super-admin') {
            return res.status(403).json({ success: false, error: 'Only super-admin can change user roles' });
        }

        const { role, permissions } = req.body;

        if (!['student', 'admin', 'super-admin'].includes(role)) {
            return res.status(400).json({ success: false, error: 'Invalid role' });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        user.role = role;
        if (permissions) {
            user.permissions = permissions;
        }
        user.updatedBy = req.user._id;
        await user.save();

        // Log action
        await logAdminAction({
            adminId: req.user._id,
            action: 'update',
            targetModel: 'User',
            targetId: user._id,
            changes: { field: 'role', value: role },
            req
        });

        res.json({
            success: true,
            data: user,
            message: 'User role updated successfully'
        });
    } catch (error) {
        console.error('Update role error:', error);
        res.status(500).json({ success: false, error: 'Failed to update user role' });
    }
});

export default router;
