
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const User = require("../models/User");
const Course = require("../models/Course");

// Generate Signed URL Helper
function generateSignedUrl(videoUID) {
    const baseUrl = `https://videodelivery.net/${videoUID}`;
    const expires = Math.floor(Date.now() / 1000) + 3600; // 1 hour expiry

    const token = crypto
        .createHmac("sha256", process.env.CF_STREAM_SECRET)
        .update(`${videoUID}${expires}`)
        .digest("hex");

    return `${baseUrl}?exp=${expires}&sig=${token}`;
}

// Watch Video Route
router.get("/watch/:courseId", async (req, res) => {
    try {
        // In a real app, you'd get userId from auth middleware (req.user.id)
        // For this demonstration, simpler access control or assuming userId passed/session
        // NOTE: This assumes some Authentication Middleware is active to populate req.user

        // START: Placeholder Authentication Check (Replace with actual Auth Middleware)
        const userId = req.headers['x-user-id']; // Example header for now
        if (!userId) return res.status(401).send("Unauthorized");
        // END: Placeholder

        const user = await User.findById(userId);
        if (!user) return res.status(404).send("User not found");

        const course = await Course.findById(req.params.courseId);
        if (!course) return res.status(404).send("Course not found");

        // Subscription Check
        if (course.isSubscriptionBased) {
            if (user.subscriptionStatus !== "active") {
                return res.status(403).send("Subscription required to view this content.");
            }
        }

        if (!course.videoKey) {
            return res.status(404).send("Video not available for this course.");
        }

        const signedUrl = generateSignedUrl(course.videoKey);
        res.json({ videoUrl: signedUrl });

    } catch (error) {
        console.error("Video Access Error:", error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
