export type LogEntry = {
  id: number;
  timestamp: Date;
  message: string;
};

export type Game = {
  id: string;
  name: string;
  bggid: string;
};

export type Embedding = {
  id: number;
  bggid: number;
  source: string;
  content: string;
  embedding: number[];
};

export type EmbeddingBrief = {
  bggid: number;
  gamename: string;
  source: string;
};