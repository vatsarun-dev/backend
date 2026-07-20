import UserRepo from "../../repository/admin.repository.js";
import * as error from "../../shared/error/globalError.js";
import * as token from "../../utils/generateToken.js";

export default class AuthService {
  constructor() {
    this.authService = new UserRepo();
  }

  async createUserService(data) {
    let { email } = data;
    const isExisted = await this.authService.findByEmail(email);
    if (isExisted) throw new error.ALLREADYEXIST("User is already existed");
    const user = await this.authService.create(data);
    const accessToken = token.generateAccessToken(user._id);
    const refreshToken = token.generateRefreshToken(user._id);

    return { accessToken, refreshToken };
  }
}
