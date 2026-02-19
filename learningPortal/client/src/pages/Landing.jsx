import { useNavigate } from 'react-router-dom';
import IntroVideoPlayer from '../components/IntroVideoPlayer';
import '../styles/Landing.css';

export default function Landing() {
    const navigate = useNavigate();

    const handlePaidCoursesClick = () => {
        navigate('/categories');
    };

    const handleFreeCoursesClick = () => {
        // Placeholder - functionality to be added later
        console.log('Free Courses button clicked - functionality pending');
    };

    return (
        <div className="landing-container">
            {/* Hero Section */}
            <div className="landing-hero">
                <h1 className="landing-title">Welcome to Parashari Learning Portal</h1>
                <p className="landing-subtitle">Begin your journey into the world of astrology and spiritual wisdom</p>

                {/* Course Type Selection Buttons */}
                <div className="course-type-buttons">
                    <button
                        className="course-btn free-btn"
                        onClick={handleFreeCoursesClick}
                        title="Coming Soon"
                    >
                        <span className="btn-icon">🎓</span>
                        <span className="btn-text">Free Courses</span>
                        <span className="btn-subtitle">Explore introductory content</span>
                    </button>

                    <button
                        className="course-btn paid-btn"
                        onClick={handlePaidCoursesClick}
                    >
                        <span className="btn-icon">⭐</span>
                        <span className="btn-text">Paid Courses</span>
                        <span className="btn-subtitle">Access premium learning paths</span>
                    </button>
                </div>
            </div>

            {/* Introduction Video Section */}
            <section className="intro-video-section">
                <IntroVideoPlayer />
            </section>
        </div>
    );
}
