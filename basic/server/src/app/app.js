import express from "express";
import appRoutes from "../routes/app.routes.js";
export default function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/auth", appRoutes);
  return app;
}
