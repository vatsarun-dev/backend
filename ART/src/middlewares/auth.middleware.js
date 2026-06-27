const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");

const accessTokenMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.accessToken;

    if (!token)
      return res.status(404).json({
        message: "Unauthorized user",
      });

    let decode = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);

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
