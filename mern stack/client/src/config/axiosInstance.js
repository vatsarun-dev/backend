import axios from "axios";

// CONNECT HERE: set baseURL to your backend when connecting
// Example: baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000"
const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
