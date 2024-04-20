import OpenAI from 'openai';
import {
  OpenAIStream,
  StreamingTextResponse,
  experimental_StreamData,
} from 'ai';
import { searchFor } from '@/app/lib/actions';

const openai = new OpenAI({
  baseURL: "https://oai.hconeai.com/openai/v1",
  defaultHeaders: {
    Authorization: "Bearer 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",
    "Helicone-Auth": "Bearer sk-6f2u4iq-qqfeziq-ukhmmea-6ra4t5y",
    "Content-Type": "application/json",
    "Helicone-Target-Provider": "Groq",
    "Helicone-Target-Url": "https://api.groq.com",
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
    model: 'llama3-70b-8192', // model: 'gpt-3.5-turbo',
    stream: true,
    temperature: 0,
    messages,
  });

  const stream = OpenAIStream(response, { experimental_streamData: true });
  citationData.close();
  return new StreamingTextResponse(stream, {}, citationData);
}
