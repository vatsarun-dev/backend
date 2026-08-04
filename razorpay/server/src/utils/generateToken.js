import jwt from "jsonwebtoken";
import env from "../config/env.js";
export const generateAccessToken = (id) => {
  return jwt.sign({ id: id }, env.ACCESSTOKEN, { expiresIn: "100m" });
};
export const generateRefreshToken = (id) => {
  return jwt.sign({ id: id }, env.REFRESHTOKEN, { expiresIn: "100m" });
};
