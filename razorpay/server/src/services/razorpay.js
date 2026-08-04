import Razorpay from "razorpay";
import env from "../config/env.js";
const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_SECRET,
});

export default async function createOrder(amount, currency) {
  const option = {
    amount: amount * 100,
    currency,
  };
  const order = await razorpay.orders.create(option);
  return order;
}
