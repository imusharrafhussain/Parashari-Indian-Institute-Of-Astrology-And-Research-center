import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown', err);
});

const app = express();

// Middleware
// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', process.env.CLIENT_URL],
    credentials: true
}));

// IMPORTANT: Stripe webhook needs raw body
app.use('/api/webhook', express.raw({ type: 'application/json' }));

// JSON parsing for other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes - Import at the top
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import videoRoutes from './routes/video.js';
import resourceRoutes from './routes/resource.js';

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/resource', resourceRoutes);

// V2 API Routes
import coursesV2Routes from './routes/v2/courses.js';
import contentV2Routes from './routes/v2/content.js';

app.use('/api/v2/courses', coursesV2Routes);
app.use('/api/v2/content', contentV2Routes);

import progressV2Routes from './routes/v2/progress.js';
app.use('/api/v2/progress', progressV2Routes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Parashari Learning Portal API is running',
        timestamp: new Date().toISOString()
    });
});

// ============================================
// REDIRECT MIDDLEWARE (STRICT)
// ============================================
app.use((req, res, next) => {
    // 1. WEBHOOK & API EXCLUSION CHECK (Safety Net)
    if (
        req.path.startsWith('/api') ||
        req.path === '/health' ||
        req.path.startsWith('/api/webhook')
    ) {
        return next();
    }

    // 2. METHOD CHECK
    // Only redirect GET requests.
    if (req.method !== 'GET') {
        return next();
    }

    const targetUrl = process.env.AB_AI_PRODUCTION_URL;
    if (!targetUrl) return next();

    // 3. LOOP PROTECTION
    const currentHost = req.get('host');
    try {
        const targetHost = new URL(targetUrl).host;
        // If we are already on the target domain, do NOT redirect (prevents infinite loop)
        if (currentHost === targetHost) return next();
    } catch (e) {
        return next();
    }

    // 4. PERFORM REDIRECT
    // 301 Moved Permanently -> Canonical Home URL
    console.log(`[Redirect] Redirecting ${req.path} to ${targetUrl}`);
    res.redirect(301, targetUrl);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// MongoDB Connection - Start server ONLY after connection is established
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('✅ MongoDB connected successfully');

        // Seed sample courses for testing
        // const { default: seedCourses } = await import('./seedCourses.js');
        // await seedCourses();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📍 Environment: ${process.env.NODE_ENV}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });
