import PaymentService from "./payment.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

export default class PaymentController {
  constructor() {
    this.paymentController = new PaymentService();
  }

  async createPayment(req, res) {
    const order = await this.paymentController.createPaymentService(req.user.id);
    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  }

  async verifyPayment(req, res) {
    const payment = await this.paymentController.verifyPaymentService(req.body);
    return res.status(200).json({
      message: "Payment verified successfully",
      payment,
    });
  }
}
