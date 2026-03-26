import Course from '../models/Course.js';

/**
 * Determines which courses a user can access.
 * Since Payment/Premium features are removed, all active courses are returned.
 * @param {Object} user - The user object from the database
 * @returns {Promise<Array>} - List of accessible courses
 */
export async function getAccessibleCourses(user) {
    // Fetch and return all active courses
    const allCourses = await Course.find({ active: true }).populate('categoryId');
    return allCourses;
}
