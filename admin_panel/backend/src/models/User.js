import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    name: {
        type: String,
        required: true,
        trim: true
    },

    // Role-Based Access Control
    role: {
        type: String,
        enum: ['student', 'admin', 'super-admin'],
        default: 'student',
        index: true
    },

    permissions: [{
        type: String,
        enum: [
            'users.view', 'users.create', 'users.edit', 'users.delete',
            'courses.view', 'courses.create', 'courses.edit', 'courses.delete',
            'media.upload', 'media.delete',
            'settings.manage'
        ]
    }],

    // Account Status
    isActive: {
        type: Boolean,
        default: true
    },

    // Enrollments
    enrolledCourses: [{
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        enrolledAt: Date,
        status: { type: String, enum: ['active', 'completed', 'suspended'], default: 'active' }
    }],

    // Audit
    lastLogin: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

// Hash password before save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Instance method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to check permission
userSchema.methods.hasPermission = function (permission) {
    return this.permissions.includes(permission) || this.role === 'super-admin';
};

// Don't return password in JSON
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export default mongoose.model('User', userSchema);
