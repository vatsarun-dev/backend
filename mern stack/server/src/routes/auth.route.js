import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import * as authController from "../controllers/auth.controller.js";

const router = Router();

router.post(
  "/register",
  validateBody(["name", "email", "password"]),
  asyncHandler(authController.register),
);

router.post(
  "/login",
  validateBody(["email", "password"]),
  asyncHandler(authController.login),
);

router.get("/profile", authMiddleware, asyncHandler(authController.profile));
router.post("/logout", authMiddleware, asyncHandler(authController.logout));

export default router;
