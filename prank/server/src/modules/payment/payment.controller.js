import PaymentService from "./payment.service.js";

export default class PaymentController {
  constructor() {
    this.paymentController = new PaymentService();
  }

  async createPayment(req, res) {
    // req.user._id — Mongoose documents use _id, not id
    const payment = await this.paymentController.createPaymentService(
      req.user._id,
    );
    console.log("order created successfully");
    res.status(201).json({
      message: "Order created successfully",
      order: payment.order,
      payment: payment.payment,
    });
  }

  async verifyPayment(req, res) {
    const payment = await this.paymentController.verifyPaymentService(req.body);
    res.status(200).json({
      message: "Payment verified successfully",
      payment,
    });
  }
}
