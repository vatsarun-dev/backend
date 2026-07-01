const ApiError = require("../utils/errorHandler");
const userModel = require("../models/user.model");

const registerService = async (data) => {
  let { name, email, password } = data;

  if (!name || !email || !password)
    throw new ApiError(404, "All fields are required");

  let isExisted = await userModel.findOne({ email });

  if (isExisted)
    return res.status(409).json({ message: "User already existed" });

  const newUser = await userModel.create({
    name,
    email,
    password,
  });

  return newUser;
};
