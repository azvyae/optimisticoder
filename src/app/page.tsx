import { ExploreApps, Hero, MostHighlightedStory } from '@/app/components';
import { STORIES_DIR } from '@/config/common';
import type { StoriesIndexEntry } from '@/types/common';
import { readFileSync } from 'fs';
import jsonata from 'jsonata';
import path from 'path';
import { cache } from 'react';

const listFourLatestStories = cache(async () => {
  try {
    const indexStories: StoriesIndexEntry[] = JSON.parse(
      readFileSync(
        path.join(process.cwd(), STORIES_DIR, 'index-stories.json'),
      ).toString(),
    );
    const expression = jsonata(`$[]`);
    const result: StoriesIndexEntry[] = await expression.evaluate(indexStories);
    return result.slice(0, 4);
  } catch (error) {
    return [];
  }
});

async function Page() {
  const stories = await listFourLatestStories();
  return (
    <main className="flex flex-col items-center justify-between mt-[72px]">
      <Hero />
      <ExploreApps />
      <MostHighlightedStory story={stories.at(0)} />
    </main>
  );
}

export default Page;
