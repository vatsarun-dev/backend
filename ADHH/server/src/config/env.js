import z from "zod";
import dotenv from "dotenv";
import appConstant from "../constant/app.constant.js";
dotenv.config();

const trimTrailingSlash = (value) => value?.trim().replace(/\/+$/, "");
const defaultClientUrl =
  process.env.NODE_ENV === "production"
    ? appConstant.PRODUCTION_CLIENT_URL
    : appConstant.CLIENT_URL;

const envSchema = z.object({
  PORT: z.coerce.number().default(appConstant.PORT),
  MONGO_URL: z.string().default(appConstant.MONGO_URL),
  CLIENT_URL: z.string().default(defaultClientUrl).transform(trimTrailingSlash),
  ALLOWED_ORIGINS: z.string().optional(),
  WINDOWMS: z.string().default(appConstant.WINDOWMS),
  LIMIT: z.string().default(appConstant.LIMIT),
  GOOGLE_CLIENT: z.string(),
  GOOGLE_SECRET: z.string(),
  GOOGLE_CALLBACK: z.string().optional().transform(trimTrailingSlash),
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

if (!parsed.success) {
  console.error("Invalid environment configuration", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment configuration");
}

const env = {
  ...parsed.data,
  GOOGLE_CALLBACK:
    parsed.data.GOOGLE_CALLBACK ||
    `${parsed.data.CLIENT_URL}/api/user/google/callback`,
};

export default env;
