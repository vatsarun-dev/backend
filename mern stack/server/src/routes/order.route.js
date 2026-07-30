import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware.js";
import * as orderController from "../controllers/order.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/", asyncHandler(orderController.getOrders));
router.get("/:id", asyncHandler(orderController.getOrderById));

router.post(
  "/",
  validateBody(["items"]),
  asyncHandler(orderController.createOrder),
);

router.patch(
  "/:id/status",
  adminMiddleware,
  validateBody(["status"]),
  asyncHandler(orderController.updateOrderStatus),
);

export default router;
