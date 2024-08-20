import {
  ExploreApps,
  Hero,
  LatestStories,
  MostHighlightedStory,
} from '@/app/components';
import { STORIES_DIR } from '@/config/common';
import type { StoriesIndexEntry } from '@/types/common';
import { readFileSync } from 'fs';
import jsonata from 'jsonata';
import path from 'path';

async function listFiveLatestStories() {
  try {
    const indexStories: StoriesIndexEntry[] = JSON.parse(
      readFileSync(
        path.join(process.cwd(), STORIES_DIR, 'index-stories.json'),
      ).toString(),
    );
    const expression = jsonata(`$[]`);
    const result: StoriesIndexEntry[] = await expression.evaluate(indexStories);
    return result.slice(0, 5);
  } catch (error) {
    return [];
  }
}

async function Page() {
  const stories = await listFiveLatestStories();
  return (
    <main className="flex flex-col items-center justify-between mt-[72px]">
      <Hero />
      <ExploreApps />
      <MostHighlightedStory story={stories.at(0)} />
      <LatestStories stories={stories.slice(1, 5)} />
    </main>
  );
}

export default Page;
