import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import CourseModules from './pages/CourseModules';
import CourseDetail from './pages/CourseDetail';
import CoursePlayer from './pages/CoursePlayer';
import Courses from './pages/Courses';
import Pricing from './pages/Pricing';
import AboutUs from './pages/AboutUs';
import MainLayout from './layout/MainLayout';
import './App.css';

// Strict Protected Route - requires session flag from auto-login
function StrictProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const cameFromABAI = sessionStorage.getItem('ab_ai_entry');

  if (!cameFromABAI || !token) {
    const target = import.meta.env.VITE_AB_AI_PRODUCTION_URL || 'https://www.parashariindia.com';
    window.location.href = target;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Redirecting...
      </div>
    );
  }

  return (
    <AuthProvider>
      <MainLayout>
        {children}
      </MainLayout>
    </AuthProvider>
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
  useEffect(() => {
    // Basic redirect safety net
    const target = import.meta.env.VITE_AB_AI_PRODUCTION_URL;
    const hasSession = sessionStorage.getItem('ab_ai_entry');
    if (target && !hasSession) {
      console.log('[App] Proactively redirecting to AB_AI (Safety Net)');
    }
  }, []);

  return (
    <Router basename="/learning-portal">
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
            <Route path="/course-v1/:id" element={
              <StrictProtectedRoute>
                <CourseDetail />
              </StrictProtectedRoute>
            } />
            <Route path="/course-player/:courseId" element={
              <StrictProtectedRoute>
                <CoursePlayer />
              </StrictProtectedRoute>
            } />
            <Route path="/pricing" element={
              <StrictProtectedRoute>
                <Pricing />
              </StrictProtectedRoute>
            } />
            <Route path="/about-us" element={
              <StrictProtectedRoute>
                <AboutUs />
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
