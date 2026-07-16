import type { MetadataRoute } from 'next';
import games from '@/data/games';

const siteUrl = 'https://rulespal.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  const gamePages: MetadataRoute.Sitemap = games.flatMap((game) => [
    {
      url: `${siteUrl}/${game.code}/rulebook`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/${game.code}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]);

  return [...home, ...gamePages];
}
