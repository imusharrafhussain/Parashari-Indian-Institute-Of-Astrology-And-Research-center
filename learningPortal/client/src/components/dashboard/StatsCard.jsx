import React from 'react';

export default function StatsCard({ label, value, icon }) {
    return (
        <div className="stat-card">
            <div className="stat-header">
                <span className="stat-icon">{icon}</span>
                <span className="stat-label">{label}</span>
            </div>
            <div className="stat-value">{value}</div>
        </div>
    );
}
