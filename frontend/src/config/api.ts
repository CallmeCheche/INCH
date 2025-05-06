
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
export const API_ENDPOINTS = {
  csrf: `${API_URL}/sanctum/csrf-cookie`,
  login: `${API_URL}/api/login`,
  register: `${API_URL}/api/register`,
  logout: `${API_URL}/api/logout`,
  user: `${API_URL}/api/user`,
};
