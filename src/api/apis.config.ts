import axios from 'axios';

const backendUrl =
  import.meta.env.VITE_API_BASE_URL;

  console.log("url: "+backendUrl)

export const apiClient = axios.create({
  baseURL: backendUrl,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true, // Commented out to avoid CORS issues
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
