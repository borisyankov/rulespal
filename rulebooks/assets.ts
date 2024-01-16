import sechs_nimmt_rulebook from "./6_nimmt_rulebook.md";
import azul_rulebook from "./azul_rulebook.md";
import forest_shuffle_rulebook from "./forest_shuffle_rulebook.md";
import forest_shuffle_appendix from "./forest_shuffle_appendix.md";
import obsession_rulebook from "./obsession_rulebook.md";
import scout_rulebook from "./scout_rulebook.md";
import sea_salt_n_paper from "./sea_salt_n_paper_rulebook.md";
import splendor from "./splendor_rulebook.md";

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
    bggid: 230802,
    name: "Azul",
    rulebook: azul_rulebook.toString(),
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
];

export default assets;
