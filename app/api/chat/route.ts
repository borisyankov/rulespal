import { searchFor } from "@/app/lib/data";
import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";
// from langchain.prompts.chat import (
//   ChatPromptTemplate,
//   HumanMessagePromptTemplate,
//   SystemMessagePromptTemplate,
// )

import { AIMessage, HumanMessage, SystemMessage } from "langchain/schema";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const lastMessage = messages[messages.length - 1];
  console.time("searchFor");
  const foundRules = await searchFor(lastMessage.content);
  console.timeEnd("searchFor");

  const { stream, handlers } = LangChainStream();

  const llm = new ChatOpenAI({
    temperature: 0,
    streaming: true,
  });

  const promptMessage = new SystemMessage({
    content: `You are a helpful assistant that knows every rule in Dune Imperium. To answer use this context: ${foundRules.content}`,
  });

  const llmMessagees = (messages as Message[]).map((m) =>
    m.role === "user" ? new HumanMessage(m.content) : new AIMessage(m.content)
  );

  llm
    .call([promptMessage, ...llmMessagees], {}, [handlers])
    .catch(console.error);

  return new StreamingTextResponse(stream);
}
