const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    code: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        enum: ['signup', 'reset'],
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 5 * 60 * 1000) // 5 minutes from now
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Index for automatic deletion of expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Index for quick lookup
otpSchema.index({ email: 1, purpose: 1 });

// Method to verify OTP
otpSchema.methods.isValid = function () {
    return !this.verified && this.expiresAt > new Date();
};

// Static method to find valid OTP
otpSchema.statics.findValidOTP = async function (email, code, purpose) {
    const otp = await this.findOne({
        email: email.toLowerCase(),
        code,
        purpose,
        verified: false,
        expiresAt: { $gt: new Date() }
    });

    return otp;
};

// Static method to cleanup old OTPs for an email
otpSchema.statics.cleanupOldOTPs = async function (email, purpose) {
    await this.deleteMany({
        email: email.toLowerCase(),
        purpose,
        $or: [
            { verified: true },
            { expiresAt: { $lt: new Date() } }
        ]
    });
};

module.exports = mongoose.model('OTP', otpSchema);
