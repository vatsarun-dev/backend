import { Router } from "express";
import AuthController from "./auth.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as validation from "../../validation/validationRule.js";
import isUser from "../../middlewares/isUser.middleware.js";
import env from "../../config/env.js";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post(
  "/register",
  validation.registerValidationRule,
  asyncHandler(authController.createUserController.bind(authController)),
);

authRoutes.post(
  "/login",
  validation.loginValidationRule,
  asyncHandler(authController.loginUserController.bind(authController)),
);

// Returns Razorpay key ID to frontend — public key, safe to expose
authRoutes.get(
  "/razorpay-key",
  asyncHandler((req, res) => {
    res.status(200).json({ keyId: env.RAZORPAY_KEY_ID });
  }),
);

// Called on every page load to restore session from cookie
authRoutes.get(
  "/me",
  asyncHandler(isUser),
  asyncHandler((req, res) => {
    res.status(200).json({ user: req.user });
  }),
);

authRoutes.post(
  "/name",
  isUser,
  asyncHandler(authController.saveName.bind(authController)),
);

export default authRoutes;
