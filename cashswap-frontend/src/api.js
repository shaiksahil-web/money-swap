import axios from 'axios';

// Use the env variable if available, otherwise default to Kubernetes service URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://backend-service:4000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
});

export default api;
