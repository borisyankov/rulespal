import { searchFor } from '@/app/lib/actions';
import { streamText } from 'ai';
import model from "./model";

export async function POST(req: Request) {
  let { messages, data } = await req.json();
  const prompt = messages[messages.length - 1].content;
  const { system, citations } = await searchFor(
    prompt,
    +data.bggid,
  );
  const result = await streamText({
    model,
    system,
    prompt,
    temperature: 0.1,
  });
  return result.toDataStreamResponse();
}
