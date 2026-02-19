import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    description: String,
    orderIndex: {
        type: Number,
        required: true,
        default: 0
    },

    // Access
    active: {
        type: Boolean,
        default: true
    },
    isPreview: {
        type: Boolean,
        default: false // If true, accessible in free preview
    },

    // Audit
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

// Auto-generate slug
moduleSchema.pre('save', function (next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    next();
});

// Compound index for course + order
moduleSchema.index({ courseId: 1, orderIndex: 1 });

export default mongoose.model('Module', moduleSchema);
