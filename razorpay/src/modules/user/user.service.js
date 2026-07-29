import UserRepo from "../../repository/user.repo.js";
import * as error from "../../shared/error/globalError.js";
import * as token from "../../utils/generateToken.js";
import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import bcrypt from "bcrypt";
export default class UserService {
  constructor() {
    this.userService = new UserRepo();
  }
  // THIS IS THE REGISTRATION LOGIC
  async createUserService(data) {
    let { name, email, password, mobile, addresses } = data;
    if (!name || !email || !password || !mobile)
      throw new error.NOTFOUNDERROR("all fields are required");

    const isExisted = await this.userService.findByEmail(email);
    if (isExisted) throw new error.ALLREADYEXIST("User is already existed");
    const user = await this.userService.createUser({ ...data, role: "user" });
    const accessToken = token.generateAccessToken(user._id);
    const refreshToken = token.generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken, user };
  }

  // THIS IS LOGIN LOGIC
  async loginUserService(data) {
    let { email, password } = data;

    if (!email || !password)
      throw new error.NOTFOUNDERROR("all fields are required");

    const isExisted = await this.userService.findByEmail(email);
    if (!isExisted) throw new error.NOTFOUNDERROR("user not found");

    const compare = isExisted.comparePassword(password);

    if (!compare) throw new error.UNAUTHORIZED("Wrong Credential");

    const accessToken = token.generateAccessToken(isExisted._id);
    const refreshToken = token.generateRefreshToken(isExisted._id);

    isExisted.refreshToken = refreshToken;
    await isExisted.save();

    return { accessToken, refreshToken, isExisted };
  }
}
