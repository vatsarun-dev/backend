import { Schema, Model } from "mongoose";
const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    designation: {
      type: String,
    },

    password: {
      type: String,
    },

    refreshToken: {
      type: String,
    },
  },
  {
    timestamp: true,
  },
);

const adminModel = Model("adminModel", adminSchema, "adminModel");
export default adminModel;
