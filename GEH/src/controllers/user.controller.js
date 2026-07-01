const userModel = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const registerController = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(401).json({ message: "All fields are required" });

  let isExisted = await userModel.findOne({ email });

  if (isExisted)
    return res.status(409).json({ message: "User already existed" });

  const newUser = await userModel.create({
    name,
    email,
    password,
  });

  return res.status(200).json({
    message: "user register successfully",
  });
});

module.exports = { registerController };
