import sechs_nimmt_rulebook from "./rulebooks/6_nimmt_rulebook.md";
import seven_wonders_rulebook from "./rulebooks/7_wonders_rulebook.md";
import ark_nova_rulebook from "./rulebooks/ark_nova_rulebook.md";
import arkham_horror_card_game_reference from "./rulebooks/arkham_horror_card_game_reference.md";
import azul_rulebook from "./rulebooks/azul_rulebook.md";
import cascadia_rulebook from "./rulebooks/cascadia_rulebook.md";
import catan_rulebook from "./rulebooks/catan_rulebook.md";
import dune_imperium_uprising_rulebook from "./rulebooks/dune_imperium_uprising_rulebook.md";
import for_northwood_rulebook from "./rulebooks/for_northwood_rulebook.md";
import forest_shuffle_rulebook from "./rulebooks/forest_shuffle_rulebook.md";
import forest_shuffle_appendix from "./rulebooks/forest_shuffle_appendix.md";
import hanabi_rulebook from "./rulebooks/hanabi_rulebook.md";
import heat_rulebook from "./rulebooks/heat_rulebook.md";
import just_one_rulebook from "./rulebooks/just_one_rulebook.md";
import obsession_rulebook from "./rulebooks/obsession_rulebook.md";
import pandemic_rulebook from "./rulebooks/pandemic_rulebook.md";
import ra_rulebook from "./rulebooks/ra_rulebook.md";
import scout_rulebook from "./rulebooks/scout_rulebook.md";
import sea_salt_n_paper from "./rulebooks/sea_salt_n_paper_rulebook.md";
import splendor from "./rulebooks/splendor_rulebook.md";
import the_castles_of_burgundy_rulebook from "./rulebooks/the_castles_of_burgundy_rulebook.md";
import ticket_to_ride from "./rulebooks/ticket_to_ride_rulebook.md";
import underwater_cities from "./rulebooks/underwater_cities_rulebook.md";
import wingspan from "./rulebooks/wingspan_rulebook.md";

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
    bggid: 13,
    name: "CATAN",
    rulebook: catan_rulebook.toString(),
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
    bggid: 98778,
    name: "Hanabi",
    rulebook: hanabi_rulebook.toString(),
  },
  {
    bggid: 366013,
    name: "Heat: Pedal to the Metal",
    rulebook: heat_rulebook.toString(),
  },
  {
    bggid: 254640,
    name: "Just One",
    rulebook: just_one_rulebook.toString(),
  },
  {
    bggid: 231733,
    name: "Obsession",
    rulebook: obsession_rulebook.toString(),
  },
  {
    bggid: 30549,
    name: "Pandemic",
    rulebook: pandemic_rulebook.toString(),
  },  
  {
    bggid: 12,
    name: "Ra",
    rulebook: ra_rulebook.toString(),
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
    bggid: 84876,
    name: "The Castles of Burgundy",
    rulebook: the_castles_of_burgundy_rulebook.toString(),
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
