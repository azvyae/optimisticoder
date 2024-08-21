import { FallbackImage } from '@/components/image';
import { capitalize, generateFallbackImage } from '@/helpers/common';
import type { StoriesIndexEntry } from '@/types/common';
import Link from 'next/link';

interface StoryCardProps {
  story: StoriesIndexEntry;
  className?: string;
}

function StoryCard({ story, className }: StoryCardProps) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      title={`Read ${story.title}`}
      data-item="story-card"
      className={`border-[#909090] border bg-light dark:bg-[#1f201f] dark:border-[#5d5d5d] w-full rounded-lg overflow-hidden group flex justify-between flex-col ${className}`}
    >
      <FallbackImage
        src={story.cover}
        width={512}
        height={512}
        alt={`Thumbnail of ${story.title}`}
        className="aspect-square object-cover h-full w-full"
        fallback={generateFallbackImage(story.title)}
      />
      <hr className="text-[#909090] dark:text-[#5d5d5d]" />
      <div className="p-6 group-hover:dark:bg-[#1f1f1f] group-hover:bg-[#ececec] grid gap-4">
        <p className="text-sm sm:text-base truncate line-clamp-1">
          <span
            title="Story category"
            className="bg-[#000] inline truncate text-light dark:bg-light dark:text-dark rounded-sm px-2"
          >
            {capitalize(story.category)}
          </span>{' '}
          <span
            title="Story read time"
            className="truncate inline line-clamp-1"
          >
            {story.readTime}
          </span>
        </p>
        <h6 className="text-xl sm:text-2xl hover:underline font-bold">
          {story.title}
        </h6>
        <p
          title="Story excerpt"
          className="text-[#7d7d7d] text-sm sm:text-base dark:text-[#9d9d9d]"
        >
          {story.excerpt}
        </p>
        <span className="hover:underline border text-sm sm:text-base bg-light dark:bg-[#1f201f] w-fit px-4 py-2 rounded-sm">
          Read More &gt;
        </span>
      </div>
    </Link>
  );
}

export { StoryCard };
