import * as fs from 'fs';
import csvParser from 'csv-parser';
import games from '../data/games';

async function listNotExitingGames() {
  type GameRow = {
    Game: string,
  }
  const items: GameRow[] = [];
  fs.createReadStream('../boardgames_all_time.csv')
  .pipe(csvParser())
  .on('data', (data) => items.push(data))
  .on('end', () => {
    let notFound = 0; 
    const top = items.slice(0, 100);
    for (const item of top) {
      const game = games.find(g => g.name === item.Game || g.alternativeNames?.includes(item.Game));
      if (!game) {
        console.log(item.Game);
        notFound++;
      }
    }
    console.log('Games:', games.length);
    console.log('Not found:', notFound);
    console.log('Total:', items.length);
  });
}

listNotExitingGames();