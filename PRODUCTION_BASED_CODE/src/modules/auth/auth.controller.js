import AuthService from "./auth.service.js";
export default class AuthController {
  constructor() {
    this.userController = new AuthService();
  }

  async GoogleCallBack(req, res) {
    this.userController.res.json({
      message: "hell",
    });
  }
}
