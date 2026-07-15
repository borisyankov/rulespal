import fetch from 'node-fetch';
import sharp from 'sharp';
import { parseStringPromise } from 'xml2js';
import games from '../data/games';
import type { Game } from '@/app/lib/definitions';
import fs from 'fs';
import path from 'path';

const projectRoot = path.resolve(__dirname, '..');
const thumbsDir = `${projectRoot}/public/thumbs`;
// Drop a source image here as `<code>.png|jpg|jpeg|webp` to bypass the network
// entirely (useful when BGG blocks us). It gets resized like any other source.
const localSrcDir = `${thumbsDir}/_src`;
// Optional `{ "<code>": "https://.../image.jpg" }` map of explicit image URLs,
// used when BGG's API can't be reached for a game.
const overridesFile = `${projectRoot}/scripts/thumb-sources.json`;

// Identify ourselves. BGG's XML API is more likely to block anonymous/botlike
// clients; a descriptive UA (and slow, sequential requests) is the polite path.
const USER_AGENT =
  'RulespalThumbnailFetcher/1.0 (+https://rulespal.com; board game rulebook helper)';

const localSrcExtensions = ['png', 'jpg', 'jpeg', 'webp'];

function loadOverrides(): Record<string, string> {
  try {
    return JSON.parse(fs.readFileSync(overridesFile, 'utf-8'));
  } catch {
    return {};
  }
}

function findLocalSource(code: string): string | null {
  for (const ext of localSrcExtensions) {
    const candidate = `${localSrcDir}/${code}.${ext}`;
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// BGG's XML API answers 202 while it queues a request, and may rate-limit with
// 429/5xx. Retry those with backoff; surface hard failures (401/403/404) as-is.
async function fetchWithRetry(
  url: string,
  { retries = 4, backoffMs = 1500 } = {},
): Promise<Buffer> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (
      response.status === 202 ||
      response.status === 429 ||
      response.status >= 500
    ) {
      if (attempt === retries) {
        throw new Error(`${response.status} after ${retries} retries for ${url}`);
      }
      await sleep(backoffMs * (attempt + 1));
      continue;
    }
    if (!response.ok) {
      const body = (await response.text()).slice(0, 120);
      throw new Error(
        `${response.status} ${response.statusText} for ${url} — ${body}`,
      );
    }
    return Buffer.from(await response.arrayBuffer());
  }
  throw new Error(`Exhausted retries for ${url}`);
}

async function getBggImageUrl(gameId: number): Promise<string> {
  const xml = (
    await fetchWithRetry(`https://boardgamegeek.com/xmlapi2/thing?id=${gameId}`)
  ).toString('utf-8');
  if (!xml.trimStart().startsWith('<')) {
    // e.g. "Unauthorized. See https://boardgamegeek.com/using_the_xml_api"
    throw new Error(`BGG did not return XML: "${xml.slice(0, 120).trim()}"`);
  }
  const result = await parseStringPromise(xml);
  const imageUrl = result?.items?.item?.[0]?.image?.[0];
  if (!imageUrl) throw new Error(`No image in BGG response for game ${gameId}`);
  return imageUrl;
}

async function resizeToThumb(
  source: Buffer,
  outputFilename: string,
): Promise<void> {
  await sharp(source).resize(500).toFile(outputFilename);
}

// Returns 'skipped' | 'created' and throws on failure.
async function processGame(
  game: Game,
  overrides: Record<string, string>,
): Promise<'skipped' | 'created'> {
  const outputFilename = `${thumbsDir}/${game.code}.jpg`;
  if (fs.existsSync(outputFilename)) return 'skipped';

  // 1) A local source image wins — no network needed.
  const localSource = findLocalSource(game.code);
  if (localSource) {
    console.log(`Processing ${game.code} (local source)`);
    await resizeToThumb(fs.readFileSync(localSource), outputFilename);
    return 'created';
  }

  // 2) An explicit override URL, then 3) BGG's API.
  const imageUrl = overrides[game.code] ?? (await getBggImageUrl(game.bggid));
  console.log(`Processing ${game.code} <- ${imageUrl}`);
  await resizeToThumb(await fetchWithRetry(imageUrl), outputFilename);
  return 'created';
}

async function processGames(games: Game[]): Promise<void> {
  const overrides = loadOverrides();
  const created: string[] = [];
  const failed: { code: string; reason: string }[] = [];

  // Sequential + a small delay: overlapping requests make BGG rate-limit harder.
  for (const game of games) {
    try {
      const result = await processGame(game, overrides);
      if (result === 'created') {
        created.push(game.code);
        await sleep(750);
      }
    } catch (error) {
      failed.push({ code: game.code, reason: (error as Error).message });
    }
  }

  console.log(`\nDone. ${created.length} created, ${failed.length} failed.`);
  if (failed.length) {
    console.log(
      `\nCould not fetch thumbnails for the games below. BGG's XML API blocks` +
        ` many networks ("Unauthorized"); when that happens, either add an` +
        ` entry to scripts/thumb-sources.json ({ "<code>": "<image-url>" }) or` +
        ` drop a source image at public/thumbs/_src/<code>.png|jpg|jpeg|webp,` +
        ` then re-run. Missing:`,
    );
    for (const { code, reason } of failed) console.log(`  - ${code}: ${reason}`);
    process.exitCode = 1;
  }
}

processGames(games);
