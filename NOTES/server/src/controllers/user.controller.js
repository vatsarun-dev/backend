const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateJwt, comparePassword } = require("../models/user.model");
const registerController = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password)
      throw new Error("all fields are required");

    let isExisted = await userModel.findOne({ email });

    if (isExisted)
      return res.status(409).json({
        message: "User already existed",
      });

    const newUser = await userModel.create({
      name,
      email,
      password,
    });

    const token = newUser.generateJwt();

    res.cookie("token", token);

    return res.status(201).json({
      message: "User register successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) throw new Error("all field are required");

    const isExisted = await userModel.findOne({ email });

    if (!isExisted) throw new Error("user not register");

    const compare = isExisted.comparePassword(password);
    if (!compare) throw new Error("wrong credentials");
    const token = isExisted.generateJwt();
    res.cookie("token", token);
    return res
      .status(200)
      .json({ message: "user login successfully", isExisted });
  } catch (error) {
    console.log(error);
  }
};

const getAllUserController = async (req, res) => {
  try {
    const user = await userModel.find();
    return res.status(200).json({ message: "all user", user });
  } catch (error) {
    console.log(error);
  }
};

const userUpdateController = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) throw new Error("id compulsory");
    let { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.findByIdAndUpdate(id, {
      name,
      email,
      password: hashPassword,
    });
    return res.status(200).json({ message: "update user", user });
  } catch (error) {
    console.log(error);
  }
};

const deleteUserController = async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) throw new Error("correct id");

    const user = await userModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "update deletes" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  registerController,
  loginController,
  getAllUserController,
  userUpdateController,
  deleteUserController,
};
