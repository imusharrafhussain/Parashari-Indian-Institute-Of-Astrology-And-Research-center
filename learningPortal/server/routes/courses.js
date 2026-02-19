import express from 'express';
import Course from '../models/Course.js';
import User from '../models/User.js';
import Module from '../models/Module.js';
import Video from '../models/Video.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all courses (public)
router.get('/', async (req, res) => {
    try {
        console.log('📚 GET /api/courses - Fetching all courses...');
        const courses = await Course.find({ active: true }).select('-videoKey');
        console.log(`✅ Found ${courses.length} courses`);
        res.json({ courses });
    } catch (error) {
        console.error('❌ Fetch courses error:', error.message);
        console.error(error.stack);
        res.status(500).json({ error: 'Failed to fetch courses', details: error.message });
    }
});

// Get user's enrolled courses
router.get('/my-courses', authMiddleware, async (req, res) => {
    try {
        // GLOBAL OPEN ACCESS MODE: Return ALL courses
        const ACCESS_MODE = process.env.ACCESS_MODE || 'OPEN';

        if (ACCESS_MODE === 'OPEN') {
            const allCourses = await Course.find({ active: true }).populate('categoryId');
            return res.json({
                courses: allCourses,
                subscriptionStatus: 'active'
            });
        }

        // Logic for filtered courses (Legacy/Future)
        // const user = await User.findById(req.userId).populate('enrolledCourses');
        const allCourses = await Course.find({ active: true }).populate('categoryId');
        res.json({
            courses: allCourses,
            subscriptionStatus: 'active'
        });

    } catch (error) {
        console.error('Fetch my courses error:', error);
        res.status(500).json({ error: 'Failed to fetch enrolled courses' });
    }
});

// Get course details with access check
router.get('/:courseId', authMiddleware, async (req, res) => {
    try {
        const { courseId } = req.params;
        const ACCESS_MODE = process.env.ACCESS_MODE || 'OPEN';

        // 1. Fetch Course
        const course = await Course.findById(courseId);
        if (!course) {
            console.warn(`Course not found: ${courseId}`);
            return res.status(404).json({ error: 'Course not found' });
        }

        // 2. Fetch User (needed for logs or future checks)
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // 3. Access Control
        if (ACCESS_MODE !== 'OPEN') {
            if (course.isSubscriptionBased) {
                // if (user.subscriptionStatus !== 'active') return res.status(403)...
            }
            // Check enrollment logic here if not OPEN
        }

        // 4. Content Retrieval & Hierarchy Assembly
        // Fetch Modules
        const modules = await Module.find({ courseId: course._id, active: true }).sort('orderIndex');

        // Fetch Videos for those modules
        const moduleIds = modules.map(m => m._id);
        const videos = await Video.find({ moduleId: { $in: moduleIds }, active: true }).sort('orderIndex');

        // Nest videos under modules
        const courseContent = modules.map(module => {
            const moduleVideos = videos.filter(v => v.moduleId.toString() === module._id.toString());
            return {
                ...module.toObject(),
                videos: moduleVideos
            };
        });

        console.log(`✅ Served Course: ${course.title} to User: ${req.userId} (Mode: ${ACCESS_MODE})`);

        res.json({
            course: {
                ...course.toObject(),
                modules: courseContent
            }
        });

    } catch (error) {
        console.error('Fetch course detail error:', error);
        res.status(500).json({ error: 'Failed to fetch course detail', details: error.message });
    }
});

export default router;
