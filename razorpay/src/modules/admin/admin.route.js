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
  asyncHandler(adminController.createUserController.bind(adminController)),
);

adminRoutes.post(
  "/login",
  validation.loginValidationRule,
  asyncHandler(adminController.loginUserController.bind(adminController)),
);

adminRoutes.post(
  "/product",
  isAdmin,
  asyncHandler(adminController.createProductController.bind(adminController)),
);

adminRoutes.get(
  "/allproducts",
  isAdmin,
  asyncHandler(adminController.viewProductController.bind(adminController)),
);

adminRoutes.patch(
  "/product/:id",
  isAdmin,
  asyncHandler(adminController.updateProductController.bind(adminController)),
);
adminRoutes.delete(
  "/productDelete/:id",
  isAdmin,
  asyncHandler(adminController.deleteProductController.bind(adminController)),
);

export default adminRoutes;
