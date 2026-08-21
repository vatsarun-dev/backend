import env from "./env.ts";
import rl from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage, createAgent } from "langchain";

if (!env.Mistral_api_key) throw new Error("there is no api key");

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatMistralAI({
  apiKey: env.Mistral_api_key,
  model: "mistral-medium-latest",
});

const agents = createAgent({ model });
const chatHistory: (HumanMessage | AIMessage)[] = [];
let response: string = "";

while (true) {
  const message: string = await readline.question("Enter your query: ");
  chatHistory.push(new HumanMessage(message));
  const responses: string = await agents.stream(
    {
      messages: chatHistory,
    },
    { streamMode: "messages" },
  );
  for await (const [token] of responses) {
    process.stdout.write(token.text);
    response += token.text;
  }
  chatHistory.push(new AIMessage(response));
  response = "";
  process.stdout.write("\n");
}
