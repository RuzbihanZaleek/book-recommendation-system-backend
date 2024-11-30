const axios = require('axios');
require('dotenv').config();

const API_URL = process.env.API_URL;

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token if available
apiService.interceptors.request.use(
  (config) => {
    const token = process.env.JWT_SECRET;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = apiService;
