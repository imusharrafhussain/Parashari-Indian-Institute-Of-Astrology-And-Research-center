import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import DashboardLayout from '../layout/DashboardLayout';
import StatsCard from './dashboard/StatsCard';
import ContinueWatching from './dashboard/ContinueWatching';
import CourseCard from './dashboard/CourseCard';
import AnnouncementList from './dashboard/AnnouncementList';
import '../styles/DashboardAdvanced.css';

export default function DashboardAdvancedView() {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                // Single network request logic
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/dashboard/summary', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('Dashboard Data Received:', res.data);
                setSummary(res.data);
            } catch (err) {
                console.error('Dashboard Fetch Error Details:', {
                    message: err.message,
                    response: err.response?.data,
                    status: err.response?.status
                });
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    const handleUpgrade = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/payment/create-order', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Simulate direct verify for dummy
            await axios.post('/api/payment/verify', { orderId: res.data.id }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            window.location.reload();
        } catch (err) {
            alert('Upgrade failed. Please try again.');
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Loader />
                </div>
            </DashboardLayout>
        );
    }

    if (!summary || !summary.user) {
        return (
            <DashboardLayout>
                <div className="error-state" style={{ padding: '4rem', textAlign: 'center' }}>
                    <h2>Unable to load dashboard data</h2>
                    <p>We encountered an issue retrieving your profile. Please try logging in again.</p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
                    >
                        Retry Loading
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="dashboard-advanced-container">
                {/* 1. Hero Banner */}
                <section className="user-hero-banner">
                    <div className="hero-text">
                        <h1>Jai {summary.user?.name?.split(' ')[0] || 'User'}!</h1>
                        <p>Welcome back to your personalized learning dashboard.</p>
                    </div>
                    {summary.user && !summary.user.isPremium && (
                        <div className="upgrade-promo">
                            <button className="premium-upgrade-btn" onClick={handleUpgrade}>
                                Upgrade to Premium
                            </button>
                        </div>
                    )}
                </section>

                {/* 2. Main Dashboard Grid */}
                <div className="dashboard-main-grid">

                    {/* Left Side: Stats & Continue Watching */}
                    <div className="dashboard-content-main">
                        <div className="stats-row">
                            <StatsCard label="Enrolled" value={summary.stats?.totalCourses || 0} icon="📚" />
                            <StatsCard label="Completed" value={summary.stats?.lessonsCompleted || 0} icon="✅" />
                            <StatsCard label="Progress" value={`${summary.stats?.overallProgress || 0}%`} icon="📈" />
                            <StatsCard label="Certificates" value={summary.stats?.certificates || 0} icon="📜" />
                        </div>

                        <ContinueWatching data={summary.continueWatching} />
                    </div>

                    {/* Right Side: Sidebar (Announcements) */}
                    <aside className="dashboard-sidebar">
                        <AnnouncementList announcements={summary.announcements || []} />
                    </aside>

                </div>
            </div>
        </DashboardLayout>
    );
}
