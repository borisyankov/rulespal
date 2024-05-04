import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse, StreamData } from 'ai';
import { searchFor } from '@/app/lib/actions';

const openai = new OpenAI({
  baseURL: 'https://together.hconeai.com/v1',
  // baseURL: "https://oai.hconeai.com/openai/v1",
  defaultHeaders: {
    // Groq: Authorization: "Bearer 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",
    Authorization:
      'Bearer 9eb698f84047054ea1fe55fee50fc348a65e91794201c1c00780194782292dbb', // together
    'Helicone-Auth': 'Bearer sk-6f2u4iq-qqfeziq-ukhmmea-6ra4t5y',
    'Content-Type': 'application/json',
    // "Helicone-Target-Provider": "Groq",
    // "Helicone-Target-Url": "https://api.groq.com",
  },
});

export async function POST(req: Request) {
  let { messages, data } = await req.json();

  const citationData = new StreamData();

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
        content: x.content,
      })),
    });
  }

  const response = await openai.chat.completions.create({
    model: 'meta-llama/Llama-3-70b-chat-hf', //n 'llama3-70b-8192', // model: 'gpt-3.5-turbo',
    stream: true,
    temperature: 0.1,
    messages,
  });

  const stream = OpenAIStream(response, { experimental_streamData: true });
  citationData.close();
  return new StreamingTextResponse(stream, {}, citationData);
}
