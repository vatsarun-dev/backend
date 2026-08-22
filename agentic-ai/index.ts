import { ChatMistralAI } from "@langchain/mistralai";
import { createAgent } from "langchain";
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

while (true) {
  const question: string = await readline.question("Enter your query: ");
  const stream = await agent.stream(
    {
      messages: question,
    },
    {
      streamMode: "messages",
    },
  );

  for await (const [token] of stream) {
    try {
      process.stdout.write(token.text);
    } catch (error) {
      console.log(error);
    }
  }
  process.stdout.write("\n");
}
