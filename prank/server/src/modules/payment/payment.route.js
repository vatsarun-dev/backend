import { Router } from "express";
import isUser from "../../middlewares/isUser.middleware.js";
import PaymentController from "./payment.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";

const paymentRoutes = Router();
const paymentController = new PaymentController();

paymentRoutes.post(
  "/",
  isUser,
  asyncHandler(paymentController.createPayment.bind(paymentController)),
);
paymentRoutes.post(
  "/",
  isUser,
  asyncHandler(paymentController.verifyPayment.bind(paymentController)),
);
export default paymentRoutes;
