import AuthService from "./auth.service.js";
import { app_constant } from "../../constant/app.constant.js";
export default class AuthController {
  constructor() {
    this.authController = new AuthService();
  }

  async createUserController(req, res) {
    let { accessToken, refreshToken } =
      await this.authController.createUserService(req.body);

    res.cookie("accessToken", accessToken, app_constant.cookie.accessToken);
    res.cookie("refreshToken", refreshToken, app_constant.cookie.refreshToken);
    res.json({ message: "user created successfully " });
  }
}
