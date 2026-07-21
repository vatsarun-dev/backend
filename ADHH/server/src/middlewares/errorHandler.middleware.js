import { StatusCodes } from "http-status-codes";
const errorHandler = (err, req, res, next) => {
  console.error(err);

  const message = err.message || "Internal Server Errro";
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  return res.status(statusCode).json({
    message: message,
  });
};
export default errorHandler;
