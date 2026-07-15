# Go Rulebook

## Table of Contents

*Go is one of the oldest board games in the world, originating in China more than 2,500 years ago. Two players, Black and White, take turns placing stones on the intersections of a grid, seeking to surround territory and capture enemy stones. Its rules are elegantly simple, yet the game's strategic depth is famously vast. This rulebook describes the standard rules of Go (as codified by bodies such as the American Go Association); minor scoring variations exist between the Japanese, Chinese, and AGA rule sets.*

## Equipment and Goal

Go is played on a board marked with a grid of lines — traditionally **19×19**, but 13×13 and 9×9 boards are common for shorter games and beginners. Stones are placed on the **intersections** (points) of the lines, not in the squares. One player uses **black** stones, the other **white**. The goal is to control more of the board than your opponent by surrounding **territory** (empty points) and capturing enemy stones.

## The Play

- **Black plays first.** Players alternate turns.
- On your turn you may **place one stone** on any empty intersection, or **pass**.
- Once placed, a stone is not moved; it stays put unless it is captured and removed.

Adjacent points connected by a line are **neighbors** (diagonals are not neighbors). Stones of the same color that are connected through neighboring points form a single **group** (or chain) that lives or dies together.

## Liberties and Capture

Each empty point directly neighboring a stone or group is a **liberty**. A stone or group remains on the board as long as it has at least one liberty.

- When you place a stone that reduces an enemy group's last liberty to zero, that group is **captured** — all its stones are removed from the board and kept as prisoners.
- **Capture is checked before suicide:** when you place a stone, first remove any enemy groups it captures, then check your own stone.
- **Suicide is illegal:** you may not place a stone that would leave your own group with no liberties — *unless* that same move captures an enemy group (which gives your stone a liberty). A move that would be self-capture with no enemy capture is forbidden.

## Ko (Repetition)

The **ko rule** prevents infinite repetition of a single capture-and-recapture. A player may not make a move that recreates the exact board position that existed immediately before the opponent's previous move. In practice, after a single stone is captured in a "ko" shape, the opponent must play elsewhere for at least one turn before they are allowed to recapture. (The broader **superko** principle, used in some rule sets, forbids any move that repeats a previous whole-board position.)

## Ending the Game

The game ends when **both players pass consecutively**. At that point:

- Groups that cannot avoid capture are **dead stones**; by agreement they are removed and counted as prisoners.
- Any disputes about which stones are dead are resolved by resuming play to demonstrate capture.

## Scoring

Under **territory scoring** (Japanese rules), each player's score is the number of empty points their stones **completely surround** (their territory) plus the number of opponent stones they captured. Under **area scoring** (Chinese rules), a player's score is the number of empty points they surround plus the number of their own stones on the board. Both methods usually give the same winner. The player with the higher score wins.

## Komi and Handicap

Because Black moves first and gains an advantage, White is normally awarded a **komi** — a fixed number of points added to White's score (commonly 6.5 or 7.5, the half-point also preventing ties). To balance games between players of different strengths, a **handicap** may be used: the weaker player takes Black and places a number of stones on the board's marked handicap points before White's first move, with komi typically reduced to zero.

## Life, Death, and Eyes (Strategic Notes)

A group is **alive** — safe from capture — if it surrounds two or more separate empty points called **eyes**, since the opponent can never fill both at once without self-capture. A group with only one eye (or none) can eventually be captured. Judging the life and death of groups, and balancing territory against influence, is the central skill of Go.
