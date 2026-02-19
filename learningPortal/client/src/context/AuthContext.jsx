import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const response = await fetch(`${API_URL}/api/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                // ONLY logout if explicitly unauthorized or user not found
                // Prevents logout on 500 Server Error or Network hiccups
                if (response.status === 401 || response.status === 403 || response.status === 404) {
                    console.warn(`Auth check failed (${response.status}) - Logging out`);
                    logout();
                } else {
                    console.error('Server error during auth check - keeping session');
                }
            }
        } catch (error) {
            console.error('Network/Auth error:', error);
            // Do NOT logout on network error (server restarting, wifi drop)
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
        }

        const data = await response.json();
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        return data.user;
    };

    const signup = async (name, email, password) => {
        const response = await fetch(`${API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Signup failed');
        }

        const data = await response.json();
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        return data.user;
    };

    const logout = () => {
        // Clear local storage first
        localStorage.removeItem('token');
        sessionStorage.removeItem('ab_ai_entry'); // Clear AB_AI entry flag
        setToken(null);
        setUser(null);
        // Immediately redirect to AB_AI login - prevents any auth check messages
        window.location.replace(`${import.meta.env.VITE_AB_AI_PRODUCTION_URL}/login.html`);
    };

    return (
        <AuthContext.Provider value={{ user, token, setToken, setUser, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
