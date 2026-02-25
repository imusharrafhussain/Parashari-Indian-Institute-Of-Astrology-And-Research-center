import express from 'express';
import rateLimit from 'express-rate-limit'; // Security: Rate Limiting
import Course from '../models/Course.js';
import User from '../models/User.js';
import Video from '../models/Video.js';
import { authMiddleware } from '../middleware/auth.js';
import { getSignedUrl } from '../utils/workerClient.js';
import axios from 'axios'; // For server-side fetching

const router = express.Router();

// 1. Rate Limiter (Max 20 requests per minute per IP)
const resourceLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
    message: { error: 'Too many resource requests, please try again later.' }
});

// Simple In-Memory Logger (Replace with Winston/DB in future)
const logAccess = (userId, resourceId, ip, status) => {
    const timestamp = new Date().toISOString();
    console.log(`[Resource Access] ${timestamp} | User: ${userId} | Resource: ${resourceId} | IP: ${ip} | Status: ${status}`);
};

/**
 * GET /api/resource/access/:resourceId
 * Securely generates a signed URL for PDF/eBook from Cloudflare R2
 * The client will download directly from the CDN for maximum speed.
 */
router.get('/access/:resourceId', authMiddleware, resourceLimiter, async (req, res) => {
    const { resourceId } = req.params;
    const userId = req.userId;
    const userIp = req.ip;

    try {
        // A. Find the Video containing this resource
        const video = await Video.findOne({ 'resources._id': resourceId });

        if (!video) {
            logAccess(userId, resourceId, userIp, 'DENIED_NOT_FOUND');
            return res.status(404).json({ error: 'Resource not found' });
        }

        // B. Extract the specific resource
        const resource = video.resources.id(resourceId);
        if (!resource) {
            return res.status(404).json({ error: 'Resource item not found' });
        }

        // C. Find the Course this video belongs to (via Module)
        await video.populate('moduleId');

        if (!video.moduleId || !video.moduleId.courseId) {
            console.error('Orphaned video/module found', video._id);
            return res.status(500).json({ error: 'System error: Resource linkage broken' });
        }

        const courseId = video.moduleId.courseId;

        // D. Check User Enrollment
        const user = await User.findById(userId);
        if (!user) return res.status(401).json({ error: 'User not found' });

        const ACCESS_MODE = process.env.ACCESS_MODE || 'OPEN';

        if (ACCESS_MODE !== 'OPEN') {
            const hasPurchased = user.purchasedCourses.some(
                p => p.courseId.toString() === courseId.toString() && p.status === 'active'
            );

            if (!hasPurchased && user.role !== 'admin') {
                logAccess(userId, resourceId, userIp, 'DENIED_NO_ACCESS');
                return res.status(403).json({ error: 'Access denied. You do not own this course.' });
            }
        }

        // E. Generate Direct Access Server-to-Client Signed URL
        // We give the client a generous expiry (e.g. 1 hour) to read the PDF.
        const { signedUrl, expiresAt } = await getSignedUrl({
            r2Path: resource.r2Path,
            userId,
            courseId,
            contentId: resourceId,
            expiresInSeconds: 3600 // 1 hour access
        });

        console.log(`[Resource] Direct CDN Access granted. Signed URL generated for: ${resource.title}`);
        logAccess(userId, resourceId, userIp, 'GRANTED_CDN_ACCESS');

        // Immediately return the signed URL to the client instead of Proxying
        res.json({
            accessUrl: signedUrl,
            expiresAt,
            title: resource.title,
            type: resource.type
        });

    } catch (error) {
        console.error('❌ Resource Access Error:', error.message);
        logAccess(userId, resourceId, userIp, `ERROR_${error.message}`);
        res.status(500).json({ error: 'Failed to generate access URL', details: error.message });
    }
});

export default router;
