const userModel = require("../models/user.models.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// it is use for register the user
const createUserController = async (req, res) => {
  try {
    let { name, mobile, email, password } = req.body;

    if (!name || !mobile || !email || !password)
      return res.status(400).json({
        message: "All fields are required",
      });

    let isExisted = await userModel.findOne({
      email,
    });
    if (isExisted)
      return res.status(409).json({
        message: "The user is already existed",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      mobile,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    });
    console.log(token);

    res.cookie("token", token);

    return res.status(201).json({
      message: "User created successfully",
      newUser: {
        id: newUser._id,
        name: newUser.name,
        mobile: newUser.mobile,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getUserController = async (req, res) => {
  try {
    const user = await userModel.find().select("-password");
    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// it is use for login the user
const loginUserController = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(404).json({
        message: "All fields are required",
      });

    const isExisted = await userModel.findOne({
      email,
    });

    if (!isExisted)
      return res.status(404).json({
        message: "User not found",
      });

    const comparePass = await bcrypt.compare(password, isExisted.password);

    if (!comparePass)
      return res.status(401).json({
        message: "Invalid credential",
      });

    const token = jwt.sign({ id: isExisted.password }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    return res.status(200).json({
      message: "User logged in successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createUserController,
  getUserController,
  loginUserController,
};
