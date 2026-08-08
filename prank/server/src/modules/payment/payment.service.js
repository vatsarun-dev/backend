import paymentModel from "../../models/payment.model.js";
import createOrder from "../../services/razorpay.js";
import * as error from "../../shared/error/globalError.js";
import Razorpay from "razorpay";
import env from "../../config/env.js";

export default class PaymentService {

  async createPaymentService(userId) {
    const amount = 10;
    const order = await createOrder(amount, "INR");

    const payment = await paymentModel.create({
      user: userId,
      amount: {
        value: amount,
        currency: "INR",
      },
      razorpayDetails: {
        orderId: order.id,
      },
    });

    return { order, payment };
  }

  async verifyPaymentService(data) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
      throw new error.NOTFOUNDERROR("Missing payment verification fields");

    // Razorpay built-in signature verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const crypto = await import("crypto");
    const expectedSignature = crypto
      .default
      .createHmac("sha256", env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    const isPaymentValid = expectedSignature === razorpay_signature;
    if (!isPaymentValid) throw new error.PAYMENTFAIL("Payment verification failed");

    const payment = await paymentModel.findOne({
      "razorpayDetails.orderId": razorpay_order_id,
      status: "pending",
    });

    if (!payment) throw new error.NOTFOUNDERROR("Payment record not found");

    payment.status = "success";
    payment.razorpayDetails.paymentId = razorpay_payment_id;
    payment.razorpayDetails.signature = razorpay_signature;
    await payment.save();

    return payment;
  }
}
