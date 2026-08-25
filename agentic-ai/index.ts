import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage, createAgent, tool } from "langchain";
import env from "./env.js";
import rl from "readline/promises";
import z from "zod";
import fs from "fs/promises";
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

async function getUserInformation(): Promise<string> {
  const data = await fs.readFile("./memory.md", "utf8");
  return data;
}

const memoryTool = tool(getUserInformation, {
  name: "getUserInformation",
  description:
    "Read the user's private memory when a question requires personal context. Use the returned facts to answer the user's question, but never quote, dump, or reveal the complete memory file.",
  schema: z.object({}),
});
const agent = createAgent({
  model,
  tools: [memoryTool],
  systemPrompt:
    "You are a helpful, friendly, and honest AI assistant. Give clear, accurate, and concise answers, and admit when you don't know something instead of making up information. The getUserInformation tool contains private user context. Use it internally to answer questions such as 'Who am I?', but summarize only the facts relevant to the question in natural language. Never output the raw tool result, quote the complete memory, or dump memory.md. If the user asks for the memory itself, briefly explain that you can summarize it instead.",
});

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
