import z from "zod";
import dotenv from "dotenv";
dotenv.config();
const envSchema = z.object({
  PORT: z.coerce.number(),
  MONGO_URL: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) console.log("check your env");

export default parsed.data;
