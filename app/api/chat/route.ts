import { searchFor } from '@/app/lib/actions';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';
import model from './model';
import { clientKey, rateLimit } from './rate-limit';

// Cap the retrieved question so a single request can't push an unbounded
// payload into the embedding and LLM APIs.
const MAX_QUESTION_LENGTH = 2000;

function lastUserText(messages: UIMessage[]): string {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  return (lastUser?.parts ?? [])
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('');
}

export async function POST(req: Request) {
  try {
    if (!rateLimit(clientKey(req))) {
      return Response.json(
        { error: 'Too many requests' },
        { status: 429 },
      );
    }

    const { messages, bggid }: { messages: UIMessage[]; bggid: string } =
      await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'No messages provided' }, { status: 400 });
    }
    if (!Number.isFinite(+bggid)) {
      return Response.json({ error: 'Invalid game id' }, { status: 400 });
    }
    // Retrieve on the latest user turn, but let the model see the whole
    // conversation so follow-up questions keep their context.
    const query = lastUserText(messages);
    if (query.length === 0) {
      return Response.json({ error: 'Empty question' }, { status: 400 });
    }
    if (query.length > MAX_QUESTION_LENGTH) {
      return Response.json(
        { error: 'Question is too long' },
        { status: 413 },
      );
    }
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
