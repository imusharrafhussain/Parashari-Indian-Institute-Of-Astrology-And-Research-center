import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/Dashboard.css';

export default function AutoLogin() {
    const { token, setToken, setUser } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('Authenticating...');

    useEffect(() => {
        const urlToken = searchParams.get('token');

        if (!urlToken) {
            setStatus('No authentication token found');
            setTimeout(() => {
                window.location.href = 'http://localhost:3000/login.html';
            }, 1500);
            return;
        }

        validateAndLogin(urlToken);
    }, [searchParams]);

    const validateAndLogin = async (urlToken) => {
        try {
            // Validate token with server
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${urlToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();

                // Store token and user data
                localStorage.setItem('token', urlToken);
                setToken(urlToken);
                setUser(data.user);

                // CRITICAL: Mark that user came from AB_AI auto-login
                sessionStorage.setItem('ab_ai_entry', 'true');

                setStatus('Login successful! Redirecting to dashboard...');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 500);
            } else {
                throw new Error('Invalid token');
            }
        } catch (error) {
            console.error('Auto-login failed:', error);
            setStatus('Authentication failed. Redirecting to login...');
            setTimeout(() => {
                window.location.href = 'http://localhost:3000/login.html';
            }, 1500);
        }
    };

    return (
        <div className="auto-login-container" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'linear-gradient(135deg, #8B0000 0%, #4a0000 100%)',
            color: 'white'
        }}>
            <div style={{ fontSize: '3rem', marginBottom: '2rem' }}>⏳</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'normal' }}>{status}</h2>
        </div>
    );
}
