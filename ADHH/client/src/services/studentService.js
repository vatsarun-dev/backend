import { apiClient } from "./apiClient";

export const studentService = {
  register(payload) {
    return apiClient.post("/student/register", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
