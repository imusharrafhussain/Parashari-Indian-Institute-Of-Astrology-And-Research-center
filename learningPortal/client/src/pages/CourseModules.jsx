import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HLSPlayer from '../components/HLSPlayer';
import SimpleErrorBoundary from '../components/SimpleErrorBoundary';
import ResourceReader from '../components/ResourceReader';
import '../styles/CourseModules.css';

export default function CourseModules() {
    const { id: courseId } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();

    const [error, setError] = useState(null);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedModules, setExpandedModules] = useState(new Set([0]));
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [progressMap, setProgressMap] = useState({});
    const [overallProgress, setOverallProgress] = useState(0);
    const [readingResource, setReadingResource] = useState(null);

    const progressUpdateQueue = useRef({});
    const saveTimeoutRef = useRef(null);
    const pendingPayloadRef = useRef(null);

    // ------------------------------------------------------------------
    // 1. Helper Functions (Hoisted before useEffect to avoid TDZ)
    // ------------------------------------------------------------------

    // Calculate Overall Progress
    const calculateOverallProgress = (currentCourse, currentProgressMap) => {
        if (!currentCourse || !currentCourse.modules) return;

        let totalVideos = 0;
        let completedVideos = 0;

        currentCourse.modules.forEach(mod => {
            if (mod.videos) {
                mod.videos.forEach(video => {
                    if (video.active !== false) {
                        totalVideos++;
                        const p = currentProgressMap[video._id];
                        if (p && p.status === 'COMPLETED') {
                            completedVideos++;
                        }
                    }
                });
            }
        });

        const percent = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
        setOverallProgress(percent);
    };

    // Progress Saving Logic
    const executeSave = async (payload) => {
        try {
            if (!token) return;
            await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/progress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
                keepalive: true
            });
            pendingPayloadRef.current = null;
        } catch (err) {
            console.error("Failed to save progress", err);
        }
    };

    const saveProgress = useCallback((contentId, data, immediate = false) => {
        if (!token || !courseId || courseId === 'undefined') return;
        if (!contentId || contentId === 'undefined') return;

        const payload = {
            courseId,
            contentId,
            ...data,
            clientTimestamp: new Date().toISOString()
        };

        setProgressMap(prev => {
            const next = {
                ...prev,
                [contentId]: { ...prev[contentId], ...data }
            };
            if (data && data.status === 'COMPLETED') {
                // We need 'course' from state here, but if called from useEffect, 'course' might be stale or not yet set?
                // Actually calculateOverallProgress is called with fresh 'fetchedCourse' in useEffect.
                // Here it uses state 'course'.
                if (course) calculateOverallProgress(course, next);
            }
            return next;
        });

        pendingPayloadRef.current = payload;

        if (immediate) {
            if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
            executeSave(payload);
        } else {
            if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
            saveTimeoutRef.current = setTimeout(() => {
                executeSave(payload);
            }, 10000);
        }
    }, [course, courseId, token]);

    // Player Handlers
    const handleVideoProgress = (metrics) => {
        if (!selectedVideo) return;
        const percent = metrics.duration > 0
            ? Math.min(100, Math.round((metrics.currentTime / metrics.duration) * 100))
            : 0;

        saveProgress(selectedVideo._id, {
            progressPercent: percent,
            lastPosition: metrics.currentTime,
            status: 'STARTED'
        }, false);
    };

    const handleVideoComplete = () => {
        if (!selectedVideo) return;
        saveProgress(selectedVideo._id, {
            status: 'COMPLETED',
            progressPercent: 100
        }, true);
    };

    // ------------------------------------------------------------------
    // 2. Data Fetching Effect
    // ------------------------------------------------------------------
    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                // A. Fetch Course Data
                const courseRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/courses/${courseId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!courseRes.ok) {
                    const errData = await courseRes.json().catch(() => ({}));
                    throw new Error(errData.error || 'Failed to fetch course');
                }

                const courseData = await courseRes.json();
                const fetchedCourse = courseData.course;
                setCourse(fetchedCourse);

                // B. Fetch User Progress
                const progressRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/progress/${courseId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                let initialProgress = {};
                if (progressRes.ok) {
                    const progressData = await progressRes.json();
                    initialProgress = progressData.contentProgress || {};
                    setProgressMap(initialProgress);
                }

                // C. Selection Logic
                if (fetchedCourse.modules && fetchedCourse.modules.length > 0) {
                    const firstModule = fetchedCourse.modules[0];
                    if (firstModule.videos && firstModule.videos.length > 0) {
                        setSelectedVideo(firstModule.videos[0]);
                    }
                }

                // D. Calculate Initial Overall Progress
                calculateOverallProgress(fetchedCourse, initialProgress);

            } catch (error) {
                console.error('Error loading course:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [courseId, token, navigate]);

    // Flush on Unload / Hidden
    useEffect(() => {
        const handleFlush = () => {
            if (pendingPayloadRef.current) {
                if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
                executeSave(pendingPayloadRef.current);
            }
        };

        const onVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                handleFlush();
            }
        };

        window.addEventListener('beforeunload', handleFlush);
        document.addEventListener('visibilitychange', onVisibilityChange);

        return () => {
            window.removeEventListener('beforeunload', handleFlush);
            document.removeEventListener('visibilitychange', onVisibilityChange);
            handleFlush();
        };
    }, [token]);

    if (loading) return <div className="loading-container">Loading course...</div>;

    if (error) return (
        <div className="error-container">
            <h3>Error Loading Course</h3>
            <p>{error}</p>
            <button onClick={() => navigate('/courses')}>Back to Courses</button>
        </div>
    );

    if (!course) return <div className="error-container">Course not found</div>;

    // Toggle/Helpers
    const toggleModule = (index) => {
        const newExpanded = new Set(expandedModules);
        if (newExpanded.has(index)) newExpanded.delete(index);
        else newExpanded.add(index);
        setExpandedModules(newExpanded);
    };

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    const handleResourceClick = (resource) => {
        setReadingResource(resource);
    };

    // Navigation Handlers
    const getNavigationState = () => {
        if (!course || !selectedVideo) return { hasPrev: false, hasNext: false };

        for (const module of course.modules) {
            if (!module.videos) continue;
            const vIndex = module.videos.findIndex(v => v._id === selectedVideo._id);
            if (vIndex !== -1) {
                return {
                    hasPrev: vIndex > 0,
                    hasNext: vIndex < module.videos.length - 1,
                    prevVideo: vIndex > 0 ? module.videos[vIndex - 1] : null,
                    nextVideo: vIndex < module.videos.length - 1 ? module.videos[vIndex + 1] : null
                };
            }
        }
        return { hasPrev: false, hasNext: false };
    };

    const { hasPrev, hasNext, prevVideo, nextVideo } = getNavigationState();

    const handlePreviousLesson = () => {
        if (hasPrev && prevVideo) handleVideoClick(prevVideo);
    };

    const handleNextLesson = () => {
        if (hasNext && nextVideo) handleVideoClick(nextVideo);
    };

    if (loading) return <div className="loading-container">Loading course...</div>;
    if (!course) return <div className="error-container">Course not found</div>;

    return (
        <SimpleErrorBoundary>
            <div className="course-modules-container">
                {/* Header */}
                <div className="modules-header">
                    <button className="back-btn" onClick={() => navigate('/courses')}>
                        ← Back to Courses
                    </button>
                    <h1>{course.title}</h1>
                    <p className="course-description">{course.description}</p>
                    <div className="progress-indicator">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${overallProgress}%` }}></div>
                        </div>
                        <span className="progress-text">{overallProgress}% Complete</span>
                    </div>
                </div>

                {/* Two-column layout */}
                <div className="course-layout">
                    {/* Left Panel - Modules Overview */}
                    <div className="modules-content">
                        <h2 className="section-title">MODULES OVERVIEW</h2>

                        {course.modules && course.modules.length > 0 ? (
                            <div className="modules-list">
                                {course.modules.map((module, index) => (
                                    <div key={module._id} className="module-item">
                                        <div className="module-header" onClick={() => toggleModule(index)}>
                                            <div className="module-title-section">
                                                <span className="module-icon">
                                                    {expandedModules.has(index) ? '▼' : '▶'}
                                                </span>
                                                <h3>{module.title}</h3>
                                            </div>
                                            <span className="video-count">{module.videos?.length || 0} videos</span>
                                        </div>

                                        {expandedModules.has(index) && (
                                            <div className="module-content">
                                                {module.videos && module.videos.length > 0 ? (
                                                    <ul className="video-list">
                                                        {module.videos.map((video) => {
                                                            const p = progressMap[video._id];
                                                            const isCompleted = p?.status === 'COMPLETED';
                                                            const isActive = selectedVideo?._id === video._id;

                                                            return (
                                                                <li
                                                                    key={video._id}
                                                                    className={`video-item ${isActive ? 'active' : ''}`}
                                                                    onClick={() => handleVideoClick(video)}
                                                                >
                                                                    <div className="video-info">
                                                                        <span className="video-icon">
                                                                            {isCompleted ? '✅' : (video.isFreePreview ? '▶' : '🔒')}
                                                                        </span>
                                                                        <span className="video-title">
                                                                            {video.title}
                                                                            {isActive && <span className="current-label" style={{ marginLeft: '8px', color: '#48BB78', fontWeight: 'bold', fontSize: '0.85em' }}>(Current)</span>}
                                                                        </span>
                                                                    </div>
                                                                    <span className="video-duration">
                                                                        {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')} min
                                                                    </span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                ) : (
                                                    <p className="no-videos">No videos in this module</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-modules">
                                <p>No modules available for this course yet.</p>
                            </div>
                        )}
                    </div>

                    {/* Right Panel - Lesson Details */}
                    <div className="lesson-details">
                        {selectedVideo ? (
                            <>
                                <div className="lesson-header">
                                    <h2>{selectedVideo.title}</h2>
                                    <span className="lesson-duration">
                                        ⏱ {Math.floor(selectedVideo.duration / 60)}:{String(selectedVideo.duration % 60).padStart(2, '0')} min
                                    </span>
                                </div>

                                <div className="lesson-video-player">
                                    <SimpleErrorBoundary>
                                        <HLSPlayer
                                            key={selectedVideo._id}
                                            videoId={selectedVideo._id}
                                            token={token}
                                            initialTime={progressMap[selectedVideo._id]?.lastPosition || 0}
                                            onProgress={handleVideoProgress}
                                            onComplete={handleVideoComplete}
                                        />
                                    </SimpleErrorBoundary>
                                </div>

                                <div className="lesson-info">
                                    <h3>About this lesson</h3>
                                    <p>
                                        {selectedVideo.description || 'Watch the video to learn more about the topic and gain practical insights.'}
                                    </p>
                                </div>

                                <div className="lesson-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <button
                                        className="btn-secondary btn-prev"
                                        onClick={handlePreviousLesson}
                                        disabled={!hasPrev}
                                        style={{
                                            opacity: hasPrev ? 1 : 0.5,
                                            cursor: hasPrev ? 'pointer' : 'not-allowed',
                                            visibility: hasPrev ? 'visible' : 'hidden'
                                        }}
                                    >
                                        ← Previous Lesson
                                    </button>
                                    <button
                                        className="btn-secondary btn-next"
                                        onClick={handleNextLesson}
                                        disabled={!hasNext}
                                        style={{
                                            opacity: hasNext ? 1 : 0.5,
                                            cursor: hasNext ? 'pointer' : 'not-allowed'
                                        }}
                                    >
                                        Next Lesson →
                                    </button>
                                </div>

                                {/* Dynamic Secure Resources */}
                                <div className="lesson-resources">
                                    <h3>Resources</h3>
                                    {selectedVideo.resources && selectedVideo.resources.length > 0 ? (
                                        <ul>
                                            {selectedVideo.resources.map(resource => (
                                                <li key={resource._id} onClick={() => handleResourceClick(resource)}>
                                                    <span className="resource-icon">
                                                        {resource.type === 'pdf' ? '📄' : '📖'}
                                                    </span>
                                                    <span>{resource.title}</span>
                                                    <span style={{ marginLeft: 'auto', fontSize: '0.8em', color: '#718096' }}>
                                                        (Read Only)
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p style={{ color: '#a0aec0', fontStyle: 'italic' }}>No resources available for this lesson.</p>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="no-selection">
                                <div className="no-selection-icon">📚</div>
                                <h3>Select a lesson to begin</h3>
                            </div>
                        )}
                    </div>
                </div>

                {/* Secure Reader Modal */}
                {readingResource && (
                    <ResourceReader
                        resourceId={readingResource._id}
                        resourceTitle={readingResource.title}
                        token={token}
                        onClose={() => setReadingResource(null)}
                    />
                )}
            </div>
        </SimpleErrorBoundary>
    );
}
