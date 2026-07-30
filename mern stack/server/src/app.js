import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/error.middleware.js";

export default function createApp() {
  const app = express();

  // Backend only — no frontend connection configured here yet

  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({
      success: true,
      message: "Backend is running",
      timestamp: new Date().toISOString(),
    });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/orders", orderRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
