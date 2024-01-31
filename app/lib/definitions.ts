export type LogEntry = {
  id: number;
  timestamp: Date;
  message: string;
};

export type Game = {
  bggid: number;
  name: string;
  code: string;
  thumbnail: string;
};

export type EmbeddingsStatic = {
  chunk: string;
  embedding: number[];
}

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

export type EmbeddingDetails = {
  bggid: number;
  gamename: string;
  source: string;
  content: string;
  embedding: number[];
};