import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Admin Authentication Middleware
 * Verifies JWT token and checks admin role
 */
export const requireAdmin = async (req, res, next) => {
    try {
        // Extract token
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ success: false, error: 'No token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

        // Fetch user
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ success: false, error: 'User not found' });
        }

        // Check role
        if (!['admin', 'super-admin'].includes(user.role)) {
            return res.status(403).json({ success: false, error: 'Insufficient permissions - admin role required' });
        }

        // Check if active
        if (!user.isActive) {
            return res.status(403).json({ success: false, error: 'Account deactivated' });
        }

        // Attach user to request
        req.user = user;

        // Update last login (async, non-blocking)
        User.findByIdAndUpdate(user._id, { lastLogin: new Date() }).exec();

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, error: 'Token expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, error: 'Invalid token' });
        }
        res.status(401).json({ success: false, error: 'Authentication failed' });
    }
};
