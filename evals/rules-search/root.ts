import type { EvalSet } from './dataset';

// Root is the hard end of the range: a 100k-character legal-style ruleset that
// splits into ~100 chunks, so the top 5 is 5% of the book rather than Wingspan's
// quarter — hit@5 has room to fail here.
//
// Its real value is discrimination. Five factions have structurally parallel
// sections (each with Birdsong, Daylight, Evening, and a one-line Crafting
// rule), so retrieval must key on *which* faction a question names, not just
// its shape. Retrieval that pattern-matches "crafting" without noticing
// "Eyrie" will answer with the Marquise's rule and read as perfectly fluent
// while being wrong — the failure mode worth measuring.
//
// Gold passages are quoted from data/rulebooks/root-rulebook.md. Rules that the
// Law states identically in several faction sections (the Evening "draw one
// card, plus one card per uncovered draw bonus" step, for instance) are
// deliberately not used as cases: any copy would be a correct answer, so they
// measure nothing.

const root: EvalSet = {
  code: 'root',
  name: 'Root',
  cases: [
    // ---- Golden rules ---------------------------------------------------
    {
      id: 'card-beats-law',
      question: 'A card contradicts the rulebook. Which one do we follow?',
      style: 'colloquial',
      topic: 'golden-rules',
      gold: ['If a card conflicts with the Law, follow the card.'],
    },
    {
      id: 'cannot-is-absolute',
      question: 'Can an effect override something that says I cannot do it?',
      style: 'paraphrase',
      topic: 'golden-rules',
      gold: [
        'The term cannot is absolute. It cannot be overridden unless explicitly instructed.',
      ],
    },
    {
      id: 'simultaneous-effects',
      question:
        'Two effects happen at the same time and nobody knows which goes first. Who decides?',
      style: 'colloquial',
      topic: 'golden-rules',
      gold: [
        'Whenever it is unclear what order simultaneous effects should resolve in, or which player should make a decision, the player taking their turn chooses.',
      ],
    },
    {
      id: 'hand-count-public',
      question: 'Am I allowed to ask how many cards someone is holding?',
      style: 'colloquial',
      topic: 'golden-rules',
      gold: [
        'the number of cards in their hand is public information',
      ],
    },
    {
      id: 'deals-non-binding',
      question: 'Are alliances between players enforceable?',
      style: 'paraphrase',
      topic: 'golden-rules',
      gold: [
        'Players may discuss the game and make agreements, but they are non-binding.',
      ],
    },
    {
      id: 'turn-phases',
      question: 'What are the three phases of a turn?',
      style: 'verbatim',
      topic: 'golden-rules',
      gold: [
        'Each player’s turn has three phases: Birdsong, Daylight, and Evening.',
      ],
    },
    {
      id: 'no-interrupts',
      question: 'Can I respond to an action in the middle of it resolving?',
      style: 'paraphrase',
      topic: 'golden-rules',
      gold: [
        'You cannot interrupt an action',
      ],
    },

    // ---- Cards and the map ----------------------------------------------
    {
      id: 'deck-empty',
      question: 'The deck ran out. What now?',
      style: 'colloquial',
      topic: 'cards',
      gold: [
        'If the deck is ever empty, shuffle the discard pile immediately to form a new deck.',
      ],
    },
    {
      id: 'birds-are-wild',
      question: 'Can a bird card stand in for a fox card?',
      style: 'colloquial',
      topic: 'cards',
      gold: [
        'You can treat any bird card as a card of another suit, even if you must spend, take, or give multiple cards of the same suit.',
      ],
    },
    {
      id: 'reverse-substitution',
      question:
        'An effect asks me for a bird card. Can I hand over a mouse card instead?',
      style: 'colloquial',
      topic: 'cards',
      gold: [
        'If you are prompted to spend, discard, take, or give a bird card, you cannot substitute a card of another suit.',
      ],
    },
    {
      id: 'ambush-count',
      question: 'ambush cards how many in deck',
      style: 'keyword',
      topic: 'cards',
      gold: [
        'There are five ambush cards: one mouse, one rabbit, one fox, and two birds.',
      ],
    },
    {
      id: 'rule-definition',
      question: 'What decides who rules a clearing?',
      style: 'paraphrase',
      topic: 'map',
      gold: [
        'A player rules a clearing if they have more total warriors and buildings in it than each other player.',
      ],
    },
    {
      id: 'rule-tie',
      question: 'We have the same number of pieces in a clearing — who rules?',
      style: 'colloquial',
      topic: 'map',
      gold: [
        'If there is a tie between players in a clearing, no one rules it.',
      ],
    },
    {
      id: 'no-open-slots',
      question: 'Can I build where every slot is taken?',
      style: 'colloquial',
      topic: 'map',
      gold: [
        'You cannot place a building in a clearing with no open slots.',
      ],
    },
    {
      id: 'ruins-stay',
      question: 'Can ruins ever be cleared off the board?',
      style: 'paraphrase',
      topic: 'map',
      gold: ['Ruins cannot be removed unless explicitly instructed'],
    },
    {
      id: 'forest-adjacency',
      question: 'When are two forests next to each other?',
      style: 'paraphrase',
      topic: 'map',
      gold: [
        'it is adjacent to all forests that are separated by only one printed path',
      ],
    },

    // ---- Victory ---------------------------------------------------------
    {
      id: 'how-to-win',
      question: 'How many points do I need to win?',
      style: 'colloquial',
      topic: 'victory',
      gold: [
        'The first player to reach 30 victory points immediately wins the game.',
      ],
    },
    {
      id: 'simultaneous-thirty',
      question: 'Two of us hit 30 points at the same moment. Who takes it?',
      style: 'colloquial',
      topic: 'victory',
      gold: [
        'If multiple players reach 30 or more victory points simultaneously, the player taking the current turn wins.',
      ],
    },
    {
      id: 'removing-buildings-vp',
      question: 'Do I score for destroying an opponent’s token?',
      style: 'paraphrase',
      topic: 'victory',
      gold: [
        'Whenever you remove an enemy’s building or token, you score one victory point.',
      ],
    },
    {
      id: 'dominance-activation',
      question: 'What do I need before I can play a dominance card?',
      style: 'paraphrase',
      topic: 'victory',
      gold: [
        'During your Daylight, if you have at least 10 victory points, you may activate a dominance card in your hand by placing it in your play area.',
      ],
    },
    {
      id: 'dominance-two-player',
      question: 'Do dominance cards get used in a two player game?',
      style: 'paraphrase',
      topic: 'setup',
      gold: [
        'If you are playing with two players, remove all four dominance cards from the deck.',
      ],
    },

    // ---- Key actions -----------------------------------------------------
    {
      id: 'move-must-rule',
      question: 'What do I need in order to move warriors between clearings?',
      style: 'paraphrase',
      topic: 'move',
      gold: [
        'To take a move, you must rule the origin clearing, destination clearing, or both.',
      ],
    },
    {
      id: 'move-repeat',
      question: 'Can the same warrior move twice in one turn?',
      style: 'colloquial',
      topic: 'move',
      gold: ['A given piece can be moved any number of times per turn.'],
    },
    {
      id: 'battle-dice',
      question: 'How do the two dice decide the hits in a fight?',
      style: 'colloquial',
      topic: 'battle',
      gold: [
        'Roll both dice. The attacker will deal hits equal to the higher roll, and the defender will deal hits equal to the lower roll.',
      ],
    },
    {
      id: 'max-rolled-hits',
      question: 'I rolled a 3 but only have 1 warrior there. How many hits?',
      style: 'colloquial',
      topic: 'battle',
      gold: [
        'The maximum hits you can deal from rolling equals the number of your warriors in the clearing of battle, whether you are the attacker or defender.',
      ],
    },
    {
      id: 'defenseless-bonus',
      question: 'What do I get for attacking a clearing with no defending warriors?',
      style: 'paraphrase',
      topic: 'battle',
      gold: [
        'If the defender has no warriors in the clearing of battle, the attacker will deal an extra hit.',
      ],
    },
    {
      id: 'hit-removal-order',
      question: 'Can I let a building take a hit while my warriors are still there?',
      style: 'colloquial',
      topic: 'battle',
      gold: [
        'all of their warriors there must be removed before any of their buildings or tokens there can be removed',
      ],
    },
    {
      id: 'ambush-hits',
      question: 'How much damage does an ambush card do?',
      style: 'colloquial',
      topic: 'battle',
      gold: ['The defender deals two hits immediately'],
    },
    {
      id: 'craft-piece-once',
      question: 'Can I use the same crafting piece for two cards in a turn?',
      style: 'colloquial',
      topic: 'craft',
      gold: ['Each crafting piece may be activated only once per turn.'],
    },
    {
      id: 'no-duplicate-persistent',
      question: 'Can I craft a second copy of a persistent effect I already have?',
      style: 'paraphrase',
      topic: 'craft',
      gold: [
        'You cannot craft a persistent effect if you have an identical one in your play area.',
      ],
    },

    // ---- Faction crafting: four near-identical one-liners -----------------
    {
      id: 'marquise-crafting',
      question: 'What does the Marquise activate to craft?',
      style: 'paraphrase',
      topic: 'marquise',
      gold: ['The Marquise crafts during Daylight by activating workshops.'],
    },
    {
      id: 'eyrie-crafting',
      question: 'What do the Eyrie activate to craft?',
      style: 'paraphrase',
      topic: 'eyrie',
      gold: [
        'The Eyrie craft before resolving the Decree during Daylight by activating roosts.',
      ],
    },
    {
      id: 'alliance-crafting',
      question: 'What does the Woodland Alliance activate to craft?',
      style: 'paraphrase',
      topic: 'alliance',
      gold: [
        'The Alliance crafts during Daylight by activating sympathy tokens.',
      ],
    },
    {
      id: 'vagabond-crafting',
      question: 'How does the Vagabond craft?',
      style: 'paraphrase',
      topic: 'vagabond',
      gold: ['The Vagabond exhausts Hammer to craft.'],
    },

    // ---- Faction phases: same phase, different faction --------------------
    {
      id: 'marquise-birdsong',
      question: 'What does the Marquise do during Birdsong?',
      style: 'paraphrase',
      topic: 'marquise',
      gold: [
        'Place wood tokens in each clearing with any number of sawmills, one wood per sawmill there.',
      ],
    },
    {
      id: 'eyrie-birdsong',
      question: 'How many cards do the Eyrie add to the Decree in Birdsong?',
      style: 'paraphrase',
      topic: 'eyrie',
      gold: [
        'You must add one or two cards to the Decree, but only one card added may be a bird card.',
      ],
    },
    {
      id: 'alliance-birdsong',
      question: 'What can the Woodland Alliance do in Birdsong?',
      style: 'paraphrase',
      topic: 'alliance',
      gold: [
        'Any number of times, you may take the Revolt action',
        'Any number of times, you may take the Spread Sympathy action',
      ],
    },
    {
      id: 'vagabond-birdsong',
      question: 'What is the Vagabond’s free move in Birdsong called?',
      style: 'paraphrase',
      topic: 'vagabond',
      gold: [
        'You may move into an adjacent clearing or forest without exhausting any Boot',
      ],
    },

    // ---- Faction specifics ------------------------------------------------
    {
      id: 'eyrie-turmoil-trigger',
      question: 'What sends the Eyrie into turmoil?',
      style: 'paraphrase',
      topic: 'eyrie',
      gold: [
        'If you cannot fully take an action in the Decree',
      ],
    },
    {
      id: 'eyrie-turmoil-points',
      question: 'How many points do the Eyrie lose in turmoil?',
      style: 'paraphrase',
      topic: 'eyrie',
      gold: [
        'Lose one victory point per bird card (including Loyal Viziers) on the Decree.',
      ],
    },
    {
      id: 'eyrie-rule-ties',
      question: 'Do the Eyrie win ties for ruling a clearing?',
      style: 'colloquial',
      topic: 'eyrie',
      gold: [
        'The Eyrie rule a clearing when tied for most combined warriors and buildings there, and they have at least one Eyrie piece there.',
      ],
    },
    {
      id: 'alliance-guerrilla-war',
      question: 'Why does the Alliance hit harder when defending?',
      style: 'colloquial',
      topic: 'alliance',
      gold: [
        'As defender in battle, the Alliance will deal hits equal to the higher roll, and the attacker will deal hits equal to the lower roll.',
      ],
    },
    {
      id: 'alliance-outrage',
      question:
        'I moved warriors into a clearing with sympathy. Do I owe the Alliance anything?',
      style: 'colloquial',
      topic: 'alliance',
      gold: [
        'Whenever another player removes a sympathy token or moves any warriors into a sympathetic clearing, they must add one card matching the affected clearing from their hand to the Supporters stack.',
      ],
    },
    {
      id: 'alliance-supporter-cap',
      question: 'How many supporters can the Alliance hold with no bases out?',
      style: 'paraphrase',
      topic: 'alliance',
      gold: [
        'If the Alliance has no bases on the map, the Supporters stack can only hold up to five cards.',
      ],
    },
    {
      id: 'marquise-field-hospitals',
      question: 'Can the Marquise get her removed warriors back?',
      style: 'colloquial',
      topic: 'marquise',
      gold: [
        'the Marquise may spend a card matching that clearing to place those warriors in the clearing with the keep token instead of the Marquise’s supply',
      ],
    },
    {
      id: 'marquise-recruit-limit',
      question: 'How often can the Marquise recruit in a turn?',
      style: 'paraphrase',
      topic: 'marquise',
      gold: [
        'Place one warrior at each recruiter. You may take this action only once per turn.',
      ],
    },
    {
      id: 'vagabond-is-not-a-warrior',
      question: 'Can the Vagabond stop someone else from ruling a clearing?',
      style: 'colloquial',
      topic: 'vagabond',
      gold: [
        'The Vagabond pawn is not a warrior (so he cannot rule a clearing or stop another player from ruling one)',
      ],
    },
    {
      id: 'vagabond-taking-hits',
      question: 'What happens to the Vagabond when he takes a hit?',
      style: 'paraphrase',
      topic: 'vagabond',
      gold: [
        'he must damage one undamaged item, moving it to his Damaged box',
      ],
    },
    {
      id: 'vagabond-hostile-movement',
      question: 'Does it cost extra to walk into a hostile faction’s clearing?',
      style: 'colloquial',
      topic: 'vagabond',
      gold: [
        'You must exhaust an extra Boots to move into a clearing with any warriors of any Hostile faction.',
      ],
    },
    {
      id: 'vagabond-hostile-trigger',
      question: 'What makes a faction hostile toward the Vagabond?',
      style: 'paraphrase',
      topic: 'vagabond',
      gold: [
        'If you remove a warrior of a non-Hostile faction, move their relationship marker to the Hostile box.',
      ],
    },
  ],
};

export default root;
