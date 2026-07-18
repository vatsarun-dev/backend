const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(asyncHandler(req, res, next).catch((error) => next(error)));
  };
};
export default asyncHandler;
