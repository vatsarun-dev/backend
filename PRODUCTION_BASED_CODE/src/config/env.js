import dotenv from "dotenv";
dotenv.config();
import z from "zod";
import appConstant from "../constant/app.constant.js";

// THIS SCHEMA IS USED TO VALIDATE THE DATATYPE FROM ENV
const envSchema = z.object({
  PORT: z.coerce.number().default(appConstant.PORT),
  MONGO_URL: z.string().default(appConstant.MONGO_URL),
  NODE_ENV: z.string().default(appConstant.NODE_ENV),
  LOGGER: z.string().default(appConstant.LOGGER),
  WINDOWMS: z.coerce.number().default(appConstant.WINDOWMS),
  LIMIT: z.coerce.number().default(appConstant.LIMIT),
  GOOGLE_CLIENT: z.string(),
  GOOGLE_CALLBACK: z.string(),
  GOOGLE_SECRET: z.string(),
});

const parsed = envSchema.safeParse(process.env);
console.log(parsed);

if (!parsed.success) throw new Error("check your env's");

export default parsed.data;
