import axios from "axios";
const apiUrl = import.meta.env.VITE_URL || "http://localhost:3000/api";
// Axios instance — uses Vite dev proxy so cookies work on the same origin
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export const registerApi = async (data) => api.post("/user/register", data);
export const loginApi = async (data) => api.post("/user/login", data);
export const getMeApi = async () => api.get("/user/me");
export const paymentApi = async () => api.post("/payment/");
export const verifyPaymentApi = async (data) =>
  api.post("/payment/verify", data);
export const sendName = async (data) => api.post("/user/name", data);
export default api;
