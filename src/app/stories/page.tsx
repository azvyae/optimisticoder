import { BackgroundGrid } from '@/app/stories/components';
import {
  FilteringSection,
  StoriesHero,
  StoriesSection,
} from '@/app/stories/sections';
import { capitalize } from '@/helpers/common';
import type { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';

interface StoriesPageParams {
  searchParams: {
    page?: string;
    category?: string;
    search?: string;
  };
}

export async function generateMetadata(
  { searchParams: { category, search } }: StoriesPageParams,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: category
      ? `Stories - ${capitalize(category)} Category`
      : search
        ? `Stories - Searching "${search}"`
        : 'Stories',
    description:
      "Explore newest stories from us. Welcome to Optimisticoder, it's your code, be optimist!",
    openGraph: {
      description:
        "Explore newest stories from us. Welcome to Optimisticoder, it's your code, be optimist!",
      title: 'Stories | Optimisticoder',
      images: [...previousImages],
    },
  };
}

async function Page({ searchParams }: StoriesPageParams) {
  if (searchParams.category && searchParams.search) {
    return redirect(`/stories?search=${searchParams.search}`);
  }
  const page = Number.parseInt(searchParams.page ?? '1');
  return (
    <main className="flex w-full flex-col items-center justify-between py-24 md:px-24">
      <BackgroundGrid />
      <StoriesHero />
      <FilteringSection {...searchParams} />
      <StoriesSection
        page={page < 1 ? 1 : page}
        category={searchParams.category}
        search={searchParams.search}
      />
    </main>
  );
}

export default Page;
