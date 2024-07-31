import Image from 'next/image';
import React from 'react';
import Tools from '@public/static/svg/tools.svg';

function Hero() {
  return (
    <section
      data-item="hero-section"
      className="relative h-fit overflow-hidden bg-gradient-to-b dark:from-[#000] to-light from-secondary/50 dark:to-bgdark w-full"
    >
      <div className="aurora-animation">
        <div className="transition-colors bg-[#ffcc00] dark:bg-[#b6a355] sm:-bottom-8 h-14 sm:h-32" />
        <div className="transition-colors bg-[#8eb923] dark:bg-[#b5c79e] h-32 sm:h-64 sm:-bottom-10" />
        <div className="transition-colors bg-[#17b429] dark:bg-[#55b660] h-14 sm:h-32 sm:-bottom-7" />
        <div className="transition-colors bg-[#1e82ed] dark:bg-[#587bb3] h-18 sm:h-48 sm:-bottom-20" />
      </div>

      <main className="pt-12 md:pt-24 xl:pt-48 pb-24 mb:pb-48 xl:pb-64 flex px-8 xl:px-24 items-center relative sm:justify-between sm:flex-row-reverse flex-col-reverse">
        <Image
          src={Tools}
          draggable={false}
          className="select-none drop-shadow-lg max-sm:top-1/4 right-4 mx-auto w-32 max-sm:absolute max-h-64 md:max-h-96 sm:w-full"
          tabIndex={-1}
          alt={'Tools illustration'}
        />
        <div className="relative w-full grid gap-8">
          <h1
            style={{
              textShadow: ' 1px 1px 2px #000',
            }}
            className="text-3xl sm:text-4xl sm:text-nowrap md:text-6xl xl:text-7xl font-extrabold !leading-relaxed"
          >
            It&apos;s your code,
            <br /> be optimist
            <span className="animate-blinking transition-none select-none">
              |
            </span>
          </h1>
          <p className="text-lg sm:text-2xl !leading-relaxed sm:text-nowrap">
            Become a better coder
            <br />
            simply by being{' '}
            <span className="dark:text-secondary text-primary underline hover:dark:brightness-125 hover:brightness-75 transition-[filter] cursor-pointer">
              optimistic
            </span>
            .
          </p>
        </div>
      </main>
    </section>
  );
}

export { Hero };
