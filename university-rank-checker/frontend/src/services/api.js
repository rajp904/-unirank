import axios from 'axios';

// Always an absolute URL.
// Development:  VITE_API_URL=http://localhost:8080  → http://localhost:8080/api
// Production:   VITE_API_URL=https://unirank-j7s4.onrender.com → https://unirank-j7s4.onrender.com/api
const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  console.error('[UniRank] VITE_API_URL is not set. Check your .env file.');
}

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.error ||
      err.response?.data?.message ||
      (err.code === 'ECONNABORTED'
        ? 'Request timed out. Please try again.'
        : null) ||
      (err.message === 'Network Error'
        ? 'Cannot reach the server. Please check your connection.'
        : null) ||
      'Something went wrong. Please try again.';

    return Promise.reject({ ...err, userMessage: message });
  }
);

export const checkRank = async (registrationNumber) => {
  const response = await api.post('/check-rank', { registrationNumber });
  return response.data;
};

export default api;
