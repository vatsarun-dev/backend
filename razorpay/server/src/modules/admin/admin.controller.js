import AdminService from "./admin.service.js";
import { app_constant } from "../../constant/app.constant.js";
export default class AdminController {
  constructor() {
    this.adminController = new AdminService();
  }

  async createUserController(req, res) {
    const user = await this.adminController.createUserService(req.body);

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
    const user = await this.adminController.loginUserService(req.body);
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

  async createProductController(req, res) {
    const product = await this.adminController.createProductService(req.body);

    console.log(product);
    return res.status(201).json({
      message: "product created successfully",
      product: product,
    });
  }

  async viewProductController(req, res) {
    const product = await this.adminController.viewProductService(req.body);
    return res
      .status(200)
      .json({ message: "all product fetch", product: product });
  }

  async updateProductController(req, res) {
    const product = await this.adminController.updateProductService(
      req.params,
      req.body,
    );
    return res
      .status(200)
      .json({ message: "product updated successfully", product: product });
  }

  async deleteProductController(req, res) {
    const product = await this.adminController.deleteProductService(req.params);
    return res.status(200).json({ message: "product deleted successfully" });
  }
}
