import fetch from 'node-fetch';
import sharp from 'sharp';
import { parseStringPromise } from 'xml2js';
import games from '../data/games';
import { Game } from '@/app/lib/definitions';
import fs from 'fs';
import path from 'path';

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
      .resize(500)
      .toFile(outputFilename);    
    console.log(`Image saved as ${outputFilename}`);
  } catch (error) {
    console.error("Failed to download or resize image", error);
  }
}

async function processGame(game: Game): Promise<void> {
  const projectRoot = path.resolve(__dirname, '..');
  const outputFilename = `${projectRoot}/public/thumbs/${game.code}.jpg`;
  if (fs.existsSync(outputFilename)) {
    console.log(`Skipping ${game.code}`);
    return;
  }
  console.log(`Processing ${game.code}`);
  const imageUrl = await getGameImageUrl(game.bggid.toString());
  if (imageUrl) {
    await downloadAndResizeImage(imageUrl, outputFilename);
  }
}

async function processGames(games: Game[]): Promise<void> {
  for (const game of games) {
    processGame(game);
  }
}

// processGames([games.find(x => x.code === 'skull_king')]);
processGames(games);