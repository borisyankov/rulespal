import fetch from 'node-fetch';
import sharp from 'sharp';
import { parseStringPromise } from 'xml2js';
import games from '../data/games';
import { Game } from '@/app/lib/definitions';

async function getGameImageUrl(gameId: string): Promise<string | null> {
  try {
    const response = await fetch(`https://boardgamegeek.com/xmlapi/boardgame/${gameId}`);
    const text = await response.text();
    const result = await parseStringPromise(text);
    const imageUrl = result.boardgames.boardgame[0].image[0];
    return imageUrl;
  } catch (error) {
    console.error(`Failed to fetch data for game ID ${gameId}`, error);
    return null;
  }
}

async function downloadAndResizeImage(imageUrl: string, outputFilename: string): Promise<void> {
  try {
    console.log(`imageUrl ${imageUrl}`);
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    console.log('resizing');
    await sharp(buffer)
      .resize(500, 500, { fit: 'contain' })
      .toFile(outputFilename);    
    console.log(`Image saved as ${outputFilename}`);
  } catch (error) {
    console.error("Failed to download or resize image", error);
  }
}

async function processGame(game: Game): Promise<void> {
  console.log(`Processing ${game.code}`);
  const imageUrl = await getGameImageUrl(game.bggid.toString());

  if (imageUrl) {
    const outputFilename = `./thumbs/${game.code}.jpg`;
    await downloadAndResizeImage(imageUrl, outputFilename);
  }
}

async function processGames(games: Game[]): Promise<void> {
  for (const game of games) {
    await processGame(game);
  }
}

// processGames([games.find(x => x.code === 'skull_king')]);
processGames(games);