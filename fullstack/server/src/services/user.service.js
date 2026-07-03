const userModel = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

const registerService = async (data) => {
  let { name, email, password } = data;

  if (!name || !email || !password)
    throw new ApiError(400, "All fields are required");

  const isExisted = await userModel.findOne({ email });

  if (isExisted) throw new ApiError(409, "The user is already present");

  const newUser = await userModel.create({
    name,
    email,
    password,
  });

  const accessToken = generateAccessToken(newUser._id);
  const refreshToken = generateRefreshToken(newUser._id);

  newUser.refreshToken = refreshToken;
  await newUser.save();

  return { accessToken, refreshToken, newUser };
};

const loginService = async (data) => {
  let { email, password } = data;

  if (!email || !password) throw new ApiError(400, "All fields are required");

  const isExisted = await userModel.findOne({ email });

  if (!isExisted) throw new ApiError(404, "user not found");

  const compare = isExisted.comparePassword(password);

  if (!compare) throw new ApiError(401, "Wrong credentials");

  const accessToken = generateAccessToken(isExisted._id);
  const refreshToken = generateRefreshToken(isExisted._id);

  isExisted.refreshToken = refreshToken;
  await isExisted.save();

  return { accessToken, refreshToken, isExisted };
};

module.exports = { registerService, loginService };
