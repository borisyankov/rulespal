# Undaunted: Normandy Rulebook

## Table of Contents

*Undaunted: Normandy is a two-player deck-building war game set in the aftermath of D-Day, 1944. One player commands a US platoon, the other a German force, fighting across a series of scenarios to claim and hold key objectives. Your deck represents your soldiers: play their cards to move, scout, and attack, but as your units take casualties their cards are permanently removed. Manage your deck, seize the initiative, and control the battlefield. A game by David Thompson and Trevor Benjamin.*

## Overview and Components

Each scenario is fought over a set of map tiles for control of **objectives**. Your **deck** is built from:

- **Combat cards:** represent the soldiers in your platoon (with an initiative value and possible actions); each has a matching **combat counter** on the board.
- **Command cards:** represent your non-commissioned officers (marked with command stars), providing support actions.
- **Fog of War cards:** represent breakdowns in communication — they cannot be played on your turn and only clog your hand.

**Control markers** (scouted / controlled sides) mark tiles you have scouted or controlled; you control an objective if your control marker is on its tile. Your **supply** (open information) holds cards not currently in your deck.

## How to Play

Play is a series of rounds, each with three phases:

1. **Draw cards:** both players draw four cards from their deck (shuffle your discard pile when your deck is empty; never shuffle your play area).
2. **Determine initiative:** both players secretly choose one card and reveal simultaneously; the higher initiative takes the initiative marker (ties keep the current holder). Both discard the chosen card.
3. **Player turns:** the player with initiative plays cards one at a time into their play area until they can't or won't play more, then moves their hand and play area to their discard pile. The other player then takes their turn.

You cannot save cards between rounds. Each card played is used for **one** of:

- **Card action:** choose one of the card's listed actions and perform it in full. (If the combat counter isn't on the board, place it on its spawn marker first.)
- **Hunker down:** return the card to your supply (removed from your deck until re-added via a Bolster action). You cannot hunker down with Fog of War cards.

**Fog of War cards** can only be selected when determining initiative; the only way to remove one from your deck is a Scout's **Recon** action. **Suppressed** units (combat counter face down) cannot act — taking an action with one instead flips it to its ready side without performing the action.

## Actions

Actions with `X` have a numerical value (e.g., Move 1); `X A` may also specify a squad.

**Movement:**

- **Move X:** move the unit's counter up to X tiles (onto tiles scouted or controlled by you).
- **Guide X:** move any counter up to X tiles (onto scouted/controlled tiles; not suppressed).
- **Scout X:** move the counter up to X tiles; place a scouted control marker on any tile you don't already control, taking a Fog of War card into your discard pile for each marker placed.
- **Stalk X:** move up to X tiles onto tiles that need not be scouted or controlled.

**Support:**

- **Bolster X A:** take up to X cards from your supply into your discard pile (matching squad if specified).
- **Command X:** draw up to X cards from your deck into your hand (playable this turn).
- **Conceal:** put a Fog of War card from your opponent's supply into their discard pile.
- **Control:** flip the control marker on your counter's tile to controlled (flipping any enemy marker back to scouted); you cannot control a tile with an enemy counter on it.
- **Inspire X A:** take up to X cards from your play area into your hand.
- **Recon:** remove a Fog of War card from your hand from the game, then draw a card.
- **Target:** place your target marker on a tile three or more tiles from your Mortar.

**Combat (Attack X / Suppress X / Blast X):**

1. **Choose target:** any enemy counter (Attack/Suppress); for Blast, all counters (including yours) on the target-marker tile.
2. **Determine total defence value:** base defence (on the counter) + cover bonus (on the tile) + range bonus (tiles away, not counting the attacker's tile; no range bonus for Blast).
3. **Roll attack dice** equal to the action's value. The attack succeeds if any die shows a number ≥ the defender's total defence value (a '0' is always a success; the number of successful dice doesn't matter).
4. **Determine casualties:** on a successful **Attack**, the opponent removes one card of the attacked unit from the game — from their hand if possible, else discard pile, else deck (then reshuffle), else remove the combat counter from the board. A **Suppress** inflicts no casualty but flips the counter to its suppressed side.

**Hills** ('3/1' cover): cover bonus is 1 if both counters are on hill tiles or the attack is a Blast; otherwise 3. Removed counters return to the board (via bolstering and replaying) on their spawn marker, not where they were removed.

## Game End

Each scenario specifies each side's victory condition; as soon as it is met, the game ends immediately (without finishing the round):

- **Capturing Objectives:** the total objective points on tiles you control equals or exceeds the scenario's required total.
- **Pinning the Enemy:** the opponent has no Rifleman combat counters on the board.

If both sides are pinned but neither has won, the player with the most objective points wins (ties go to the initiative holder). ("Beyond All Hope": a player who can no longer reach the required objective total counts as pinned.)
