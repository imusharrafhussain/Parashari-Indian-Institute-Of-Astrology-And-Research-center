import React from 'react';
import { Link } from 'react-router-dom';

export default function ContinueWatching({ data }) {
    if (!data) return null;

    return (
        <div className="continue-card">
            <h4 className="section-title">Continue Watching</h4>
            <div className="continue-content">
                <div className="continue-thumb">
                    <img src={data.thumbnail || 'https://via.placeholder.com/300x168?text=Lesson'} alt={data.courseTitle} />
                </div>
                <div className="continue-details">
                    <h3>{data.courseTitle}</h3>
                    <p>Current Progress: {data.progressPercent}%</p>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${data.progressPercent}%` }}></div>
                    </div>
                    <Link to={`/course/${data.courseId}`} className="resume-btn">
                        Resume Lesson
                    </Link>
                </div>
            </div>
        </div>
    );
}
