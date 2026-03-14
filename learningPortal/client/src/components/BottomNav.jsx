import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/BottomNav.css';

const BottomNav = () => {
    const navItems = [
        {
            name: 'Dashboard', path: '/dashboard', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            )
        },
        {
            name: 'Categories', path: '/categories', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            )
        },
        {
            name: 'Courses', path: '/courses', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
            )
        },
        {
            name: 'My Courses', path: '/my-learning', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            )
        },
        {
            name: 'Profile', path: '/profile', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            )
        }
    ];

    const navigate = useNavigate();

    const handleMyCourses = () => {
        navigate('/dashboard');
        setTimeout(() => {
            const el = document.getElementById('my-courses-section');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
    };

    return (
        <>
            {/* Floating AI Assistance button — sits above the navbar on the right */}
            <NavLink
                to="/settings"
                className={({ isActive }) => `ai-assist-fab${isActive ? ' active' : ''}`}
                title="AI Assistance"
            >
                <div className="ai-fab-loading">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span>AI Assistance</span>
            </NavLink>

            <nav className="bottom-nav">
                {navItems.map((item) => (
                    item.name === 'My Courses' ? (
                        <button
                            key={item.name}
                            className="nav-item"
                            onClick={handleMyCourses}
                        >
                            <span className="icon">{item.icon}</span>
                            <span className="label">{item.name}</span>
                        </button>
                    ) : (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                        >
                            <span className="icon">{item.icon}</span>
                            <span className="label">{item.name}</span>
                        </NavLink>
                    )
                ))}
            </nav>
        </>
    );
};

export default BottomNav;
