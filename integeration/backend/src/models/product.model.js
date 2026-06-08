const mongoose = require("mongoose");

let productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "description",
    },
    price: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        enum: ["INR", "USD"],
        required: true,
        default: "INR",
      },
    },
    category: {
      type: String,
      enum: ["MEN", "WOMEN", "KIDS"],
      default: "MEN",
    },
  },
  {
    timestamps: true,
  },
);

let productModel = mongoose.model("products", productSchema);

module.exports = productModel;
