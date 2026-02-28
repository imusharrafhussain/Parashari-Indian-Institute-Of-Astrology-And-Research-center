import { useNavigate } from 'react-router-dom';
import IntroVideoPlayer from '../components/IntroVideoPlayer';
import DashboardAdvancedView from '../components/DashboardAdvancedView';
import '../styles/Dashboard.css';
import '../styles/Landing.css';

export default function Dashboard() {
    const navigate = useNavigate();

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
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2rem', color: '#2d3748', fontWeight: '800' }}>Choose Your Learning Path</h2>
                    <div style={{ height: '4px', width: '50px', background: '#8B0000', margin: '0.75rem auto', borderRadius: '2px' }}></div>
                </div>

                <div className="course-type-buttons">
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
