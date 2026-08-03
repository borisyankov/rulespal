'use client';

import { Input } from './input';
import { SearchIcon } from 'lucide-react';
import games from '@/data/games';

type Props = {
  search: string;
  onSearchChange: (search: string) => void;
};

export default function SearchInput({ search, onSearchChange }: Props) {
  return (
    <div className="relative flex w-full items-center">
      <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary" />
      <Input
        autoFocus
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="pl-8"
        placeholder={`Search ${games.length} games`}
      />
    </div>
  );
}
