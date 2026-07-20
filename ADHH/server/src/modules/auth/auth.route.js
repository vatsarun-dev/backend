import { Router } from "express";
import AuthController from "./auth.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import validationRule from "../../validation/validationRule.js";
const authRoutes = Router();

const authController = new AuthController();

authRoutes.get(
  "/register",
  validationRule,
  asyncHandler(authController.createUserController.bind(authController)),
);
export default authRoutes;
