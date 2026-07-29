import { Schema, model } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: Schema.type.ObjectID,
      ref: "user",
      required: true,
      unique: true,
    },

    items: [
      {
        product: {
          type: Schema.type.ObjectID,
          ref: "product",
          required: true,
        },
      },
      {
        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const cartModel = model("cartModel", cartSchema);
export default cartModel;
