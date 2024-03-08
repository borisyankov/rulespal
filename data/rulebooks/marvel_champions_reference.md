# Marvel Champions: The Card Game Reference

## OVERVIEW

This document is intended as the definitive source for rules information, but does not teach players how to play the game. Players should first read the Learn to Play book in its entirety and use this Rules Reference as needed while playing the game.

The majority of this book consists of a glossary, which provides an alphabetical listing of terms and situations that might be encountered during a game. This section should be the first destination for players with rules questions.

The three appendices at the end of the book contain deck customization rules, setup rules, and a card anatomy.

### THE GOLDEN RULES

If the text of this Rules Reference directly contradicts the text of the Learn to Play book, the text of the Rules Reference takes precedence.

If the text of a card directly contradicts the text of either the Rules Reference or the Learn to Play book, the text of the card takes precedence.

### THE GRIM RULE

If players are unable to find the answer to a rules or timing conflict in this Rules Reference, resolve the conflict in the manner that the players perceive as the worst possible resolution at that moment with regards to winning the scenario, and continue with the game.

### COMPONENT LIMITATIONS

There is no limit to the number of threat tokens, damage tokens, acceleration tokens, status cards, or all-purpose counters that can be in the game at a given time.

If players run out of the provided tokens, counters, or status cards, other tokens, counters, or coins may be used.

### ROUND OVERVIEW

The following is an overview of a game round, and the glossary entries that cover each part of the game round.

1. Player phase begins. **See**: [Player Phase](#player-phase)
2. Each player takes a turn. **See**: [Player Turn](#player-turn)
3. Player phase ends. **See**: [End of Player Phase](#end-of-player-phase)
4. Villain phase begins. **See**: [Villain Phase](#villain-phase)
5. Place threat on main scheme. **See**: [Main Scheme](#main-scheme-main-scheme-deck)
6. Villain and minions activate. **See**: [Activation](#activation), [Attack (Enemy Activation)](#attack-enemy-activation), [Scheme (Enemy Activation)](#scheme-enemy-activation)
7. Deal encounter cards. **See**: [Deal](#deal-deal-an-encounter-card)
8. Reveal and resolve encounter cards. **See**: [Reveal](#reveal)
9. Pass the first player token. **See**: [First Player](#first-player)
10. End the round. Proceed to step one of the next game round.

## GLOSSARY

### ABILITY

An ability is game text on a card that explains what the card does *(or can do)*. Several examples can be seen in [Appendix III](#appendix-iii-card-anatomy) of this Rules Reference.

* Card abilities only interact with cards that are in play, unless the ability specifically refers to an out-of-play area or element.
* Card abilities on hero, alter-ego, ally, upgrade, and support cards may only be used if the card is in play, unless the ability specifically refers to being used from an out-of-play state. Event cards implicitly interact with the game from an out-of-play area, as per the rules of the event card type.
* If an ability specifies one or more targets, that ability can only be initiated if it has at least one valid target. *For example, an ability that says “deal 5 damage to a minion” cannot be initiated if there are no minions in play.*
  * *Examples of targets include but are not limited to: “the villain,” “a minion,” “an enemy,” “a scheme,” “a hero,” “an ally,” “a character,” “a player,” “you,” “a card.”*
* When an ability has more than one sentence of text, read the entirety of the ability to check for alteration effects that may change the way the ability resolves. Then, resolve the ability one sentence at a time.
* An ability prefaced by a bold timing trigger followed by a colon is referred to as a triggered ability. An ability without a bold timing trigger is referred to as a constant ability. *(See below.)*
* Player card abilities cannot resolve during game setup, unless prefaced by a “**Setup**” timing trigger.
* The resolution of the following ability types is mandatory: constant abilities, “**Setup**” abilities, “**When Revealed**” abilities, “**When Defeated**” abilities, “**Forced Interrupt**” abilities, “**Forced Response**” abilities, “**Boost**” abilities, and keywords. If one of these ability types uses the word “may”, the part of the ability following “may” is optional.
* The resolution of the following ability types is
optional: “**Action**”, “**Interrupt**”, “**Response**”,
“**Resource**”. The player who controls the card that
has an optional ability determines whether or not to
use that ability at the appropriate time. Any player
can use such an ability on an encounter card, with the
following exceptions:
  * Only the player who controls a player card with an attachment that uses the word “you” or “your” can trigger abilities or pay costs on that attachment.
  * Only the player with an obligation in their play area can trigger abilities or pay costs on that obligation.

**Constant Abilities** — A constant ability is any non-keyword ability whose text contains no bold timing trigger defining its ability type. A constant ability becomes active as soon as its card enters play and remains active while the card is in play.

* Some constant abilities continuously seek a specific condition *(denoted by words such as “during”, “if”, or “while”)*. The effects of such abilities are active anytime the specific condition is met.
* If multiple instances of the same constant ability are in play, each instance affects the game independently.

**Triggered Abilities** — A triggered ability is indicated by a
bold timing trigger followed by a colon and the rest of the
ability text.

* Unless prefaced by the word “**Forced**”, all interrupt and response abilities are optional.
* “**Forced**” abilities, “**When Revealed**” abilities, “**When Defeated**” abilities, and “**When Completed**” abilities are triggered by the game at the ability’s appropriate timing point.
* If the bold timing trigger of an ability contains the word “Hero” or “Alter-Ego,” the ability can only be used if the player triggering the ability is in the specified form.
* If quotation marks are used around a timing trigger and colon, the quoted text is not itself a timing trigger, but is instead referring to other abilities with that trigger.

**Timing** — Some abilities have timing priority over other abilities. In order, the timing priority of abilities with the same triggering condition is:

1. Constant abilities, keywords, and Acceleration, Amplify, Crisis, Hazard icons.
2. Status cards.
3. “**Forced Interrupt**” abilities.
4. “**Interrupt**” abilities.
5. “**Boost**,” “**When Defeated,**” and “**When Revealed**” abilities.
6. “**Forced Response**” abilities.
7. “**Response**” abilities.
8. Consequential damage.

**See also**: [Action](#action), [Alteration Effect](#alteration-effect), [“And”](#and), [Cancel](#cancel), [Delayed Effect](#delayed-effect), [Forced](#forced), [In Play and Out of Play](#in-play-and-out-of-play), [Initiating Abilities](#initiating-abilities), [Interrupt](#interrupt), [Lasting Effects](#lasting-effects), [Qualifiers](#qualifiers), [Replacement Effect](#replacement-effect), [Resource Ability](#resource-ability), [Response](#response), [Simultaneous Resolution](#simultaneous-resolution), [Special](#special), [Target](#target), [“Then”](#then), [When Defeated Abilities](#when-defeated-abilities), [When Revealed Abilities](#when-revealed-abilities), [“Would”](#would)

### ACCELERATION ICON

An acceleration icon represents additional forces that are advancing the villain’s nefarious plans.

During step one of the villain phase, place X additional threat on the main scheme, where X is the number of acceleration icons in play.

* An acceleration icon can be removed from play by defeating the encounter card it is printed on.

**See also**: [Icons](#icons), [Main Scheme](#main-scheme-main-scheme-deck), [Threat](#threat), [Villain Phase](#villain-phase)

### ACCELERATION TOKEN

Acceleration tokens are functionally equivalent to acceleration icons *(but are not considered acceleration icons)*. They are placed next to the main scheme as a reminder to add X additional threat to the main scheme during step one of the villain phase, where X is the number of acceleration tokens in play.

Acceleration tokens enter play through one of two effects:

* If the encounter deck is empty, place one acceleration token next to the main scheme.
* Card effects may instruct the players to add an acceleration token to play.
  * Acceleration tokens placed on cards other than the main scheme still add threat to the main scheme during step one of the villain phase.

Acceleration tokens on the main scheme cannot be removed from play. Unlike other tokens, when a main scheme card leaves play, the acceleration token does not get discarded.

* Acceleration tokens placed on cards other than the main scheme are removed from play when the card they are placed on leaves play.

**See also**: [Component Limitations](#component-limitations), [Encounter Deck](#encounter-deck), [Main Scheme](#main-scheme-main-scheme-deck), [Villain](#villain-villain-deck)

### ACTION

“**Action**” is a type of triggered ability. Players are permitted to trigger action abilities during their turn, or by request during other players’ turns.

* Players can only trigger action abilities on cards they control or on encounter cards.
  * Players cannot trigger action abilities on obligations in other players’ play areas.

**See also**: [Ability](#ability), [Player Turn](#player-turn), [Triggered Ability](#triggered-ability)

### ACTIVATION

There are two types of enemy activations: an attack activation and a scheme activation. Whenever an enemy attacks or schemes, it is considered to have activated.

* During step two of the villain phase, the villain activates once per player, in player order. If the identity of the player resolving the activation is in hero form, the villain initiates an attack against that player’s identity. If the identity of the player resolving the activation is in alter-ego form, the villain initiates a scheme.
* During step two of the villain phase, each minion engaged with a player activates against that player. If the identity of the engaged player is in hero form, the minion initiates an attack against that player’s identity. If the identity of the engaged player is in alter-ego form, the minion initiates a scheme.
* Each time the villain activates, give the villain one boost card from the encounter deck for that activation.
* Some card abilities can also cause enemies to attack or scheme. These are also considered activations.
* If multiple enemies activate against you simultaneously, resolve the villain’s activation first *(if any)* in the order of your choice, followed by minion activations in the order of your choice.
* If an activating minion leaves play, that minion’s activation ends immediately and no further steps of that activation resolve.

**See also**: [Boost](#boost-boost-icon), [Attack (Enemy Activation)](#attack-enemy-activation), [Scheme (Enemy Activation)](#scheme-enemy-activation), [Minion](#minion), [Villain](#villain-villain-deck), [Villain Phase](#villain-phase)

### ACTIVE PLAYER

The player taking their turn during the player phase is the active player.

**See also**: [Player](#player), [Player Turn](#player-turn)

### “ADDITIONAL”

**See**: [Alteration Effect](#alteration-effect)

### “AFTER”

The word “after” refers to a game occurrence that just concluded. Many response abilities use the term “after” to specify the time at which they can be used.

**See also**: [Ability](#ability), [Response](#response)

### ALL-PURPOSE COUNTER

All-purpose counters can be used to track a variety of different game states and statuses. They have no inherent rules.

Card abilities can create and define a number of different counter types, such as “arrow counters” or “web counters.” If a counter is called for, an all-purpose counter is used to track its presence in the game.

**See also**: [Component Limitations](#component-limitations), [Uses (X “Type”)](#uses-x-type)

### ALLIANCE

When a player declares their intention to play a card with the alliance keyword, any player(s) may help pay the costs for that card.

**See also**: [Cost](#cost), [Initiating Abilities](#initiating-abilities), [Keywords](#keywords)

### ALLY

Ally is a player card type that represents an identity’s friends, supporters, or companions.

* If an ally enters play, it remains in play until a card ability or game effect causes it to leave play. If an ally’s remaining hit points are reduced to zero, it is defeated and discarded from play.
* During a player’s turn, they may use any number of allies they control to attack or thwart. An ally must exhaust to attack or thwart.
* After an ally is used to attack or thwart, deal consequential damage to that ally equal to the number of consequential damage icons beneath the ally’s ATK or THW field. *(If an ally attempts to attack or thwart while stunned or confused, respectively, that ally will not take consequential damage.)*
* If a player is attacked, any player may exhaust an ally they control to defend against the attack. If an ally defends against an attack, all damage from the attack is dealt to the ally.
* Attacks, thwarts, defenses, action abilities, and triggered abilities that resolve from allies in play under a player’s control are not considered to be performed by that player’s identity.

**See also**: [Ally Limit](#ally-limit), [Consequential Damage](#consequential-damage), [Hit Points](#hit-points)

### ALLY LIMIT

Each player is permitted to control a maximum of three allies in play at any given time. This is referred to as the “ally limit.”

A player may play or put into play allies beyond their ally limit. However, if a player ever controls a number of allies greater than their ally limit in play, they must immediately choose and discard from play ally cards they control until they have a number of allies in play equal to their ally limit. This occurs before abilities that resolve upon entering play.

**See also**: [Ally](#ally), [Discard](#discard), [Enters Play](#enters-play)

### “ALREADY”

**See**: [Alteration Effect](#alteration-effect)

### ALTERATION EFFECT

An alteration effect modifies the resolution of an ability that precedes it. The types of alteration effects are “additional,” “already,” and “each time” effects.

**Additional** — The word “additional” denotes a modifier to an ability or game state. The additional modifier is resolved simultaneously with any ability it is modifying and under the same conditions as that ability. *(For example, Repulsor Blast reads: “Hero Action (attack): Deal 1 damage to an enemy and discard the top 5 cards of your deck. For each printed Energy resource discarded this way, deal 2 additional damage to that enemy.”)*

**Already** — The word “already” denotes the resolution of an alternate ability if a specific condition is met. The “already” effect checks if this condition is met before the preceding ability attempts to resolve. If so, the “already” effect resolves instead. *(For example, I’m Tough reads: “When Revealed: Give Rhino a tough status card. If Rhino already has a tough status card, this card gains surge.”)*

**Each Time** — The phrase “each time” denotes a temporary interruption to a resolving ability. When a condition is met that is specified by the “each time” effect, the resolution of the preceding ability halts, the “each time” effect resolves in its entirety, then the preceding ability continues resolving. *(For example, “You Dare Oppose Me?“ reads: “When Revealed: Discard the top 5 cards of the encounter deck. Each time a card belonging to the Kree Fanatic set is discarded this way, deal that card to yourself as a facedown encounter card.”)*

**See also**: [Ability](#ability), [Modifiers](#modifiers), [Replacement Effect](#replacement-effect)

### ALTER-EGO, ALTER-EGO FORM

**See**: [Form](#form-change-form), [Identity](#identity)

### AMPLIFY ICON

The amplify icon represents various forces that are empowering or bolstering the villain.

When a boost card is turned faceup **during an enemy activation**, add one additional boost icon to that card for each amplify icon in play.

**See also**: [Activation](#activation), [Boost](#boost-boost-icon), [Enemy](#enemy), [Icons](#icons)

### “AND”

The word “and” indicates that two or more effects within an ability resolve simultaneously.

* Individual effects connected by “and” are not dependent on each other. Resolve as much of each effect as possible.
* Each effect connected by “and” can be canceled or prevented independently.

**See also**: [Ability](#ability), [Cancel](#cancel), [Prevent](#prevent)

### ARROW ICON

**See**: [Cost Arrow Icon](#cost-arrow-icon)

### ASPECT CARD

Cards in the “aspect” classification are any cards that belong to the Aggression, Justice, Leadership, and/or Protection aspects.

* When building a player deck, a player must choose one of the four aspects *(Aggression, Justice, Leadership, or Protection)* to use for customization. The remainder of their deck *(the portion not allocated to their identity-specific cards)* can then be customized with cards that belong to the chosen aspect.
* A card’s aspect is designated by the aspect’s name printed at the bottom of the card in its deckbuilding classification area.

**See also**: [Basic Card](#basic-card), [Classifications](#classifications), [Identity-Specific Card](#identity-specific-card), [Appendix I: Deck Customization](#appendix-i-deck-customization)

### ATK

**See**: [Attack (Player Action)](#attack-player-action), [Basic Power](#basic-power)

### ATTACHMENT

Attachment is an encounter card type.

When an attachment enters play, it attaches to another card
or game element.

* If an attachment attaches to a character, it may modify that character’s ATK, SCH, and/or THW values, as indicated by the values in the associated fields on the attachment card.
  * If an attachment has a “SCH/THW” modifier, it modifies the attached character’s SCH if that character is a villain or minion, and modifies the attached character’s THW if that character is a hero or ally.
  * If an attachment modifies a value the attached character does not have, that modifier is ignored. *(For example, if an attachment gives an alter-ego “+1 ATK,” that alter-ego does **not** get 1 ATK.)*
* When an ability on an attachment attached to a player card uses the word “you” or “your,” it refers to the attached player card’s controller. If that ability is a triggered ability, only the attached player card’s controller can trigger it.

**See also**: [Attach To](#attach-to), [Encounter Card](#encounter-card), [Enters Play](#enters-play), [Game Element](#game-element)

### ATTACH TO

If a card uses the phrase “attach to”, it must be attached to *(placed beneath and slightly overlapped by)* the specified game element as it enters play.

* Once a card is attached, it remains in play until either the element it is attached to leaves play, in which case the attached card is discarded, or an ability or game effect causes the attached card to leave play.
* An attached card exhausts and readies independently of the game element it is attached to.
* The “attach to” phrase is checked for legality when the card would be attached to a game element, but it is not checked again after it is attached. If the initial “attach to” check does not pass, the card is not able to be attached, so it remains in its prior state or game area. If such a card cannot remain in its prior state or game area, discard it.

**See also**: [Attachment](#attachment), [Game Element](#game-element), [Upgrade](#upgrade)

### ATTACK (ENEMY ACTIVATION)

An attack is a type of enemy activation. When an enemy initiates an attack, it targets a specific player, then resolves that attack against that player. To resolve an enemy attack, follow these steps:

1. If a villain, or a minion with the villainous keyword, is attacking, give it one facedown boost card from the encounter deck. *(If a minion without the villainous keyword is attacking, skip this step.)*
2. If a player wishes to defend, that player exhausts a hero or ally as the defender. If a player other than the target player defends, the defending player becomes the target player for this attack.
3. Resolve each of the attacking enemy’s boost cards, one at a time and in the order in which they were dealt, by doing the following:
   a. Flip the boost card faceup.  
   b. Resolve any “**Boost**” abilities, indicated by the star icon in the boost area. *(All other abilities on the boost card are ignored.)*  
   c. Increase the attacking enemy’s ATK value by one for each boost icon on the card.  
   d. Discard the boost card.  
   e. If the enemy has any boost cards remaining, repeat these steps with the next boost card.
4. Deal damage from the attack equal to the attacking enemy’s modified ATK value, based on the following:
   * If a **hero makes a basic defense** against the attack, the amount of damage dealt is reduced by that hero’s DEF value, and the remaining damage from the attack is dealt to that hero.
     * The defending hero is considered to have been attacked.
     * If a hero with a tough status makes a basic defense, the damage is first reduced by that hero’s DEF value. If the damage is reduced to 0, the hero keeps their tough status.
   * If an **ally defends** against the attack, all damage from the attack is dealt to the ally. *(If the ally is defeated by the attack, additional damage does not carry over to the identity.)*
     * The defending ally is considered to have been attacked.
   * If **no character** defends against the attack, the attack is considered undefended. All damage from the attack is dealt to the target player’s identity *(even if that identity is in alter-ego form)*.
     * The target player’s identity is considered to have been attacked.

These rules also apply to enemy attacks:

* Interrupts that trigger “when [villain name] attacks” have the same timing as interrupts that trigger “when the villain initiates an attack.”
* After damage from the attack is dealt, abilities that trigger after an enemy attacks or after a character defends resolve.
  * If an enemy attack ends before damage is dealt, abilities that trigger after a character defends an attack resolve, but abilities that trigger after an enemy attacks do not.
  * For abilities that trigger “after [enemy] attacks you,” “you” refers to the attacked player, even if that player defended with an ally.

**See also**: [Activation](#activation), [Ally](#ally), [Attacks Against Allies](#attacks-against-allies), [Boost](#boost-boost-icon), [Damage](#damage), [Defend](#defend-defense), [Enemy](#enemy), [Identity](#identity), [Minion](#minion), [Modifiers](#modifiers), [Target](#target), [Villain](#villain-villain-deck), [Villainous](#villainous)

### ATTACK (PLAYER ACTION)

Some game effects and card abilities reference an attack. There are a few different ways an attack can occur:

* A hero or ally can use their basic attack power to attack an enemy. A character must exhaust to use this power. This deals damage equal to the character’s ATK value to the enemy.
  * A character can only initiate a basic attack if there is an enemy that can be attacked by that character or if that character is stunned.
* If a triggered ability is labeled as an attack—such as “**Hero Action** *(attack)*”—resolving that ability is considered to attack the specified target. Unless specified by the ability’s text, a hero does not exhaust when using such an ability.
  * An ability labeled as an attack is considered a single attack, even if that attack deals multiple instances of damage.
  * When an attack ability has its damage increased by another ability, each instance of damage in that attack ability that does not use the word “additional” is increased by the specified amount.
* If an ability says “Make the following X attacks in order,” followed by two or more instances of damage, each of those instances is considered a separate attack.
  * An ability that increases the damage of an attack only increases the damage of one of that ability’s attacks, though such an ability can be triggered separately for each attack.
* Hero and ally attacks can target any enemy, unless a card ability *(such as guard)* is preventing that enemy from being attacked.
* When an attack deals damage to multiple enemies, the attacking character is considered to have attacked each of those enemies.
  * Each attacked enemy with the retaliate X keyword that survives the attack deals its retaliate damage to the attacking character.
* Card abilities can cause the villain and/or minions to attack at other times if the ability explicitly instructs the villain or minion to “attack.”

**See also**: [Ally](#ally), [Basic Power](#basic-power), [Damage](#damage), [Defend](#defend-defense), [Enemy](#enemy), [Identity](#identity), [Minion](#minion), [Modifiers](#modifiers), [Retaliate X](#retaliate-x), [Target](#target), [Villain](#villain-villain-deck)

### ATTACKS AGAINST ALLIES

Some effects cause a villain or minion to attack an ally directly. When this occurs, any undefended damage from that attack is placed on the ally that was attacked.

* Any boost abilities that refer to “you” refer to the player who controls the attacked ally.
* Abilities that trigger when the attacking enemy “attacks you” do not trigger.
* Players may defend these attacks as normal by declaring a hero or an ally as the defender.
* If the attack has overkill and defeats an ally *(whether that ally was the attacked ally or a defending ally)*, any excess damage from that attack is dealt to the identity of the player who controlled the defeated ally.

**See also**: [Ally](#ally), [Attack (Enemy Activation)](#attack-enemy-activation), [Defend](#defend-defense), [Target](#target)

### BASE VALUE

A defined value before modifiers are applied. In most cases, it is also the printed value.

**See also**: [Modifiers](#modifiers), [Printed](#printed)

### BASIC CARD

Cards in the “Basic” classification are cards that are not associated with a specific identity or aspect.

* When building a deck, a player may customize the remainder of their deck *(the portion not allocated to their identity-specific cards)* using basic cards.
* A card is designated as basic if it has the word “Basic” printed at the bottom of the card in its deckbuilding classification area.
* Basic cards are not aspect cards.

**See also**: [Aspect Card](#aspect-card), [Classifications](#classifications), [Identity-Specific Card](#identity-specific-card), [Appendix I: Deck Customization](#appendix-i-deck-customization)

### BASIC POWER

A basic power is a statistic that allows a character to perform a certain game function. There are five different basic powers:

* Attack power *(ATK)* can be used by a character to perform a basic attack and deal damage to another character. Generally, heroes, allies, villains, and minions have attack power.
* Thwart power *(THW)* can be used by a character to perform a basic thwart and remove threat from a scheme. Generally, heroes and allies have thwart power.
* Defense power *(DEF)* can be used by a character to perform a basic defense and prevent damage from an attack. Generally, only heroes have defense power.
* Recovery power *(REC)* can be used by a character to perform a basic recovery and heal damage from themself. Generally, only alter-egos have recovery power.
* Scheme power *(SCH)* can be used by a character to perform a basic scheme and place threat on the main scheme. Generally, villains and minions have scheme power.

**See also**: [Ally](#ally), [Attack (Enemy Activation)](#attack-enemy-activation), [Attack (Player Action)](#attack-player-action), [Defend](#defend-defense), [Identity](#identity), [Minion](#minion), [Recover](#recover), [Scheme (Enemy Activation)](#scheme-enemy-activation), [Thwart](#thwart)

### BOOST, BOOST ICON

Each time the villain attacks or schemes, the villain is given one facedown card from the encounter deck, as a boost card. Minions with the villainous keyword are also given a boost card when they activate.

During the activation *(and after any defenders are declared if the villain is attacking)*, each boost card on the enemy is turned face up one at a time. Add the number of boost icons on each card to the enemy’s ATK value *(if it is attacking)* or SCH value *(if it is scheming)* for that activation. Boost icons are located at the bottom-right of the card.

If the boost field has a star icon, it indicates that the card has a “**Boost**” ability. Refer to the card’s text box and resolve the “**Boost**” ability when the card is turned face up. The “**Boost**” ability is located beneath the divider line in the text box.

* A star icon is not itself considered a boost icon, and does not contribute to the villain’s ATK or SCH value.
* Only the ability text beneath the divider line is active on a card that is resolving as a boost card.
* Damage dealt by a boost ability is not considered to be damage dealt by the activation during which the boost ability resolved.
* If additional boost cards are resolved for an activation, the boost icons are cumulative, and all “**Boost**” abilities on those cards resolve.
* After applying a boost card to an activation, discard it.
* If an enemy is dealt a boost card outside of its own activation, that boost card remains facedown on that enemy until that enemy activates.
  * If that enemy is a villain or a minion with the villainous keyword, it still gets dealt another boost card at the start of its activation as normal.

**See also**: [Attack (Enemy Activation)](#attack-enemy-activation), [Scheme (Enemy Activation)](#scheme-enemy-activation), [Star Icon](#star-icon), [Villainous](#villainous)

### CAMPAIGN MODE

**See**: [Modes of Play](#modes-of-play)

### CAMPAIGN-SPECIFIC CARD

Cards in the “campaign-specific” classification are cards that belong to a campaign’s set of accompanying cards.

* Campaign-specific cards can only be used during a campaign from the same product *(determined by that product’s set icon)*.
* A campaign’s rules determine how players utilize campaign-specific cards within that campaign.
* A campaign-specific card is designated by the word “Campaign” printed at the bottom of the card in its encounter set name area.

**See also**: [Classifications](#classifications), [Modes of Play](#modes-of-play)

### CANCEL

Some card abilities can cancel card or game effects.

* Cancel abilities interrupt the initiation of effects and prevent them from resolving.
* Anytime the effects of an ability are canceled, the ability *(apart from its effects)* is still regarded as initiated, and any costs are still paid. Only the effects are prevented from initiating, and do not resolve.
* If the effects of an event card are canceled, the card is still considered played, and it is discarded.
* If the effects of a treachery card are canceled, the card is still regarded as revealed, and it is still placed in the encounter discard pile.

**See also**: [Ability](#ability)

### “CANNOT”

The word “cannot” is absolute and cannot be countermanded by other abilities or effects.

### CARD ABILITY

**See**: [Ability](#ability)

### CARD TYPES

A card’s card type denotes various rules and game functions associated with that card.

* Ally, event, identity, resource, support, and upgrade cards are types of player cards.
* Attachment, environment, main scheme, minion, obligation, side scheme, treachery, and villain cards are types of encounter cards.
* If an ability causes a card to change its card type, it loses all other card types it might possess and functions as would any card of the new card type.

**See also**: [Ally](#ally), [Attachment](#attachment), [Encounter Card](#encounter-card), [Environment](#environment), [Event](#event), [Identity](#identity), [Main Scheme](#main-scheme-main-scheme-deck), [Minion](#minion), [Obligation](#obligation), [Player Card](#player-card), [Resource Card](#resource-card), [Side Scheme](#side-scheme), [Support](#support), [Treachery](#treachery), [Upgrade](#upgrade), [Villain](#villain-villain-deck), [Appendix III: Card Anatomy](#appendix-iii-card-anatomy)

### CHARACTER

Identities *(heroes and alter-egos)*, allies, villains, and minions are all characters.

**See also**: [Ally](#ally), [Identity](#identity), [Minion](#minion), [Villain](#villain-villain-deck)

### CHOOSE (GAME ELEMENT)

The phrase “choose a [game element]” *(such as an ally, a minion, or a scheme)* indicates that a player must select a game element that meets the specific requirements of an ability.

* The player resolving the ability that uses the word “choose” is the player who makes the choice specified by the card.
* If a player card ability requires the choosing of a target, and there is no valid target, the ability cannot be initiated.
* If multiple targets are required to be chosen by the same player, simultaneously choose as many as are available, to a maximum of the specified number.
* An effect that can choose “any number” of targets does not successfully resolve if zero of those targets are chosen.

**See also**: [Ability](#ability), [Game Element](#game-element), [Player](#player), [Target](#target)

### CHOOSE (OPTION)

Some abilities instruct a player to choose between multiple options. *For example, “Choose to either take 1 damage or discard 1 card from your hand.”*

* When an encounter card requires a player to choose an option, they must choose an option they can resolve. If they cannot fully resolve any option, they must choose the option they can most fully resolve.
* When a player card requires a player to choose an option, they cannot choose an option that cannot be at least partially resolved. This includes options that:
  * Have a cost the player cannot pay.
  * Require one or more targets and there are no valid targets.

**See also**: [Ability](#ability), [Player](#player), [Target](#target)

### CLASSIFICATIONS

A card’s classification is the group that a card belongs to as determined by its specific attributes.

* Cards in the “identity-specific” classification are cards that belong to an identity’s set of accompanying cards. (**See**: [Identity-Specific Card](#identity-specific-card))
* Cards in the “aspect” classification are cards that belong to the Aggression, Justice, Leadership, and/or Protection aspects. (**See**: [Aspect Card](#aspect-card))
* Cards in the “Basic” classification are not associated with a specific identity or aspect. (**See**: [Basic Card](#basic-card))
* Cards in the “scenario-specific” classification are cards that belong to a scenario’s set of accompanying cards. (**See**: [Scenario-Specific Card](#scenario-specific-card))
* Cards in the “modular encounter set” or “modular set” classification are cards that belong to a modular set of encounter cards. (**See**: [Modular Encounter Set](#modular-encounter-set))
* Cards in the “campaign-specific” classification are cards that can only be used during a campaign from the same product. (**See**: [Campaign-Specific Card](#campaign-specific-card))
* Cards in the “Standard” classification are cards that are added to most scenarios. (**See**: [Modes of Play](#modes-of-play), [Standard Set](#standard-set))
* Cards in the “Expert” classification are cards that are added to scenarios when playing expert mode. (**See**: [Expert Set](#expert-set), [Modes of Play](#modes-of-play))

### CONFUSE, CONFUSED

Confuse is a status that prevents a character from adding or removing threat with its next scheme or thwart, respectively.

* If an ability “confuses” a character, give that character a confused status card.
* A character is confused if it has a confused status card.
  * A character with the steady keyword is confused only if it has two confused status cards.
* If a character has an ability stating that it “cannot be confused,” confused status cards cannot be placed on that character.
* If a confused identity or ally attempts to thwart or use a thwart ability, discard the confused card instead. Costs associated with the thwart attempt, including exhausting the character, must still be paid.
  * A confused character can attempt to thwart or use a thwart ability even if there are no schemes that can be thwarted.
* If a confused villain or minion would scheme, discard the confused status card instead.
* As the thwart action or scheme activation was replaced by the removal of the confused status card, that character is not considered to have thwarted or schemed.

**See also**: [Ally](#ally), [Identity](#identity), [Minion](#minion), [Status Cards](#status-cards), [Villain](#villain-villain-deck)

### CONSEQUENTIAL DAMAGE

After an ally attacks, it takes consequential damage equal to the number of consequential damage icons beneath its ATK field.

After an ally thwarts, it takes consequential damage equal to the number of consequential damage icons beneath its THW field.

* Consequential damage is dealt to an ally after resolving abilities that are triggered by the ally attacking or thwarting.

**See also**: [Ally](#ally), [Attack (Player Action)](#attack-player-action), [Basic Power](#basic-power), [Damage](#damage), [Icons](#icons), [Thwart](#thwart)

### CONSTANT ABILITY

**See**: [Ability](#ability)

### CONTROL

**See**: [Ownership and Control](#ownership-and-control)

### COPY

A copy of a card is defined by title. A second copy of a card is any other card that shares the same title and subtitle *(if any)*, regardless of card’s type, text, artwork, or any other differing characteristics between the cards.

**See also**: [Card Types](#card-types), [Subtitle](#subtitle)

### COST

A card’s resource cost is the numerical value that must be paid to play the card. Some abilities have a cost described in the ability text that must be paid to use the ability.

* A cost arrow icon in ability text distinguishes a cost from an effect, in a “pay cost → resolve effect” format.
* To pay a resource cost, a player spends resources that they generate by discarding cards from their hand or by using “**Resource**” card abilities.
  * Resources generated to pay for an ability on a card are considered to have been paid for that card.
* While paying a cost, a player is permitted to generate resources beyond the specified cost.
  * Resources generated beyond the specified cost are considered to have been overpaid for that cost and were not paid for that cost.
  * Any resources that are generated beyond the specified cost are lost after paying that cost.
* If multiple costs for a single card or ability require payment, those costs must be paid simultaneously.
* An ability’s cost cannot be paid if that ability’s effect requires one or more targets and there is not at least one valid target.
* While a player is paying a cost, that player must pay costs with cards and/or game elements they control.
* If a cost requires a game element that is not in play, the player paying the cost may only use game elements that are in their own out-of-play areas.
* A cost requiring “any number” or “up to” some number of game elements requires a minimum of one such game element.
* Some card abilities may reference an “additional cost.” A player must pay all additional costs simultaneously with the cost that is being added to, even if multiple cards or abilities are adding separate additional costs. A player cannot pay the original cost or any of the additional costs individually; if they cannot pay for all of the costs at once, then they do not pay any of the costs and the effect associated with the costs does not occur.

**See also**: [Ability](#ability), [Cost Arrow Icon](#cost-arrow-icon), [Game Element](#game-element), [Initiating Abilities](#initiating-abilities), [Keywords](#keywords)

### COST ARROW ICON

A cost arrow icon in ability text distinguishes a cost from an effect, in a “pay cost → resolve effect” format. Non-bolded text before the cost arrow icon must be paid and/or resolved in full before the text after the cost arrow icon can be resolved.

**See also**: [Cost](#cost), [Icons](#icons)

### COUNTER

**See**: [All-Purpose Counter](#all-purpose-counter)

### CRISIS ICON

While at least one crisis icon is in play, threat cannot be removed from the main scheme by any player.

**See also**: [Main Scheme](#main-scheme-main-scheme-deck), [Threat](#threat)

### DAMAGE

Damage reduces a character’s hit points. If a character has zero or fewer remaining hit points, it is defeated.

* Damage on an identity or villain is tracked by a hit point dial. If such a character takes damaged, reduce its dial by the amount of damage that it took.
* Damage on an ally or minion is tracked by damage tokens. If such a character takes damaged, place the specified value of damage tokens on the character.
* When damage is dealt to a character, that character takes damage.
  * Tough status cards resolve before interrupts to the dealing of damage, which in turn resolve before interrupts to the taking of damage.
  * When the amount of damage an effect deals is modified, the amount of damage the character takes is similarly modified.
  * When the amount of damage a character takes is modified *(such as by damage being prevented)*, the amount of damage dealt is not modified.

**See also**: [Component Limitations](#component-limitations), [Defeat](#defeat), [Hit Points](#hit-points), [Indirect Damage](#indirect-damage), [Move](#move), [Prevent](#prevent), [Tough](#tough)

### DASH (VALUE)

If a character’s power *(ATK, DEF, REC, SCH, and THW)* has a dash *(–)* as the value, the character cannot exhaust to use that power. If a game step or card ability references a power with the value of dash *(–)*, that value is treated as 0.

**See also**: [Basic Power](#basic-power), [Non-Numerical Variable](#non-numerical-variable)

### DEAL, DEAL AN ENCOUNTER CARD

During step three of the villain phase, each player is dealt one facedown encounter card.

If a card ability instructs a player to be dealt an encounter card, the player takes the top card of the encounter deck and places it facedown in front of them. This card is not revealed at this time. This card is added to the queue of cards that player resolves during the villain phase.

* If a player is dealt an encounter card during step three or four of the villain phase, the extra encounter card is added to the queue of cards that are being dealt and revealed in those same steps.

**See also**: [Ability](#ability), [Encounter Card](#encounter-card), [Encounter Deck](#encounter-deck), [Player](#player), [Villain Phase](#villain-phase)

### DECK

There are four main types of decks that appear in a game: the player deck, the encounter deck, the villain deck, and the main scheme deck. Certain identities or scenarios may add other decks to the game.

* The order of cards within a deck cannot be altered unless a player is instructed to do so by a game step, game function, or card ability.

**See also**: [Encounter Deck](#encounter-deck), [Main Scheme](#main-scheme-main-scheme-deck), [Player Deck](#player-deck), [Villain](#villain-villain-deck)

### DECK CUSTOMIZATION

**See**: [Appendix I: Deck Customization](#appendix-i-deck-customization)

### DEF

**See**: [Basic Power](#basic-power), [Defend](#defend-defense)

### DEFEAT

If a character has zero or fewer remaining hit points, or if a side scheme has no threat on it, it is defeated.

* If an ally, minion, or side scheme is defeated, it is discarded.
* If an identity or stage of the villain is defeated, it is removed from the game.

**See also**: [Ally](#ally), [Hit Points](#hit-points), [Minion](#minion), [Player](#player), [Player Elimination](#player-elimination), [Removed from the Game](#removed-from-the-game), [Side Scheme](#side-scheme), [Villain](#villain-villain-deck), [Villain Defeat](#villain-defeat)

### DEFEND, DEFENSE

During an enemy attack, a player may defend against that attack using cards they control.

* Only one player at a time can defend against an enemy attack. While a player is defending, no other player can defend against that same attack.
* A hero can use their basic defense power to defend against an enemy attack. A hero must exhaust to use this power. The amount of damage dealt by the attack is reduced by the hero’s DEF value, and any remaining damage is dealt to that hero. While a hero is defending against an attack, no other friendly character can defend against that attack.
  * When a card ability says to “declare [a hero] the defender” of an attack, that hero is considered to be making a basic defense.
* An ally can exhaust to defend against an enemy attack. Damage from the attack is dealt to that ally. While an ally is defending against an attack, no other friendly character can defend against that attack.
  * When a card ability says to “declare [an ally] the defender” of an attack, that ally becomes the defender of the attack.
* When a player initiates a triggered ability labeled as a defense—such as “**Hero Interrupt** *(defense)*”— during an enemy attack, that player’s identity becomes the defender and is considered to have defended the attack if there is not already a defender.
  * The player’s identity is considered to be the defender as soon as the defense-labeled ability begins resolving.
  * Abilities that trigger “when your hero defends against an attack” can be triggered when resolving a defense-labeled ability.
  * Playing a defense-labeled ability is not a basic defense and does not cause a hero to reduce the amount of damage dealt by that hero’s DEF.
  * Unless specified by the ability’s text, a hero does not exhaust when using a defense-labeled ability.
  * The defending player may resolve any number of defense abilities during an enemy attack *(as long as the triggering conditions of those abilities are met)*.
  * Once a player resolves a defense ability during an enemy attack, no other player can resolve defense abilities for that same attack.
  * Defense-labeled abilities can be played during an attack by a player whose ally is defending that attack. In that case, the player’s identity does not become the defender.
  * A player can trigger abilities labeled as a defense outside of an attack if the ability’s triggering condition is met. When triggered this way, the player’s identity is not considered to have defended an attack.
* If a player defends against an enemy attack that targets a different player *(either by defending with a character they control or by resolving a defense ability)*, the defending player becomes the new target of that attack.
  * Any triggered effects that resolved before the defending player was declared that refer to “you” still refer to the player who was attacked originally.
  * Any constant or boost abilities that refer to “you” refer to the defending player.
* If no character is used to defend against an enemy attack, that attack is considered undefended. Additionally, if a defending ally is defeated before damage from the attack is dealt *(such as through a “Boost” ability)*, the attack is considered undefended.
* Abilities that trigger after a character defends an
attack resolve after that attack ends.
  * If an effect causes a defended attack to end before fully resolving, the attack is still considered to have been defended.
  * If an ability triggers after a character uses a basic power, that ability triggers after an attack in which a character made a basic defense resolves.

**See also**: [Ability](#ability), [Ally](#ally), [Attack (Enemy Activation)](#attack-enemy-activation), [Damage](#damage), [“Friendly”](#friendly), [Identity](#identity), [Player](#player)

### DELAYED EFFECT

Some abilities contain delayed effects. Such abilities specify a future timing point, or indicate a future condition that may arise, and dictate an effect that is to happen at that time.

* Delayed effects resolve automatically and immediately after their specified timing point or future condition occurs or becomes true, and before responses to that point or condition may be used.
* When a delayed effect resolves, it is not treated as a new triggered ability, even if the delayed effect was originally created by a triggered ability.

**See also**: [Ability](#ability)

### DISCARD

Discarding is the act of attempting to move a card from a non-discard-pile play area to a discard pile.

* If a player card is discarded, it is placed faceup on top of the owning player’s discard pile.
* If an encounter card is discarded, it is placed faceup on top of the encounter discard pile.
* If multiple cards are discarded simultaneously from a player’s hand or from play, place those cards in the appropriate discard pile in any order.
* If multiple cards are discarded simultaneously from a deck, place those cards in the appropriate discard pile one at a time *(without changing the order)*.

**See also**: [Discard Pile](#discard-pile), [Encounter Card](#encounter-card), [In Play and Out of Play](#in-play-and-out-of-play), [Ownership and Control](#ownership-and-control), [Player Card](#player-card), [Shuffle](#shuffle)

### DISCARD PILE

A discard pile is an out-of-play area that contains cards that have been discarded throughout the game.

* Each player has their own discard pile, and the encounter deck has its own discard pile.
* Each discard pile is open information, and may be looked at by any player at any time.
* The order of cards in a discard pile may not be changed unless a player is instructed to do so by a card ability.
* Any ability that would shuffle a discard pile of zero cards back into a deck does not shuffle the deck.

**See also**: [Discard](#discard), [In Play and Out of Play](#in-play-and-out-of-play), [Ownership and Control](#ownership-and-control), [Player](#player), [Shuffle](#shuffle)

### DOUBLE-SIDED CARD

A card is double-sided if neither of its sides has a card back *(player, villain, or encounter)*.

* When a double-sided card would enter an out-of-play area other than the victory display or set-aside area, it is removed from the game.
* If a double-sided card has “***Standard Mode Only***” and “***Expert Mode Only***” sides, it is put into play with the “***Expert Mode Only***” side faceup if the players are playing expert mode. Otherwise, the card is put into play with the “***Standard Mode Only***” side faceup.

**See also**: [Encounter Card](#encounter-card), [In Play and Out of Play](#in-play-and-out-of-play), [Player Card](#player-card), [Victory X](#victory-x), [Villain](#villain-villain-deck)

### DRAW, DRAWING CARDS

If a player is instructed to draw one or more cards, those cards are drawn from the top of their deck one at a time.

* Drawn cards are added to a player’s hand.
* Each player’s hand size is checked at the end of the player phase. If a player has more cards in their hand than their hand size value at this time, they must choose and discard cards from hand until they are at their hand size.

**See also**: [Discard](#discard), [In Play and Out of Play](#in-play-and-out-of-play), [Ownership and Control](#ownership-and-control), [Player](#player), [Player Deck](#player-deck), [Player Phase](#player-phase)

### “EACH PLAYER”

When each player is instructed to resolve an effect, each player resolves that effect one at a time.

* If the effect does not specify what order the players resolve the effect in, the first player decides the order.
* If a player cannot fully resolve that effect, they resolve it as fully as possible. *For example, if each player is instructed to discard a certain number of cards from the encounter deck and the deck empties while one player is discarding from it, that player stops discarding as soon as the deck is emptied. After the deck is reset (and an acceleration token is placed next to the main scheme deck), the remaining players resume discarding from it.*

**See also**: [Choose (Game Element)](#choose-game-element), [Player](#player)

### “EACH TIME”

**See**: [Alteration Effect](#alteration-effect)

### EFFECT

**See**: [Ability](#ability), [Cost](#cost)

### EMPTY DECK

**See**: [Encounter Deck](#encounter-deck), [Player Deck](#player-deck)

### ENCOUNTER CARD

There are eight encounter card types: attachment cards, environment cards, minion cards, main scheme cards, obligation cards, side scheme cards, treachery cards, and villain cards.

* Encounter cards belong to various classifications, such as scenario-specific encounter cards or modular set encounter cards.
* Most encounter cards have an orange card back.

**See also**: [Attachment](#attachment), [Classifications](#classifications), [Environment](#environment), [Main Scheme](#main-scheme-main-scheme-deck), [Minion](#minion), [Obligation](#obligation), [Side Scheme](#side-scheme), [Treachery](#treachery), [Villain](#villain-villain-deck), [Appendix I: Deck Customization](#appendix-i-deck-customization)

### ENCOUNTER DECK

The encounter deck contains the encounter cards *(attachments, environments, minions, side schemes, and treacheries)* that players can face during a scenario.

* The order of cards within the encounter deck cannot be changed unless a player is instructed to do so by a game step, game function, or card ability.

If the encounter deck is empty, the encounter discard pile is immediately shuffled to create a new encounter deck. When this occurs, place an acceleration token next to the main scheme deck.

* If a card ability discards a specified number of cards from the encounter deck or until a card with specific criteria is discarded, discard cards from the encounter deck until the discard condition is met or the encounter deck is empty. If the encounter deck is emptied this way, that card ability is considered to be fulfilled. Do not continue the discard effect with the newly shuffled encounter deck.
* If there are no cards in both the encounter deck and the encounter discard pile simultaneously *(such as all cards from the encounter deck being in play)*, an infinite loop occurs with an infinite number of acceleration tokens being placed next to the main scheme deck. If this happens, the players lose.

**See also**: [Acceleration Token](#acceleration-token), [Attachment](#attachment), [Choose (Game Element)](#choose-game-element), [Discard](#discard), [Discard Pile](#discard-pile), [Environment](#environment), [Minion](#minion), [Side Scheme](#side-scheme), [Treachery](#treachery)

### ENCOUNTER DISCARD PILE

**See**: [Discard Pile](#discard-pile)

### ENCOUNTER SET

An encounter set is a grouping of encounter cards.

* There are four types of encounter sets: scenario-specific encounter sets, modular encounter sets, the Standard set, and the Expert set.

**See also**: [Classifications](#classifications), [Expert Set](#expert-set), [Modular Encounter Set](#modular-encounter-set), [Scenario-Specific Card](#scenario-specific-card), [Standard Set](#standard-set)

### END OF PLAYER PHASE

To end the player phase, perform the following steps:

1. In player order, each player may discard any number of cards from their hand, and must discard down to their hand size if they have more cards than their hand size.
2. Each player simultaneously draws up to their hand size.
3. Each player simultaneously readies all of their cards.
4. Any effects that last “until the end of the [player] phase” end.
5. Resolve any “when/after the [player] phase ends” effects.

**See also**: [Discard](#discard), [Draw](#draw-drawing-cards), [Hand Size](#hand-size), [Lasting Effects](#lasting-effects), [Player](#player), [Player Phase](#player-phase), [Player Turn](#player-turn), [Ready](#ready)

### ENEMY

An enemy is a minion or villain.

When used as a descriptor, “enemy” refers to game elements that belong to the scenario: “enemy cards”, “enemy abilities” etc.

**See also**: [Game Element](#game-element), [Minion](#minion), [Villain](#villain-villain-deck)

### ENEMY ACTIVATION

**See**: [Activation](#activation), [Attack (Enemy Activation)](#attack-enemy-activation), [Scheme (Enemy Activation)](#scheme-enemy-activation)

### ENEMY ATTACKS

**See**: [Activation](#activation), [Attack (Enemy Activation)](#attack-enemy-activation)

### ENEMY SCHEMES

**See**: [Activation](#activation), [Scheme (Enemy Activation)](#scheme-enemy-activation)

### ENERGY RESOURCE

An energy resource is one of the four types of resources.

* Energy resources can be spent to pay the resource cost of cards and abilities.
* Some card abilities specifically require energy resources to be spent in order to resolve their effects.

**See also**: [Ability](#ability), [Cost](#cost), [Icons](#icons), [Mental Resource](#mental-resource), [Physical Resource](#physical-resource), [Resource](#resource), [Wild Resource](#wild-resource)

### ENGAGE

When a minion enters play in a player’s play area, it engages that player.

Unless otherwise specified by the minion or by the effect that put the minion into play, the minion engages the player who is resolving the current encounter card.

* An engaged minion remains engaged with the same player until it is defeated, removed from play, or a card ability causes it to engage another player.
* If a card ability instructs a player to engage a minion, that minion is also considered to have engaged that player.
* While a minion is engaged with a player, card abilities cannot cause the minion to engage with the same player again *(as the two are already engaged)*.

**See also**: [Ability](#ability), [Defeat](#defeat), [Minion](#minion), [Player](#player), [Player’s Play Area](#players-play-area)

### ENTERS PLAY

The phrase “enters play” refers to any time when a card transitions from an out-of-play area into play. Playing a card, putting a card into play by using a card ability, or revealing a card from the encounter deck are all different means by which a card may enter play.

**See also**: [In Play and Out of Play](#in-play-and-out-of-play), [Leaves Play](#leaves-play), [Play](#play-put-into-play), [Reveal](#reveal)

### ENVIRONMENT

Environment is an encounter card type that creates an overarching rule or set of rules for the scenario.

An environment card enters play in the villain’s play area, and is active so long as it remains in play.

* If an environment enters play, it remains in play until a card ability or game effect causes it to leave play.

**See also**: [Card Types](#card-types), [Encounter Card](#encounter-card), [Enters Play](#enters-play), [Leaves Play](#leaves-play), [Villain](#villain-villain-deck)

### EVENT

Event is a player card type that is generally played for an instantaneous effect.

Each time a player plays an event card, its costs are paid, its effects resolve *(or are canceled)*, and the card is placed in its owner’s discard pile after those effects resolve *(or are canceled)*.

* If the effects of an event are canceled, the card is still considered to have been played, and its costs remain paid. Only the effects are canceled.
* Playing an event card from hand is always optional for a player, unless the event uses the word “must” in its play instructions.
* An event card cannot be played if it requires one or more targets and does not have at least one valid target.
* Event cards are considered to be an extension of an identity. Attacks, thwarts, defenses, action abilities, and triggered abilities that resolve from a player playing an event are also considered to be performed by that player’s identity.
* If an effect modifies the amount of damage an event deals or the amount of threat an event removes, and that event deals multiple instances of damage or removes multiple instances of threat, each of those instances is modified.
  * If an effect modifies the amount of damage “an attack” deals *(rather than “an event”)*, and an event initiates multiple attacks, only the first of those attacks has its damage modified.

**See also**: [Card Types](#card-types), [Discard](#discard), [Identity](#identity), [Player](#player), [Player Card](#player-card), [Ownership and Control](#ownership-and-control)

### EXCESS DAMAGE

Excess damage is any amount of damage that is dealt to a character beyond that character’s remaining hit points.

**See also**: [Ally](#ally), [Damage](#damage), [Hit Points](#hit-points), [Identity](#identity), [Minion](#minion), [Remaining Hit Points](#remaining-hit-points), [Villain](#villain-villain-deck)

### EXHAUSTED

If a card is exhausted, it is rotated 90 degrees.

* An exhausted card cannot be exhausted again until it is ready. Cards are typically readied by a game step or card ability.
* A card ability on an exhausted card is active and can still interact with the game state. However, if an exhausted card must exhaust to pay the cost of using its ability, that ability cannot be used until the card is ready.

**See also**: [Ready](#ready)

### EXPERT MODE

**See**: [Modes of Play](#modes-of-play)

### EXPERT SET

The expert set is an encounter set that is added to scenarios during expert mode.

* The expert set is not a modular encounter set and cannot be selected *(by the players or randomly)* when a scenario requires players to choose a modular encounter set to include in that scenario.
* Cards in the “Expert” classification are any cards that have the word “Expert” printed by the bottom of the card in its encounter set name area.

**See also**: [Classifications](#classifications), [Modes of Play](#modes-of-play), [Modular Encounter Set](#modular-encounter-set), [Appendix I: Deck Customization](#appendix-i-deck-customization)

### FIND

When instructed to find a card, a player searches each game area where that card could be found *(play area, set-aside area, player deck, discard pile, encounter deck, etc.)*.

**See also**: [Search](#find)

### FIRST PLAYER

A first player is determined by the players at the beginning of the game.

The first player token is used to indicate which player is the first player. At the end of the round *(during step five of the villain phase)* the first player token passes to the next clockwise player, who becomes first player for the next round.

If the first player is eliminated, the first player token immediately passes clockwise to the next player.

The players as a group are encouraged to work together, but the first player decides the following:

* If an encounter card targets a specific player or card, and there are multiple eligible targets, the first player selects among the eligible options.
* If an encounter card requires a card ability to be resolved, a game function to be performed, or a choice to be made but does not specify which player should act, the first player does so.
* If two or more effects would resolve simultaneously, the first player decides the order in which to resolve them.

The first player has timing priority in the following situations:

* The first player has the first opportunity to use an interrupt at each appropriate game moment. Interrupt opportunities then proceed among the remaining players in player order.
* The first player has the first opportunity to use a response at each appropriate game moment. Response opportunities then proceed among the remaining players in player order.

**See also**: [In Player Order](#in-player-order), [Player](#player), [Player Elimination](#player-elimination), [Player Phase](#player-phase)

### FORCED

Forced is a bold trigger word. If the word “**Forced**” precedes a triggered ability, the ability’s initiation is mandatory.

* If a forced ability requires one or more targets to resolve and it has no valid targets, it does not initiate.
  * Any costs that would have been paid to initiate the ability are not paid.
* For any given triggering condition, forced interrupts take priority and initiate before non-forced interrupts, and forced responses take priority and initiate before non-forced responses.
* If two or more forced abilities would initiate at the same moment, the first player determines the order in which the abilities initiate, regardless of who controls the cards bearing those abilities.
* Each forced ability must resolve as completely as possible before the next forced ability being triggered by the same triggering condition may initiate.

**See also**: [Ability](#ability), [Target](#target)

### FORM, CHANGE FORM

A player can be in either hero or alter-ego form at a given time. This is indicated by the player’s identity card.

* Once each round, during their turn, each player is permitted to change form by flipping their identity card.
* When a player changes form, only the form changes. The character retains their sustained damage, status cards, lasting effects, attachments, tokens, and current state *(ready or exhausted)*.
* If a card ability causes a player to change forms, it does not count against the one voluntary form change the player is permitted during their turn that round.
* While a player is in hero form, card abilities that interact with their alter-ego do not interact with their identity.
* While a player is in alter-ego form, card abilities that interact with their hero do not interact with their identity.
* Cards with the “[type] form” keyword grant an identity unique forms.
  * These forms are in addition to the identity’s alter-ego and hero forms, and they come with their own conditions for changing into them.
  * When an identity changes their additional form, it does not count against the once-per-turn limit on flipping from hero to alter-ego *(or vice versa)*, but it does count as changing form for the purpose of triggering card effects.

**See also**: [Identity](#identity), [Keywords](#keywords)

### “FRIENDLY”

Friendly is a blanket term that refers to cards the players control.

### “GAINS”

If a card gains a characteristic *(such as a trait, keyword, or ability text)*, the card functions as if it possesses the gained characteristic. Gained characteristics are not considered to be printed on the card.

**See also**: [Keywords](#keywords), [Printed](#printed), [Traits](#traits)

### GAME ELEMENT

A game element is a component or person involved in playing a game of ***Marvel Champions***. All of the following are game elements:

* Cards
* Decks
* Discard Piles
* Hands (of cards)
* Hit Point Dials
* Players
* Tokens

**See also**: [Card Types](#card-types), [Deck](#deck), [Discard Pile](#discard-pile), [Player](#player), [Target](#target)

### GENERATE

**See**: [Resource](#resource)

### “GETS”

If a card ability causes a character to “get” a statistic *(such as +1 ATK or 4 hit points)*, the ability modifies the character’s statistic while it is active.

* If such an ability expires or otherwise becomes inactive, the modified statistic reverts to the value it would have without the modifier.
* If such an ability causes a character to get hit points, it modifies the character’s remaining hit points while the ability remains active, and also modifies the character’s maximum hit points while the ability remains active.

**See also**: [Ally](#ally), [Hit Points](#hit-points), [Identity](#identity), [Minion](#minion), [Villain](#villain-villain-deck)

### GUARD

While a minion with the guard keyword is engaged with a player, that player cannot use cards they control to attack a villain without this keyword.

**See also**: [Attack (Player Action)](#attack-player-action), [Engage](#engage), [Keywords](#keywords), [Minion](#minion), [Reminder Text](#reminder-text), [Villain](#villain-villain-deck)

### HAND SIZE

Each player checks their hand size at the end of the player phase, either discarding down to or drawing up to the number of cards indicated by their hand size value.

* When drawing up to their hand size, a player draws
cards one at a time, checking after each card is drawn
whether they are at their hand size.

**See also**: [End of Player Phase](#end-of-player-phase)

### HAZARD ICON

During step three of the villain phase, for each hazard icon on cards in play, deal one player one additional card *(not one card per player)*. Additional cards are dealt in player order *(first additional card to the first player, the second to the second player, etc.)*.

**See also**: [Deal](#deal-deal-an-encounter-card), [In Player Order](#in-player-order), [Villain Phase](#villain-phase)

### HEAL

If an ability heals a character, damage the character has sustained can be removed from the character.

* A heal effect can only bring a character to its maximum hit points, unless the effect explicitly states it can bring the character above its maximum.

**See also**: [Ally](#ally), [“Gets”](#gets), [Hit Points](#hit-points), [Identity](#identity), [Minion](#minion), [Villain](#villain-villain-deck)

### HERO, HERO FORM

**See**: [Form](#form-change-form), [Identity](#identity)

### HEROIC MODE

**See**: [Modes of Play](#modes-of-play)

### HINDER X

When a card with the hinder X keyword enters play, place X threat on that card. *(X is the value next to the hinder keyword.)*

**See also**: [Enters Play](#enters-play), [Keywords](#keywords), [Reminder Text](#reminder-text), [Reveal](#reveal), [Threat](#threat)

### HIT POINTS

Each character *(identity, ally, minion, and villain)* has a hit point value. Hit points represent the durability of that character.

When damage is dealt to a character, it reduces the character’s remaining hit points *(the amount of damage that character can take before reaching zero hit points)*.

* The phrase “starting hit points” refers to an identity’s printed hit point value.
* An identity’s or villain’s hit point dial represents their remaining hit points. If an identity or villain is damaged, apply the damage by reducing that character’s hit point dial by the specified amount.
  * If a player’s hit point dial is reduced to zero, that player is defeated and eliminated from the game.
  * If a villain’s hit point dial is reduced to zero, that stage of the villain is defeated.
* If an ally or minion is damaged, track the damage by placing damage tokens on that character. Damage tokens on an ally or minion reduce that character’s remaining hit points by the total value of the tokens. An ally or minion with zero or fewer remaining hit points is defeated and placed in the appropriate discard pile.

Some characters may have an infinite number of hit points. A character with infinite hit points cannot be defeated by taking damage, as the amount of damage that character takes will never cause its remaining hit points to reach zero. However, damage may still be dealt to a character with infinite hit points through attacks and card abilities.

**See also**: [Ally](#ally), [Damage](#damage), [Defeat](#defeat), [“Gets”](#gets), [Heal](#heal), [Identity](#identity), [Maximum Hit Points](#maximum-hit-points), [Minion](#minion), [Player Elimination](#player-elimination), [Remaining Hit Points](#remaining-hit-points), [Sustained Damage](#sustained-damage), [Villain](#villain-villain-deck), [Villain Defeat](#villain-defeat)

### ICONS

Icons are graphical elements that represent various functions within the game.

* **Energy Icon**: An energy icon is a resource icon that generates one energy resource when spent. (**See**: [Energy Resource](#energy-resource))
* **Mental Icon**: A mental icon is a resource icon that generates one mental resource when spent. (**See**: [Mental Resource](#mental-resource))
* **Physical Icon**: A physical icon is a resource icon that generates one physical resource when spent. (**See**: [Physical Resource](#physical-resource))
* **Wild Icon**: A wild icon is a resource icon that can generate one energy, mental, physical, or wild resource when spent. (**See**: [Wild Resource](#wild-resource))
* **Acceleration Icon**: An acceleration icon places additional threat on the main scheme during the villain phase. (**See**: [Acceleration Icon](#acceleration-icon))
* **Amplify Icon**: An amplify icon increases the number of boost icons on boost cards during enemy activations by one. (**See**: [Amplify Icon](#amplify-icon))
* **Crisis Icon**: A crisis icon prevents players from removing threat from the main scheme. (**See**: [Crisis Icon](#crisis-icon))
* **Hazard Icon**: A hazard icon increases the number of encounter cards that are dealt to players during the villain phase. Each hazard icon deals one player one additional card *(not one card per player)*. (**See**: [Hazard Icon](#hazard-icon))
* **Boost Icon**: A boost icon increases the activating enemy’s ATK or SCH value during enemy activations. (**See**: [Boost](#boost-boost-icon))
* **Star Icon**: A star icon is used in conjunction with a card’s stat or boost field to indicate that there is a mandatory ability in the text box that corresponds to that field. (**See**: [Star Icon](#star-icon))
* **Consequential Damage Icon**: A consequential damage icon is used in conjunction with an ally’s ATK field or THW field. After an ally attacks or thwarts, it takes one consequential damage for each consequential damage icon in that field. (**See**: [Consequential Damage](#consequential-damage))
* **Per Player Icon**: A per player icon next to a value multiplies that value by the number of players who started the scenario. (**See**: [Per Player Icon](#per-player-icon))
* **Unique Icon**: A unique icon in a card’s title indicates the card is unique. (**See**: [Unique Icon](#unique-icon))

### IDENTITY

Identity is a player card type that represents which character a player is playing in the game.

A player’s identity card is a double-sided card that represents their hero on one side and their alter-ego on the other. The side that is face up indicates the form *(hero or alter-ego)* that player is currently in.

* Each player begins the game in alter-ego form.
* If a card refers to a hero or alter-ego by title, it refers only to the identity with that title, and not to the other side of the card.
* Identity cards cannot be discarded from play.
* The faceup side of an identity card is considered to be in play. The facedown side of an identity card is considered to be out of play.

**See also**: [Form](#form-change-form), [In Play and Out of Play](#in-play-and-out-of-play), [Player](#player), [Player Card](#player-card)

### IDENTITY-SPECIFIC CARD

Cards in the “identity-specific” classification *(also sometimes called “hero-specific”)* are cards that belong to an identity’s set of accompanying cards.

* A player’s deck must include each identity-specific card associated with their chosen identity card. The exact quantity of each card in that identity-specific set must be included in the deck.
* Identity-specific cards *(along with obligation cards and nemesis encounter set cards)* may only be used alongside an identity if those cards share a set icon with that identity.
* An identity-specific card is designated by the identity icon printed in the bottom right corner of the card.
  * Identity cards are identity-specific cards.

**See also**: [Aspect Card](#aspect-card), [Basic Card](#basic-card), [Classifications](#classifications), [Identity](#identity), [Nemesis Encounter Set](#nemesis-encounter-set), [Appendix I: Deck Customization](#appendix-i-deck-customization)

### IN PLAY AND OUT OF PLAY

A card is considered to either be in play or out of play depending on its state within the game.

If a card is in play, its text is active and it can affect the game.

* For player cards, the faceup side of a player’s identity card is in play. The faceup ally cards, support cards, and upgrade cards that have entered play *(played, put into play, etc.)* are in play.
* For encounter cards, the faceup side of the top card of the villain deck and the faceup side of the top card of the main scheme deck are in play. The faceup attachment cards, environment cards, minion cards, obligation cards, and side scheme cards that have entered play *(revealed, put into play, etc.)* are in play.
* A card enters play when it moves from an out-of-play area to a play area.
* Card abilities only interact with, and can only target, cards that are in play *(unless the ability text specifically refers to an out-of-play area)*.
* Card abilities on all card types, except event cards and treachery cards, can only be initiated or affect the game while they are in play unless they specifically refer to being used from an out-of-play area.
* If a card is double-sided *(having game text on each side of the card)*, the faceup side of the card is in play.

If a card is out of play, its text is inactive and cannot affect
the game.

* Event cards and treachery cards implicitly resolve from an out-of-play area, by virtue of the rules pertaining to those card types.
* Cards in a player’s hand, deck, and discard pile are out of play.
* Cards in the encounter deck, encounter discard pile, unrevealed cards in the villain deck, unrevealed cards in the main scheme deck, and facedown encounter cards dealt to a player are out of play.
* Facedown cards attached to in-play cards are out of play.
* Any cards that have been removed from the game or that have been set aside are out of play.
* A card leaves play when it moves from a play area to an out-of-play area.
* If a card is double-sided *(having game text on each side of the card)*, the facedown side is out of play.

**See also**: [Ability](#ability), [Enters Play](#enters-play), [Leaves Play](#leaves-play), [Play](#play-put-into-play), [Play Restrictions and Permissions](#play-restrictions-and-permissions), [Set Aside](#set-aside-set-aside), [Target](#target), [Victory Display](#victory-display)

### IN PLAYER ORDER

If players are instructed to perform a sequence “in player order,” the first player performs their part of the sequence first, followed by the other players in clockwise order.

* If a sequence performed in player order does not conclude after each player has performed their part of the sequence once, the sequence of opportunities continues in a clockwise manner until it is complete.
* The phrase “next player” always refers to the next *(clockwise)* player in player order.

**See also**: [Find](#find), [Player](#player), [Player Phase](#player-phase), [Player Turn](#player-turn)

### INCITE X

When a card with the incite X keyword is revealed, place X threat on the main scheme. *(X is the value next to the incite keyword.)*

**See also**: [Keywords](#keywords), [Main Scheme](#main-scheme-main-scheme-deck), [Reminder Text](#reminder-text), [Reveal](#reveal), [Threat](#threat)

### INDIRECT DAMAGE

Some card abilities may deal “indirect damage.”

* Indirect damage dealt to a player can be divided as that player chooses among characters under their control.
* Indirect damage dealt to a group of players *(or among players)* can be divided as the group chooses among friendly characters in play.
* While assigning indirect damage, a character cannot be assigned more indirect damage than would cause it to be defeated. This is assessed without accounting for interactions with other abilities.
* If an enemy’s attack deals indirect damage, the indirect damage is dealt during step four of the enemy activation *(after player’s have the opportunity to defend against the attack)*.
  * Only the defending character, or the attacked player’s identity if the attack was undefended, is considered to have been attacked, even if other characters were assigned some or all of the indirect damage.

For example, if you take 5 indirect damage, but you control an ally with 4 hit points remaining, you may assign 4 of that indirect damage to the ally, then assign the remaining 1 indirect damage to your identity.

**See also**: [Ally](#ally), [Attack (Enemy Activation)](#attack-enemy-activation), [Damage](#damage), [Defeat](#defeat), [Player](#player)

### INFINITE HIT POINTS

**See**: [Hit Points](#hit-points)

### INITIATING ABILITIES

When a player wishes to play a card or initiate a triggered ability, that player first declares their intent. Then, the player checks the following conditions in order:

1. Check play restrictions: can the card be played, or the ability initiated, at this time?
   * If the card or ability specifies one or more targets, check that it has at least one valid target. If the card or ability does not have at least one valid target, it cannot be played or initiated.
2. Determine the cost *(or costs)* to play the card or initiate the ability, taking modifiers into account.

If both conditions are met, follow these steps in order:

3. Apply any modifiers to the cost(s).
4. Pay the cost(s). If this step is reached and the cost(s) cannot be paid, abort this process without paying any costs.
5. Make all “choose” decisions required to resolve the card.
6. The card commences being played, or the effects of the ability attempt to initiate.
7. The card is played or the ability *(if not canceled in step six)* resolves. The card enters play or, if it is an event card, its effects resolve and it is then placed in its owner’s discard pile.

* If any of the above steps would make the triggering condition of an interrupt ability true, that ability may be initiated just before that triggering condition becomes true.
* If any of the above steps would make the triggering condition of a response ability true, that ability may be initiated immediately after that triggering condition becomes true.
* If the ability being initiated is on a card that is in play, the sequence does not stop from completing if that card leaves play during this sequence unless the card leaving play prevents a required cost from being paid.

**See also**: [Ability](#ability), [Cost](#cost), [Play Restrictions and Permissions](#play-restrictions-and-permissions), [Target](#target)

### “INSTEAD”

**See**: [Replacement Effect](#replacement-effect)

### INTERRUPT

An interrupt ability is a type of triggered ability, indicated by the bold “**Interrupt**” timing trigger. Interrupt abilities may be executed anytime the specified triggering condition occurs, as described in the interrupt’s ability text. The interrupt ability interrupts the resolution of the specified triggering condition, and resolves immediately before that triggering condition resolves.

* Players can only trigger interrupt abilities on cards they control or on encounter cards.
  * Players cannot trigger interrupt abilities on obligations in other players’ play areas.
* Multiple interrupts may be triggered by the same triggering condition, but each interrupt can only be triggered once per occurrence of the triggering condition.
  * Multiple copies of a card with an interrupt can each be triggered by the same triggering condition.
* An interrupt ability is executed when its triggering condition initiates, but before that triggering condition resolves. Opportunities to interrupt occur in player order until all players have passed consecutively.
  * Interrupts that use the word “would” resolve before its triggering condition initiates, when that condition becomes imminent.
* Once all players have consecutively passed on the opportunity to interrupt a triggering condition, further interrupts to that specific triggering condition cannot be used.
* If an interrupt changes *(via a replacement effect)* or cancels an imminent triggering condition, further interrupts to the original triggering condition cannot be triggered.

**See also**: [Cancel](#cancel), [Replacement Effect](#replacement-effect), [Triggered Ability](#triggered-ability), [“Would”](#would)

### KEYWORDS

A keyword is an attribute that conveys specific rules to its card.

* If a card gains multiple instances of a keyword, any additional instances have no effect unless that keyword is followed by a number *(e.g. Hinder X, Retaliate X)*, in which case the numbers for each instance are added together.

The following keywords are used in the game:

* **Alliance**: When a player declares their intention to play an alliance card, any player(s) may help pay the costs for that card. (**See**: [Alliance](#alliance))
* **Form**: A card with the form keyword grants an identity a unique form. (**See**: [Form](#form-change-form))
* **Guard**: While a minion with guard is engaged with a player, that player cannot attack the villain. (**See**: [Guard](#guard))
* **Hinder X**: When a player reveals a card with hinder X, that player places X threat on that card. (**See**: [Hinder X](#hinder-x))
* **Incite X**: When a player reveals a card with incite X, that player places X threat on the main scheme. (**See**: [Incite X](#incite-x))
* **Overkill**: Excess damage from attacks with overkill are dealt to the identity or villain. (**See**: [Overkill](#overkill))
* **Patrol**: While a minion with patrol is engaged with a player, that player cannot thwart the main scheme. (**See**: [Patrol](#patrol))
* **Peril**: While a player is resolving a card with peril, other players cannot help that player. (**See**: [Peril](#peril))
* **Permanent**: Cards with permanent cannot leave play. (**See**: [Permanent](#permanent))
* **Piercing**: Attacks with piercing discard tough status cards from the attacked character before damage is dealt. (**See**: [Piercing](#piercing))
* **Quickstrike**: After this enemy engages a player, it immediately attacks that player if they are in hero form. (**See**: [Quickstrike](#quickstrike))
* **Ranged**: Attacks with ranged ignore retaliate. (**See**: [Ranged](#ranged))
* **Requirement** (Resources): A card with the requirement keyword cannot be played unless each resource of the specified type is spent while paying for that card’s cost. (**See**: [Requirement (Resources)](#requirement-resources))
* **Restricted**: A player cannot control more than two restricted cards at a given time. (**See**: [Restricted](#restricted))
* **Retaliate X**: After a character with retaliate X is attacked, deal X damage to the attacker. (**See**: [Retaliate X](#retaliate-x))
* **Setup**: Cards with setup start the game in play. (**See**: Setup)
* **Stalwart**: Characters with Stalwart cannot be stunned or confused. (**See**: [Stalwart](#stalwart))
* **Steady**: A character with the steady keyword is not stunned or confused unless it has two stunned or confused status cards, respectively. (**See**: [Steady](#steady))
* **Surge**: After a player reveals a card with surge, that player reveals an additional encounter card. (**See**: [Surge](#surge))
* **Team-Up**: Cards with team-up cannot be played unless both characters listed by the keyword are in play. (**See**: [Team-Up](#team-up))
* **Teamwork (Trait)**: After a minion with teamwork enters play and engages a player, if there is at least one other minion that shares the specified trait in play, each minion that shares the teamwork keyword with the same specified trait activates against the player it is engaged with. (**See**: [Teamwork (Trait)](#teamwork-trait))
* **Temporary**: A card with temporary must be discarded from play at the end of the round. (**See**: [Temporary](#temporary))
* **Toughness**: When a character with toughness enters play, place a tough status card on it. (**See**: [Tough](#tough)/[Toughness](#toughness))
* **Uses (X “type”)**: When a card with uses enters play, place X all-purpose counters from the token pool on that card. After the last all-purpose counter is removed from a card with uses (and the effect resolves), discard that card. (**See**: [Uses (X “type”)](#uses-x-type))
* **Victory X**: When a card with victory X is defeated, add it to the victory display. (**See**: [Victory X](#victory-x))
* **Villainous**: When a minion with villainous activates, give it a boost card. (**See**: [Villainous](#villainous))

### LASTING EFFECTS

Some card abilities create effects or conditions that affect the game for a specified duration *(such as “until the end of the phase” or “until the end of this attack”)*. Such effects are known as lasting effects.

For the specified duration of a lasting effect, treat the effect as if it was a constant ability.

* A lasting effect persists beyond the resolution of the ability that created it, for the duration specified by the effect. The effect continues to affect the game for the specified duration whether or not the card that created the lasting effect is in play.
* If a card enters play *(or changes status to meet the criteria of a specified set of affected cards)* after the creation of a lasting effect, it is still affected by that lasting effect.
* A lasting effect expires as soon as the timing point specified by its duration is reached. This means that an “until the end of the round” lasting effect expires just before an “at the end of the round” ability or delayed effect may initiate.
* A lasting effect that expires at the end of a specified time period can only be initiated during that time period.

**See also**: [Ability](#ability), [Enters Play](#enters-play)

### LEAVES PLAY

The phrase “leaves play” refers to any time when a card transitions from an in-play area to an out-of-play area. Defeating a character, discarding a card from play, placing a card in the victory display, or removing a card from the game are all different means by which a card can leave play.

* When a card leaves play, there is no memory of its previous state and it is considered to be a new copy of the card.
* Cards attached to a card that leaves play are discarded.

**See also**: [Defeat](#defeat), [Discard](#discard), [Discard Pile](#discard-pile), [Enters Play](#enters-play), [In Play and Out of Play](#in-play-and-out-of-play), [Removed from the Game](#removed-from-the-game), [Victory Display](#victory-display)

### LIMIT

“Limit X per [period]” is a limit that appears on some player cards. These limits are card-specific. Each copy of an ability with such a limit may be used X times per the specified period, per instance of that ability.

* If an effect with a limit is canceled, the card is still considered to have been played or the ability initiated, and it counts toward the limit.

**See also**: [Player Card](#player-card)

### LOOK, LOOKED-AT

If an ability instructs a player to look at cards that are otherwise hidden from the players, only the player who is resolving the ability can look at those cards. However, that player is permitted to convey any amount of information related to those cards to other players.

* While a player is looking at cards in a deck, those cards are still considered part of that deck.
  * After looking at cards in a deck, those cards are returned to that deck in the same order.

### MAIN SCHEME, MAIN SCHEME DECK

Main scheme is an encounter card type. The main scheme represents the villain’s primary objective.

* During step one of the villain phase, place the amount of threat indicated in the main scheme’s acceleration field *(bottom-right corner)* on that scheme. This value is modified by all active acceleration tokens and icons.
* If the amount of threat on a main scheme is equal to or greater than its target threat value, that main scheme is completed and the main scheme deck advances.
  * **If the villain completes the final stage of the main scheme deck, the villain wins the game.**
  * If the main scheme advances other than through having threat on it equal to or greater than its target threat value, that main scheme is **not** considered completed.
* When the main scheme deck advances, follow these steps:
  1. Remove the top main scheme card from the game. Return all tokens (except acceleration tokens) that were on that card to the token pool and discard each card attached to it.
  2. Resolve any “**When Revealed**” ability on the “A” side of the new top card of the main scheme deck.
  3. Flip the top card of the main scheme deck to its “B” side and resolve any “**When Revealed**” ability on that side of the card.
* When the main scheme deck advances, excess threat from the previous stage does not carry over to the new stage.
* When the main scheme deck advances, acceleration tokens on it carry over to the new stage.
* Main scheme cards cannot be discarded from play.

**See also**: [Acceleration Icon](#acceleration-icon), [Acceleration Token](#acceleration-token), [Card Types](#card-types), [Encounter Card](#encounter-card), [Removed from the Game](#removed-from-the-game), [Target Threat](#target-threat), [Threat](#threat), [Villain](#villain-villain-deck), [Villain Phase](#villain-phase)

### MAX

“Max X per [period]” imposes a maximum across all copies of a card *(by title)* for all players. Generally, this phrase imposes a maximum number of times that copies of that card can be played during the designated time period.

If a maximum appears as part of an ability, it imposes a maximum number of times that the ability can be initiated from all copies *(by title)* of cards bearing that ability *(including itself)* during the designated period.

* If an effect with a maximum is canceled, the card is still counted toward the maximum.

“Max X per deck” is restricts the number of copies of that
card that may be included in each player deck.

“Max 1 per player” is player specific, and restricts the number of copies of that card that each player may control in play at a given time.

**See also**: [Appendix I: Deck Customization](#appendix-i-deck-customization)

### MAXIMUM HIT POINTS

A character’s maximum hit points is their base hit points plus or minus all “gets” hit point modifiers that are active on that character.

**See also**: [Ally](#ally), [Base Value](#base-value), [“Gets”](#gets), [Hit Points](#hit-points), [Identity](#identity), [Minion](#minion), [Modifiers](#modifiers), [Villain](#villain-villain-deck)

### MAY

The word “may” indicates that a specified player has the option to resolve the text that follows. If no player is specified, the option is granted to the controller of the card with the ability in question.

**See also**: [Player](#player)

### MENTAL RESOURCE

A mental resource is one of the four types of resources.

* Mental resources can be spent to pay the resource cost of cards and abilities.
* Some card abilities specifically require mental resources to be spent in order to resolve their effects.

**See also**: [Ability](#ability), [Cost](#cost), [Energy Resource](#energy-resource), [Icons](#icons), [Physical Resource](#physical-resource), [Resource](#resource), [Wild Resource](#wild-resource)

### MINION

Minion is an encounter card type. Minions represent supporters of the villain and/or enemies of the heroes.

If a minion enters play, it engages the player who is revealing the card from the encounter deck or resolving the ability that put the minion into play, unless an ability specifies otherwise.

* If a minion enters play, it remains in play until a card ability or game effect causes it to leave play.
* If a minion has zero or fewer remaining hit points, it is defeated and discarded.
* Minions engaged with a player activate *(one minion at a time and in an order of the engaged player’s choosing)* during step two of the villain phase, after the villain activates. If the engaged player is in hero form, these minions attack. If the engaged player is in alter-ego form, these minions scheme.
* If a minion engages a player during an enemy activation in which all minions engaged with that player are instructed to activate *(such as through a “**Boost**” ability during step two of the villain phase)*, the newly-engaged minion will also activate.

**See also**: [Card Types](#card-types), [Encounter Card](#encounter-card), [Engage](#engage), [Enters Play](#enters-play), [Form](#form-change-form), [Hit Points](#hit-points), [Identity](#identity), [Leaves Play](#leaves-play), [Player](#player), [Player’s Play Area](#players-play-area), [Villain](#villain-villain-deck), [Villain Phase](#villain-phase)

### MODES OF PLAY

Before starting a game of ***Marvel Champions***, players can customize their experience by choosing from or combining different modes of play. The modes of play are:

**Standard Mode** — Standard Mode is the basic mode of play for all scenarios.

* To play in Standard Mode, follow the content and setup instructions for the chosen scenario.

**Expert Mode** — Expert Mode is a modification of standard mode for advanced players who seek a greater challenge.

* To play a standard game modified by expert mode, follow the content and setup instructions for the chosen scenario, using the listed expert mode villain stages, and add the Expert encounter set to encounter deck.
* Expert mode can also be combined with heroic mode, skirmish mode, and/or campaign mode.

**Heroic Mode** — Heroic mode is a modification of standard mode that allows players to scale the difficulty of the game.

* To play a standard game modified by heroic mode, before the game begins, the player group chooses a heroic level number *(such as heroic level 1 or 4)*. Then, for the remainder of that game, during step three of each villain phase, deal X additional encounter cards to each player, where X is equal to the chosen heroic level number.
* Heroic mode can also be combined with expert mode, skirmish mode, and/or campaign mode.

**Skirmish Mode** — Skirmish mode *(also sometimes called Rookie Mode)* is a modification of standard mode that allows players to shorten the length of the game.

* To play a standard game modified by skirmish mode, before the game begins, the player group chooses any one version of the villain. During step eight of game setup *(Select Villain)*, put only the chosen version of the villain into play and remove each other version in the villain deck from the game.
* Skirmish mode can also be combined with expert mode, heroic mode, and/or campaign mode.

**Campaign Mode** — Campaign mode allows players to modify standard mode through interconnected scenarios that are played one after another. No two campaigns are exactly alike, and the rules for each are found in the campaign’s associated rulebook.

* Expert campaign mode is a modification of campaign mode for advanced players who seek a greater challenge. The rules for each expert campaign mode are found in the campaign’s associated rulebook.
* Each campaign comes with its own campaign log. The campaign log is a record of what effects or cards persist between games in a campaign.
* If a card is removed from a campaign, that card can no longer be used during the rest of the campaign, even if players retry the scenario wherein that card was removed.
* During campaign mode or expert campaign mode, players can choose which other mode(s) they wish to play for each individual scenario. The difficulty of the campaign mode does not require players to play any other specific game mode.
* Campaign mode *(and expert campaign mode)* can also be combined with expert mode, heroic mode, and/or skirmish mode.

**See also**: [Campaign-Specific Card](#campaign-specific-card), [Expert Set](#expert-set), [Standard Set](#standard-set)

### MODIFIERS

The game constantly checks and *(if necessary)* updates the count of any variable quantity that is being modified.

Any time a new modifier is applied or removed, the entire quantity is recalculated from the start, considering the unmodified base value and all active modifiers.

* The calculation of a value treats all modifiers as being applied simultaneously. However, while performing the calculation, all additive and subtractive modifiers are calculated before doubling and/or halving modifiers are calculated.
* If a value is “set” to a specific number, the set modifier overrides all non-set modifiers. If multiple set modifiers are in conflict, the most recently resolved set modifier takes precedence.
* After all active modifiers have been taken into account, if a value is below zero, it is treated as zero: a card cannot have “negative” icons, attributes, traits, cost, or keywords.
* Fractional values are rounded up after all modifiers have been applied.

**See also**: [Base Value](#base-value), [Printed](#printed)

### MODULAR ENCOUNTER SET

Cards belonging to a “modular encounter set” *(or sometimes “modular set”)* are a classification of encounter card that can be added to and/or removed from nearly any scenario.

* During game setup, many scenarios will instruct the players on how many modular encounter sets must be included in that scenario. Depending on the scenario, some modular encounter sets are required, while others can be chosen by the players.
* If a modular encounter set is added to a scenario, it is done so as an entire set. Unless specific scenario rules state otherwise, individual cards from a modular encounter set cannot be included in a scenario without the rest of that set.
* A modular encounter set card is designated by the modular encounter set’s name with which it is associated printed at the bottom of the card in its encounter set name area.

**See also**: [Classifications](#classifications), [Appendix I: Deck Customization](#appendix-i-deck-customization)

### MOVE

Some abilities allow players to move game elements, such
as cards, damage, or threat.

* When an element moves, it cannot move to its same *(current)* placement.
* If there is no valid source or destination for a move, the move cannot be made.
* It is possible for damage to move between dials and cards *(and vice versa)*.
  * If damage is moved from a dial to a card, increase the hit points tracked by the dial by the specified amount *(no higher than the card’s maximum hit points)*, and place the same amount of damage on the card.
  * If damage is moved from a card to a dial, remove damage from the card and reduce the dial by the same amount.
* If damage is moved to a character, the moved damage is considered to be dealt to that character.
* If threat is moved to a scheme, the moved threat is considered to be placed to that scheme.

**See also**: [Game Element](#game-element)

### NEMESIS ENCOUNTER SET

Each identity in the game comes with an associated nemesis encounter set. At the start of the game, each player sets aside the cards from their associated nemesis set, out of play. Cards drawn from the encounter deck may instruct the player on how to bring their nemesis set into play.

* A nemesis encounter set is a subset of an identity-specific set.
* A nemesis set cards may only be used alongside an identity if those cards share a set icon with that identity.

**See also**: [Identity](#identity), [Identity-Specific Card](#identity-specific-card), [In Play and Out of Play](#in-play-and-out-of-play), [Player](#player)

### NON-NUMERICAL VARIABLE

If a non-numerical variable *(such as a letter or other symbol)* is used in place of a numerical value, treat that variable as being equal to 0 for the purpose of game steps, game functions, and card abilities.

If a non-numerical variable is defined to have a numerical value *(such as a card ability assigning a value to ‘X’)*, treat that variable as the defined value.

* For costs involving the letter X, the value of X is defined by card ability or player choice, after which the amount paid may be modified by effects without changing the value of X.

**See also**: [Base Value](#base-value), [Dash (Value)](#dash-value), [Printed](#printed), [Star Icon](#star-icon)

### OBLIGATION

Obligation is an encounter card type that represents a commitment or obstacle that an identity’s alter-ego might have to face or overcome.

* Each identity is associated with one or more obligation cards. If an identity is being played, all of that identity’s associated obligation cards are shuffled into the encounter deck during setup.
* Identity-specific obligation cards are part of their associated identity’s identity-specific set.
* Identity-specific obligation cards can only be used alongside an identity if those cards share a set icon with that identity.

If an obligation card is revealed from the encounter deck and that obligation instructs that it must be given to a specific player *(such as “Give to the Peter Parker player”)*, place that obligation into the player’s play area who controls the associated identity. That player must decide how to resolve the obligation.

* If the identity associated with a revealed obligation card has been eliminated, ignore the card’s ability, remove it from the game, and reveal an additional encounter card.

If a player reveals an obligation card from the encounter deck and that obligation does not instruct that it must be given to a specific player, the player places that obligation into their play area. That player must decide how to resolve the obligation.

* Only the player with the obligation in their play area can trigger abilities or pay costs on that obligation.

If a player draws an obligation card from their player deck, they place that obligation into their play area.

* The player does not draw a card to replace the obligation unless they are refilling their hand to their hand size.

**See also**: [Card Types](#card-types), [Encounter Card](#encounter-card), [Encounter Deck](#encounter-deck), [Enters Play](#enters-play), [Form](#form-change-form), [Identity](#identity), [Leaves Play](#leaves-play), [Player](#player), [Player Elimination](#player-elimination), [Removed from the Game](#removed-from-the-game)

### “OTHERWISE”

Effects beginning with “otherwise” resolve only if the preceding effect could not be resolved.

* If the preceding effect cannot be at least partially resolved, the otherwise effect will resolve.

**See also**: [Replacement Effect](#replacement-effect)

### OVERKILL

If an ally is dealt any amount of excess damage by an attack with the overkill keyword, simultaneously deal damage equal to the excess amount to the identity of the player who controls the ally.

If a minion is dealt any amount of excess damage by an attack with the overkill keyword, simultaneously deal damage equal to the excess amount to the villain.

* Damage dealt by overkill to an identity or villain is considered damage from an attack, but does not constitute an attack against that character.
* If a card ability counts excess damage dealt, that ability counts the same value of excess damage that is calculated when resolving the overkill keyword.
* When an ally or minion with a tough status card is dealt excess damage by an attack with the overkill keyword, overkill damage is **not** dealt to the identity of that ally’s controller or to the villain, respectively.

**See also**: [Ally](#ally), [Attack (Enemy Activation)](#attack-enemy-activation), [Attack (Player Action)](#attack-player-action), [Damage](#damage), [Hit Points](#hit-points), [Identity](#identity), [Keywords](#keywords), [Minion](#minion), [Reminder Text](#reminder-text), [Villain](#villain-villain-deck)

### “OVERPAY”

**See**: [Cost](#cost)

### OWNERSHIP AND CONTROL

A card’s owner is the player whose deck contained the card at the start of setup. The scenario is considered to be the owner of the encounter deck and each encounter card.

* Cards enter play under their owner’s control. Encounter cards are considered to be under the control of the scenario.
  * Upgrades attached to a card controlled by a player other than the upgrade’s owner are controlled by that other player.
  * When a player takes control of a campaign-specific or scenario-specific player card *(such as an ally, support, or upgrade)*, that player becomes the owner of that card until the game ends or another player takes control of that card.
* Control of a card remains constant unless an ability explicitly causes the card to change control.
* A player controls the cards in their own out-of-play areas *(such as the hand, the deck, and the discard pile)*.
* If a card that has changed control leaves play, after the resolution of the game occurrence that makes it leave play, the card is physically placed in its owner’s equivalent out-of-play area *(hand, deck, or discard pile, or removed from the game if that player is no longer in the game)*. Other card abilities cannot interact with this secondary physical placement.
* If a character changes control while it is in play, it remains in the same state *(i.e., readied or exhausted, damaged or not, etc.)* and is moved to its new controller’s play area.
* Upgrades or attachments on a card that changes control also change control to the same new controller.
* Unless a duration is specified, a control change persists as long as the card remains in play.
* If a game step or card ability references a card that “you control” or a “player controls,” that game step or card ability only refers to cards in play currently under that player’s control.

**See also**: [Classifications](#classifications), [Encounter Card](#encounter-card), [Encounter Deck](#encounter-deck), [In Play and Out of Play](#in-play-and-out-of-play), [Player](#player), [Player Card](#player-card), [Player Deck](#player-deck), [Player’s Play Area](#players-play-area), [Villain’s Play Area](#villains-play-area)

### PATROL

While a minion with the patrol keyword is engaged with a player, that player cannot use cards they control to thwart the main scheme.

**See also**: [Engage](#engage), [Keywords](#keywords), [Main Scheme](#main-scheme-main-scheme-deck), [Minion](#minion), [Reminder Text](#reminder-text), [Thwart](#thwart)

### “PAY”

**See**: [Cost](#cost)

### PER PLAYER ICON

The Per Player icon next to a value multiplies that value by the number of players who started the scenario.

* If a player is eliminated, this value does not change.

**See also**: [Icons](#icons), [Player Elimination](#player-elimination)

### PERIL

While a player is resolving a card with the peril keyword, that player cannot consult other players, and other players cannot play cards or trigger abilities.

**See also**: [Ability](#ability), [Keywords](#keywords), [Player](#player), [Reminder Text](#reminder-text), [Table Talk](#table-talk), [Triggered Ability](#triggered-ability)

### PERMANENT

A card with the permanent keyword cannot be defeated, leave play, or have any part of its text box blanked, except by card abilities in the same set *(hero set, scenario set, or modular set)*. For example, an ability on a hero card can cause a permanent card within that hero’s set to leave play.

* Permanent cards are set aside at the start of step 1 of setup.
* Permanent cards do not count towards a player’s minimum or maximum deck size.
* Permanent cards are not valid targets for card effects that would cause the permanent card to leave play.
  * If a permanent card would be targeted by such an effect *(for example, “discard the lowest-cost support you control”)*, that effect instead targets the non-permanent card that fits its criteria.
* If a player is eliminated from the game while a permanent card they do not own is in their play area, place that permanent card in its owner’s discard pile.

**See also**: [In Play and Out of Play](#in-play-and-out-of-play), [Keywords](#keywords), [Leaves Play](#leaves-play), [Ownership and Control](#ownership-and-control), [Reminder Text](#reminder-text)

### PIERCING

An attack with the piercing keyword discards any tough status cards from the attacked character before dealing damage.

**See also**: [Attack (Enemy Activation)](#attack-enemy-activation), [Attack (Player Action)](#attack-player-action), [Damage](#damage), [Keywords](#keywords), [Reminder Text](#reminder-text), [Status Cards](#status-cards), [Target](#target), [Tough](#tough)

### PHYSICAL RESOURCE

A physical resource is one of the four types of resources.

* Physical resources can be spent to pay the resource cost of cards and abilities.
* Some card abilities specifically require physical resources to be spent in order to resolve their effects.

**See also**: [Ability](#ability), [Cost](#cost), [Energy Resource](#energy-resource), [Icons](#icons), [Mental Resource](#mental-resource), [Resource](#resource), [Wild Resource](#wild-resource)

### PLAY, PUT INTO PLAY

Playing a card involves paying the card’s cost and placing the card in the play area. This causes the card to enter play *(or, in the case of an event card, to resolve its ability and be placed in the discard pile)*. Cards are played from a player’s hand.

Some abilities cause cards to be put into play. This bypasses the need to pay the card’s cost as well as any restrictions or prohibitions regarding playing that card. A card that is put into play enters play in its controller’s play area.

* When an event card is played, place it on the table, resolve its ability, and place the card in its owner’s discard pile.
* A card that is put into play is not considered to have been played.
* When a card is put into play, its resource cost is ignored.
* Unless otherwise stated by the “put into play” effect, cards that are put into play must do so in a play area or state that matches the rules of playing the card.

**See also**: [Enters Play](#enters-play), [In Play and Out of Play](#in-play-and-out-of-play), [Initiating Abilities](#initiating-abilities), [Leaves Play](#leaves-play), [Play Restrictions and Permissions](#play-restrictions-and-permissions)

### PLAY AREA

There are two types of play areas: a player’s play area and
the villain’s play area.

* A player’s play area contains that player’s identity, deck, hand, discard pile, any cards in play under their control, and any faceup or facedown encounter cards in their play area *(such as engaged minions or encounter cards that have been dealt to them)*.
* The villain’s play area contains the villain deck, main scheme deck, encounter deck, encounter discard pile, and any encounter cards in play that have not entered a player’s play area *(such as side schemes or environments)*.
* A card cannot be in more than one play area at a time.

**See also**: [In Play and Out of Play](#in-play-and-out-of-play), [Player’s Play Area](#players-play-area), [Villain’s Play Area](#villains-play-area)

### PLAY RESTRICTIONS AND PERMISSIONS

Many cards and abilities contain specific instructions pertaining to when or how they may or may not be used, or to specific conditions that must be true in order to use them.

* In order to use an ability or play a card, all of its play restrictions must be observed.
* A permission is an optional play restriction, which allows a player to play a card or use an ability outside the timing or specifications provided by the game rules. For example, a permission might allow an ally card to be played from a player’s discard pile.

**See also**: [Ability](#ability), [Play](#play-put-into-play), [Player](#player)

### PLAYER

A player is a person who is playing in a game of ***Marvel Champions***.

* Each player in the game has their own personal play area containing their identity card, their identity’s hit point dial, their hand of cards, their deck that they draw from, their discard pile that they place their discarded cards into, any allies, upgrades, or supports that they may have in play, and any attachments, minions, or obligations that they may have in their play area.
* During each player phase of each round, each player takes their own personal turn where they can play cards, perform actions with cards they control, and use various abilities.
* Each player owns the cards that were contained within their deck *(including their identity card)* at the start of the game.
* Some game steps, game functions, or card abilities may refer to the “first player”. The first player is the player who has the first player token.

**See also**: [Discard](#discard), [Discard Pile](#discard-pile), [Find](#find), [Identity](#identity), [In Play and Out of Play](#in-play-and-out-of-play), [Player Deck](#player-deck), [Player Elimination](#player-elimination), [Player Phase](#player-phase), [Player Turn](#player-turn), [Player’s Play Area](#players-play-area), [You](#you-your)

### PLAYER CARD

There are six player card types: ally cards, event cards, identity cards, resource cards, support cards, and upgrade cards.

* Player cards may belong to various classifications, such as identity-specific player cards or aspect player cards.
* Most player cards have a blue card back.

**See also**: [Ally](#ally), [Classifications](#classifications), [Event](#event), [Identity](#identity), [Resource Card](#resource-card), [Support](#support), [Upgrade](#upgrade), [Appendix I: Deck Customization](#appendix-i-deck-customization)

### PLAYER DECK

A player’s deck contains the player cards *(allies, events, resources, supports, and upgrades)* owned by the player who started the game with that deck.

* The order of cards within a player’s deck cannot be changed unless a player is instructed to do so by a game step, game function, or card ability.

If a player deck empties, the player shuffles their discard pile to make a new deck. That player immediately deals themself one facedown encounter card from the top of the encounter deck.

* If the player’s deck empties and reshuffles while the player was drawing cards, the player continues to draw cards up to the specified number.
* If the player’s deck empties while the player was discarding cards from their deck, no further cards are discarded from the newly shuffled deck.

**See also**: [Discard](#discard), [Discard Pile](#discard-pile), [Draw](#draw-drawing-cards), [Encounter Deck](#encounter-deck), [Shuffle](#shuffle)

### PLAYER DISCARD PILE

**See**: [Discard Pile](#discard-pile)

### PLAYER ELIMINATION

A player is eliminated from the game if their identity is defeated. This usually occurs when the character’s remaining hit points are reduced to zero.

When a player is eliminated, perform the following in order:

1. If the eliminated player has the first player token, they pass it to the next clockwise player.
2. If there are minions engaged with the eliminated player, each of those minions engages the next clockwise player, retaining any attachments, damage, counters, and status cards on them.
3. If there are cards in the eliminated player’s play area that are not owned by that player, place each of those cards in its owner’s discard pile *(even if that card has the permanent keyword)*.
4. Remove the eliminated player’s play area and each other game element within *(hand, deck, discard pile, cards in play, hit point dial, etc.)* from the game.

When a player is eliminated, the remaining players continue to play the game. Eliminated players no longer participate in the game but are considered to win or lose along with the rest of the group, depending on how they finish.

* If all players are eliminated, the game ends and the players lose.

If a player is eliminated partway through the resolution of an ability, resolve the entire ability.

**See also**: [Ability](#ability), [Deal](#deal-deal-an-encounter-card), [Engage](#engage), [Game Element](#game-element), [Hit Points](#hit-points), [Identity](#identity), [Minion](#minion), [Per Player Icon](#per-player-icon), [Player](#player), [Player Card](#player-card), [Player Deck](#player-deck), [Player’s Play Area](#players-play-area), [Winning the Game](#winning-the-game)

### PLAYER PHASE

During the player phase, each player *(in player order)* takes one turn.

After each player has taken a turn, the players discard down or draw up to their hand size and ready all cards they control.

* Effects that last “until the end of the [player] phase” end after players draw up to their hand size and ready all cards they control. Then, effects that resolve “when/after the player phase ends” are resolved.

**See also**: [End of Player Phase](#end-of-player-phase), [In Player Order](#in-player-order), [Player](#player), [Player Turn](#player-turn)

### PLAYER TURN

During their turn, a player may perform the following options, in any order. Each option, except “change form,” may be performed as many times as the player is able, so long as they are able to pay the required costs.

* **Change form** from hero to alter-ego, or from alter-ego to hero. **This option may only be performed once each turn.**
* **Play** an ally, upgrade, or support card from hand.
* **Use** their alter-ego’s basic recovery *(if in alter-ego form)* or their hero’s basic attack or thwart power *(if in hero form)*.
* **Use** an ally card they control in play to attack an enemy or thwart a scheme.
* **Trigger** an “**Action**” card ability on a card in play they control, on an encounter card in play, or by playing an event card with such a timing trigger from their hand. If the action ability is preceded by “Hero” or “Alter-Ego”, the player must be in the specified form in order to trigger the ability.
* **Ask** another player to trigger an “**Action**” ability on a card in play they control or on an event card they might have in hand. The other player then decides whether or not to trigger the ability. *(Another player may offer to use an action during the active player’s turn, as well.)*

**See also**: [Ally](#ally), [Basic Power](#basic-power), [Encounter Card](#encounter-card), [Event](#event), [Form](#form-change-form), [Ownership and Control](#ownership-and-control), [Play](#play-put-into-play), [Player](#player), [Player Phase](#player-phase), [Support](#support), [Triggered Ability](#triggered-ability), [Upgrade](#upgrade)

### PLAYER’S PLAY AREA

A player’s play area *(also sometimes referred to as a “player’s game area”)* is the area of play where a player’s identity card, deck, hand, discard pile, and hit point dial are located. Each player in the game has their own play area.

* Ally cards, support cards, and upgrade cards are placed in a player’s play area when they enter play.
* Attachment cards attached to cards in the villain’s play area are not in the player’s play area.
* Minion cards engaged with a player are in that player’s play area and not in the villain’s play area.
* Obligation cards given to a player are in that player’s play area and not in the villain’s play area. * While card abilities can affect cards across play areas, unless a game rule or card ability states otherwise, cards cannot be played into another player’s play area.
* If a player is eliminated from the game *(through their identity being defeated, or otherwise)*, their play area is removed from the game.

**See also**: [Ally](#ally), [Discard Pile](#discard-pile), [Identity](#identity), [In Play and Out of Play](#in-play-and-out-of-play), [Minion](#minion), [Obligation](#obligation), [Player Deck](#player-deck), [Player Elimination](#player-elimination), [Support](#support), [Upgrade](#upgrade)

### PLAYING CARDS

**See**: [Initiating Abilities](#initiating-abilities)

### PREVENT

Some card abilities prevent damage or threat.

* When damage is prevented, reduce the amount of damage the target takes *(i.e. the amount of damage that is placed on the target)*.
  * When an effect prevents damage dealt to a character, the amount of damage that character “takes” is reduced, but the amount of damage “dealt” is not reduced.
  * If an effect prevents all damage dealt to a character, that character is not considered to have taken damage.
  * If all damage from an attack is prevented, the attacking character is considered to have dealt damage, but is not considered to have “attacked and damaged” the attacked character.
  * If dealing damage is a cost, that cost is considered paid even if some or all of that damage is prevented.
  * If taking damage is a cost, that cost is not considered paid unless all of that damage was taken. *(If any of the damage is prevented, then the cost has not been paid.)*
* When threat is prevented, reduce the amount of threat being assigned before it is placed on the scheme.

**See also**: [Ability](#ability), [Damage](#damage), [Scheme (Card Type)](#scheme-card-type), [Target](#target), [Threat](#threat)

### PRINTED

The word “printed” refers to the text, characteristic, or value that is physically printed on the card.

**See also**: [Base Value](#base-value), [Modifiers](#modifiers)

### QUALIFIERS

If ability text includes a qualifier followed by multiple terms, the qualifier applies to each item in the list, if applicable. *For example, in the phrase “each ready character and attachment” the word “ready” applies to both “character” and “attachment.”*

### QUICKSTRIKE

After a minion with the quickstrike keyword engages a player whose identity is in hero form, that minion attacks that player.

**See also**: [Attack (Enemy Activation)](#attack-enemy-activation), [Engage](#engage), [Form](#form-change-form), [Keywords](#keywords), [Minion](#minion), [Player](#player), [Reminder Text](#reminder-text)

### RANGED

An attack with the ranged keyword ignores the retaliate keyword.

**See also**: [Attack (Enemy Activation)](#attack-enemy-activation), [Attack (Player Action)](#attack-player-action), [Keywords](#keywords), [Reminder Text](#reminder-text), [Retaliate X](#retaliate-x)

### READY

Cards enter play in a ready state, positioned so that their controller can read their text from left to right.

* If a player is instructed to ready an exhausted card, the card is returned to its ready state.

**See also**: [Enters Play](#enters-play), [Exhausted](#exhausted)

### REC

**See**: [Basic Power](#basic-power), [Recover](#recover)

### RECOVER

Recover is a basic power a player can use in alter-ego form. To recover, the player exhausts their alter-ego and heals a number of hit points equal to their REC value.

**See also**: [Basic Power](#basic-power), [Form](#form-change-form), [Heal](#heal), [Hit Points](#hit-points), [Identity](#identity)

### REFERENTIAL ABILITY

Some abilities refer to specific cards by name. These are
called referential abilities.

* If an ability references the name of the card that the ability is on, that ability is self-referential. A self-referential ability refers only to the card on which it is located and not to other copies of that card or different cards with the same title.
* If an ability on an identity-specific card references the name of the identity to which it belongs, it is referencing only that identity and not other cards that may share a name with that identity.
* If a non-self-referential, non-identity-specific card references a card and there are multiple cards in play with that name, the player resolving that ability may choose which card with that name becomes the target of that ability.

**See also**: Ability, Character, Classifications, Identity, Identity-Specific Card

### REMAINING HIT POINTS

A character’s remaining hit points is the amount of damage that character can take before reaching zero hit points.

* An identity’s or villain’s hit point dial represents their remaining hit points.
* To calculate remaining hit points for an ally or minion, start with the character’s maximum hit points *(as indicated by its printed value modified by any card abilities or game effects)*, and subtract their sustained damage *(the number of damage counters on them)*.

**See also**: [Hit Points](#hit-points), [Identity](#identity), [Sustained Damage](#sustained-damage), [Villain](#villain-villain-deck)

### REMINDER TEXT

Some card abilities may include reminder text. Reminder text is italicized and in parentheses *(like this)*. Reminder text has no effect on the game and is only intended to remind a player of a specific game function or rule.

### REMOVED FROM THE GAME

A card that has been removed from the game is set aside and does not interact with the game in any manner for the duration of its removal. If there is no specified duration, a card that has been removed from the game is considered removed until the end of the game.

* “Removed from the game” is an out-of-play state.

**See also**: [In Play and Out of Play](#in-play-and-out-of-play), [Leaves Play](#leaves-play)

### REPLACEMENT EFFECT

A replacement effect is an effect that replaces the handling of one resolution with a different means of handling that resolution. Most replacement effects are interrupt abilities in the format of “when [triggering condition] would happen, do [replacement effect] instead.” After all responses to the original triggering condition have resolved and it is time to resolve the triggering condition itself, the replacement effect resolves instead.

* If multiple replacement effects are initiated against the same triggering condition, the most recent replacement effect is the one that is used for the resolution of the triggering condition.

**See also**: [Ability](#ability), [Alteration Effect](#alteration-effect), [“Otherwise”](#otherwise), [Triggered Ability](#triggered-ability)

### REQUIREMENT (RESOURCES)

A card with the requirement keyword cannot be played unless each resource of the specified type is spent while paying for that card’s cost.

* A card with the requirement keyword cannot be played “ignoring its resource cost” because the required resources cannot be paid for it.

**See also**: [Cost](#cost), [Initiating Abilities](#initiating-abilities), [Keywords](#keywords), [Resource](#resource)

### RESOURCE

Resources are used to pay the cost to play cards and to pay certain ability costs.

* A player can generate resources to pay a cost by discarding cards from their hand to generate the resource or resources indicated at the bottom-left corner of the card, or by using card abilities that generate resources.
* There are four types of resources in the game: energy, mental, and physical, and wild. Wild resources can be used as their type or any of the other types.
* To pay the cost of playing a card, a number of resources equal to *(or greater than)* the card’s cost must be generated. For most cards, any type *(or mix of types)* of resources can be used to pay this cost.
* If an ability has a resource cost, a number of resources equal to or greater than this cost must be generated. Many abilities require specific resource types, and the specified types in the specified quantities must be generated in order to pay the cost of the ability.
* Excess resources generated toward any cost are lost, and do not carry over to future costs.

**See also**: [Cost](#cost), [Energy Resource](#energy-resource), [Icons](#icons), [Mental Resource](#mental-resource), [Physical Resource](#physical-resource), [Wild Resource](#wild-resource)

### RESOURCE ABILITY

A resource ability is a type of triggered ability, indicated by the bold “**Resource**” timing trigger.

* A resource ability can be triggered anytime the player who controls the ability is generating resources to pay a cost.
  * A resource ability that generates a resource only for a specific type of cost cannot be triggered when paying a cost not of that type. *(For example, a resource ability that generates a resource for an aspect card cannot be triggered when paying for a non-aspect card.)*

**See also**: [Cost](#cost), [Resource](#resource), [Triggered Ability](#triggered-ability)

### RESOURCE CARD

Resource cards are a player card type. Their primary function is to be discarded from a player’s hand to generate resources.

These cards generally provide more *(or more efficient)* resources than other card types when they are discarded from a player’s hand to generate resources.

* Some resource cards have card text that is active while using the card to generate resources.
* Resource cards are considered to be an extension of an identity. If a player spends a resource, that resource is also considered to be spent by that player’s identity.

**See also**: [Card Types](#card-types), [Energy Resource](#energy-resource), [Enters Play](#enters-play), [Icons](#icons), [Identity](#identity), [Leaves Play](#leaves-play), [Mental Resource](#mental-resource), [Physical Resource](#physical-resource), [Player](#player), [Player Card](#player-card), [Resource](#resource), [Wild Resource](#wild-resource)

### RESOURCE TYPE

**See**: [Resource](#resource)

### RESPONSE

A response ability is a type of triggered ability, indicated by the bold “**Response**” timing trigger. Response abilities may be executed after the specified triggering condition occurs, as described in the response’s ability text.

* Players can only trigger response abilities on cards they control or on encounter cards.
  * Players cannot trigger response abilities on obligations in other players’ play areas.
* Multiple responses may be executed from the same triggering condition, but each response may only be triggered once per occurrence of the triggering condition.
  * Multiple copies of a card with a response can each be triggered by the same triggering condition.
* A response opportunity occurs immediately after its triggering condition has been resolved. Opportunities to respond occur in player order until all players have passed consecutively.
* Once the opportunity to respond to a triggering condition has been passed consecutively by all players, further responses to that specific triggering condition cannot be used.

**See also**: [Ability](#ability), [Triggered Ability](#triggered-ability), [Triggering Condition](#triggering-condition)

### RESTRICTED

A player cannot have more than two cards with the restricted keyword in play under their control at the same time.

A player can play or put into play a restricted card even if they already control two restricted cards. However, if a player ever controls more than two restricted cards in play, they must immediately choose and discard from play restricted cards they control until they have only two in play.

**See also**: [Discard](#discard), [Keywords](#keywords), [Ownership and Control](#ownership-and-control), [Player](#player), [Reminder Text](#reminder-text)

### RETALIATE X

After a character with the retaliate X keyword is attacked, deal X damage to the attacker. *(X is the value next to the retaliate keyword.)*

* The character with retaliate X must survive the attack to deal this damage.
* The order of resolution for abilities surrounding the retaliate keyword are as follows:
  1. Abilities that trigger “after [character] takes any amount of damage...”
  2. Retaliate X
  3. Abilities that trigger “after [character] is attacked...” or “after [character] attacks [and damages]...”

**See also**: [Ally](#ally), [Attack (Enemy Activation)](#attack-enemy-activation), [Attack (Player Action)](#attack-player-action), [Damage](#damage), [Identity](#identity), [Keywords](#keywords), [Minion](#minion), [Reminder Text](#reminder-text), [Villain](#villain-villain-deck)

### REVEAL

During step four of the villain phase, each player *(in player order)* reveals and resolves all facedown encounter cards that have been dealt to them, one card at a time.

To reveal an encounter card, a player flips the card faceup and resolves the card, including any keywords and “**When Revealed**” effects. Resolve revealed encounter cards based on their card type, as follows. If the revealed card is:

* an **attachment**, it enters play attached to the element specified by its text.
* a **minion**, it enters play engaged with the player revealing the card.
* a **treachery**, its effects resolve and it is discarded.
* an **environment**, it enters play next to the villain.
* a **side scheme**, it enters play next to the main scheme.
* an **obligation**, it is given to the player specified by the card, if any. If no player is specified, the player who was dealt the card resolves it. That player puts the obligation into play in their play area and resolves its text.

If a player is instructed by card text to reveal an encounter card from the encounter deck or any other game area, this same resolution procedure applies.

**See also**: [Attachment](#attachment), [Choose (Game Element)](#choose-game-element), [Choose (Option)](#choose-option), [Deal](#deal-deal-an-encounter-card), [Encounter Card](#encounter-card), [Enters Play](#enters-play), [Environment](#environment), [In Player Order](#in-player-order), [Minion](#minion), [Obligation](#obligation), [Player](#player), [Side Scheme](#side-scheme), [Treachery](#treachery), [Villain Phase](#villain-phase)

### ROOKIE MODE

**See**: [Modes of Play](#modes-of-play)

### ROUND STRUCTURE

**See**: [Overview - Round Overview](#round-overview), [End of the Player Phase](#end-of-player-phase), [Player Phase](#player-phase), [Player Turn](#player-turn), [Villain Phase](#villain-phase)

### RUNNING OUT OF CARDS

**See**: [Encounter Deck](#encounter-card), [Player Deck](#player-deck)

### SCENARIO-SPECIFIC CARD

Cards in the “scenario-specific” classification are cards that belong to a scenario’s set of accompanying cards.

* A scenario must include each scenario-specific card associated with that scenario. The exact quantity of each card in that set is determined by the scenario.
* In most scenarios, the scenario-specific cards are separated into three decks: the villain deck *(comprised of that scenario’s villain cards)*, the main scheme deck *(comprised of that scenario’s main scheme cards)*, and the encounter deck *(comprised of that scenario’s attachment, environment, minion, side scheme, and treachery cards)*.
* A scenario-specific card is designated by the name of the scenario with which it is associated printed at the bottom of the card in its encounter set name area.

**See also**: Classifications, Main Scheme Deck, Villain Deck, Appendix I: Deck Customization

### SCH

**See**: [Basic Power](#basic-power), [Scheme (Enemy Activation)](#scheme-enemy-activation)

### SCHEME (CARD TYPE)

The word “scheme” denotes two different card types: main schemes and side schemes.

* If a card ability places threat on or removes threat from “a scheme,” the player resolving that ability chooses which scheme—main scheme or side schemes—that ability affects.

**See also**: [Main Scheme](#main-scheme-main-scheme-deck), [Side Scheme](#side-scheme)

### SCHEME (ENEMY ACTIVATION)

A scheme is a type of enemy activation. If an enemy is instructed to scheme, follow these steps:

1. If a villain, or a minion with the villainous keyword, is scheming, give it one facedown boost card from the encounter deck. *(If a minion without the villainous keyword is scheming, skip this step.)*
2. Resolve each of the scheming enemy’s boost cards, one at a time and in the order in which they were dealt, by doing the following:
  a. Flip the boost card faceup.  
  b. Resolve any “Boost” abilities, indicated by the star icon in the boost area. *(All other abilities on the boost card are ignored.)*  
  c. Increase the scheming enemy’s SCH value by one for each boost icon on the card.  
  d. Discard the boost card.  
  e. If the enemy has any boost cards remaining, repeat these steps with the next boost card.
3. Place threat on the main scheme equal to the scheming enemy’s modified SCH value.

**See also**: [Activation](#activation), [Boost](#boost-boost-icon), [Minion](#minion), [Modifiers](#modifiers), [Villain](#villain-villain-deck), [Villain Phase](#villain-phase), [Villainous](#villainous)

### SEARCH

When a player is instructed to search for a card, the player is permitted to look at each of the cards in the searched area.

If the player finds a card that satisfies the criteria of the search, the player adds that card to the game area indicated by the instructions on the search effect.

* If a player finds multiple cards that satisfy the criteria of a search, the player chooses among those options.
* Cards being searched are not considered to leave the searched area.
* If any portion of a deck is searched, upon completion of that game step, game function, or card ability, shuffle that entire deck.

**See also**: [Encounter Deck](#encounter-deck), [Find](#find), [Player Deck](#player-deck), [Shuffle](#shuffle)

### SET ASIDE, SET-ASIDE

Some game steps or card abilities instruct players to set aside specific cards. Set-aside cards are out of play and have no interaction with the game until they are referenced by instructions within the scenario or by a card ability.

**See also**: [Ability](#ability), [In Play and Out of Play](#in-play-and-out-of-play), [Appendix II: Setup](#appendix-ii-setup)

### SETUP (KEYWORD)

A card with the setup keyword begins the game in play.

**See also**: [Keywords](#keywords), [Reminder Text](#reminder-text), [Appendix II: Setup](#appendix-ii-setup)

### SHUFFLE

Shuffling is the game function of randomizing the contents of a deck.

* If a player is instructed to shuffle a deck, that deck must be randomized to the point where no player within the game can ascertain the order of the cards within that deck.
* Any time a deck is searched by a game step or card ability, that deck is shuffled after the game step or card ability completes its resolution.

**See also**: [Encounter Deck](#encounter-deck), [Player Deck](#player-deck), [Search](#search)

### SIDE SCHEME

Side scheme is an encounter card type that represents additional obstacles and distractions the heroes are confronted with.

If a side scheme is revealed, it enters play and is placed next to the main scheme deck in the villain’s play area.

* Each side scheme enters play with an amount of threat on it equal to the card’s starting threat value *(indicated at the bottom of the card)*.
* A side scheme remains in play until there is no threat on it *(which causes it to be defeated and discarded)*, or until a card ability removes it from play. *(Threat can be removed from side schemes by using the thwart power of heroes and allies, or by using card abilities.)*

**See also**: [Card Types](#card-types), [Defeat](#defeat), [Encounter Card](#encounter-card), [Enters Play](#enters-play), [Leaves Play](#leaves-play), [Main Scheme](#main-scheme-main-scheme-deck), [Threat](#threat), [Thwart](#thwart), [Villain’s Play Area](#villains-play-area)

### SIMULTANEOUS RESOLUTION

If two or more effects with the same bold timing trigger would resolve simultaneously, the first player determines the order in which the effects resolve.

**See also**: [“Each Player”](#each-player), [Find](#find), [Triggered Ability](#triggered-ability)

### SKIRMISH MODE

**See**: [Modes of Play](#modes-of-play)

### SPECIAL

A special ability is a type of triggered ability, indicated by the bold “Special” timing trigger. Special abilities may only be executed through the explicit instruction of another card ability.

**See also**: [Triggered Ability](#triggered-ability)

### STALWART

A character that has the stalwart keyword cannot be stunned or confused.

* If a character gains the stalwart keyword while they have a stunned and/or confused status card, each stunned and/or confused status card is removed from that character.

**See also**: [Ally](#ally), [Confuse](#confuse-confused), [“Gains”](#gains), [Identity](#identity), [Keywords](#keywords), [Minion](#minion), [Reminder Text](#reminder-text), [Status Cards](#status-cards), [Stun](#stun-stunned), [Villain](#villain-villain-deck)

### STANDARD MODE

**See**: [Modes of Play](#modes-of-play)

### STANDARD SET

The standard set is an encounter set that is added to most scenarios.

* The standard set is not a modular encounter set and cannot be selected *(by the players or randomly)* when a scenario requires players to choose a modular encounter set to include in that scenario.
* Cards in the “Standard” classification are any cards that have the word “Standard” printed by the bottom of the card in its encounter set name area.

**See also**: [Classifications](#classifications), [Appendix I: Deck Customization](#appendix-i-deck-customization)

### STAR ICON

A star icon is used in conjunction with a card’s stat or boost field to indicate that there is a mandatory ability in the text box that corresponds to that field. In and of itself, the star icon has no effect; it is merely a reminder to check the card’s text box whenever that field is used.

* If a star icon is located next to an enemy’s ATK or SCH value, the icon serves as a reminder to check that enemy’s text box whenever that enemy uses that value to attack or scheme.
* If a star icon is located in the ATK or SCH field of an attachment, the icon serves as a reminder to check that attachment’s text box whenever the attached enemy uses the value that field is modifying to attack or scheme.
* If a star icon is located next to an ally’s ATK or THW value, the icon serves as a reminder to check that ally’s text box whenever that ally uses that value to attack or thwart.
* If a star icon is located next to a hero’s ATK, THW, or DEF, or next to an alter-ego’s REC value, the icon serves as a reminder to check that character’s text box whenever they use that value to attack, thwart, defend, or recover.
* If a game step or ability references a power with the value of star, that value is treated as 0.
* If a star icon is located in an encounter card’s boost field, the icon serves as a reminder to check that card’s text box whenever that card is turned face up as a boost card during the villain’s activation.

**See also**: [Activation](#activation), [Ally](#ally), [Attachment](#attachment), [Basic Power](#basic-power), [Boost](#boost-boost-icon), [Identity](#identity), [Minion](#minion), [Non-Numerical Variable](#non-numerical-variable), [Villain](#villain-villain-deck)

### STATUS CARDS

Status card represent different states a character may find themselves in during the game.

The following status cards are used in the game. When a character is given a status card, take a status card of the specified type from the pool and place it on that character.

* A character cannot have more than one status card of each type at a time.
  * Characters with the steady keyword can have one additional confused status card and one additional stunned status card.
* Status card abilities have timing priority over all conflicting triggered abilities.

The three status card types are:

**Confused** — A confused status card prevents a character from thwarting or scheming. **See**: [Confuse](#confuse-confused), [Confused](#confuse-confused).
**Stunned** — A stunned status card prevents a character from attacking. **See**: [Stun](#stun-stunned), [Stunned](#stun-stunned).
**Tough** — A tough status card prevents a character from taking damage. **See**: [Tough](#tough).

**See also**: [Ally](#ally), [Attack (Enemy Activation)](#attack-enemy-activation), [Attack (Player Action)](#attack-player-action), [Basic Power](#basic-power), [Damage](#damage), [Form](#form-change-form), [Identity](#identity), [Minion](#minion), [Replacement Effect](#replacement-effect), [Triggered Ability](#triggered-ability), [Villain](#villain-villain-deck)

### STEADY

A character with the steady keyword can have one additional stun status card and one additional confuse status card. That character is not stunned unless they have two stunned status cards, and is not confused unless they have two confused status cards. After that character’s activation is replaced by a status card effect, remove all status cards of that type from that character.

**See also**: [Confuse](#confuse-confused), [Keywords](#keywords), [Status Cards](#status-cards), [Stun](#stun-stunned)

### STUN, STUNNED

Stun is a status that prevents a character from dealing damage with its next attack.

* If an ability “stuns” a character, give that character a stunned status card.
* A character is stunned if it has a stunned status card.
  * A character with the steady keyword is stunned only if it has two stunned status cards.
* If a character has an ability stating that it “cannot be stunned,” stunned status cards cannot be placed on that character.
* If a stunned identity or ally attempts to attack or use an attack ability, discard the stunned card instead. Costs associated with the attack attempt, including exhausting the character, must still be paid.
  * A stunned character can attempt to attack or use an attack ability even if there are no enemies that can be attacked.
* If a stunned villain or minion would attack, discard the stunned status card instead.
* As the attack action or attack activation was replaced by the removal of the stunned status card, that character is not considered to have attacked.

**See also**: [Ally](#ally), [Identity](#identity), [Minion](#minion), [Status Cards](#status-cards), [Villain](#villain-villain-deck)

### SUBTITLE

Some ally cards have a subtitle beneath the title. A subtitle represents an alternate alias a character sometimes uses.

**See also**: [Unique Icon](#unique-icon)

### SUPPORT

Support is a player card type that represent locations, backline supporters or friends, and other behind-the-scenes elements a hero or alter-ego might have at their disposal.

* Support cards enter play in the back row of a player’s play area.
* A support card is active while it is in play, and it remains in play until a card ability causes it to leave play.
* Attacks, thwarts, defenses, action abilities, and triggered abilities that resolve from supports in play under a player’s control are not considered to be performed by that player’s identity.

**See also**: [Card Types](#card-types), [Enters Play](#enters-play), [In Play and Out of Play](#in-play-and-out-of-play), [Leaves Play](#leaves-play), [Player Card](#player-card), [Player’s Play Area](#players-play-area)

### SURGE

After an encounter card with this keyword is revealed, the player resolving the card reveals an additional encounter card from the top of the encounter deck.

* Complete the process of resolving the original card before revealing the additional card.

**See also**: [Encounter Card](#encounter-card), [Encounter Deck](#encounter-deck), [Keywords](#keywords), [Reminder Text](#reminder-text), [Reveal](#reveal)

### SUSTAINED DAMAGE

Sustained damage refers to the difference between a character’s maximum hit points and remaining hit points.

* To calculate sustained damage for an identity or villain *(using a hit point dial)*, start with the character’s maximum hit points *(as indicated by its printed value modified by any card abilities or game effects)*, and subtract their remaining hit points *(as indicated by the dial)*.
* Sustained damage on an ally or minion is equal to the total value of all damage tokens on the card.

**See also**: [Ally](#ally), [Damage](#damage), [Hit Points](#hit-points), [Identity](#identity), [Maximum Hit Points](#maximum-hit-points), [Remaining Hit Points](#remaining-hit-points), [Villain](#villain-villain-deck)

### TABLE TALK

Players are permitted and encouraged to talk to one another during play, and to work as a team to plan and execute the best course of action. Players can discuss anything they would like, including cards in play and cards in their hand. Players are not obligated to disclose the cards in their hand if they do not wish to do so.

* While resolving an encounter card with the peril keyword, players are not permitted to consult with one another.

**See also**: [Keywords](#keywords), [Peril](#peril), [Player](#player)

### TARGET

If a game function or card ability is directed toward a game element *(such as an attack that deals damage to an enemy)*, that game element becomes the target of that function or ability for the duration of that function’s or ability’s resolution.

* Examples of targets include but are not limited to: “the villain,” “a minion,” “an enemy,” “a scheme,” “a hero,” “an ally,” “a character,” “a player,” “you,” “a card.”
* If an ability specifies one or more targets, that ability can only be initiated if it has at least one valid target. For example, an ability that says “deal 5 damage to a minion” cannot be initiated if there are no minions in play.
  * The phrase “choose a [game element]” indicates that one or more targets must be selected in order for an ability to initiate.
* A target is not valid for an ability if no part of that ability can affect that target.
  * The cost of an ability is not considered when determining if that ability can affect a target.
  * If an ability has multiple effects on its target, the target is valid if at least one of those effects can affect the target.
  * A target is not valid for an ability if that ability would cause the target to perform a game function that another ability says the target cannot perform. For example, a character with an attachment that says “attached character cannot ready” is not a valid target for a card that readies a character.
  * A target that cannot be attacked is not a valid target for an attack-labeled ability.
  * A target that cannot be thwarted is not a valid target for a thwart-labeled ability.
* An ability that targets every game element of a specific type *(for example, “each enemy”)* can be initiated as along as at least one of those game elements is a valid target.
  * That ability does not resolve against any of those game elements that is not a valid target.
  * For example, the crisis icon prevents threat from being removed from the main scheme. An ability that says “remove 1 threat from each scheme” can be used while there is a crisis icon in play if there is at least 1 scheme from which threat can be removed. In this case, no threat would be removed from the main scheme.
* An effect that refers to a future target *(i.e. “the next card you play”)* does not require a target to initiate.

**See also**: [Ability](#ability), [Choose (Game Element)](#choose-game-element), [Cost](#cost), [Game Element](#game-element)

### TARGET THREAT

Target threat is the amount of threat required for the main scheme deck to advance. It is located in the upper left corner of the card, before the title.

**See also**: [Main Scheme](#main-scheme-main-scheme-deck), [Threat](#threat)

### TEAM-UP

The team-up keyword names two characters. In order for a player to include a card with the team-up keyword in their deck, that player’s chosen identity must match one of the named characters. Additionally, a card with the team-up keyword cannot be played unless both of the named characters *(identity or ally)* are in play.

**See also**: [Ally](#ally), [Identity](#identity), [In Play and Out of Play](#in-play-and-out-of-play), [Keywords](#keywords), [Play](#play-put-into-play), [Reminder Text](#reminder-text), [Appendix I: Deck Customization](#appendix-i-deck-customization)

### TEAMWORK (TRAIT)

After a minion with teamwork enters play and engages a player, if there is at least one other minion that shares the specified trait in play, each minion that shares the teamwork keyword with the same specified trait activates against the player it is engaged with.

**See also**: [Activation](#activation), [Engage](#engage), [Keywords](#keywords)

### TEMPORARY

A card with temporary must be discarded from play at the end of the round.

**See also**: [Keywords](#keywords)

### TEXT BOX

The text box of a card is the area of a card that contains the card’s printed abilities, traits, and flavor text *(if any)*.

* If a card ability references a card’s “text box,” that ability only references the printed abilities within that card’s text box.
  * Icons printed within a card’s text box are considered abilities within that text box.

**See also**: [Ability](#ability), [Printed](#printed), [Traits](#traits), [Appendix III: Card Anatomy](#appendix-iii-card-anatomy)

### “THEN”

If the effect text of an ability includes the word “then”, the text preceding the word “then” must be fully true or resolved before the remainder of the effect described after the word “then” can be resolved.

* If the pre-”then” text of an effect fully resolves, the post-”then” text of the effect must also attempt to resolve.
* If the pre-”then” text of an effect does not fully resolve, the post-”then” text does not attempt to resolve.

### THREAT

Threat tokens are used to track the amount of threat on scheme cards.

**See also**: [Component Limitations](#component-limitations), [Scheme (Card Type)](#scheme-card-type), [Scheme (Enemy Activation)](#scheme-enemy-activation), [Main Scheme](#main-scheme-main-scheme-deck), [Side Scheme](#side-scheme), [Prevent](#prevent), [Thwart](#thwart)

### THW

**See**: [Basic Power](#basic-power), [Thwart](#thwart)

### THWART

Some game effects and card abilities reference a thwart attempt. There are a few different ways this can occur:

* A hero or ally can use their basic thwart power to thwart a scheme. A character must exhaust to use this power. This removes threat equal to the character’s THW value from the scheme.
  * A character can only initiate a basic thwart if there is a scheme with at least one threat for the character to remove or if that character is confused.
* If a triggered ability is labeled as a thwart—such as “**Hero Action** *(thwart)*”—resolving that ability is considered to thwart the specified scheme. Unless specified by the ability’s text, a hero does not exhaust when using such an ability.
  * An ability labeled as a thwart is considered a single thwart, even if that thwart removes multiple instances of threat.
  * If an ability increases the amount of threat an ability labeled as a thwart removes and that ability removes multiple instances of threat, each of those instances that does not use the word “additional” is increased by the specified amount.

**See also**: [Ally](#ally), [Basic Power](#basic-power), [Consequential Damage](#consequential-damage), [Exhausted](#exhausted), [Main Scheme](#main-scheme-main-scheme-deck), [Modifiers](#modifiers), [Side Scheme](#side-scheme), [Threat](#threat)

### TIMING

**See**: [Ability](#ability), [Interrupt](#interrupt), [Response](#resource), [“Would”](#would)

### TOUGH

Tough is a status that prevents a character from taking damage.

* If a character with a tough status card would take any amount of damage, prevent all of that damage and discard a tough status card from that character instead.
  * A character with multiple tough status cards discards only one tough status card each time it would take damage.
  * When a hero with a tough status card defends an attack, they reduce the damage from the attack by their DEF first. If the damage is reduced to 0, the hero does not lose their tough status card.
* When an ally or minion with a tough status card is dealt excess damage by an attack with the overkill keyword, overkill damage is **not** dealt to the identity of that ally’s controller or to the villain, respectively.
* As a tough status card prevents damage fully, the character who had the tough status card is not considered to have taken damage.

**See also**: [Damage](#damage), [Overkill](#overkill), [Status Cards](#status-cards), [Toughness](#toughness)

### TOUGHNESS

When a character with the toughness keyword enters play, place a tough status card on it.

**See also**: [Ally](#ally), [Enters Play](#enters-play), [Identity](#identity), [Keywords](#keywords), [Minion](#minion), [Reminder Text](#reminder-text), [Status Cards](#status-cards), [Villain](#villain-villain-deck)

### TRAITS

Many cards have one or more traits listed at the top of the text box and printed in bold italics.

* Traits have no inherent effects on the game. Instead, some card abilities reference cards that possess or lack specific traits.
* Traits are not considered to be part of a card’s printed text box for the purpose of card abilities.

**See also**: [Printed](#printed), [Appendix III: Card Anatomy](#appendix-iii-card-anatomy)

### TREACHERY

Treachery is an encounter card type that represent tactics, tricks, disasters, and other immediate occurrences that confront players during a scenario.

* If a treachery card is revealed from the encounter deck, the player revealing the card must resolve its effects.
* After resolving the effects of a treachery card *(or the effects are canceled)*, place the card in the encounter discard pile.
  * If a treachery causes one or more enemies to activate as its last effect, that treachery card is considered resolved and is discarded at the start of those activations.

**See also**: [Card Types](#card-types), [Discard](#discard), [Encounter Card](#encounter-card), [Encounter Deck](#encounter-deck), [Reveal](#reveal), [Villain](#villain-villain-deck)

### TRIGGERED ABILITY

A triggered ability is indicated by a bold timing trigger followed by a colon and the rest of the ability text.

**See also**: [Ability](#ability), [Action](#action), [Forced](#forced), [Interrupt](#interrupt), [Resource Ability](#resource-ability), [Response](#response), [Simultaneous Resolution](#simultaneous-resolution), [Special](#special), [Triggering Condition](#triggering-condition), [When Defeated Abilities](#when-defeated-abilities), [When Revealed Abilities](#when-revealed-abilities)

### TRIGGERING CONDITION

A triggering condition is a specific occurrence that takes place in the game. On card abilities, the triggering condition is the element of the ability that references such an occurrence, indicating the timing point at which the ability may be used. The description of an ability’s triggering condition usually follows the word “when” or “after.”

* Each “Interrupt“ and “Response” ability can only be triggered once per occurrence of its triggering condition.
  * Multiple copies of a card with an interrupt or response can each be triggered by the same triggering condition.
* If a single game occurrence creates multiple triggering conditions *(such as a single attack causing a character to both take damage and be defeated)*, those triggering conditions are handled with a single interrupt window and a single response window. During each of these windows, abilities that refer to any of the triggering conditions created by the occurrence may be used in any order.

**See also**: [Interrupt](#interrupt), [Response](#response)

### UNDEFENDED

**See**: [Attack (Enemy Activation)](#attack-enemy-activation)

### UNIQUE ICON

A card with a Unique icon before its title is unique.

* The players as a group are permitted to have only one copy of each unique card *(by title)* in play.
* A player cannot include more than one copy of each
unique card *(by title)* in their deck. The identity card is
included in this evaluation.

In the Marvel setting, it is possible for multiple people to bear the same title. *(For example, more than one person can bear the title of “Captain America”, but there is only one Steve Rogers.)* Because of this, a comparison of alter-egos and/or subtitles between two cards may create the following exceptions to the unique rules stated above:

* If two identities share the same title, but each has a different alter-ego, they may coexist in play.
* If two unique allies share the same title, but each has a different subtitle, they may coexist in a player’s deck and in play.
  * An ally without a subtitle cannot coexist with an ally that has a subtitle if those allies share the same title.
* If a hero and a unique ally share the same title, but the alter-ego and the subtitle are different, they may coexist in deckbuilding and in play.

Additionally, some unique minions may have the same title as other friendly or enemy characters.

* If a unique minion is revealed from the encounter deck and attempts to enter play while another unique character with the same title is already in play, the player who is revealing that minion discards it, then reveals a new card from the encounter deck.
* If a card ability attempts to put a unique minion into play while another unique character with the same title is already in play, that minion cannot enter play and the “put into play” effect fails to resolve. Resolve the remainder of the card ability as normal.

**See also**: Ally, Enters Play, Identity, Minion, Player, Subtitle,
Villain, Appendix I: Deck Customization

### UPGRADE

Upgrade is a player card type that represents powers,
attacks, equipment, and other assets that are *(in most cases)*
at an identity’s immediate disposal.

* An upgrade is active so long as it is in play, and it
remains in play until a card ability causes it to leave
play.
* Most upgrade cards enter play near a player’s identity
card, and modify the player’s hero or alter-ego *(or
both)*.
* Some upgrades enter play and “attach to” another
card. These upgrades modify the card they are
attached to, not the hero or alter-ego of the player
who played the upgrade.
  * A player controls any upgrades attached to
characters they control, including upgrades owned
by another player.
* Unless attached to a different character, upgrade
cards are considered to be an extension of the
controlling player’s identity. Attacks, thwarts,
defenses, action abilities, and triggered abilities that
resolve on upgrades in play under a player’s control
are also considered to be resolved by that player’s
identity.

**See also**: [Attach To](#attach-to), [Card Types](#card-types), [Enters Play](#enters-play), [Identity](#identity), [In Play and Out of Play](#in-play-and-out-of-play), [Leaves Play](#leaves-play), [Ownership and Control](#ownership-and-control), [Player Card](#player-card), [Player’s Play Area](#players-play-area)

### USES (X “TYPE”)

When a card with this keyword enters play, place X all-purpose counters from the token pool on the card. The word following the value establishes and identifies the type of uses the card holds.

Each card with this keyword also has an ability that references the type of use established by the keyword as part of the cost.

After the last all-purpose counter is removed from a card with uses *(and the effect resolves)*, discard that card.

**See also**: [All-Purpose Counter](#all-purpose-counter), [Discard](#discard), [Enters Play](#enters-play), [Keywords](#keywords), [Leaves Play](#leaves-play), [Reminder Text](#reminder-text)

### VICTORY DISPLAY

The victory display is an out-of-play game area shared by all players. Cards in the victory display follow the standard rules for out-of-play cards.

**See also**: [In Play and Out of Play](#in-play-and-out-of-play), [Player](#player), [Victory X](#victory-x)

### VICTORY X

When a card with the victory X keyword leaves play under the following conditions, place it in the victory display instead of its owner’s discard pile:

* An ally, minion, or side scheme with the victory X keyword is placed in the victory display when it is defeated.
* An attachment with the victory X keyword is placed in the victory display when the card to which it is attached is defeated. *(The card the attachment was attached to is discarded as normal.)*
* A card with both the victory X and uses *(X “type”)* keywords is placed in the victory display when its last all-purpose counter is removed from it.

While in the victory display, X indicates how many victory points that card is worth. *(X is the value next to the victory keyword.)*
  
* Some scenarios or campaigns may count the number of victory points in the victory display.

**See also**: [Defeat](#defeat), [Discard Pile](#discard-pile), [Keywords](#keywords), [Reminder Text](#reminder-text), [Uses (X “Type”)](#uses-x-type), [Victory Display](#victory-display)

### VILLAIN, VILLAIN DECK

Villain is an encounter card type that represents the primary enemy the players are attempting to defeat in a scenario.

The villain is represented by a sequential deck of one or more cards. The players defeat the villain by reducing the hit points of each stage of the villain deck to zero.

* Villain cards cannot be discarded from play.

**See also**: [Activation](#activation), [Attack (Enemy Activation)](#attack-enemy-activation), [Scheme (Enemy Activation)](#scheme-enemy-activation), [Villain Defeat](#villain-defeat)

### VILLAIN DEFEAT

If the villain’s hit point dial is reduced to zero, the players have defeated that stage of the villain.

Remove the current stage of the villain deck from the game. The next sequential stage of the villain deck is revealed. Set the villain’s hit point dial as indicated by that stage.

**If the final stage of the villain deck is defeated, the players win the game.**

* Excess damage that is dealt to defeat a villain stage does not carry over to the new stage.
* Attachments, upgrades, status cards, counters, and non-damage tokens on a villain carry over to the new stage.
  * If the new stage of the villain has a different title from the previous stage, attachments, upgrades, status cards, counters, and non-damage tokens do **not** carry over.
* If a villain is defeated while activating, the villain resumes that activation using the new villain stage.
  * If the new stage of the villain has a different title from the previous stage, the activation ends without resolving.

**See also**: [All-Purpose Counter](#all-purpose-counter), [Attachment](#attachment), [Damage](#damage), [Defeat](#defeat), [Excess Damage](#excess-damage), [Hit Points](#hit-points), [Status Cards](#status-cards), [Villain](#villain-villain-deck)

### VILLAIN PHASE

The steps of the villain phase are:

1. Place the amount of threat indicated in the main scheme’s acceleration field onto that scheme. If any acceleration icons or tokens are active, additional threat equal to the number of such icons and tokens is also placed at this time.
2. In player order, each player resolves the following:  
  a. The villain activates against the player.  
  b. Each minion engaged with the player activates against them, in the order of that player’s choice.
3. Deal one encounter card to each player. Deal one additional card for each hazard symbol on a card in play. These additional cards are dealt in player order.
4. The first player reveals each of their encounter cards, one card at a time in the order in which they were dealt, resolving each card based on its card type. Each player repeats this process in player order, until no dealt encounter cards remain.
5. Pass the first player token to the next clockwise player.
6. Any effects that last “until the end of the [villain] phase” or “until the end of the round” end.
7. Resolve any “when/after the [villain] phase ends” or “when/after the round ends” effects.

**See also**: [Acceleration Icon](#acceleration-icon), [Activation](#activation), [Attack (Enemy Activation)](#attack-enemy-activation), [Deal](#deal-deal-an-encounter-card), [Engage](#engage), [Find](#find), [Hazard Icon](#hazard-icon), [In Player Order](#in-player-order), [Main Scheme](#main-scheme-main-scheme-deck), [Minion](#minion), [Player](#player), [Reveal](#reveal), [Scheme (Enemy Activation)](#scheme-enemy-activation), [Threat](#threat), [Villain](#villain-villain-deck)

### VILLAIN’S PLAY AREA

The villain’s play area *(also sometimes referred to as the “villain’s game area”)* is the area of play where the villain deck, the main scheme deck, the encounter deck, the encounter discard pile, and the villain’s hit point dial are located.

* Environment cards and side scheme cards are placed in the villain’s play area when they enter play.
* Attachments cards attached to cards in the villain’s play area are in the villain’s play area. Attachment cards attached to cards in a player’s play area are not in the villain’s play area.
* Minion cards engaged with a player are in that player’s play area and not in the villain’s play area.
* Obligation cards given to a player are in that player’s play area and not in the villain’s play area.

**See also**: [Attachment](#attachment), [Discard Pile](#discard-pile), [Encounter Deck](#encounter-deck), [Environment](#environment), [In Play and Out of Play](#in-play-and-out-of-play), [Main Scheme](#main-scheme-main-scheme-deck), [Minion](#minion), [Obligation](#obligation), [Villain](#villain-villain-deck)

### VILLAINOUS

When a minion with the villainous keyword activates, give it a facedown boost card from the top of the encounter deck. When you resolve that minion’s activation, turn the boost card faceup, resolve any boost ability on that card, and apply its boost icons to the minion’s stats for this activation. Discard the boost card after the activation.

* If a boost ability on a boost card dealt to a minion refers to “the villain,” that ability still applies to the villain *(even though a minion is resolving it)*.

**See also**: [Activation](#activation), [Attack (Enemy Activation)](#attack-enemy-activation), [Boost](#boost-boost-icon), [Discard](#discard), [Keywords](#keywords), [Minion](#minion), [Reminder Text](#reminder-text), [Scheme (Enemy Activation)](#scheme-enemy-activation)

### WHEN COMPLETED ABILITIES

A when completed ability is a type of triggered ability, indicated by the bold “**When Completed**” timing trigger.

When a main scheme is complete, all “**When Completed**” abilities on the card resolve.

**See also**: [Main Scheme](#main-scheme-main-scheme-deck)

### WHEN DEFEATED ABILITIES

A when defeated ability is a type of triggered ability, indicated by the bold “**When Defeated**” timing trigger.

* When a villain stage, side scheme, main scheme stage, ally, or minion is defeated, all “**When Defeated**” abilities on the card resolve.
  * A defeated card leaves play after its “**When Defeated**” ability is resolved, if any.

**See also**: [Ally](#ally), [Defeat](#defeat), [Main Scheme](#main-scheme-main-scheme-deck), [Minion](#minion), [Side Scheme](#side-scheme), [Triggered Ability](#triggered-ability), [Villain](#villain-villain-deck)

### WHEN REVEALED ABILITIES

A when revealed ability is a type of triggered ability, indicated by the bold “**When Revealed**” timing trigger.

When a player reveals a card from the encounter deck, a new scheme stage, or a new villain stage, all “**When Revealed**” abilities on the card resolve.

* If an encounter card with a “**When Revealed**” ability enters play during setup, resolve that ability during setup step 10.
* If an encounter card with a “**When Revealed**” ability is put into play without being revealed, the “**When Revealed**” ability does not trigger.

**See also**: [Choose (Game Element)](#choose-game-element), [Encounter Card](#encounter-card), [Main Scheme](#main-scheme-main-scheme-deck), [Triggered Ability](#triggered-ability), [Villain](#villain-villain-deck), [Appendix II: Setup](#appendix-ii-setup)

### WILD RESOURCE

A wild resource is one of the four types of resources.

* Wild resources can be spent to pay the resource cost of cards and abilities. When a player generates a wild resource, they may specify which resource type *(energy, mental, physical, or wild)* it is being used as.
  * When a card that generates a wild resource has its resources doubled, each of its wild resources can be declared a different type.
* Some card abilities specifically require wild resources to be spent in order to resolve their effects.
* When resources are not being generated for a cost, a wild resource does not have any characteristic other than “wild resource.” In such contexts, wild resources cannot be interpreted as any of the other resource types.

**See also**: [Ability](#ability), [Cost](#cost), [Energy Resource](#energy-resource), [Icons](#icons), [Mental Resource](#mental-resource), [Physical Resource](#physical-resource), [Resource](#resource)

### WINNING THE GAME

If the players defeat the final villain stage, they win the game. If the final stage of the main scheme deck is completed, the villain wins the game.

* Some scenarios may have alternate win or loss conditions. If these conditions are met, the players win or lose accordingly.

### “WOULD”

The word “would” is used to define the triggering condition of some interrupt abilities, and establishes a higher timing priority for those abilities than interrupts to the same triggering condition without the word “would.”

* If an interrupt to a triggering condition that would occur changes the nature of that which is about to occur *(such as through a replacement effect)*, no further interrupts to the original trigger may be used since the resolution of that trigger is no longer valid.

For example, an interrupt that states “when a character would be defeated” triggers before an interrupt that states “when a character is defeated.”

**See also**: [Interrupt](#interrupt), [Replacement Effect](#replacement-effect), [Triggered Ability](#triggered-ability)

### “X” (VALUE)

**See**: [Non-Numerical Variable](#non-numerical-variable)

### YOU, YOUR

While resolving card abilities, if the word “you” **can** be resolved as referring to the player’s identity, it must be resolved as such. This includes but is not limited to:

* If a card deals damage to “you,” or “you” take damage, the player resolving that damage applies it to the hit point dial of their identity.
* If a card ability deals indirect damage to “you,” or “you” take indirect damage, the player resolving that damage can assign that damage to characters in play under their control.
* If a card ability exhausts “you,” the player resolving that card ability exhausts their identity.
* If a card ability places a status card on “you” *(such as “you are stunned”)*, the player resolving that card ability places that status card on their identity.
* If a card ability triggers from a game function that “you” perform *(such as “after you attack and defeat an enemy”)*, the player resolving that card ability must resolve that card ability as if the identity they control performed that game function, if able. *(For example, if an ability triggers “after you attack and defeat a minion,” it triggers after the controlling player’s identity attacks and defeats a minion but not when an ally under that player’s control attacks and defeats a minion.)*
* **Exception**: For abilities that trigger “after [enemy] attacks you,” “you” refers to the attacked player, even if that player defended with an ally.

While resolving card abilities, if the word “you” **cannot** be resolved as referring to the player’s identity, it must be resolved as referring to the player. This includes but is not limited to:

* If a game step or card ability discards cards from “your” hand, the player resolving that game step or card ability discards the cards from their hand.
* If a card ability searches “your” deck, the player resolving that ability searches for cards in their deck.
* If a game step or card ability performs a game function against a non-identity card “you” control *(such as exhausting, discarding, setting aside, etc.)*, the player resolving that game step or card ability performs that game function against the card in their play area.
* If a card ability triggers from a game function that “you” perform and cannot be interpreted in such a way that would refer to the resolving player’s identity *(such as “after you discard cards from your hand”)*, the player resolving that card ability must personally resolve and perform the game function(s) of that ability.

Some player cards are considered to be an extension of a player’s identity. When an action and/or ability is resolved by a card type that is an extension of an identity, that action and/or ability is considered to be performed by that identity.

Cards that are considered to be an extension of a player’s identity are:

* **Events** — Attacks, thwarts, defenses, action abilities, and triggered abilities that resolve from a player playing an event are also considered to be performed by that player’s identity.
* **Resources** — If a player spends a resource, that resource is also considered to be spent by that player’s identity.
* **Upgrades** — Unless attached to a different character, upgrade cards are considered to be an extension of the controlling player’s identity. Attacks, thwarts, defenses, action abilities, and triggered abilities that resolve on upgrades in play under a player’s control are also considered to be resolved by that player’s identity.

Cards that are **not** considered to be an extension of a
player’s identity are:

* **Allies** — Attacks, thwarts, defenses, action abilities, and triggered abilities that resolve from allies in play under a player’s control are not considered to be performed by that player’s identity.
* **Supports** — Attacks, thwarts, defenses, action abilities, and triggered abilities that resolve from supports in play under a player’s control are **not** considered to be performed by that player’s identity.

**See also**: [Ability](#ability), [Ally](#ally), [Event](#event), [Identity](#identity), [Player](#player), [Player Card](#player-card), [Player Deck](#player-deck), [Player’s Play Area](#players-play-area), [Resource](#resource), [Support](#support), [Upgrade](#upgrade)

## APPENDIX I: DECK CUSTOMIZATION

### PLAYER DECKS

The deck customization rules for player decks are:

* A player must choose exactly one identity card.
* A player’s deck consists of a minimum of 40 cards and a maximum of 50 cards. The identity card and any cards with the permanent keyword are not counted as part of this number.
* A player’s deck must include each of the identity-specific cards associated with their chosen identity card. The exact quantity of each card included in that identity set must be included in the deck.
* A player may choose exactly one aspect *(Justice, Aggression, Protection, or Leadership)* to use for customization. The remainder of their deck is then customized with cards that belong to that aspect and/ or basic cards.
* No more than three copies *(by title)* of each non-unique card may be included in the deck.
* No more than one copy *(by title)* of each unique card may be included among the cards in the deck and the identity card. If two unique cards share the same title, but their subtitles/alter-egos differ, they may coexist in the deck.
* Any “deckbuilding requirements” on the player’s identity card must be followed.

### ENCOUNTER DECKS

Each scenario comes with a recommended list of card sets that form the default encounter deck for that scenario. *(For the core set scenarios, these lists are on page 23 of the Learn to Play.)* This recommended list can be modified in a few different ways:

* Expert mode is an option that can be used to increase the difficulty of a scenario. Expert mode uses a different combination of villain stages and adds the expert encounter set to the encounter deck.
* Most scenarios *(including all of the scenarios in the core set)* include a modular encounter set within their recommended list. To customize a scenario for a different experience, remove the modular encounter set from the list, and add any other modular encounter set as desired.
* It is possible to add multiple modular sets to a scenario, but this will dilute the encounter deck if too many are added.
* To add an additional element of uncertainty to a scenario, the modular set may be chosen from a group of facedown sets, and shuffled directly into the encounter deck without looking at the cards.

## APPENDIX II: SETUP

To set up a game, perform the following steps in order:

1. **Select Identities.** Each player selects one identity, placing their alter-ego side face up.
2. **Set Hit Points.** Each player sets their hit point dial equal to the starting hit points of their character, found at the bottom of their identity card.
3. **Select First Player.** As a group, the players select a first player and place the first player token in front of that player.
4. **Set Aside Obligations.** For each identity being played, set aside their obligation card.
5. **Set Aside Nemesis Sets.** For each identity being played, set aside their nemesis and the encounter cards of that nemesis.
6. **Shuffle Player Decks.** Each player shuffles their player deck.
7. **Collect Tokens and Status Cards.** Collect a pool of damage tokens, threat tokens, acceleration tokens, and all-purpose counters within reach of each player. Place stacks of stunned, confused, and tough status cards near this pool.
8. **Select Scenario.** Select a scenario and put its villain deck and main scheme deck into play near the center of the play area.
9. **Set the Villain’s Hit Points.** Set the villain’s hit point dial to the value indicated by the villain card.
10. **Create the Encounter Deck.** Shuffle the encounter sets listed on side 1A of the main scheme card with the obligation cards set aside during setup step four to create the encounter deck.
11. **Put Setup Cards Into Play.** Search each deck and the set aside area for any cards with the setup keyword and put them into play.
12. **Resolve Scenario Setup and When Revealed abilities.**  
  a. Resolve any “Setup” instructions on main scheme card 1A.  
  b. Flip the main scheme card to side 1B and resolve any “**When Revealed**” abilities on that side.  
  c. Resolve any “**When Revealed**” abilities on the villain.
13. **Campaign Setup.** If playing in campaign mode, resolve the Setup campaign instructions listed for the scenario in its associated rulebook.
14. **Draw Cards.** Each player draws cards from their deck until they have cards equal in number to their starting hand size, as listed near the bottom of their identity card.
15. **Resolve Mulligans.** Each player may discard any
number of cards from hand, and then draw up to their
starting hand size. *(Do not shuffle these discarded
cards back into their decks at this time.)*
16. **Resolve Character Setup Abilities.** Resolve any “**Setup**” instructions listed on identity cards in play. The game is now ready to begin.

## APPENDIX III: CARD ANATOMY

This section presents an anatomy of each card type. Player cards are detailed first, followed by scenario cards.

### PLAYER CARD ANATOMY KEY

1. **Title.** The name of this card.
2. **Card Type.** Indicates how this card behaves or may be used in the game.
3. **Traits.** Flavorful attributes that may be referenced by card abilities.
4. **Ability.** This card’s specialized means of interacting with the game.
5. **Cost.** The resource cost to play this card.
6. **Hit Points.** A value that represents this card’s durability.
7. **Resources.** The resources this card generates when it is discarded from hand.
8. **Deckbuilding Classification.** Indicates if this card is exclusive to a hero, belongs to an aspect, or is a basic card.
9. **THW.** How effective this character is at opposing enemy schemes.
10. **ATK.** How effective this character is when it attacks.
11. **DEF.** How effective this character is when it defends.
12. **REC.** How effective this alter-ego is at recovering damage.
13. **Consequential Damage.** The amount of damage this ally takes after it is used for this power.
14. **Hand Size.** The number of cards this card’s controller resets their hand to each round.
15. **Collector Information.** Indicates this card’s product of origin and card number within that product.
16. **Unique Icon.** Indicates that the card is unique.
17. **Subtitle.** Indicates an alternate identity an ally might possess.

### ENCOUNTER CARD ANATOMY KEY

1. **Title.** The name of this card.
2. **Card Type.** Indicates how this card behaves or may be used in the game.
3. **Traits.** Flavorful attributes that may be referenced by card abilities.
4. **Ability.** This card’s specialized means of interacting with the game.
5. **Hit Points.** A value that represents this card’s durability.
6. **SCH.** How effective this enemy is when it schemes.
7. **ATK.** How effective this enemy is when it attacks.
8. **Boost Icons.** Indicates how effective this card is when it is discarded as an attack boost or scheme boost.
9. **Starting Threat.** The amount of threat placed on this scheme when it enters play.
10. **Acceleration.** The speed at which this scheme advances each round.
11. **Target Threat.** The amount of threat required on this scheme to advance to the next stage of this scheme deck.
12. **Stage Number.** The stage of this villain or scheme within the scenario.
13. **Encounter Set Name.** Indicates which encounter set this card belongs to.
14. **Encounter Set Information.** Indicates the number of cards within an encounter set and this card’s place within that set.
15. **Collector Information.** Indicates this card’s product of origin and card number within that product.

## APPENDIX IV: FAQ GENERAL QUESTIONS

**Q: In the Core Set, there are 19 Aggression, Justice, and Protection aspect cards, but only 18 Leadership aspect cards. Is this correct?**

A: Yes. The Leadership aspect received 1 fewer card than the other aspects because it has more unique cards to choose from.

**Q: If my hero has a tough status card and I am dealt damage, can I use an interrupt ability to reduce or prevent that damage in order to keep the tough status card?**

A: No. Status cards have priority over all triggered abilities, like interrupts, so the tough status card must be discarded to prevent all of the damage before any other abilities could trigger.

A hero **can** keep their tough status card if:

1. A constant effect reduces the damage the hero takes to zero. This is because constant effects have priority over status cards.
2. The hero makes a basic defense and their DEF reduces the damage dealt by the attacking enemy’s ATK to zero. This is because a basic defense reduces the amount of damage dealt by the attacker, rather than the amount of damage taken by the defender.

### CORE SET

#### SPIDER-MAN (#1A)

**Q: When does the villain “initiate” an attack against Spider-Man?**

A: An attack is “initiated” the moment the game determines an attack will be made against a character. This includes attacks made from game steps *(such as step 2 of the villain phase)* and card abilities *(such as an attack initiated by the “Assault” treachery)*. Spider Man’s ability resolves before any of the steps of the process detailed in the “Attack (Enemy Activation)” section are performed.

#### WEBBED UP (#9)

**Q: How many attacks does Webbed Up prevent?**

A: Two attacks in total. Webbed Up prevents the attached enemy’s very next attack by replacing that attack with the placement of a stun status card. Then, the stun status card will prevent that enemy’s following attack.

**Q: Does Webbed Up prevent Spider-Sense from triggering?**

A: Yes. Webbed Up’s ability is a replacement effect *(indicated by the word “instead”)*, meaning the attack never initiates.

#### JENNIFER WALTERS (#19B)

**Q: Can Jennifer Walters remove threat from a side scheme as it enters play?**

A: No. Side schemes enter play with threat already on them, meaning threat is not “placed” at this point.

**Q: If threat is placed on a scheme during game setup, does Jennifer Walters’s ability trigger?**

A: No. Abilities that do not have the “Setup” timing trigger cannot resolve during game setup.

#### LEGAL PRACTICE (#23)

**Q: Can Legal Practice remove threat from multiple schemes simultaneously?**

A: No. All of the threat removed by Legal Practice must be removed from a single scheme.

#### REPULSOR BLAST (#31)

**Q: Can Repulsor Blast’s first point of damage remove a tough status card from an enemy, then its additional damage deal damage to that enemy?**

A: No. The additional damage that Repulsor Blast deals is a simultaneous modification of its first point of damage. For instance, if a player were to discard 2 energy resources due to Repulsor Blast, they would deal a total of 5 damage to an enemy all at once, as the additional 4 damage dealt by the discard effect happens at the same time as the first point of damage.

#### PEPPER POTTS (#33)

**Q: Does Pepper Potts generate 2 resources if a card with 2 printed resources *(such as Energy, Genius, or Strength)* is on top of the discard pile?**

A: Yes. Pepper Potts generates a number of resources that are equal in quantity and type to the resources on the top card of the discard pile.

**Q: Will Pepper Potts generate 2 resources if a “The Power of [Aspect]” resource card *(such as The Power of Aggression)* is on top of the discard pile?**

A: No. Though the resources that Pepper Potts generates are equal in quantity and type to the resources of the top card of the discard pile, Pepper Potts is the card that is generating these resources. This means that a The Power of [Aspect] card never generates resources itself, having no opportunity to generate additional resources for a card of its specified aspect.

**Q: Can Pepper Potts generate the resources of a card that is currently being spent?**

A: No. Resources are generated simultaneously, meaning the spent card will not be on top of the discard pile at the time Pepper Potts uses her ability.

#### ROCKET BOOTS (#39)

**Q: If Iron Man has 1 hit point remaining and his Rocket Boots upgrade is discarded from play, is Iron Man defeated?**

A: Yes. If an ability that modifies hit points expires or otherwise becomes inactive, the modified hit points revert to the value they would be without the modifier. In this case, Iron Man’s hit points would revert to 0, instantly defeating him.

#### BLACK PANTHER (#40A)

**Q: If an enemy initiates an attack against Black Panther but another hero or an ally defends against that attack, will Black Panther’s retaliate ability trigger?**

A: No. Black Panther himself must be attacked for retaliate to trigger.

**Q: If Black Panther defends against an attack, will his retaliate ability trigger?**

A: Yes. As long as Black Panther himself is attacked, retaliate will trigger.

#### ANCESTRAL KNOWLEDGE (#42)

**Q: Can Ancestral Knowledge shuffle different versions of Wakanda Forever into Black Panther’s deck?**

A: No. Cards with the same title are considered to be the same card for the purpose of card abilities.

#### VIBRANIUM SUIT (#49)

**Q: Does moving damage discard tough status cards from the target enemy?**

A: Yes. If damage is moved to a character, the moved damage is considered to be dealt to that character.

#### TIGRA/GREER GRANT NELSON (#51)

**Q: Does Tigra’s “Response” ability trigger before or after she takes consequential damage?**

A: Before. The “After Tigra attacks and defeats a minion...” condition is checked immediately after Tigra defeats a minion with her attack power, but before consequential damage is applied to her.

#### MAKE THE CALL (#71)

**Q: When playing Make the Call, do “The Power of [Aspect]” resource cards *(such as The Power of Leadership)* generate 1 resource or 2 resources?**

A: Make the Call’s text states “Action: Pay the printed cost of an ally in any player’s discard pile...”, meaning the player is paying the cost of the ally itself. If that ally’s aspect matches that of The Power of [Aspect] card, then The Power of [Aspect] card will generate 2 resources. However, if that ally’s aspect does not match, The Power of [Aspect] card will only generate 1 resource.

#### WHIRLWIND (#130)

**Q: How is Whirlwind’s attack against each hero resolved?**

A: Whirlwind makes a separate attack against each hero and these attacks are resolved simultaneously. Each player resolves each step of the attack simultaneously. Each attack may have a defender declared, and each defender defends for a single player.

#### ULTRON II (#135)

**Q: If Ultron’s attack is defended by a player other than the one who was attacked, does Ultron get +1 ATK for each Drone minion engaged with the defending player or the player Ultron initiated the attack against?**

A: Ultron’s ability has already resolved before defenders are declared, creating a lasting effect that refers to the original target of the attack. The bonus to Ultron’s ATK is based on the number of Drone minions engaged with the player Ultron initiated the attack against. If the number of Drone minions engaged with that player changes, the bonus changes as well.

### GREEN GOBLIN SCENARIO PACK

#### NORMAN OSBORN (#1A)

**Q: Will a stun status card prevent Norman Osborn’s attack activation?**

A: Yes. Because status cards take priority over all other abilities, a stun status card will prevent Norman Osborn’s activation.

#### GREEN GOBLIN (#1B)

**Q: While Green Goblin is attacking, if the last madness counter is removed from the State of Madness environment through a “Boost” ability, what happens?**

A: Green Goblin immediate flips to Norman Osborn form. Boost icons from the boost card are then added to Norman Osborn’s ATK value of , which is treated as a value of 0. Norman Osborn then deals damage from the attack equal to his modified ATK value *(base of 0 ATK, plus the number of boost icons on the boost card)*. In this specific situation, Norman Osborn’s “Forced Interrupt” does not trigger, as the attack is already past the point of “When Norman Osborn would attack...” by the time he changes to his Norman Osborn form.

#### I SEE YOU (#30)

**Q: If I’m in alter-ego form and I reveal “I See You”, does Green Goblin attack me?**

A: Yes. Because the “When Revealed” ability on I See You does not specify hero form or alter-ego form, Green Goblin will attack the player no matter their form.

### CAPTAIN AMERICA HERO PACK

#### STEVE ROGERS (#1B)

**Q: If Captain America’s Shield is put into play as a Drone minion during game setup for Ultron, can I retrieve it with Steve Rogers’s Setup ability?**

A: No. The Setup ability specifically searches the player’s deck and discard pile. If Captain America’s Shield is not in either game area, the ability fails to find it.

**Q: If an ally is played while I’m Captain America, then I change form to Steve Rogers, will Steve Rogers’s “Living Legend” ability still apply to the next ally played?**

A: No. Living Legend only applies to the very first ally played each round.

### MS. MARVEL HERO PACK

#### EMBIGGEN (#10)

**Q: If an Attack event deals multiple sources of damage *(such as the Aggression event, Melee)*, how does Embiggen work?**

A: Embiggen increases all instances of damage that an Attack event deals by 2. For example, if an event were to deal 3 damage, then deal 3 damage again, that event would now deal 5 damage, then 5 damage again.

#### SHRINK (#11)

**Q: When playing Emergency, can I exhaust Shrink to remove 2 threat from a scheme?**

A: No. Shrink increases each instance of threat removed by a thwart event. Because Emergency only prevents threat and does not remove any, Shrink will have no effect.

#### NOVA/SAM ALEXANDER (#12)

**Q: If Nova’s ability defeats an attacking enemy, does that enemy’s attack still deal damage?**

A: No. Although the attack sequence has initiated, damage from that attack has not yet been calculated. If Nova defeats the enemy during this step, the rest of the attack sequence fails to resolve.

#### MELEE (#30)

**Q: Can Melee deal damage to the same enemy twice?**

A: No. When Melee deals damage a second time, that damage must be dealt to an enemy that is different from the first. Note that different stages of the villain are considered to be the same enemy.

**Q: If I’m engaged with a minion with guard, can I target that minion and the villain, as long as the minion would be destroyed by the damage done by Melee?**

A: Yes, as long as you defeat the minion with the first sentence of the ability on Melee, you may deal damage to the villain with the second sentence of the ability.

### THOR HERO PACK

#### JARNBJORN (#19)

**Q: Can I trigger Jarnbjorn after I play an Attack event?**

A: Yes. A hero is considered to make an attack both through their basic attack power and actions with the *(attack)* label.

**Q: If an Attack event damages multiple enemies, can Jarnbjorn be triggered for each one?**

A: Yes. Each enemy that is dealt damage by an Attack event is considered to have been attacked.

### BLACK WIDOW HERO PACK

#### DANCE OF DEATH (#4)

**Q: Dance of Death does not contain the *(attack)* label. Are each of its damage-dealing effects actually considered attacks or is this a mistake?**

A: The first sentence of Dance of Death’s ability defines each damage-dealing effect from Dance of Death as an individual attack. Resolve each as a normal attack, one at a time.

**Q: If Black Widow is stunned, will each attack from Dance of Death be prevented, or just the first attack?**

A: Because Dance of Death creates three separate attacks, a stun status card on Black Widow will only prevent the first attack. The second and third attack can be performed as normal.

#### ATTACROBATICS (#6)

**Q: Can Attacrobatics cancel 0 boost icons?**

A: No. Attacrobatics cannot be used to cancel the boost icons on a card that has none as doing as would not change the game state.

#### WIDOWS BITE (#10)

**Q: If I have Widow’s Bite in play and I reveal a minion with quickstrike, which resolves first?**

A: Quickstrike triggers when a minion engages a player and minions enter play engaged with the player who revealed them, thus Quickstrike and the “Response” on Widow’s Bite have the same timing trigger. Keywords have timing priority over “Response” abilities, so Quickstrike initiates first. Widow’s Bite can be triggered after the Quickstrike attack initiates. If the damage from Widow’s Bite defeats the attacking enemy, its attack does not resolve. Otherwise, the attack resolves and the enemy will be stunned for its next attack.

### DOCTOR STRANGE HERO PACK

#### THE NIGHT NURSE (#19)

**Q: If the only status card on a hero is a tough status card, is it discarded if I use The Night Nurse to heal that hero?**

A: Yes. The Night Nurse’s ability discards 1 status card from that hero, no matter the type.

#### UNFLAPPABLE (#20)

**Q: If while defending against an enemy attack, my identity takes damage from a “Boost” ability but takes no damage from the attacking enemy otherwise, can I still trigger Unflappable to draw a card?**

A: Yes. The cost of the ability on Unflappable only requires that the defending identity take no damage during step 4 of the enemy attack.

#### COUNTERSPELL (#30)

**Q: Counterspell says “Attach to your hero.” If I draw Counterspell while in alter-ego form, what happens?**

A: Counterspell attempts to attach to your hero but cannot. Because it is unable to meet its condition, simply discard it. *(Do not reveal a new encounter card in its place.)*

#### IMAGES OF IKONN (#33)

**Q: Can I resolve Images of Ikonn if the villain is already confused and there is no threat on a scheme?**

A: Yes. As long as any part of the ability on Images of Ikonn can change the game state, then it will do as many effects as it is able. While its first effect may fail to change the game state if the villain is already confused and there is no threat on a scheme, its second effect can change the game state by placing itself in the Invocation deck discard pile.

### HULK HERO PACK

#### CRUSHING BLOW (#2)

**Q: If Crushing Blow’s resource cost is reduced to 0, can it be played without spend Physical resources?**

A: Yes. The “You can only spend Physical resources to pay for this card” ability on Crushing Blow only applies when actual resources are being spent to pay for its resource cost. If its resource cost is reduced to 0, no resources are required to pay for Crushing Blow, so no Physical resources must be spent.

#### UNSTOPPABLE FORCE (#6)

**Q: If Unstoppable Force’s resource cost is reduced to 0, will I draw 1 card from its second ability?**

A: No. Because no resources were spent to pay for Unstoppable Force’s resource cost, its “If you paid for this ability using only Physical resources...” condition was not fulfilled, so that effect will not resolve.

#### CLASH OF TITANS (#28)

**Q: If my highest-ATK character is an ally, and the attack from Clash of Titans is undefended, which takes the damage: my identity or the ally that was attacked?**

A: The ally will take all damage from the undefended attack.

### RISE OF RED SKULL EXPANSION

#### HAWKEYE’S QUIVER (#3)

**Q: After using Hawkeye’s Quiver to search the top 5 cards of my deck, what should I do with those cards?**

A: Shuffle those cards back into Hawkeye’s deck. After a search ability is completed—no matter if that ability searches the whole deck or only a portion of the deck—the entire deck is shuffled.

#### MARKED FOR DEATH (#28)

**Q: When Marked for Death is revealed, if a copy of Mockingbird is already under a player’s control who is not Clint Barton, what happens?**

A: The Clint Barton player must search for Mockingbird in their hand, deck, discard pile, and play area, though cannot place their Mockingbird under Marked for Death as there is already a unique character in play with the same title/ subtitle *(shuffle after searching a deck)*. However, when Marked for Death is defeated, any copy of Mockingbird in play *(even one controlled by another player)* is returned to its owner’s hand.

#### JESSICA DREW (#31B)

**Q: Does Jessica Drew’s Double Agent ability require her deck to be built with two aspects?**

A: Yes. An equal number of cards from two different aspects must be included in her deck.

#### FINESSE (#33)

**Q: Can Finesse generate a resource to pay for an aspect card’s ability *(such as Jarnbjorn)*?**

A: Yes. As long as the resource generated by Finesse is spent on an aspect card *(its resource cost or a cost within that aspect card’s ability)*, Finesse can be used.

### THE ONCE AND FUTURE KANG SCENARIO PACK

#### DEPOWERED (#20)

**Q: If Depowered is in Doctor Strange’s play area, can the Doctor Strange player still use the Invocation deck?**

A: Yes. The abilities on cards in the Invocation deck are merely resolved, not played.

### WASP HERO PACK

#### WASP (#1C)

**Q: While Wasp is in Giant hero form, how does her first ability interact the patrol keyword and the crisis icon?**

A: Wasp’s first ability allows her basic thwart to simultaneously remove threat from each scheme that Wasp chooses. Wasp cannot choose the main scheme as a target while she is engaged with a minion with the patrol keyword or there is a card with a crisis icon in play. Due to the simultaneous nature of this ability, this applies even if the card with the patrol keyword or crisis icon is removed from play during her basic thwart’s resolution.

**Q: While Wasp is in Giant hero form, how does her second ability interact with the guard keyword?**

A: Wasp’s second ability allows her basic attack to simultaneously damage each enemy that Wasp chooses. Wasp cannot choose the villain as a target while she is engaged with a minion with the guard keyword. Due to the simultaneous nature of this ability, this applies even if the card with the guard keyword is removed from play during her basic attack’s resolution.

**Q: While Wasp is in Giant hero form, how does her second ability interact with multiple enemies who have the retaliate keyword?**

A: Wasp is considered to attack each target affected by her divided basic attack. If Wasp’s basic attack is divided among multiple enemies with the retaliate keyword, each instance of retaliate will damage Wasp *(in the order of her choice)*.

### QUICKSILVER HERO PACK

#### QUICKSILVER (#1A)

**Q: If Quicksilver attempts to make a basic attack or basic thwart while stunned or confused, can his Super Speed ability trigger?**

A: No. Stunned and confused status cards replace the usage of the basic power with their removal. If Quicksilver makes a basic attack while stunned or a basic thwart while confused, he is not considered to have used a basic power and the condition of his Super Speed ability is not met.

### SCARLET WITCH HERO PACK

#### HEX BOLT (#4)

**Q: For the second sentence of Hex Bolt, do the bulleted abilities resolve each time a card is discarded from the encounter deck, or do the bulleted abilities resolve after all 3 cards have been discarded?**

A: As Hex Bolt does not contain an alteration effect, resolve the first sentence of Hex Bolt entirely, without interruption. Then, determine and resolve the appropriate bulleted abilities based off of what was discarded.

#### SLIPPING SANITY (#23)

**Q: Is it intentional that Scarlet Witch has two obligation cards?**

A: Yes. Scarlet Witch’s powers are chaotic, often working in her favor, though also sometimes working against her. While she has many cards within her personal set that represent the positive facets of her powers, having multiple obligations represents the negative facets.

### GALAXY’S MOST WANTED EXPANSION MODULAR ENCOUNTER SETS

**Q: In the Galaxy’s Most Wanted Expansion, which sets are considered modular encounter sets?**

A: If an encounter set is not scenario-specific *(containing the name of that scenario in its encounter set name area)* or campaign-specific *(containing the word “Campaign” in its encounter set name area)*, then it is modular. The eight modular encounter sets in the Galaxy’s Most Wanted Expansion are: Badoon Headhunter, Band of Badoon, Galactic Artifacts, Kree Militants, Menagerie Medley, Power Stone, Space Pirates, and Ship Command.

### CAMPAIGN MODE

**Q: Do I have to play in expert mode for each scenario in an expert campaign?**

A: No. Increasing a campaign’s difficulty merely adds additional cards or setup instructions to each scenario in that campaign. It does not lock players into any other mode of play. For each scenario within a campaign, players are encouraged to choose the other modes of play that are right for them.

**Q: If I play one scenario in expert mode, do I have to play the next scenario using the same mode?**

A: No. The players may, for instance, play one scenario of the campaign using a combination of standard, heroic, and skirmish modes, then play the next scenario of the campaign using simply expert mode. Players can mix and match modes as they see fit between each scenario in a campaign.

#### ROCKET RACCOON (#29A)

**Q: If Rocket Raccoon uses his “Tinkering” ability but the Tech upgrade is not placed into a discard pile *(such as due to Collector’s ability)*, will Rocket Raccoon draw 2 cards?**

A: Yes. Discarding is the act of attempting to place a card into a discard pile. Even if the Tech upgrade ends up in a different game area, the cost of Rocket Raccoon’s “Tinkering” ability was still paid.

#### SALVAGE (#33)

**Q: If the Hulk ally (Core Set #50) discards Salvage, what happens?**

A: Hulk’s ability checks all printed resources on Salvage simultaneously, then resolves the appropriate effect based on the result. Because this check and resolution is simultaneous, the player who controls Hulk chooses the order in which the effects resolve.

#### POWER STONE (#149)

**Q: If an identity who controls the Power Stone is defeated, what happens to the Power Stone?**

A: If a player is eliminated from the game while a permanent card they do not own is in their play area, place that permanent card in its owner’s discard pile. In the case of the Power Stone, place it in the encounter discard pile.

### STAR-LORD HERO PACK

#### STAR-LORD (#1A)

**Q: If I play an ally that does not have the printed Guardian trait while in hero form, can I trigger the response on Knowhere (#22)?**

A: Yes. Star-Lord’s constant ability grants each ally his player controls the Guardian trait. Constant abilities have priority over triggered abilities like Knowhere’s “Response” ability, so the newly-played ally will have the Guardian trait before Knowhere triggers.

#### MISTER KNIFE (#26)

**Q: When Mister Knife is revealed by Shadow of the Past, does Shadow of the Past gain surge if it was the first treachery revealed by the Star-Lord player that phase?**

A: No. Mister Knife was not in play when Shadow of the Past was revealed, so his ability does not cause Shadow of the Past to gain surge.

#### DIVE BOMB (#28)

**Q: Can I play Dive Bomb if I am engaged with a minion with the guard keyword? If so, how would it resolve?**

A: Yes. Abilities are resolved one sentence at a time, so “[d]eal 7 damage to an enemy” would resolve first. If that damage defeated the guard minion, the second effect, “[d]eal 1 damage to each other enemy” would deal 1 damage to the villain. If the first sentence did not defeat the guard minion, the second sentence would deal 1 damage to each enemy other than the villain and the enemy dealt damage by the first sentence.

### VENOM HERO PACK

#### GRASPING TENDRILS (#3)

**Q: If I cancel an attack with Grasping Tendrils, is my hero considered to have defended that attack?**

A: Yes, because Grasping Tendrils is labeled as a defense, your hero is considered to have defended the attack.

### WAR MACHINE HERO PACK

#### GAUNTLET GUN (#5)

**Q: Can Gauntlet Gun’s resource ability be triggered when paying a cost other than for a War Machine event in order to place 1 ammo counter on War Machine?**

A: No, Gauntlet Gun’s resource ability can only be triggered when paying for a War Machine event.

### MAD TITAN’S SHADOW EXPANSION

#### SCENARIO #2 - TOWER DEFENSE

**Q: When a minion schemes during this scenario, which main scheme is its threat placed on?**

A: Threat from a minion scheming is placed on the main scheme with the “Focused Defense” attachment attached to it.

### SINISTER MOTIVES EXPANSION

#### SCENARIO #4 - THE SINISTER SIX

**Q: If there is more than one villain in play, which villain takes the excess damage from attacks with overkill?**

A: The villain with the active counter takes the overkill damage.

#### SCENARIO #5 - VENOM GOBLIN

**Q: What happens when one of the main schemes is completed?**

A: When any of the main schemes has threat on it equal to or greater than its target threat value, flip that main scheme to its environment side and reveal that environment.

#### ACROSS THE SPIDER-VERSE (#18)

**Q: Can this ability be repeated more than once?**

A: Yes, repeating the ability on this card includes the repeat effect itself. As long as a player who can spend 3 resources and exhaust a Web-Warrior card can be chosen, the ability can be repeated.

### MUTANT GENESIS EXPANSION

#### POWERFUL PUNCH (#14)

**Q: If Shadowcat plays Powerful Punch on the villain, when does she flip her mass form?**

A: When the villain initiates an attack, Shadowcat plays Powerful Punch. She deals 4 damage to the villain. As soon as she finishes resolving the attack-labeled effect, she is considered to have attacked and can flip her mass form as soon as the damage is dealt *(she must do so if she is in Phased mass form)*.

The villain then continues its attack, and Shadowcat is now considered defending that attack. If she is in her Phased mass form, she will not take any damage from that attack because of the constant ability on her Phased upgrade card. After the villain deals damage from its attack *(or attempts to do so)*, Shadowcat finishes defending and can flip her mass form again *(which she must do if she is in Phased mass form)*.

#### MUTANT PROTECTORS (#17)

**Q: How does the defense label on Mutant Protectors work since the card ability makes an ally the defender?**

A: When a player plays Mutant Protectors, that player becomes the target of the enemy attack and the X-Men ally put into play becomes the defender.

If the defending ally leaves play before damage is dealt for the attack, the player’s hero becomes the defender and can trigger “after you defend” responses after the attack resolves. *(This is not a basic defense, and the villain’s attack is not reduced by the hero’s DEF.)*

#### WHITE QUEEN (#56)

**Q: How does White Queen’s constant ability work?**

A: The phrase “you are confused” instructs you to place a confused status card on your identity. Because White Queen uses this phrase as a constant ability, she continuously places confused status cards on the engaged player’s identity until that identity cannot have any more confused status cards *(normally one, but can be more, such as when the identity has the steady keyword)*. If that identity attempts to thwart, they can do so and remove their confused status card(s), but will immediately be given more confused status cards. When White Queen leaves play, any confused status cards remain on the identity until that identity attempts to thwart in order to remove them.

#### OPERATION ZERO TOLERANCE (#104)

**Q: If an ally is not discarded after being defeated by an enemy attack *(for instance, it is returned to hand or shuffled into a player’s deck)*, does it go under Operation Zero Tolerance?**

A: Yes. Operation Zero Tolerance does not specify where to find the defeated ally when it resolves, so it is placed under Operation Zero Tolerance, regardless of where it ended up.

### CYCLOPS HERO PACK

#### RICOCHET BEAM (#9)

**Q: If Cyclops chooses the same enemy with Exploit Weakness attached for both of Ricochet Beam’s instances of damage, how much damage is dealt to that enemy?**

A: Exploit Weakness increases each instance of damage Ricochet Beam deals to the enemy to which Exploit Weakness is attached by 1, so Ricochet Beam deals that enemy a total of 8 damage (4 damage + 4 damage).

### MOJOMANIA SCENARIO PACK

#### WILD WILD MOJO (#66)

**Q: How is overkill damage affected by the “Forced Interrupt” on Wild Wild Mojo?**

A: Because Wild Wild Mojo increases damage a character “takes” and the overkill keyword deals damage based on excess damage “dealt” to a minion or ally, Wild Wild Mojo only increases the overkill damage once, when the villain or identity takes that damage. **(Note: This answer revises the answer provided in the Frequently Asked Questions section of the MojoMania rulebook.)**
