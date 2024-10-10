import {
  ExploreApps,
  Hero,
  LatestStories,
  MostHighlightedStory,
} from '@/app/components';
import { STORIES_URL } from '@/config/common';
import { sfetch } from '@/helpers/common';
import type { StoriesIndexEntry } from '@/types/common';
import type { CommonResponse } from '@/types/responses';
import jsonata from 'jsonata';

async function listFiveLatestStories() {
  try {
    const res = (await sfetch(`${STORIES_URL}/stories/stories.json`, {
      next: {
        revalidate: 86400,
        tags: ['stories'],
      },
    })) as CommonResponse<StoriesIndexEntry[]>;
    if (!res.ok) {
      throw new Error((await res.json()).message);
    }
    const indexStories = (await res.json()).map((story) => {
      return { ...story, cover: `${STORIES_URL}/stories/${story.cover}` };
    });
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
