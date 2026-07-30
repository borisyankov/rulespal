---
name: add-game
description: Add a new board game (rulebook, catalog entry, embeddings, thumbnail) to the Rulespal app. Use when the user asks to "add rules for <game>", "add a new game", or "add <game> to rulespal".
---

# Add a New Game to Rulespal

Adding a game means producing **four artifacts**, all keyed off a single `code` (kebab-case slug):

| Artifact | Path | How |
| --- | --- | --- |
| Rulebook | `data/rulebooks/<code>-rulebook.md` | Transcribe the real rulebook (below) |
| Catalog entry | `data/games.ts` | Add a `Game` object, alphabetically |
| Embeddings | `public/embeddings/<code>-embeddings.json` | `npm run embeddings -- <code>` |
| Thumbnail | `public/thumbs/<code>.jpg` | Manual (BGG API is dead — see step 5) |

All four are required. The app loads the rulebook and embeddings per-game at query time (`app/lib/actions.ts`), so a game missing its embeddings **errors when opened**; a game missing its thumbnail shows a broken image.

## Critical rule: never fabricate rules

The rulebooks in `data/rulebooks/` are **verbatim transcriptions of real published rulebooks**, served to real users as fact. Do not summarize from memory and never invent rules. Source the actual official rulebook. If you cannot obtain it, stop and tell the user rather than making one up.

## Step 1 — Identify the game (get name + BGG id)

Web-search the title. Confirm it's a real game and capture:
- **Exact published name** (users often misspell it — e.g. "Moon Colonies Bloodbath" → real game is "Moon Colony Bloodbath"). Use the correct name; record the user's variant as an `alternativeName`.
- **BGG id** — from the boardgamegeek.com URL, e.g. `boardgamegeek.com/boardgame/425549/...` → `425549`.
- **Official rulebook URL** (publisher site or BGG files page).

Derive `code`: lowercase the (short) name, spaces → `-`, drop punctuation (`:`, `'`, `.`, `!`). Examples: `Moon Colony Bloodbath` → `moon-colony-bloodbath`; `Marco Polo II: In the Service of the Khan` → `marco-polo-ii` (long names get a `shortName`, see step 3).

## Step 2 — Get the real rulebook text

Download the official PDF and extract its text:

```bash
cd <scratchpad>
curl -sL -o rules.pdf "<official-rulebook-url>"
brew install poppler   # if pdftotext/pdftoppm are missing
pdftotext -layout rules.pdf rules.txt && wc -l rules.txt
```

If `rules.txt` is **empty or near-empty**, the PDF is image/vector-based (common for glossy rulebooks). Render pages to images and read them with the Read tool instead:

```bash
pdfinfo rules.pdf | grep Pages
pdftoppm -png -r 150 rules.pdf page   # -> page-01.png, page-02.png, ...
```

Then `Read` each `page-NN.png` and transcribe faithfully.

## Step 3 — Write the rulebook markdown

Create `data/rulebooks/<code>-rulebook.md` following the house format (see `data/rulebooks/azul-rulebook.md` or `dominion-rulebook.md`):

```markdown
# <Exact Name> Rulebook

## Table of Contents

*<intro / flavor / theme paragraph(s), often italic>*

## <Section>
...
```

Format rules:
- First line is `# <Name> Rulebook`.
- **`## Table of Contents` is special.** `app/lib/remark-toc-collapse.ts` wraps everything under this heading (up to the next `##`) in a collapsible `<details>`. The house convention is to put the game's **intro/theme flavor text** here — NOT an actual list of sections. Keep it to the intro blurb.
- Then normal `##`/`###` sections mirroring the manual (Setup, Gameplay/Turns, scoring, end-game, variants, card/component notes, etc.).
- **Render resource icons as words** — the manual uses pictograms; write them out (e.g. people, money, food, boxes, cards). Keep the manual's own terminology.
- Faithful, not abridged. Include component-note / card-note sections if present.

## Step 4 — Add the catalog entry

Insert a `Game` object into the `assets` array in `data/games.ts`, keeping the array **alphabetical by `name` (case-insensitive)**. The `Game` type (`app/lib/definitions.ts`):

```ts
{
  bggid: number;            // required
  name: string;             // required — exact published name
  code: string;             // required — the slug; base name only, NO -rulebook/-embeddings suffix
  shortName?: string;       // use when name is long (see Marco Polo II)
  alternativeNames?: string[]; // spelling variants / the user's misspelling / edition names
  extraSources?: string[];  // extra rulebook files named <code>-<source>.md (e.g. expansions, references)
}
```

Example:

```ts
{
  bggid: 425549,
  name: 'Moon Colony Bloodbath',
  code: 'moon-colony-bloodbath',
  alternativeNames: ['Moon Colonies Bloodbath'],
},
```

## Step 5 — Generate embeddings

```bash
[ -d node_modules ] || npm install   # repo uses legacy-peer-deps via .npmrc
npm run embeddings -- <code>          # just this game, read straight off its rulebook file
```

A bare `npm run embeddings` walks the whole catalog and builds every missing file. Passing one or more codes is the targeted form — it needs no `data/games.ts` entry (it reads `data/rulebooks/<code>-rulebook.md` directly), so you can embed before cataloguing. Add `--force` to regenerate a file that already exists.

Requirements & notes:
- Needs a **funded `OPENAI_API_KEY`** in the environment (`insufficient_quota` = billing problem, ask the user to fix it, then retry).
- Uses `text-embedding-3-large` at **512 dimensions** (`scripts/embeddings.ts`).
- Verify: `node -e "const d=require('./public/embeddings/<code>-embeddings.json'); console.log(d.length, d[0].embedding.length)"` — expect a nonzero chunk count and `512` dims.

## Step 6 — Generate the thumbnail

```bash
npm run thumbs -- <code>   # just this game; bare `npm run thumbs` does the whole catalog
```

`scripts/thumbs.ts` resolves each game's image in this order: a local source file → an override URL → BGG's XML API. The targeted form works before the game is in `data/games.ts`, as long as a `_src` image or an override URL exists (with no catalog entry there is no `bggid` to look up). It fails per-game (never crashes the batch) and prints a summary of any it couldn't fetch.

**BGG's XML API is often unreachable** — it returns `Unauthorized` from many networks (notably datacenter/CI IPs; it may still work from a home connection). When a game lands in the failure summary, supply the image yourself, then re-run `npm run thumbs`:

- **Local file (simplest):** drop a source image at `public/thumbs/_src/<code>.png|jpg|jpeg|webp`. (`_src/` is gitignored — it's an input, not an artifact.) Find the box image via a CDN mirror: retailer pages (Board Game Bliss / GameNerdz Shopify/BigCommerce CDNs) and the publisher's `wp-content/uploads` assets are usually reachable with `WebFetch` even when the BGG/retailer HTML page 403s to curl. A BGG main image (filename `picNNNNNNN.png`) or flat cover is ideal; an official 3D box render is acceptable.
- **Override URL:** add `{ "<code>": "https://.../image.(png|jpg)" }` to `scripts/thumb-sources.json`.

Thumbnails come out **500px wide JPEG** (height auto). Transparent PNGs flatten onto black — fine for dark/space art; check the result by `Read`ing the `.jpg` and pick a different source if it looks wrong.

## Step 7 — Commit

Stage exactly the artifacts you created (typically up to 4 files) — **do not commit `package-lock.json`** changes caused by `npm install`:

```bash
git add data/games.ts data/rulebooks/<code>-rulebook.md \
        public/embeddings/<code>-embeddings.json public/thumbs/<code>.jpg
git commit -m "Add <Name>"
```

Follow the repo's branch/PR norms. Only push if the user asks.

## Verification checklist

- [ ] `data/rulebooks/<code>-rulebook.md` exists; starts with `# <Name> Rulebook`; intro under `## Table of Contents`.
- [ ] `data/games.ts` entry added alphabetically with correct `bggid`, `name`, `code`.
- [ ] `public/embeddings/<code>-embeddings.json` exists; nonzero chunks, 512 dims.
- [ ] `public/thumbs/<code>.jpg` exists; 500px wide; looks right (`Read` it).
- [ ] Counts line up: embeddings-file count == games count; thumbs count == games count.
