import { validationResult } from "express-validator";
export default async function validRequest(req, res, next) {
  const error = validationResult(req);
  if (error.isEmpty()) return next();

  const errors = error.array().map(({ path, msg }) => ({ field: path, msg }));
  return res.status(422).json({
    success: false,
    message: "Validation failed",
    errors,
  });
}
