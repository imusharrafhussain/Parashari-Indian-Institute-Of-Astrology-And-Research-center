
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


// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
