import UserRepo from "../../repository/admin.repository.js";
import * as error from "../../shared/error/globalError.js";
import * as token from "../../utils/generateToken.js";

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
    const user = await this.authService.create(data);
    const accessToken = token.generateAccessToken(user._id);
    const refreshToken = token.generateRefreshToken(user._id);

    return { accessToken, refreshToken, user };
  }

  // THIS IS LOGIN LOGIC
  async loginUserService(data) {
    let { email, password } = data;

    if (!email || !password)
      throw new error.NOTFOUNDERROR("all fields are required");

    const isExisted = await this.authService.findByEmail(email);
    if (!isExisted) throw new error.NOTFOUNDERROR("user not found");

    console.log(isExisted);
    const compare = isExisted.comparePassword(password);

    if (!compare) throw new error.UNAUTHORIZED("Wrong Credential");
    console.log(compare);

    const accessToken = token.generateAccessToken(isExisted._id);
    const refreshToken = token.generateRefreshToken(isExisted._id);

    return { accessToken, refreshToken, isExisted };
  }

  async GoogleLoginService(data) {
    let { displayName, emails } = data;
    const email = data.emails[0].value;
    const isExisted = await this.authService.findByEmail(email);
    if (isExisted) throw new error.ALLREADYEXIST("User is already existed");

    const user = this.authService.create({
      email: email,
      name: data.displayName,
    });

    const accessToken = token.generateAccessToken(user._id);
    const refreshToken = token.generateRefreshToken(user._id);

    return { accessToken, refreshToken, user };
  }
}
