import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import IntroVideoPlayer from '../components/IntroVideoPlayer';
import PricingButton from '../components/PricingButton';
import TopInstructorsButton from '../components/TopInstructorsButton';
import AstrologerCard from '../components/AstrologerCard';
import DashboardAdvancedView from '../components/DashboardAdvancedView';
import '../styles/Dashboard.css';
import '../styles/Landing.css';
import '../styles/TopInstructors.css';

// Import instructor images
import arjunImg from '../assets/instructors/arjun.png';
import priyaImg from '../assets/instructors/priya.png';
import vikramImg from '../assets/instructors/vikram.png';

export default function Dashboard() {
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

    const toggleInstructors = () => {
        setShowInstructors(!showInstructors);
    };

    const handlePaidCoursesClick = () => {
        navigate('/categories');
    };

    const handleFreeCoursesClick = () => {
        // Placeholder per current implementation
        alert('Free Courses functionality coming soon!');
    };

    return (
        <div className="welcome-page-container dashboard-unified">

            {/* Top Section: Advanced Stats & Continue Watching */}
            <DashboardAdvancedView />

            {/* Middle Section: Path Selection (Free, Paid, All) */}
            <section className="path-selection-section" style={{ marginTop: '4rem', padding: '0 2rem' }}>
                <div style={{ maxWidth: '1146px', margin: '0 auto 3rem auto' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1.5rem'
                    }}>
                        <div style={{ textAlign: 'left' }}>
                            <h2 style={{ fontSize: '2rem', color: '#2d3748', fontWeight: '800', margin: 0 }}>Choose Your Learning Path</h2>
                            <div style={{ height: '4px', width: '50px', background: '#8B0000', marginTop: '0.75rem', borderRadius: '2px' }}></div>
                        </div>

                        <TopInstructorsButton
                            onClick={toggleInstructors}
                            isActive={showInstructors}
                        />

                        <PricingButton />
                    </div>

                    {showInstructors && (
                        <div className="instructors-grid">
                            {instructors.map((inst, idx) => (
                                <AstrologerCard key={idx} {...inst} />
                            ))}
                        </div>
                    )}
                </div>

                <div className="course-type-buttons" style={{ maxWidth: '1146px', margin: '0 auto' }}>
                    <div className="course-btn all-btn" onClick={handlePaidCoursesClick}>
                        <span className="premium-ribbon" data-label="FREE + PREMIUM"></span>
                        <span className="btn-icon">📚</span>
                        <span className="btn-text">All Courses</span>
                        <span className="btn-subtitle">Browse complete catalog</span>
                    </div>

                    <div className="course-btn paid-btn" onClick={handlePaidCoursesClick}>
                        <span className="premium-ribbon" data-label="PREMIUM"></span>
                        <span className="btn-icon">⭐</span>
                        <span className="btn-text">Paid Courses</span>
                        <span className="btn-subtitle">Access premium learning paths</span>
                    </div>

                    <div className="course-btn active-btn" onClick={handlePaidCoursesClick}>
                        <span className="btn-icon">⚡</span>
                        <span className="btn-text">My Courses</span>
                        <span className="btn-subtitle">Access your enrolled courses</span>
                    </div>

                    <div className="course-btn free-btn locked">
                        <div className="lock-overlay">🔒</div>
                        <span className="btn-icon">🎓</span>
                        <span className="btn-text">Free Courses</span>
                        <span className="btn-subtitle">Functionality coming soon</span>
                    </div>

                    <div className="course-btn completed-btn locked">
                        <div className="lock-overlay">🔒</div>
                        <span className="btn-icon">🏆</span>
                        <span className="btn-text">Completed</span>
                        <span className="btn-subtitle">Functionality coming soon</span>
                    </div>
                </div>
            </section>

            {/* Bottom Section: Introduction Video Section */}
            <section
                className="intro-video-section"
                style={{
                    marginTop: '2rem',
                    paddingBottom: '5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '1200px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    padding: '3rem 2rem 5rem'
                }}
            >
                <IntroVideoPlayer />
            </section>
        </div>
    );
}
