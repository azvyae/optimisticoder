import { type MetadataRoute } from 'next';
import generatedSitemap from '@/generated-sitemap.json';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://optimisticoder.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://optimisticoder.com/portfolio',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://optimisticoder.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://optimisticoder.com/stories',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    ...(generatedSitemap as MetadataRoute.Sitemap),
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
