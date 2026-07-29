import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
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
      default: function () {
        return `https://ui-avatars.com/api/?name=${this.name}`;
      },
    },

    password: {
      type: String,
      required: true,
    },

    mobile: {
      type: Number,
      required: true,
    },

    address: {
      fullName: String,
      phone: String,
      state: String,
      city: String,
      pincode: String,
      address: String,
      landmark: String,
      isDefault: Boolean,
    },

    role: {
      type: String,
      default: "user",
    },

    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const userModel = model("userModel", userSchema);
export default userModel;
