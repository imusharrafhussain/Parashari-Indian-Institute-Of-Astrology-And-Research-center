import express from 'express';
import mongoose from 'mongoose';
import ProgressV2 from '../../models/ProgressV2.js';
import ContentItem from '../../models/ContentItem.js';
import Section from '../../models/Section.js';
import { authMiddleware as authenticate } from '../../middleware/auth.js';

const router = express.Router();

// POST /api/v2/progress
// Update progress for a specific content item
// Idempotent: Can call multiple times, will update 'lastPosition' and 'progressPercent'
router.post('/', authenticate, async (req, res) => {
    try {
        const { courseId, contentId, progressPercent, lastPosition, status } = req.body;
        const userId = req.userId;

        if (!courseId || !contentId) {
            return res.status(400).json({ error: 'Missing courseId or contentId' });
        }

        // Validate IDs are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(courseId) || !mongoose.Types.ObjectId.isValid(contentId)) {
            return res.status(400).json({ error: 'Invalid courseId or contentId format' });
        }

        // Validate content exists
        const contentItem = await ContentItem.findById(contentId);
        if (!contentItem) {
            return res.status(404).json({ error: 'Content item not found' });
        }

        // Find or Create Progress Document
        let progress = await ProgressV2.findOne({ userId, courseId });

        if (!progress) {
            progress = new ProgressV2({
                userId,
                courseId,
                contentProgress: {},
                lastAccessedItemId: contentId
            });
        }

        // Update specific item progress
        const currentItemProgress = progress.contentProgress.get(contentId) || {
            status: 'STARTED',
            progressPercent: 0,
            lastPosition: 0
        };

        // Update fields if provided
        if (typeof progressPercent === 'number') {
            // Ensure we don't regress completion status inadvertently, but allow percent updates
            currentItemProgress.progressPercent = Math.max(currentItemProgress.progressPercent, progressPercent);

            // Auto-complete logic (e.g. > 90%)
            if (currentItemProgress.progressPercent >= 90 && currentItemProgress.status !== 'COMPLETED') {
                currentItemProgress.status = 'COMPLETED';
            }
        }

        if (typeof lastPosition === 'number') {
            currentItemProgress.lastPosition = lastPosition;
        }

        if (status) {
            // CONCURRENCY RULE 1: Completion Lock
            // Once a video is marked COMPLETED, it must NEVER revert to STARTED.
            if (currentItemProgress.status === 'COMPLETED') {
                // Even if request says 'STARTED', we ignore it.
                // We ONLY allow updates to lastPosition/progressPercent if they are newer (handled below)
            } else {
                if (status === 'COMPLETED') {
                    currentItemProgress.status = 'COMPLETED';
                    currentItemProgress.progressPercent = 100;
                } else {
                    currentItemProgress.status = status;
                }
            }
        }

        // CONCURRENCY RULE 2: Out-of-Order Updates
        // Compare clientTimestamp (if provided) with stored updatedAt
        const clientTime = req.body.clientTimestamp ? new Date(req.body.clientTimestamp).getTime() : Date.now();
        const storedTime = currentItemProgress.updatedAt ? new Date(currentItemProgress.updatedAt).getTime() : 0;

        if (clientTime < storedTime) {
            // This is an old request arriving late. Ignore regression of position.
            // However, if it's a COMPLETION event, we might still want to honor the status upgrade 
            // if we weren't already completed. But the logic above handles status independently.
            // For position, we ignore old packets.
            console.log(`Ignoring out-of-order progress update for ${contentId}`);
            return res.json({ success: true, ignored: true, itemProgress: currentItemProgress });
        }

        currentItemProgress.updatedAt = new Date(clientTime);
        progress.contentProgress.set(contentId, currentItemProgress);
        progress.lastAccessedItemId = contentId;

        await progress.save();

        res.json({
            success: true,
            itemProgress: currentItemProgress
        });

    } catch (error) {
        console.error('Progress update error:', error);
        res.status(500).json({ error: 'Server error updating progress' });
    }
});

// GET /api/v2/progress
// Handle missing courseId gracefully
router.get('/', authenticate, (req, res) => {
    res.json({ contentProgress: {}, lastAccessedItemId: null });
});

// GET /api/v2/progress/:courseId
// Get full progress map for a course
router.get('/:courseId', authenticate, async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.userId;

        // Handle "undefined" or invalid IDs gracefully
        if (!courseId || courseId === 'undefined' || courseId === 'null') {
            return res.json({ contentProgress: {}, lastAccessedItemId: null });
        }

        // Check for valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.json({ contentProgress: {}, lastAccessedItemId: null });
        }

        const progress = await ProgressV2.findOne({ userId, courseId });

        if (!progress) {
            return res.json({ contentProgress: {}, lastAccessedItemId: null });
        }

        res.json({
            contentProgress: progress.contentProgress,
            lastAccessedItemId: progress.lastAccessedItemId
        });

    } catch (error) {
        console.error('Fetch progress error:', error);
        res.status(500).json({ error: 'Server error fetching progress' });
    }
});

export default router;
