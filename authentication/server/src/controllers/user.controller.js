const userModel = require("../models/user.models.js");
const jwt = require("jsonwebtoken");
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

    const newUser = await userModel.create({
      name,
      mobile,
      email,
      password,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    });
    console.log(token);

    res.cookie("token", token);

    return res.status(201).json({
      message: "User created successfully",
      newUser,
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
    const user = await userModel.find();
    return res.status(201).json({
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  createUserController,
  getUserController,
};
