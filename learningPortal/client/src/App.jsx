import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import CourseModules from './pages/CourseModules';
import Courses from './pages/Courses';
import Pricing from './pages/Pricing';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';

// Strict Protected Route - requires session flag from auto-login
function StrictProtectedRoute({ children }) {
  // OPTIMISTIC CHECK: Check localStorage directly
  const token = localStorage.getItem('token');
  const cameFromABAI = sessionStorage.getItem('ab_ai_entry');
  const isDev = import.meta.env.DEV; // Vite environment variable

  if (!cameFromABAI) {
    // If no session flag -> Redirect
    console.log('Direct access blocked - redirecting to AB_AI');
    const target = import.meta.env.VITE_AB_AI_PRODUCTION_URL || 'http://localhost:3000';
    window.location.href = `${target}/login.html`;

    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        color: '#666'
      }}>
        <h2>Redirecting to Login...</h2>
        <p>Security check: Session flag missing.</p>
      </div>
    );
  }

  // If no token in storage, redirect
  if (!token) {
    console.log('No token found - redirecting to AB_AI');
    const target = import.meta.env.VITE_AB_AI_PRODUCTION_URL || 'http://localhost:3000';
    window.location.href = `${target}/login.html`;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Redirecting...
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="portal-content-wrapper" style={{ position: 'relative' }}>
        {children}
      </div>
      <Footer />
    </>
  );
}

// Simple Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: 'red', backgroundColor: 'white', minHeight: '100vh' }}>
          <h1>Something went wrong.</h1>
          <h3>{this.state.error && this.state.error.toString()}</h3>
          <pre style={{ overflow: 'auto' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const token = localStorage.getItem('token');
  const session = sessionStorage.getItem('ab_ai_entry');
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    if (import.meta.env.PROD || true) {
      const target = import.meta.env.VITE_AB_AI_PRODUCTION_URL;
      const hasSession = sessionStorage.getItem('ab_ai_entry');
      if (target && !hasSession) {
        console.log('[App] Proactively redirecting to AB_AI (Safety Net)');
      }
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ErrorBoundary>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <StrictProtectedRoute>
                <Dashboard />
              </StrictProtectedRoute>
            } />
            <Route path="/landing" element={
              <StrictProtectedRoute>
                <Navigate to="/dashboard" replace />
              </StrictProtectedRoute>
            } />
            <Route path="/categories" element={
              <StrictProtectedRoute>
                <Categories />
              </StrictProtectedRoute>
            } />
            <Route path="/courses" element={
              <StrictProtectedRoute>
                <Courses />
              </StrictProtectedRoute>
            } />
            <Route path="/course/:id" element={
              <StrictProtectedRoute>
                <CourseModules />
              </StrictProtectedRoute>
            } />
            <Route path="/pricing" element={
              <StrictProtectedRoute>
                <Pricing />
              </StrictProtectedRoute>
            } />
            <Route path="/" element={
              <StrictProtectedRoute>
                <Navigate to="/dashboard" replace />
              </StrictProtectedRoute>
            } />
            <Route path="*" element={
              <StrictProtectedRoute>
                <Navigate to="/landing" replace />
              </StrictProtectedRoute>
            } />
          </Routes>
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
}

export default App;
