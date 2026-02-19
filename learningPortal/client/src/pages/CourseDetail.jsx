import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import ContentRenderer from '../components/ContentRenderer';
import '../styles/CourseDetailV2.css';

export default function CourseDetail() {
    const { id: courseId } = useParams();
    const navigate = useNavigate();

    // State
    const [course, setCourse] = useState(null);
    const [hierarchy, setHierarchy] = useState([]); // Modules -> Sections -> Items
    const [progress, setProgress] = useState({ contentProgress: {} });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    // Auth Token
    const token = localStorage.getItem('token');

    // Fetch Course & Progress
    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                // Parallel fetch: Course Hierarchy V2 + Progress V2
                const [courseRes, progressRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/courses/${courseId}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/progress/${courseId}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                ]);

                if (!courseRes.ok) throw new Error('Failed to load course');

                const courseData = await courseRes.json();
                setCourse(courseData.course);
                setHierarchy(courseData.hierarchy);

                if (progressRes.ok) {
                    const progressData = await progressRes.json();
                    setProgress(progressData);

                    // Resume logic: Find last accessed item
                    if (progressData.lastAccessedItemId) {
                        // Find item in hierarchy
                        let found = null;
                        for (const m of courseData.hierarchy)
                            for (const s of m.sections)
                                for (const i of s.contentItems)
                                    if (i._id === progressData.lastAccessedItemId) found = i;

                        if (found) setSelectedItem(found);
                    }
                }
            } catch (err) {
                console.error("Error loading course:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [courseId, token, navigate]);

    // Handle item selection
    const handleSelect = (item) => {
        setSelectedItem(item);
        if (window.innerWidth <= 768) {
            setMobileDrawerOpen(false); // Close drawer on mobile selection
        }
    };

    // Handle Item Completion
    const handleComplete = async () => {
        if (!selectedItem) return;

        // Optimistic Update
        const newProgress = { ...progress };
        newProgress.contentProgress[selectedItem._id] = {
            status: 'COMPLETED',
            progressPercent: 100,
            updatedAt: new Date()
        };
        setProgress(newProgress);

        // API Call
        try {
            await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v2/progress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    courseId,
                    contentId: selectedItem._id,
                    status: 'COMPLETED',
                    progressPercent: 100
                })
            });
            // Could re-fetch progress here to be safe, but optimistic is better UX
        } catch (e) {
            console.error("Failed to save progress", e);
        }
    };

    if (loading) return <div className="loading-screen">Loading Classroom...</div>;
    if (error) return <div className="error-screen">Error: {error}</div>;

    return (
        <div className="classroom-layout">
            {/* Mobile Header / Toggle */}
            <div className="mobile-header">
                <button className="menu-toggle" onClick={() => setMobileDrawerOpen(true)}>
                    ☰ Modules
                </button>
                <span className="course-title-mobile">{course?.title}</span>
            </div>

            {/* Sidebar (Drawer on mobile) */}
            <div className={`classroom-sidebar ${mobileDrawerOpen ? 'open' : ''}`}>
                <div className="sidebar-close-btn" onClick={() => setMobileDrawerOpen(false)}>×</div>
                <Sidebar
                    hierarchy={hierarchy}
                    progress={progress}
                    currentItem={selectedItem}
                    onSelect={handleSelect}
                />
            </div>

            {/* Main Content Area */}
            <div className="classroom-main">
                <div className="content-wrapper">
                    <ContentRenderer
                        contentItem={selectedItem}
                        token={token}
                        onComplete={handleComplete}
                    />
                </div>
            </div>

            {/* Mobile Overlay */}
            {mobileDrawerOpen && (
                <div className="drawer-overlay" onClick={() => setMobileDrawerOpen(false)}></div>
            )}
        </div>
    );
}
