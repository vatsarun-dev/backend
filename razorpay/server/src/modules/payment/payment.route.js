import { Router } from "express";
import PaymentController from "./payment.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import isUser from "../../middlewares/user.middleware.js";

const paymentRoutes = Router();
const paymentController = new PaymentController();

paymentRoutes.post(
  "/",
  isUser,
  asyncHandler(paymentController.createPayment.bind(paymentController)),
);

paymentRoutes.post(
  "/verify",
  isUser,
  asyncHandler(paymentController.verifyPayment.bind(paymentController)),
);

export default paymentRoutes;
