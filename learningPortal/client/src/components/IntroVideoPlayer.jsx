import PropTypes from 'prop-types';
import HLSPlayer from './HLSPlayer';
import './IntroVideoPlayer.css';

/**
 * IntroVideoPlayer
 * Specialized component for the Landing/Dashboard introduction video.
 * Wraps HLSPlayer with custom branding and descriptive text.
 */
export default function IntroVideoPlayer({ className = '' }) {
    // Read URL from environment variable
    const videoUrl = import.meta.env.VITE_R2_INTRO_VIDEO_URL;

    return (
        <div className={`intro-video-container ${className}`} style={{ textAlign: 'center' }}>
            <div className="intro-header" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2.2rem', color: '#1a202c', fontWeight: '800' }}>Introduction to Parashari Learning Portal</h2>
                <div className="intro-subtitle" style={{ color: '#718096', letterSpacing: '2px', fontSize: '1rem', marginTop: '0.5rem', textTransform: 'uppercase' }}>
                    Begin your journey into Vedic Wisdom
                </div>
            </div>

            <div className="intro-player-wrapper">
                <HLSPlayer
                    src={videoUrl}
                    // Token not strictly needed if src is a direct signed URL or public R2 URL, 
                    // but if it's an API endpoint returning a signed URL (V1), it would use videoId.
                    // The requirement says "Read URL from env", implying a direct URL.
                    // If env var is empty, HLSPlayer handles empty src gracefully.
                    autoPlay={false}
                    customControls={true}
                    className="intro-hls-player"
                    poster="/parashari-intro-poster.jpg" // Optional poster if available
                />
            </div>

            <div className="intro-description-wrapper">
                <div className="intro-badge">About the Platform</div>
                <p className="intro-description-text">
                    Welcome to the <strong>Parashari Learning Portal</strong>, your gateway to mastering Vedic Astrology.
                    This platform is designed to provide a structured, simplified, and comprehensive learning experience.
                    Unlike traditional fragmented resources, our portal offers a step-by-step curriculum
                    blending ancient wisdom with modern pedagogical tools.
                    Explore our curated categories, track your progress, and immerse yourself in the profound
                    legacy of Maharishi Parashara.
                </p>
            </div>
        </div>
    );
}

IntroVideoPlayer.propTypes = {
    className: PropTypes.string
};
