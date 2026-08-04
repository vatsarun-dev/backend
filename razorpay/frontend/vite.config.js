import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Backend runs on :3000 — proxy all /api calls so cookies are sent
// on the same origin and avoid CORS issues.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
