import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ allowedRoles = [], children }) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf9] dark:bg-[#121212]">
        <div className="text-sm font-semibold text-stone-500 animate-pulse">
          Memverifikasi akses...
        </div>
      </div>
    );
  }

  // If not logged in, or if logged in as public member, immediately kick back to '/'
  if (!isAuthenticated || !user || user.role === 'member') {
    return <Navigate to="/" replace />;
  }

  // If user role is not within the specified allowed roles
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
