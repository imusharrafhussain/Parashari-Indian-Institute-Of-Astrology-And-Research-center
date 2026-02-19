import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { loginLimiter } from '../middleware/rateLimiter.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

/**
 * POST /api/admin/auth/login
 * Admin login endpoint
 */
router.post('/login', loginLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
        }

        // Find user
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Check if user is admin
        if (!['admin', 'super-admin'].includes(user.role)) {
            return res.status(403).json({
                success: false,
                error: 'Access denied - admin privileges required'
            });
        }

        // Check if account is active
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                error: 'Account is deactivated'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.ADMIN_JWT_SECRET,
            { expiresIn: process.env.ADMIN_JWT_EXPIRY || '4h' }
        );

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Return success
        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                permissions: user.permissions
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Login failed'
        });
    }
});

/**
 * POST /api/admin/auth/logout
 * Admin logout endpoint
 */
router.post('/logout', requireAdmin, async (req, res) => {
    try {
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            error: 'Logout failed'
        });
    }
});

/**
 * GET /api/admin/auth/me
 * Get current admin user info
 */
router.get('/me', requireAdmin, (req, res) => {
    res.json({
        success: true,
        user: {
            id: req.user._id,
            email: req.user.email,
            name: req.user.name,
            role: req.user.role,
            permissions: req.user.permissions,
            lastLogin: req.user.lastLogin
        }
    });
});

export default router;
