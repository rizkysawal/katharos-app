import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BibleProvider } from './context/BibleContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Reader from './pages/Reader';

// Secret Staff Internal Pages (No public links)
import InternalLogin from './pages/internal/InternalLogin';
import AdminDashboard from './pages/internal/AdminDashboard';
import WriterDashboard from './pages/internal/WriterDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BibleProvider>
          <Routes>
            {/* 1. Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/read" element={<Reader />} />

            {/* 2. Secret Staff Login Route (URL manual access only) */}
            <Route path="/internal/login" element={<InternalLogin />} />

            {/* 3. Protected Staff Dashboards (Strict RBAC: Members kicked to '/') */}
            <Route
              path="/internal/admin/*"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/internal/writer/*"
              element={
                <ProtectedRoute allowedRoles={['writer', 'admin']}>
                  <WriterDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BibleProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
