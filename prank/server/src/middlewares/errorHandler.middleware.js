import { StatusCodes } from "http-status-codes";
import logger from "../config/logger.js";

export default function errorHandler(err, req, res, next) {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  // Only log actual server errors, not expected 401/404s
  if (statusCode >= 500) {
    logger.error({ err, path: req.originalUrl }, "Server error");
  }

  return res.status(statusCode).json({ message });
}
