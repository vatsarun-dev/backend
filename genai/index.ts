import env from "./env.ts";
import { ChatMistralAI } from "@langchain/mistralai";

if (!env.Mistral_api_key) throw new Error("there is no api key");

const model = new ChatMistralAI({
  apiKey: env.Mistral_api_key,
  model: "mistral-medium-latest",
});

const message = await model.invoke("hey how are you..?");
console.log(message.text);
