import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';
import games from '../data/games';

interface GeeklistItem {
  id: string;
  title: string;
  description?: string;
}

async function fetchGeeklist(geeklistId: string): Promise<GeeklistItem[]> {
  try {
      const response = await fetch(`https://www.boardgamegeek.com/xmlapi/geeklist/${geeklistId}`);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text();
      const result = await parseStringPromise(data);
      const items = result.geeklist.item.map((item: any) => ({
          id: item.$.id,
          title: item.$.objectname,
          description: item.body ? item.body[0] : undefined,
      }));
      return items;
  } catch (error) {
      console.error('Error fetching geeklist:', error);
      throw error;
  }
}

async function listNotExitingGames() {
  // const geeklistId = '299279'; // Most played games of all time (April 2022 version)
  // const geeklistId = '330951'; // Top 50 Most Played - December 2023
  // const geeklistId = '327111'; // Top 50 Most Played - November 2023
  const geeklistId = '324731'; // 2023 People's Choice Top 200 Solo Games
  // const geeklistId = '326659'; // Reviewer's "Best of 2023" meta-Compilation
  let notFound = 0; 
  const items = await fetchGeeklist(geeklistId);
  const top50 = items.slice(0, 50);
  for (const item of top50) {
    const game = games.find(g => g.name === item.title);
    if (!game) {
      console.log(item.title);
      notFound++;
    }
  }
  console.log('Not found:', notFound);
  console.log('Total:', items.length);
}

listNotExitingGames();