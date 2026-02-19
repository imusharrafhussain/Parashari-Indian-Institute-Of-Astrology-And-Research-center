import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const response = await dashboardAPI.getStats();
            if (response.data.success) {
                setStats(response.data.data);
            }
        } catch (error) {
            console.error('Failed to load stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading dashboard...</div>;
    }

    return (
        <div className="dashboard">
            <h1 className="page-title">Dashboard</h1>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats?.users?.total || 0}</div>
                        <div className="stat-label">Total Users</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📚</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats?.courses?.total || 0}</div>
                        <div className="stat-label">Total Courses</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats?.courses?.published || 0}</div>
                        <div className="stat-label">Published</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📝</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats?.courses?.draft || 0}</div>
                        <div className="stat-label">Drafts</div>
                    </div>
                </div>
            </div>

            {/* Content Stats */}
            <div className="content-stats">
                <h2>Content Overview</h2>
                <div className="stats-row">
                    <div className="stat-item">
                        <span className="stat-item-label">Modules:</span>
                        <span className="stat-item-value">{stats?.content?.modules || 0}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-item-label">Lessons:</span>
                        <span className="stat-item-value">{stats?.content?.lessons || 0}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-item-label">Free Courses:</span>
                        <span className="stat-item-value">{stats?.courses?.free || 0}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-item-label">Paid Courses:</span>
                        <span className="stat-item-value">{stats?.courses?.paid || 0}</span>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            {stats?.recentActivity && stats.recentActivity.length > 0 && (
                <div className="recent-activity">
                    <h2>Recent Activity</h2>
                    <div className="activity-list">
                        {stats.recentActivity.slice(0, 5).map((log) => (
                            <div key={log._id} className="activity-item">
                                <div className="activity-icon">
                                    {log.action === 'create' && '➕'}
                                    {log.action === 'update' && '✏️'}
                                    {log.action === 'delete' && '🗑️'}
                                    {log.action === 'login' && '🔐'}
                                </div>
                                <div className="activity-details">
                                    <div className="activity-text">
                                        <strong>{log.adminId?.name || 'Admin'}</strong> {log.action}d {log.targetModel}
                                    </div>
                                    <div className="activity-time">
                                        {new Date(log.createdAt).toLocaleDateString()} at{' '}
                                        {new Date(log.createdAt).toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
