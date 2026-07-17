import express from "express";
import securityMiddlewares from "./middlewares/security.middleware.js";
import googleOAuthMiddleware from "./middlewares/googleOAuth.middleware.js";
import env from "./config/env.js";

export default function createApp() {
  const app = express();
  if (env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    securityMiddlewares(app);
    googleOAuthMiddleware(app);
  }
  return app;
}
