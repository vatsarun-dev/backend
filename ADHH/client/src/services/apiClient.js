import axios from "axios";
import { clearSession } from "../utils/auth";

export const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "https://backend-wbrl.onrender.com/api";

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  timeout: 20000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      clearSession();
      window.dispatchEvent(new CustomEvent("adhh:session-expired"));
    }
    return Promise.reject(error);
  },
);

export function getApiError(error) {
  const data = error?.response?.data;
  if (Array.isArray(data?.errors) && data.errors.length) {
    return data.errors.map((item) => item.msg || item.message).join(", ");
  }
  return data?.message || error?.message || "Something went wrong";
}
