import {
  aggregate,
  loadCorpus,
  resolveGold,
  runVariant,
  VARIANTS,
} from '../harness';
import SETS from '../sets';

// The full evaluation (npm run eval:search) needs query embeddings; this is the
// part of it that runs anywhere, every time the test suite does. It guards the
// two things that would quietly hollow the eval out: gold passages that no
// longer appear in their rulebook, and lexical retrieval regressing without
// anyone running the eval by hand.

// Floors, not targets — they exist to catch a regression in tokenizing, scoring
// or chunking, so they sit below what lexical search currently manages. They
// differ per set because the corpora do: BM25 finds most rules in Wingspan's
// 21 chunks and struggles in Root's 113, where the vocabulary of any one rule
// is common across the whole book.
const BM25_FLOORS: Record<string, { hit1: number; hit5: number }> = {
  wingspan: { hit1: 0.4, hit5: 0.9 },
  'wingspan-asia': { hit1: 0.35, hit5: 0.7 },
  root: { hit1: 0.2, hit5: 0.5 },
};

describe.each(SETS.map((set) => [set.name, set] as const))(
  '%s eval set',
  (_name, set) => {
    const corpus = loadCorpus(set.code);

    test.each(set.cases.map((evalCase) => [evalCase.id, evalCase] as const))(
      'gold passages for %s are still in the rulebook',
      (_id, evalCase) => {
        for (const passage of resolveGold(corpus, evalCase)) {
          expect(passage.spans.length).toBeGreaterThan(0);
        }
      },
    );

    test('case ids are unique', () => {
      const ids = set.cases.map((evalCase) => evalCase.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    test('lexical retrieval alone stays above its floor', async () => {
      const bm25 = VARIANTS.find((variant) => variant.name === 'bm25')!;
      const results = await runVariant(
        bm25,
        corpus,
        set,
        async () => {
          throw new Error('bm25 must not embed the query');
        },
        5,
      );
      const metrics = aggregate(results);
      const floor = BM25_FLOORS[set.code];

      expect(metrics.cases).toBe(set.cases.length);
      expect(metrics.hitAt[5]).toBeGreaterThanOrEqual(floor.hit5);
      expect(metrics.hitAt[1]).toBeGreaterThanOrEqual(floor.hit1);
    });
  },
);
