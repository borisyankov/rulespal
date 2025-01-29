import { createGroq } from '@ai-sdk/groq';

const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://groq.helicone.ai/openai/v1",
    headers: {
      "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
    },
  });

const model = groq('llama-3.3-70b-versatile');

export default model;