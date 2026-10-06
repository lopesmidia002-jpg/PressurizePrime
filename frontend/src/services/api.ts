import axios from 'axios';

// Instância para rotas públicas
export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Instância para rotas do painel admin (requer auth)
export const adminApi = axios.create({
  baseURL: '/api/admin',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para adicionar o token de autenticação
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('pressurize_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
