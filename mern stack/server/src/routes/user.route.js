import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middlewares/auth.middleware.js";
import * as userController from "../controllers/user.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/", adminMiddleware, asyncHandler(userController.getUsers));
router.get("/:id", asyncHandler(userController.getUserById));
router.put("/:id", asyncHandler(userController.updateUser));
router.delete("/:id", adminMiddleware, asyncHandler(userController.deleteUser));

export default router;
