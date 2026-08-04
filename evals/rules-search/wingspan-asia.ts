import type { EvalSet } from './dataset';

// Wingspan Asia tests a failure the other two sets cannot: an expansion
// rulebook that restates most of the base game alongside the rules that
// replace it. "Who takes the first-player token next round?" has one answer in
// the standard game and a different one in Duet mode, and both sentences sit in
// this one document. Retrieval that finds the topic but not the mode hands the
// model two contradictory rules and no way to choose.
//
// Cases are therefore weighted toward the seams: Duet mode, Flock mode, the
// power categories Asia adds (teal and yellow), and the setup steps that differ
// from the base game. The catalog has `wingspan` and `wingspan-asia` as
// separate games, so this also checks that the Asia index answers Asia
// questions rather than echoing the base rulebook it quotes.

const wingspanAsia: EvalSet = {
  code: 'wingspan-asia',
  name: 'Wingspan Asia',
  cases: [
    // ---- Mode seams: same topic, different answer per mode ---------------
    {
      id: 'duet-first-player',
      question: 'In Duet mode, who gets the first-player token next round?',
      style: 'paraphrase',
      topic: 'duet',
      gold: [
        'Pass the first player token to the player who came in second on the end-of-round goal.',
        'The player who comes second on the goal also gets the first-player token for the next round.',
      ],
    },
    {
      id: 'standard-first-player',
      question:
        'Playing a standard game, not Duet — how does the first-player token move?',
      style: 'colloquial',
      topic: 'structure',
      gold: ['Pass the first player token clockwise to the next player.'],
    },
    {
      id: 'flock-first-player',
      question: 'In Flock mode, what do we do with the turn-order dial each round?',
      style: 'paraphrase',
      topic: 'flock',
      gold: [
        'Pass the first-player token to the left. Move the turn-order dial so that the star points to this player.',
        'After passing the first player token to the left, move the turn-order dial so that the star points to the new first player.',
      ],
    },
    {
      id: 'duet-goal-second-place',
      question: 'In Duet mode, what does the player who comes second on a goal score?',
      style: 'paraphrase',
      topic: 'duet',
      gold: [
        'The player who comes second on the goal places their cube below the tile and gets zero points.',
      ],
    },
    {
      id: 'duet-goal-tie',
      question: 'We tied on an end-of-round goal in Duet mode. What happens?',
      style: 'colloquial',
      topic: 'duet',
      gold: [
        'Ties are friendly: Both players get the points. In the case of a tie, the first-player token goes to the player who did not have it this round.',
      ],
    },
    {
      id: 'flock-goal-tie',
      question: 'Two players tied for first on a goal in Flock mode. Is second place gone?',
      style: 'colloquial',
      topic: 'flock',
      gold: [
        'if 2 players are tied for first place, they both get full points, and second place is still available',
      ],
    },
    {
      id: 'base-goal-tie',
      question:
        'Using the original goal mat, how are points split when players tie on a goal?',
      style: 'paraphrase',
      topic: 'goals',
      gold: [
        'If players tie, place both cubes on the tied place, and do not award the next place. At game end, add the points for that place and the next place(s), then divide by the number of players who tied and round down',
      ],
    },

    // ---- Duet mode specifics --------------------------------------------
    {
      id: 'duet-token-setup',
      question: 'How many Duet tokens do I start with and where do they go?',
      style: 'paraphrase',
      topic: 'duet',
      gold: [
        'Place 1 Duet token in your player color on each of the 15 bird slots on your player mat.',
      ],
    },
    {
      id: 'duet-final-scoring',
      question: 'How are Duet tokens on the map worth points at the end?',
      style: 'paraphrase',
      topic: 'duet',
      gold: [
        'find your largest contiguous group of Duet tokens on the Duet map. Score 1 point for each Duet token in your largest contiguous group',
      ],
    },
    {
      id: 'duet-contiguous',
      question: 'When do two spaces on the Duet map count as connected?',
      style: 'paraphrase',
      topic: 'duet',
      gold: [
        'Two spaces are considered contiguous if they are connected by a line on the Duet map.',
      ],
    },
    {
      id: 'duet-goal-tiles',
      question: 'Which goal tiles does Duet mode use?',
      style: 'paraphrase',
      topic: 'duet',
      gold: [
        'Use the Duet map and Duet end-of-round goal tiles. The goals are double-sided and marked with red corners.',
      ],
    },
    {
      id: 'duet-token-timing',
      question: 'When do I place a Duet token on the Duet map?',
      style: 'paraphrase',
      topic: 'duet',
      gold: [
        'You will place a Duet token on the Duet map each time you play a bird.',
      ],
    },

    // ---- Flock mode specifics -------------------------------------------
    {
      id: 'flock-player-count',
      question: 'flock mode how many players',
      style: 'keyword',
      topic: 'flock',
      gold: [
        'This expansion enables 6- and 7-player games (Flock mode) when combined with the base game.',
      ],
    },
    {
      id: 'flock-groups',
      question: 'How do we split into groups for a 7-player game?',
      style: 'paraphrase',
      topic: 'flock',
      gold: [
        'Split the players into 2 groups at the same table (3+3 for a 6-player game or 3+4 for a 7-player game).',
      ],
    },
    {
      id: 'flock-birdfeeder',
      question: 'Do the two groups share a birdfeeder in Flock mode?',
      style: 'colloquial',
      topic: 'flock',
      gold: [
        'Each group has their own birdfeeder populated with 5 dice.',
        'Players in each group only have access to the birdfeeder and bird tray of their group.',
      ],
    },
    {
      id: 'flock-pink-powers',
      question: 'Can someone in the other group set off my pink power?',
      style: 'colloquial',
      topic: 'flock',
      gold: [
        'Any active player at the table can trigger your pink power—not just players in your group.',
      ],
    },
    {
      id: 'flock-another-player',
      question:
        'A power tells me to pick another player. Am I limited to my own group?',
      style: 'colloquial',
      topic: 'flock',
      gold: [
        'If you activate a power that has you choose a single other player, you can choose anyone at the table.',
      ],
    },
    {
      id: 'flock-any-die',
      question: 'A bird power says "any die" — which dice can I take in Flock mode?',
      style: 'colloquial',
      topic: 'flock',
      gold: [
        'If a bird power refers to "any die," you only have access to your group\'s dice.',
      ],
    },

    // ---- Power categories Asia adds -------------------------------------
    {
      id: 'teal-round-end',
      question: 'When do teal powers trigger?',
      style: 'paraphrase',
      topic: 'powers',
      gold: [
        'ROUND END (TEAL): These powers may be activated at the end of each round (i.e., up to 4 times per bird).',
      ],
    },
    {
      id: 'teal-order',
      question: 'In what order do players resolve their round-end powers?',
      style: 'paraphrase',
      topic: 'powers',
      gold: [
        'Resolve them in player order, starting with the player who went first for the round.',
      ],
    },
    {
      id: 'round-end-no-pink',
      question: 'Can a round-end power set off an opponent’s pink power?',
      style: 'colloquial',
      topic: 'powers',
      gold: [
        'Round end powers do NOT activate "Once Between Turns" (pink) powers.',
      ],
    },
    {
      id: 'yellow-game-end',
      question: 'How often does a yellow power activate?',
      style: 'paraphrase',
      topic: 'powers',
      gold: [
        'GAME END (YELLOW): These powers activate only once, at the end of the game.',
      ],
    },

    // ---- Setup and iconography that differ from the base game ------------
    {
      id: 'asia-setup-discard',
      question: 'How many cards and food do I keep during setup?',
      style: 'paraphrase',
      topic: 'setup',
      gold: [
        'You have 10 resources: 5 cards and 5 food. You must discard 5 of them and keep 5 (any combination).',
      ],
    },
    {
      id: 'asia-birdfeeder-setup',
      question: 'How do the dice go into the birdfeeder at setup?',
      style: 'paraphrase',
      topic: 'setup',
      gold: ['Roll the food dice onto the birdfeeder board.'],
    },
    {
      id: 'asia-mat-side',
      question: 'Which side of the player mat do we use?',
      style: 'colloquial',
      topic: 'setup',
      gold: [
        'use the inside section of the mat as shown in these images; the exterior section is only used when playing with the Oceania Expansion',
      ],
    },
    {
      id: 'wild-food-icon',
      question: 'What does the wild food icon on a bird let me pay?',
      style: 'paraphrase',
      topic: 'cards',
      gold: [
        'Wild: If a bird\'s food requirement includes a wild icon, you can use any of the 5 types of food for it.',
      ],
    },
    {
      id: 'no-food-icon',
      question: 'A bird shows a crossed-out circle where the food cost goes.',
      style: 'colloquial',
      topic: 'cards',
      gold: ['A crossed-out circle means a bird does not have a food cost.'],
    },
    {
      id: 'asia-card-marking',
      question: 'How do I tell Asia cards apart when mixing with the base game?',
      style: 'paraphrase',
      topic: 'cards',
      gold: [
        'the Wingspan Asia cards have an R in the bottom right corner to differentiate them',
      ],
    },
    {
      id: 'historian-card',
      question: 'Should we keep the Historian bonus card when mixing in Asia?',
      style: 'paraphrase',
      topic: 'cards',
      gold: [
        'If you mix this expansion with the base game, you\'ll probably want to leave out the base game\'s Historian card',
      ],
    },
    {
      id: 'round-end-first-step',
      question: 'What is the first thing we do when a round ends?',
      style: 'paraphrase',
      topic: 'structure',
      gold: ['Use round-end bird powers for birds on your player mat.'],
    },
  ],
};

export default wingspanAsia;
