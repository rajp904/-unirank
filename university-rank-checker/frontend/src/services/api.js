import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  res => res,
  err => {
    const message =
      err.response?.data?.error ||
      err.response?.data?.message ||
      (err.code === 'ECONNABORTED' ? 'Request timed out. Please try again.' : null) ||
      (err.message === 'Network Error' ? 'Cannot connect to server. Make sure backend is running.' : null) ||
      'Something went wrong. Please try again.';

    return Promise.reject({ ...err, userMessage: message });
  }
);

export const checkRank = async (registrationNumber) => {
  const response = await api.post('/check-rank', { registrationNumber });
  return response.data;
};

export default api;
