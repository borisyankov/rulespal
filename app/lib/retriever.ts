import { cosineToUnit, normalize } from './rag';

// A multi-index retrieval pipeline.
//
// Semantic (vector) search understands meaning but can miss exact terms —
// an incident id, a card name, a keyword — that appear verbatim in the text.
// Lexical (BM25) search does the opposite: it nails exact terms but ignores
// meaning. The `Retriever` runs both in parallel and merges their rankings
// with reciprocal rank fusion, so a chunk that scores well in either method
// rises to the top.
//
// Every index implements the same `SearchIndex` interface (`addDocument` +
// `search`), so new search strategies can be added without touching the
// `Retriever`.

// Any document flowing through the pipeline must carry the text to be indexed.
// Callers are free to attach extra fields (offsets, ids, embeddings); indexes
// only read what they need and pass the whole object back in results.
export type IndexDocument = {
  content: string;
};

// A single hit: the stored document plus a score where higher is better.
export type SearchResult<T> = {
  document: T;
  score: number;
};

// The shared contract. `search` may be synchronous (BM25) or asynchronous
// (a vector index that has to embed the query first); the `Retriever` awaits
// either form.
export interface SearchIndex<T extends IndexDocument> {
  addDocument(document: T): void;
  search(
    queryText: string,
    k: number,
  ): SearchResult<T>[] | Promise<SearchResult<T>[]>;
}

// Break text into lowercase terms for lexical matching. Alphanumeric runs are
// kept together, and internal hyphens are preserved so identifiers such as
// "INC-2023-Q4-011" survive as a single rare term instead of being shredded
// into common pieces.
export function tokenize(text: string): string[] {
  return text.toLowerCase().match(/[a-z0-9]+(?:-[a-z0-9]+)*/g) ?? [];
}

// Standard BM25 tuning constants.
// k1 controls how quickly extra occurrences of a term stop adding score.
// b controls how strongly a document's length penalizes its score.
export const BM25_K1 = 1.5;
export const BM25_B = 0.75;

// Count occurrences of each term in a token list.
function termFrequencies(tokens: string[]): Map<string, number> {
  const freq = new Map<string, number>();
  for (const token of tokens) {
    freq.set(token, (freq.get(token) ?? 0) + 1);
  }
  return freq;
}

// A lexical index scoring documents with the BM25 (Best Match 25) ranking
// function. Rare query terms are weighted more heavily than common ones, so
// specific terms dominate the ranking.
export class BM25Index<T extends IndexDocument = IndexDocument>
  implements SearchIndex<T>
{
  private documents: T[] = [];
  // Term frequencies per document, indexed alongside `documents`.
  private termFreqs: Map<string, number>[] = [];
  // Token count per document, used for length normalization.
  private docLengths: number[] = [];
  // Document frequency: how many documents contain each term.
  private docFreq = new Map<string, number>();
  private totalLength = 0;

  addDocument(document: T): void {
    const tokens = tokenize(document.content);
    const freq = termFrequencies(tokens);
    for (const term of freq.keys()) {
      this.docFreq.set(term, (this.docFreq.get(term) ?? 0) + 1);
    }
    this.documents.push(document);
    this.termFreqs.push(freq);
    this.docLengths.push(tokens.length);
    this.totalLength += tokens.length;
  }

  // Inverse document frequency: rarer terms score higher. The +0.5 smoothing
  // is the standard BM25 form, wrapped in log(1 + …) so the value stays
  // non-negative even for terms present in most documents.
  private idf(term: string): number {
    const n = this.documents.length;
    const df = this.docFreq.get(term) ?? 0;
    return Math.log(1 + (n - df + 0.5) / (df + 0.5));
  }

  search(queryText: string, k: number): SearchResult<T>[] {
    const n = this.documents.length;
    if (n === 0) {
      return [];
    }
    const queryTerms = new Set(tokenize(queryText));
    const avgLength = this.totalLength / n;

    const scored = this.documents.map((document, i) => {
      const freq = this.termFreqs[i];
      const lengthNorm =
        1 - BM25_B + BM25_B * (this.docLengths[i] / avgLength);
      let score = 0;
      for (const term of queryTerms) {
        const tf = freq.get(term) ?? 0;
        if (tf === 0) {
          continue;
        }
        const saturation = (tf * (BM25_K1 + 1)) / (tf + BM25_K1 * lengthNorm);
        score += this.idf(term) * saturation;
      }
      return { document, score };
    });

    return scored
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, k);
  }
}

// A document that additionally carries a precomputed embedding for the vector
// index. Embeddings are built offline (see scripts/embeddings.ts), so adding a
// document is cheap; only the query is embedded at search time.
export type EmbeddedDocument = IndexDocument & {
  embedding: number[];
};

// A semantic index ranking documents by cosine similarity between their
// embeddings and the query embedding. The query is embedded on demand through
// the injected `embedQuery` function, keeping this class free of any specific
// embedding provider.
export class VectorIndex<T extends EmbeddedDocument = EmbeddedDocument>
  implements SearchIndex<T>
{
  private documents: T[] = [];

  constructor(private embedQuery: (text: string) => Promise<number[]>) {}

  addDocument(document: T): void {
    this.documents.push(document);
  }

  async search(queryText: string, k: number): Promise<SearchResult<T>[]> {
    if (this.documents.length === 0) {
      return [];
    }
    // Normalize the query once and reuse it across every chunk comparison.
    const queryUnit = normalize(await this.embedQuery(queryText));
    return this.documents
      .map((document) => ({
        document,
        score: cosineToUnit(document.embedding, queryUnit),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, k);
  }
}

// Default constant in the reciprocal rank fusion formula. Larger values flatten
// the contribution of rank differences; 60 is the value from the original RRF
// paper and a common default.
export const RRF_K = 60;

// Identifies a document across indexes so its ranks can be summed. Two indexes
// return the same logical chunk as distinct object instances, so identity is
// keyed on content by default.
type KeyFn<T> = (document: T) => string;

// Coordinates several indexes behind one interface. `addDocument` fans a
// document out to every index; `search` queries them all and fuses the
// rankings with reciprocal rank fusion.
export class Retriever<T extends IndexDocument> {
  private indexes: SearchIndex<T>[];
  private keyFn: KeyFn<T>;

  constructor(
    indexes: SearchIndex<T>[],
    keyFn: KeyFn<T> = (document) => document.content,
  ) {
    if (indexes.length === 0) {
      throw new Error('At least one index must be provided');
    }
    this.indexes = indexes;
    this.keyFn = keyFn;
  }

  addDocument(document: T): void {
    for (const index of this.indexes) {
      index.addDocument(document);
    }
  }

  // Reciprocal rank fusion: each index contributes 1 / (k_rrf + rank) for a
  // document, summed across indexes, where rank is 1-based. A document ranked
  // highly by several methods accumulates the most, so it wins even if no
  // single method ranked it first.
  async search(
    queryText: string,
    k = 1,
    kRrf = RRF_K,
  ): Promise<SearchResult<T>[]> {
    const perIndexResults = await Promise.all(
      this.indexes.map((index) => index.search(queryText, k)),
    );

    const scores = new Map<string, number>();
    const documents = new Map<string, T>();
    for (const results of perIndexResults) {
      results.forEach((result, rank) => {
        const key = this.keyFn(result.document);
        scores.set(key, (scores.get(key) ?? 0) + 1 / (kRrf + rank + 1));
        if (!documents.has(key)) {
          documents.set(key, result.document);
        }
      });
    }

    return [...scores.entries()]
      .map(([key, score]) => ({ document: documents.get(key)!, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, k);
  }
}
