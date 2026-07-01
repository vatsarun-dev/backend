const asyncHandler = (requestHandler) => {
  // this asyncHandler function accept the controller as there argument and return the middleware
  return (req, res, next) => {
    // this line returns promise so we use Promise.resolve to resolve them
    // and why we are not using await because then the function become async
    // and .catch part handle the error part which comes in our controller by throwing the error to the global error handler
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      next(error);
    });
  };
};

module.exports = asyncHandler;
