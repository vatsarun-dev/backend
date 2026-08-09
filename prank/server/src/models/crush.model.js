import { model, Schema } from "mongoose";
const crushSchema = new Schema(
  {
    user: {
      type: String,
      ref: "userModel", // reference to auth model
      required: true,
    },
    crushName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const crushModel = model("crushModel", crushSchema);
export default crushModel;
