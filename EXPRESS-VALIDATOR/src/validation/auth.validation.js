import { body } from "express-validator";
import { validRequest } from "../utils/validRequest.js";
export const registerValidationRule = [
  body("email")
    .toLowerCase()
    .notEmpty()
    .withMessage("Please provide the email")
    .isEmail()
    .withMessage("please provide a valid email"),
  body("contact")
    .notEmpty()
    .withMessage("please enter your number")
    .isMobilePhone("en-IN")
    .withMessage("please enter valid mobile number"),
  body("password")
    .notEmpty()
    .withMessage("enter your password")
    .isLength({ min: 6 })
    .withMessage("password must be 6 "),
  validRequest,
];
