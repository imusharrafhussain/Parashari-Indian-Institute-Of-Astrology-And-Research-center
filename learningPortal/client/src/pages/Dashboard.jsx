import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import IntroVideoPlayer from '../components/IntroVideoPlayer'; // New Component
import '../styles/Dashboard.css';

export default function Dashboard() {
    // const { user, logout } = useAuth(); // Moved to global Header
    const navigate = useNavigate();

    // The 5 Categories as requested
    const categories = [
        { id: 'beginner', title: 'Beginner', icon: '🌱', desc: 'Start your journey here' },
        { id: 'foundation', title: 'Foundation', icon: '🏛️', desc: 'Build solid basics' },
        { id: 'master', title: 'Master', icon: '🎓', desc: 'Deep dive into wisdom' },
        { id: 'phd', title: 'PhD', icon: '📜', desc: 'Research & Advanced' },
        { id: 'crash-course', title: 'Crash Course', icon: '⚡', desc: 'Fast track learning' }
    ];

    const handleCategoryClick = (catId) => {
        // Navigate to Course List with category filter
        navigate('/courses', { state: { category: catId } });
    };

    // Header is now global in App.jsx
    return (
        <div className="welcome-page-container">
            {/* Main Content */}
            <main className="welcome-content">
                <section className="path-selection-section">
                    <div className="intro-text">
                        <h2>Choose Your Learning Path</h2>
                        <p>Select a category to explore our curated courses</p>
                    </div>

                    <div className="category-grid">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                className="category-card"
                                onClick={() => handleCategoryClick(cat.id)}
                            >
                                <div className="cat-icon">{cat.icon}</div>
                                <h3>{cat.title}</h3>
                                <p>{cat.desc}</p>
                                <span className="arrow-btn">➜</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* AB_AI Introduction Section */}
                <section className="ab-ai-intro-section">
                    <div className="intro-divider"></div>

                    {/* New HLS Intro Video Component */}
                    <IntroVideoPlayer />

                </section>
            </main>
        </div>
    );
}
