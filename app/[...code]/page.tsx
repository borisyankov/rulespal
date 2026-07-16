import type { Metadata } from 'next';
import games from '@/data/games';
import Chat from './chat';
import { redirect } from 'next/navigation';
import Rulebook from './Rulebook';

type Props = {
  params: Promise<{ code: string[] }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { code } = await props.params;
  const game = games.find((game) => game.code === code[0]);

  if (!game) {
    return {};
  }

  const isRulebook = !!code[1] && code[1] !== 'chat';
  const path = isRulebook ? `/${game.code}/${code[1]}` : `/${game.code}`;
  // The chat page has no crawlable content, so consolidate its ranking
  // signals onto the content-rich rulebook URL. Rulebook / extra-source
  // pages stay canonical to themselves.
  const canonical = isRulebook ? path : `/${game.code}/rulebook`;
  const image = `/thumbs/${game.code}.jpg`;

  const title = isRulebook
    ? `${game.name} Rulebook`
    : `${game.name} Rules — Ask a Question`;

  const description = isRulebook
    ? `Read the complete ${game.name} rulebook: setup, gameplay, and scoring — or ask RulesPal's AI any ${game.name} rules question and get an instant answer.`
    : `Ask any ${game.name} rules question and get an instant, accurate answer from RulesPal's AI — plus the full ${game.name} rulebook.`;

  return {
    title,
    description,
    keywords: [
      `${game.name} rules`,
      `${game.name} rulebook`,
      `how to play ${game.name}`,
      `${game.name} FAQ`,
      ...(game.alternativeNames ?? []).map((n) => `${n} rules`),
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: canonical,
      images: [{ url: image, alt: `${game.name} box art` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function GamePage(props: Props) {
  const params = await props.params;

  const {
    code
  } = params;

  const game = games.find((game) => game.code === code[0]);
  if (!game) {
    return redirect('/');
  }
  return !code[1] || code[1] === 'chat' ? (
    <Chat game={game} />
  ) : (
    <Rulebook game={game} resource={code[1] || 'rulebook'} />
  );
}
