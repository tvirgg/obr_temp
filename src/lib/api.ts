import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Создаем перехватчик (interceptor) для всех исходящих запросов
api.interceptors.request.use(
  (config) => {
    // Перед каждым запросом получаем токен из localStorage
    const token = localStorage.getItem('token');
    // Если токен есть, добавляем его в заголовок Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Стандартный формат 'Bearer <token>'
    }
    return config;
  },
  (error) => Promise.reject(error)
);
