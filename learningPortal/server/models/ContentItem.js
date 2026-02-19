import mongoose from 'mongoose';

const contentItemSchema = new mongoose.Schema({
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section' },
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' }, // Fallback
    title: { type: String, required: true },
    type: { type: String, enum: ['video', 'pdf', 'quiz', 'text'], required: true },
    contentUrl: String, // R2 path or other URL
    duration: Number, // seconds
    orderIndex: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('ContentItem', contentItemSchema);
