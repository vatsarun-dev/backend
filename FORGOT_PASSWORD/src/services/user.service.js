const ApiError = require("../utils/ApiError");
const User = require("../models/user.model");
const { generateToken, generateRawToken } = require("../utils/generateToken");
const sendEmail = require("../config/nodemailer");
const tempMail = require("../utils/tempMail");
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
  if (!email) throw new ApiError(400, "user not register");

  const isExist = await User.findOne({ email });
  if (!isExist) throw new ApiError(400, "user not register");

  const rowToken = generateRawToken(isExist._id);

  const link = `http://localhost:5000/api/auth/reset-password/${rowToken}`;

  const tempMail = tempMail(isExist.name, link);

  await sendEmail(process.env.receiverMail, "Forget Password", tempMail);
};

const resetPasswordLinkService = async (data) => {};
module.exports = {
  registerService,
  loginService,
  forgotPasswordService,
  resetPasswordLinkService,
};
