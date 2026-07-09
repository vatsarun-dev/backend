const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const registerService = async (data) => {
  const { name, email, password } = data;

  if (!name || !email || !password)
    throw new ApiError(404, "All fields are required");

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "User already exist");

  const user = await User.create({ name, email, password });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  return { user, token };
};

const loginService = async (data) => {
  const { email, password } = data;

  if (!email || !password) throw new ApiError(400, "All fields are required");

  const user = await User.findOne({ email });

  if (!user) throw new ApiError(400, "wrong credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(400, "Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  return { user, token };
};

module.exports = { registerService, loginService };
