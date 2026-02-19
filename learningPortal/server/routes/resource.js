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
 * GET /api/v2/resources/stream/:resourceId
 * Securely streams PDF/eBook from R2 via Server Proxy.
 * Hides R2 URL from client.
 */
router.get('/stream/:resourceId', authMiddleware, resourceLimiter, async (req, res) => {
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
            // Should theoretically be covered by findOne, but double check
            return res.status(404).json({ error: 'Resource item not found' });
        }

        // C. Find the Course this video belongs to (via Module)
        // We need this to check enrollment
        // Video -> Module -> Course
        // This requires population or separate queries. 
        // Let's populate module to get courseId
        await video.populate('moduleId');

        if (!video.moduleId || !video.moduleId.courseId) {
            console.error('Orphaned video/module found', video._id);
            return res.status(500).json({ error: 'System error: Resource linkage broken' });
        }

        const courseId = video.moduleId.courseId;

        // D. Check User Enrollment
        const user = await User.findById(userId);
        if (!user) return res.status(401).json({ error: 'User not found' });

        // GLOBAL ACCESS MODE CHECK
        const ACCESS_MODE = process.env.ACCESS_MODE || 'OPEN'; // Default to OPEN per business rule

        if (ACCESS_MODE !== 'OPEN') {
            const hasPurchased = user.purchasedCourses.some(
                p => p.courseId.toString() === courseId.toString() && p.status === 'active'
            );

            // Allow if user is admin (optional, assuming 'role' exists) or just checking purchase
            if (!hasPurchased && user.role !== 'admin') {
                logAccess(userId, resourceId, userIp, 'DENIED_NO_ACCESS');
                return res.status(403).json({ error: 'Access denied. You do not own this course.' });
            }
        } else {
            // Log that we allowed via OPEN mode
            // (Optional: keep logs cleaner, or mark as GRANTED_OPEN_ACCESS)
        }

        // E. Generate Access to R2
        // We use the workerClient to generate a signed URL, then we fetch it SERVER-SIDE.
        const { signedUrl } = await getSignedUrl({
            r2Path: resource.r2Path,
            userId,
            courseId,
            contentId: resourceId,
            expiresInSeconds: 60 // Short expiry, server uses it immediately
        });

        // F. Stream the File
        // Fetch from R2 (Cloudflare)
        console.log(`[Resource] Streaming initiated. Signed URL generated: ${signedUrl}`);
        logAccess(userId, resourceId, userIp, 'GRANTED_STREAMING');

        const response = await axios({
            method: 'get',
            url: signedUrl,
            responseType: 'stream',
            headers: {
                'User-Agent': 'Parashari-Learning-Portal/1.0',
                'Accept': '*/*'
            }
        });

        // G. Set Secure Headers
        res.setHeader('Content-Type', 'application/pdf'); // Force PDF (eBooks are PDFs too for now)
        res.setHeader('Content-Disposition', `inline; filename="${resource.title.replace(/[^a-z0-9]/gi, '_')}.pdf"`);
        res.setHeader('Cache-Control', 'private, no-store, no-cache, must-revalidate'); // No caching

        // H. Pipe to Client
        response.data.pipe(res);

    } catch (error) {
        console.error('❌ Stream Error Details:');
        console.error(`   - Message: ${error.message}`);
        console.error(`   - URL Attempted: ${signedUrl}`);
        if (error.response) {
            console.error(`   - Status: ${error.response.status}`);
            console.error(`   - Headers:`, JSON.stringify(error.response.headers));
            console.error(`   - Data:`, error.response.data);
        } else if (error.request) {
            console.error(`   - No response received from Cloudflare/Worker`);
        } else {
            console.error(`   - Request setup error: ${error.message}`);
        }

        logAccess(userId, resourceId, userIp, `ERROR_${error.message}`);

        if (!res.headersSent) {
            // Helper to determine if it's upstream (502) or not found (404)
            const status = error.response?.status === 404 ? 404 : 502;
            res.status(status).json({ error: 'Stream failure', details: error.message });
        }
    }
});

export default router;
