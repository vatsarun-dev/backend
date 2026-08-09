import axios from "axios";
const apiUrl = "https://backend-1-9jl7.onrender.com/api/";
// Axios instance — uses Vite dev proxy so cookies work on the same origin
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export const registerApi = async (data) => api.post("/user/register", data);
export const loginApi = async (data) => api.post("/user/login", data);
export const getMeApi = async () => api.get("/user/me");
export const getRazorpayKeyApi = async () => api.get("/user/razorpay-key");
export const paymentApi = async () => api.post("/payment/");
export const verifyPaymentApi = async (data) =>
  api.post("/payment/verify", data);
export const sendName = async (data) => api.post("/user/name", data);
export default api;
