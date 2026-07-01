const userModel = require("../models/user.model");
const registerController = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      message: "error",
    });
  }
};

module.exports = { registerController };
