import express from "express";
import securityMiddleware from "./middlewares/security.middleware.js";
export default function createApp() {
  const app = express();

  securityMiddleware(app);

  return app;
}
