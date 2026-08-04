import cartModel from "../../models/cart.model.js";
import createOrder from "../../services/razorpay.js";
import paymentModel from "../../models/payment.model.js";
import * as error from "../../shared/error/globalError.js";
import env from "../../config/env.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";

export default class PaymentService {
  async createPaymentService(userId) {
    const cart = await cartModel.findOne({ user: userId });
    if (!cart) throw new error.NOTFOUNDERROR("Cart not found");

    const totalAmount = cart.totalPrice;
    const order = await createOrder(totalAmount, "INR");

    await paymentModel.create({
      user: userId,
      amount: {
        value: totalAmount,
        currency: "INR",
      },
      razorpayDetails: {
        orderId: order.id,
      },
      products: cart.items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      })),
    });

    // Return the order object — controller will send the response
    return order;
  }

  async verifyPaymentService(data) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

    const isPaymentValid = validatePaymentVerification(
      {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
      },
      razorpay_signature,
      env.RAZORPAY_SECRET,
    );

    if (!isPaymentValid) throw new error.UNAUTHORIZED("Payment verification failed");

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
