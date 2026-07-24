import { Router } from "express";
import AuthController from "./auth.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as validation from "../../validation/validationRule.js";
import passport from "passport";
import env from "../../config/env.js";
const authRoutes = Router();

const authController = new AuthController();
const googleFailureRedirect = `${env.CLIENT_URL}/login?error=google_auth_failed`;

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

authRoutes.post(
  "/refresh-token",
  asyncHandler(authController.refreshTokenController.bind(authController)),
);

authRoutes.post(
  "/logout",
  asyncHandler(authController.logoutController.bind(authController)),
);

authRoutes.get(
  "/me",
  asyncHandler(authController.currentUserController.bind(authController)),
);

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: googleFailureRedirect,
    session: false,
  }),
  asyncHandler(authController.GoogleLoginController.bind(authController)),
);

authRoutes.post(
  "/forgot_password",
  asyncHandler(authController.forgotPasswordController.bind(authController)),
);
authRoutes.get(
  "/reset-password/:token",
  asyncHandler(authController.resetPasswordController.bind(authController)),
);
authRoutes.post(
  "/update-password/:id",
  asyncHandler(authController.updatePasswordController.bind(authController)),
);

export default authRoutes;
