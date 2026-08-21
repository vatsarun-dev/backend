import env from "./env.ts";
import { ChatMistralAI } from "@langchain/mistralai";

if (!env.Mistral_api_key) throw new Error("there is no api key");

const model = new ChatMistralAI({
  apiKey: env.Mistral_api_key,
  model: "mistral-medium-latest",
});

const message: string = await model.stream(
  "write a letter to pm for congrats that you are most successfully minister",
);

for await (const chunk of message) process.stdout.write(chunk.text);
