import games from '@/data/games';
import type { Game } from './definitions';

function matchesSearchInput(target: string, searchInput: string): boolean {
  let searchIndex = 0;
  const lowerCaseTarget = target.toLowerCase();
  const lowerCaseSearchInput = searchInput.toLowerCase();
  for (let i = 0; i < lowerCaseTarget.length; i++) {
    if (lowerCaseTarget[i] === lowerCaseSearchInput[searchIndex]) {
      searchIndex++;
    }
    if (searchIndex === lowerCaseSearchInput.length) {
      return true;
    }
  }
  return false;
}

export function searchGames(search: string): Game[] {
  return games.filter((game) =>
    [game.name, game.code, ...(game.alternativeNames || [])].some((name) =>
      matchesSearchInput(name, search),
    ),
  );
}
