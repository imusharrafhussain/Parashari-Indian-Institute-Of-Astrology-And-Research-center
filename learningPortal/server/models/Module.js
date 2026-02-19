import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    description: String,
    orderIndex: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Module', moduleSchema);
