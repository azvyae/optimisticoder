import { STORIES_URL } from '@/config/common';
import { sfetch } from '@/helpers/common';
import type { CommonResponse } from '@/types/responses';
import { type MetadataRoute } from 'next';
import { cache } from 'react';

const getSitemap = cache(async () => {
  try {
    const res = (await sfetch(`${STORIES_URL}/stories/sitemap.json`, {
      next: {
        revalidate: 86400,
      },
    })) as CommonResponse<MetadataRoute.Sitemap>;
    if (!res.ok) {
      throw new Error((await res.json()).message);
    }
    return await res.json();
  } catch (error) {
    return [];
  }
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const remoteSitemap = await getSitemap();

  return [
    {
      url: 'https://optimisticoder.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://optimisticoder.com/stories',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...remoteSitemap,
    {
      url: 'https://optimisticoder.com/privacy-policy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
    {
      url: 'https://optimisticoder.com/disclaimer',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ];
}
