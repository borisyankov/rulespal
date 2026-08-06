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

**This rule bans *inventing* rules — it does not license giving up.** A skip is a real cost: the game stays out of the app. Finding a rulebook is expected to take **sustained effort across many routes**, and "the publisher's own site doesn't have it" is the beginning of the search, not the end. Work the full toolkit below before concluding anything is unobtainable, and say which routes you actually tried when you report a skip.

**Do not conclude "no rulebook exists" from "no *official* rulebook exists."** These are different claims and the second one is much harder to earn. A complete, faithful, third-party rules document — an official-language translation, or a credited community transliteration of the printed manual — is acceptable material when the publisher never released a PDF at all. What is never acceptable is *reconstructing* rules from scattered secondary facts (reviews, forum posts, playthroughs). The test is whether you are transcribing one complete rules document that someone else wrote, or assembling one yourself.

When you do use a non-publisher document, **disclose it in the rulebook's `## Table of Contents` block** in a one-line italic source note naming what the document is and who produced it (see `deep-sea-adventure-rulebook.md` and `crystal-palace-appendix.md` for the established wording).

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

### Sourcing toolkit (work ALL of these before giving up)

**Always check `1jour-1jeu.com` / `cdn.1j1ju.com`.** It is the single highest-yield mirror in this list and has repeatedly carried the only reachable copy of a rulebook — including for titles whose publisher never released a PDF at all. Find the game's page (`1jour-1jeu.com/…/<slug>` via web search, or search the site directly), then take the PDF off `cdn.1j1ju.com/medias/<a>/<b>/<c>-<slug>-rulebook.pdf`. Caveats learned the hard way:

- **1j1ju rewrites PDF metadata to its own name**, so `pdfinfo` Author/Producer will say `1jour-1jeu.com` regardless of who actually wrote the document. **Read the extracted text's footer/credits line** to find the real attribution before recording provenance.
- **It hosts community documents as well as official ones.** Both are usable (see the critical-rule section above), but you must say which one you got.
- It has occasionally served a **partial** document — byte-check against BGG's `api/files` size when the mirror isn't the publisher.

Then work the rest. Exhaust them; a single 404 on the publisher's site proves nothing:

- `api.geekdo.com` is reachable even when boardgamegeek.com HTML is Cloudflare-blocked and BGG's XML API 401s. Metadata: `api/geekitems?objectid=<id>`. Files list (paginated, newest-first): `api/files?objectid=<id>&objecttype=thing&pageid=<n>` — page deeper if page 1 has nothing official. Images: `api/images?objectid=<id>&objecttype=thing` (use the signed thumbor URL from the response; the bare `cf.geekdo-images.com/…/__original/…` form often 400s).
- Publisher CDNs frequently survive after the parent site is redesigned or shut down — e.g. `images-cdn.fantasyflightgames.com/filer_public/...` (FFG), `cdn0/cdn1.daysofwonder.com/<game>/en/img/...` (Days of Wonder), `cmon.com/wp-content/uploads/...` (CMON), `gmtwebsiteassets.s3.us-west-2.amazonaws.com/<slug>/...` (GMT). Try the direct URL (found via web search or the current product page) before reaching for Wayback.
- Wayback Machine: use a **direct replay URL** `https://web.archive.org/web/<year>id_/<url>` rather than the availability/CDX APIs, which frequently 429/503. CDX-scan a publisher's old domain (`cdx?url=<domain>*&filter=mimetype:application/pdf`) when the live site has nothing.
- `r.jina.ai/<url>` renders Cloudflare- or JS-gated pages as plain text and exposes real PDF links buried in client-rendered HTML.
- Tabletop Simulator Steam Workshop mods often embed the official rulebook PDF in their save file (common for Kickstarter-funded games). Find the Workshop item id, `POST api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/` with body `itemcount=1&publishedfileids[0]=<id>`, download the save from the returned `file_url`, and grep it for a PDF URL.
- `api.tesera.ru/games/<slug>/files` → `tesera.ru/images/items/<id>/<filename>` — a Russian-community mirror that has repeatedly had byte-exact official scans for Oink Games and OOP/small-press titles other routes couldn't reach.
- Google Drive folders (common for small/indie publishers): scrape the folder page's `_DRIVE_ivd` blob for file ids, then `drive.usercontent.google.com/download?id=<id>&export=download&confirm=t`.
- BGG's own file-download routes are usually dead ends (`/file/download_redirect/<id>` 410s, login-gated file pages, S3 AccessDenied) — don't spend much effort there. `api/files` is still useful for confirming a file exists and its exact byte size, which you can cross-check against whatever mirror you find.
- **Publisher Shopify storefronts**: `cdn.shopify.com/s/files/1/<shop>/files/…` — has served official PDFs for many publishers (HABA USA, Roxley, Tabletop Tycoon, North Star, Academy Games). Check for a Shopify store before assuming a redesigned site lost its files.
- **Tabletopia** hosts publisher-supplied rulebooks: `c.tabletopia.com/games/<slug>/rules/<booklet>/en`. Byte-exact against BGG's listed sizes in testing. Good when the publisher's own site is dead.
- `desktopgames.com.ua/games/<id>/<OFFICIAL_FILENAME>.pdf` — an Eastern-European mirror in the same family as Tesera; has carried official PDFs for unrelated publishers whose sites are dead.
- **Azure/blob and cloud-storage containers**: e.g. `portalgames.blob.core.windows.net/<game>/…` (Portal Games). When a publisher's domain is dead or squatted, look for their asset bucket.
- **Compilation / big-box editions** often carry the same text with a clean text layer when the per-game file is broken, encrypted, or a stale edition (Columbia Games, Queen Games).
- If no English rulebook is reachable anywhere but an official rulebook in another language is, a faithful **translation of that official document** is an acceptable substitute (note the source language in your report) — this is not the same as reconstructing from unrelated secondary sources, which is never acceptable (see "never fabricate rules" above).

### Before you declare a game unobtainable

A skip is only earned once you have checked, and can name: **1jour-1jeu / cdn.1j1ju.com**, `api/files` on BGG (page past page 1), the publisher's live site *and* its CDN/asset bucket *and* its Shopify store, Wayback replay over the publisher's dead paths, Tesera, desktopgames.com.ua, Tabletopia, a TTS Workshop mod, and a non-English official edition you could translate. Also re-fetch anything that looked truncated — a `curl` cut at exactly 1 MiB is a transfer artifact, not a corrupt file.

Two failures that are genuinely unobtainable look like this, for calibration: a rulebook **never released in any digital form and photographed only on one side** (Dixit: Journey), or a title where **every circulating file is a different game's rules** (Love Letter: Batman). "The publisher doesn't post PDFs" is not in that category — Deep Sea Adventure was wrongly skipped on exactly that reasoning and a complete community transliteration existed on 1j1ju the whole time.

### Extracting text from multi-column or image-based PDFs

`pdftotext -layout` interleaves columns and silently corrupts reading order on two-column rulebooks. If a plain dump looks scrambled: reconstruct reading order from `pdftotext -bbox` word boxes — group words into lines by y-coordinate, split fragments on large x-gaps (>~14pt) into columns, then emit column by column. This is more reliable than cropping pages with `pdftoppm -x/-W`, which tends to clip characters at the boundary if the crop width is too narrow.

Always **verify completeness mechanically**: harvest every numbered rule/section identifier from a plain `-layout` dump and assert each one appears somewhere in your markdown. This catches silently-dropped content that a visual skim would miss.

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
