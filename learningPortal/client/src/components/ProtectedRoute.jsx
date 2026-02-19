import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '1.5rem',
                color: '#8B0000'
            }}>
                ⏳ Loading...
            </div>
        );
    }

    // If not authenticated, redirect to AB_AI login
    if (!user) {
        // Redirect to AB_AI login page
        window.location.href = 'http://localhost:3000/login.html';
        return null;
    }

    // User is authenticated, render the protected content
    return children;
}
