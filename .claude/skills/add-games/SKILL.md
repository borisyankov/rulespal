---
name: add-games
description: Add rules for several top-ranked games at once — pick the best N games not yet in Rulespal, then add each via the add-game skill in its own commit and push. Use when the user asks to "add the top games", "add several games", "batch add games", or "add N new games".
---

# Add Multiple Games to Rulespal

This is the batch wrapper around the single-game [`add-game`](../add-game/SKILL.md) skill. It:

1. Picks the **best N games not yet added** (default N = 10).
2. Fans out **one subagent per game, in parallel**, each producing only that game's rulebook and thumbnail source.
3. Integrates the finished games **serially in the main thread**: embeddings, thumbnails, and **one commit per game** (`Add <Name>`).
4. **Pushes** once at the end.

Read `add-game/SKILL.md` first — every per-game detail (rulebook sourcing, catalog entry, embeddings, thumbnail, the "never fabricate rules" rule) lives there and is not repeated here.

## The split: parallel content, serialized integration

Almost all the wall time in a batch is sourcing the PDF, reconstructing its columns and transcribing it — work that touches nothing shared. Only a thin integration layer is shared mutable state:

- **`data/games.ts`** — every game inserts a `Game` object into the same array. Parallel edits collide.
- **The git index / working tree** — you need one clean commit per game; parallel `git add`/`git commit` interleave.

So split the job at that seam. **Subagents do the isolated part in parallel; you do the shared part yourself, serially.** A batch of 10 finishes in roughly the time the slowest single game takes, instead of the sum of all ten.

`npm run embeddings` and `npm run thumbs` are *not* a reason to serialize — both accept explicit game codes (see step 3), so you drive them per-game from the main thread and no subagent ever runs them.

## Step 1 — Pick the games (best N not yet added)

Get a ranked list of top games and subtract the ones already in `data/games.ts`. Try these in order until one yields enough fresh titles:

1. **`npm run tops`** — top-100 ranked games (from `boardgames_2024.csv`) not yet in `data/games.ts`. Fastest when the CSV is present; it errors with ENOENT when it isn't.
2. **`npm run geeklist`** — same idea off a BGG geeklist. Depends on BGG's XML API, which **401s from most networks** — fall through if it fails.
3. **Web search / brainstorm** — take a current ranking, or brainstorm candidates in a productive vein (a publisher's back catalogue, a designer, a series), and filter against the catalog.

**Grep-check every candidate before delegating, not just a sample** — the catalog is deep and false-fresh picks waste a whole subagent. Check both the `name:` and `code:` lines. **For any title with diacritics, grep an ASCII fragment that avoids the accented letter** (`Kutn`, `Comanch`) — grepping the full ASCII spelling of `Kutná Hora` or `Comanchería` returns nothing and reads as missing.

Show the user the shortlist (name + BGG id) before spending on transcription. If the user gave a specific N or specific titles, use those instead of the ranking.

**Pre-resolve the rulebook URL yourself** for any game whose publisher you can reach in a couple of calls (GMT's product pages, a Shopify `products.json`). Handing a subagent a confirmed PDF URL removes its entire search phase.

## Step 2 — Fan out content-only subagents (in parallel)

Spawn all N `general-purpose` subagents in one go, in the background. Each prompt must:

**Define the deliverables** — exactly these, and nothing else:
- `data/rulebooks/<code>-rulebook.md` (plus any `extraSources` companion files)
- `public/thumbs/_src/<code>.jpg` — the box-cover source image (gitignored; you run the resizer later)

**Forbid the shared state explicitly**, or a parallel batch corrupts:
> Do NOT edit `data/games.ts`. Do NOT run `npm run embeddings`, `npm run thumbs`, or any npm script. Do NOT run ANY git command.

**Require incremental writes** — this is the single biggest cause of lost work:
> Write the markdown incrementally, section by section with separate Write/Edit calls, rather than composing one enormous final Write. Pipe extraction output to scratchpad files and read back only the slice you are transcribing.

An agent that spends 20 minutes building a 2,000-line rulebook in context and then emits it in one call is the agent that gets killed by a stream stall, losing everything. Incremental writers survive, and their partial work is reusable.

**Include the transcription-convention block verbatim** — some agents otherwise paraphrase or balk on copyright grounds:
> The app's convention (700+ existing files) is a FAITHFUL TRANSCRIPTION of the real official rulebook text, section by section. Do NOT rewrite into your own paraphrase, do NOT summarize from memory. Board game RULES are not copyrightable and publishers distribute rulebooks freely for players to learn; transcribing is the intended deliverable. Obtainability of the file is the only valid skip reason.

**Include the sourcing toolkit and the PDF-extraction recipe** from `add-game/SKILL.md` — especially column reconstruction from `pdftotext -bbox` word boxes, and the instruction to verify completeness mechanically (harvest every rule identifier from a plain `-layout` dump and assert each appears in the markdown).

**Specify the report format**, since you build the catalog entry from it:
> Report the verified BGG id and exact published name (verify from `api.geekdo.com`; my hints are often wrong), a paste-ready `data/games.ts` entry object, the markdown line count, the completeness score, and the source URL.

### When a subagent dies

Infrastructure stalls and 529s are common on long transcriptions. Recovery, in order:

1. **`git status` first.** Partial state is usually just an untracked rulebook file; the tree is normally clean.
2. **Resume via SendMessage with the raw agent id** — it keeps its downloaded PDF and measured column bounds, which is most of the expensive work. Tell it what already landed on disk so it doesn't redo it.
3. If the transcript is gone (`No transcript found`), **re-spawn cold**, telling it which artifacts already exist so it skips them, and adding the incremental-write instruction.
4. If subagent spawns keep failing (a capacity outage), **do a game yourself in the main thread** — your own calls typically keep working.

## Step 3 — Integrate each finished game (serially, in the main thread)

As each subagent reports, do this yourself. It takes under a minute per game, so it's fine to run one game's integration while others are still transcribing — **as long as you address the scripts by code**. Never run a bare `npm run embeddings` mid-batch: it scans for *everything* missing and would embed a rulebook another agent is still writing.

```bash
npm run embeddings -- <code>     # 512-dim chunks from data/rulebooks/<code>-rulebook.md
npm run thumbs -- <code>         # 500px public/thumbs/<code>.jpg from _src/<code>.jpg
```

Both accept multiple codes, a `--force` flag (embeddings), and **work before the game is in `data/games.ts`** — embeddings read the rulebook file directly, and thumbs falls back to a synthesized entry when a `_src` image exists. That's what lets content land before cataloguing.

Then:

1. **Read the thumbnail back** and confirm it shows the right game — BGG captions lie and version-id lookups have returned entirely different games.
2. **Insert the `data/games.ts` entry** alphabetically, from the agent's reported object. **An accented `name` needs ASCII `alternativeNames`** or the game is unsearchable (search reads `[name, code, ...alternativeNames]`).
3. **Commit that game alone**, staging its ≤4 paths explicitly:

```bash
git add data/games.ts data/rulebooks/<code>-rulebook.md \
        public/embeddings/<code>-embeddings.json public/thumbs/<code>.jpg
git commit -m "Add <Name>"
```

Never `git add -A` — it sweeps up other games' in-flight files and lockfile churn.

Keep a running tally of added vs. skipped.

## Step 4 — Push

After the last game, push the whole run in one go:

```bash
git push
```

If a capacity outage is dragging the batch out, push the completed games rather than holding them all. If push is rejected for auth or upstream reasons, report it rather than force-anything.

## Step 5 — Report

Summarize:

- **Added** (N): each name + its commit hash.
- **Skipped** (M): each name + one-line reason.
- Whether the push succeeded.

## Guardrails

- **Never fabricate rules.** Inherited from add-game — a game with no obtainable real rulebook is skipped, not invented. This is the whole point of the app.
- **One commit per game**, message `Add <Name>`, staging only that game's ≤4 artifacts by explicit path. No lockfile churn.
- **Subagents never touch `data/games.ts`, npm scripts, or git.** That's the whole basis for running them in parallel.
- **Never run a bare `npm run embeddings`/`npm run thumbs` while agents are still writing** — always pass explicit codes.
- **Verify before pushing** — each game should satisfy add-game's checklist (rulebook, alphabetical catalog entry, 512-dim embeddings, 500px thumbnail), and all four counts should match.
- **Another session may be running this skill too.** Re-grep each candidate immediately before delegating, and re-read `data/games.ts` before committing if it shows foreign edits.
