import axios from "axios";

const backendUrl = process.env.BACKEND_URL;

export const apiClient = axios.create({
    baseURL: backendUrl,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export const apiFileClient = axios.create({
    baseURL: backendUrl,
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
});