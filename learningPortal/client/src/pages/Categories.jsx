import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AIGuideBot from '../components/AIGuideBot';
import '../styles/Dashboard.css';

export default function Categories() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState(null);

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

    const handleCategoryHover = (catId) => {
        setActiveCategory(catId);
    };

    const handleCategoryLeave = () => {
        setActiveCategory(null);
    };

    // Handle tap for mobile
    const handleCategoryTap = (e, catId) => {
        e.stopPropagation();
        if (activeCategory === catId) {
            // Second tap - navigate
            handleCategoryClick(catId);
        } else {
            // First tap - show guide
            setActiveCategory(catId);
        }
    };

    return (
        <div className="welcome-page-container" onClick={handleCategoryLeave}>
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
                                onMouseEnter={() => handleCategoryHover(cat.id)}
                                onMouseLeave={handleCategoryLeave}
                                onClick={(e) => {
                                    // For mobile: use tap logic
                                    if (window.innerWidth <= 768) {
                                        handleCategoryTap(e, cat.id);
                                    } else {
                                        // For desktop: direct click
                                        handleCategoryClick(cat.id);
                                    }
                                }}
                            >
                                <div className="cat-icon">{cat.icon}</div>
                                <h3>{cat.title}</h3>
                                <p>{cat.desc}</p>
                                <span className="arrow-btn">➜</span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* AI Guide Bot - Global, bottom-right */}
            <AIGuideBot
                activeCategory={activeCategory}
                onClose={handleCategoryLeave}
            />
        </div>
    );
}
