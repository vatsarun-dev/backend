import { Router } from "express";
import StudentController from "./student.controller.js";
import { uploads } from "../../config/multer.js";
import asyncHandler from "../../utils/asyncHandler.js";

const studentRoutes = Router();
const studentController = new StudentController();

studentRoutes.post(
  "/register",
  uploads.single("image"),
  asyncHandler(
    studentController.studentRegisterController.bind(studentController),
  ),
);
export default studentRoutes;
