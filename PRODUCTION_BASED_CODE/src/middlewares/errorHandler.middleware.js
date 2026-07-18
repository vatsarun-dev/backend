const errorHandlerMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  return res
    .status(statusCode)
    .json({ message: message, statusCode: statusCode });
};
export default errorHandlerMiddleware;
