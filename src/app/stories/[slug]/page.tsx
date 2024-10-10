export const revalidate = 86400;
import { ShareButtons, WriterDisplay } from '@/app/stories/[slug]/components';
import { Breadcrumbs, MarkdownUI, StoryTitle } from '@/components/common';
import { StoryCard } from '@/components/common/story-card';
import { APP_URL, STORIES_URL } from '@/config/common';
import { sfetch } from '@/helpers/common';
import type { StoriesIndexEntry } from '@/types/common';
import type { CommonResponse, PlainTextResponse } from '@/types/responses';
import matter from 'gray-matter';
import jsonata from 'jsonata';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type Props = {
  params: { slug: string };
};

const listStories = cache(async (): Promise<StoriesIndexEntry[]> => {
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
    return (await res.json()).map((story) => {
      return { ...story, cover: `${STORIES_URL}/stories/${story.cover}` };
    });
  } catch (error) {
    return [];
  }
});

const getStoryBySlug = cache(async (slug: string) => {
  try {
    const indexStories = await listStories();
    const expression = jsonata(`$[slug='${slug}']`);
    const result: StoriesIndexEntry = await expression.evaluate(indexStories);
    const res = (await sfetch(
      `${STORIES_URL}/stories/${result.category}/${result.slug}/page.md`,
      {
        next: {
          revalidate: 86400,
        },
      },
    )) as PlainTextResponse;
    if (!res.ok) {
      throw new Error((await res.json()).message);
    }
    const { content: markdown } = matter(await res.text());

    return {
      content: markdown
        .toString()
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, p1, p2) => {
          return `![${p1}](${STORIES_URL}/stories/${result.category}/${result.slug}/${p2})`;
        }),
      ...result,
    };
  } catch (error) {
    notFound();
  }
});

async function listRandomStories() {
  try {
    const indexStories: StoriesIndexEntry[] = await listStories();
    const expression = jsonata(`$shuffle($[])`);
    const result: StoriesIndexEntry[] = await expression.evaluate(indexStories);
    return result.slice(0, 4);
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = await getStoryBySlug(params.slug);

  return {
    title: story.title,
    description: story.subtitle,
    keywords: story.keywords,
    authors: [{ name: 'Azvya Erstevan', url: 'https://optimisticoder.com' }],
    twitter: {
      title: story.title,
      description: story.subtitle,
      images: story.cover,
    },
    openGraph: {
      title: story.title,
      description: story.subtitle,
      images: story.cover,
    },
  };
}

async function Page({ params: { slug } }: Props) {
  const story = await getStoryBySlug(slug);
  const shuffledStories = await listRandomStories();
  const breadcrumbs = [
    {
      text: 'Stories',
      href: '/stories',
    },
    {
      text: story.category,
      href: `/stories?category=${story.category}`,
    },
    {
      text: story.title,
      href: `/stories/${story.slug}`,
    },
  ];
  return (
    <main className="flex gap-16 min-h-screen mt-[72px] flex-col items-center justify-between px-4 sm:px-24 pb-4">
      <article className="md:max-w-screen-half w-full">
        <div className="grid gap-6 my-6">
          <Breadcrumbs links={breadcrumbs} />
          <StoryTitle title={story.title} subtitle={story.subtitle} />
          <div className="flex gap-4 sm:items-center justify-between">
            <WriterDisplay
              date={new Date(story.date)}
              readTime={story.readTime}
            />
            <ShareButtons
              title={story.title}
              link={`${APP_URL}/stories/${story.slug}`}
            />
          </div>
        </div>
        <hr className="mb-8 text-[#19231B]/15 dark:text-[#a3e3b0]/15" />
        <div data-item="story-body">
          <MarkdownUI markdown={story.content} />
        </div>
        <hr className="my-3 text-[#19231B]/15 dark:text-[#a3e3b0]/15" />
        <div className="flex justify-between items-center gap-2">
          <div data-item="keyword-list" className="flex gap-4 flex-wrap">
            <span>Keywords:</span>
            {story.keywords.map((keyword, i) => (
              <Link
                key={i}
                className="bg-[#D9D9D9] hover:bg-[#bbbbbb] hover:dark:bg-[#6b6b6b] dark:bg-[#4d4d4d] transition-colors rounded-lg px-2"
                href={`/stories?search=${keyword}`}
                title={`See stories related with ${keyword}`}
              >
                {keyword}
              </Link>
            ))}
          </div>
          <ShareButtons
            title={story.title}
            link={`${APP_URL}/stories/${story.slug}`}
          />
        </div>
      </article>
      <section
        data-item="see-another-stories"
        className="md:max-w-screen-half w-full"
      >
        <h5 className="text-left text-2xl font-bold mb-6">
          Read another stories
        </h5>
        <div className="flex gap-4 flex-wrap justify-between mb-6">
          {shuffledStories.map((index, k) => (
            <StoryCard story={index} className="sm:basis-[48%]" key={k} />
          ))}
        </div>
        <Link
          className="group w-fit mx-auto block hover:text-primary dark:brightness-125 break-all transition-colors"
          href="/stories"
          title="See all stories"
        >
          <span className="flex relative items-center break-all gap-2">
            See all stories
            <span className="border-b group-hover:w-full w-0 transition-[width] absolute bottom-0"></span>
          </span>
        </Link>
      </section>
    </main>
  );
}

export default Page;
