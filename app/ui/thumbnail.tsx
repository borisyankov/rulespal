import { Game } from "../lib/definitions";

type Props = {
  game: Game;
  className?: string;
}

export default function Thumbnail({ game, className }: Props) {
  return (
    <img className={`object-scale-down size-24 ${className}`} src={`/thumbs/${game.code}.jpg`} alt={`${game.name} thumbnail`} />
  );
}
