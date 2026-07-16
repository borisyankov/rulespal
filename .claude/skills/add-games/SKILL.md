---
name: add-games
description: Add rules for several top-ranked games at once — pick the best N games not yet in Rulespal, then add each via the add-game skill in its own commit and push. Use when the user asks to "add the top games", "add several games", "batch add games", or "add N new games".
---

# Add Multiple Games to Rulespal

This is the batch wrapper around the single-game [`add-game`](../add-game/SKILL.md) skill. It:

1. Picks the **best N games not yet added** (default N = 10).
2. Adds each one by **delegating to a subagent that runs the `add-game` skill** for that single game.
3. Produces **one commit per game** (`Add <Name>`).
4. **Pushes** once at the end.

Read `add-game/SKILL.md` first — every per-game detail (rulebook sourcing, catalog entry, embeddings, thumbnail, the "never fabricate rules" rule) lives there and is not repeated here.

## Critical: run the games sequentially, not in parallel

It is tempting to fan out one subagent per game at once. **Do not.** Four things are shared mutable state and will corrupt if two agents touch them concurrently:

- **`data/games.ts`** — every game inserts a `Game` object into the same array. Parallel edits collide.
- **`npm run embeddings`** and **`npm run thumbs`** — both scan for *all* games missing a file and build them. Two concurrent runs duplicate work and race on the same output files.
- **The git index / working tree** — you need one clean commit per game; parallel `git add`/`git commit` interleave.

So delegate **one subagent at a time**, wait for it to finish and commit, then start the next. The batch is I/O-bound on downloads and the OpenAI embeddings call, not CPU-bound — sequential is fine.

## Step 1 — Pick the games (best N not yet added)

Get a ranked list of top games and subtract the ones already in `data/games.ts`. Try these in order until one yields enough fresh titles:

1. **`npm run tops`** — prints top-100 ranked games (from `boardgames_2024.csv`) that aren't in `data/games.ts` yet. Fastest when the CSV is present. If it errors with a missing-file error, the CSV isn't there — fall through.
2. **`npm run geeklist`** — same idea off a BGG geeklist. Depends on BGG's XML API, which is **often unreachable** (see add-game step 6) — fall through if it fails.
3. **Web search** — search for the current BGG top-ranked boardgames, take the ranking, and filter out any whose `name` or `alternativeNames` already appear in `data/games.ts` (there are ~300 games; grep the file).

Take the **first N** still-missing games (default 10). Show the user the shortlist (name + BGG id) before spending on embeddings — a quick confirmation is cheap; ten wasted embedding runs are not. If the user gave a specific N or specific titles, use those instead of the ranking.

## Step 2 — Add each game via a subagent (one at a time)

For each game on the shortlist, spawn a subagent (`general-purpose`) with a prompt like:

> Add the board game **"<Name>"** (BGG id <id>) to Rulespal by following the `add-game` skill end to end (`.claude/skills/add-game/SKILL.md`): source the real rulebook, write `data/rulebooks/<code>-rulebook.md`, add the alphabetical `data/games.ts` entry, run `npm run embeddings` and `npm run thumbs`, and verify all four artifacts. Then make **exactly one commit** `Add <Name>` staging only that game's files (`data/games.ts`, the rulebook, the embeddings json, the thumbnail) — **do not** commit `package-lock.json`/`pnpm-lock.yaml` churn, **do not** push. If you cannot obtain the real official rulebook, **do not fabricate rules** — make no commit and report that the game was skipped and why.

Run `run_in_background: false` so you get the result before starting the next game. After each subagent returns:

- Confirm a new commit landed: `git log --oneline -1` should read `Add <Name>`.
- If the subagent reports a skip (no real rulebook, embeddings quota, etc.), record it and move on — don't block the batch on one game.

Keep a running tally of added vs. skipped.

## Step 3 — Push

After the last game, push the whole run in one go:

```bash
git push
```

(Current branch is typically `improvements`; follow the repo's branch/PR norms. If push is rejected for auth or upstream reasons, report it rather than force-anything.)

## Step 4 — Report

Summarize:

- **Added** (N): each name + its commit hash.
- **Skipped** (M): each name + one-line reason.
- Whether the push succeeded.

## Guardrails

- **Never fabricate rules.** Inherited from add-game — a game with no obtainable real rulebook is skipped, not invented. This is the whole point of the app.
- **One commit per game**, message `Add <Name>`, staging only that game's ≤4 artifacts. No lockfile churn.
- **Sequential only** — see the shared-state warning above.
- **Verify before pushing** — each game should satisfy add-game's checklist (rulebook, alphabetical catalog entry, 512-dim embeddings, 500px thumbnail).
