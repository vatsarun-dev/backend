import jwt from "jsonwebtoken";
import env from "../config/env.js";
export const generateAccessToken = (id) => {
  return jwt.sign({ id: id }, env.ACCESS_TOKEN, { expiresIn: "15m" });
};
export const generateRefreshToken = (id) => {
  return jwt.sign({ id: id }, env.REFRESH_TOKEN, { expiresIn: "1D" });
};
