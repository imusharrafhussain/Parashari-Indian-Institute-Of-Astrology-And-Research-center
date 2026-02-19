const crypto = require('crypto');

/**
 * Generate a 6-digit OTP code
 */
function generateOTP() {
    return crypto.randomInt(100000, 999999).toString();
}

/**
 * Validate OTP format (6 digits)
 */
function validateOTPFormat(code) {
    const otpRegex = /^\d{6}$/;
    return otpRegex.test(code);
}

/**
 * Check if OTP is expired
 */
function isOTPExpired(expiresAt) {
    return new Date() > new Date(expiresAt);
}

/**
 * Generate OTP expiry time (5 minutes from now)
 */
function getOTPExpiry() {
    return new Date(Date.now() + 5 * 60 * 1000);
}

module.exports = {
    generateOTP,
    validateOTPFormat,
    isOTPExpired,
    getOTPExpiry
};
