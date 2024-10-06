import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001",  // URL da API local
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token a todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");  // Obtém o token do localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Adiciona o token no cabeçalho
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
