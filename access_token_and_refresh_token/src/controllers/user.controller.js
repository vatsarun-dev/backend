const userModel = require("../models/user.model.js");

const registerController = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    if (!name || !email || !password || !mobile)
      return res.status(400).json({
        message: "All fields are required",
      });

    const isExisted = await userModel.findOne({ email });

    if (isExisted)
      return res.status(409).json({
        message: "User is already registerd",
      });

    const user = await userModel.create({
      name,
      email,
      password,
      mobile,
    });
    // this will create jwt token in userSchema

    const token = user.generateJWT();
    res.cookie("register_token", token);

    return res.status(201).json({
      message: "user created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        message: "All fields are required",
      });

    const isExisted = await userModel.findOne({ email });

    if (!isExisted)
      return res.status(404).json({
        message: "User not found",
      });

    const compare = isExisted.comparePassword(password);

    if (!compare)
      return res.status(401).json({ message: "Invalid credential" });

    const token = isExisted.generateJWT();
    res.cookie("login_token", token);

    return res.status(200).json({
      message: "user login successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
