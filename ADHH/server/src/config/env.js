import z from "zod";
import dotenv from "dotenv";
import appConstant from "../constant/app.constant.js";
dotenv.config();
const envSchema = z.object({
  PORT: z.coerce.number().default(appConstant.PORT),
  MONGO_URL: z.string().default(appConstant.MONGO_URL),
  CLIENT_URL: z.string().default(appConstant.CLIENT_URL),
  ALLOWED_ORIGINS: z.string().optional(),
  WINDOWMS: z.string().default(appConstant.WINDOWMS),
  LIMIT: z.string().default(appConstant.LIMIT),
  GOOGLE_CLIENT: z.string(),
  GOOGLE_SECRET: z.string(),
  GOOGLE_CALLBACK: z.string(),
  ACCESSTOKEN: z.string(),
  REFRESHTOKEN: z.string(),
  URLENDPOINT: z.string(),
  PRIVATEKEY: z.string(),
  PUBLICKEY: z.string(),
  EMAIL: z.string(),
  PASSWORD: z.string(),
  RAWTOKEN: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) console.log("check your env's");

export default parsed.data;
