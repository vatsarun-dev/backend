import AuthService from "./auth.service.js";
import { app_constant } from "../../constant/app.constant.js";
import * as error from "../../shared/errors/notFoundError.js";
export default class AuthController {
  constructor() {
    this.userController = new AuthService();
  }

  async GoogleCallBack(req, res) {
    let { refreshToken, accessToken } = await this.userController.createUser(
      req.user,
    );
    res.cookie("accessToken", accessToken, app_constant.cookie.accessToken);
    res.cookie("refreshToken", accessToken, app_constant.cookie.refreshToken);

    res.send("ok bhai done");
  }

  async getMe() {
    throw new error.UnAuthorized("this is not verified");
  }
}
