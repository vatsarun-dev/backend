import env from "./env.ts";
import rl from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";

if (!env.Mistral_api_key) throw new Error("there is no api key");

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatMistralAI({
  apiKey: env.Mistral_api_key,
  model: "mistral-medium-latest",
});

while (true) {
  const message: string = await readline.question("Enter your query: ");
  const responses: string = await model.stream(message);
  for await (const chunk of responses) process.stdout.write(chunk.text);

  process.stdout.write("\n");
}
