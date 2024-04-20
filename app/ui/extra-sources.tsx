import Link from 'next/link';
import type { Game } from '../lib/definitions';

type Props = {
  game: Game;
}

export default function ExtraSources({ game }: Props) {
  if (!game.extraSources) {
    return null;
  }
  return (
    <div>
      {game.extraSources.map((source, _) => (
        <Link key={source} href={source}>{source}</Link>
      ))}
    </div>
  );
}
