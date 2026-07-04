const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const registerService = require("../services/user.service");

const registerController = asyncHandler(async (req, res) => {
  //

  let result = await registerService(req.body);

  return res
    .status(200)
    .json(new ApiResponse("User register successfully", result));
});

module.exports = { registerController };
