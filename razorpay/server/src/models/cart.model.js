import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
      unique: true,
    },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "productModel",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const cartModel = model("cartModel", cartSchema);
export default cartModel;
