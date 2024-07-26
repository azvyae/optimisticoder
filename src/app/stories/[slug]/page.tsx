export const revalidate = 86400;
export const dynamic = 'force-static';
import { ShareButtons, WriterDisplay } from '@/app/stories/[slug]/components';
import { Breadcrumbs, MarkdownUI, StoryTitle } from '@/components/common';
import { APP_URL, STORIES_DIR } from '@/config/common';
import type { StoriesIndexEntry } from '@/types/common';
import { readFileSync } from 'fs';
import matter from 'gray-matter';
import jsonata from 'jsonata';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import path from 'path';
import readingTime from 'reading-time';

async function getStoryBySlug(slug: string) {
  try {
    const indexStories: StoriesIndexEntry[] = JSON.parse(
      readFileSync(
        path.join(process.cwd(), STORIES_DIR, 'index-stories.json'),
      ).toString(),
    );
    const expression = jsonata(`$[slug='${slug}']`);
    const result: StoriesIndexEntry = await expression.evaluate(indexStories);
    const { content: markdown } = matter(
      readFileSync(
        path.join(
          process.cwd(),
          STORIES_DIR,
          result.category,
          result.slug,
          'page.md',
        ),
        'utf8',
      ),
    );
    return {
      content: markdown
        .toString()
        .replace(/!\[([^\]]*)\]\((?!\/assets\/)([^)]+)\)/g, (_, p1, p2) => {
          return `![${p1}](/assets/${result.category}/${result.slug}/${p2})`;
        }),
      readTime: readingTime(markdown.toString()),
      ...result,
    };
  } catch (error) {
    notFound();
  }
}

async function Page({ params: { slug } }: { params: { slug: string } }) {
  const story = await getStoryBySlug(slug);
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
    <main className="flex gap-16 min-h-screen h-[1500px] mt-[72px] flex-col items-center justify-between px-4 sm:px-24">
      <article className="md:max-w-screen-half w-full">
        <div className="grid gap-6 my-6">
          <Breadcrumbs links={breadcrumbs} />
          <StoryTitle title={story.title} subtitle={story.subtitle} />
          <div className="flex gap-4 sm:items-center justify-between">
            <WriterDisplay
              date={new Date(story.date)}
              readTime={story.readTime.text}
            />
            <ShareButtons
              title={story.title}
              link={`${APP_URL}/stories/${story.slug}`}
            />
          </div>
        </div>
        <hr className="mb-8 text-[#19231B]/15 dark:text-[#a3e3b0]/15" />
        <MarkdownUI markdown={story.content} />
        <hr className="my-3 text-[#19231B]/15 dark:text-[#a3e3b0]/15" />
        <div className="flex gap-4 flex-wrap">
          <span>Keywords:</span>
          {story.keywords.map((keyword, i) => (
            <Link
              key={i}
              className="bg-[#D9D9D9] hover:bg-[#bbbbbb] hover:dark:bg-[#6b6b6b] dark:bg-[#4d4d4d] transition-colors rounded-lg px-2"
              href={`/stories?tag=${keyword}`}
              title={`See stories related with ${keyword}`}
            >
              {keyword}
            </Link>
          ))}
        </div>
      </article>
      <section className="md:max-w-screen-half w-full">
        <h5 className="text-left text-2xl font-bold">Baca cerita lainnya</h5>
      </section>
    </main>
  );
}

export default Page;
