import sechs_nimmt_rulebook from "./6_nimmt_rulebook.md";
import seven_wonders_rulebook from "./7_wonders_rulebook.md";
import ark_nova_rulebook from "./ark_nova_rulebook.md";
import arkham_horror_card_game_reference from "./arkham_horror_card_game_reference.md";
import azul_rulebook from "./azul_rulebook.md";
import cascadia_rulebook from "./cascadia_rulebook.md";
import dune_imperium_uprising_rulebook from "./dune_imperium_uprising_rulebook.md";
import for_northwood_rulebook from "./for_northwood_rulebook.md";
import forest_shuffle_rulebook from "./forest_shuffle_rulebook.md";
import forest_shuffle_appendix from "./forest_shuffle_appendix.md";
import obsession_rulebook from "./obsession_rulebook.md";
import scout_rulebook from "./scout_rulebook.md";
import sea_salt_n_paper from "./sea_salt_n_paper_rulebook.md";
import splendor from "./splendor_rulebook.md";
import ticket_to_ride from "./ticket_to_ride_rulebook.md";
import underwater_cities from "./underwater_cities_rulebook.md";
import wingspan from "./wingspan_rulebook.md";

export type RulebookAsset = {
  bggid: number;
  name: string;
  rulebook: string;
};

const assets: RulebookAsset[] = [
  {
    bggid: 268586,
    name: "6 Nimmt",
    rulebook: sechs_nimmt_rulebook.toString(),
  },
  {
    bggid: 68448,
    name: "7 Wonders",
    rulebook: seven_wonders_rulebook.toString(),
  },
  {
    bggid: 342942,
    name: "Ark Nova",
    rulebook: ark_nova_rulebook.toString(),
  },
  {
    bggid: 205637,
    name: "Arkham Horror: The Card Game (Reference)",
    rulebook: arkham_horror_card_game_reference.toString(),
  },
  {
    bggid: 230802,
    name: "Azul",
    rulebook: azul_rulebook.toString(),
  },
  {
    bggid: 295947,
    name: "Cascadia",
    rulebook: cascadia_rulebook.toString(),
  },
  {
    bggid: 397598,
    name: "Dune: Imperium – Uprising",
    rulebook: dune_imperium_uprising_rulebook.toString(),
  },
  {
    bggid: 334590,
    name: "For Northwood!",
    rulebook: for_northwood_rulebook.toString(),
  },
  {
    bggid: 391163,
    name: "Forest Shuffle",
    rulebook: forest_shuffle_rulebook.toString(),
  },
  {
    bggid: 391163_2,
    name: "Forest Shuffle (Appendix)",
    rulebook: forest_shuffle_appendix.toString(),
  },
  {
    bggid: 231733,
    name: "Obsession",
    rulebook: obsession_rulebook.toString(),
  },
  {
    bggid: 291453,
    name: "SCOUT",
    rulebook: scout_rulebook.toString(),
  },
  {
    bggid: 367220,
    name: "Sea Salt & Paper",
    rulebook: sea_salt_n_paper.toString(),
  },
  {
    bggid: 148228,
    name: "Splendor",
    rulebook: splendor.toString(),
  },
  {
    bggid: 9209,
    name: "Ticket to Ride",
    rulebook: ticket_to_ride.toString(),
  },
  {
    bggid: 247763,
    name: "Underwater Cities",
    rulebook: underwater_cities.toString(),
  },
  {
    bggid: 266192,
    name: "Wingspan",
    rulebook: wingspan.toString(),
  },
];

export default assets;
