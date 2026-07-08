const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },

    password: {
      type: String,
    },

    // THIS FIELD IS REQUIRED WHEN WE USE EXTERNAL SERVICE FOR LOGIN/SIGNUP
    provider: {
      type: String,
      enum: ["google", "facebook"],
    },

    provider_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("GoogleAuth", userSchema, "GoogleAuth");
module.exports = userModel;
