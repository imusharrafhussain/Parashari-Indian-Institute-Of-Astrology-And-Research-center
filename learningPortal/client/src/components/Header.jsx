import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="welcome-header">
            <div className="header-logo">
                <img
                    src="/parashari-header-logo.png"
                    alt="AstroBharat Legacy"
                    className="logo-image"
                />
            </div>
            <div className="header-user">
                <span>Welcome, {user?.name || 'Student'}</span>
                <button onClick={logout} className="logout-btn-minimal">Logout</button>
            </div>
        </header>
    );
}
