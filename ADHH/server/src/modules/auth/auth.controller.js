import AuthService from "./auth.service.js";
export default class AuthController {
  constructor() {
    this.authController = new AuthService();
  }

  async createUserController(req, res) {
    const user = await this.authController.createUserService(req.body);
  }
}
