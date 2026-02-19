import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is logged in on mount
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const savedUser = localStorage.getItem('adminUser');

        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
            // Verify token is still valid
            authAPI.me()
                .then(res => {
                    if (res.data.success) {
                        setUser(res.data.user);
                        localStorage.setItem('adminUser', JSON.stringify(res.data.user));
                    }
                })
                .catch(() => {
                    // Token invalid, clear auth
                    logout();
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            setError(null);
            setLoading(true);

            const response = await authAPI.login(email, password);

            if (response.data.success) {
                const { token, user } = response.data;

                // Save to localStorage
                localStorage.setItem('adminToken', token);
                localStorage.setItem('adminUser', JSON.stringify(user));

                setUser(user);
                return { success: true };
            } else {
                throw new Error(response.data.error || 'Login failed');
            }
        } catch (err) {
            const errorMessage = err.response?.data?.error || err.message || 'Login failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            // Always clear local auth state
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            setUser(null);
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
