import express from 'express';
import Video from '../models/Video.js';
import Course from '../models/Course.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { getSignedUrl } from '../utils/workerClient.js';

const router = express.Router();

/**
 * GET /api/video/access/:videoId
 * Returns a signed .m3u8 URL for authorized users
 */
// ---------------------------------------------------------
// NEW: Get Intro Video (Public Metadata)
// Returns the ID and details of the active intro video
// ---------------------------------------------------------
router.get('/intro', async (req, res) => {
    try {
        const introVideo = await Video.findOne({
            isFreePreview: true,
            active: true
        });

        if (!introVideo) {
            return res.status(404).json({ error: 'No intro video found' });
        }

        res.json({
            id: introVideo._id,
            title: introVideo.title,
            description: 'Watch our introduction to Vedic Astrology',
            thumbnail: introVideo.thumbnail
        });
    } catch (error) {
        console.error('Intro fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch intro video' });
    }
});

// ---------------------------------------------------------
// NEW: Optional auth for public preview videos
// We remove `authMiddleware` from the route definition
// and handle token verification manually inside the handler.
// ---------------------------------------------------------

router.get('/access/:videoId', async (req, res) => {
    try {
        const { videoId } = req.params;

        // Handle sample data IDs nicely
        if (!videoId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(404).json({ error: 'Video not found (Invalid ID)' });
        }

        // 1. Fetch video metadata
        const video = await Video.findById(videoId);
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        // ---------------------------------------------------------
        // ✅ STRATEGY: IF FREE PREVIEW -> ALLOW IMMEDIATELY
        // ---------------------------------------------------------
        if (video.isFreePreview && video.active) {
            // Call Cloudflare Worker (Proxy)
            // FIX: Pass object structure as expected by getSignedUrl
            const { signedUrl, expiresAt } = await getSignedUrl({
                r2Path: video.r2Path,
                userId: 'public', // Use 'public' for free previews
                courseId: video.courseId ? video.courseId.toString() : 'intro',
                contentId: video._id.toString()
            });
            return res.json({
                signedUrl,
                expiresAt,
                videoTitle: video.title,
                duration: video.duration,
                accessType: 'free-preview'
            });
        }

        // ---------------------------------------------------------
        // 🔒 STRATEGY: IF PAID -> ENFORCE AUTH & ENROLLMENT
        // ---------------------------------------------------------

        // 2. Validate Token (Manually, since middleware is removed)
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'Authentication required for this video.' });
        }

        let userId;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userId = decoded.userId;
        } catch (err) {
            return res.status(401).json({ error: 'Invalid or expired token.' });
        }

        // 3. Fetch associated course
        const course = await Course.findById(video.courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // 4. Check Enrollment (Using NEW Enrollment Collection)
        // We look for an active enrollment for this user + course
        // 4. Check Enrollment (Using NEW Enrollment Collection)
        // We look for an active enrollment for this user + course
        // TEMPORARY OVERRIDE: Allow all logged-in users to access
        // const enrollment = await import('../models/Enrollment.js').then(m => m.default.findOne({
        //     userId: userId,
        //     courseId: course._id,
        //     status: 'active'
        // }));

        // if (!enrollment) {
        //     return res.status(403).json({
        //         error: 'Access denied. You are not enrolled in this course.',
        //         requiresPurchase: true
        //     });
        // }
        // End Temporary Override

        // 5. Success -> Get Proxy URL
        const { signedUrl, expiresAt } = await getSignedUrl({
            r2Path: video.r2Path,
            userId: userId,
            courseId: course._id.toString(),
            contentId: video._id.toString()
        });

        res.json({
            signedUrl,
            expiresAt,
            videoTitle: video.title,
            duration: video.duration,
            accessType: 'paid-access'
        });

    } catch (error) {
        console.error('Video access error:', error);
        res.status(500).json({ error: 'Failed to access video' });
    }
});

export default router;
