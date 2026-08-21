import z from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  Mistral_api_key: z.string(),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) throw new Error("there is some error");
export default parsed.data;
