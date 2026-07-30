import ApiError from "../utils/ApiError.js";

export function validateBody(requiredFields = []) {
  return (req, res, next) => {
    const missing = requiredFields.filter((field) => !req.body[field]);

    if (missing.length) {
      return next(
        new ApiError(400, `Missing required fields: ${missing.join(", ")}`),
      );
    }

    next();
  };
}
