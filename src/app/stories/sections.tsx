import { FilteringHandler } from '@/app/stories/components';
import { StoryCard } from '@/components/common/story-card';
import { STORIES_DIR } from '@/config/common';
import type { StoriesIndexEntry, StoriesMeta } from '@/types/common';
import Stars from '@public/static/svg/stars.svg';
import { readFileSync } from 'fs';
import jsonata from 'jsonata';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import path from 'path';
import { cache } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const checkMeta = cache(async function checkMeta() {
  try {
    const indexMeta: StoriesMeta = JSON.parse(
      readFileSync(
        path.join(process.cwd(), STORIES_DIR, 'index-meta.json'),
      ).toString(),
    );
    const expression = jsonata(`$[]`);
    const result: StoriesMeta = await expression.evaluate(indexMeta);
    return result;
  } catch (error) {
    return {
      totalStories: 0,
      categories: [],
    };
  }
});

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
    const meta = await checkMeta();
    let query = `$[]`;
    switch (key) {
      case 'category':
        query = `$[category="${value}"][]`;
        break;
      case 'search':
        query = `$[$contains(title,/${value}/i) or keywords[$contains($,/${value}/i)]][]`;
        break;
    }
    const expression = jsonata(query);
    const result: StoriesIndexEntry[] = await expression.evaluate(indexStories);

    return {
      total: query === `$[]` ? meta.totalStories : result.length,
      result: result.slice((page - 1) * 6, 6 * page) ?? [],
      maxPage: Math.ceil(result.length / 6),
    };
  } catch (error) {
    return {
      total: 0,
      result: [],
      maxPage: 0,
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
  const meta = await checkMeta();
  if (category && !meta.categories.includes(category)) {
    return notFound();
  }
  return (
    <section data-item="stories-filter" className="relative px-2 w-full">
      <div className="flex max-w-full md:max-w-3xl justify-center gap-2 sm:gap-12 mx-auto">
        <FilteringHandler
          categories={meta.categories}
          category={category}
          search={search}
        />
      </div>
    </section>
  );
}

function Pagination({
  total,
  queryKey,
  currentPage,
  value,
}: {
  total: number;
  currentPage: number;
  queryKey?: string;
  value?: string;
}) {
  const links = [];
  let params = '';
  if (queryKey) {
    params = `${params}${queryKey}=`;
  }
  if (value) {
    params = `${params}${value}`;
  }
  for (
    let index = 0;
    index < (total < 60 ? Math.ceil(total / 6) : 10);
    index++
  ) {
    links.push(
      <Link
        key={index}
        title={`Go to page ${index + 1}`}
        className={`dark:border-[#454545] border-[#bababa] border rounded aspect-square flex justify-center items-center w-10 h-10 ${currentPage === index + 1 ? 'bg-primary text-light hover:bg-primary/70 dark:hover:bg-[#92f5a738]' : 'dark:bg-[#000] bg-[#FAFBFC] hover:bg-[#efefef] dark:hover:bg-dark'}`}
        href={`/stories?${params}&page=${index + 1}`}
      >
        {index + 1}
      </Link>,
    );
  }
  return (
    <>
      {currentPage > 1 && (
        <Link
          title="Previous page"
          className={`dark:border-[#454545] border-[#bababa] border rounded aspect-square flex justify-center items-center w-10 h-10 dark:bg-[#000] bg-[#FAFBFC] hover:bg-[#efefef] dark:hover:bg-dark`}
          href={`/stories?${params}&page=${currentPage - 1}`}
        >
          <FiChevronLeft />
        </Link>
      )}
      {links}
      {currentPage < links.length && (
        <Link
          title="Next page"
          className={`dark:border-[#454545] border-[#bababa] border rounded aspect-square flex justify-center items-center w-10 h-10 dark:bg-[#000] bg-[#FAFBFC] hover:bg-[#efefef] dark:hover:bg-dark`}
          href={`/stories?${params}&page=${currentPage + 1}`}
        >
          <FiChevronRight />
        </Link>
      )}
    </>
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
  const key = category ? 'category' : search ? 'search' : undefined;
  const value = category ? category : search ? search : undefined;
  const stories = await listStories(page, key, value);

  if (page > stories.maxPage) {
    let params = '';
    if (key) {
      params = `${params}${key}=`;
    }
    if (value) {
      params = `${params}${value}`;
    }
    return redirect(`/stories?${params}`);
  }

  const storyCards = stories.result.map((story, i) => (
    <StoryCard story={story} key={i} />
  ));

  return (
    <section className="relative px-8" data-item="story-cards-section">
      {stories.result.length > 0 && (
        <>
          <div className="grid sm:grid-cols-2 max-w-7xl xl:grid-cols-3 gap-8 xl:gap-16">
            {storyCards}
          </div>
          <div className="flex w-full justify-center pt-12 pb-4 gap-2 flex-wrap">
            <Pagination
              currentPage={page}
              total={stories.total}
              queryKey={key}
              value={value}
            />
          </div>
        </>
      )}
      {stories.result.length === 0 && (
        <>
          <p className="text-3xl">
            No stories found
            {search && <span> with keyword &quot;{search}&quot;</span>}
          </p>
        </>
      )}
    </section>
  );
}

export { FilteringSection, StoriesHero, StoriesSection };
