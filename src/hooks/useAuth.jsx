import { useState, useEffect, createContext, useContext } from 'react';
import authService from '../services/authService';
const AuthContext = createContext(null);
export const AuthProvider = ({
  children
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    const hasToken = authService.isAuthenticated();
    if (currentUser && hasToken) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);
  const login = async credentials => {
    try {
      const response = await authService.login(credentials);
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Login failed. Please try again.'
      };
    }
  };
  const register = async userData => {
    try {
      const response = await authService.register(userData);
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'Registration failed. Please try again.'
      };
    }
  };
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };
  const updateProfile = async userData => {
    try {
      const response = await authService.updateProfile(userData);
      if (response.success && response.data) {
        setUser(response.data.user);
      }
      return response;
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        message: 'Failed to update profile.'
      };
    }
  };
  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};