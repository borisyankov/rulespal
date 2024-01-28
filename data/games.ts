import sechs_nimmt_rulebook from "./rulebooks/6_nimmt_rulebook.md";
import seven_wonders_rulebook from "./rulebooks/7_wonders_rulebook.md";
import seven_wonders_duel_rulebook from "./rulebooks/7_wonders_duel_rulebook.md";
import ark_nova_rulebook from "./rulebooks/ark_nova_rulebook.md";
import arkham_horror_card_game_reference from "./rulebooks/arkham_horror_card_game_reference.md";
import azul_rulebook from "./rulebooks/azul_rulebook.md";
import cascadia_rulebook from "./rulebooks/cascadia_rulebook.md";
import catan_rulebook from "./rulebooks/catan_rulebook.md";
import dune_imperium_uprising_rulebook from "./rulebooks/dune_imperium_uprising_rulebook.md";
import everdell_rulebook from "./rulebooks/everdell_rulebook.md";
import for_northwood_rulebook from "./rulebooks/for_northwood_rulebook.md";
import forest_shuffle_rulebook from "./rulebooks/forest_shuffle_rulebook.md";
import forest_shuffle_appendix from "./rulebooks/forest_shuffle_appendix.md";
import gizmos_rulebook from "./rulebooks/gizmos_rulebook.md";
import hanabi_rulebook from "./rulebooks/hanabi_rulebook.md";
import heat_rulebook from "./rulebooks/heat_rulebook.md";
import just_one_rulebook from "./rulebooks/just_one_rulebook.md";
import kingdomino_rulebook from "./rulebooks/kingdomino_rulebook.md";
import lost_ruins_of_arnak_rulebook from "./rulebooks/lost_ruins_of_arnak_rulebook.md";
import obsession_rulebook from "./rulebooks/obsession_rulebook.md";
import pandemic_rulebook from "./rulebooks/pandemic_rulebook.md";
import patchwork_rulebook from "./rulebooks/patchwork_rulebook.md";
import planet_unknown_rulebook from "./rulebooks/planet_unknown_rulebook.md";
import ra_rulebook from "./rulebooks/ra_rulebook.md";
import scout_rulebook from "./rulebooks/scout_rulebook.md";
import sea_salt_n_paper from "./rulebooks/sea_salt_n_paper_rulebook.md";
import splendor from "./rulebooks/splendor_rulebook.md";
import the_castles_of_burgundy_rulebook from "./rulebooks/the_castles_of_burgundy_rulebook.md";
import the_white_castle_rulebook from "./rulebooks/the_white_castle_rulebook.md";
import ticket_to_ride from "./rulebooks/ticket_to_ride_rulebook.md";
import underwater_cities from "./rulebooks/underwater_cities_rulebook.md";
import wingspan from "./rulebooks/wingspan_rulebook.md";
import { Game } from "@/app/lib/definitions";

const assets: Game[] = [
  {
    bggid: 268586,
    name: "6 Nimmt",
    rulebook: sechs_nimmt_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/DFeZsC973xdZ1CKUzmjAUw__thumb/img/TTIPiPwQpowcHjYMxtk920ZwR3c=/fit-in/200x150/filters:strip_icc()/pic4496538.jpg',
  },
  {
    bggid: 68448,
    name: "7 Wonders",
    rulebook: seven_wonders_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/35h9Za_JvMMMtx_92kT0Jg__thumb/img/BUOso8b0M1aUOkU80FWlhE8uuxc=/fit-in/200x150/filters:strip_icc()/pic7149798.jpg',
  },
  {
    bggid: 173346,
    name: "7 Wonders Duel",
    rulebook: seven_wonders_duel_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/zdagMskTF7wJBPjX74XsRw__thumb/img/gV1-ckZSIC-dCxxpq1Y7GmPITzQ=/fit-in/200x150/filters:strip_icc()/pic2576399.jpg',
  },
  {
    bggid: 342942,
    name: "Ark Nova",
    rulebook: ark_nova_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/SoU8p28Sk1s8MSvoM4N8pQ__thumb/img/4KuHNTWSMPf8vTNDKSRMMI3oOv8=/fit-in/200x150/filters:strip_icc()/pic6293412.jpg',
  },
  {
    bggid: 205637,
    name: "Arkham Horror: The Card Game",
    rulebook: arkham_horror_card_game_reference.toString(),
    thumbnail: 'https://cf.geekdo-images.com/B5F5ulz0UivNgrI9Ky0euA__thumb/img/L8ouPl5jv2Ye9MC4R_Os2zSGigE=/fit-in/200x150/filters:strip_icc()/pic3122349.jpg',
  },
  {
    bggid: 230802,
    name: "Azul",
    rulebook: azul_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/aPSHJO0d0XOpQR5X-wJonw__thumb/img/ccsXKrdGJw-YSClWwzVUwk5Nh9Y=/fit-in/200x150/filters:strip_icc()/pic6973671.png',
  },
  {
    bggid: 295947,
    name: "Cascadia",
    rulebook: cascadia_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/MjeJZfulbsM1DSV3DrGJYA__thumb/img/tVSFjSxYEcw7sKj3unIIQV8kxoc=/fit-in/200x150/filters:strip_icc()/pic5100691.jpg',
  },
  {
    bggid: 13,
    name: "CATAN",
    rulebook: catan_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__thumb/img/8a9HeqFydO7Uun_le9bXWPnidcA=/fit-in/200x150/filters:strip_icc()/pic2419375.jpg',
  },
  {
    bggid: 397598,
    name: "Dune: Imperium – Uprising",
    rulebook: dune_imperium_uprising_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/UVUkjMV_Q2paVUIUP30Vvw__thumb/img/H6qmxJrRFjtOAPZOfDoZ480-46I=/fit-in/200x150/filters:strip_icc()/pic7664424.jpg',
  },
  {
    bggid: 199792,
    name: "Everdell",
    rulebook: everdell_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/fjE7V5LNq31yVEW_yuqI-Q__thumb/img/Cf_mYxR_VvdjTEPXseSurni2JNI=/fit-in/200x150/filters:strip_icc()/pic3918905.png',
  },
  {
    bggid: 334590,
    name: "For Northwood!",
    rulebook: for_northwood_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/3MdUGB8YD_jGTDyfbAnX9Q__thumb/img/c41bbBRd7BC3KKqLFdKb6URXzsA=/fit-in/200x150/filters:strip_icc()/pic6763912.png',
  },
  {
    bggid: 391163,
    name: "Forest Shuffle",
    rulebook: forest_shuffle_rulebook.toString() + forest_shuffle_appendix.toString(),
    thumbnail: 'https://cf.geekdo-images.com/08bC8NviSTNc4Zvur4pueA__thumb/img/Xq8TNBmMl3Z7DoynvbUXchFAztc=/fit-in/200x150/filters:strip_icc()/pic7578350.jpg',
  },
  {
    bggid: 246192,
    name: "Gizmos",
    rulebook: gizmos_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/zin82Hg4MXck86t8fzbsdA__thumb/img/e-UqOrMfsLCh2T_igK3wkoFrOu8=/fit-in/200x150/filters:strip_icc()/pic4169718.png',
  },
  {
    bggid: 98778,
    name: "Hanabi",
    rulebook: hanabi_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/JDVksMwfcqoem1k_xtZrOA__thumb/img/amCeCcEKhYGbVtDvpvIMnu3qTg0=/fit-in/200x150/filters:strip_icc()/pic2007286.jpg',
  },
  {
    bggid: 366013,
    name: "Heat: Pedal to the Metal",
    rulebook: heat_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/-vOrd4bOspibyohYExLqWg__thumb/img/2GbaKvYOzWIxfgbYTk2R9puiyzo=/fit-in/200x150/filters:strip_icc()/pic6940449.png',
  },
  {
    bggid: 254640,
    name: "Just One",
    rulebook: just_one_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/ocAuKT9hp99yBY77e4uuPg__thumb/img/ESTo05e9zuU6VJs3RyusEYGdc3Y=/fit-in/200x150/filters:strip_icc()/pic5137279.jpg',
  },
  {
    bggid: 204583,
    name: "Kingdomino",
    rulebook: kingdomino_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/3h9W8BfB_rltQ48EBmHliw__thumb/img/RGpbcY90eBcNLXbHLMBwLrr2uzo=/fit-in/200x150/filters:strip_icc()/pic3132685.png',
  },
  {
    bggid: 312484,
    name: "Lost Ruins of Arnak",
    rulebook: lost_ruins_of_arnak_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/6GqH14TJJhza86BX5HCLEQ__thumb/img/J8SVmGOJXZGxNjkT3xYNQU7Haxg=/fit-in/200x150/filters:strip_icc()/pic5674958.jpg',
  },
  {
    bggid: 231733,
    name: "Obsession",
    rulebook: obsession_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/sy89BiuZXfbSnG7Cag9tBQ__thumb/img/eTnMwfCC2jCGDPXC08SIaMXNOTM=/fit-in/200x150/filters:strip_icc()/pic5902073.png',
  },
  {
    bggid: 30549,
    name: "Pandemic",
    rulebook: pandemic_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/S3ybV1LAp-8SnHIXLLjVqA__thumb/img/oqViRj6nVxK3m36NluTxU1PZkrk=/fit-in/200x150/filters:strip_icc()/pic1534148.jpg',
  },
  {
    bggid: 163412,
    name: "Patchwork",
    rulebook: patchwork_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/wLW7pFn0--20lEizEz5p3A__thumb/img/P49TUiytgjmRAtKsfO7Y3yU_xic=/fit-in/200x150/filters:strip_icc()/pic2270442.jpg',
  },
  {
    bggid: 258779,
    name: "Planet Unknown",
    rulebook: planet_unknown_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/3HkjDovk8Yr2wMumcSUGog__thumb/img/4pF1oDpvn1VR3rbvW88xLK86xmA=/fit-in/200x150/filters:strip_icc()/pic4843622.jpg',
  },
  {
    bggid: 12,
    name: "Ra",
    rulebook: ra_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/k7lG683LBZdvFyS-FH-MpA__thumb/img/6KTtiknxxGwd0ARKrlsdoXFtHfI=/fit-in/200x150/filters:strip_icc()/pic6746812.png',
  },
  {
    bggid: 291453,
    name: "SCOUT",
    rulebook: scout_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/cf0xxkevbwTGF3VUZymKjg__thumb/img/NUcMdmZ3_eA1YfIwL8iRgkZKaHw=/fit-in/200x150/filters:strip_icc()/pic6398727.png',
  },
  {
    bggid: 367220,
    name: "Sea Salt & Paper",
    rulebook: sea_salt_n_paper.toString(),
    thumbnail: 'https://cf.geekdo-images.com/CIh_rXKoRw9z8K0PJxT8nQ__thumb/img/Jh6NjibuHeYrZtSsAUXq82B1fTQ=/fit-in/200x150/filters:strip_icc()/pic6973911.jpg',
  },
  {
    bggid: 148228,
    name: "Splendor",
    rulebook: splendor.toString(),
    thumbnail: 'https://cf.geekdo-images.com/rwOMxx4q5yuElIvo-1-OFw__thumb/img/D4hkkHfOgu22PwgJomjplWAveuo=/fit-in/200x150/filters:strip_icc()/pic1904079.jpg',
  },
  {
    bggid: 84876,
    name: "The Castles of Burgundy",
    rulebook: the_castles_of_burgundy_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/5CFwjd8zTcGYVUnkXh04hw__thumb/img/0AG_6zsfYQjqlUHG0-_8lcjp8rc=/fit-in/200x150/filters:strip_icc()/pic1176894.jpg',
  },
  {
    bggid: 371942,
    name: "The White Castle",
    rulebook: the_white_castle_rulebook.toString(),
    thumbnail: 'https://cf.geekdo-images.com/qXT1U-nFh9PE8ujfdmI7dA__thumb/img/ru1l95gdKNXSsByDglE9Xxgu0kE=/fit-in/200x150/filters:strip_icc()/pic7754663.jpg',
  },
  {
    bggid: 9209,
    name: "Ticket to Ride",
    rulebook: ticket_to_ride.toString(),
    thumbnail: 'https://cf.geekdo-images.com/ZWJg0dCdrWHxVnc0eFXK8w__thumb/img/a9rsFV6KR0aun8GobhRU16aU8Kc=/fit-in/200x150/filters:strip_icc()/pic38668.jpg',
  },
  {
    bggid: 247763,
    name: "Underwater Cities",
    rulebook: underwater_cities.toString(),
    thumbnail: 'https://cf.geekdo-images.com/PwOwTVHovJAUQgghnGqCOg__thumb/img/1gGYiRBx7W4wyLy826EHGTdjsKA=/fit-in/200x150/filters:strip_icc()/pic4837710.png',
  },
  {
    bggid: 266192,
    name: "Wingspan",
    rulebook: wingspan.toString(),
    thumbnail: 'https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__thumb/img/VNToqgS2-pOGU6MuvIkMPKn_y-s=/fit-in/200x150/filters:strip_icc()/pic4458123.jpg',
  },
];

export default assets;
