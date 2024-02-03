import games from '@/data/games';
import Chat from '../chat';
import GameBar from '@/app/ui/gamebar';
import { redirect } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/ui/tabs';
import Rulebook from './Rulebook';
import Themer from '../ui/themer';

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
      <Tabs defaultValue="chat" className="w-full flex-1 flex-row">
        <GameBar game={game} />
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="rulebook">Rulebook</TabsTrigger>
        </TabsList>
        <Themer />
        <TabsContent value="chat">
          <Chat game={game} />
        </TabsContent>
        <TabsContent value="rulebook">
          <Rulebook code={game.code} />
        </TabsContent>
      </Tabs>
    </div>
  );
}