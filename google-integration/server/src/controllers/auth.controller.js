const asyncHandler = require("../utils/asyncHandler");
const authController = asyncHandler((req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_TOKEN, {
    expiresIn: "15m",
  });

  res.cookie("accessToken", token);

  res.send("ok");
  console.log(req.user);
});

module.exports = authController;
