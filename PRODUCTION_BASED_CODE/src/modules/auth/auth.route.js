import { Router } from "express";
import passport from "passport";
import AuthController from "./auth.controller.js";
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
  authController.GoogleCallBack.bind(authController),
);

export default routes;
