import jwt from "jsonwebtoken";
import env from "../config/env.js";

// accessToken short-lived — used for API requests
export const generateAccessToken = (id) => {
  return jwt.sign({ id }, env.ACCESSTOKEN, { expiresIn: "15m" });
};

// refreshToken long-lived — used to get a new accessToken
export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, env.REFRESHTOKEN, { expiresIn: "7d" });
};
