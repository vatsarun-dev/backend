import { Router } from "express";
import AuthController from "./auth.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as validation from "../../validation/validationRule.js";
import passport from "passport";
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

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),

  authRoutes.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/register",
      session: false,
    }),
    authController.GoogleLoginController.bind(authController),
  ),
);

authRoutes.post(
  "/forgot_password",
  authController.forgotPasswordController.bind(authController),
);
authRoutes.get(
  "/reset-password/:token",
  authController.resetPasswordController.bind(authController),
);
authRoutes.post(
  "/update-password/:id",
  authController.updatePasswordController.bind(authController),
);

export default authRoutes;
