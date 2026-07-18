import { Router } from "express";
import passport from "passport";
import AuthController from "./auth.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
const routes = Router();
const authController = new AuthController();

routes.get(
  "/register",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

routes.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  asyncHandler(authController.GoogleCallBack.bind(authController)),
);

routes.get(
  "/",
  asyncHandler(
    authController.accessTokenGenerationController.bind(authController),
  ),
);
export default routes;
