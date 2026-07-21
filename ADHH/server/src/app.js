import express from "express";
import securityMiddlewares from "./middlewares/security.middleware.js";
import GoogleStrategyMiddlewares from "./middlewares/googleOAuth.middleware.js";
import authRoutes from "./modules/auth/auth.route.js";
import studentRoutes from "./modules/student/student.route.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import path from "path";
import { fileURLToPath } from "url";

export default function createApp() {
  const app = express();

  securityMiddlewares(app);
  GoogleStrategyMiddlewares();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "view"));
  app.use("/api/user", authRoutes);
  app.use("/api/student", studentRoutes);
  app.use(errorHandler);
  return app;
}
