import axios from 'axios';

const backendUrl =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL: backendUrl,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true, // Commented out to avoid CORS issues
});

export const apiFileClient = axios.create({
  baseURL: backendUrl,
  headers: { 'Content-Type': 'multipart/form-data' },
  // withCredentials: true, // Commented out to avoid CORS issues
});
