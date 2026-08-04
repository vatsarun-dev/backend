import cartModel from "../../models/cart.model.js";
import createOrder from "../../services/razorpay.js";
import paymentModel from "../../models/payment.model.js";
import * as error from "../../shared/error/globalError.js";
import env from "../../config/env.js";
import userModel from "../../models/user.model.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
export default class PaymentService {
  async createPaymentService(userId, data, res) {
    const cart = await cartModel.findOne({ user: userId });

    if (!cart) throw new error.NOTFOUNDERROR("Cart not found");

    const totalAmount = cart.totalPrice;
    const order = await createOrder(totalAmount, "INR");

    const payment = paymentModel.create({
      user: userId,
      amount: {
        value: totalAmount,
        currency: "INR",
      },
      razorpayDetails: {
        orderId: order.id,
      },
      products: cart.items.map((item) => {
        product: item.product_id;
        quantity: item.quantity;
      }),
    });
    return res.status(201).json({
      message: "Payment created successfully",
      data: {
        order,
      },
    });
  }

  async verifyPaymentService(data) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

    const isPaymentValid = validatePayementVerification(
      {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
      },
      razorpay_signature,
      env.RAZORPAY_SECRET,
    );

    if (!isPaymentValid) throw new error.PAYMENTFAILURE("payment failed");
    const payment = await paymentModel.findOne({
      "razorpayDetails.orderId": razorpay_order_id,
      status: "pending",
    });

    if (!payment) throw new error.PAYMENTFAILURE("payment not found");
    payment.status = "completed";
    payment.razorpayDetails.paymentId = razorpay_payment_id;
    payment.razorpayDetails.signature = razorpay_signature;
    await payment.save();
  }
}
