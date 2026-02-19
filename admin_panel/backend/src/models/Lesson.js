import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    title: String,
    type: {
        type: String,
        enum: ['pdf', 'ebook', 'slides', 'notes'],
        required: true
    },
    r2Path: String, // Auto-generated
    mediaAssetId: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaAsset' },
    size: Number, // bytes
    pages: Number, // for PDFs
    isDownloadable: {
        type: Boolean,
        default: false
    }
}, { _id: true });

const lessonSchema = new mongoose.Schema({
    moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: String,

    // Video
    videoR2Path: String, // resources/{course-slug}/{module-slug}/lesson-{N}-videos/index.m3u8
    videoMediaAssetId: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaAsset' },
    videoDuration: Number, // seconds
    videoThumbnail: String,

    // Attached Resources (PDFs, eBooks, etc.)
    resources: [resourceSchema],

    // Ordering & Access
    orderIndex: {
        type: Number,
        required: true,
        default: 0
    },
    isFreePreview: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },

    // Audit
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

// Compound index
lessonSchema.index({ moduleId: 1, orderIndex: 1 });

export default mongoose.model('Lesson', lessonSchema);
