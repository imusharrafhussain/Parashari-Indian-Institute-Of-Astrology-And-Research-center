import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Courses />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Placeholder routes for sidebar links */}
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <div style={{ padding: '40px', textAlign: 'center' }}>
                    <h2>User Management</h2>
                    <p>Coming soon...</p>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/media"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <div style={{ padding: '40px', textAlign: 'center' }}>
                    <h2>Media Library</h2>
                    <p>Coming soon...</p>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />


          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
