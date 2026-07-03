const asyncHandler = require("../utils/asyncHandler");
const { registerService, loginService } = require("../services/user.service");

const registerController = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken, newUser } = registerService(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res
    .status(201)
    .json({ message: "User created successfully", user: newUser });
});

const loginController = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken, isExisted } = loginService(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "user Login successfully",
    user: isExisted,
  });
});

module.exports = { registerController, loginController };
