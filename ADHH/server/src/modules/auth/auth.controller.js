import AuthService from "./auth.service.js";
import { app_constant } from "../../constant/app.constant.js";
export default class AuthController {
  constructor() {
    this.authController = new AuthService();
  }

  async createUserController(req, res) {
    const user = await this.authController.createUserService(req.body);

    res.cookie(
      "accessToken",
      user.accessToken,
      app_constant.cookie.accessToken,
    );
    res.cookie(
      "refreshToken",
      user.refreshToken,
      app_constant.cookie.refreshToken,
    );
    res
      .status(201)
      .json({ message: "User created successfully", user: user.user });
  }

  async loginUserController(req, res) {
    const user = await this.authController.loginUserService(req.body);
    res.cookie(
      "accessToken",
      user.accessToken,
      app_constant.cookie.accessToken,
    );
    res.cookie(
      "refreshToken",
      user.refreshToken,
      app_constant.cookie.refreshToken,
    );
    res
      .status(200)
      .json({ message: "User login successfully", user: user.isExisted });
  }

  async GoogleLoginController(req, res) {
    const user = await this.authController.GoogleLoginService(req.user);

    console.log(user.accessToken);
    console.log(user.refreshToken);
    res.cookie(
      "accessToken",
      user.accessToken,
      app_constant.cookie.accessToken,
    );
    res.cookie(
      "refreshToken",
      user.refreshToken,
      app_constant.cookie.refreshToken,
    );
    res
      .status(201)
      .json({ message: "User created successfully", user: user.user });
  }

  async forgotPasswordController(req, res) {
    const mail = await this.authController.forgotPasswordService(req.body);
    res.status(200).json({ message: "email sent" });
  }

  async resetPasswordController(req, res) {
    const user = await this.authController.resetPasswordService(req.params);

    return res.render("update", { userId: user._id });
  }

  async updatePasswordController(req, res) {
    const user = await this.authController.updatePasswordService(
      req.params,
      req.body,
    );

    return res.json({
      message: "user updated successfully",
      user: user.update,
    });
  }
}
