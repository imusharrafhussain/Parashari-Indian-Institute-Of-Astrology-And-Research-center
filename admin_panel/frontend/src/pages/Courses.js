import React, { useState, useEffect } from 'react';
import { coursesAPI } from '../services/api';
import './Courses.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        accessType: 'free',
        price: 0,
        status: 'draft'
    });

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            const response = await coursesAPI.list();
            if (response.data.success) {
                setCourses(response.data.data);
            }
        } catch (error) {
            console.error('Failed to load courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await coursesAPI.create(formData);
            if (response.data.success) {
                setShowCreateModal(false);
                setFormData({
                    title: '',
                    description: '',
                    category: '',
                    accessType: 'free',
                    price: 0,
                    status: 'draft'
                });
                loadCourses();
            }
        } catch (error) {
            console.error('Failed to create course:', error);
            alert(error.response?.data?.error || 'Failed to create course');
        }
    };

    const handleTogglePublish = async (courseId, currentStatus) => {
        try {
            await coursesAPI.publish(courseId);
            loadCourses();
        } catch (error) {
            console.error('Failed to toggle publish:', error);
        }
    };

    const handleToggleAccessType = async (courseId, currentAccessType) => {
        try {
            const newAccessType = currentAccessType === 'free' ? 'paid' : 'free';
            await coursesAPI.setAccessType(courseId, newAccessType);
            loadCourses();
        } catch (error) {
            console.error('Failed to toggle access type:', error);
        }
    };

    const handleDelete = async (courseId) => {
        if (!window.confirm('Are you sure you want to delete this course?')) {
            return;
        }
        try {
            await coursesAPI.delete(courseId);
            loadCourses();
        } catch (error) {
            console.error('Failed to delete course:', error);
        }
    };

    if (loading) {
        return <div className="loading">Loading courses...</div>;
    }

    return (
        <div className="courses-page">
            <div className="page-header">
                <h1 className="page-title">Courses</h1>
                <button onClick={() => setShowCreateModal(true)} className="btn-primary">
                    + Create Course
                </button>
            </div>

            {courses.length === 0 ? (
                <div className="empty-state">
                    <p>No courses yet. Create your first course to get started!</p>
                </div>
            ) : (
                <div className="courses-grid">
                    {courses.map((course) => (
                        <div key={course._id} className="course-card">
                            <div className="course-header">
                                <h3 className="course-title">{course.title}</h3>
                                <div className="course-badges">
                                    <span className={`badge badge-${course.status}`}>
                                        {course.status}
                                    </span>
                                    <span className={`badge badge-${course.accessType}`}>
                                        {course.accessType}
                                    </span>
                                </div>
                            </div>

                            <p className="course-description">{course.description}</p>

                            <div className="course-meta">
                                <span>Category: {course.category || 'Uncategorized'}</span>
                                {course.accessType === 'paid' && (
                                    <span>₹{course.price}</span>
                                )}
                            </div>

                            <div className="course-actions">
                                <button
                                    onClick={() => handleTogglePublish(course._id, course.status)}
                                    className="btn-sm btn-secondary"
                                >
                                    {course.status === 'published' ? 'Unpublish' : 'Publish'}
                                </button>
                                <button
                                    onClick={() => handleToggleAccessType(course._id, course.accessType)}
                                    className="btn-sm btn-info"
                                >
                                    {course.accessType === 'free' ? 'Make Paid' : 'Make Free'}
                                </button>
                                <button
                                    onClick={() => handleDelete(course._id)}
                                    className="btn-sm btn-danger"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Modal */}
            {showCreateModal && (
                <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Create New Course</h2>
                            <button onClick={() => setShowCreateModal(false)} className="close-btn">×</button>
                        </div>

                        <form onSubmit={handleCreateCourse} className="course-form">
                            <div className="form-group">
                                <label>Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Description *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="e.g., Vedic Astrology"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Access Type</label>
                                    <select
                                        value={formData.accessType}
                                        onChange={(e) => setFormData({ ...formData, accessType: e.target.value })}
                                    >
                                        <option value="free">Free</option>
                                        <option value="paid">Paid</option>
                                    </select>
                                </div>

                                {formData.accessType === 'paid' && (
                                    <div className="form-group">
                                        <label>Price (₹)</label>
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                            min="0"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    Create Course
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;
