import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { searchFor } from "@/app/lib/data";
import { getPrompt } from "./prompt";

const openai = new OpenAI();

export const runtime = "edge";

export async function POST(req: Request) {
  let { messages } = await req.json();

  const lastMessage = messages[messages.length - 1];
  const foundRules = await searchFor(lastMessage.content);
  const rulesExcerpt = foundRules
    .map((x, i) => `${x.chunk} 【${i}†source】`)
    .join("\n");
  if (messages[0].role !== "system") {
    messages = [
      {
        role: "system",
        content: getPrompt(rulesExcerpt),
      },
      ...messages,
    ];
  }

  const response = await openai.chat.completions.create({
    // model: "pplx-70b-online",
    model: 'gpt-3.5-turbo',
    stream: true,
    temperature: 0,
    messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
