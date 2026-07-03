const jwt = require("jsonwebtoken");

const generateAccessToken = (user_id) => {
  return jwt.sign({ user_id }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user_id) => {
  return jwt.sign({ user_id }, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "1d",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
