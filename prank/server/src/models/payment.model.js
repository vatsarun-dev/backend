import { model, Schema } from "mongoose";
const paymentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "authModel",
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
      enum: ["pending", "success", "failure"],
      default: "pending",
    },

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
