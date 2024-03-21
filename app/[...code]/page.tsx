import games from '@/data/games';
import Chat from '../chat';
import { redirect } from 'next/navigation';
import Rulebook from './Rulebook';

import Header from './header';

type Props = {
  params: { code: string };
};

export default function Home({ params: { code } }: Props) {
  const game = games.find((game) => game.code === code[0]);
  if (!game) {
    return redirect('/');
  }
  const tab = code[1] === 'chat' ? 'chat' : 'rulebook';
  return (
    <>
      <Header game={game}  />
      {tab === 'chat' ? <Chat game={game} /> : <Rulebook code={game.code} resource={code[1] || 'rulebook'} />}
    </>
    // <div className="flex h-screen flex-col">
    //   <Tabs defaultValue={tab} className="flex flex-col p-2 h-screen">
    //     <div className="flex w-full gap-2">
    //       
    //       <TabsList className="grid w-full grid-cols-2">
    //         <TabsTrigger value="chat"><MessageCircleQuestion /> Chat</TabsTrigger>
    //         <TabsTrigger value="rulebook"><BookOpenTextIcon /> Rulebook</TabsTrigger>
    //       </TabsList>
    //       <Themer />
    //     </div>
    //     <>
    //       <TabsContent value="chat" className="h-screen overflow-auto">
    //         <Chat game={game} />
    //       </TabsContent>
    //       <TabsContent value="rulebook" className="flex-1 h-screen overflow-auto">
    //         <Suspense fallback="Loading...">
    //           <Rulebook code={game.code} resource={code[1] || 'rulebook'} />
    //         </Suspense>
    //       </TabsContent>
    //     </>
    //   </Tabs>
    // </div>
  );
}
