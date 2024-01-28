import { Game } from "../lib/definitions";

type Props = {
  game: Game;
  className?: string;
}

export default function Thumbnail({ game, className }: Props) {
  return (
    <img className={`object-scale-down size-12 ${className}`} src={game.thumbnail} alt={`${game.name} thumbnail`} />
  );
}
