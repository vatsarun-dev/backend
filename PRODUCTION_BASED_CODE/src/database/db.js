import mongoose from "mongoose";
import env from "../config/env.js";
const connectDB = async () => {
  await mongoose.connect(env.MONGO_URL);
};
export default connectDB;
