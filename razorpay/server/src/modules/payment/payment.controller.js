import PaymentService from "./payment.service.js";
export default class PaymentController {
  constructor() {
    this.paymentController = new PaymentService();
  }
  async createPayment(req, res) {
    const payment = await this.paymentController.createPaymentService(
      req.user.id,
      req.body,
      res,
    );
  }

  async verifyPayment(req, res) {
    await this.paymentController.verifyPaymentService(req.body);
  }
}
