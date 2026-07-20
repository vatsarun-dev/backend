import { Router } from "express";
import AuthController from "./auth.controller.js";
const authRoutes = Router();
const authController = new AuthController();

authRoutes.get(
  "/register",
  authController.createUserController.bind(authController),
);
export default authRoutes;
