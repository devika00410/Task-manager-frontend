import axios from 'axios';


const API = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://task-manager-gd2v.onrender.com'
    : 'http://localhost:8000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;