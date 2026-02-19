import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Courses.css'; // New CSS file

export default function Courses() {
    const { token } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Get category from navigation state
    useEffect(() => {
        if (location.state?.category) {
            const catId = location.state.category;

            // Map slugs to exact Titles expected by Backend/Seed
            const titleMap = {
                'beginner': 'Beginner',
                'foundation': 'Foundation',
                'master': 'Master',
                'phd': 'PhD',
                'crash-course': 'Crash Course'
            };

            setSelectedCategory(titleMap[catId] || 'All');
        }
    }, [location.state]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Use PUBLIC endpoint to ensure all courses (free/paid) are visible
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/courses`);
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data.courses || []);
                }
            } catch (error) {
                console.error("Error fetching courses", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []); // No token dependency needed for public endpoint

    // TEMPORARY OVERRIDE: User requested to show ALL courses regardless of category
    const filteredCourses = courses;

    return (
        <div className="courses-page-container">
            {/* Header / Nav */}
            <div className="courses-header">
                <button className="back-btn" onClick={() => navigate('/dashboard')}>
                    ← Categories
                </button>
                <h2>{selectedCategory === 'All' ? 'All Courses' : `${selectedCategory} Courses`}</h2>
                <div className="spacer"></div>
            </div>

            {/* Content */}
            <div className="courses-content">
                {loading ? (
                    <div className="loading">Loading courses...</div>
                ) : filteredCourses.length > 0 ? (
                    <div className="course-grid">
                        {filteredCourses.map(course => (
                            <div key={course._id} className="course-card-item">
                                <div className="course-thumb">
                                    {course.thumbnail ? (
                                        <img src={course.thumbnail} alt={course.title} />
                                    ) : (
                                        <div className="thumb-placeholder">{course.title[0]}</div>
                                    )}
                                </div>
                                <div className="course-info">
                                    <div className="course-cats">
                                        <span className="badge">{course.level}</span>
                                    </div>
                                    <h3>{course.title}</h3>
                                    <p className="duration">⏱ {course.duration}</p>
                                    <button
                                        className="start-btn"
                                        onClick={() => navigate(`/course/${course._id}`)}
                                    >
                                        Start Learning
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <h3>No Valid Courses Found</h3>
                        <p>We couldn't find any courses in the "{selectedCategory}" category.</p>
                        <button onClick={() => setSelectedCategory('All')}>View All Courses</button>
                    </div>
                )}
            </div>
        </div>
    );
}
