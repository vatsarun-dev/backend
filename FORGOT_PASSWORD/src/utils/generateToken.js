const jwt = require("jsonwebtoken");

const generateToken = (user_id) => {
  return jwt.sign({ user_id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });
};

const generateRawToken = (user_id) => {
  return jwt.sign({ user_id }, process.env.RAWTOKEN, { expiresIn: "10m" });
};
module.exports = { generateToken, generateRawToken };
