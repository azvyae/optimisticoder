'use client';

import { capitalize } from '@/helpers/common';
import { useRouter } from 'next-nprogress-bar';
import { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

function BackgroundGrid() {
  return (
    <>
      <div
        className="w-full h-[70vh] absolute bg-center bg-[length:64px_64px] md:bg-[length:128px_128px]"
        style={{
          backgroundImage: `linear-gradient(to right, #8b8b8b49 1px, transparent 1px), linear-gradient(to bottom, #8b8b8b49 1px, transparent 1px)`,
        }}
      />
      <div className="w-full h-[70vh] absolute bg-gradient-to-t from-light via-[#fff0] to-[#fff0] dark:from-bgdark dark:via-[#24242400] dark:to-[#24242400]" />
    </>
  );
}

function CategoryMenus({
  categories,
  currentCategory,
  className,
}: {
  categories: string[];
  currentCategory?: string;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const firstElement = useRef<HTMLButtonElement>(null);
  const lastElement = useRef<HTMLButtonElement>(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [observer, setObserver] = useState<IntersectionObserver>();
  const router = useRouter();
  useEffect(() => {
    if (!window) {
      return;
    }
    document.getElementById('active-element')?.focus();
  }, []);
  useEffect(() => {
    if (!window) {
      return;
    }
    setObserver(
      new IntersectionObserver((entries) => {
        const type = entries[0].target.getAttribute('data-type') as
          | 'first-element'
          | 'last-element';
        if (type === 'first-element') {
          if (entries[0].isIntersecting) {
            container?.current?.scrollBy({ left: -256, behavior: 'smooth' });
            setShowPrev(false);
          } else {
            setShowPrev(true);
          }
        }
        if (entries.length > 1 ? entries[1] : type === 'last-element') {
          if (
            entries.length > 1
              ? entries[1].isIntersecting
              : entries[0].isIntersecting
          ) {
            container?.current?.scrollBy({ left: 256, behavior: 'smooth' });
            setShowNext(false);
          } else {
            setShowNext(true);
          }
        }
      }),
    );
  }, []);
  useEffect(() => {
    if (observer && firstElement.current && lastElement.current) {
      observer.observe(firstElement.current);
      observer.observe(lastElement.current);
    }
  }, [observer]);
  function handleNext() {
    if (!container.current) {
      return;
    }
    container.current.scrollBy({
      left: 144,
      behavior: 'smooth',
    });
  }
  function handlePrevious() {
    if (!container.current) {
      return;
    }
    container.current.scrollBy({
      left: -144,
      behavior: 'smooth',
    });
  }
  const categoryLinks = categories.map((c, i) => {
    return (
      <button
        key={i}
        data-item="category-selector"
        ref={categories.length - 1 === i ? lastElement : null}
        data-type={categories.length - 1 === i ? 'last-element' : ''}
        onClick={() => {
          router.push(`/stories?category=${c}`);
          router.refresh();
        }}
        id={c === currentCategory ? 'active-element' : undefined}
        className={`sm:px-4 px-2 transition-colors py-0.5 sm:py-2 duration-150 text-dark dark:text-light font-bold rounded-lg inline-block ${c === currentCategory ? 'bg-primary text-light hover:bg-primary/70 dark:hover:bg-[#92f5a738]' : 'hover:bg-[#8c8c8c53] dark:hover:bg-[#ffffff38]'}`}
      >
        {capitalize(c)}
      </button>
    );
  });
  return (
    <div
      ref={container}
      className={`dark:bg-bgdark w-fit transition-[opacity,max-width,color,background-color,border-color,text-decoration-color,fill,stroke] hide-scrollbar bg-light flex overflow-auto ease-in-out gap-1 border-2 duration-500 dark:border-[#454545] border-[#f1f1f1] text-sm md:text-base p-1 rounded-xl relative ${className}`}
    >
      <div
        className={`left-0 transition-opacity top-0 w-16 absolute max-h-full ${showPrev ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <button
          type="button"
          onClick={handlePrevious}
          className="fixed w-16 h-8 sm:h-11 md:h-12 hover:brightness-95 dark:hover:brightness-150 transition-[filter] bg-gradient-to-r rounded-l-[10px] from-light to-light/0 dark:from-bgdark dark:to-bgdark/0"
        />
      </div>
      <div
        className={`right-0 top-0 w-16 absolute max-h-full transition-opacity ${showNext ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <button
          type="button"
          onClick={handleNext}
          className="fixed w-16 h-8 sm:h-11 md:h-12 hover:brightness-95 dark:hover:brightness-150 transition-[filter] bg-gradient-to-l rounded-r-[10px] from-light to-light/0 dark:from-bgdark dark:to-bgdark/0"
        />
      </div>
      <button
        onClick={() => {
          router.push(`/stories`);
          router.refresh();
        }}
        data-item="category-selector"
        data-type="first-element"
        id={!currentCategory ? 'active-element' : undefined}
        ref={firstElement}
        className={`sm:px-4 px-2 transition-colors duration-150 py-0.5 sm:py-2 text-dark dark:text-light font-bold rounded-lg  ${!currentCategory ? 'bg-primary text-light hover:bg-primary/70 dark:hover:bg-[#92f5a738]' : 'hover:bg-[#8c8c8c53] dark:hover:bg-[#ffffff38]'}`}
      >
        All
      </button>
      {categoryLinks}
    </div>
  );
}

function SearchInput({
  categories,
  currentCategory,
  className,
}: {
  categories: string[];
  currentCategory?: string;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const firstElement = useRef<HTMLButtonElement>(null);
  const lastElement = useRef<HTMLButtonElement>(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [observer, setObserver] = useState<IntersectionObserver>();
  const router = useRouter();
  useEffect(() => {
    if (!window) {
      return;
    }
    document.getElementById('active-element')?.focus();
  }, []);
  useEffect(() => {
    if (!window) {
      return;
    }
    setObserver(
      new IntersectionObserver((entries) => {
        const type = entries[0].target.getAttribute('data-type') as
          | 'first-element'
          | 'last-element';
        if (type === 'first-element') {
          if (entries[0].isIntersecting) {
            container?.current?.scrollBy({ left: -256, behavior: 'smooth' });
            setShowPrev(false);
          } else {
            setShowPrev(true);
          }
        }
        if (entries.length > 1 ? entries[1] : type === 'last-element') {
          if (
            entries.length > 1
              ? entries[1].isIntersecting
              : entries[0].isIntersecting
          ) {
            container?.current?.scrollBy({ left: 256, behavior: 'smooth' });
            setShowNext(false);
          } else {
            setShowNext(true);
          }
        }
      }),
    );
  }, []);
  useEffect(() => {
    if (observer && firstElement.current && lastElement.current) {
      observer.observe(firstElement.current);
      observer.observe(lastElement.current);
    }
  }, [observer]);
  function handleNext() {
    if (!container.current) {
      return;
    }
    container.current.scrollBy({
      left: 144,
      behavior: 'smooth',
    });
  }
  function handlePrevious() {
    if (!container.current) {
      return;
    }
    container.current.scrollBy({
      left: -144,
      behavior: 'smooth',
    });
  }
  const categoryLinks = categories.map((c, i) => {
    return (
      <button
        key={i}
        data-item="category-selector"
        ref={categories.length - 1 === i ? lastElement : null}
        data-type={categories.length - 1 === i ? 'last-element' : ''}
        onClick={() => {
          router.push(`/stories?category=${c}`);
          router.refresh();
        }}
        id={c === currentCategory ? 'active-element' : undefined}
        className={`sm:px-4 px-2 transition-colors py-0.5 sm:py-2 duration-150 text-dark dark:text-light font-bold rounded-lg inline-block ${c === currentCategory ? 'bg-primary text-light hover:bg-primary/70 dark:hover:bg-[#92f5a738]' : 'hover:bg-[#8c8c8c53] dark:hover:bg-[#ffffff38]'}`}
      >
        {capitalize(c)}
      </button>
    );
  });
  return (
    <div
      ref={container}
      className={`dark:bg-bgdark w-fit transition-[opacity,max-width,color,background-color,border-color,text-decoration-color,fill,stroke] hide-scrollbar bg-light flex overflow-auto ease-in-out gap-1 border-2 duration-500 dark:border-[#454545] border-[#f1f1f1] text-sm md:text-base p-1 rounded-xl relative ${className}`}
    >
      <div
        className={`left-0 transition-opacity top-0 w-16 absolute max-h-full ${showPrev ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <button
          type="button"
          onClick={handlePrevious}
          className="fixed w-16 h-8 sm:h-11 md:h-12 hover:brightness-95 dark:hover:brightness-150 transition-[filter] bg-gradient-to-r rounded-l-[10px] from-light to-light/0 dark:from-bgdark dark:to-bgdark/0"
        />
      </div>
      <div
        className={`right-0 top-0 w-16 absolute max-h-full transition-opacity ${showNext ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <button
          type="button"
          onClick={handleNext}
          className="fixed w-16 h-8 sm:h-11 md:h-12 hover:brightness-95 dark:hover:brightness-150 transition-[filter] bg-gradient-to-l rounded-r-[10px] from-light to-light/0 dark:from-bgdark dark:to-bgdark/0"
        />
      </div>
      <button
        onClick={() => {
          router.push(`/stories`);
          router.refresh();
        }}
        data-item="category-selector"
        data-type="first-element"
        id={!currentCategory ? 'active-element' : undefined}
        ref={firstElement}
        className={`sm:px-4 px-2 transition-colors duration-150 py-0.5 sm:py-2 text-dark dark:text-light font-bold rounded-lg  ${!currentCategory ? 'bg-primary text-light hover:bg-primary/70 dark:hover:bg-[#92f5a738]' : 'hover:bg-[#8c8c8c53] dark:hover:bg-[#ffffff38]'}`}
      >
        All
      </button>
      {categoryLinks}
    </div>
  );
}

function FilteringHandler({
  categories,
  category,
  search,
}: {
  categories: string[];
  category?: string;
  search?: string;
}) {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <>
      <div className="relative">
        <CategoryMenus
          className={
            showSearch
              ? 'max-w-0 opacity-0 pointer-events-none'
              : 'max-w-3xl opacity-100'
          }
          categories={categories}
          currentCategory={category}
        />
        <SearchInput
          className={
            showSearch
              ? 'max-w-3xl opacity-100'
              : 'max-w-0 opacity-0 pointer-events-none'
          }
          categories={categories}
          currentCategory={category}
        />
      </div>
      <button
        className="border-2 h-9 sm:h-12 rounded-xl flex justify-center dark:bg-bgdark bg-light items-center aspect-square transition-colors duration-500 dark:border-[#454545] border-[#f1f1f1] hover:bg-[#8c8c8c53] dark:hover:bg-[#ffffff38]"
        type="button"
        title="Search"
        data-item="search-button"
        onClick={() => {
          setShowSearch((cur) => !cur);
        }}
      >
        <FiSearch
          className="duration-150 transition-colors text-dark dark:text-light"
          size={16}
        />
      </button>
    </>
  );
}

export { BackgroundGrid, FilteringHandler };
