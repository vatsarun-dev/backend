import { Router } from "express";
import StudentController from "./student.controller.js";
import { uploads } from "../../config/multer.js";
import asyncHandler from "../../utils/asyncHandler.js";
import * as validation from "../../validation/validationRule.js";

const studentRoutes = Router();
const studentController = new StudentController();

studentRoutes.post(
  "/register",

  uploads.single("image"),
  validation.studentValidationRule,
  asyncHandler(
    studentController.studentRegisterController.bind(studentController),
  ),
);
export default studentRoutes;
