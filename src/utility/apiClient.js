import config from '../config/apiConfig';
class ApiClient {
  constructor() {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout;
    this.headers = {
      ...config.headers
    };
  }
  getAuthToken() {
    return localStorage.getItem('token');
  }
  setAuthToken(token) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  setUser(user) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }
  clearAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  buildHeaders(customHeaders = {}) {
    const headers = {
      ...this.headers,
      ...customHeaders
    };
    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }
  handleError(error) {
    if (error.response) {
      const {
        status,
        data
      } = error.response;
      if (status === 401) {
        this.clearAuth();
        window.location.href = '/login';
      }
      return {
        success: false,
        message: data.message || 'An error occurred',
        error: data.error || 'Request failed',
        status
      };
    } else if (error.request) {
      return {
        success: false,
        message: 'Unable to connect to server. Please check your internet connection.',
        error: 'Network error',
        status: 0
      };
    } else {
      return {
        success: false,
        message: 'An unexpected error occurred',
        error: error.message,
        status: 0
      };
    }
  }
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.buildHeaders(options.headers);
    const fetchOptions = {
      ...options,
      headers
    };
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    fetchOptions.signal = controller.signal;
    try {
      const response = await fetch(url, fetchOptions);
      clearTimeout(timeoutId);
      const data = await response.json();
      if (!response.ok) {
        return this.handleError({
          response: {
            status: response.status,
            data
          }
        });
      }
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        return {
          success: false,
          message: 'Request timed out. Please try again.',
          error: 'Timeout',
          status: 0
        };
      }
      return this.handleError({
        message: error.message
      });
    }
  }
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, {
      method: 'GET'
    });
  }
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }
}
const apiClient = new ApiClient();
export default apiClient;