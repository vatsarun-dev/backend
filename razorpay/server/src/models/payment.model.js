import { Schema, model } from "mongoose";
const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "userModel",
    },
    amount: {
      value: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        default: "INR",
      },
    },
    status: {
      type: String,
      enum: ["success", "pending", "failure"],
      default: "pending",
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "productModel",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    razorpayDetails: {
      orderId: {
        type: String,
        trim: true,
      },
      paymentId: {
        type: String,
        trim: true,
      },
      signature: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

const paymentModel = model("paymentModel", paymentSchema);
export default paymentModel;
