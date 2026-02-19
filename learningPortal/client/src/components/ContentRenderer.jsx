import { useState, useEffect } from 'react';
import HLSPlayer from './HLSPlayer';
import PDFViewer from './PDFViewer';

export default function ContentRenderer({ contentItem, token, onComplete }) {
    const [accessData, setAccessData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!contentItem) return;

        const fetchAccess = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch secure V2 access token/URL
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/content/${contentItem._id}/access`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || 'Access denied');
                }

                const data = await res.json();
                setAccessData(data);
            } catch (err) {
                console.error("Content access error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAccess();
    }, [contentItem, token]);

    if (!contentItem) {
        return <div className="content-placeholder">Select an item to start learning</div>;
    }

    if (loading) {
        return <div className="loading-spinner">Loading secure content...</div>;
    }

    if (error) {
        return (
            <div className="error-display">
                <h3>⚠️ Unable to load content</h3>
                <p>{error}</p>
                <p>Please ensure you are enrolled and have completed previous modules.</p>
            </div>
        );
    }

    if (!accessData) return null;

    // Render based on Type
    switch (contentItem.type) {
        case 'VIDEO':
            return (
                <div className="video-player-container">
                    <HLSPlayer
                        src={accessData.accessUrl}
                        token={token}
                        onVideoEnd={onComplete}
                        autoPlay={true}
                    />
                </div>
            );
        case 'PDF':
            return (
                <div className="pdf-viewer-container" style={{ height: '80vh' }}>
                    <PDFViewer
                        src={accessData.accessUrl}
                        token={token}
                    />
                    {/* Manual complete button for PDF */}
                    <button onClick={onComplete} className="mark-complete-btn">
                        Mark as Read
                    </button>
                </div>
            );
        case 'NOTE':
            // Notes might just be textContent (inline) or a URL (markdown)
            // Backend ContentItem has textContent OR metadata.contentUrl
            return (
                <div className="note-container">
                    <h2>{contentItem.title}</h2>
                    {contentItem.metadata?.textContent ? (
                        <div className="note-content" dangerouslySetInnerHTML={{ __html: contentItem.metadata.textContent }} />
                    ) : (
                        <div className="note-content">No content available.</div>
                    )}
                    <button onClick={onComplete} className="mark-complete-btn">
                        Mark as Read
                    </button>
                </div>
            );
        default:
            return <div>Unsupported content type: {contentItem.type}</div>;
    }
}
