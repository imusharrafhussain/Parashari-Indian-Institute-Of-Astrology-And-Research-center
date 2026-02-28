import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import HLSPlayer from '../components/HLSPlayer';
import '../styles/CoursePlayer.css';

export default function CoursePlayer() {
    const { courseId } = useParams();
    const { token, user } = useAuth();
    const [courseData, setCourseData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourseInfo();
    }, [courseId]);

    const fetchCourseInfo = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/courses/${courseId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            const data = await response.json();
            setCourseData(data.course);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribe = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/create-subscription-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id })
            });

            if (response.ok) {
                const data = await response.json();
                window.location.href = data.url;
            }
        } catch (error) {
            console.error('Subscription error:', error);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="error-container">
                <h2>Access Denied</h2>
                <p>{error}</p>
                <button onClick={handleSubscribe} className="btn-subscribe">
                    Subscribe to Watch This Course
                </button>
                <button onClick={() => navigate('/dashboard')} className="btn-back">
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="course-player">
            <div className="player-container">
                <h1>{courseData?.title}</h1>

                <div className="video-wrapper">
                    {/* HLS Video Player - Now using hls.js */}
                    <HLSPlayer
                        videoId={courseId}
                        token={token}
                        autoPlay={false}
                        onError={(err) => console.error('Video error:', err)}
                        className="hls-player"
                    />
                </div>

                {courseData?.resources && courseData.resources.length > 0 && (
                    <div className="resources-section">
                        <h3>Course Resources</h3>
                        <div className="resources-list">
                            {courseData.resources.map((resource, index) => (
                                <div
                                    key={index}
                                    className="resource-item"
                                >
                                    <span className="resource-icon">
                                        {resource.type === 'pdf' ? '📄' : resource.type === 'ebook' ? '📚' : '🔗'}
                                    </span>
                                    <span>{resource.title}</span>
                                    <span className="resource-meta">
                                        {resource.pages && `${resource.pages} pages`}
                                        {resource.size && ` • ${(resource.size / 1024 / 1024).toFixed(1)} MB`}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p className="resources-note">
                            ℹ️ Resources are view-only. Access expires automatically for security.
                        </p>
                    </div>
                )}

                <button onClick={() => navigate('/dashboard')} className="btn-back-dash">
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
}
