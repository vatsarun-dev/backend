import { Router } from "express";
import StudentController from "./student.controller.js";
import { uploads } from "../../config/multer.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as validation from "../../validation/validationRule.js";

const studentRoutes = Router();
const studentController = new StudentController();

studentRoutes.get(
  "/",
  asyncHandler(studentController.listStudentsController.bind(studentController)),
);

studentRoutes.get(
  "/search",
  asyncHandler(
    studentController.searchStudentsController.bind(studentController),
  ),
);

studentRoutes.get(
  "/dashboard",
  asyncHandler(studentController.dashboardController.bind(studentController)),
);

studentRoutes.post(
  "/register",

  uploads.single("image"),
  validation.studentValidationRule,
  asyncHandler(
    studentController.studentRegisterController.bind(studentController),
  ),
);
export default studentRoutes;
