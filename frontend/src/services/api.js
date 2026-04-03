import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// 🔐 Create axios instance
const api = axios.create({
  baseURL: API,
});

// 🔥 Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ LOGIN
export const loginUser = async (data) => {
  return await api.post("/login/", data);
};

// REGISTER
export const registerUser = async (data) => {
    return await api.post("/register/", data);
}

// ✅ GET CURRENT USER
export const getMe = async () => {
  return await api.get("/me/");
};

export default api;