import fs from 'fs';
import path from 'path';
import {
  BM25Index,
  Retriever,
  RRF_K,
  VectorIndex,
  type SearchIndex,
} from '../../app/lib/retriever';
import { splitText } from '../../app/lib/rag';
import type { EvalCase, EvalSet } from './dataset';

const projectRoot = path.resolve(__dirname, '../..');

// A chunk exactly as app/lib/actions.ts assembles it: the offsets and vector
// from the published embeddings file, and content sliced out of the rulebook
// at those offsets. Building it any other way would evaluate a pipeline the
// app doesn't run.
export type Chunk = {
  start: number;
  length: number;
  content: string;
  embedding: number[];
};

export type Corpus = {
  code: string;
  rulebook: string;
  chunks: Chunk[];
};

type StoredEmbedding = { start: number; length: number; embedding: number[] };

export function loadCorpus(code: string): Corpus {
  const rulebook = fs.readFileSync(
    `${projectRoot}/data/rulebooks/${code}-rulebook.md`,
    'utf-8',
  );
  const stored = JSON.parse(
    fs.readFileSync(
      `${projectRoot}/public/embeddings/${code}-embeddings.json`,
      'utf-8',
    ),
  ) as StoredEmbedding[];

  return {
    code,
    rulebook,
    chunks: stored.map((entry) => ({
      ...entry,
      content: rulebook.substring(entry.start, entry.start + entry.length),
    })),
  };
}

// ---------------------------------------------------------------------------
// Locating gold passages
// ---------------------------------------------------------------------------

export type Span = { start: number; end: number };

const QUOTE_CLASSES: Record<string, string> = {
  "'": "['’‘]",
  '’': "['’‘]",
  '‘': "['’‘]",
  '"': '["“”]',
  '“': '["“”]',
  '”': '["“”]',
  '-': '[-–—]',
  '–': '[-–—]',
  '—': '[-–—]',
};

// Whitespace, markdown emphasis and list markers between two words of a quote.
// Gold passages are written as plain prose; this lets them match text that
// carries `**bold**`, bullets or "1." numbering without the author having to
// reproduce the markup.
const SEPARATOR = '(?:[\\s*_>#]|\\d+\\.)+';

function escapeRegExp(char: string): string {
  return char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Turn a gold passage into a pattern that tolerates the markup above.
function quotePattern(quote: string): RegExp {
  let pattern = '';
  for (let i = 0; i < quote.length; i++) {
    const char = quote[i];
    if (/\s/.test(char)) {
      // Collapse a run of whitespace into one flexible separator.
      while (i + 1 < quote.length && /\s/.test(quote[i + 1])) i++;
      pattern += SEPARATOR;
      continue;
    }
    pattern += QUOTE_CLASSES[char] ?? escapeRegExp(char);
    // Emphasis markers can also appear mid-word ("column.**Pay").
    pattern += '[*_]*';
  }
  return new RegExp(pattern, 'g');
}

// Every place a gold passage appears. Rulebooks repeat themselves — Wingspan
// states the round-end sequence twice — and retrieval should get credit for
// finding any copy.
export function locateGold(rulebook: string, quote: string): Span[] {
  const spans: Span[] = [];
  const pattern = quotePattern(quote);
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(rulebook)) !== null) {
    spans.push({ start: match.index, end: match.index + match[0].length });
  }
  return spans;
}

export type GoldPassage = { quote: string; spans: Span[] };

// Resolve a case's gold passages against the rulebook, failing loudly on any
// quote that no longer appears. A silently unlocatable quote would turn into a
// permanently failing case and make the whole score meaningless.
export function resolveGold(corpus: Corpus, evalCase: EvalCase): GoldPassage[] {
  return evalCase.gold.map((quote) => {
    const spans = locateGold(corpus.rulebook, quote);
    if (spans.length === 0) {
      throw new Error(
        `[${evalCase.id}] gold passage not found in ${corpus.code}-rulebook.md: ${JSON.stringify(quote.slice(0, 60))}…`,
      );
    }
    return { quote, spans };
  });
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

// A retrieved chunk counts as relevant on its own when it holds at least this
// much of a gold passage. Below half the passage, the model is reading a
// fragment of the rule and can just as easily be misled by it.
export const MIN_COVERAGE = 0.5;

function overlap(a: Span, b: Span): number {
  return Math.max(0, Math.min(a.end, b.end) - Math.max(a.start, b.start));
}

function chunkSpan(chunk: Chunk): Span {
  return { start: chunk.start, end: chunk.start + chunk.length };
}

// How much of `gold` the retrieved chunks contain between them. Chunks overlap
// by design, so the spans are merged before measuring — otherwise two chunks
// sharing the same 100 characters would both be counted.
function coverageOf(gold: Span, chunks: Chunk[]): number {
  const goldLength = gold.end - gold.start;
  if (goldLength === 0) return 0;
  const pieces = chunks
    .map(chunkSpan)
    .map((span) => ({
      start: Math.max(span.start, gold.start),
      end: Math.min(span.end, gold.end),
    }))
    .filter((span) => span.end > span.start)
    .sort((a, b) => a.start - b.start);

  let covered = 0;
  let reach = gold.start;
  for (const piece of pieces) {
    const from = Math.max(piece.start, reach);
    if (piece.end > from) {
      covered += piece.end - from;
      reach = piece.end;
    }
  }
  return covered / goldLength;
}

// The best any single gold passage is served by these chunks. Gold passages
// are alternatives, so a case only needs one of them.
function bestCoverage(gold: GoldPassage[], chunks: Chunk[]): number {
  return Math.max(
    0,
    ...gold.flatMap((passage) =>
      passage.spans.map((span) => coverageOf(span, chunks)),
    ),
  );
}

export type CaseResult = {
  case: EvalCase;
  // Ranked chunks, best first.
  retrieved: Chunk[];
  // 1-based rank of the first chunk that on its own carries a gold passage,
  // or null if no retrieved chunk does.
  firstRelevantRank: number | null;
  // Share of the best gold passage present in the top-k excerpt.
  coverage: number;
  // coverage >= MIN_COVERAGE at each cut-off.
  hitAt: Record<number, boolean>;
};

// The cut-offs a report shows, given how many chunks were retrieved. Always
// ends at k so the headline number describes the excerpt the app would build.
export function cutoffsFor(k: number): number[] {
  const cutoffs = [1, 3, 5].filter((cutoff) => cutoff < k);
  return [...cutoffs, k];
}

export function scoreCase(
  corpus: Corpus,
  evalCase: EvalCase,
  retrieved: Chunk[],
  cutoffs: number[],
): CaseResult {
  const gold = resolveGold(corpus, evalCase);

  let firstRelevantRank: number | null = null;
  for (let i = 0; i < retrieved.length; i++) {
    if (bestCoverage(gold, [retrieved[i]]) >= MIN_COVERAGE) {
      firstRelevantRank = i + 1;
      break;
    }
  }

  const hitAt: Record<number, boolean> = {};
  for (const cutoff of cutoffs) {
    hitAt[cutoff] =
      bestCoverage(gold, retrieved.slice(0, cutoff)) >= MIN_COVERAGE;
  }

  return {
    case: evalCase,
    retrieved,
    firstRelevantRank,
    coverage: bestCoverage(gold, retrieved),
    hitAt,
  };
}

export type Metrics = {
  cases: number;
  hitAt: Record<number, number>;
  mrr: number;
  coverage: number;
};

export function aggregate(results: CaseResult[]): Metrics {
  const n = results.length;
  const mean = (values: number[]) =>
    n === 0 ? 0 : values.reduce((sum, value) => sum + value, 0) / n;
  const cutoffs = Object.keys(results[0]?.hitAt ?? {}).map(Number);

  return {
    cases: n,
    hitAt: Object.fromEntries(
      cutoffs.map((cutoff) => [
        cutoff,
        mean(results.map((result) => (result.hitAt[cutoff] ? 1 : 0))),
      ]),
    ),
    // Reciprocal rank over the retrieved window: 1.0 when the answer is the
    // first chunk, 0 when it never shows up.
    mrr: mean(
      results.map((result) =>
        result.firstRelevantRank ? 1 / result.firstRelevantRank : 0,
      ),
    ),
    coverage: mean(results.map((result) => result.coverage)),
  };
}

// ---------------------------------------------------------------------------
// Retrieval variants
// ---------------------------------------------------------------------------

export type EmbedQuery = (text: string) => Promise<number[]>;

export type Variant = {
  name: string;
  description: string;
  build: (corpus: Corpus, embedQuery: EmbedQuery) => SearchIndex<Chunk>[];
};

// The production pipeline is `hybrid`; the other two exist to show what each
// half contributes, which is the only way to tell whether fusing them is
// earning its keep.
export const VARIANTS: Variant[] = [
  {
    name: 'hybrid',
    description: 'BM25 + vector, fused with RRF (what the app runs)',
    build: (_corpus, embedQuery) => [
      new VectorIndex<Chunk>(embedQuery),
      new BM25Index<Chunk>(),
    ],
  },
  {
    name: 'vector',
    description: 'semantic search only',
    build: (_corpus, embedQuery) => [new VectorIndex<Chunk>(embedQuery)],
  },
  {
    name: 'bm25',
    description: 'lexical search only',
    build: () => [new BM25Index<Chunk>()],
  },
];

export function buildRetriever(
  variant: Variant,
  corpus: Corpus,
  embedQuery: EmbedQuery,
): Retriever<Chunk> {
  // Keyed on offset, as in app/lib/actions.ts, so both indexes agree on what
  // counts as the same chunk.
  const retriever = new Retriever<Chunk>(
    variant.build(corpus, embedQuery),
    (chunk) => String(chunk.start),
  );
  for (const chunk of corpus.chunks) {
    retriever.addDocument(chunk);
  }
  return retriever;
}

export async function runVariant(
  variant: Variant,
  corpus: Corpus,
  set: EvalSet,
  embedQuery: EmbedQuery,
  k: number,
  // The RRF constant. Only meaningful for a multi-index variant: fusing one
  // index preserves its ranking whatever the constant is.
  kRrf = RRF_K,
): Promise<CaseResult[]> {
  const retriever = buildRetriever(variant, corpus, embedQuery);
  const cutoffs = cutoffsFor(k);
  const results: CaseResult[] = [];
  for (const evalCase of set.cases) {
    const hits = await retriever.search(evalCase.question, k, kRrf);
    results.push(
      scoreCase(
        corpus,
        evalCase,
        hits.map((hit) => hit.document),
        cutoffs,
      ),
    );
  }
  return results;
}

// ---------------------------------------------------------------------------
// Index health
// ---------------------------------------------------------------------------

// Retrieval can only be as good as the chunks underneath it, and two failure
// modes here are invisible in the metrics above: embeddings generated from an
// older copy of the rulebook, and offsets that no longer point at the text
// they were computed from.
export type IndexHealth = {
  storedChunks: number;
  currentChunks: number;
  rulebookLength: number;
  // Where the last chunk ends. The offsets come from the whitespace-collapsed
  // text splitText() produces, but the app slices the raw file with them, so
  // the shortfall against the file length is how far the final chunk's text
  // has slid away from the vector that represents it.
  indexedLength: number;
  chunksStartingMidWord: number;
};

export function indexHealth(corpus: Corpus): IndexHealth {
  const last = corpus.chunks[corpus.chunks.length - 1];
  return {
    storedChunks: corpus.chunks.length,
    // Chunking is deterministic, so a different count means the embeddings
    // predate the current rulebook (or the current splitText).
    currentChunks: splitText(corpus.rulebook, 1000, 100).length,
    rulebookLength: corpus.rulebook.length,
    indexedLength: last ? last.start + last.length : 0,
    chunksStartingMidWord: corpus.chunks.filter((chunk) => {
      const before = corpus.rulebook[chunk.start - 1];
      return (
        chunk.start > 0 && /\w/.test(before ?? '') && /\w/.test(chunk.content[0] ?? '')
      );
    }).length,
  };
}
