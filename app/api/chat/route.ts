import { searchFor } from '@/app/lib/actions';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';
import model from './model';

function lastUserText(messages: UIMessage[]): string {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  return (lastUser?.parts ?? [])
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('');
}

export async function POST(req: Request) {
  try {
    const { messages, bggid }: { messages: UIMessage[]; bggid: string } =
      await req.json();
    // Retrieve on the latest user turn, but let the model see the whole
    // conversation so follow-up questions keep their context.
    const query = lastUserText(messages);
    const { system, citations } = await searchFor(query, +bggid);
    const result = streamText({
      model,
      system,
      messages: convertToModelMessages(messages),
      temperature: 0.1,
    });
    return result.toUIMessageStreamResponse({
      // Citations are known up front from retrieval, so attach them when the
      // assistant message starts streaming.
      messageMetadata: ({ part }) =>
        part.type === 'start' ? { citations } : undefined,
    });
  } catch (error) {
    console.error('Chat request failed:', error);
    const notFound = error instanceof Error && error.message === 'Game not found';
    return Response.json(
      { error: notFound ? 'Game not found' : 'Something went wrong' },
      { status: notFound ? 404 : 500 },
    );
  }
}
