import { searchFor } from '@/app/lib/actions';
import { streamText, type UIMessage } from 'ai';
import model from './model';

export async function POST(req: Request) {
  const { messages, bggid }: { messages: UIMessage[]; bggid: string } =
    await req.json();
  const lastMessage = messages[messages.length - 1];
  const prompt = lastMessage.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('');
  const { system } = await searchFor(prompt, +bggid);
  const result = streamText({
    model,
    system,
    prompt,
    temperature: 0.1,
  });
  return result.toUIMessageStreamResponse();
}
