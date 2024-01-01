import { searchFor } from "@/app/lib/data";
import { StreamingTextResponse, LangChainStream, Message } from "ai";
import { ChatOpenAI } from "langchain/chat_models/openai";

import { AIMessage, HumanMessage, SystemMessage } from "langchain/schema";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const lastMessage = messages[messages.length - 1];
  const foundRules = await searchFor(lastMessage.content);

  const { stream, handlers } = LangChainStream();

  const llm = new ChatOpenAI({
    temperature: 0,
    streaming: true,
  });

  const rulesExcerpt = foundRules.map(x => x.content).join("\n");
  console.log(rulesExcerpt);
  const promptMessage = new SystemMessage({
    content: `You are a helpful assistant that knows every rule in Dune Imperium: Uprising.
To answer questions about game rules use this:
== START OF RULEBOOK EXCERPT ==
${rulesExcerpt}
== END OF RULEBOOK EXCERPT ==
If you are not sure about the answer, say "I don't know" or "I'm not sure".
`,
  });

  const llmMessagees = (messages as Message[]).map((m) =>
    m.role === "user" ? new HumanMessage(m.content) : new AIMessage(m.content)
  );

  llm
    .call([promptMessage, ...llmMessagees], {}, [handlers])
    .catch(console.error);

  return new StreamingTextResponse(stream);
}
