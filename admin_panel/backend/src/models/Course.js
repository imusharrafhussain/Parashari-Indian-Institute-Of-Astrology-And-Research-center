import mongoose from 'mongoose';

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
        index: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String, // R2 path: thumbnails/courses/{slug}.jpg
        default: null
    },

    // Access Control
    accessType: {
        type: String,
        enum: ['free', 'paid'],
        default: 'paid',
        index: true
    },
    price: {
        type: Number,
        default: 0,
        min: 0
    },

    // Publishing
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft',
        index: true
    },
    publishedAt: Date,

    // Categorization
    category: {
        type: String,
        enum: ['beginner', 'foundation', 'master', 'phd', 'crash-course'],
        required: true,
        index: true
    },

    // Display
    orderIndex: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },

    // Metadata
    totalDuration: Number, // minutes, computed from modules
    level: String,

    // SEO
    metaTitle: String,
    metaDescription: String,

    // Audit
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

// Auto-generate slug from title
courseSchema.pre('save', function (next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    next();
});

// Virtual for modules
courseSchema.virtual('modules', {
    ref: 'Module',
    localField: '_id',
    foreignField: 'courseId'
});

export default mongoose.model('Course', courseSchema);
