import express from "express";
import securityMiddlewares from "./middlewares/security.middleware.js";
import GoogleStrategyMiddlewares from "./middlewares/googleOAuth.middleware.js";
import authRoutes from "./modules/auth/auth.route.js";
export default function createApp() {
  const app = express();

  securityMiddlewares(app);
  GoogleStrategyMiddlewares();

  app.use("/api/auth", authRoutes);

  return app;
}
