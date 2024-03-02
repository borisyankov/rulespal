import OpenAI from 'openai';
import {
  OpenAIStream,
  StreamingTextResponse,
  experimental_StreamData,
} from 'ai';
import { searchFor } from '@/app/lib/actions';

const openai = new OpenAI({
  baseURL: "https://oai.hconeai.com/v1",
  defaultHeaders: {
    "Helicone-Auth": "Bearer sk-6f2u4iq-qqfeziq-ukhmmea-6ra4t5y",
  },
});

export async function POST(req: Request) {
  let { messages, data } = await req.json();

  const citationData = new experimental_StreamData();

  if (messages[0].role !== 'system') {
    const lastMessage = messages[messages.length - 1];
    const { prompt, embeddings } = await searchFor(
      lastMessage.content,
      +data.bggid,
    );
    messages = [
      {
        role: 'system',
        content: prompt,
      },
      ...messages,
    ];
    citationData.append({
      citations: embeddings.map((x) => ({
        start: x.start,
        length: x.length,
        content: x.content
      })),
    });
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    stream: true,
    temperature: 0,
    messages,
  });

  const stream = OpenAIStream(response, { experimental_streamData: true });
  citationData.close();
  return new StreamingTextResponse(stream, {}, citationData);
}
