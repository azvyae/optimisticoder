import type { IconType } from 'react-icons';

interface LinkType {
  name: string;
  href?: string;
  Icon?: IconType;
}

interface StoriesMetadata {
  title: string;
  subtitle: string;
  excerpt: string;
  cover: string;
  date: string;
  keywords: string[];
}

interface StoriesIndexEntry extends StoriesMetadata {
  slug: string;
  category: string;
  readTime: string;
}

type CategoryIndexEntry = string[];
