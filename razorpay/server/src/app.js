import express from "express";
import securityMiddleware from "./middlewares/security.middleware.js";
import GoogleMiddleware from "./middlewares/googleOauth.middleware.js";
import userRoutes from "./modules/user/user.route.js";
import adminRoutes from "./modules/admin/admin.route.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import paymentRoutes from "./modules/payment/payment.route.js";
export default function createApp() {
  const app = express();

  securityMiddleware(app);
  GoogleMiddleware();

  app.use("/api/admin", adminRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/payment", paymentRoutes);

  app.use(errorHandler);
  return app;
}
