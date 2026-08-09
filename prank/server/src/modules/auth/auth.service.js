import UserRepo from "../../repository/auth.repo.js";
import * as error from "../../shared/error/globalError.js";
import * as token from "../../utils/generateToken.js";
import crushModel from "../../models/crush.model.js";
// import tempMail from "../../utils/generateMail.js";
// import sendEmail from "../../config/nodemailer.js";
import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import bcrypt from "bcrypt";
export default class AuthService {
  constructor() {
    this.authService = new UserRepo();
  }
  // THIS IS THE REGISTRATION LOGIC
  async createUserService(data) {
    let { name, email, password } = data;
    if (!name || !email || !password)
      throw new error.NOTFOUNDERROR("all fields are required");

    const isExisted = await this.authService.findByEmail(email);
    if (isExisted) throw new error.ALLREADYEXIST("User is already existed");
    const user = await this.authService.createUser(data);
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

    const isExisted = await this.authService.findByEmail(email);
    if (!isExisted) throw new error.NOTFOUNDERROR("user not found");

    const compare = isExisted.comparePassword(password);
    if (!compare) throw new error.UNAUTHORIZED("Wrong Credential");

    const accessToken = token.generateAccessToken(isExisted._id);
    const refreshToken = token.generateRefreshToken(isExisted._id);

    isExisted.refreshToken = refreshToken;
    await isExisted.save();

    return { accessToken, refreshToken, isExisted };
  }

  async saveNameService(userName, body) {
    // userName is the full user document from req.user — use _id
    const { crushName } = body;
    const user = await this.authService.findById(userName._id);
    if (!user) throw new error.NOTFOUNDERROR("no user found");

    if (!crushName) throw new error.NOTFOUNDERROR("crushName is required");

    const user_Name = await crushModel.create({
      user: user.name, // store only the ObjectId reference
      crushName: crushName,
    });

    return user_Name;
  }
}
