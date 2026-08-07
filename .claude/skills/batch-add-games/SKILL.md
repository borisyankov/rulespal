---
name: batch-add-games
description: Add rules for several top-ranked games at once — pick 10 games not yet in Rulespal, then add each via the add-game skill in its own commit and push. Runs each batch in a disposable context. Use when the user asks to "add the top games", "add several games", "batch add games", or "add N new games".
---

# Batch-Add Games to Rulespal

This is the batch wrapper around the single-game [`add-game`](../add-game/SKILL.md) skill. It:

1. Picks the **10 best games not yet added**.
2. Fans out **one subagent per game, in parallel**, each producing only that game's rulebook and thumbnail source.
3. Integrates the finished games **serially**: embeddings, thumbnails, and **one commit per game** (`Add <Name>`).
4. **Pushes** once at the end.
5. **Ends the batch with a clean context** — see Step 0 and Step 6.

Read `add-game/SKILL.md` first — every per-game detail (rulebook sourcing, catalog entry, embeddings, thumbnail, the "never fabricate rules" rule) lives there and is not repeated here.

**Everything happens on `main`.** No branches, no worktrees, no PRs — see "Branch discipline" below. **And assume you are not alone:** other sessions run this same skill against this same checkout, so every step has to be safe under a concurrent stranger — see "Working alongside other agents".

**One batch is exactly 10 games.** Not 12, not "keep going while there's budget". Ten, then the context that ran them is thrown away and the next batch starts from disk. The batch size is the unit of context disposal, so it is fixed unless the user names a different number for a specific run.

## Step 0 — One batch = one disposable context

**If you are the main thread, this section plus Step 6 is the entire skill for you. Do steps 1-5 only if you are the orchestrator.**

A batch's integration work is cheap per game but *chatty*: ten worker reports, ten sets of npm output, ten catalog reads, several thumbnail vision reads. Run in the main thread, that fills a context window fast — which matters most under `/loop`, where the same context has to survive iteration after iteration. None of it needs to be in the main thread: **the deliverable is commits on disk, not conversation.**

So the main thread spawns **one `general-purpose` orchestrator subagent** that runs the whole batch — picking, fanning out its own per-game workers, integrating, committing, pushing — and reports back a short summary. The main thread's entire turn is: spawn, relay the summary when it lands, persist anything durable to memory, and (under `/loop`) schedule the next wakeup.

The orchestrator's context is where all the batch detail lives, and **it is destroyed when the orchestrator returns.** That is the clearing mechanism: one batch of 10 = one orchestrator = one context that dies at the end. Never reuse an orchestrator for a second batch, and never let one run more than 10 games — a long-lived orchestrator is precisely the accumulating context this design exists to avoid.

Spawn it in the background with a prompt along these lines:

> Run a full `/batch-add-games` batch in the Rulespal repo at /Users/boris.yankov/rulespal.
>
> Read `.claude/skills/batch-add-games/SKILL.md` and follow steps 1 through 5 — **you are the orchestrator** described there, so the parts that say "you do this in the main thread" mean you, in your own context. Also read `.claude/skills/add-game/SKILL.md` for the per-game procedure.
>
> Candidate pool: `<where the candidates come from — e.g. the top actionable rows of the user's memory file at ~/.claude/projects/-Users-boris-yankov-rulespal/memory/bgg-top1000-missing-list.md>`. Read `add-games-project-state.md` in the same directory first — it holds the standing guardrails, the permanent skip list and hard-won sourcing notes. **Batch size: exactly 10. Stop at 10 and return, even if more candidates are ready.**
>
> You may spawn your own subagents (one per game, in parallel) — do so. Integrate serially yourself as their reports land.
>
> **Commit directly to `main`. Never create, switch to, or check out a branch, and never use a worktree.** If `git rev-parse --abbrev-ref HEAD` isn't `main`, stop and report that instead of switching. **Assume another session is running this same batch skill in this same checkout:** re-grep each candidate right before delegating it, re-read `data/games.ts` right before each insert, stage only your game's explicit paths, leave untracked files you didn't create alone, and on a rejected push `git pull --rebase` and retry (never force-push). See the "Branch discipline" and "Working alongside other agents" sections.
>
> **Report back in under 250 words**: the added games with commit hashes, the skipped ones with a one-line reason each, whether the push succeeded, and any new technique or gotcha worth writing to memory. No per-game detail beyond that. Your report is the ONLY thing that survives this batch — anything you leave out is lost, so put durable findings in it and nothing else.
>
> **Do not return until that report is written.** Returning early — with a one-line status, or because a worker is still going — permanently destroys everything your workers learned. If a game is unfinished, still write the full report and say which game is outstanding and where its files are.

Then have the orchestrator's report be the only thing that reaches the main context. Relay it to the user, and append anything genuinely new to the memory file yourself (a few lines, not a retelling).

**Two failure modes to check for when the report lands** (both cost a batch's findings on 2026-08-06):

- **A one-line return.** If the orchestrator returns a status line instead of the report, its findings are already gone — the commits survive, the knowledge does not. Recover what you can from `git log`, and note it, but the fix is preventive: the "do not return until the report is written" line above.
- **Orphaned workers.** An orchestrator returning does *not* mean its workers finished. One kept writing for ten minutes after its parent returned, with nobody left to integrate it. Whenever a report mentions an unfinished game — or `git status` shows an untracked rulebook after a batch — check whether the file is still growing (**a 45–60 s gap, not 20 s**; a short quiet window reads as death and isn't), and integrate it in the main thread when it settles.

**When the main thread should run the batch itself instead:**

- The user explicitly asked to watch the batch happen, or wants to approve the shortlist before transcription starts.
- Subagent spawning is failing (a capacity outage) — see "When a subagent dies" below; at that point the main thread is the fallback for everything.
- A batch is already mid-flight in the main thread. Don't hand a half-integrated batch to an orchestrator; finish it, then delegate the next one.

**Nested spawning caveat:** the orchestrator spawns workers of its own. If its `Agent` calls fail outright, it should fall back to doing the games itself, serially, and say so in its report — a slower batch is fine, a stalled one is not.

## Branch discipline — always `main`, never switch

Batches commit **directly to `main`**. One commit per game, straight onto the branch everyone else is on.

- **Never** `git checkout -b`, `git switch`, `git checkout <branch>`, `git worktree add`, or `isolation: 'worktree'` on a subagent. No PRs.
- A branch would be actively harmful here: parallel sessions each on their own branch turn ten append-only commits into ten merges of the same contended `data/games.ts`.
- **Check once, at the start of the batch:** `git rev-parse --abbrev-ref HEAD`. If it isn't `main`, **stop and tell the user** rather than switching — they may have work in flight on that branch, and moving off it is their call. Say which branch you found and that the batch is waiting on them.
- Put this rule in the orchestrator prompt too — the orchestrator is the only one running git.
- Workers never run git at all (Step 2), so this binds nobody else.

## Working alongside other agents

Take it as given that **another session is running this same skill, right now, in this same working tree** — plus its own fan-out of workers. Nothing coordinates the two. Neither of you owns the repo, so behave as a guest:

**Picking (Step 1)**
- **Re-grep every candidate immediately before you delegate it**, not just at shortlist time. The gap between building a shortlist and spawning the last worker is long enough for another session to have added several of them.
- Don't try to "claim" candidates in memory files as a lock — memory writes race too, and a stale claim blocks a game permanently. Detect collisions late instead of preventing them early; wasting one worker is cheaper than a phantom lock.
- Foreign untracked rulebooks in `git status` are a signal about what someone else is working on. Don't delegate those games, and don't touch the files.

**Integrating (Step 3)**
- **Re-read `data/games.ts` right before each insert**, and insert with a targeted `Edit` anchored on neighbouring entries. Never write the array from the copy you read at the top of the batch.
- **If the game is already there, someone else added it.** Drop yours: keep their entry, don't commit a duplicate, and record it in the report as a collision rather than a skip.
- **Stage only that game's explicit paths.** `git add -A` in a shared tree commits another agent's half-written rulebook.
- **Never `git stash`, `git reset --hard`, `git checkout -- <path>`, or `git clean`.** Untracked rulebooks and `_src` images you didn't create are most likely a *live* worker's output — someone else's, or an orphan of yours. Check mtime growth (45–60 s, per Step 0) before concluding anything is dead, and when in doubt leave it and mention it in the report.
- **`index.lock` means another agent is mid-commit**, not that git is broken. Wait a few seconds and retry the commit. Never delete the lock file.

**Pushing (Step 4)**
- A rejected push is the normal case, not a failure: `git pull --rebase`, then push again. Retry a couple of times — a busy repo can reject twice.
- Rebase conflicts land in `data/games.ts`, and the resolution is always **keep both entries, alphabetically**. Never resolve by taking one side wholesale; that silently deletes a game someone else just added.
- **Never `git push --force`**, and never rewrite published history to tidy up interleaved commits. Two sessions' `Add <Name>` commits interleaved is a correct log, not a mess to fix.

**Reporting (Step 5/6)**
- Count the catalog from disk at the end (`grep -c "bggid:" data/games.ts`) rather than adding 10 to the number you saw at the start — the delta includes another session's work, so don't claim it as yours.
- When you update the missing-list row counts in memory, note if foreign commits you rebased onto also cleared rows.

## The split: parallel content, serialized integration

Almost all the wall time in a batch is sourcing the PDF, reconstructing its columns and transcribing it — work that touches nothing shared. Only a thin integration layer is shared mutable state:

- **`data/games.ts`** — every game inserts a `Game` object into the same array. Parallel edits collide.
- **The git index / working tree** — you need one clean commit per game; parallel `git add`/`git commit` interleave.

So split the job at that seam. **Subagents do the isolated part in parallel; you do the shared part yourself, serially.** A batch of 10 finishes in roughly the time the slowest single game takes, instead of the sum of all ten.

`npm run embeddings` and `npm run thumbs` are *not* a reason to serialize — both accept explicit game codes (see step 3), so you drive them per-game yourself and no worker subagent ever runs them.

## Step 1 — Pick the games (10 best not yet added)

**Start from disk, never from conversation history.** You are a fresh context by design, so establish where the catalog stands before choosing anything: `grep -c "bggid:" data/games.ts`, `git log --oneline -15`, and the memory files. Do not assume the previous batch's picks, findings or failures carry over — if it mattered, it is in `add-games-project-state.md` or the commit log.

Get a ranked list of top games and subtract the ones already in `data/games.ts`. Try these in order until one yields enough fresh titles:

1. **`npm run tops`** — top-100 ranked games (from `boardgames_2024.csv`) not yet in `data/games.ts`. Fastest when the CSV is present; it errors with ENOENT when it isn't.
2. **`npm run geeklist`** — same idea off a BGG geeklist. Depends on BGG's XML API, which **401s from most networks** — fall through if it fails.
3. **Web search / brainstorm** — take a current ranking, or brainstorm candidates in a productive vein (a publisher's back catalogue, a designer, a series), and filter against the catalog.

**Grep-check every candidate before delegating, not just a sample** — the catalog is deep and false-fresh picks waste a whole subagent. Check both the `name:` and `code:` lines. **For any title with diacritics, grep an ASCII fragment that avoids the accented letter** (`Kutn`, `Comanch`) — grepping the full ASCII spelling of `Kutná Hora` or `Comanchería` returns nothing and reads as missing.

Show the user the shortlist (name + BGG id) before spending on transcription. If the user gave specific titles, use those instead of the ranking. **Take exactly 10** — if more good candidates surface, they belong to the *next* batch, not this one. Stop at 10 and return; do not keep going because the list is long or the budget allows.

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
> The app's convention (900+ existing files) is a FAITHFUL TRANSCRIPTION of the real official rulebook text, section by section. Do NOT rewrite into your own paraphrase, do NOT summarize from memory. Board game RULES are not copyrightable and publishers distribute rulebooks freely for players to learn; transcribing is the intended deliverable. Obtainability of the file is the only valid skip reason — and obtainability is only settled after you have worked add-game's full sourcing toolkit, **always including 1jour-1jeu / `cdn.1j1ju.com`**. If you skip, list the routes you actually tried.

**Point at the toolkit instead of pasting it.** `add-game/SKILL.md` now has a full "Sourcing toolkit" and "Extracting text from multi-column or image-based PDFs" section — tell the subagent to read it rather than re-explaining `api.geekdo.com`, Wayback, `r.jina.ai`, the TTS-mod trick, and `pdftotext -bbox` reconstruction in every prompt:
> Read `add-game/SKILL.md` in this repo before starting — it has the sourcing toolkit (BGG API routes, publisher CDN patterns, Wayback, TTS-mod extraction) and the PDF-extraction technique for multi-column/image-based rulebooks. Follow it.

This alone cuts a typical delegation prompt by more than half — the toolkit text was previously duplicated in every one of the 10 prompts per batch, plus in this file, at real token cost with zero benefit (the subagent can read it once itself, for free relative to you pasting it 10 times).

**Cap the report format** — verbose section-by-section walkthroughs cost real tokens for no integration benefit; you only act on a handful of fields:
> Report in under 150 words: verified BGG id + exact published name (from `api.geekdo.com`, not my hint), the paste-ready `data/games.ts` object, markdown line count, one line on completeness, the rulebook source URL, and confirmation the thumbnail was written + its source. No section-by-section content summary — I don't need it to integrate your work.

### When a subagent dies

Infrastructure stalls and 529s are common on long transcriptions. Recovery, in order:

1. **`git status` first.** Partial state is usually just an untracked rulebook file; the tree is normally clean.
2. **Resume via SendMessage with the raw agent id** — it keeps its downloaded PDF and measured column bounds, which is most of the expensive work. Tell it what already landed on disk so it doesn't redo it.
3. If the transcript is gone (`No transcript found`), **re-spawn cold**, telling it which artifacts already exist so it skips them, and adding the incremental-write instruction.
4. If subagent spawns keep failing (a capacity outage), **do a game yourself, in your own context** — your own calls typically keep working when spawning doesn't.

## Step 3 — Integrate each finished game (serially, yourself)

As each subagent reports, do this yourself. It takes under a minute per game, so it's fine to run one game's integration while others are still transcribing — **as long as you address the scripts by code**. Never run a bare `npm run embeddings` mid-batch: it scans for *everything* missing and would embed a rulebook another agent is still writing.

```bash
npm run embeddings -- <code>     # 512-dim chunks from data/rulebooks/<code>-rulebook.md
npm run thumbs -- <code>         # 500px public/thumbs/<code>.jpg from _src/<code>.jpg
```

Both accept multiple codes, a `--force` flag (embeddings), and **work before the game is in `data/games.ts`** — embeddings read the rulebook file directly, and thumbs falls back to a synthesized entry when a `_src` image exists. That's what lets content land before cataloguing.

Then:

1. **Read the thumbnail back** and confirm it shows the right game — BGG captions lie and version-id lookups have returned entirely different games. This costs real vision tokens per game, so it's worth being deliberate about when to skip it: reasonable to skip only when the subagent's report says the image came straight from BGG's own `geekitems`/`images` API response (the most reliable source) *and* nothing else in the report raised doubt (multiple same-named BGG entries, a version-id lookup, a retailer/fan mirror). Always verify when the source was a retailer CDN, a version-specific lookup, or the subagent flagged any ambiguity.
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

If a capacity outage is dragging the batch out, push the completed games rather than holding them all.

**A non-fast-forward rejection is routine** — another session pushed while you were transcribing. `git pull --rebase`, then push again (see "Working alongside other agents" for the `data/games.ts` conflict resolution). Report an *auth* or upstream-config failure rather than working around it, and never force-anything.

## Step 5 — Report

Summarize:

- **Added** (N): each name + its commit hash.
- **Skipped** (M): each name + one-line reason.
- Whether the push succeeded.

Then **return**. Do not start another batch, do not pick more candidates, do not offer to continue — returning is what disposes of your context.

## Step 6 — Clear the context (main thread)

The batch is over the moment the orchestrator's report lands. Everything worth keeping must now be on disk, and everything else must be dropped.

**1. Persist, then forget.** Append genuinely new findings to `add-games-project-state.md` and update the row count in `bgg-top1000-missing-list.md`. A few lines each, not a retelling. Once written, the report has no further value — the memory file and `git log` are the record.

**2. Clear before the next batch.** The main thread cannot clear itself; `/clear` is a user command. So:

- **Interactive use:** after relaying the report, tell the user plainly that the batch is done and the context should be cleared before the next one — `/clear`, then re-invoke the skill. Say it as a one-line recommendation, not a question.
- **Under `/loop`:** the loop's own context persists across iterations, so treat *each iteration as if the context had been cleared*. At the start of every iteration, re-derive state from disk (`grep -c "bggid:" data/games.ts`, `git log --oneline`, `git status --short`, the memory files) and **do not** rely on, restate, or reason from anything an earlier iteration put in the conversation. Carry forward exactly two things: that a batch is running (or isn't), and the guardrails in memory. If the user wants true clearing between loop iterations, they should stop the loop, `/clear`, and restart it — mention this once, not every iteration.

**3. Never chain batches inside one context.** Two batches in a row without a clear defeats the whole design. If the user asks for 20 games, that is two batches with a clear between them, not one batch of 20.

## Guardrails

- **Default to the Step 0 orchestrator.** The main thread spawns one agent and relays one short report; it does not read `data/games.ts`, run npm scripts, or look at thumbnails. Run the batch in the main thread only for the three exceptions listed in Step 0.
- **One batch = 10 games = one context that dies at the end.** Never reuse an orchestrator, never let one exceed 10 games, never chain two batches in a single context. See Step 6.
- **A fresh batch starts from disk.** Catalog count, recent commits, guardrails and the skip list all come from `data/games.ts`, `git log` and the memory files — never from what someone said earlier in the conversation.
- **Never fabricate rules.** Inherited from add-game — a game with no obtainable real rulebook is skipped, not invented. This is the whole point of the app. **But a skip must be earned:** see add-game's "Before you declare a game unobtainable" checklist. Sourcing is expected to take real effort across many routes, **1jour-1jeu / `cdn.1j1ju.com` must always be one of them**, and "the publisher never released a PDF" is not by itself a valid skip reason — a complete third-party rules document is usable if you disclose it. Require workers to name the routes they tried in any skip report.
- **Always on `main`.** Never create, switch to, or check out a branch; never use a worktree; never open a PR. If HEAD isn't `main` at the start of a batch, stop and ask the user instead of switching. See "Branch discipline".
- **One commit per game**, message `Add <Name>`, staging only that game's ≤4 artifacts by explicit path. No lockfile churn.
- **Subagents never touch `data/games.ts`, npm scripts, or git.** That's the whole basis for running them in parallel.
- **Never run a bare `npm run embeddings`/`npm run thumbs` while agents are still writing** — always pass explicit codes.
- **Verify before pushing** — each game should satisfy add-game's checklist (rulebook, alphabetical catalog entry, 512-dim embeddings, 500px thumbnail), and all four counts should match.
- **Another session is probably running this skill too, on the same branch.** Re-grep each candidate right before delegating; re-read `data/games.ts` right before each insert; drop your entry if theirs landed first; leave untracked files you didn't create alone; `pull --rebase` and retry on a rejected push, keeping both entries on a `data/games.ts` conflict; never force-push, reset, stash or clean. See "Working alongside other agents".
