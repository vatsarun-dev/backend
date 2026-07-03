const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");

const accessTokenMiddleware = async (req, res, next) => {
  try {
    let accessToken = req.cookies.accessToken;

    if (!accessToken)
      return res.status(404).json({
        message: "Unauthorized user",
      });

    let decode = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);

    if (!decode)
      return res.status(404).json({
        message: "Unauthorized user",
      });

    let user = await userModel.findById(decode.user_id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = accessTokenMiddleware;
