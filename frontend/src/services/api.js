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
  try {

    const res =  await api.post("/auth/login/", data);
    
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    
    return res.data;
  } catch (err) {
    console.log("LOGIN ERROR:", err.response?.data);
    throw err;
  }
};

// REGISTER
export const registerUser = async (data) => {
    return await api.post("/auth/register/", data);
}

// ✅ GET CURRENT USER
export const getMe = async () => {
  return await api.get("/auth/me/");
};

export default api;