import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  loginWithGoogleApi,
  loginInternalApi,
  fetchCurrentUserApi,
} from '../services/api';

const AuthContext = createContext(null);

const STORAGE_TOKEN = 'katharos_jwt_token';
const STORAGE_USER = 'katharos_user_profile';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_TOKEN) || null);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  // Validate or refresh session on initial load
  useEffect(() => {
    async function verifySession() {
      const savedToken = localStorage.getItem(STORAGE_TOKEN);
      if (!savedToken) {
        setIsLoading(false);
        return;
      }
      try {
        const currentUser = await fetchCurrentUserApi(savedToken);
        setUser(currentUser);
        localStorage.setItem(STORAGE_USER, JSON.stringify(currentUser));
      } catch (err) {
        console.warn('Session expired or invalid, logging out:', err.message);
        localStorage.removeItem(STORAGE_TOKEN);
        localStorage.removeItem(STORAGE_USER);
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    verifySession();
  }, []);

  // Google Login for Members (Jemaat)
  const loginWithGoogle = async (googlePayload) => {
    try {
      const res = await loginWithGoogleApi(googlePayload);
      const authToken = res.token;
      const authUser = res.user;

      setToken(authToken);
      setUser(authUser);

      localStorage.setItem(STORAGE_TOKEN, authToken);
      localStorage.setItem(STORAGE_USER, JSON.stringify(authUser));

      return { success: true, user: authUser };
    } catch (err) {
      console.error('Google login error:', err);
      return { success: false, error: err.message };
    }
  };

  // Internal Login for Staff (Admin & Writer)
  const loginInternal = async (email, password) => {
    try {
      const res = await loginInternalApi(email, password);
      const authToken = res.token;
      const authUser = res.user;

      setToken(authToken);
      setUser(authUser);

      localStorage.setItem(STORAGE_TOKEN, authToken);
      localStorage.setItem(STORAGE_USER, JSON.stringify(authUser));

      return { success: true, user: authUser };
    } catch (err) {
      console.error('Internal login error:', err);
      return { success: false, error: err.message };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(STORAGE_USER);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token && !!user,
        isLoading,
        isAdmin: user?.role === 'admin',
        isWriter: user?.role === 'writer',
        isMember: user?.role === 'member',
        loginWithGoogle,
        loginInternal,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
