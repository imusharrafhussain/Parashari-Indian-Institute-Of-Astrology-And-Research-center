import React from 'react';
import '../styles/TopInstructors.css';

const TopInstructorsButton = ({ onClick, isActive }) => {
    return (
        <button
            className={`top-instructors-btn ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            <span className="star-icon">✨</span>
            Top Instructors
        </button>
    );
};

export default TopInstructorsButton;
