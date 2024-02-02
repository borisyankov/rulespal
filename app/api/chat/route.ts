import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { searchFor } from "@/app/lib/actions";

const openai = new OpenAI();

export async function POST(req: Request) {
  let { messages, data } = await req.json();

  if (messages[0].role !== "system") {
    const lastMessage = messages[messages.length - 1];
    const prompt = await searchFor(lastMessage.content, +data.bggid);
    messages = [
      {
        role: "system",
        content: prompt,
      },
      ...messages,
    ];
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    temperature: 0,
    messages,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
