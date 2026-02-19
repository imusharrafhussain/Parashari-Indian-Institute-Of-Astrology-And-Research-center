import express from 'express';
import ContentItem from '../../models/ContentItem.js';
import ProgressV2 from '../../models/ProgressV2.js';
import { authMiddleware as authenticate } from '../../middleware/auth.js';
import { getSignedUrl } from '../../utils/workerClient.js';

const router = express.Router();

// GET /api/v2/content/:contentId/access
// Securely generate signed URL for content
router.get('/:contentId/access', authenticate, async (req, res) => {
    try {
        const { contentId } = req.params;
        const userId = req.userId;

        const contentItem = await ContentItem.findById(contentId).populate('sectionId');
        if (!contentItem) {
            return res.status(404).json({ error: 'Content not found' });
        }

        // We need courseId for enrollment check. It's up the chain: Content -> Section -> Module -> Course
        // To be efficient, we might want CourseId on ContentItem, but for now we query up.
        // Or we can rely on the fact that the frontend should pass courseId if we used `checkEnrollment` middleware.
        // However, this is a direct content access, often we just have contentId. 
        // We'll traverse up to get courseId.

        let courseId = null;
        if (contentItem.sectionId) {
            // We need to fetch module to get courseId
            const Section = await import('../../models/Section.js').then(m => m.default);
            const section = await Section.findById(contentItem.sectionId).populate('moduleId');
            if (section && section.moduleId) {
                courseId = section.moduleId.courseId;
            }
        }

        if (!courseId) {
            return res.status(500).json({ error: 'Orphaned content item' });
        }

        // Manual enrollment check since we needed to derive courseId first
        const Enrollment = await import('../../models/Enrollment.js').then(m => m.default);
        const enrollment = await Enrollment.findOne({
            userId,
            courseId,
            status: 'active'
        });

        if (!enrollment) {
            return res.status(403).json({ error: 'Not enrolled in the source course' });
        }

        // Entitlement Check (Unlock Logic)
        // CHECK: Is item locked?
        // Logic: If locked, check if previous requirements met. 
        // For now, if 'isLocked' is true in DB, we check Progress. But DB 'isLocked' might be the "default state".
        // Real unlock logic is complex (sequential). 
        // For current scope: We trust the backend's "isLocked" flag OR we assume SEQUENTIAL.
        // Let's implement basic sequential check: 
        // "If item is Order N, Item N-1 must be COMPLETED". 
        // Since that's heavy to compute on every click, we might rely on ProgressV2 which should ideally update "isUnlocked" status?
        // Or we just check if it's the *very next* item or already started.

        // SIMPLIFICATION FOR V1 MIGRATION: 
        // If content is Video/PDF, allowing access if Enrolled. 
        // Formal unlocking will be handled by the Progress API updates which "unlocks" next items.
        // For now, we enforce: Must be enrolled.

        let accessUrl = null;
        let expiresAt = null;

        if (contentItem.type === 'VIDEO') {
            // Generate Cloudflare Token/URL
            // Assuming r2Path or cloudflareId is used. 
            // Existing util uses r2Path.
            // But Video ContentItem has `metadata.cloudflareId` or `metadata.r2Path`?
            // Adapting to existing util:
            const videoId = contentItem.metadata.cloudflareId || contentItem.metadata.r2Path;
            if (videoId) {
                const result = await getSignedUrl(videoId);
                accessUrl = result.signedUrl;
                expiresAt = result.expiresAt;
            }
        } else if (contentItem.type === 'PDF') {
            if (contentItem.metadata.r2Path) {
                const result = await getSignedUrl(contentItem.metadata.r2Path);
                accessUrl = result.signedUrl;
                expiresAt = result.expiresAt;
            }
        }

        if (!accessUrl) {
            return res.status(404).json({ error: 'Content source not available' });
        }

        res.json({
            accessUrl,
            expiresAt,
            type: contentItem.type
        });

    } catch (error) {
        console.error('Content access error:', error);
        res.status(500).json({ error: 'Server error generating access token' });
    }
});

export default router;
