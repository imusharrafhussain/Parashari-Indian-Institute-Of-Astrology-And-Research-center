import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
    title: { type: String, required: true },
    description: String,
    orderIndex: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Section', sectionSchema);
