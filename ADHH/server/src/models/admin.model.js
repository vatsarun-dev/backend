import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    designation: {
      type: String,
      enum: ["teacher", "admin", "principal"], // adjust as needed
    },

    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
    },

    refreshToken: { type: String },
  },
  { timestamps: true }, // was "timestamp" — fixed typo
);

adminSchema.pre("save", async function () {
  if (this.authProvider === "google" && !this.designation) {
    this.designation = "teacher";
  }
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
});

adminSchema.methods.comparePassword = async function (password) {
  if (!this.password) return false;
  return bcrypt.compareSync(password, this.password);
};

const adminModel = model("adminModel", adminSchema, "adminModel");
export default adminModel;
