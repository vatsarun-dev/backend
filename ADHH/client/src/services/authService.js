import { apiBaseUrl, apiClient } from "./apiClient";

export const authService = {
  register(payload) {
    return apiClient.post("/user/register", payload);
  },
  login(payload) {
    return apiClient.post("/user/login", payload);
  },
  forgotPassword(payload) {
    return apiClient.post("/user/forgot_password", payload);
  },
  validateResetToken(token) {
    return apiClient.get(`/user/reset-password/${token}`);
  },
  updatePassword(userId, payload) {
    return apiClient.post(`/user/update-password/${userId}`, payload);
  },
  googleLoginUrl() {
    return `${apiBaseUrl}/user/google`;
  },
};
