import z from "zod";
import logger from "./logger.js";
import dotenv from "dotenv";
import constant from "../constant/app.constant.js";
dotenv.config();
const envSchema = z.object({
  PORT: z.coerce.number().default(constant.PORT),
  MONGO_URL: z.string().default(constant.MONGO_URL),
  ACCESSTOKEN: z.string(),
  REFRESHTOKEN: z.string(),
  RAZORPAY_KEY_ID: z.string(),
  RAZORPAY_SECRET: z.string(),
  FRONTNED_URL: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) logger.error("check your env's");

export default parsed.data;
