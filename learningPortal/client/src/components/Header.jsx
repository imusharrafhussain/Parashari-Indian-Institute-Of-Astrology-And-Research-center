import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const isSubPage = location.pathname !== '/dashboard' &&
        location.pathname !== '/landing' &&
        location.pathname !== '/';

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            {/* === FIRST HEADER: Logo only === */}
            <header className="welcome-header">
                <div className="header-logo">
                    <img
                        src="/parashari-header-logo.png"
                        alt="AstroBharat Legacy"
                        className="logo-image"
                    />
                </div>
            </header>

            {/* === SECOND HEADER: Back | Welcome + Logout (outside first header) === */}
            <div className="header-sub-bar">
                <div className="sub-bar-left">
                    {isSubPage && (
                        <button className="back-btn" onClick={handleBack} title="Back">
                            <div className="sign-back">
                                <svg viewBox="0 0 512 512">
                                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z"></path>
                                </svg>
                            </div>
                        </button>
                    )}
                </div>
                <div className="sub-bar-right">
                    <span className="welcome-text">Welcome, {user?.name || 'Student'}</span>
                    <button className="Btn" onClick={logout}>
                        <div className="sign">
                            <svg viewBox="0 0 512 512">
                                <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path>
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
}
