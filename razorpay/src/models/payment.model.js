import { Schema, model } from "mongoose";
const paymentSchema = new Schema({
  user: {
    type: Schema.type.ObjectID,
    ref: "user",
  },

  orderId: String,
  paymentId: String,
  amount: Number,

  currency: {
    type: String,
    default: "INR",
  },

  status: {
    type: String,
    enum: ["pending, fail, success"],
    default: "pending",
  },

  paymentMethod: String,
});

const paymentModel = model("paymentModel", paymentSchema);
export default paymentModel;
