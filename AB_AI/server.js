const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { createProxyMiddleware } = require('http-proxy-middleware');
const compression = require('compression');

const authRoutes = require('./routes/auth'); // Placeholder
const videoRoutes = require('./routes/video');
const astroAiRoutes = require('./routes/astroAi');

const app = express();

// Middleware
app.use(compression());
const allowedOrigins = new Set([
    'https://parashariindia.vercel.app',
    'https://parashariindian-learning.vercel.app',
    'https://parashariindia.com',
    'https://www.parashariindia.com'
]);

app.use(cors({
    origin: (origin, cb) => {
        // Allow same-origin / server-to-server / curl (no Origin header)
        if (!origin) return cb(null, true);

        // Allow any localhost dev server port (5173, 5500, etc.)
        if (/^https?:\/\/localhost:\d+$/.test(origin)) return cb(null, true);

        if (allowedOrigins.has(origin)) return cb(null, true);

        return cb(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
}));

// Proxy routes (MUST be before express.json and express.static)
app.use(
    '/student',
    createProxyMiddleware({
        target: 'https://parashari-welcome.vercel.app',
        changeOrigin: true,
        pathRewrite: {
            '^/student': ''
        }
    })
);

app.use(
    '/jobs',
    createProxyMiddleware({
        target: 'https://jobs-app.vercel.app',
        changeOrigin: true,
        pathRewrite: {
            '^/jobs': ''
        }
    })
);

// Regular Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('.')); // Serve static files from root

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/video', videoRoutes);
// app.use('/api/admin', require('./routes/admin'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/astro-ai', astroAiRoutes);


// Database Connection — start server ONLY after MongoDB is ready
// This prevents the race condition where the first login request hits
// before the DB connection is established, causing a 500 error.
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB Connected');
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1); // Exit if DB fails — don't serve broken requests
    });