import paymentModel from "../../models/payment.model.js";
import createOrder from "../../services/razorpay.js";
import * as error from "../../shared/error/globalError.js";
export default class PaymentService {
  async createPaymentService(userId) {
    const amount = 10;
    const order = await createOrder(amount, "INR");
    const payment = paymentModel.create({
      user: userId,
      amount: {
        value: amount,
        currency: "INR",
      },
      razorpayDetails: {
        orderId: order.id,
      },
    });
  }

  async verifyPaymentService(data) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;
    const isPaymentValid = await validatePaymentVerification(
      {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
      },
      razaorpay_signature,
      env.RAZORPAY_SECRET,
    );

    if (!isPaymentValid) throw new error.PAYMENT_REQUIRED("payment failed");
    const payment = await paymentModel.findOne({
      "razorpayDetails.orderId": razorpay_order_id,
      status: "pending",
    });

    if (!payment) throw new error.NOTFOUNDERROR("payment not found");
    payment.status = "success";
    payment.razorpayDetails.paymentId = razorpay_payment_id;
    payment.razorpayDetails.signature = razaorpay_signature;
    await payment.save();
  }
}
