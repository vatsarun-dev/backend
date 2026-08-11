import axios from "axios";

const apiUrl = import.meta.env.VITE_URL || "https://backend-1-9jl7.onrender.com/api";

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

// Attach token from localStorage to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const registerApi       = async (data) => api.post("/user/register", data);
export const loginApi          = async (data) => api.post("/user/login", data);
export const getMeApi          = async ()     => api.get("/user/me");
export const getRazorpayKeyApi = async ()     => api.get("/user/razorpay-key");
export const paymentApi        = async ()     => api.post("/payment/");
export const verifyPaymentApi  = async (data) => api.post("/payment/verify", data);
export const sendName          = async (data) => api.post("/user/name", data);

export default api;
