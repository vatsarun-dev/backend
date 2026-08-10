import jwt from "jsonwebtoken";
import env from "../config/env.js";
import authModel from "../models/auth.model.js";
import * as error from "../shared/error/globalError.js";

export default async function isUser(req, res, next) {
  try {
    // Support both cookie AND Authorization header
    // Header takes priority — works in all cross-origin deployments
    let token = null;

    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else {
      token = req.cookies?.accessToken;
    }

    if (!token) throw new error.UNAUTHORIZED("No token found — please login");

    const decode = jwt.verify(token, env.ACCESSTOKEN);

    const user = await authModel
      .findById(decode.id)
      .select("-password -refreshToken");

    if (!user) throw new error.NOTFOUNDERROR("User not found");

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}
