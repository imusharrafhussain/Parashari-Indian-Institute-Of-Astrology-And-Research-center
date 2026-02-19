import { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';
import PropTypes from 'prop-types';
import './HLSPlayer.css'; // Ensure we have styles for custom controls

/**
 * HLS Video Player Component
 * Uses hls.js for adaptive bitrate streaming
 * Automatically handles URL expiry and refresh
 * Supports optional Custom Controls
 */
export default function HLSPlayer({
    videoId,
    src,
    token, // Optional if src is provided directly
    autoPlay = false,
    onError,
    onVideoEnd,
    // Custom Props for Progress Tracking
    onProgress,       // (metrics) => void
    onComplete,       // () => void
    initialTime = 0,  // Resume position
    customControls = false, // Toggle for custom UI
    poster = '',
    className = '',
    ...props
}) {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const hlsRef = useRef(null);
    const lastReportedTime = useRef(0);
    const cumulativeWatched = useRef(0);
    const hasCompleted = useRef(false);

    // Player State
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [signedUrl, setSignedUrl] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    // ... existing state ...
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [playbackRate, setPlaybackRate] = useState(1.0);

    const controlsTimeoutRef = useRef(null);

    // 1. Initial Source Handling
    useEffect(() => {
        if (src) {
            setSignedUrl(src);
            setLoading(false);
        } else if (videoId && token) {
            fetchSignedUrl();
        } else {
            // Wait for props
        }
    }, [videoId, src, token]);

    // Fetch signed URL (Legacy V1 support)
    const fetchSignedUrl = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/video/access/${videoId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch video URL');
            }

            const data = await response.json();
            setSignedUrl(data.signedUrl);
            return data.signedUrl;

        } catch (err) {
            console.error("HLS Fetch Error:", err);
            setError(err.message);
            if (onError) onError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Reset completion state when video changes
    useEffect(() => {
        hasCompleted.current = false;
        cumulativeWatched.current = 0;
        lastReportedTime.current = 0;
        // setCurrentTime(0); // Optional: reset visual time logic handled by player load
    }, [videoId]);

    // 2. HLS / Native Setup
    useEffect(() => {
        if (!signedUrl || !videoRef.current) return;

        const video = videoRef.current;
        let hls = null;

        // Resume Logic: Set initial time once metadata is loaded
        const applyResume = () => {
            if (initialTime > 0 && Math.abs(video.currentTime - initialTime) > 1) {
                video.currentTime = initialTime;
            }
        };

        const initPlayer = () => {
            if (signedUrl.includes('.mp4')) {
                video.src = signedUrl;
            } else if (Hls.isSupported()) {
                hls = new Hls({
                    enableWorker: true,
                    lowLatencyMode: false,
                    backBufferLength: 90
                });
                hlsRef.current = hls;
                hls.loadSource(signedUrl);
                hls.attachMedia(video);

                // Listen for duration updates
                hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
                    const dur = data.details.totalduration;
                    if (dur && !isNaN(dur)) {
                        setDuration(dur);
                    }
                });

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    applyResume();
                });

                // ... existing error handling ...
                hls.on(Hls.Events.ERROR, (event, data) => {
                    console.warn("HLS Error:", data.type, data.details, data.response?.code);

                    // Immediate 404 detection for Manifest Loading
                    if (data.details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR && data.response?.code === 404) {
                        setError('VIDEO_NOT_FOUND');
                        return; // Stop processing
                    }

                    if (data.fatal) {
                        switch (data.type) {
                            case Hls.ErrorTypes.NETWORK_ERROR:
                                if (data.response?.code === 403) {
                                    fetchSignedUrl();
                                } else if (data.response?.code === 404) {
                                    setError('VIDEO_NOT_FOUND');
                                } else {
                                    hls.startLoad();
                                }
                                break;
                            case Hls.ErrorTypes.MEDIA_ERROR:
                                hls.recoverMediaError();
                                break;
                            default:
                                setError('Video playback failed');
                                if (onError) onError(new Error('Fatal HLS error'));
                                break;
                        }
                    }
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                // Native HLS support (Safari)
                video.src = signedUrl;

                // Native duration listener
                const updateNativeDuration = () => setDuration(video.duration);
                video.addEventListener('loadedmetadata', () => {
                    updateNativeDuration();
                    applyResume();
                });
                video.addEventListener('durationchange', updateNativeDuration);
            } else {
                setError('HLS is not supported in this browser');
            }
        };

        initPlayer();

        if (autoPlay) {
            video.play().catch(e => console.log('Autoplay prevented:', e));
        }

        return () => {
            if (hls) hls.destroy();
            video.removeEventListener('loadedmetadata', () => { });
        };
    }, [signedUrl, autoPlay]); // Removed initialTime dependency to prevent re-seek on prop update only


    // 3. Custom Controls Logic
    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play().catch(e => console.error("Play error:", e));
            } else {
                videoRef.current.pause();
            }
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const time = videoRef.current.currentTime;
            const delta = time - lastReportedTime.current;

            setCurrentTime(time);

            // Anti-Cheat & Cumulative Watch Tracking
            // Only credit "watched" time if normal playback (0 < delta < 2s)
            // This ignores seeks (large jumps) and pauses (0 delta)
            if (delta > 0 && delta < 2.0) {
                cumulativeWatched.current += delta;
            }
            lastReportedTime.current = time;

            // Heartbeat: Report progress
            if (onProgress) {
                onProgress({
                    currentTime: time,
                    duration: videoRef.current.duration || duration,
                    playedSeconds: cumulativeWatched.current
                });
            }

            // Completion Check
            // Rule: Watch > 90% of duration
            const totalDuration = videoRef.current.duration || duration;
            if (totalDuration > 0 && !hasCompleted.current) {
                if (cumulativeWatched.current >= (totalDuration * 0.9)) {
                    hasCompleted.current = true;
                    if (onComplete) onComplete();
                }
            }
        }
    };

    const handleSeek = (e) => {
        const time = Number(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
            lastReportedTime.current = time; // Update tracking ref on seek
        }
    };

    const handleVolumeChange = (e) => {
        const val = Number(e.target.value);
        if (videoRef.current) {
            videoRef.current.volume = val;
            setVolume(val);
            setIsMuted(val === 0);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
            if (videoRef.current.muted) setVolume(0);
            else setVolume(1);
        }
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleSpeedChange = () => {
        const speeds = [1.0, 1.25, 1.5, 2.0];
        const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
        const nextSpeed = speeds[nextIdx];
        if (videoRef.current) {
            videoRef.current.playbackRate = nextSpeed;
            setPlaybackRate(nextSpeed);
        }
    };

    // Auto-hide controls
    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) setShowControls(false);
        }, 3000);
    };

    // Format time
    const formatTime = (time) => {
        if (isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Listeners for video state
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => {
            setIsPlaying(false);
            if (!hasCompleted.current) {
                hasCompleted.current = true;
                if (onComplete) onComplete();
            }
            if (onVideoEnd) onVideoEnd();
        };

        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('ended', onEnded);
        video.addEventListener('loadedmetadata', handleTimeUpdate);

        return () => {
            video.removeEventListener('play', onPlay);
            video.removeEventListener('pause', onPause);
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('ended', onEnded);
            video.removeEventListener('loadedmetadata', handleTimeUpdate);
        };
    }, [onVideoEnd, loading]); // Added loading dependency


    // RENDER
    if (loading && !signedUrl) {
        return <div className={`hls-player-loading ${className}`}>Loading...</div>;
    }

    if (error && !signedUrl) {
        const isNotFound = error === 'VIDEO_NOT_FOUND' || error.includes('404');
        return (
            <div className={`hls-player-error ${className} ${isNotFound ? 'video-unavailable' : ''}`}>
                {isNotFound ? (
                    <div className="unavailable-content">
                        <span className="icon">⏳</span>
                        <h3>Course video will be available soon</h3>
                        <p>We are currently updating this lesson's content.</p>
                    </div>
                ) : (
                    <span>⚠️ {error}</span>
                )}
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`hls-player-wrapper ${className} ${isFullscreen ? 'fullscreen' : ''}`}
            onMouseMove={customControls ? handleMouseMove : undefined}
            onMouseLeave={customControls ? () => setShowControls(false) : undefined}
        >
            <video
                ref={videoRef}
                className="hls-video-element"
                controls={!customControls} // Disable native if custom
                playsInline
                poster={poster}
                onClick={customControls ? togglePlay : undefined}
            />

            {/* Custom Controls Overlay */}
            {customControls && (
                <div className={`custom-controls-overlay ${showControls || !isPlaying ? 'visible' : 'hidden'}`}>

                    {/* Big Center Play Button (only when paused) */}
                    {!isPlaying && (
                        <button className="big-play-btn" onClick={togglePlay}>
                            <svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </button>
                    )}

                    {/* Bottom Control Bar */}
                    <div className="control-bar-bottom">
                        {/* Progress Bar */}
                        <div className="progress-container">
                            <input
                                type="range"
                                min="0"
                                max={duration > 0 ? duration : 100}
                                step="any"
                                value={currentTime}
                                onChange={handleSeek}
                                className="seek-slider"
                                style={{
                                    backgroundSize: `${duration > 0 ? (currentTime / duration) * 100 : 0}% 100%`
                                }}
                            />
                        </div>

                        <div className="controls-row">
                            <div className="controls-left">
                                <button onClick={togglePlay} className="control-btn">
                                    {isPlaying ? (
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                                    )}
                                </button>

                                <div className="volume-control">
                                    <button onClick={toggleMute} className="control-btn">
                                        {isMuted || volume === 0 ? (
                                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                                        )}
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        className="volume-slider"
                                    />
                                </div>

                                <span className="time-display">
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </span>
                            </div>

                            <div className="controls-right">
                                <button onClick={handleSpeedChange} className="control-btn speed-btn">
                                    {playbackRate}x
                                </button>
                                <button onClick={toggleFullscreen} className="control-btn">
                                    {isFullscreen ? (
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" /></svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

HLSPlayer.propTypes = {
    videoId: PropTypes.string,
    src: PropTypes.string,
    token: PropTypes.string, // Not needed if src provided
    autoPlay: PropTypes.bool,
    onError: PropTypes.func,
    onVideoEnd: PropTypes.func,
    className: PropTypes.string,
    customControls: PropTypes.bool,
    poster: PropTypes.string
};
