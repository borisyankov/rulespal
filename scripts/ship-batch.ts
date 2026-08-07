#!/usr/bin/env npx tsx
/**
 * Ship scraped rulebooks into the app, end to end, with no model in the loop.
 *
 * The `scrape-1j1ju-rules` -> `transcribe-pdfs` -> `text-to-markdown` pipeline
 * leaves a pile of structurally-converted rulebooks in `rulebooks/markdown/`.
 * This script turns those into the four artifacts `add-game` requires:
 *
 *   data/rulebooks/<code>-rulebook.md        normalized to the house format
 *   public/thumbs/<code>.jpg                 500px cover off api.geekdo.com
 *   public/embeddings/<code>-embeddings.json 512-dim chunks
 *   data/games.ts                            entry, inserted alphabetically
 *
 * ...and commits one game per commit, exactly as the manual flow does.
 *
 * A game only ships if its 1j1ju title resolves to exactly ONE BoardGameGeek
 * id. Anything ambiguous, unmatched or suspiciously short is written to
 * `rulebooks/triage.tsv` instead of being guessed at — that file is the only
 * thing a human (or a model) needs to look at.
 *
 * Usage:
 *   npm run ship -- --dry-run                  resolve + report, touch nothing
 *   npm run ship -- --limit 200                ship the 200 best-ranked ready games
 *   npm run ship -- --limit 200 --max-rank 5000
 *   npm run ship -- --no-commit                build artifacts, leave git alone
 *
 * Options:
 *   --limit <n>         Ship at most N games (default: all resolvable)
 *   --max-rank <n>      Skip games ranked worse than N (default: no cap)
 *   --min-chars <n>     Skip markdown shorter than this (default: 3000)
 *   --concurrency <n>   Parallel per-game content work (default: 8)
 *   --csv <path>        BGG ranking CSV; downloaded to the scratch dir if absent
 *   --dry-run           Resolve and report only
 *   --no-commit         Build artifacts but run no git commands
 *   --force             Rebuild artifacts that already exist
 */

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import OpenAI from 'openai';
import sharp from 'sharp';
import { splitText } from '../app/lib/rag';
import type { Game } from '@/app/lib/definitions';

const exec = promisify(execFile);
const projectRoot = path.resolve(__dirname, '..');

const paths = {
  jsonl: `${projectRoot}/rulebooks/rulebooks.jsonl`,
  markdown: `${projectRoot}/rulebooks/markdown`,
  triage: `${projectRoot}/rulebooks/triage.tsv`,
  gamesFile: `${projectRoot}/data/games.ts`,
  rulebooks: `${projectRoot}/data/rulebooks`,
  thumbs: `${projectRoot}/public/thumbs`,
  embeddings: `${projectRoot}/public/embeddings`,
};

const USER_AGENT =
  'RulespalBulkShipper/1.0 (+https://rulespal.com; board game rulebook helper)';

// ------------------------------------------------------------------ CLI

type Options = {
  limit: number;
  maxRank: number;
  minChars: number;
  concurrency: number;
  csv: string | null;
  dryRun: boolean;
  commit: boolean;
  force: boolean;
};

function parseArgs(argv: string[]): Options {
  const opts: Options = {
    limit: Infinity,
    maxRank: Infinity,
    minChars: 3000,
    concurrency: Math.min(8, Math.max(2, os.cpus().length - 2)),
    csv: null,
    dryRun: false,
    commit: true,
    force: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const value = () => {
      const v = argv[++i];
      if (v === undefined) throw new Error(`Missing value for ${arg}`);
      return v;
    };
    switch (arg) {
      case '--limit': opts.limit = Number(value()); break;
      case '--max-rank': opts.maxRank = Number(value()); break;
      case '--min-chars': opts.minChars = Number(value()); break;
      case '--concurrency': opts.concurrency = Number(value()); break;
      case '--csv': opts.csv = value(); break;
      case '--dry-run': opts.dryRun = true; break;
      case '--no-commit': opts.commit = false; break;
      case '--force': opts.force = true; break;
      default: throw new Error(`Unknown option: ${arg}`);
    }
  }
  return opts;
}

// ------------------------------------------------------- names and slugs

/**
 * Fold a title to a comparison key. Titles reach us from two independent
 * sources (1j1ju's own page titles and BGG's CSV) that disagree on accents,
 * ampersands and punctuation, so both sides get folded before matching.
 */
function normalizeTitle(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    // Intra-word punctuation is dropped, not hyphenated, so the catalog keeps
    // saying `exit-the-pharaohs-tomb` rather than `...pharaoh-s-tomb`.
    .replace(/['’ʼ`.!?]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** `name` may carry accents the search box can't produce; give it an ASCII twin. */
function asciiVariant(name: string): string | null {
  const ascii = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\x20-\x7e]/g, '');
  return ascii && ascii !== name ? ascii : null;
}

/**
 * Quote a string the way prettier would under `singleQuote: true`: single
 * quotes normally, double quotes when that avoids escaping an apostrophe.
 * `data/games.ts` contains both forms, so anything reading it back has to
 * accept both (see `entryName`).
 */
function tsQuote(value: string): string {
  const escaped = value.replace(/\\/g, '\\\\');
  if (escaped.includes("'") && !escaped.includes('"')) return `"${escaped}"`;
  return `'${escaped.replace(/'/g, "\\'")}'`;
}

// ------------------------------------------------------------ BGG ranking CSV

type CsvRow = { bggid: string; name: string; year: string; rank: number; users: number };

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else current += ch;
  }
  fields.push(current);
  return fields;
}

async function loadRankingCsv(explicitPath: string | null): Promise<string> {
  if (explicitPath) return fsp.readFile(explicitPath, 'utf-8');

  // The mirror publishes one file per day and today's may not exist yet, so
  // walk back a few days rather than failing on a timezone edge.
  const cacheDir = `${projectRoot}/rulebooks/.cache`;
  await fsp.mkdir(cacheDir, { recursive: true });
  for (let daysAgo = 0; daysAgo < 5; daysAgo++) {
    const day = new Date(Date.now() - daysAgo * 86_400_000)
      .toISOString()
      .slice(0, 10);
    const cached = `${cacheDir}/bgg-${day}.csv`;
    if (fs.existsSync(cached)) return fsp.readFile(cached, 'utf-8');

    const url = `https://raw.githubusercontent.com/beefsack/bgg-ranking-historicals/master/${day}.csv`;
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!response.ok) continue;
    const body = await response.text();
    await fsp.writeFile(cached, body, 'utf-8');
    console.log(`Ranking CSV: ${day} (${body.split('\n').length - 1} rows)`);
    return body;
  }
  throw new Error('Could not fetch a BGG ranking CSV from the last 5 days');
}

/**
 * Index the CSV by folded title. A title shared by several ids (reprints under
 * one name, unrelated games that collide once folded) is recorded as ambiguous
 * and never auto-resolved — picking one would silently attach a rulebook to the
 * wrong game, which is the one failure this whole pipeline must not produce.
 */
function indexByTitle(csv: string) {
  const byTitle = new Map<string, CsvRow>();
  const ambiguous = new Set<string>();

  for (const line of csv.split('\n').slice(1)) {
    if (!line.trim()) continue;
    const [bggid, name, year, rank, , , users] = parseCsvLine(line);
    const key = normalizeTitle(name);
    if (!key) continue;
    const existing = byTitle.get(key);
    if (existing) {
      if (existing.bggid !== bggid) ambiguous.add(key);
      continue;
    }
    byTitle.set(key, { bggid, name, year, rank: Number(rank), users: Number(users) });
  }
  for (const key of ambiguous) byTitle.delete(key);
  return { byTitle, ambiguous };
}

// ------------------------------------------------------------ catalog state

/** Read `data/games.ts` fresh: another session may be editing it concurrently. */
function readCatalog(): { text: string; entries: string[]; header: string; footer: string } {
  const text = fs.readFileSync(paths.gamesFile, 'utf-8');
  const open = text.indexOf('const assets: Game[] = [\n');
  if (open === -1) throw new Error('Could not find the assets array in data/games.ts');
  const bodyStart = open + 'const assets: Game[] = [\n'.length;
  const bodyEnd = text.indexOf('\n];', bodyStart);
  if (bodyEnd === -1) throw new Error('Could not find the end of the assets array');

  const body = text.slice(bodyStart, bodyEnd);
  // Entries are uniform two-space-indented object literals, one per game.
  const entries = body.split(/\n(?=  \{\n)/).filter((entry) => entry.trim());
  return {
    text,
    entries,
    header: text.slice(0, bodyStart),
    footer: text.slice(bodyEnd),
  };
}

function entryName(entry: string): string {
  const match = entry.match(/\n    name: (?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/);
  if (!match) return '';
  const raw = match[1] ?? match[2];
  return raw.replace(/\\(['"\\])/g, '$1');
}

function catalogIndex() {
  const { entries } = readCatalog();
  const bggids = new Set<string>();
  const codes = new Set<string>();
  for (const entry of entries) {
    const id = entry.match(/bggid: (\d+)/);
    const code = entry.match(/\n    code: '([^']*)'/);
    if (id) bggids.add(id[1]);
    if (code) codes.add(code[1]);
  }
  return { bggids, codes };
}

/** Insert one entry, keeping the array alphabetical by name (case-insensitive). */
function insertIntoCatalog(game: Game): void {
  const { entries, header, footer } = readCatalog();

  const fields = [`    bggid: ${game.bggid},`, `    name: ${tsQuote(game.name)},`];
  if (game.shortName) fields.push(`    shortName: ${tsQuote(game.shortName)},`);
  fields.push(`    code: ${tsQuote(game.code)},`);
  if (game.alternativeNames?.length) {
    fields.push(
      `    alternativeNames: [${game.alternativeNames.map(tsQuote).join(', ')}],`,
    );
  }
  const block = `  {\n${fields.join('\n')}\n  },`;

  const collator = new Intl.Collator('en', { sensitivity: 'base' });
  let at = entries.findIndex((entry) => collator.compare(entryName(entry), game.name) > 0);
  if (at === -1) at = entries.length;
  entries.splice(at, 0, block);

  fs.writeFileSync(paths.gamesFile, header + entries.join('\n') + footer, 'utf-8');
}

// ------------------------------------------------- markdown normalization

/**
 * Rewrite a mechanically-converted rulebook into the house format:
 * an `# <Name> Rulebook` title, the intro prose under `## Table of Contents`
 * (which `app/lib/remark-toc-collapse.ts` turns into the collapsible block),
 * and body headings shifted so the top section level is `##`.
 *
 * Wording is never touched — this moves and re-levels, it does not rewrite.
 */
function normalizeRulebook(source: string, displayName: string): string {
  let body = source.replace(/^---\n[\s\S]*?\n---\n/, '').trim();

  // Drop the converter's own H1; the title is re-emitted from the BGG name.
  body = body.replace(/^#\s+[^\n]*\n+/, '');

  const lines = body.split('\n');
  const headings: { index: number; level: number }[] = [];
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*(```|~~~)/.test(lines[i])) { inFence = !inFence; continue; }
    if (inFence) continue;
    const match = lines[i].match(/^(#{1,6})\s+\S/);
    if (match) headings.push({ index: i, level: match[1].length });
  }

  // Prose ahead of the first heading is the game's intro — the TOC block's
  // established contents. If there is none, emit no TOC rather than an empty one.
  const firstHeading = headings.length ? headings[0].index : lines.length;
  const intro = lines.slice(0, firstHeading).join('\n').trim();
  const rest = lines.slice(firstHeading);

  const minLevel = headings.length ? Math.min(...headings.map((h) => h.level)) : 2;
  const shift = 2 - minLevel;
  if (shift !== 0) {
    inFence = false;
    for (let i = 0; i < rest.length; i++) {
      if (/^\s*(```|~~~)/.test(rest[i])) { inFence = !inFence; continue; }
      if (inFence) continue;
      rest[i] = rest[i].replace(/^(#{1,6})(\s+\S)/, (_, hashes: string, tail: string) => {
        const level = Math.min(6, Math.max(2, hashes.length + shift));
        return '#'.repeat(level) + tail;
      });
    }
  }

  const out = [`# ${displayName} Rulebook`, ''];
  if (intro) out.push('## Table of Contents', '', intro, '');
  out.push(rest.join('\n').trim(), '');
  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

// ------------------------------------------------------------- BGG artifacts

async function fetchRetrying(url: string, tries = 4): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt < tries; attempt++) {
    try {
      const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
      if (response.status === 429 || response.status >= 500) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return response;
    } catch (error) {
      lastError = error;
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
  throw new Error(`${url}: ${(lastError as Error).message}`);
}

type GeekItem = { name: string; year: string; coverUrl: string | null };

/**
 * `api.geekdo.com` stays reachable when the XML API 401s and boardgamegeek.com
 * is Cloudflare-blocked, which is why `scripts/thumbs.ts`'s route is unusable at
 * this volume. `images.original` is the full-resolution cover (~830px);
 * `imageurl@2x` is a 492x600 fallback. Both are pre-signed — the sizes in a
 * thumbor URL cannot be rewritten by hand.
 */
async function fetchGeekItem(bggid: string): Promise<GeekItem> {
  const response = await fetchRetrying(
    `https://api.geekdo.com/api/geekitems?objectid=${bggid}&objecttype=thing`,
  );
  const item = ((await response.json()) as any)?.item ?? {};
  return {
    name: item.name ?? '',
    year: String(item.yearpublished ?? ''),
    coverUrl: item.images?.original ?? item['imageurl@2x'] ?? item.imageurl ?? null,
  };
}

async function writeThumbnail(coverUrl: string, code: string): Promise<void> {
  const response = await fetchRetrying(coverUrl);
  const source = Buffer.from(await response.arrayBuffer());
  await sharp(source).resize(500).jpeg().toFile(`${paths.thumbs}/${code}.jpg`);
}

const openai = new OpenAI();

async function writeEmbeddings(code: string): Promise<number> {
  const doc = await fsp.readFile(`${paths.rulebooks}/${code}-rulebook.md`, 'utf-8');
  const chunks = splitText(doc, 1000, 100);

  // One request per game keeps a failure attributable to a game, but unlike
  // `scripts/embeddings.ts` the games themselves run concurrently.
  const response = await openai.embeddings.create({
    input: chunks.map((chunk) => chunk.text),
    model: 'text-embedding-3-large',
    dimensions: 512,
  });
  const payload = chunks.map((chunk, index) => ({
    start: chunk.offset,
    length: chunk.text.length,
    embedding: response.data[index].embedding,
  }));
  await fsp.writeFile(
    `${paths.embeddings}/${code}-embeddings.json`,
    JSON.stringify(payload, null, 2),
    'utf-8',
  );
  return chunks.length;
}

// ------------------------------------------------------------- resolution

type Candidate = {
  bggid: string;
  name: string;
  year: string;
  rank: number;
  code: string;
  markdownFile: string;
  chars: number;
};

type Rejection = { title: string; file: string; reason: string };

async function resolveCandidates(opts: Options) {
  const { byTitle, ambiguous } = indexByTitle(await loadRankingCsv(opts.csv));
  const markdownFiles = new Set(await fsp.readdir(paths.markdown));
  const { bggids: haveIds, codes: haveCodes } = catalogIndex();

  const rows = (await fsp.readFile(paths.jsonl, 'utf-8'))
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line) as { name: string; file: string });

  const rejections: Rejection[] = [];
  // Several 1j1ju PDFs can share one game (base book, appendix, player aid).
  // Keep the largest as the rulebook; the rest are reported, never guessed at.
  const best = new Map<string, Candidate>();

  for (const row of rows) {
    const file = row.file.replace(/\.pdf$/, '.md');
    if (!markdownFiles.has(file)) continue;

    const key = normalizeTitle(row.name);
    const hit = byTitle.get(key);
    if (!hit) {
      rejections.push({
        title: row.name,
        file,
        reason: ambiguous.has(key) ? 'ambiguous-title' : 'no-bgg-match',
      });
      continue;
    }
    if (haveIds.has(hit.bggid)) continue;
    if (hit.rank > opts.maxRank) continue;

    const { size } = await fsp.stat(`${paths.markdown}/${file}`);
    if (size < opts.minChars) {
      rejections.push({ title: row.name, file, reason: `too-short-${size}b` });
      continue;
    }

    const previous = best.get(hit.bggid);
    if (previous) {
      const loser = previous.chars >= size ? { file, chars: size } : previous;
      rejections.push({ title: hit.name, file: loser.file, reason: 'extra-document' });
      if (previous.chars >= size) continue;
    }
    best.set(hit.bggid, {
      bggid: hit.bggid,
      name: hit.name,
      year: hit.year,
      rank: hit.rank,
      code: slugify(hit.name),
      markdownFile: file,
      chars: size,
    });
  }

  // A slug can collide with a game already catalogued under a different id
  // (editions, same-named reprints); disambiguate with the year rather than
  // overwriting another game's rulebook.
  const claimed = new Set(haveCodes);
  const candidates = [...best.values()].sort((a, b) => a.rank - b.rank);
  for (const candidate of candidates) {
    if (claimed.has(candidate.code)) candidate.code = `${candidate.code}-${candidate.year}`;
    claimed.add(candidate.code);
  }

  return { candidates, rejections };
}

// ------------------------------------------------------------------ pool

async function mapPool<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const index = cursor++;
        results[index] = await worker(items[index], index);
      }
    }),
  );
  return results;
}

// ------------------------------------------------------------------- main

type Built =
  | { ok: true; candidate: Candidate; game: Game; chunks: number }
  | { ok: false; candidate: Candidate; reason: string };

/** Everything a game needs that touches no shared state — safe to parallelize. */
async function buildGame(candidate: Candidate, opts: Options): Promise<Built> {
  const { code } = candidate;
  try {
    const item = await fetchGeekItem(candidate.bggid);

    // The CSV and geekitems are independent views of the same id; if they
    // disagree on the title the join is not trustworthy enough to ship.
    if (item.name && normalizeTitle(item.name) !== normalizeTitle(candidate.name)) {
      return {
        ok: false,
        candidate,
        reason: `name mismatch: csv "${candidate.name}" vs bgg "${item.name}"`,
      };
    }
    const name = item.name || candidate.name;

    const rulebookPath = `${paths.rulebooks}/${code}-rulebook.md`;
    if (opts.force || !fs.existsSync(rulebookPath)) {
      const raw = await fsp.readFile(`${paths.markdown}/${candidate.markdownFile}`, 'utf-8');
      await fsp.writeFile(rulebookPath, normalizeRulebook(raw, name), 'utf-8');
    }

    const thumbPath = `${paths.thumbs}/${code}.jpg`;
    if (opts.force || !fs.existsSync(thumbPath)) {
      if (!item.coverUrl) return { ok: false, candidate, reason: 'no cover image on BGG' };
      await writeThumbnail(item.coverUrl, code);
    }

    let chunks = 0;
    const embeddingsPath = `${paths.embeddings}/${code}-embeddings.json`;
    if (opts.force || !fs.existsSync(embeddingsPath)) {
      chunks = await writeEmbeddings(code);
    }

    const alternativeNames = [asciiVariant(name)].filter(Boolean) as string[];
    const game: Game = {
      bggid: Number(candidate.bggid),
      name,
      code,
      ...(name.length > 40 ? { shortName: name.split(/[:–—]/)[0].trim() } : {}),
      ...(alternativeNames.length ? { alternativeNames } : {}),
    };
    return { ok: true, candidate, game, chunks };
  } catch (error) {
    return { ok: false, candidate, reason: (error as Error).message };
  }
}

/** Catalog + git are shared mutable state — this half stays strictly serial. */
async function integrate(built: Built, opts: Options): Promise<boolean> {
  if (!built.ok) return false;
  const { game } = built;

  if (catalogIndex().bggids.has(String(game.bggid))) return false; // landed elsewhere
  insertIntoCatalog(game);

  if (!opts.commit) return true;
  await exec('git', [
    '-C', projectRoot, 'add',
    'data/games.ts',
    `data/rulebooks/${game.code}-rulebook.md`,
    `public/embeddings/${game.code}-embeddings.json`,
    `public/thumbs/${game.code}.jpg`,
  ]);
  await exec('git', ['-C', projectRoot, 'commit', '-m', `Add ${game.name}`]);
  return true;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  for (const dir of [paths.rulebooks, paths.thumbs, paths.embeddings]) {
    await fsp.mkdir(dir, { recursive: true });
  }

  const { candidates, rejections } = await resolveCandidates(opts);
  const selected = candidates.slice(0, opts.limit);

  await fsp.writeFile(
    paths.triage,
    ['title\tfile\treason', ...rejections.map((r) => `${r.title}\t${r.file}\t${r.reason}`)]
      .join('\n') + '\n',
    'utf-8',
  );

  console.log(`Resolvable and fresh : ${candidates.length}`);
  console.log(`Selected this run    : ${selected.length}`);
  console.log(`Needs triage         : ${rejections.length} -> rulebooks/triage.tsv`);

  if (opts.dryRun) {
    for (const c of selected.slice(0, 20)) {
      console.log(`  #${c.rank} ${c.name} (${c.bggid}) -> ${c.code}`);
    }
    if (selected.length > 20) console.log(`  ... and ${selected.length - 20} more`);
    return;
  }

  // Content in parallel, integration serial — the same split the manual batch
  // flow uses, minus the model. Integration runs as builds land, so git is
  // never the bottleneck.
  const queue: Built[] = [];
  let done = 0;
  const added: string[] = [];
  const failed: { name: string; reason: string }[] = [];

  let draining = Promise.resolve();
  const drain = () => {
    draining = draining.then(async () => {
      while (queue.length) {
        const built = queue.shift()!;
        if (!built.ok) {
          failed.push({ name: built.candidate.name, reason: built.reason });
          continue;
        }
        try {
          if (await integrate(built, opts)) added.push(built.game.name);
        } catch (error) {
          failed.push({ name: built.game.name, reason: (error as Error).message });
        }
      }
    });
    return draining;
  };

  await mapPool(selected, opts.concurrency, async (candidate) => {
    const built = await buildGame(candidate, opts);
    queue.push(built);
    done++;
    if (done % 25 === 0) console.log(`  built ${done}/${selected.length}`);
    await drain();
  });
  await draining;

  console.log(`\nAdded ${added.length}, failed ${failed.length}.`);
  for (const { name, reason } of failed.slice(0, 30)) console.log(`  - ${name}: ${reason}`);
  if (failed.length > 30) console.log(`  ... and ${failed.length - 30} more`);
  if (failed.length) process.exitCode = 1;
}

// Exported so the pure helpers can be exercised directly; `main` only runs when
// this file is the entry point.
export { normalizeTitle, slugify, entryName, readCatalog, normalizeRulebook };

if (require.main === module) main();
