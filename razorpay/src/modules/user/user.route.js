import { Router } from "express";
import UserController from "./user.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as validation from "../../validation/validationRule.js";
import passport from "passport";
import isUser from "../../middlewares/user.middleware.js";
const userRoutes = Router();

const userController = new UserController();

userRoutes.post(
  "/register",
  validation.registerValidationRule,
  asyncHandler(userController.createUserController.bind(userController)),
);

userRoutes.post(
  "/login",
  validation.loginValidationRule,
  asyncHandler(userController.loginUserController.bind(userController)),
);

userRoutes.post(
  "/addToCart/:id",
  isUser,
  asyncHandler(userController.addToCartController.bind(userController)),
);
userRoutes.post(
  "/removeToCart/:id",
  isUser,
  asyncHandler(userController.removeToCartController.bind(userController)),
);

export default userRoutes;
