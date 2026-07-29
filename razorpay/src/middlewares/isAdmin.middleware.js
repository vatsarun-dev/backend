import { NOTFOUNDERROR, UNAUTHORIZED } from "../shared/error/globalError.js";
import env from "../config/env.js";
import adminModel from "../models/admin.model.js";
import jwt from "jsonwebtoken";

export default async function isAdmin(req, res, next) {
  const token = req.cookies.accessToken;
  if (!token) throw new NOTFOUNDERROR("token not found");

  const decode = jwt.verify(token, env.ACCESSTOKEN);
  if (!decode) throw new UNAUTHORIZED("user is not authorized");

  const user = await adminModel.findById(decode.id);
  if (!user) throw new UNAUTHORIZED("user is not register");
  req.user = user;
  next();
}
