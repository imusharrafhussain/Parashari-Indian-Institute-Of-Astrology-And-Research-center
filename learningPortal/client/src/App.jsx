import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Categories from './pages/Categories';
import CourseModules from './pages/CourseModules';
import Courses from './pages/Courses';
import './App.css';

import Header from './components/Header';

// Strict Protected Route - requires session flag from auto-login
function StrictProtectedRoute({ children }) {
  // OPTIMISTIC CHECK: Check localStorage directly
  const token = localStorage.getItem('token');
  const cameFromABAI = sessionStorage.getItem('ab_ai_entry');
  const isDev = import.meta.env.DEV; // Vite environment variable

  // BYPASS: Allow access in Development mode if token exists
  // REMOVED BYPASS PER USER REQUEST - STRICT REDIRECT ALWAYS
  /*
  if (isDev && token && !cameFromABAI) {
    console.log('[DEV MODE] Bypassing StrictProtectedRoute session check');
    sessionStorage.setItem('ab_ai_entry', 'true-dev-bypass');
  } else 
  */
  if (!cameFromABAI) {
    // If not dev and no session flag -> Redirect
    console.log('Direct access blocked - redirecting to AB_AI');
    // window.location.href = 'http://localhost:3000/login.html'; // OLD
    // Use env var in production for safety fallback
    const target = import.meta.env.VITE_AB_AI_PRODUCTION_URL || 'http://localhost:3000';
    window.location.href = `${target}/login.html`;

    // Show a message while redirecting (fixes blank screen confusion)
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
      {children}
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

  // SECONDARY REDIRECT (Production Only -> Now ALL ENVS)
  useEffect(() => {
    // Check if we are already in a valid flow to avoid infinite reload loop
    // But StrictProtectedRoute handles the main pages. 
    // This top-level redirect is a fallback.
    // If strict protection kicks in, it redirects. 
    // We only need this if there are unprotected pages.
    // Checking PROD flag removed per user request to fix localhost issue.
    // Only redirect if NOT on a protected path that will handle itself?
    // Actually, simply checking if we want to enforce the base domain logic.

    // Safety: rely on StrictProtectedRoute for logic. 
    // This useEffect is mostly for the root path or uncaught scenarios.

    if (import.meta.env.PROD || true) { // Explicitly ENABLED for verification
      const target = import.meta.env.VITE_AB_AI_PRODUCTION_URL;
      // Dont redirect if we are on the target (shouldnt happen as they are diff ports)
      // Dont redirect if we check session?
      // User said: "It still open... fix this". 
      // The StrictProtectedRoute fix above should be enough for /dashboard.
      // Leaving this block but ensuring it doesn't conflict. 
      // If I redirect here unconditionally, valid users get kicked out.
      // So I will only redirect if NO session flag.

      const hasSession = sessionStorage.getItem('ab_ai_entry');
      if (target && !hasSession) {
        // Check if we are already on login page to avoid loop? 
        // But login page is on PORT 3000 (Target).
        // Localhost:5173/login is the React login.
        // Redirecting...
        console.log('[App] Proactively redirecting to AB_AI (Safety Net)');
        // window.location.replace(target); // Force redirect
      }
    }
  }, []);

  return (
    <Router>
      <AuthProvider>


        <ErrorBoundary>
          <Routes>
            {/* ONLY public route - auto-login from AB_AI */}
            <Route path="/login" element={<Login />} />

            {/* Landing page - shows Free/Paid course buttons */}
            <Route path="/landing" element={
              <StrictProtectedRoute>
                <Landing />
              </StrictProtectedRoute>
            } />

            {/* Categories page - shows 5 learning paths */}
            <Route path="/categories" element={
              <StrictProtectedRoute>
                <Categories />
              </StrictProtectedRoute>
            } />

            {/* Course listing */}
            <Route path="/courses" element={
              <StrictProtectedRoute>
                <Courses />
              </StrictProtectedRoute>
            } />

            {/* Course detail with modules */}
            <Route path="/course/:id" element={
              <StrictProtectedRoute>
                <CourseModules />
              </StrictProtectedRoute>
            } />

            {/* Redirect root and dashboard to landing page */}
            <Route path="/" element={
              <StrictProtectedRoute>
                <Navigate to="/landing" replace />
              </StrictProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <StrictProtectedRoute>
                <Navigate to="/landing" replace />
              </StrictProtectedRoute>
            } />

            {/* Redirect everything else to landing */}
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
