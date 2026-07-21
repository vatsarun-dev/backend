import { Router } from "express";
import AuthController from "./auth.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as validation from "../../validation/validationRule.js";
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

export default authRoutes;
