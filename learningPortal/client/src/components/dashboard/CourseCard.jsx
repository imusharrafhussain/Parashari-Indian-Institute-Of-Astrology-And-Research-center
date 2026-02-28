import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
    return (
        <div className="course-item-card">
            <span className="premium-ribbon"></span>
            <div className="course-img-wrapper">
                <img src={course.thumbnail || 'https://via.placeholder.com/300x168?text=Course'} alt={course.title} className="course-img" />
                <div className="course-progress-overlay">
                    {course.progress}%
                </div>
            </div>
            <div className="course-content">
                <h3>{course.title}</h3>
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${course.progress}%` }}></div>
                </div>
                <div className="card-footer">
                    <span className="progress-text">{course.progress}% Completed</span>
                    <Link to={`/course/${course.courseId}`} className="card-resume-btn">
                        Go to Course
                    </Link>
                </div>
            </div>
        </div>
    );
}
