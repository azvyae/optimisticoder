'use client';

import { formatDate } from '@/helpers/common';
import avatar from '@public/static/opengraph/azvya-avatar.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { FiShare2 } from 'react-icons/fi';

interface ShareButtonsProps {
  title: string;
  link: string;
}

function ShareButtons({ title, link }: ShareButtonsProps) {
  function handleShare() {
    return navigator.share({
      title: `Share ${title}`,
      text: `${title} written by Azvya Erstevan | Optimisticoder`,
      url: link,
    });
  }

  return (
    <div className="text-[#626262] flex gap-4 sm:gap-2">
      <button
        title={`Share "${title}"`}
        className="font-bold hover:text-[#000]"
        type="button"
        onClick={handleShare}
      >
        <FiShare2 className="w-5 sm:w-6" size={24} />
      </button>
    </div>
  );
}

interface WriterDisplayProps {
  date: Date;
  readTime: string;
}

function WriterDisplay({ date, readTime }: WriterDisplayProps) {
  return (
    <div className="flex items-center gap-4">
      <Link href={'/contact'} title="Contact Azvya Erstevan">
        <Image
          src={avatar}
          className="w-10 sm:w-11 rounded-full"
          placeholder="blur"
          alt={'Azvya Erstevan&apos;s Avatar'}
        />
      </Link>
      <div className="flex flex-col text-sm sm:text-base">
        <Link
          className="group w-fit hover:text-primary break-all transition-colors"
          href={'/contact'}
          title="Contact Azvya Erstevan"
        >
          <span className="flex relative items-center break-all gap-2">
            Azvya Erstevan
            <span className="border-b group-hover:w-full w-0 transition-[width] absolute bottom-0"></span>
          </span>
        </Link>
        <div className="flex gap-2">
          <p>{readTime}</p>
          <span>•</span>
          <Link
            className="group w-fit inline hover:text-primary break-all transition-colors"
            href={`/stories?date=${encodeURIComponent(formatDate(date))}`}
          >
            <span className="flex relative items-center break-all gap-2">
              {date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
              <span className="border-b group-hover:w-full w-0 transition-[width] absolute bottom-0"></span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export { ShareButtons, WriterDisplay };
