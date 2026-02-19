import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    videoUrl: String, // Direct URL or R2 path
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' }, // Link to separate Video model
    duration: String,
    isFreePreview: { type: Boolean, default: false }
});

const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    videos: [videoSchema],
    order: { type: Number, default: 0 }
});

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        index: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    thumbnail: {
        type: String,
        default: ''
    },
    active: {
        type: Boolean,
        default: true,
        index: true
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    level: {
        type: String,
        default: 'Beginner',
        index: true
    },
    duration: {
        type: String, // Display string like "2h 30m"
        default: ''
    },
    // RE-IMPLEMENTED REQUESTED FEATURE: MODULES & PLAYLISTS
    modules: [moduleSchema],
    
    // Legacy resources support
    resources: [{
        title: String,
        r2Path: String,
        type: String,
        size: Number,
        pages: Number
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model('Course', courseSchema);
