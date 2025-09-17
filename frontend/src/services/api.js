import axios from 'axios';

// Get the backend domain from environment or use default
const API_BASE_URL = import.meta.env.VITE_API_URL || `http://${import.meta.env.VITE_REPLIT_DEV_HOST || 'localhost'}:8080`;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authAPI = {
  register: (userData) => api.post('/api/auth/register', userData),
  login: (credentials) => api.post('/api/auth/login', credentials),
  // New API calls for password reset
  forgotPassword: (email) => api.post('/api/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) => api.post('/api/auth/reset-password', { token, newPassword }),
};

// URL Management APIs
export const urlAPI = {
  shorten: (originalUrl) => api.post('/api/urls/shorten', { originalUrl }),
  getUserUrls: () => api.get('/api/urls/myurls'),
  getAnalytics: (shortUrl, startDate, endDate) => 
    api.get(`/api/urls/analytics/${shortUrl}`, {
      params: { startDate, endDate }
    }),
  getTotalClicks: (startDate, endDate) =>
    api.get('/api/urls/totalClicks', {
      params: { startDate, endDate }
    }),
};

// Redirect API (no auth needed)
export const redirectAPI = {
  redirect: (shortUrl) => api.get(`/${shortUrl}`),
};

export default api;