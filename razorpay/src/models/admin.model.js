import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const adminSchema = new Schema(
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
    role: {
      type: String,
      default: "admin",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

adminSchema.pre("save", function () {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hashSync(this.password, 10);
});

adminSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const adminModel = model("adminModel", adminSchema);
export default adminModel;
