const userModel = require("../models/user.model.js");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/token.js");

const registerController = async (req, res) => {
  try {
    let { name, email, password, mobile } = req.body;

    if (!name || !email || !password || !mobile)
      return res.status(400).json({
        message: "all fields are required",
      });

    let isExisted = await userModel.findOne({ email });

    if (isExisted)
      return res.status(409).json({
        message: "User already existed",
      });

    let newUser = await userModel.create({
      name,
      mobile,
      password,
      email,
    });

    // it is use to generate the accesstoken and refresh token after registration
    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);

    // because we created a field in database which name is refreshToken so we have to save them explicitly and save them
    newUser.refreshToken = refreshToken;

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User register successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(401).json({ message: "all fields are required" });

    const isExisted = await userModel.findOne({ email });

    if (!isExisted) return res.status(404).json({ message: "User not found" });

    const compare = isExisted.comparePassword(password);

    if (!compare) return res.status(401).json({ message: "wrong credential" });

    const accessToken = generateAccessToken(isExisted._id);
    const refreshToken = generateRefreshToken(isExisted._id);

    isExisted.refreshToken = refreshToken;

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User login successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const regenerateAccessToken = async (req) => {
  try {
    let refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return res.status(401).json({
        message: "Unauthorized user",
      });

    let decode = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
    let user = await userModel.findById(decode.user_id);

    if (!user)
      return res.status(401).json({
        message: "Unauthorized user",
      });

    if (refreshToken !== user.refreshToken)
      return res.status(401).json({
        message: "Unauthorized user",
      });

    let accessToken = generateAccessToken(user._id);

    res.cookie("accessTOken", accessToken, {
      httpOnly: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
