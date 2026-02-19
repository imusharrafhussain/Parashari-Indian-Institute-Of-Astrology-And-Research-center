import express from 'express';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Module from '../models/Module.js';
import Lesson from '../models/Lesson.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

/**
 * GET /api/admin/dashboard/stats
 * Get dashboard statistics
 */
router.get('/stats', requireAdmin, async (req, res) => {
    try {
        // Count documents
        const [
            totalUsers,
            totalStudents,
            totalAdmins,
            totalCourses,
            publishedCourses,
            draftCourses,
            freeCourses,
            paidCourses,
            totalModules,
            totalLessons
        ] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ role: 'student' }),
            User.countDocuments({ role: { $in: ['admin', 'super-admin'] } }),
            Course.countDocuments(),
            Course.countDocuments({ status: 'published' }),
            Course.countDocuments({ status: 'draft' }),
            Course.countDocuments({ accessType: 'free' }),
            Course.countDocuments({ accessType: 'paid' }),
            Module.countDocuments(),
            Lesson.countDocuments()
        ]);

        // Get recent users (last 7 days)
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const newUsersThisWeek = await User.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        // Get active users (logged in last 30 days)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const activeUsers = await User.countDocuments({
            lastLogin: { $gte: thirtyDaysAgo }
        });

        res.json({
            success: true,
            data: {
                users: {
                    total: totalUsers,
                    students: totalStudents,
                    admins: totalAdmins,
                    newThisWeek: newUsersThisWeek,
                    activeThisMonth: activeUsers
                },
                courses: {
                    total: totalCourses,
                    published: publishedCourses,
                    draft: draftCourses,
                    free: freeCourses,
                    paid: paidCourses
                },
                content: {
                    modules: totalModules,
                    lessons: totalLessons
                }
            }
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch dashboard stats' });
    }
});

/**
 * GET /api/admin/dashboard/recent-courses
 * Get recently created/updated courses
 */
router.get('/recent-courses', requireAdmin, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;

        const courses = await Course.find()
            .populate('createdBy', 'name email')
            .sort({ updatedAt: -1 })
            .limit(limit);

        res.json({
            success: true,
            data: courses
        });
    } catch (error) {
        console.error('Recent courses error:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch recent courses' });
    }
});

export default router;
