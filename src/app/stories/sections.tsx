import { FilteringHandler } from '@/app/stories/components';
import { StoryCard } from '@/components/common/story-card';
import { STORIES_DIR } from '@/config/common';
import type { StoriesIndexEntry } from '@/types/common';
import Stars from '@public/static/svg/stars.svg';
import { readFileSync } from 'fs';
import jsonata from 'jsonata';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import path from 'path';

async function listCategories() {
  try {
    const indexCategories: string[] = JSON.parse(
      readFileSync(
        path.join(process.cwd(), STORIES_DIR, 'index-categories.json'),
      ).toString(),
    );
    const expression = jsonata(`$[]`);
    const result: string[] = await expression.evaluate(indexCategories);
    return result;
  } catch (error) {
    return [];
  }
}

async function listStories(
  page = 1,
  key?: 'category' | 'search',
  value?: string,
) {
  try {
    const indexStories: StoriesIndexEntry[] = JSON.parse(
      readFileSync(
        path.join(process.cwd(), STORIES_DIR, 'index-stories.json'),
      ).toString(),
    );
    const expression = jsonata(`$[]`);
    const result: StoriesIndexEntry[] = await expression.evaluate(indexStories);
    return {
      total: indexStories.length,
      result: result,
    };
  } catch (error) {
    return {
      total: 0,
      result: [],
    };
  }
}

async function StoriesHero() {
  return (
    <section className="w-full h-full relative py-8" data-item="stories-hero">
      <div className="w-full max-w-2xl mx-auto gap-4 grid">
        <div className="flex gap-2 justify-center">
          <h1 className="font-medium text-center">Stories</h1>
          <Image
            src={Stars}
            draggable={false}
            alt={'Stars symbol'}
            className="dark:invert"
          />
        </div>
        <div className="grid gap-4 w-full">
          <h2 className="text-center text-4xl sm:text-6xl font-bold">
            Explore New Things!
          </h2>
          <p className="text-center text-sm sm:text-lg text-[#979797] px-4 md:px-16">
            Learn about software development, programming languages, and stay
            updated on the IT industry. Discover our latest stories, coding
            tips, tech news, career insights, and much more.
          </p>
        </div>
      </div>
    </section>
  );
}

async function FilteringSection({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const categories = await listCategories();
  if (category && !categories.includes(category)) {
    return notFound();
  }
  return (
    <section data-item="stories-filter" className="relative px-2 w-full">
      <div className="flex max-w-full md:max-w-3xl justify-center gap-2 sm:gap-12 mx-auto">
        <FilteringHandler
          categories={categories}
          category={category}
          search={search}
        />
      </div>
    </section>
  );
}

async function StoriesSection({
  page,
  category,
  search,
}: {
  page: number;
  category?: string;
  search?: string;
}) {
  const stories = await listStories(
    page,
    category ? 'category' : search ? 'search' : undefined,
    category ? category : search ? search : undefined,
  );

  const storyCards = stories.result.map((story, i) => (
    <StoryCard story={story} key={i} />
  ));
  return (
    <section className="relative px-8">
      <div className="grid sm:grid-cols-2 max-w-7xl xl:grid-cols-3 gap-8 xl:gap-16">
        {storyCards}
      </div>
    </section>
  );
}

export { FilteringSection, StoriesHero, StoriesSection };
