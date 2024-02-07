import games from '@/data/games';
import Chat from '../chat';
import { redirect } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/ui/tabs';
import Rulebook from './Rulebook';
import Themer from '../ui/themer';
import GameDialog from '../ui/game-dialog';

type Props = {
  params: { id: string };
};

export default function Home({ params: { id } }: Props) {
  const game = games.find((game) => game.bggid === +id);
  if (!game) {
    return redirect('/');
  }
  return (
    <div className="flex h-screen flex-col">
      <Tabs defaultValue="chat" className="flex flex-col p-2">
        <div className="flex w-full flex-1 gap-2">
          <GameDialog game={game} />
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="rulebook">Rulebook</TabsTrigger>
          </TabsList>
          <Themer />
        </div>
        <div>
          <TabsContent value="chat" className="flex-1">
            <Chat game={game} />
          </TabsContent>
          <TabsContent value="rulebook" className="flex-1">
            <Rulebook code={game.code} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
