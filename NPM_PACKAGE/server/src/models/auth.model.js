import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  avatar: {
    type: String,
  },
  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },

  password: {
    type: String,

    required: function () {
      return this.authProvider === "local";
    },
  },
  mobile: {
    type: Number,
    required: function () {
      return this.authProvider === "local";
    },
  },

  refreshToken: {
    type: String,
  },
});

userSchema.pre("save", function () {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = function (password) {
  if (!this.password) return false;
  return bcrypt.compareSync(password, this.password);
};

const userModel = model("userModel", userSchema);
export default userModel;
