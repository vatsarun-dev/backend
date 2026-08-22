import z from "zod";
import dotenv from "dotenv";
dotenv.config();
const schema = z.object({
  Mistral_api_key: z.string(),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) throw new Error("there is no env");
export default parsed.data;
