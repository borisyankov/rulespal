// Shape of a rules-search evaluation set.
//
// A case pairs a question a player might ask with the passage(s) of the
// rulebook that answer it. Retrieval is scored on whether those passages end
// up in the excerpt handed to the model — not on the model's prose, which is
// a separate concern.

// How the question is worded relative to the rulebook. Reported separately
// because the two indexes have opposite strengths: BM25 thrives on wording
// lifted from the text, vectors on wording that isn't in it at all.
export type QuestionStyle =
  // Uses the rulebook's own terms ("brown power", "action cube").
  | 'verbatim'
  // Same concept, different words ("the little wooden markers").
  | 'paraphrase'
  // How a player actually talks mid-game ("can I stack eggs on one bird?").
  | 'colloquial'
  // Bare keywords, no sentence — what people type into a search box.
  | 'keyword';

export type EvalCase = {
  id: string;
  question: string;
  style: QuestionStyle;
  // Free-form grouping for the by-topic breakdown.
  topic: string;
  // Passages that answer the question, quoted from the rulebook.
  //
  // They are *alternatives*: a case counts as answered when any one of them
  // lands in the retrieved context. This covers rulebooks that state the same
  // rule twice (Wingspan lists the round-end steps in two places) and keeps
  // the metric from punishing retrieval for picking the other copy.
  //
  // Whitespace is matched loosely, so a quote may span line breaks, and
  // typographic quotes/dashes match their ASCII forms. Everything else must
  // appear verbatim — the harness fails loudly if a quote can't be located, so
  // the set can't silently rot when a rulebook is re-imported.
  gold: string[];
};

export type EvalSet = {
  // Rulebook/embeddings code, as in data/games.ts.
  code: string;
  name: string;
  cases: EvalCase[];
};
