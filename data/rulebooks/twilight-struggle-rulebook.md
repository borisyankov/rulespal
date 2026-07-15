# Twilight Struggle Rulebook

## Table of Contents

*Twilight Struggle is a two-player card-driven game recreating the forty-five-year geopolitical conflict of the Cold War between the United States and the Soviet Union. Players spread their influence across the globe, stage coups and political realignments, compete in the Space Race, and manage the ever-present threat of nuclear war (DEFCON). Neither superpower wants to trigger Armageddon, so both must struggle for advantage through subtler means. The player with the most Victory Points — or who achieves an automatic victory — wins. A game by Ananda Gupta and Jason Matthews (GMT Games).*

## Overview and Control

Victory Points (VP) are tracked on a single track from US-20 (US automatic victory) to USSR-20, starting at zero. The US player wins if the marker is positive, the USSR if negative. Players compete for **Control** of countries by placing **Influence** markers. A player **Controls** a country if their Influence there is greater than or equal to the country's **Stability Number**, and exceeds the opponent's Influence in that country by at least the Stability Number. Certain countries are **Battleground** countries, important for scoring and coups.

## Game Sequence

Twilight Struggle has **ten turns**. Each player starts with 8 cards from the Early War deck; at the start of turn 4 the Mid War deck is shuffled in and hand size rises to 9; at turn 8 the Late War deck is added. The **Phasing Player** is whoever's Action Round is being played. When the draw deck empties, reshuffle discards (Event cards with an asterisk `*` are removed from the game when played and never reshuffled).

Each turn's structure:

- **A. Improve DEFCON:** if DEFCON is below 5, improve it by 1.
- **B. Deal Cards** up to hand size.
- **C. Headline Phase:** both players secretly select a Headline card; its Event occurs. The higher Operations value ("Headline Value") resolves first (ties go to the US). Scoring cards have Headline Value 0 and resolve second. The China Card can't be a headline; players get no operations from headline cards.
- **D. Action Rounds:** 6 rounds (turns 1–3) or 7 (turns 4–10). Players alternate, USSR first, playing one card each round. You must play a card each round (you cannot pass). Usually one card is **held** over to next turn (scoring cards may never be held).
- **E. Check Military Operations:** penalize VP for insufficient Military Operations, then reset markers.
- **F–I:** reveal held cards (tournament), flip the China Card, advance the turn marker (reshuffle Mid/Late War at the ends of turns 3/7), and perform **Final Scoring** after turn 10.

## Card Play

A card may be played as an **Event** or for its **Operations** points. If you play a card whose Event is associated with your **opponent**, the Event still occurs (implemented by your opponent) — the phasing player chooses whether the Operations or the Event resolves first. Asterisked opponent-events that can't legally occur go to the discard pile (not removed). Card text supersedes the written rules.

## Operations

When played for Operations, all the card's points must go to **one** of: placing Influence, Realignment rolls, Coup attempts, or a Space Race attempt.

- **Placing Influence:** place markers one at a time, each with or adjacent to a friendly marker present at the start of your Action Round (or in a country adjacent to your superpower). It costs 1 Operations point per marker in a friendly/uncontrolled country, 2 in an enemy-Controlled country (dropping to 1 once control flips).
- **Realignment Rolls:** cost 1 Operations point each to reduce enemy Influence. Both players roll a die, each modified by +1 per adjacent Controlled country, +1 for more Influence in the target, and +1 if their superpower is adjacent; the higher roller removes the difference from the opponent's Influence there (ties do nothing). No Influence is ever added by realignment.
- **Coup Attempts:** the opponent must have Influence in the target. Multiply the target's Stability Number ×2; roll a die and add the card's Operations points — if the total exceeds the doubled Stability Number, the coup succeeds (remove opposing Influence equal to the difference, adding friendly Influence if needed). A coup in a **Battleground** country degrades DEFCON by 1. Move your Military Operations marker up by the card's Operations value.
- **Space Race:** play a card of Operations value ≥ the target box's number and roll; if within the box's range, advance your marker (max one Space Race attempt per turn). Boxes award VP (first/second player values), special abilities, or both.

## DEFCON and Military Operations

The **DEFCON** track (5 = peace, 1 = nuclear war) measures tension. Restrictions: **DEFCON 4** — no Coup/Realignment in Europe; **DEFCON 3** — none in Europe or Asia; **DEFCON 2** — none in Europe, Asia, or the Middle East; **DEFCON 1** — the game is over and the player who caused it (the phasing player) loses. DEFCON improves by 1 at the start of any turn it is below 5.

**Required Military Operations:** by the end of each turn, each player must have accumulated Military Operations at least equal to the current DEFCON number; the opponent gains 1 VP per point short. Coup attempts and War Events count as Military Operations (Realignment rolls do not).

## The China Card

Either player may play the China Card as an extra card (it doesn't count against hand size but counts as one of the turn's Actions). When played, it passes face down to the opponent (playable by them next turn after flipping face up). It grants +1 Operations if all its points are spent in Asia. It cannot be a headline, forced as a discard, or used to prevent a Scoring card.

## Scoring and Victory

Each of the six Regions has a **Scoring card**; playing it scores VP based on each superpower's influence there at that moment:

- **Presence:** Control at least one country in the Region.
- **Domination:** Control more countries **and** more Battleground countries than the opponent (and at least one non-Battleground and one Battleground country).
- **Control:** Control more countries and **all** Battleground countries in the Region.

Then add +1 VP per Controlled country adjacent to the enemy superpower and +1 VP per Controlled Battleground country; the net difference between the two players is applied to the VP track (only the difference is applied when both score).

**Automatic Victory:** reaching 20 VP; Controlling Europe when the Europe Scoring card is played; or your opponent triggering DEFCON 1.

**End-Game Victory:** if no one has won by the end of turn 10, score every Region as if its scoring card were played (Southeast Asia is included in Asia). Then whoever has the most VP wins (Control of Europe still grants automatic victory); a marker on zero is a draw.
