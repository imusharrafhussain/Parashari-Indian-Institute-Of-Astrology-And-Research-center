import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * PDF Viewer Component
 * Displays PDFs using signed URLs with automatic expiry handling
 */
export default function PDFViewer({ resourceId, token, className = '', ...props }) {
    const [signedUrl, setSignedUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // If src is provided directly (V2), use it. Otherwise fetch (V1 legacy)
    useEffect(() => {
        if (props.src) {
            setSignedUrl(props.src);
            setLoading(false);
        } else if (resourceId) {
            fetchSignedUrl();
        }
    }, [resourceId, props.src]);

    // Fetch signed URL from backend (Legacy V1)
    const fetchSignedUrl = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/resource/access/${resourceId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch resource URL');
            }

            const data = await response.json();
            setSignedUrl(data.signedUrl);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={`pdf-viewer-loading ${className}`}>
                <div>Loading resource...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`pdf-viewer-error ${className}`}>
                <div>⚠️ {error}</div>
                <button onClick={fetchSignedUrl}>Retry</button>
            </div>
        );
    }

    return (
        <iframe
            src={signedUrl}
            className={`pdf-viewer-iframe ${className}`}
            title="PDF Viewer"
            style={{
                width: '100%',
                height: '100%',
                border: 'none'
            }}
        />
    );
}

PDFViewer.propTypes = {
    resourceId: PropTypes.string,
    src: PropTypes.string,
    token: PropTypes.string.isRequired,
    className: PropTypes.string
};
