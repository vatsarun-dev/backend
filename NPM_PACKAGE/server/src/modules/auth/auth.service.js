import UserRepo from "../../repository/auth.repo.js";
import * as error from "../../shared/error/globalError.js";
import * as token from "../../utils/generateToken.js";
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
    let { name, email, password, mobile } = data;
    if (!name || !email || !password || !mobile)
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

  async GoogleLoginService(data) {
    let { displayName, emails } = data;
    const email = data.emails[0].value;
    const isExisted = await this.authService.findByEmail(email);
    if (isExisted) throw new error.ALLREADYEXIST("User is already existed");

    const user = await this.authService.createUser({
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

  //   async forgotPasswordService(data) {
  //     let { email } = data;
  //     const isExisted = await this.authService.findByEmail(email);
  //     if (!isExisted) throw new error.NOTFOUNDERROR("user not found");
  //     const rawToken = token.generateRawToken(isExisted._id);

  //     const link = `http://localhost:3000/api/user/reset-password/${rawToken}`;

  //     const sendMail = tempMail(isExisted.name, link);

  //     return await sendEmail(isExisted.email, "forgot password", sendMail);
  //   }

  //   async resetPasswordService(data) {
  //     let { token } = data;
  //     const decode = jwt.verify(token, env.RAWTOKEN);
  //     if (!decode) throw new error.UNAUTHORIZED("user not found");
  //     const user = await this.authService.findById(decode.id);

  //     return user;
  //   }

  //   async updatePasswordService(_id, pass) {
  //     let { id } = _id;
  //     let { password } = pass;
  //     console.log(id);
  //     console.log(password);
  //     const user = await this.authService.findById(id);
  //     console.log(user);
  //     if (!user) throw new error.NOTFOUNDERROR("user not found");
  //     const hashPassword = await bcrypt.hash(password, 10);

  //     const update = await this.authService.updatePassword(id, hashPassword);

  //     return update;
  //   }
}
