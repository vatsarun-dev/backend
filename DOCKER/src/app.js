import express from "express";
import morgan from "morgan";
import appRoutes from "./routes/app.route.js";
export default function createApp() {
  const app = express();
  app.use(express.json());
  app.use(morgan("dev"));
  app.use("/api/user", appRoutes);
  return app;
}
