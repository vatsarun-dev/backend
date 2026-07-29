import UserService from "./user.service.js";
import { app_constant } from "../../constant/app.constant.js";
export default class UserController {
  constructor() {
    this.userController = new UserService();
  }

  async createUserController(req, res) {
    const user = await this.userController.createUserService(req.body);

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
    const user = await this.userController.loginUserService(req.body);
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
}
