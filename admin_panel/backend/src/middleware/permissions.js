/**
 * Permission Checking Middleware
 * Verifies user has specific permission for the action
 */
export const requirePermission = (permission) => {
    return (req, res, next) => {
        // Super-admin bypasses permission check
        if (req.user.role === 'super-admin') {
            return next();
        }

        // Check permission
        if (!req.user.hasPermission(permission)) {
            return res.status(403).json({
                success: false,
                error: `Permission denied: ${permission} required`
            });
        }

        next();
    };
};

// Usage examples:
// router.delete('/courses/:id', requireAdmin, requirePermission('courses.delete'), deleteCourse);
// router.post('/media/upload', requireAdmin, requirePermission('media.upload'), uploadMedia);
