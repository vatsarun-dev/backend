const {
  registerService,
  loginService,
  forgotPasswordService,
  resetPasswordLinkService,
  updatePasswordService,
} = require("../services/user.service");
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

const forgotPasswordController = asyncHandler(async (req, res) => {
  try {
    await forgotPasswordService(req.body);

    return res.status(200).json({
      message: "Link send",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error,
    });
  }
});

const resetPasswordLinkController = asyncHandler(async (req, res) => {
  const result = await resetPasswordLinkService(req.params.token);

  res.render("update", { userId: result._id });
});

const updatePasswordController = asyncHandler(async (req, res) => {
  const result = updatePasswordService(req.body.password, req.params.userId);

  return res.status(200).json({ message: "password update successful" });
});
module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordLinkController,
  updatePasswordController,
};
