import type { EvalSet } from './dataset';

// Wingspan is the reference game for this eval: an 18k-character rulebook that
// splits into ~20 chunks, so a top-5 retrieval has to pick the right quarter of
// the book. It also has three near-identical passages (the card→food, food→egg
// and egg→card bonus conversions) that punish retrieval which understands the
// gist of a question but not which action it is about.
//
// Gold passages are quoted from data/rulebooks/wingspan-rulebook.md. Keep them
// tight — the shortest span that actually answers the question — so a case
// fails when retrieval lands merely *near* the answer.

const wingspan: EvalSet = {
  code: 'wingspan',
  name: 'Wingspan',
  cases: [
    // ---- Game structure -------------------------------------------------
    {
      id: 'rounds-count',
      question: 'How many rounds does a game of Wingspan last?',
      style: 'verbatim',
      topic: 'structure',
      gold: ['Wingspan is played over 4 rounds.'],
    },
    {
      id: 'turns-final-round',
      question: 'How many turns does each player get in the last round?',
      style: 'paraphrase',
      topic: 'structure',
      gold: ['Round 4: 5 turns per player'],
    },
    {
      id: 'fewer-cubes-each-round',
      question: 'Why do I have fewer actions as the game goes on?',
      style: 'colloquial',
      topic: 'structure',
      gold: [
        'Use 1 of your action cubes to mark your score on the end-of-round goal. As a result, you will have 1 fewer action cube to use each round',
      ],
    },
    {
      id: 'round-end-steps',
      question: 'What do we do at the end of a round?',
      style: 'paraphrase',
      topic: 'structure',
      gold: [
        'Remove all action cubes from your player mat. Score the end-of-round goal for the round you just completed. Discard all face-up bird cards on the bird tray and restock the bird tray with cards from the deck. Rotate the first player token clockwise to the next player.',
        'Remove all action cubes from your player mat. Score the end-of-round goal for the round you just completed. Discard all face-up bird cards on the bird tray and replenish them. Rotate the first player token clockwise to the next player.',
      ],
    },
    {
      id: 'first-player-rotation',
      question: 'who starts the next round',
      style: 'keyword',
      topic: 'structure',
      gold: ['Rotate the first player token clockwise to the next player.'],
    },

    // ---- Setup ----------------------------------------------------------
    {
      id: 'starting-components',
      question: 'What does each player get at the start of the game?',
      style: 'paraphrase',
      topic: 'setup',
      gold: [
        '1 player mat 8 action cubes of one color 2 random bonus cards 5 random bird cards 5 food tokens (1 of each type)',
      ],
    },
    {
      id: 'setup-discard-food',
      question:
        'During setup do I lose food for every bird card I decide to keep?',
      style: 'colloquial',
      topic: 'setup',
      gold: [
        'For each bird card you keep, you must discard 1 food token.',
      ],
    },
    {
      id: 'setup-bonus-cards',
      question: 'How many bonus cards do I keep at the start?',
      style: 'paraphrase',
      topic: 'setup',
      gold: ['Choose 1 bonus card to keep, and discard the other.'],
    },
    {
      id: 'goal-board-sides',
      question: "What's the difference between the green and blue goal board?",
      style: 'paraphrase',
      topic: 'setup',
      gold: [
        'Green: For a game with more direct competition for goals, choose the side that has 1st, 2nd, and 3rd place for each goal. This is the default.',
        'Blue: For a game with less direct competition between players, choose the side that awards 1 point for each targeted item. This is good for new players.',
      ],
    },
    {
      id: 'goal-tiles-setup',
      question: 'How many goal tiles go on the goal board?',
      style: 'paraphrase',
      topic: 'setup',
      gold: [
        'Place 1 goal tile (random side up) on each of the four blank spaces on the goal board. Return extra goal tiles to the box.',
      ],
    },

    // ---- Playing a bird -------------------------------------------------
    {
      id: 'egg-cost-columns',
      question: 'What do I have to pay to play a bird in the fourth column?',
      style: 'paraphrase',
      topic: 'play-a-bird',
      gold: [
        'To play a bird in column 2 or 3, you must discard 1 egg to the egg supply. In columns 4 or 5, you must discard 2 eggs.',
      ],
    },
    {
      id: 'birds-per-habitat',
      question: 'Can I squeeze a sixth bird into a row?',
      style: 'colloquial',
      topic: 'play-a-bird',
      gold: [
        'Your player mat limits you to a maximum of 5 birds in each habitat.',
      ],
    },
    {
      id: 'cannot-afford',
      question: "What happens if I can only pay part of a bird's cost?",
      style: 'paraphrase',
      topic: 'play-a-bird',
      gold: [
        'If you cannot afford to pay the full cost, you cannot play the bird.',
      ],
    },
    {
      id: 'pay-with-cached-food',
      question: 'Can I use food stored on my birds to pay for a new bird?',
      style: 'colloquial',
      topic: 'play-a-bird',
      gold: [
        'Discard food tokens to the supply (these tokens must be from next to your player mat, not food tokens cached on bird cards',
      ],
    },
    {
      id: 'multi-habitat-bird',
      question: 'A bird shows two habitats — where does it go?',
      style: 'colloquial',
      topic: 'play-a-bird',
      gold: [
        'If multiple habitat symbols are shown on the bird card, you can choose which habitat (row) to place it in.',
      ],
    },
    {
      id: 'play-a-bird-no-activation',
      question: 'Does playing a bird also trigger the other birds in that row?',
      style: 'paraphrase',
      topic: 'play-a-bird',
      gold: [
        'Playing a bird is the only action that does not activate a row of birds.',
      ],
    },

    // ---- Food and the birdfeeder ---------------------------------------
    {
      id: 'birdfeeder-reroll',
      question: 'When are we allowed to reroll the birdfeeder dice?',
      style: 'paraphrase',
      topic: 'food',
      gold: [
        'If the dice in the tray all show the same face (including if there is only 1 die) and you are about to gain food from the birdfeeder for any reason, you may first throw all 5 dice back into the birdfeeder.',
        'If the birdfeeder tray is ever empty, throw all 5 dice back in.',
      ],
    },
    {
      id: 'worm-wheat-die',
      question: 'worm wheat die face both tokens',
      style: 'keyword',
      topic: 'food',
      gold: [
        'With the die face that shows worm/wheat, gain 1 token of either type (not 2 tokens).',
      ],
    },
    {
      id: 'food-storage-limit',
      question: 'Is there a cap on how much food I can hoard?',
      style: 'colloquial',
      topic: 'food',
      gold: [
        'There is no limit on how many food tokens you can have by your mat or on your birds',
      ],
    },
    {
      id: 'food-types',
      question: 'Which kinds of food are there in the game?',
      style: 'paraphrase',
      topic: 'food',
      gold: ['invertebrate seed fish fruit rodent'],
    },

    // ---- Eggs -----------------------------------------------------------
    {
      id: 'egg-limit-per-bird',
      question: 'How many eggs can sit on a single bird?',
      style: 'paraphrase',
      topic: 'eggs',
      gold: [
        'A bird’s egg limit is shown by the egg icons. A bird card can never hold more than this number of eggs.',
      ],
    },
    {
      id: 'excess-eggs',
      question:
        'My birds are full but the slot lets me lay more eggs — what happens to the extra ones?',
      style: 'colloquial',
      topic: 'eggs',
      gold: ['Any excess beyond your egg limit is lost.'],
    },
    {
      id: 'eggs-on-one-bird',
      question: 'Can I put all the eggs I lay on the same bird?',
      style: 'colloquial',
      topic: 'eggs',
      gold: [
        'You can lay eggs on any combination of birds (including all on 1 bird), but each bird has an egg limit.',
      ],
    },
    {
      id: 'star-nest',
      question: 'What does a star nest icon count as?',
      style: 'paraphrase',
      topic: 'eggs',
      gold: [
        'Star nests are wild.',
      ],
    },
    {
      id: 'nest-types',
      question: 'What are the four nest types?',
      style: 'verbatim',
      topic: 'eggs',
      gold: ['platform bowl cavity ground'],
    },

    // ---- Bonus conversions (three near-identical passages) --------------
    {
      id: 'card-to-food-conversion',
      question: 'Can I discard a bird card to gain an extra food?',
      style: 'paraphrase',
      topic: 'conversions',
      gold: [
        'you may discard at most 1 bird card from your hand to gain an additional food.',
      ],
    },
    {
      id: 'food-to-egg-conversion',
      question: 'Can I spend a food token to lay one more egg?',
      style: 'paraphrase',
      topic: 'conversions',
      gold: [
        'you may pay at most 1 food token to lay an additional egg.',
      ],
    },
    {
      id: 'egg-to-card-conversion',
      question: 'Can I trade an egg off one of my birds for an extra card?',
      style: 'paraphrase',
      topic: 'conversions',
      gold: [
        'you may discard at most 1 egg from a bird on your mat to draw an additional card.',
      ],
    },

    // ---- Drawing cards --------------------------------------------------
    {
      id: 'hand-limit',
      question: 'Is there a maximum number of bird cards I can hold?',
      style: 'paraphrase',
      topic: 'cards',
      gold: ['There is no hand limit.'],
    },
    {
      id: 'refill-tray-timing',
      question:
        'I took a face-up card — do we replace it right away or later?',
      style: 'colloquial',
      topic: 'cards',
      gold: [
        'As you draw face-up cards, they are not immediately refilled. Instead, wait until the end of your turn before refilling empty spaces on the bird tray.',
      ],
    },
    {
      id: 'deck-runs-out',
      question: 'What happens when the bird deck runs out of cards?',
      style: 'paraphrase',
      topic: 'cards',
      gold: [
        'If the face-down deck is ever emptied during the game, reshuffle all discarded bird cards to form a new deck.',
      ],
    },

    // ---- Bird powers ----------------------------------------------------
    {
      id: 'activation-direction',
      question: 'In what order do my birds in a row activate?',
      style: 'paraphrase',
      topic: 'powers',
      gold: [
        'Move your action cube from right to left, activating any birds with a brown “WHEN ACTIVATED” power in that row.',
      ],
    },
    {
      id: 'pink-power-frequency',
      question: 'How often can a pink power be used?',
      style: 'verbatim',
      topic: 'powers',
      gold: [
        'You can only use a pink power once between each of your own turns (if an opponent triggers it).',
      ],
    },
    {
      id: 'white-power-timing',
      question: 'Do the white powers keep working after the bird is on my mat?',
      style: 'colloquial',
      topic: 'powers',
      gold: [
        'WHEN PLAYED (white): These powers may be activated only when a bird is played (never again after you play the bird).',
      ],
    },
    {
      id: 'powers-optional',
      question: 'Am I forced to use a bird power if I do not want to?',
      style: 'paraphrase',
      topic: 'powers',
      gold: ['Bird powers are always optional.'],
    },
    {
      id: 'cached-food-spendable',
      question: 'Can I spend the food a bird has cached?',
      style: 'colloquial',
      topic: 'powers',
      gold: [
        'You cannot spend that food token; instead, it’s worth 1 VP at end of game.',
      ],
    },
    {
      id: 'predator-icon',
      question: 'skull icon meaning',
      style: 'keyword',
      topic: 'powers',
      gold: ['Skull icon This indicates that the bird is a predator.'],
    },

    // ---- Goals ----------------------------------------------------------
    {
      id: 'goal-tie',
      question: 'Two of us tied on an end-of-round goal. How is it scored?',
      style: 'paraphrase',
      topic: 'goals',
      gold: [
        'If players tie, place both cubes on the tied place, and do not award the next place. At game end, you will add the points for that place and the next place(s), then divide by the number of players who tied and round down',
      ],
    },
    {
      id: 'goal-zero-cube',
      question: 'I have none of the thing the goal asks for. Do I still place a cube?',
      style: 'colloquial',
      topic: 'goals',
      gold: [
        'If you finish in 4th or 5th place, you must still place an action cube on the goal board in the space marked 0.',
        'If you do not have any of that item, you must still place an action cube on the goal board in the space marked 0.',
      ],
    },
    {
      id: 'goal-need-one',
      question: 'Can I place on a goal without owning any of the target item?',
      style: 'paraphrase',
      topic: 'goals',
      gold: [
        'You must have at least 1 of the targeted items to score points for a goal.',
      ],
    },
    {
      id: 'blue-goal-cap',
      question: 'What is the most a single goal can be worth on the blue side?',
      style: 'paraphrase',
      topic: 'goals',
      gold: ['Score 1 point per item, with a maximum of 5 points.'],
    },

    // ---- Scoring --------------------------------------------------------
    {
      id: 'tiebreaker',
      question: 'Who wins if two players finish on the same score?',
      style: 'colloquial',
      topic: 'scoring',
      gold: [
        'In the case of a tie, the player with the most unused food tokens wins. If players are still tied, they share the victory.',
      ],
    },
    {
      id: 'one-point-each',
      question: 'Which things are worth one point each at the end?',
      style: 'paraphrase',
      topic: 'scoring',
      gold: [
        '1 point for each: egg on a bird card food token cached on a bird card card tucked under a bird card',
      ],
    },
    {
      id: 'tucked-card-value',
      question: 'How much is a tucked card worth?',
      style: 'paraphrase',
      topic: 'scoring',
      gold: [
        'Each of these tucked cards are worth 1 VP at end of game.',
      ],
    },
  ],
};

export default wingspan;
