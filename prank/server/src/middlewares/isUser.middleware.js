import jwt from "jsonwebtoken";
import env from "../config/env.js";
import authModel from "../models/auth.model.js";
import * as error from "../shared/error/globalError.js";
export default async function isUser(req, res, next) {
  const token = res.cookies.accessToken;
  if (!token) throw new NOTFOUNDERROR("token not found");

  const decode = jwt.verify(token, env.ACCESSTOKEN);
  if (!decode) throw new error.NOTFOUNDERROR("not verified");

  const user = await authModel.findById(decode.id);
  if (!user) throw new error.NOTFOUNDERROR("no user found");

  req.user = user;
  next();
}
