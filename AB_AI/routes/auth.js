const express = require('express');
const router = express.Router();
const User = require('../models/User');
const OTP = require('../models/OTP');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateOTP, validateOTPFormat } = require('../utils/otpUtils');
const { sendSignupOTP, sendResetOTP } = require('../utils/emailService');

// OLD REGISTRATION ENDPOINT - DISABLED
// Now requires OTP verification via /signup-with-otp
router.post('/register', async (req, res) => {
    return res.status(400).json({
        message: 'Direct registration is disabled. Please use OTP verification.',
        hint: 'Use /api/auth/send-otp to get started'
    });
});

// Login - Authenticates via Learning Portal API
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Call Learning Portal API for authentication using direct database check
        // Since we're in the same database, just validate and generate response
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password - UPDATED for new schema
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token using Learning Portal's secret
        const jwtSecret = process.env.JWT_SECRET || 'dev-secret-key-12345';

        const token = jwt.sign(
            { userId: user._id },
            jwtSecret,
            { expiresIn: '7d' }
        );

        // Return JWT token and user data
        res.json({
            message: 'Login successful',
            token: token,
            userId: user._id,
            name: user.name,
            email: user.email,
            role: user.role // Added role
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
});

// Rate limiting map for OTP requests
const otpRequestMap = new Map();

// Send OTP endpoint
router.post('/send-otp', async (req, res) => {
    try {
        const { email, purpose } = req.body; // purpose: 'signup' or 'reset'

        if (!email || !purpose) {
            return res.status(400).json({ message: 'Email and purpose are required' });
        }

        if (!['signup', 'reset'].includes(purpose)) {
            return res.status(400).json({ message: 'Invalid purpose' });
        }

        const emailLower = email.toLowerCase();

        // Rate limiting: max 3 requests per 15 minutes per email
        const now = Date.now();
        const requestKey = `${emailLower}-${purpose}`;
        const requests = otpRequestMap.get(requestKey) || [];
        const recentRequests = requests.filter(time => now - time < 15 * 60 * 1000);

        if (recentRequests.length >= 3) {
            return res.status(429).json({
                message: 'Too many OTP requests. Please try again later.'
            });
        }

        // For signup, check if user already exists
        if (purpose === 'signup') {
            const existingUser = await User.findOne({ email: emailLower });
            if (existingUser) {
                return res.status(400).json({
                    message: 'An account with this email already exists. Please login instead.'
                });
            }
        }

        // For reset, check if user exists
        if (purpose === 'reset') {
            const existingUser = await User.findOne({ email: emailLower });
            if (!existingUser) {
                return res.status(404).json({
                    message: 'No account found with this email address.'
                });
            }
        }

        // Clean up old OTPs
        await OTP.cleanupOldOTPs(emailLower, purpose);

        // Generate new OTP
        const code = generateOTP();

        // Save OTP to database
        const otp = new OTP({
            email: emailLower,
            code,
            purpose
        });
        await otp.save();

        // Send email
        if (purpose === 'signup') {
            await sendSignupOTP(email, code);
        } else {
            const user = await User.findOne({ email: emailLower });
            await sendResetOTP(email, code, user.name);
        }

        // Update rate limiting
        recentRequests.push(now);
        otpRequestMap.set(requestKey, recentRequests);

        res.json({
            message: 'OTP sent successfully',
            expiresIn: 300 // 5 minutes in seconds
        });

    } catch (error) {
        console.error('Send OTP error:', error);
        res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
    }
});

// Verify OTP endpoint
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({ message: 'Email and code are required' });
        }

        if (!validateOTPFormat(code)) {
            return res.status(400).json({ message: 'Invalid OTP format' });
        }

        const emailLower = email.toLowerCase();

        // Find valid OTP
        const otp = await OTP.findOne({
            email: emailLower,
            code,
            verified: false,
            expiresAt: { $gt: new Date() }
        });

        if (!otp) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Mark as verified
        otp.verified = true;
        await otp.save();

        // Generate verification token (short-lived)
        const verificationToken = jwt.sign(
            { email: emailLower, purpose: otp.purpose },
            process.env.JWT_SECRET || 'dev-secret-key-12345',
            { expiresIn: '10m' } // 10 minutes to complete signup/reset
        );

        res.json({
            message: 'OTP verified successfully',
            verificationToken,
            purpose: otp.purpose
        });

    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({ message: 'Failed to verify OTP. Please try again.' });
    }
});

// Signup with OTP (after verification)
router.post('/signup-with-otp', async (req, res) => {
    try {
        const { fullName, email, phone, program, password, verificationToken } = req.body;

        if (!verificationToken) {
            return res.status(400).json({ message: 'Verification token required' });
        }

        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(verificationToken, process.env.JWT_SECRET || 'dev-secret-key-12345');
        } catch (error) {
            return res.status(400).json({ message: 'Invalid or expired verification token' });
        }

        if (decoded.purpose !== 'signup' || decoded.email !== email.toLowerCase()) {
            return res.status(400).json({ message: 'Invalid verification token' });
        }

        // Validate password
        if (!password || password.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long'
            });
        }

        // Check if user already exists (double-check)
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                message: 'An account with this email already exists.'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = new User({
            name: fullName,
            email: email.toLowerCase(),
            contact: phone,
            password: hashedPassword, // Changed from passwordHash
            role: 'student', // Default role
            emailVerified: true
        });

        await user.save();

        // Clean up verified OTPs
        await OTP.deleteMany({ email: email.toLowerCase(), verified: true });

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'dev-secret-key-12345',
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Registration successful',
            token,
            userId: user._id,
            name: user.name,
            email: user.email
        });

    } catch (error) {
        console.error('Signup with OTP error:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
});

// Reset password with OTP
router.post('/reset-password', async (req, res) => {
    try {
        const { email, newPassword, verificationToken } = req.body;

        if (!verificationToken) {
            return res.status(400).json({ message: 'Verification token required' });
        }

        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(verificationToken, process.env.JWT_SECRET || 'dev-secret-key-12345');
        } catch (error) {
            return res.status(400).json({ message: 'Invalid or expired verification token' });
        }

        if (decoded.purpose !== 'reset' || decoded.email !== email.toLowerCase()) {
            return res.status(400).json({ message: 'Invalid verification token' });
        }

        // Validate password
        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long'
            });
        }

        // Find user
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        user.password = hashedPassword;
        await user.save();

        // Clean up verified OTPs
        await OTP.deleteMany({ email: email.toLowerCase(), verified: true });

        res.json({ message: 'Password reset successful. Please login with your new password.' });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
});

module.exports = router;
