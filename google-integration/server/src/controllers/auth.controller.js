const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

const authController = asyncHandler((req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const token = jwt.sign({ id: req.user._id }, process.env.JWT_TOKEN, {
    expiresIn: "15m",
  });

  res.cookie("accessToken", token, {
    httpOnly: true,
    sameSite: "lax",
  });

  res.send("ok");
});

module.exports = authController;
