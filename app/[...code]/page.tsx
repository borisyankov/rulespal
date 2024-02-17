import games from '@/data/games';
import Chat from '../chat';
import { redirect, useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/ui/tabs';
import Rulebook from './Rulebook';
import Themer from '../ui/themer';
import GameDialog from '../ui/game-dialog';
import { Suspense } from 'react';

type Props = {
  params: { code: string };
};

export default function Home({ params: { code } }: Props) {
  const game = games.find((game) => game.code === code[0]);
  if (!game) {
    return redirect('/');
  }
  const tab = code[1] === 'rules' ? 'rulebook' : 'chat';
  return (
    <div className="flex h-screen flex-col">
      <Tabs defaultValue={tab} className="flex flex-col p-2 h-screen">
        <div className="flex w-full gap-2">
          <GameDialog game={game} />
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="rulebook">Rulebook</TabsTrigger>
          </TabsList>
          <Themer />
        </div>
        <>
          <TabsContent value="chat" className="flex-col flex-1 h-screen overflow-auto">
            <Chat game={game} />
          </TabsContent>
          <TabsContent value="rulebook" className="flex-1 h-screen overflow-auto">
            <Suspense fallback="Loading...">
              <Rulebook code={game.code} />
            </Suspense>
          </TabsContent>
        </>
      </Tabs>
    </div>
  );
}
