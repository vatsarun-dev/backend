import mongoose from "mongoose";
import env from "../config/env.js";
import logger from "../config/logger.js";
const connectDb = async () => {
  await mongoose.connect(env.MONGO_URL);
  logger.info("your mongodb is connected successfully");
};
export default connectDb;
