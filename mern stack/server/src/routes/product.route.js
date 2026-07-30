import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware.js";
import * as productController from "../controllers/product.controller.js";

const router = Router();

router.get("/", asyncHandler(productController.getProducts));
router.get("/:id", asyncHandler(productController.getProductById));

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validateBody(["name", "price", "category", "stock"]),
  asyncHandler(productController.createProduct),
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  asyncHandler(productController.updateProduct),
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  asyncHandler(productController.deleteProduct),
);

export default router;
