import express from "express";
import securityMiddlewares from "./middlewares/security.middleware.js";
import GoogleStrategyMiddlewares from "./middlewares/googleOAuth.middleware.js";
import authRoutes from "./modules/auth/auth.route.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
export default function createApp() {
  const app = express();

  securityMiddlewares(app);
  GoogleStrategyMiddlewares();

  app.use("/api/user", authRoutes);

  app.use(errorHandler);
  return app;
}
