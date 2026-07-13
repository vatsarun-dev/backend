const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");
const { generateToken, generateRawToken } = require("../utils/generateToken");
const sendEmail = require("../config/nodemailer");
const tempMail = require("../utils/tempMail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cacheInstance = require("../config/caching");

const registerService = async (data) => {
  const { name, email, password } = data;

  if (!name || !email || !password)
    throw new ApiError(404, "All fields are required");

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, "User already exist");

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  return { user, token };
};

const loginService = async (data) => {
  const { email, password } = data;

  if (!email || !password) throw new ApiError(400, "All fields are required");

  const user = await User.findOne({ email });

  if (!user) throw new ApiError(400, "wrong credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(400, "Invalid credentials");

  const token = generateToken(user._id);

  return { user, token };
};

const forgotPasswordService = async (data) => {
  let { email } = data;
  console.log(email);
  if (!email) throw new ApiError(400, "email not found");

  const isExist = await User.findOne({ email });
  if (!isExist) throw new ApiError(400, "user not register");

  const rowToken = generateRawToken(isExist._id);

  const link = `http://localhost:3000/api/auth/reset-password/${rowToken}`;

  const sendMail = tempMail(isExist.name, link);

  await sendEmail(isExist.email, "Forget Password", sendMail);
};

const resetPasswordLinkService = async (data) => {
  if (!data) throw new ApiError(400, "There is no token");

  const decode = jwt.verify(data, process.env.RAWTOKEN);

  const user = await User.findById(decode.id);

  return user;
};

const updatePasswordService = async (password, id) => {
  const hashPassword = await bcrypt.hash(password, 10);
  if (!password) throw new ApiError(400, "Enter your password");

  const updatePassword = await User.findByIdAndUpdate(
    id,
    {
      password: hashPassword,
    },
    { new: true },
  );

  return updatePassword;
};

const userLogoutService = async (req, res) => {
  const token = req.cookies.token;
  if (!token) throw new ApiError(404, "provide token");
  res.clearCookie("token");
  await cacheInstance.set(token, "blacklist");
};

module.exports = {
  registerService,
  loginService,
  forgotPasswordService,
  resetPasswordLinkService,
  userLogoutService,
  updatePasswordService,
};
