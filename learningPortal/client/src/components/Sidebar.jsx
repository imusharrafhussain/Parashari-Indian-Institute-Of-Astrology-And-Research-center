import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';


const Sidebar = ({ isCollapsed, onToggle }) => {
    const menuItems = [
        {
            name: 'Dashboard', path: '/dashboard', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            )
        },
        {
            name: 'Categories', path: '/categories', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            )
        },
        {
            name: 'Courses', path: '/courses', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
            )
        },
        {
            name: 'My Courses', path: '/my-learning', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            )
        },
        {
            name: 'eBooks', path: '/notifications', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            )
        },
        {
            name: 'Profile', path: '/profile', icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            )
        },

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
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                {!isCollapsed && <span className="logo-text">Dashboard</span>}
                <button className="toggle-btn" onClick={onToggle}>
                    {isCollapsed ? '→' : '←'}
                </button>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    item.name === 'My Courses' ? (
                        <button
                            key={item.name}
                            className="nav-item"
                            onClick={handleMyCourses}
                        >
                            <span className="icon">{item.icon}</span>
                            {!isCollapsed && <span className="label">{item.name}</span>}
                        </button>
                    ) : (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
                        >
                            <span className="icon">{item.icon}</span>
                            {!isCollapsed && <span className="label">{item.name}</span>}
                        </NavLink>
                    )
                ))}
            </nav>

            {/* AI Assistance footer button */}
            <div className="sidebar-footer">
                <NavLink
                    to="/settings"
                    className={({ isActive }) => `sidebar-ai-btn${isActive ? ' active' : ''}`}
                    title="AI Assistance"
                >
                    <div className="sidebar-ai-loading">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    {!isCollapsed && <span className="sidebar-ai-label">AI Assistance</span>}
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;
