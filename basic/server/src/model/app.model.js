import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    mobile: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", function () {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hashSync(this.password, 10);
});

const userModel = model("userModel", userSchema);
export default userModel;
