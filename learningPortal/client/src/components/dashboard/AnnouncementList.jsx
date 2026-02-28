import React from 'react';

export default function AnnouncementList({ announcements }) {
    return (
        <div className="announcement-list-container">
            <h4 className="section-title">Announcements</h4>
            <div className="announcement-box">
                {announcements && announcements.length > 0 ? (
                    <ul className="ann-list">
                        {announcements.map((ann, idx) => (
                            <li key={idx} className="ann-item">
                                <span className="ann-type">{ann.type}</span>
                                <p>{ann.message}</p>
                                <span className="ann-date">{new Date(ann.createdAt).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="empty-ann">No announcements yet.</div>
                )}
            </div>
        </div>
    );
}
