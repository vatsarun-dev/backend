import UserRepo from "../../repository/user.repository.js";
import * as token from "../../utils/generateToken.js";
import * as error from "../../shared/errors/notFoundError.js";
import env from "../../config/env.js";
export default class AuthService {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async createUser(user) {
    const isExisted = await this.userRepo.findByEmail(user.emails[0].value);
    if (isExisted) throw new Error("this user is already existed");

    const _user = await this.userRepo.create({
      email: user.emails[0].value,
      profile: user.photos[0].value,
      name: user.displayName,
    });

    const accessToken = token.generateAccessToken(user.id);
    const refreshToken = token.generateRefreshToken(user.id);

    return { accessToken, refreshToken };
  }

  async accessTokenGenerationService(req) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new error.NotFoundError("token not found");
    const decode = jwt.verify(refreshToken, env.REFRESH_TOKEN);
    if (!decode) throw new error.UnAuthorized("wrong credentials");

    const user = await this.userRepo.findById(decode.id);

    const AToken = token.generateAccessToken(user._id);
    return AToken;
  }
}
