import { createEmbedder, EMBEDDING_DIMENSIONS } from './embedder';
import {
  aggregate,
  cutoffsFor,
  indexHealth,
  loadCorpus,
  MIN_COVERAGE,
  runVariant,
  VARIANTS,
  type CaseResult,
  type Metrics,
} from './harness';
import { RRF_K } from '../../app/lib/retriever';
import type { EvalSet } from './dataset';
import SETS from './sets';

// Usage:
//   npm run eval:search                    every set, every variant
//   npm run eval:search -- --k 3           retrieve 3 chunks instead of 5
//   npm run eval:search -- --variant bm25  one variant
//   npm run eval:search -- --offline       cached query embeddings only, no API
//   npm run eval:search -- --verbose       per-case table
//   npm run eval:search -- --json          machine-readable output
//   npm run eval:search -- --fail-under 0.9  exit 1 if hybrid hit@k drops below
//   npm run eval:search -- --sweep-rrf 1,10,60  score fusion at each RRF constant

function parseArgs(argv: string[]) {
  const value = (flag: string) => {
    const i = argv.indexOf(flag);
    return i === -1 ? undefined : argv[i + 1];
  };
  return {
    k: Number(value('--k') ?? 5),
    variant: value('--variant'),
    failUnder: value('--fail-under') ? Number(value('--fail-under')) : undefined,
    sweepRrf: value('--sweep-rrf')?.split(',').map(Number),
    offline: argv.includes('--offline'),
    verbose: argv.includes('--verbose'),
    json: argv.includes('--json'),
  };
}

const pct = (value: number) => `${(value * 100).toFixed(0)}%`;

function table(rows: string[][]): string {
  const widths = rows[0].map((_, column) =>
    Math.max(...rows.map((row) => row[column].length)),
  );
  return rows
    .map((row) =>
      row
        .map((cell, column) =>
          column === 0 ? cell.padEnd(widths[column]) : cell.padStart(widths[column]),
        )
        .join('  '),
    )
    .join('\n');
}

function metricsRow(
  label: string,
  metrics: Metrics,
  cutoffs: number[],
): string[] {
  return [
    label,
    String(metrics.cases),
    ...cutoffs.map((cutoff) => pct(metrics.hitAt[cutoff])),
    metrics.mrr.toFixed(2),
    pct(metrics.coverage),
  ];
}

function header(cutoffs: number[]): string[] {
  return [
    '',
    'cases',
    ...cutoffs.map((cutoff) => `hit@${cutoff}`),
    'MRR',
    'coverage',
  ];
}

// Grouped case results, ordered by group name.
function groupBy(
  results: CaseResult[],
  key: (result: CaseResult) => string,
): [string, CaseResult[]][] {
  const groups: Record<string, CaseResult[]> = {};
  for (const result of results) {
    (groups[key(result)] ??= []).push(result);
  }
  return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
}

function excerpt(text: string, length = 64): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  return flat.length > length ? `${flat.slice(0, length)}…` : flat;
}

function reportHealth(set: EvalSet, corpus: ReturnType<typeof loadCorpus>) {
  const health = indexHealth(corpus);
  const drift = health.rulebookLength - health.indexedLength;
  const lines = [
    `${health.storedChunks} chunks · ${health.rulebookLength} characters of rulebook`,
  ];
  if (health.storedChunks !== health.currentChunks) {
    lines.push(
      `  ! embeddings hold ${health.storedChunks} chunks but the rulebook now splits into ${health.currentChunks} — regenerate: npm run embeddings -- ${set.code} --force`,
    );
  }
  if (drift > 0) {
    lines.push(
      `  ! chunk offsets stop ${drift} characters short of the file, so text served from the tail is offset from the vector that matched it`,
    );
  }
  if (health.chunksStartingMidWord > 0) {
    lines.push(
      `  ! ${health.chunksStartingMidWord} chunk(s) start mid-word`,
    );
  }
  return lines.join('\n');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const variants = args.variant
    ? VARIANTS.filter((variant) => variant.name === args.variant)
    : VARIANTS;
  if (variants.length === 0) {
    console.error(
      `Unknown variant. Available: ${VARIANTS.map((v) => v.name).join(', ')}`,
    );
    process.exit(1);
  }

  const embedder = createEmbedder(args.offline);
  const cutoffs = cutoffsFor(args.k);
  const json: Record<string, unknown> = {};
  let failed = false;

  for (const set of SETS) {
    const corpus = loadCorpus(set.code);
    const width = corpus.chunks[0]?.embedding.length;
    if (width !== EMBEDDING_DIMENSIONS) {
      throw new Error(
        `${set.code} embeddings are ${width}-dimensional but queries are embedded at ${EMBEDDING_DIMENSIONS}.`,
      );
    }

    // A sweep is a tuning run, not a report: it scores the fusion constant
    // across a range and leaves the choice to whoever reads it.
    if (args.sweepRrf) {
      const hybrid = VARIANTS.find((variant) => variant.name === 'hybrid')!;
      const rows: string[][] = [];
      for (const kRrf of args.sweepRrf) {
        const results = await runVariant(
          hybrid,
          corpus,
          set,
          embedder.embed,
          args.k,
          kRrf,
        );
        rows.push(
          metricsRow(
            `rrf=${kRrf}${kRrf === RRF_K ? ' (current)' : ''}`,
            aggregate(results),
            cutoffs,
          ),
        );
      }
      embedder.save();
      console.log(`\nRRF constant sweep — ${set.name}, top ${args.k} chunks`);
      console.log(table([header(cutoffs), ...rows]));
      continue;
    }

    const runs: { name: string; results: CaseResult[] }[] = [];
    for (const variant of variants) {
      runs.push({
        name: variant.name,
        results: await runVariant(variant, corpus, set, embedder.embed, args.k),
      });
    }
    embedder.save();

    if (args.json) {
      json[set.code] = Object.fromEntries(
        runs.map(({ name, results }) => [
          name,
          {
            ...aggregate(results),
            cases: results.map((result) => ({
              id: result.case.id,
              style: result.case.style,
              topic: result.case.topic,
              rank: result.firstRelevantRank,
              coverage: Number(result.coverage.toFixed(3)),
            })),
          },
        ]),
      );
      continue;
    }

    console.log(`\nRules search — ${set.name} (${set.code})`);
    console.log(`${set.cases.length} questions · top ${args.k} chunks retrieved`);
    console.log(reportHealth(set, corpus));

    console.log('\nA question is answered when the retrieved excerpt carries at');
    console.log(
      `least ${pct(MIN_COVERAGE)} of a passage that states the rule.\n`,
    );
    console.log(
      table([
        header(cutoffs),
        ...runs.map(({ name, results }) =>
          metricsRow(name, aggregate(results), cutoffs),
        ),
      ]),
    );
    for (const variant of variants) {
      console.log(`  ${variant.name}: ${variant.description}`);
    }

    // The remaining breakdowns are about the pipeline the app actually runs.
    const primary = runs.find((run) => run.name === 'hybrid') ?? runs[0];

    for (const [dimension, key] of [
      ['style', (result: CaseResult) => result.case.style],
      ['topic', (result: CaseResult) => result.case.topic],
    ] as const) {
      console.log(`\n${primary.name} by ${dimension}`);
      console.log(
        table([
          header(cutoffs),
          ...groupBy(primary.results, key).map(([name, results]) =>
            metricsRow(name, aggregate(results), cutoffs),
          ),
        ]),
      );
    }

    if (args.verbose) {
      console.log(`\n${primary.name} per case`);
      console.log(
        table([
          ['case', 'rank', 'coverage'],
          ...primary.results.map((result) => [
            result.case.id,
            result.firstRelevantRank ? `#${result.firstRelevantRank}` : '—',
            pct(result.coverage),
          ]),
        ]),
      );
    }

    const misses = primary.results.filter((result) => !result.hitAt[args.k]);
    if (misses.length > 0) {
      console.log(`\nMissed by ${primary.name} (${misses.length}):`);
      for (const miss of misses) {
        console.log(`  ${miss.case.id} [${miss.case.style}] ${pct(miss.coverage)} of the rule retrieved`);
        console.log(`    asked: ${miss.case.question}`);
        console.log(`    wanted: ${excerpt(miss.case.gold[0])}`);
        console.log(`    got #1: ${excerpt(miss.retrieved[0]?.content ?? '')}`);
      }
    }

    if (args.failUnder !== undefined) {
      const hit = aggregate(primary.results).hitAt[args.k];
      if (hit < args.failUnder) {
        console.log(
          `\nFAIL: ${primary.name} hit@${args.k} ${pct(hit)} is below the ${pct(args.failUnder)} threshold.`,
        );
        failed = true;
      }
    }
  }

  if (args.json) {
    console.log(JSON.stringify(json, null, 2));
  } else if (embedder.misses() > 0) {
    console.log(`\nEmbedded ${embedder.misses()} new question(s); cache updated.`);
  }

  if (failed) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
