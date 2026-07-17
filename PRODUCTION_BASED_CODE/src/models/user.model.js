import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    profile: {
      type: String,
    },
  },
  {
    timestamp: true,
  },
);
const UserModel = model("usermodel", userSchema, "usermodel");
export default UserModel;
