// src/services/config.js
import axios from "axios";

export const restLink = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
  headers: {
    "Content-Type": "application/json",
  },
});

restLink.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // 🔁 token plano
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
