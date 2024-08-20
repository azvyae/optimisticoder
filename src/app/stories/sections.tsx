import { FilteringHandler } from '@/app/stories/components';
import { STORIES_DIR } from '@/config/common';
import Stars from '@public/static/svg/stars.svg';
import { readFileSync } from 'fs';
import jsonata from 'jsonata';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import path from 'path';
import { FiSearch } from 'react-icons/fi';

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

async function listStories(key?: 'category' | 'search', value?: string) {
  try {
    const indexStories: string[] = JSON.parse(
      readFileSync(
        path.join(process.cwd(), STORIES_DIR, 'index-stories.json'),
      ).toString(),
    );
    const expression = jsonata(`$[]`);
    const result: string[] = await expression.evaluate(indexStories);
    return result;
  } catch (error) {
    return [];
  }
}

async function StoriesHero() {
  return (
    <section className="w-full relative py-8" data-item="stories-hero">
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
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  const stories = await listStories(
    category ? 'category' : search ? 'search' : undefined,
    category ? category : search ? search : undefined,
  );

  return <></>;
}

export { FilteringSection, StoriesHero, StoriesSection };
