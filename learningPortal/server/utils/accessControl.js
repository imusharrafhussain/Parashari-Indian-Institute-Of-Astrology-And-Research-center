import Course from '../models/Course.js';

/**
 * Determines which courses a user can access based on payment mode and user premium status.
 * @param {Object} user - The user object from the database (should contain isPremium)
 * @returns {Promise<Array>} - List of accessible courses
 */
export async function getAccessibleCourses(user) {
    const PAYMENT_MODE = process.env.PAYMENT_MODE || 'DUMMY';

    // Fetch all active courses
    const allCourses = await Course.find({ active: true }).populate('categoryId');

    if (PAYMENT_MODE === 'DUMMY') {
        if (user && user.isPremium) {
            return allCourses;
        } else {
            // Non-premium users see a locked state or limited set.
            // For now, we return all courses but tag them so the frontend knows they are locked.
            // Alternatively, return an empty array if you strictly want them hidden.
            // Returning them with an 'isLocked' flag allows the frontend to show them with a padlock.
            return allCourses.map(course => ({
                ...course.toObject(),
                isLocked: true // Add flag for frontend
            }));
        }
    }

    if (PAYMENT_MODE === 'LIVE') {
        // Placeholder for future Razorpay/live enrollment logic
        // This will likely involve checking an 'Enrollment' collection or similar
        console.warn('LIVE payment mode not fully implemented in getAccessibleCourses.');
        return [];
    }

    return [];
}
