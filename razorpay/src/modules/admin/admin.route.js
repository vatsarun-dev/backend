import { Router } from "express";
import AdminController from "./admin.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as validation from "../../validation/validationRule.js";
import passport from "passport";
import isAdmin from "../../middlewares/isAdmin.middleware.js";
const adminRoutes = Router();

const adminController = new AdminController();

adminRoutes.post(
  "/register",
  validation.registerValidationRule,
  isAdmin,
  asyncHandler(adminController.createUserController.bind(adminController)),
);

adminRoutes.post(
  "/login",
  validation.loginValidationRule,
  isAdmin,
  asyncHandler(adminController.loginUserController.bind(adminController)),
);

export default adminRoutes;
