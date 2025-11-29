import axios from 'axios';

const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const backendUrl =
  import.meta.env.VITE_API_BASE_URL || (isLocal ? 'http://localhost:5001/api' : 'https://nawalowa-backend.onrender.com/api');

export const apiClient = axios.create({
  baseURL: backendUrl,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true, // Commented out to avoid CORS issues
});

apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn("Access to storage is not allowed", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const apiFileClient = axios.create({
  baseURL: backendUrl,
  headers: { 'Content-Type': 'multipart/form-data' },
  // withCredentials: true, // Commented out to avoid CORS issues
});

apiFileClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn("Access to storage is not allowed", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);
