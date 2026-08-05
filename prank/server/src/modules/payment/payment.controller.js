import PaymentService from "./payment.service.js";
export default class PaymentController {
  constructor() {
    this.paymentController = new PaymentService();
  }

  async createPayment(req, res) {
    const payment = await this.paymentController.createPaymentService(
      req.user.id,
    );
  }
  async verifyPayment(req, res) {
    const payment = await this.paymentController.verifyPaymentService(req.body);
  }
}
