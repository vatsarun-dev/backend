import env from "./env.ts";
import rl from "readline/promises";
import z from "zod";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage, createAgent, toolStrategy } from "langchain";

/**
 * @vatsarun-dev
 */
if (!env.Mistral_api_key) throw new Error("there is no api key");

/**
 * READLINE IS A PACKAGE TO TAKE THE INPUT FROM USER AND GIVE IT TO THE AI
 */

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * IT IS THE LLM INSTANCE TO INVOKE THE MODEL
 * IT REQUIRES APIKEY AND MODEL NAME. THIS MUST BE COMPULSORY.
 */

const model = new ChatMistralAI({
  apiKey: env.Mistral_api_key,
  model: "mistral-medium-latest",
});

/**
 * IT IS THE SCHEMA MODEL TO RECIEVE THE ANSWER IN THE PREFRENCE MODEL
 */

const schema = z.object({
  name: z.string().describe("this is the name of user"),
  age: z.number().describe("this is the age of user"),
  city: z.string().describe("this is the city of user"),
});

/**
 * IT IS USE TO WRAP THE INSTANCE WITH THE AGENT TO ENHANCE MORE FUNCTIONALITY
 */
const agents = createAgent({ model, responseFormat: toolStrategy(schema) });

/**
 * IT IS THE ARRAY WHICH KEEP THE USER CHAT HISTORY SAFE DURING THE CHAT
 */
const chatHistory: (HumanMessage | AIMessage)[] = [];
let response: string = "";
/**
 * IT IS THE USE TO TAKE THE USER INPUT FROM USER AFTER EACH ANSWER OF AI
 */
while (true) {
  /**
   * IT IS THE QUESTION METHOD WHICH GIVES BY READLINE
   */
  const message: string = await readline.question("Enter your query: ");
  // IT PUSHES HUMANMESSAGE INTO ARRAY
  chatHistory.push(new HumanMessage(message));

  /** IT TAKE INVOKE THE LLM BY GIVING USER'S QUERY */
  const responses: string = await agents.stream(
    {
      messages: chatHistory,
    },
    { streamMode: "messages" },
  );
  /**IT PRINTS THE OUTPUT IN THE ANIMATION LIKE CHATGPT DOES */
  for await (const [token] of responses) {
    process.stdout.write(token.text);
    response += token.text;
  }
  chatHistory.push(new AIMessage(response));
  response = "";
  process.stdout.write("\n");
}
