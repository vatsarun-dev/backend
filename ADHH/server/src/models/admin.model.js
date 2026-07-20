import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
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

adminSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const adminModel = model("adminModel", adminSchema, "adminModel");
export default adminModel;
