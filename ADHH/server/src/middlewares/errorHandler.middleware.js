import { StatusCodes } from "http-status-codes";
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  console.error({
    message: err.message,
    statusCode,
    method: req.method,
    path: req.originalUrl,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });

  const message = err.message || "Internal Server Errro";
  return res.status(statusCode).json({
    message: message,
  });
};
export default errorHandler;
