import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IntroVideoPlayer from '../components/IntroVideoPlayer';
import PricingButton from '../components/PricingButton';
import TopInstructorsButton from '../components/TopInstructorsButton';
import AstrologerCard from '../components/AstrologerCard';
import DashboardAdvancedView from '../components/DashboardAdvancedView';
import '../styles/Dashboard.css';

// Import instructor images
import arjunImg from '../assets/instructors/arjun.png';
import priyaImg from '../assets/instructors/priya.png';
import vikramImg from '../assets/instructors/vikram.png';

const Dashboard = () => {
    const navigate = useNavigate();
    const [showInstructors, setShowInstructors] = useState(false);

    const instructors = [
        {
            name: "Pandit Arjun",
            about: "Expert in Vedic Astrology and Vastu Shastra with 20+ years of experience.",
            image: arjunImg,
            email: "arjun@astro.ai"
        },
        {
            name: "Dr. Priya",
            about: "Renowned Palmist and Astrologer specializing in relationship and career growth.",
            image: priyaImg,
            email: "priya@astro.ai"
        },
        {
            name: "Acharya Vikram",
            about: "Young Vedic scholar and author, providing modern insights into ancient astrology.",
            image: vikramImg,
            email: "vikram@astro.ai"
        }
    ];

    const handlePaidCoursesClick = () => {
        navigate('/categories');
    };

    return (
        <div className="dashboard-page">
            {/* Top Section: Advanced Stats & Continue Watching */}
            <DashboardAdvancedView />

            {/* Middle Section: Path Selection */}
            <section className="dashboard-section path-selection">
                <div className="section-header">
                    <div className="header-text-group">
                        <h2 className="section-title">Choose Your Learning Path</h2>
                        <p className="section-subtitle">Select the best way to start your astrological journey</p>
                    </div>

                    <div className="header-actions">
                        <TopInstructorsButton
                            onClick={() => setShowInstructors(!showInstructors)}
                            isActive={showInstructors}
                        />
                        <PricingButton />
                    </div>
                </div>

                {showInstructors && (
                    <div className="instructors-grid animate-in">
                        {instructors.map((inst, idx) => (
                            <AstrologerCard key={idx} {...inst} />
                        ))}
                    </div>
                )}

                <div className="course-path-grid">
                    <div className="path-card all" onClick={handlePaidCoursesClick}>
                        <div className="path-icon">📚</div>
                        <div className="path-info">
                            <h3 className="path-title">All Courses</h3>
                            <p className="path-desc">Browse our complete catalog of Vedic wisdom</p>
                        </div>
                        <div className="path-badge">Free + Premium</div>
                    </div>

                    <div className="path-card premium" onClick={handlePaidCoursesClick}>
                        <div className="path-icon">⭐</div>
                        <div className="path-info">
                            <h3 className="path-title">Paid Courses</h3>
                            <p className="path-desc">Deep dive with structured premium paths</p>
                        </div>
                        <div className="path-badge glass">Premium</div>
                    </div>

                    <div id="my-courses-section" className="path-card enrolled" onClick={handlePaidCoursesClick}>
                        <div className="path-icon">⚡</div>
                        <div className="path-info">
                            <h3 className="path-title">My Courses</h3>
                            <p className="path-desc">Resume your active learning journey</p>
                        </div>
                    </div>

                    <div className="path-card completed" onClick={handlePaidCoursesClick}>
                        <div className="path-icon">✅</div>
                        <div className="path-info">
                            <h3 className="path-title">Completed</h3>
                            <p className="path-desc">Review your finished certificates</p>
                        </div>
                    </div>

                    <div className="path-card locked">
                        <div className="lock-icon">🔒</div>
                        <div className="path-icon">🎓</div>
                        <div className="path-info">
                            <h3 className="path-title">Free Courses</h3>
                            <p className="path-desc">Coming soon to the platform</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="dashboard-section video-section">
                <div className="video-card">
                    <IntroVideoPlayer />
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
