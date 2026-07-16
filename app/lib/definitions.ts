import type { UIMessage } from 'ai';

export type LogEntry = {
  id: number;
  timestamp: Date;
  message: string;
};

export type Game = {
  bggid: number;
  name: string;
  shortName?: string;
  code: string;
  alternativeNames?: string[];
  extraSources?: string[];
};

export type EmbeddingSet = {
  id: number;
  source: string;
  start: number;
  length: number;
  content: string;
  embedding: number[];
};

export type Citation = {
  start: number;
  length: number;
  content: string;
}

// Metadata attached to each assistant message so the client can render
// citations from the exact rulebook offsets used for retrieval, rather
// than parsing an excerpt the model echoes back (which breaks when the
// model paraphrases or answers in another language).
export type RulesMessageMetadata = {
  citations: Citation[];
};

export type RulesUIMessage = UIMessage<RulesMessageMetadata>;