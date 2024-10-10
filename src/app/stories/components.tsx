'use client';

import { capitalize } from '@/helpers/common';
import { useForwardRef } from '@/hooks/use-forward-ref';
import { useRouter } from 'next-nprogress-bar';
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ForwardedRef,
} from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

function BackgroundGrid() {
  return (
    <>
      <div
        className="w-full h-[70vh] absolute bg-center bg-[length:64px_64px] md:bg-[length:128px_128px]"
        style={{
          backgroundImage: `linear-gradient(to right, #8b8b8b49 1px, transparent 1px), linear-gradient(to bottom, #8b8b8b49 1px, transparent 1px)`,
        }}
      />
      <div className="w-full h-[70vh] absolute bg-gradient-to-t from-[#FAFBFC] via-[#fff0] to-[#fff0] dark:from-bgdark dark:via-[#24242400] dark:to-[#24242400]" />
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
  const categoryViewport = useRef<HTMLDivElement>(null);
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
      new IntersectionObserver(
        (entries) => {
          const type = entries[0].target.getAttribute('data-type') as
            | 'first-element'
            | 'last-element';
          if (type === 'first-element') {
            if (entries[0].isIntersecting) {
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
              setShowNext(false);
            } else {
              setShowNext(true);
            }
          }
        },
        {
          root: categoryViewport.current,
          threshold: 0.9,
        },
      ),
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
        className={`sm:px-4 px-2 focus:outline-none transition-colors py-0.5 sm:py-2 duration-150 text-dark dark:text-light font-bold rounded-lg inline-block ${c === currentCategory ? 'bg-primary text-light hover:bg-primary/70 dark:hover:bg-[#92f5a738]' : 'hover:bg-[#8c8c8c53] dark:hover:bg-[#ffffff38]'}`}
      >
        {capitalize(c)}
      </button>
    );
  });
  return (
    <div
      ref={categoryViewport}
      className={`dark:bg-bgdark w-[768px] transition-[opacity,max-width,color,background-color,border-color,text-decoration-color,fill,stroke] bg-[#FAFBFC] overflow-hidden ease-in-out border-2 duration-500 dark:border-[#454545] border-[#f1f1f1] text-sm md:text-base p-1 rounded-xl relative left-0 top-0 ${className}`}
    >
      <div
        className={`left-0 transition-opacity top-0 w-16 absolute max-h-full ${showPrev ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <button
          type="button"
          onClick={handlePrevious}
          className="absolute w-16 h-8 sm:h-11 md:h-12 hover:brightness-95 dark:hover:brightness-150 transition-[filter] bg-gradient-to-r rounded-l-[10px] from-[#FAFBFC] to-[#FAFBFC]/0 dark:from-bgdark dark:to-bgdark/0"
        />
      </div>
      <div
        className={`right-0 top-0 w-16 absolute max-h-full transition-opacity ${showNext ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <button
          type="button"
          onClick={handleNext}
          className="absolute w-16 h-8 sm:h-11 md:h-12 hover:brightness-95 dark:hover:brightness-150 transition-[filter] bg-gradient-to-l rounded-r-[10px] from-[#FAFBFC] to-[#FAFBFC]/0 dark:from-bgdark dark:to-bgdark/0"
        />
      </div>
      <div
        ref={container}
        className="flex overflow-auto hide-scrollbar rounded-md gap-1"
      >
        <button
          onClick={() => {
            router.push(`/stories`);
            router.refresh();
          }}
          data-item="category-selector"
          data-type="first-element"
          id={!currentCategory ? 'active-element' : undefined}
          ref={firstElement}
          className={`sm:px-4 px-2 focus:outline-none transition-colors duration-150 py-0.5 sm:py-2 text-dark dark:text-light font-bold rounded-lg  ${!currentCategory ? 'bg-primary text-light hover:bg-primary/70 dark:hover:bg-[#92f5a738]' : 'hover:bg-[#8c8c8c53] dark:hover:bg-[#ffffff38]'}`}
        >
          All
        </button>
        {categoryLinks}
      </div>
    </div>
  );
}

const SearchInput = forwardRef(function SearchInput(
  {
    search,
    className,
  }: {
    search?: string;
    className?: string;
  },
  refInput: ForwardedRef<HTMLInputElement>,
) {
  const input = useForwardRef<HTMLInputElement>(refInput);
  const router = useRouter();
  return (
    <form
      action="/stories"
      onSubmit={(e) => {
        e.preventDefault();
        const search = e.currentTarget
          .querySelector('input')
          ?.value.toString()
          .trim();
        router.push(`/stories?search=${search}`);
        router.refresh();
        input.current?.select();
      }}
    >
      <input
        ref={input}
        name="search"
        type="search"
        placeholder="Enter to search"
        defaultValue={search}
        required
        minLength={3}
        onFocus={(e) => e.currentTarget.select()}
        className={`dark:bg-bgdark w-[768px] focus:outline-none focus:ring-1 dark:focus:ring-[#808080] focus:ring-[#878787] px-2 sm:px-4 transition-[opacity,max-width,color,background-color,border-color,text-decoration-color,fill,stroke]  bg-[#FAFBFC] ease-in-out border-2 duration-500 dark:border-[#454545] border-[#f1f1f1] rounded-xl text-sm sm:text-base relative left-0 -top-9 sm:-top-12 md:-top-[52px] h-9 sm:h-12 md:h-[52px] ${className}`}
      />
    </form>
  );
});

function FilteringHandler({
  categories,
  category,
  search,
}: {
  categories: string[];
  category?: string;
  search?: string;
}) {
  const [showSearch, setShowSearch] = useState(search ? true : false);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  return (
    <>
      <div className="relative w-full max-w-[70vw] md:max-w-3xl">
        <CategoryMenus
          className={
            showSearch
              ? 'max-w-0 opacity-0 pointer-events-none'
              : 'max-w-full opacity-100'
          }
          categories={categories}
          currentCategory={category}
        />
        <SearchInput
          ref={input}
          className={
            showSearch
              ? 'max-w-full opacity-100'
              : 'max-w-0 opacity-0 pointer-events-none'
          }
          search={search}
        />
      </div>
      <button
        className={`border-2 h-9 sm:h-12 md:h-[52px] rounded-xl flex justify-center items-center aspect-square transition-colors duration-500 relative dark:border-[#454545] border-[#f1f1f1] ${showSearch ? 'dark:bg-primary bg-[rgb(170,203,154)] hover:bg-[#bccbb5] dark:hover:bg-[#293723]' : 'dark:bg-bgdark bg-[#FAFBFC] hover:bg-[#e5e5e5] dark:hover:bg-[#313131]'}`}
        type="button"
        title="Search"
        data-item="search-button"
        onClick={() => {
          setShowSearch((cur) => {
            if (!cur) {
              input.current?.focus();
            } else {
              input.current?.blur();
            }
            if (cur && !input.current?.value && search) {
              router.push('/stories');
              router.refresh();
            }
            return !cur;
          });
        }}
      >
        {!showSearch && (
          <FiSearch
            className="duration-150 transition-colors text-dark dark:text-light"
            size={18}
          />
        )}
        {showSearch && (
          <FiX
            className="duration-150 transition-colors text-dark dark:text-light"
            size={18}
          />
        )}
      </button>
    </>
  );
}

export { BackgroundGrid, FilteringHandler };
