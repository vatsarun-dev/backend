const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");
const authMiddleware = async (req, res, next) => {
  try {
    const token = res.cookies.token;
    if (!token)
      return res.status(401).json({
        message: "Unauthorized user",
      });

    const decode = jwt.verify(token, process.env.JWT_TOKEN);

    if (!decode)
      return res.status(401).json({
        message: "Unauthorized user",
      });

    const user = await userModel.findById(decode.id);

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error in middleware",
    });
  }
};

module.exports = authMiddleware;
