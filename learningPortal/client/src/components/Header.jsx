import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HeaderLogo from './HeaderLogo';
import '../styles/Header.css';

const Header = ({ isMobile }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const userName = user?.name || 'User';

    return (
        <header className="main-header">
            <div className="header-inner">
                <div className="header-left">
                    <button
                        className="header-back-btn"
                        onClick={() => navigate(-1)}
                        title="Go Back"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <HeaderLogo size={40} />
                </div>

                <div className="header-right">
                    <div className="user-greeting">
                        <span className="welcome-text">Welcome,</span>
                        <span className="user-name">{userName}</span>
                    </div>

                    <div className="header-actions">
                        <button className="header-icon-btn logout-btn" onClick={logout} title="Logout">
                            <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
