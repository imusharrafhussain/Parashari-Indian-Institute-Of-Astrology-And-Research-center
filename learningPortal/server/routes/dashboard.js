import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import User from '../models/User.js';
import Course from '../models/Course.js';
import ProgressV2 from '../models/ProgressV2.js';

const router = express.Router();

router.get('/summary', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        console.log('[Dashboard] Fetching summary for userId:', userId);

        // 1. Fetch User from USER_DB (separate connection)
        let user = null;
        try {
            user = await User.findById(userId).select('name email isPremium');
            console.log('[Dashboard] User found:', user?.name);
        } catch (userErr) {
            console.error('[Dashboard] User fetch error:', userErr.message);
        }

        // If user not found, return a graceful fallback with public data
        if (!user) {
            console.warn('[Dashboard] User not found - returning public summary');
        }

        // 2. Fetch all published/active courses (one query)
        let allCourses = [];
        try {
            allCourses = await Course.find({ active: true }).select('title thumbnail price isPublished');
            console.log('[Dashboard] Courses found:', allCourses.length);
        } catch (courseErr) {
            console.error('[Dashboard] Course fetch error:', courseErr.message);
        }

        // 3. Fetch all user progress documents (one query)
        let allProgress = [];
        try {
            allProgress = await ProgressV2.find({ userId });
            console.log('[Dashboard] Progress docs found:', allProgress.length);
        } catch (progressErr) {
            console.error('[Dashboard] Progress fetch error:', progressErr.message);
        }

        // 4. Calculate Stats
        let lessonsCompleted = 0;
        let totalProgressPercent = 0;
        let startedCoursesCount = 0;
        let incompleteContent = [];

        allProgress.forEach(progress => {
            if (progress.contentProgress && typeof progress.contentProgress === 'object') {
                // contentProgress is Mixed type (plain object), so use Object.entries
                Object.entries(progress.contentProgress).forEach(([key, val]) => {
                    if (val && val.status === 'COMPLETED') {
                        lessonsCompleted++;
                    } else if (val) {
                        incompleteContent.push({
                            courseId: progress.courseId,
                            lessonId: key,
                            progressPercent: val.progressPercent || 0,
                        });
                    }
                });
            }
            if (progress.progressPercent > 0) {
                totalProgressPercent += progress.progressPercent;
                startedCoursesCount++;
            }
        });

        const overallProgress = startedCoursesCount > 0
            ? Math.round(totalProgressPercent / startedCoursesCount)
            : 0;

        // 5. Continue Watching Logic
        incompleteContent.sort((a, b) => b.progressPercent - a.progressPercent);

        let continueWatching = null;
        if (incompleteContent.length > 0) {
            const topItem = incompleteContent[0];
            const matchedCourse = allCourses.find(c => c._id.toString() === topItem.courseId?.toString());
            continueWatching = {
                courseId: topItem.courseId,
                courseTitle: matchedCourse?.title || 'Unknown Course',
                thumbnail: matchedCourse?.thumbnail || '',
                lessonId: topItem.lessonId,
                progressPercent: topItem.progressPercent
            };
        }

        // 6. Enrolled Courses Grid
        const enrolledCourses = allCourses.map(course => {
            const progressDoc = allProgress.find(
                p => p.courseId?.toString() === course._id.toString()
            );
            return {
                courseId: course._id,
                title: course.title,
                thumbnail: course.thumbnail || '',
                progress: progressDoc ? progressDoc.progressPercent : 0
            };
        });

        // 7. Final Response
        res.json({
            user: {
                name: user?.name || 'Student',
                email: user?.email || '',
                isPremium: user?.isPremium || false
            },
            stats: {
                totalCourses: allCourses.length,
                lessonsCompleted,
                overallProgress,
                certificates: 0
            },
            continueWatching,
            enrolledCourses,
            announcements: []
        });

    } catch (error) {
        console.error('[Dashboard] Unhandled Summary Error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard summary', details: error.message });
    }
});

export default router;
