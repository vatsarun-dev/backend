const { registerService, loginService } = require("../services/user.service");
const asyncHandler = require("../utils/asyncHandler");
const registerController = asyncHandler(async (req, res) => {
  const result = await registerService(req.body);
  console.log(result);
  res.status(201).json({
    message: "User registered successfully",
    token: result.token,
    user: {
      id: result.user._id,
      name: result.user.name,
      email: result.user.email,
    },
  });
});

const loginController = asyncHandler(async (req, res) => {
  const result = await loginService(req.body);
  res.status(200).json({
    message: "user login successful",
    token: result.token,
    user: {
      id: result.user._id,
      name: result.user.name,
      email: result.user.email,
    },
  });
});

module.exports = {
  registerController,
  loginController,
};
