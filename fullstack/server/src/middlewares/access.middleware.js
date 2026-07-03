const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");

const getCookie = (req, cookieName) => {
  const cookies = req.headers.cookie;
  if (!cookies) return null;

  const cookie = cookies
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${cookieName}=`));

  if (!cookie) return null;
  return decodeURIComponent(cookie.split("=")[1]);
};

const accessTokenMiddleware = async (req, res, next) => {
  try {
    let accessToken = getCookie(req, "accessToken");

    if (!accessToken)
      return res.status(401).json({
        message: "Unauthorized user",
      });

    let decode = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);

    if (!decode)
      return res.status(401).json({
        message: "Unauthorized user",
      });

    let user = await userModel.findById(decode.user_id).select("-password -refreshToken");

    if (!user)
      return res.status(401).json({
        message: "Unauthorized user",
      });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized user",
    });
  }
};

module.exports = accessTokenMiddleware;
