import mongoose from 'mongoose';

const mediaAssetSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    originalName: String,
    r2Path: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    r2Bucket: {
        type: String,
        default: process.env.R2_BUCKET_NAME
    },

    // Type
    assetType: {
        type: String,
        enum: ['video', 'pdf', 'ebook', 'image', 'thumbnail'],
        required: true,
        index: true
    },
    mimeType: String,
    size: Number, // bytes

    // Processing Status
    uploadStatus: {
        type: String,
        enum: ['uploading', 'processing', 'ready', 'failed'],
        default: 'uploading',
        index: true
    },
    processingError: String,

    // Cloudflare
    cloudflareVideoId: String, // If using Cloudflare Stream

    // Usage Tracking
    usedIn: [{
        model: String, // 'Lesson', 'Course', etc.
        documentId: mongoose.Schema.Types.ObjectId,
        field: String // 'videoR2Path', 'resources', etc.
    }],

    // Security
    signedUrlExpiry: {
        type: Number,
        default: 3600 // 1 hour
    },

    // Audit
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lastAccessedAt: Date,
    accessCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Method to check if asset is orphaned
mediaAssetSchema.methods.isOrphaned = function () {
    return this.usedIn.length === 0;
};

export default mongoose.model('MediaAsset', mediaAssetSchema);
