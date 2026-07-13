const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error("user is not login");
    const decode = jwt.verify(token, process.env.JWT);

    if (!decode) throw new Error("mismatch profile");

    const user = await userModel.findById(decode.id);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authMiddleware;
