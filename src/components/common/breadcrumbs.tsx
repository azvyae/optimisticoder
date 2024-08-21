import { capitalize } from '@/helpers/common';
import Stars from '@public/static/svg/stars.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

interface BreadcrumbsProps {
  links: {
    text: string;
    href: string;
  }[];
}

function Breadcrumbs({ links }: BreadcrumbsProps) {
  return (
    <div
      data-item="breadcrumbs"
      className="flex gap-3 items-start dark:brightness-125"
    >
      <Image
        src={Stars}
        draggable={false}
        alt={'Stars symbol'}
        className="dark:invert"
      />
      <div className="flex flex-wrap gap-x-3 text-sm sm:text-base md:gap-x-4 !leading-4 gap-y-2">
        {links.map((item, i, arr) => {
          const link = (
            <Link
              className="group hover:text-primary break-all transition-colors"
              href={item.href}
            >
              <span className="flex relative items-center break-all gap-2">
                {capitalize(item.text)}
                <span className="border-b group-hover:w-full w-0 transition-[width] absolute -bottom-1"></span>
              </span>
            </Link>
          );
          if (i + 1 !== arr.length) {
            return (
              <Fragment key={i}>
                {link}
                <span className="select-none font-black">&gt;</span>
              </Fragment>
            );
          }
          return <Fragment key={i}>{link}</Fragment>;
        })}
      </div>
    </div>
  );
}

export { Breadcrumbs };
