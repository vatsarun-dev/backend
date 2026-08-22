import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage, createAgent } from "langchain";
import env from "./env.ts";
import rl from "readline/promises";
const model = new ChatMistralAI({
  apiKey: env.Mistral_api_key,
  model: "mistral-medium-latest",
});

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const agent = createAgent({ model });
const chatHistory: (HumanMessage | AIMessage)[] = [];
let response = "";

while (true) {
  const question: string = await readline.question("Enter your query: ");
  chatHistory.push(new HumanMessage(question));
  const stream = await agent.stream(
    {
      messages: chatHistory,
    },
    {
      streamMode: "messages",
    },
  );

  for await (const [token] of stream) {
    try {
      process.stdout.write(token.text);
      response += token.text;
    } catch (error) {
      console.log(error);
    }
  }
  chatHistory.push(new AIMessage(response));
  response = "";
  process.stdout.write("\n");
}
