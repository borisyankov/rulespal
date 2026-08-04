# Rules search evaluation

Measures how well retrieval finds the passage that answers a rules question —
the step that decides what the model is allowed to know before it writes a
word.

Three sets, chosen to be different shapes rather than more of the same
(`sets.ts`):

| set | corpus | what it stresses |
| --- | --- | --- |
| Wingspan | 21 chunks, 19k chars | a short, plainly written rulebook — the easy case |
| Wingspan Asia | 43 chunks, 38k chars | an expansion that restates the game it modifies, so the same topic has one answer per mode |
| Root | 113 chunks, 100k chars | a long legal-style ruleset with five structurally parallel faction sections |

```bash
npm run eval:search                      # every variant, full report
npm run eval:search -- --offline         # cached query embeddings only, no API key
npm run eval:search -- --verbose         # add a per-case table
npm run eval:search -- --k 3             # retrieve 3 chunks instead of 5
npm run eval:search -- --variant bm25    # one variant
npm run eval:search -- --json            # machine-readable
npm run eval:search -- --fail-under 0.9  # exit 1 if hybrid hit@k falls below
npm run eval:search -- --sweep-rrf 1,10,60   # score fusion at each RRF constant
```

## What is measured

The harness builds chunks exactly the way `app/lib/actions.ts` does — offsets
and vectors from `public/embeddings/<code>-embeddings.json`, text sliced out of
`data/rulebooks/<code>-rulebook.md` at those offsets — and runs the same
`Retriever`. What it scores is therefore the excerpt the live app would put in
front of the model, not an idealized version of it.

Each case names the passage(s) of the rulebook that answer its question. A case
is **answered** when the retrieved excerpt carries at least half of one of them;
half a rule is treated as a miss, because a fragment can mislead as easily as it
can inform.

| metric | meaning |
| --- | --- |
| `hit@1` / `hit@3` / `hit@5` | share of questions answered within the top 1 / 3 / 5 chunks |
| `MRR` | 1 / rank of the first chunk that carries the rule on its own; 0 if none does |
| `coverage` | how much of the rule the top-k excerpt contains, averaged over cases |

`hit@5` saturates on a short rulebook — five of Wingspan's twenty-one chunks is
a quarter of the book — so on that set `hit@1` and `MRR` are the numbers that
discriminate. They are also the ones that matter in practice: the answer
competing with four irrelevant chunks for the model's attention is worse than
the answer on top. On Root, where the top 5 is 5% of the corpus, `hit@5` carries
real information again.

Three variants run side by side so the split between the two indexes stays
visible: `hybrid` (what the app runs), `vector` and `bm25`. If fusing ever stops
beating both halves, the eval says so.

Results are broken down by **style** — how far the question's wording drifts
from the rulebook's (`verbatim`, `paraphrase`, `colloquial`, `keyword`) — and by
**topic**. Style is where the two indexes disagree: lexical search wins when
players use the rulebook's own words, semantic search when they don't.

Above the metrics the report prints **index health**: embeddings that predate
the current rulebook, chunk offsets that no longer reach the end of the file,
chunks starting mid-word. Retrieval cannot outperform its index, and these
faults are invisible in the scores alone.

## Where the three sets stand

Top 5 chunks, `hit@1` / `hit@5` / MRR:

| set | hybrid | vector | bm25 |
| --- | --- | --- | --- |
| Wingspan (44 cases) | **64% / 95% / 0.77** | 48% / 93% / 0.66 | 52% / 98% / 0.68 |
| Wingspan Asia (30 cases) | 43% / 87% / 0.59 | 30% / 80% / 0.48 | **50% / 80% / 0.61** |
| Root (50 cases) | **48% / 88% / 0.64** | 44% / 88% / 0.61 | 30% / 62% / 0.42 |

**Which index earns its keep depends on the corpus, and the ordering reverses.**
On Root's 113 chunks BM25 collapses (30% hit@1, 62% hit@5) because the
vocabulary of any single rule — *clearing*, *warrior*, *card* — recurs across the
whole book, leaving IDF nothing to work with; the vector index carries the set
almost single-handed. On Wingspan Asia the reverse holds: BM25 leads on hit@1
and the vector index is the weakest of the three. Wingspan alone would have
suggested the two halves contribute roughly equally, which is true of no other
set here.

Fusion is never the worst option and is the best on two of three sets, so it
earns its place — but on Asia it costs 7 points of hit@1 against lexical search
alone. Tuning that helps one set can quietly cost another; run all three.

**Weak spots, by set.** Wingspan: bird powers (17% hit@1) — the rulebook
identifies them by colour, so "the white power" competes with every mention of
brown and pink on the same page. Asia: mode seams (Flock 25% hit@1) — the misses
are precisely the questions naming a mode, where retrieval finds the topic and
not the mode. Root: the parallel faction sections, exactly as designed —
"What does the Marquise do during Birdsong?" returns a faction Reach table, and
the Alliance equivalent returns the Alliance *overview* rather than its Birdsong
section.

Root also exposes an index defect the other sets don't: 60 of its 113 chunks
start mid-word, and its table of contents is a retrieval magnet, ranking first
for several unrelated questions because it contains every rule name in the book.

**The RRF constant is not the lever.** Sweeping it from 1 to 120 moves MRR
between 0.74 and 0.78 — a one-case spread on a 44-case set — and the five
questions where BM25 ranks the answer first but fusion demotes it to second
stay demoted at every value. The two indexes genuinely disagree about which
chunk leads; no fusion constant reconciles that. Leave `RRF_K` at 60 and spend
the effort on what the indexes are ranking instead. (Measured on Wingspan
before the other two sets existed; worth re-running per set if fusion weights
are ever revisited.)

Index health is currently failing on all three sets: Wingspan and Root hold
chunk counts that no longer match what the rulebook splits into, and Wingspan
Asia's offsets stop 624 characters short of its file. Regenerating
(`npm run embeddings -- <code> --force`) resyncs the data; the underlying cause
is that `splitText` returns offsets into whitespace-collapsed text while
`app/lib/actions.ts` slices the raw file with them.

## Adding cases

Add to an existing set, or create a new one and register it in `sets.ts`.

Quote gold passages from the rulebook and keep them tight — the shortest span
that actually states the rule — so a case fails when retrieval lands merely
*near* the answer. Whitespace is matched loosely and markdown emphasis, bullets
and list numbering are ignored, so a quote can be written as plain prose and may
span line breaks. Everything else must appear verbatim: the harness refuses to
run when a quote can't be located, which is what stops the set from rotting when
a rulebook is re-imported.

Multiple gold passages are **alternatives**, not a checklist. Use them when a
rulebook states the same rule in two places, or when either of two passages
genuinely answers the question.

Avoid rules a rulebook repeats verbatim across sections — Root states the same
Evening draw-and-discard step in five faction chapters, so any copy would be a
correct answer and the case measures nothing. Prefer the passages that only one
section can answer; those are where retrieval actually has to choose.

## Query embeddings

`query-embeddings.json` caches one vector per question, keyed by a hash of the
question text, so reruns cost nothing and reproduce exactly. Editing a question
re-embeds that question only; `--offline` refuses to reach the network at all
and is how the eval runs without an API key.

`__tests__/sets.test.ts` runs the parts that need no embeddings — gold
passages still resolving, and a floor under lexical retrieval — as part of
`npm test`.
