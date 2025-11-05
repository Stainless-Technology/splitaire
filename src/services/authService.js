import apiClient from '../utility/apiClient';
const authService = {
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData);
      if (response.success && response.data) {
        apiClient.setAuthToken(response.data.token);
        apiClient.setUser(response.data.user);
      }
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'Registration failed. Please try again.',
        error: error.message
      };
    }
  },
  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      if (response.success && response.data) {
        apiClient.setAuthToken(response.data.token);
        apiClient.setUser(response.data.user);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Login failed. Please try again.',
        error: error.message
      };
    }
  },
  logout() {
    apiClient.clearAuth();
    window.location.href = '/';
  },
  async getProfile() {
    try {
      return await apiClient.get('/auth/me');
    } catch (error) {
      console.error('Get profile error:', error);
      return {
        success: false,
        message: 'Failed to fetch profile.',
        error: error.message
      };
    }
  },
  async updateProfile(userData) {
    try {
      const response = await apiClient.put('/auth/profile', userData);
      if (response.success && response.data) {
        apiClient.setUser(response.data.user);
      }
      return response;
    } catch (error) {
      console.error('Update profile error:', error);
      return {
        success: false,
        message: 'Failed to update profile.',
        error: error.message
      };
    }
  },
  isAuthenticated() {
    return !!apiClient.getAuthToken();
  },
  getCurrentUser() {
    return apiClient.getUser();
  }
};
export default authService;