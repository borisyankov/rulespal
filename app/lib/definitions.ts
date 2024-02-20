export type LogEntry = {
  id: number;
  timestamp: Date;
  message: string;
};

export type Game = {
  bggid: number;
  name: string;
  code: string;
};

export type EmbeddingSet = {
  id: number;
  source: string;
  start: number;
  length: number;
  content: string;
  embedding: number[];
};
