import axios from "axios";

// Axios instance — uses Vite dev proxy so cookies work on the same origin
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// ─── Admin Auth ───────────────────────────────────────────────
export const adminRegister = (data) => api.post("/admin/register", data);
export const adminLogin = (data) => api.post("/admin/login", data);

// ─── Admin Products ───────────────────────────────────────────
export const createProduct = (data) => api.post("/admin/product", data);
export const getAllProducts = () => api.get("/admin/allproducts");
export const updateProduct = (id, data) =>
  api.patch(`/admin/product/${id}`, data);
export const deleteProduct = (id) => api.delete(`/admin/productDelete/${id}`);

// ─── User Auth ────────────────────────────────────────────────
export const userRegister = (data) => api.post("/user/register", data);
export const userLogin = (data) => api.post("/user/login", data);

// ─── User Products (user-accessible endpoint) ─────────────────
export const getUserProducts = () => api.get("/user/products");

// ─── User Cart ────────────────────────────────────────────────
export const getCart = () => api.get("/user/cart");
export const addToCart = (productId) =>
  api.post(`/user/addToCart/${productId}`);
export const removeFromCart = (productId) =>
  api.post(`/user/removeToCart/${productId}`);

// ─── Payment ──────────────────────────────────────────────────
export const createPaymentOrder = () => api.post("/payment/");
export const verifyPayment = (data) => api.post("/payment/verify", data);

export default api;
