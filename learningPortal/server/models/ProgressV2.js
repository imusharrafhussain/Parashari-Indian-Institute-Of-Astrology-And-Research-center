import mongoose from 'mongoose';

const itemProgressSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['STARTED', 'COMPLETED'],
        default: 'STARTED'
    },
    progressPercent: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    lastPosition: {
        type: Number,
        default: 0 // Seconds for video, Page for PDF, Scroll % for Note
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { _id: false });

const progressV2Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
        index: true
    },
    // Using Mixed to avoid Map serialization issues
    contentProgress: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    lastAccessedItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContentItem'
    }
}, {
    timestamps: true
});

// Compound index to quickly find a user's progress for a specific course
progressV2Schema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.model('ProgressV2', progressV2Schema);
