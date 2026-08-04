import { Router } from "express";
import PaymentController from "./payment.controller.js";
import isUser from "../../middlewares/user.middleware.js";
const paymentRoutes = Router();
const paymentController = new PaymentController();

paymentRoutes.post(
  "/",
  isUser,
  paymentController.createPayment.bind(paymentController),
);
paymentRoutes.post(
  "/verify",
  isUser,
  paymentController.verifyPayment.bind(paymentController),
);

export default paymentRoutes;
