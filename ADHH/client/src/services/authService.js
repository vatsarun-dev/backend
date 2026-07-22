import { apiClient } from "./apiClient";

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
  updatePassword(userId, payload) {
    return apiClient.post(`/user/update-password/${userId}`, payload);
  },
  googleLoginUrl() {
    return "/api/user/google";
  },
};
