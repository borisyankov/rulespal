import Title from "@/app/ui/title";
import { XMLParser }  from "fast-xml-parser";

type PollResults = unknown[];

type GameInfoXML = {
  thumbnail: string;
  image: string;
  name: Array<{ type: 'primary' | 'alternate', sortindex: string, value: string }>;
  description: string;
  yearpublished: { value: string };
  minplayers: { value: string };
  maxplayers: { value: string };
  poll: PollResults[];
  playingtime: { value: string };
  minplaytime: { value: string };
  maxplaytime: { value: string };
  minage: { value: string };
  link: Array<{ type: 'boardgamecategory' | 'boardgamemechanic' | 'boardgamefamily', id: string, value: string }>;
}

type GameInfo = {
  thumbnail: string;
  image: string;
  name: string;
  description: string;
  yearpublished: number;
  minPlayers: number;
  maxPlayers: number;
  poll: { best: number[], recommended: number[], notrecommended: number[] };
  playingTime: number;
  minPlayTime: number;
  maxPlayTime: number;
  minAge: number;
  category: string[];
  mechanics: string[];
  family: string[];
}

function objectToProcessedGameInfo(xml: GameInfoXML) {
  return {
    thumbnail: xml.thumbnail,
    image: xml.image,
    name: xml.name.find(x => x.type === 'primary')?.value,
    description: xml.description,
    yearPublished: +xml.yearpublished.value,
    minPlayers: +xml.minplayers.value,
    maxPlayers: +xml.maxplayers.value,
    // poll: xml.poll.reduce((prev, poll) => { if (poll["Best"] >)}), // do some awesome parsing here
    playingTime: +xml.playingtime.value,
    minPlayTime: +xml.minplaytime.value,
    maxPlayTime: +xml.maxplaytime.value,
    minAge: +xml.minage.value,
    communityMinAge: 0,
    category: xml.link.filter(x => x.type === 'boardgamecategory').map(x => x.value),
    mechanism: xml.link.filter(x => x.type === 'boardgamemechanic').map(x => x.value),
    family: xml.link.filter(x => x.type === 'boardgamefamily').map(x => x.value),
    // boardgameaccessory, boardgamedesigner, boardgameartist, boardgamepublisher
  }
}

function gameInfoToHuman(gg: GameInfo): string {
  return `Name: ${gg.name}
Description: ${gg.description}
Thumbnail: ${gg.thumbnail}
Image: ${gg.image}
Year Published: ${gg.yearpublished}
Players: ${gg.minPlayers}-${gg.maxPlayers}
Playing Time: ${gg.minPlayTime}-${gg.maxPlayTime} Min
Age: ${gg.minAge}+
`;
}

async function getGameInfo(gameId: number): Promise<unknown> {
  try {
    const response = await fetch(
      `https://boardgamegeek.com/xmlapi2/thing?id=${gameId}&stats=1`
    );
    const data = await response.text();
    try {
      const parser = new XMLParser({ ignoreAttributes : false, attributeNamePrefix : "" });
      const result = parser.parse(data);
      // return result.items.item;
      return objectToProcessedGameInfo(result.items.item);
    } catch (err) {
      console.error("Error parsing XML:", err);
    }
  } catch (error) {
    console.error("Error fetching game data:", error);
  }
}

export default async function ShowGameInfo() {
  const gameInfo = await getGameInfo(262712);

  return (
    <>
      <Title>Game Info</Title>
      {/* <pre>{gameInfo}</pre> */}
      <pre>{JSON.stringify(gameInfo, null, 2)}</pre>
    </>
  );
}
