import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage, createAgent, tool } from "langchain";
import env from "./env.ts";
import rl from "readline/promises";
import z from "zod";
/**
 * @vatsarun-dev
 */
const model = new ChatMistralAI({
  apiKey: env.Mistral_api_key,
  model: "mistral-medium-latest",
});

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const chatHistory: (HumanMessage | AIMessage)[] = [];
let response = "";

async function getWeather(city: string): Promise<string> {
  return JSON.stringify({ city: city, temperature: "25", condition: "sunny" });
}

const weatherTool = tool(getWeather, {
  name: "getWeather",
  description: "to give the weather of the city",
  schema: z.object({
    city: z.string().describe("get the city name for weather "),
  }),
});

const agent = createAgent({ model, tools: [weatherTool] });

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
