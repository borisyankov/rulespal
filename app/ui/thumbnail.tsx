import type { Game } from "../lib/definitions";

type Props = {
  game: Game;
  className?: string;
}

export default function Thumbnail({ game, className = '' }: Props) {
  return (
    <img className={`object-contain rounded-lg ${className}`} src={`/thumbs/${game.code}.jpg`} alt={`${game.name} thumbnail`} />
  );
}
