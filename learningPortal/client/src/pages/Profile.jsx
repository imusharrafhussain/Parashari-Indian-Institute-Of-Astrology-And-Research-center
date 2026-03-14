import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Profile.css';

// Placeholder mockup images
const userAvatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuB-1AWWhDl2oAS6YGY_66NI5qpV518sTxCu7ubQk-_LDemxa4Yx-PHknrKDZ9BGsaUPUFAEtztCegwJd_LvaX0p2xXtqrQSn7gXn6awKNV_ObZg61znrVeWLJW5YJcHATkvvHrcQPWFoFpG14MLr2SuXvOOf6ZjI7NJdVY85M1DIQWa2qr_cPsHcw71YXqrnGGJM9dM71LEP3Qm80vJPDJi7ff0EK-9eJVHHF4Zir3JmrgM97IDs6ShoT6-iy550vh1rgAkzG3WFe1Q";

const course1Url = "https://lh3.googleusercontent.com/aida-public/AB6AXuChWXozksssaBN39F8qGloJUdC_C1QAM-hEKiLdvE5yUGoapq352SABY0j81O9w461pnYTehJrkjmlVkTFsNT1r28qjP59CMRBUGXhk0iMl3kVISdljAr0g2jBdpopYdOem3rWwBZ5T-POI2XyNJV0a0IqknLTNxANhaDN-Nt2T70VFT-o8bHgmx-8XAtK3niI8JAdbgT-rS0e3CqNc67J4w_zXYTucdJ37x_iIiqNGUmA-6dpmLJYMqW7pyjt_Iw1AxN7BuATUhDVS";
const course2Url = "https://lh3.googleusercontent.com/aida-public/AB6AXuDe2yoixXH-Wd9_8JyO9H56MhcHQnF13WmNb1zbJ_4GemlAV1isAwZb44ITwISLEsn_Vzuga2N_bA0PDLL1a0ivUWkZ7OVTEydsPtTFQ4jz8l_ivz3haMhkTVgtaGY5sen6bYZ6LypGV-sox0fE9uUozu2pDaGnuVGoSmQSxoLi27HMBQOLmU9PJw9vCaEP_0TiB7oYZrG2zO2kXPq8lOsfEFM367vfwV-a9I9IEhYAQp_DdLogJyMynupOXkWMaYU21Hf5PYx58LDO";
const course3Url = "https://lh3.googleusercontent.com/aida-public/AB6AXuBsQjjmX_edK15sXf4aokAhXw-MDLDVXHP0qD8RQgqU41gh5mtOcaBAGv8wCpgPOdq5FH7yKum-AQyt-8mRAU2WQeT5_bZDpfaJz48hZgUJhGu3We9EqUbuSNqZEymbNTRUZxeYdp_odnsi_SaqQJpvEKUIZ9YsLQUZcfcZyov484ufKE4mAaFCuRSCFwm0bvG8vMBvbSoVimjHz3qELr_VFT10rCU0kmJ3SG9YmYdwn3s88k3vQWgDY9pzJYcrbWpxJ9Gtl-5ZYRpe";

const mockCourses = [
    {
        id: 1,
        title: "Advanced Vedic Astrology",
        category: "Advanced",
        module: "Module 4 of 12",
        progress: 65,
        image: course1Url
    },
    {
        id: 2,
        title: "Vastu Shastra Basics",
        category: "Beginner",
        module: "Module 2 of 8",
        progress: 25,
        image: course2Url
    },
    {
        id: 3,
        title: "Palmistry Mastery",
        category: "Mastery",
        module: "Module 9 of 10",
        progress: 90,
        image: course3Url
    }
];

const Profile = () => {
    const { user, logout } = useAuth();
    
    // Fallback names/email if auth hasn't loaded fully or user lacks info
    const displayName = user?.name || "Vedic Scholar";
    const displayEmail = user?.email || "scholar@astrobharat.ai";
    const displayPhone = "+91 98765 43210"; // Placeholder as per constraints

    return (
        <div className="profile-page-container">
            {/* Hero Section */}
            <div className="profile-hero-section">
                <div className="profile-glass-card">
                    <div className="profile-avatar-wrapper">
                        <img 
                            src={userAvatarUrl} 
                            alt="User Profile" 
                            className="profile-avatar"
                        />
                        <div className="profile-verified-badge">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </div>
                    
                    <h1 className="profile-name">{displayName}</h1>
                    <p className="profile-detail">{displayEmail}</p>
                    <p className="profile-detail">{displayPhone}</p>
                </div>
            </div>

            {/* My Courses Section */}
            <div className="profile-courses-section animate-in">
                <div className="profile-section-header">
                    <h3 className="profile-section-title">My Courses</h3>
                </div>
                
                <div className="profile-courses-list">
                    {mockCourses.map((course) => (
                        <div key={course.id} className="profile-course-card">
                            <img src={course.image} alt={course.title} className="profile-course-img" />
                            <div className="profile-course-info">
                                <div>
                                    <p className="profile-course-category">{course.category}</p>
                                    <h4 className="profile-course-title">{course.title}</h4>
                                    <p className="profile-course-module">{course.module}</p>
                                </div>
                                
                                <div className="profile-progress-wrapper">
                                    <div className="profile-progress-bar-bg">
                                        <div 
                                            className="profile-progress-bar-fill" 
                                            style={{ width: `${course.progress}%` }}
                                        ></div>
                                    </div>
                                    <button className="profile-resume-btn">Resume</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Account Settings */}
            <div className="profile-settings-section animate-in" style={{ animationDelay: '0.1s' }}>
                <h3 className="profile-settings-label">Account Settings</h3>
                <div className="profile-settings-list">
                    
                    <button className="profile-settings-btn">
                        <div className="profile-settings-btn-content">
                            <div className="profile-settings-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <span className="profile-settings-text">Change Password</span>
                        </div>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                    
                    <button className="profile-logout-btn-large" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default Profile;
