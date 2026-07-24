import AdminRepo from "../../repository/admin.repository.js";
import * as error from "../../shared/error/globalError.js";
import * as token from "../../utils/generateToken.js";
import tempMail from "../../utils/generateMail.js";
import sendEmail from "../../config/nodemailer.js";
import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import bcrypt from "bcrypt";
export default class AuthService {
  constructor() {
    this.authService = new AdminRepo();
  }
  // THIS IS THE REGISTRATION LOGIC
  async createUserService(data) {
    let { name, email, password, designation } = data;
    if (!name || !email || !password)
      throw new error.NOTFOUNDERROR("all fields are required");

    const isExisted = await this.authService.findByEmail(email);
    if (isExisted) throw new error.ALLREADYEXIST("User is already existed");

    const normalizedDesignation = designation?.trim().toLowerCase();
    const user = await this.authService.create({
      name,
      email,
      password,
      ...(normalizedDesignation ? { designation: normalizedDesignation } : {}),
    });
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

    const compare = await isExisted.comparePassword(password);

    if (!compare) throw new error.UNAUTHORIZED("Wrong Credential");

    const accessToken = token.generateAccessToken(isExisted._id);
    const refreshToken = token.generateRefreshToken(isExisted._id);

    isExisted.refreshToken = refreshToken;
    await isExisted.save();

    return { accessToken, refreshToken, isExisted };
  }

  async GoogleLoginService(data) {
    const email = data.emails[0].value;
    const isExisted = await this.authService.findByEmail(email);
    if (isExisted) {
      const accessToken = token.generateAccessToken(isExisted._id);
      const refreshToken = token.generateRefreshToken(isExisted._id);
      return { accessToken, refreshToken, user: isExisted };
    }

    const user = await this.authService.create({
      email: email,
      name: data.displayName,
      authProvider: data.provider,
    });

    const accessToken = token.generateAccessToken(user._id);
    const refreshToken = token.generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken, user };
  }

  async forgotPasswordService(data) {
    let { email } = data;
    if (!email) throw new error.NOTFOUNDERROR("email is required");
    const isExisted = await this.authService.findByEmail(email);
    if (!isExisted) throw new error.NOTFOUNDERROR("user not found");
    const rawToken = token.generateRawToken(isExisted._id);

    const link = `${env.CLIENT_URL || "http://localhost:5173"}/reset-password/${rawToken}`;

    const sendMail = tempMail(isExisted.name, link);

    return await sendEmail(isExisted.email, "forgot password", sendMail);
  }

  async resetPasswordService(data) {
    let { token } = data;
    if (!token)
      throw new error.UNAUTHORIZED("Reset link is invalid or expired");
    let decode;
    try {
      decode = jwt.verify(token, env.RAWTOKEN);
    } catch {
      throw new error.UNAUTHORIZED("Reset link is invalid or expired");
    }
    const user = await this.authService.findById(decode.id);
    if (!user) throw new error.UNAUTHORIZED("Reset link is invalid or expired");

    return user;
  }

  async updatePasswordService(_id, pass) {
    let { id } = _id;
    let { password } = pass;
    if (!password) throw new error.NOTFOUNDERROR("password is required");
    if (password.length < 6 || password.length > 10)
      throw new error.UNAUTHORIZED("Password must contain 6-10 characters");
    const user = await this.authService.findById(id);
    if (!user) throw new error.NOTFOUNDERROR("user not found");
    const hashPassword = await bcrypt.hash(password, 10);

    const update = await this.authService.findByIdAndUpdate(id, hashPassword);

    return update;
  }
}
