import { apiClient } from "./apiClient";

export const studentService = {
  list() {
    return apiClient.get("/student");
  },
  search(query) {
    return apiClient.get("/student/search", { params: { q: query } });
  },
  dashboard() {
    return apiClient.get("/student/dashboard");
  },
  register(payload) {
    return apiClient.post("/student/register", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
