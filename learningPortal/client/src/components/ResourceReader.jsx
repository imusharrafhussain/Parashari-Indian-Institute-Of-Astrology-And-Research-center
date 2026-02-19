import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker - LOCAL FILE (NOT CDN)
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const ResourceReader = ({ resourceId, resourceTitle, onClose, token }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dynamic Stream URL
    const fileUrl = `${import.meta.env.VITE_API_BASE_URL}/api/resource/stream/${resourceId}`;

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setLoading(false);
    }

    function onDocumentLoadError(err) {
        console.error('PDF Load Error:', err);
        setError('Failed to load document. Please try again.');
        setLoading(false);
    }

    const changePage = (offset) => {
        setPageNumber(prevPage => {
            const newPage = prevPage + offset;
            return Math.min(Math.max(newPage, 1), numPages || 1);
        });
    };

    const zoom = (factor) => {
        setScale(prev => Math.min(Math.max(prev * factor, 0.5), 3.0));
    };

    // UI Deterrents (Block Context Menu)
    useEffect(() => {
        const handleContextMenu = (e) => e.preventDefault();
        const handleKey = (e) => {
            // Block Ctrl+P (Print), Ctrl+S (Save)
            if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 's')) {
                e.preventDefault();
            }
        };

        window.addEventListener('contextmenu', handleContextMenu);
        window.addEventListener('keydown', handleKey);

        return () => {
            window.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('keydown', handleKey);
        };
    }, []);

    return (
        <div className="resource-reader-overlay">
            {/* Header */}
            <div className="reader-header">
                <h3 className="reader-title">{resourceTitle}</h3>
                <div className="reader-controls">
                    <button onClick={() => zoom(0.8)}>−</button>
                    <span>{Math.round(scale * 100)}%</span>
                    <button onClick={() => zoom(1.2)}>+</button>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>
            </div>

            {/* Content Container */}
            <div className="reader-content" onContextMenu={(e) => e.preventDefault()}>
                {loading && <div className="reader-loading">Loading Document...</div>}

                {error ? (
                    <div className="reader-pending-view">
                        <div className="pending-icon">✨</div>
                        <h3>Content Coming Soon</h3>
                        <p>We are currently uploading this resource.<br />Please check back shortly!</p>
                        <button className="close-btn-large" onClick={onClose}>Return to Lesson</button>
                    </div>
                ) : (
                    <div className="pdf-wrapper" style={{ userSelect: 'none' }}>
                        <Document
                            file={{
                                url: fileUrl,
                                httpHeaders: { 'Authorization': `Bearer ${token}` }
                            }}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={onDocumentLoadError}
                            loading={<div className="reader-loading">Loading...</div>}
                            error={<div className="reader-error">Failed to load PDF.</div>}
                        >
                            <Page
                                pageNumber={pageNumber}
                                scale={scale}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        </Document>
                    </div>
                )}

                {/* Transparent Overlay to block dragging/saving images */}
                <div className="security-overlay"></div>
            </div>

            {/* Footer / Pagination */}
            {numPages && (
                <div className="reader-footer">
                    <button
                        disabled={pageNumber <= 1}
                        onClick={() => changePage(-1)}
                    >
                        Previous
                    </button>
                    <span>
                        Page {pageNumber} of {numPages}
                    </span>
                    <button
                        disabled={pageNumber >= numPages}
                        onClick={() => changePage(1)}
                    >
                        Next
                    </button>
                </div>
            )}

            <style>{`
                .resource-reader-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.9);
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    color: white;
                }
                .reader-header {
                    padding: 1rem;
                    background: #1a202c;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #2d3748;
                }
                .reader-title {
                    margin: 0;
                    font-size: 1rem;
                    max-width: 60%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .reader-controls {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }
                .reader-controls button {
                    background: #2d3748;
                    border: none;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .close-btn {
                    background: #e53e3e !important;
                }
                .reader-content {
                    flex: 1;
                    overflow: auto;
                    display: flex;
                    justify-content: center;
                    background: #2d3748;
                    position: relative;
                    padding: 2rem;
                }
                .security-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10;
                    pointer-events: none; /* Allow scrolling but block direct interaction if needed, though react-pdf handles most */
                    /* Actually, we need to allow scrolling but maybe block image drag. */
                    /* Since react-pdf renders canvas, dragging is usually not an issue like <img> */
                }
                .reader-footer {
                    padding: 1rem;
                    background: #1a202c;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 2rem;
                    border-top: 1px solid #2d3748;
                }
                .reader-footer button {
                    background: #4a5568;
                    color: white;
                    border: none;
                    padding: 0.5rem 1.5rem;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .reader-footer button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .reader-loading {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    color: #a0aec0;
                }
                /* Custom "Content Coming Soon" View */
                .reader-pending-view {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    width: 100%;
                    color: white;
                    background: radial-gradient(circle at center, #2d3748 0%, #171923 100%);
                    text-align: center;
                    animation: fadeIn 0.5s ease-out;
                }
                .pending-icon {
                    font-size: 5rem;
                    margin-bottom: 1.5rem;
                    opacity: 0.9;
                    filter: drop-shadow(0 0 20px rgba(237, 137, 54, 0.3));
                }
                .reader-pending-view h3 {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                    font-weight: 700;
                    letter-spacing: -0.5px;
                    background: linear-gradient(to right, #f6ad55, #ed8936);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .reader-pending-view p {
                    font-size: 1.1rem;
                    color: #cbd5e0;
                    margin-bottom: 2.5rem;
                    max-width: 400px;
                    line-height: 1.6;
                }
                .close-btn-large {
                    background: linear-gradient(to right, #ed8936, #dd6b20);
                    border: none;
                    padding: 0.8rem 2.5rem;
                    color: white;
                    font-weight: 600;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-size: 0.9rem;
                }
                .close-btn-large:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 15px rgba(237, 137, 54, 0.4);
                    filter: brightness(1.1);
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default ResourceReader;
