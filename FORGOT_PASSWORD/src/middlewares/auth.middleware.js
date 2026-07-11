const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const cacheInstance = require("../config/caching");
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new ApiError(400, "User not register");

    const isBlackListed = await cacheInstance.get(token);

    if (isBlackListed)
      return res.status(500).json({ message: "teri ma ki sale bhag yaha se" });

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) throw new ApiError(400, "User not verify");

    const user = await User.findById(decode.id);
    req.user = user;

    return next();
  } catch (error) {
    return res.status(500).json({
      message: "Bhai login krle pehlee",
    });
  }
};

module.exports = authMiddleware;
//
