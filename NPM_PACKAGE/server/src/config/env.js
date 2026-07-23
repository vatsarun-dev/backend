import z from "zod";
import logger from "./logger.js";
import dotenv from "dotenv";
import constant from "../constant/app.constant.js";
dotenv.config();
const envSchema = z.object({
  PORT: z.coerce.number().default(constant.PORT),
  MONGO_URL: z.string().default(constant.MONGO_URL),
  GOOGLE_CALLBACK_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  ACCESSTOKEN: z.string(),
  REFRESHTOKEN: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) logger.error("check your env's");

export default parsed.data;
