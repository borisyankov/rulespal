'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/app/ui/dialog';
import type { Game } from '../lib/definitions';
import GameBar from './gamebar';
import { SearchIcon } from 'lucide-react';
import RoundButton from './round-button';

type Props = {
  game: Game;
};

export default function GameDialog({ game }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <RoundButton>
          <SearchIcon className="size-5 cursor-pointer" />
        </RoundButton>
      </DialogTrigger>
      <DialogContent className="size-full">
        <GameBar />
      </DialogContent>
    </Dialog>
  );
}
