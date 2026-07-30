import {
  BM25Index,
  Retriever,
  VectorIndex,
  tokenize,
  type EmbeddedDocument,
  type SearchIndex,
  type SearchResult,
} from '../retriever';

describe('tokenize', () => {
  test('lowercases and splits on whitespace and punctuation', () => {
    expect(tokenize('The player Wins!')).toEqual(['the', 'player', 'wins']);
  });

  test('keeps hyphenated identifiers as a single term', () => {
    expect(tokenize('a INC-2023-Q4-011')).toEqual(['a', 'inc-2023-q4-011']);
  });

  test('returns an empty list when there are no word characters', () => {
    expect(tokenize('... !!! ...')).toEqual([]);
  });
});

describe('BM25Index', () => {
  const build = (...contents: string[]) => {
    const index = new BM25Index();
    for (const content of contents) {
      index.addDocument({ content });
    }
    return index;
  };

  test('returns an empty list when the index is empty', () => {
    expect(new BM25Index().search('anything', 3)).toEqual([]);
  });

  test('ranks the document containing a rare term first', () => {
    const index = build(
      'The quarterly financial analysis shows steady revenue growth.',
      'Cybersecurity incident INC-2023-Q4-011 was contained by the team.',
      'Software engineering resolved incident INC-2023-Q4-011 in Project Phoenix.',
    );
    const results = index.search('What happened with INC-2023-Q4-011?', 3);

    expect(results).toHaveLength(2);
    expect(results[0].document.content).toContain('INC-2023-Q4-011');
    expect(results[1].document.content).toContain('INC-2023-Q4-011');
  });

  test('a rare term outweighs a common one', () => {
    const index = build(
      'the the the the the meeple',
      'the the the the the the the',
    );
    const results = index.search('the meeple', 2);

    expect(results[0].document.content).toBe('the the the the the meeple');
  });

  test('excludes documents with no matching terms', () => {
    const index = build('alpha beta', 'gamma delta');
    const results = index.search('alpha', 5);

    expect(results).toHaveLength(1);
    expect(results[0].document.content).toBe('alpha beta');
  });

  test('respects the k limit', () => {
    const index = build('cat', 'cat cat', 'cat cat cat');
    expect(index.search('cat', 2)).toHaveLength(2);
  });
});

describe('VectorIndex', () => {
  const doc = (content: string, embedding: number[]): EmbeddedDocument => ({
    content,
    embedding,
  });

  test('returns an empty list when the index is empty', async () => {
    const index = new VectorIndex(async () => [1, 0]);
    expect(await index.search('q', 3)).toEqual([]);
  });

  test('ranks by cosine similarity to the query embedding', async () => {
    const index = new VectorIndex(async () => [1, 0]);
    index.addDocument(doc('opposite', [-1, 0]));
    index.addDocument(doc('orthogonal', [0, 1]));
    index.addDocument(doc('aligned', [1, 0]));

    const results = await index.search('query', 3);
    expect(results.map((r) => r.document.content)).toEqual([
      'aligned',
      'orthogonal',
      'opposite',
    ]);
  });

  test('embeds the query text through the injected function', async () => {
    const embedQuery = jest.fn(async () => [0, 1]);
    const index = new VectorIndex(embedQuery);
    index.addDocument(doc('up', [0, 1]));

    await index.search('which way is up?', 1);
    expect(embedQuery).toHaveBeenCalledWith('which way is up?');
  });
});

describe('Retriever', () => {
  test('throws when constructed with no indexes', () => {
    expect(() => new Retriever([])).toThrow(
      'At least one index must be provided',
    );
  });

  test('adds documents to every index', () => {
    const bm25 = new BM25Index();
    const other = new BM25Index();
    const retriever = new Retriever([bm25, other]);

    retriever.addDocument({ content: 'shared document' });
    expect(bm25.search('shared', 1)).toHaveLength(1);
    expect(other.search('shared', 1)).toHaveLength(1);
  });

  // A tiny index that returns a fixed ranking, letting us assert the fusion
  // math independent of any real scoring.
  class FixedIndex implements SearchIndex<{ content: string }> {
    constructor(private ranking: string[]) {}
    addDocument(): void {}
    search(): SearchResult<{ content: string }>[] {
      return this.ranking.map((content, i) => ({
        document: { content },
        score: this.ranking.length - i,
      }));
    }
  }

  test('fuses rankings with reciprocal rank fusion', async () => {
    // Vector: A(1) B(2) C(3); BM25: C(1) A(2) B(3). With k_rrf = 1:
    //   A = 1/2 + 1/3 = 0.833, C = 1/4 + 1/2 = 0.75, B = 1/3 + 1/4 = 0.583
    const retriever = new Retriever([
      new FixedIndex(['A', 'B', 'C']),
      new FixedIndex(['C', 'A', 'B']),
    ]);
    const results = await retriever.search('q', 3, 1);

    expect(results.map((r) => r.document.content)).toEqual(['A', 'C', 'B']);
    expect(results[0].score).toBeCloseTo(1 / 2 + 1 / 3, 12);
    expect(results[1].score).toBeCloseTo(1 / 4 + 1 / 2, 12);
    expect(results[2].score).toBeCloseTo(1 / 3 + 1 / 4, 12);
  });

  test('a document ranked by both indexes beats one ranked by only one', async () => {
    const retriever = new Retriever([
      new FixedIndex(['shared', 'onlyVector']),
      new FixedIndex(['shared', 'onlyBm25']),
    ]);
    const results = await retriever.search('q', 3);

    expect(results[0].document.content).toBe('shared');
  });

  test('combines vector and lexical search end to end', async () => {
    type Chunk = EmbeddedDocument;
    const vectorIndex = new VectorIndex<Chunk>(async () => [1, 0]);
    const bm25Index = new BM25Index<Chunk>();
    const retriever = new Retriever<Chunk>([vectorIndex, bm25Index]);

    // Semantically closest to the query, but no exact term match.
    retriever.addDocument({ content: 'a related concept', embedding: [1, 0] });
    // Semantically distant, but contains the exact rare term.
    retriever.addDocument({
      content: 'incident INC-2023-Q4-011 report',
      embedding: [0, 1],
    });

    const results = await retriever.search('INC-2023-Q4-011', 2);
    expect(results.map((r) => r.document.content)).toContain(
      'incident INC-2023-Q4-011 report',
    );
  });
});
