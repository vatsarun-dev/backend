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

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hashSync(this.password, 10);
});

adminSchema.methods.comparePassword = async function (password) {
  if (!this.password) return false;
  return bcrypt.compareSync(password, this.password);
};

const adminModel = model("adminModel", adminSchema, "adminModel");
export default adminModel;
