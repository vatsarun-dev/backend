import jwt from "jsonwebtoken";
import env from "../config/env.js";
import authModel from "../models/auth.model.js";
import * as error from "../shared/error/globalError.js";

export default async function isUser(req, res, next) {
  try {
    const token = req.cookies.accessToken;
    if (!token) throw new error.UNAUTHORIZED("No token found — please login");

    // jwt.verify throws if token is invalid or expired — must be inside try/catch
    const decode = jwt.verify(token, env.ACCESSTOKEN);

    const user = await authModel.findById(decode.id).select("-password -refreshToken");
    if (!user) throw new error.NOTFOUNDERROR("User not found");

    req.user = user;
    next();
  } catch (err) {
    // Pass all errors (including jwt errors) to the global error handler
    next(err);
  }
}
