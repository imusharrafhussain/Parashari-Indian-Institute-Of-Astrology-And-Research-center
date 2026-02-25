
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth'); // Placeholder
const videoRoutes = require('./routes/video');

const app = express();

// Middleware
app.use(cors());

// Regular Middleware
app.use(express.json());
app.use(express.static('.')); // Serve static files from root

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/video', videoRoutes);


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
