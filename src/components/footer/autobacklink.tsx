'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

function AutoBacklinks() {
  const [backlinks, setBacklinks] = useState<AutoBacklinks>([]);

  useEffect(() => {
    (window as AutoBacklinksWindow).onBacklinksLoaded = (data) => {
      setBacklinks(data);
    };
    const timer = setTimeout(() => {
      // fallback to global backlinks
      if ((window as AutoBacklinksWindow).Backlinks?.length) {
        setBacklinks((links) =>
          links?.length ? links : (window as AutoBacklinksWindow).Backlinks,
        );
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (backlinks.length === 0) {
    return Array(5)
      .fill('')
      .map((_, i) => (
        <div
          key={i}
          className={`w-fit flex gap-2 whitespace-nowrap items-center font-medium transition-colors rounded text-[#5a685d] dark:text-light py-1 relative`}
        >
          <div className="flex relative items-center h-full gap-2">
            <span
              style={{
                width: 64 + (i % 2 === 0 ? i : i * 16),
              }}
              className="h-4 rounded-full animate-pulse bg-[#666]"
            ></span>
          </div>
          <span className={`text-[#828282] ${i < 4 ? '' : 'invisible'}`}>
            •
          </span>
        </div>
      ));
  }
  return backlinks.map((item, index) => (
    <Link
      key={index}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-fit flex gap-2 whitespace-nowrap font-medium transition-colors rounded group text-[#5a685d] dark:text-light py-1 relative`}
      title={`Visit ${item.label}`}
    >
      <div className="flex relative items-center gap-2">
        {item.label}
        <span className="border-b-2 group-hover:w-full w-0 transition-[width] absolute bottom-0"></span>
      </div>
      {index < backlinks.length - 1 && (
        <span className="text-[#828282]">•</span>
      )}
    </Link>
  ));
}

export { AutoBacklinks };
