export const revalidate = 604800;
import { Breadcrumbs, MarkdownUI, StoryTitle } from '@/components/common';
import { STORIES_URL } from '@/config/common';
import { sfetch } from '@/helpers/common';
import type { PlainTextResponse } from '@/types/responses';
import matter from 'gray-matter';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type Props = {
  params: { slug: string };
};

const getDisclaimer = cache(async () => {
  try {
    const res = (await sfetch(`${STORIES_URL}/docs/disclaimer.md`, {
      next: {
        revalidate: 604800,
      },
    })) as PlainTextResponse;
    if (!res.ok) {
      throw new Error((await res.json()).message);
    }

    const { content: markdown, data } = matter(await res.text());
    return {
      content: markdown.toString(),
      title: data.title,
      subtitle: `Updated ${new Date(data.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}.`,
    };
  } catch (error) {
    return notFound();
  }
});

export async function generateMetadata(
  _: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const disclaimer = await getDisclaimer();

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: 'Disclaimer',
    description: `Optimisticoder disclaimer. ${disclaimer.subtitle}`,
    authors: [{ name: 'Azvya Erstevan', url: 'https://optimisticoder.com' }],
    openGraph: {
      images: [...previousImages],
    },
  };
}

async function Page() {
  const disclaimer = await getDisclaimer();

  const breadcrumbs = [
    {
      text: 'Disclaimer',
      href: '/disclaimer',
    },
  ];
  return (
    <main className="flex gap-16 min-h-screen mt-[72px] flex-col items-center justify-between px-4 sm:px-24 pb-4">
      <article className="md:max-w-screen-half w-full">
        <div className="grid gap-6 my-6">
          <Breadcrumbs links={breadcrumbs} />
          <StoryTitle title={disclaimer.title} subtitle={disclaimer.subtitle} />
        </div>
        <hr className="mb-8 text-[#19231B]/15 dark:text-[#a3e3b0]/15" />
        <div data-item="story-body">
          <MarkdownUI markdown={disclaimer.content} />
        </div>
      </article>
    </main>
  );
}

export default Page;
