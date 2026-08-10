import z from "zod";
import logger from "./logger.js";

const envSchema = z.object({
  PORT:             z.coerce.number().default(3000),
  MONGO_URL:        z.string(),
  ACCESSTOKEN:      z.string(),
  REFRESHTOKEN:     z.string(),
  RAZORPAY_KEY_ID:  z.string(),
  RAZORPAY_SECRET:  z.string(),
  FRONTNED_URL:     z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // Log exactly which env vars are missing — visible in Render logs
  logger.error(
    { errors: parsed.error.flatten().fieldErrors },
    "❌ Missing or invalid environment variables — check Render env settings"
  );
  process.exit(1); // crash immediately with clear message instead of silent undefined
}

export default parsed.data;
