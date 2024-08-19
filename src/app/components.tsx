'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Tools from '@public/static/svg/tools.svg';
import { apps } from '@/config/common';
import Link from 'next/link';
import { generateFallbackImage } from '@/helpers/common';
import { FallbackImage } from '@/components/image';

function Hero() {
  return (
    <section
      data-item="hero-section"
      className="relative h-fit sm:min-h-[50vh] overflow-hidden bg-gradient-to-b dark:from-[#000] to-light from-[#dbd0ff] dark:to-bgdark w-full"
    >
      <div className="aurora-animation">
        <div className="transition-colors bg-[#2856ba] dark:bg-[#6189de] sm:-bottom-8 h-14 sm:h-32" />
        <div className="transition-colors bg-[#5cc759] dark:bg-[#377535] h-32 sm:h-64 sm:-bottom-10" />
        <div className="transition-colors bg-[#2856ba] dark:bg-[#6189de] h-14 sm:h-32 sm:-bottom-7" />
        <div className="transition-colors bg-[#5cc759] dark:bg-[#377535] h-18 sm:h-48 sm:-bottom-20" />
      </div>

      <main className="pt-12 md:pt-24 xl:pt-48 pb-24 mb:pb-48 xl:pb-64 flex px-8 xl:px-24 items-center relative sm:justify-between sm:flex-row-reverse flex-col-reverse">
        <Image
          src={Tools}
          draggable={false}
          className="select-none drop-shadow-lg max-sm:top-1/4 right-4 mx-auto w-32 max-sm:absolute max-h-64 md:max-h-96 md:w-full"
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
        <p className="absolute bottom-4 sm:bottom-0 md:bottom-8 xl:bottom-24 left-0 w-full text-center">
          No, I&apos;m not UI/UX designer.
        </p>
      </main>
    </section>
  );
}

interface DividedAppCards {
  firstCol: React.JSX.Element[];
  secondCol: React.JSX.Element[];
  thirdCol: React.JSX.Element[];
}

function ExploreApps() {
  const dividedAppCards: DividedAppCards = {
    firstCol: [],
    secondCol: [],
    thirdCol: [],
  };
  apps.forEach((app, i) => {
    const wrappedApp = (
      <Link
        href={app.url}
        key={i}
        data-item="explore-app-card"
        className="bg-gradient-to-t rounded-3xl p-4 gap-4 hover:brightness-95 dark:hover:brightness-105 transition-[filter] flex flex-col justify-between from-[#DFD8BC] dark:from-[#536655]/50 dark:to-[#637765]/50 backdrop-blur-lg w-full to-[#E7DFC3]"
      >
        <div className="flex gap-4">
          <FallbackImage
            src={app.image}
            width={48}
            height={48}
            alt={`${app.name} icon`}
            className="w-12 h-12 object-cover rounded-full bg-success"
            fallback={generateFallbackImage(app.name)}
          />
          <div>
            <h3 className="font-extrabold">{app.name}</h3>
            <p role="app-type" className="text-sm">
              {app.type}
            </p>
          </div>
        </div>
        <p role="description">{app.description}</p>
      </Link>
    );
    switch ((i + 1) % 3) {
      case 1:
        dividedAppCards.firstCol.push(wrappedApp);
        break;
      case 2:
        dividedAppCards.secondCol.push(wrappedApp);
        break;
      default:
        dividedAppCards.thirdCol.push(wrappedApp);
        break;
    }
  });
  const [hideAll, setHideAll] = useState(true);
  return (
    <section
      data-item="explore-apps-section"
      className="relative md:px-8 w-full dark:bg-bgdark bg-light"
    >
      <div className="border-l relative border-t border-r border-[#dfdfdf] dark:border-[#545454] bg-gradient-to-b w-full dark:from-primary py-16 rounded-t-xl dark:to-[#242424] from-secondary to-light px-4 md:px-32">
        <h2 className="text-center font-bold text-3xl sm:text-4xl md:text-5xl mb-8">
          Explore Apps
        </h2>
        <p className="text-lg sm:text-2xl text-center max-w-4xl mx-auto w-full leading-relaxed mb-4">
          There are some experimental apps I made shown below. You can either
          try or explore it, since certain apps are open source. Start from
          here.
        </p>

        <div
          className={`relative grid grid-cols-1 gap-6 duration-700 ${hideAll ? 'max-h-[256px]' : 'max-h-[5120px] md:max-h-[2048px]'} h-fit  transition-[max-height] overflow-hidden lg:gap-8 sm:grid-cols-2 xl:grid-cols-3`}
        >
          <div className="grid gap-6 lg:gap-8">{dividedAppCards.firstCol}</div>
          <div className="grid gap-6 lg:gap-8">{dividedAppCards.secondCol}</div>
          <div className="grid gap-6 lg:gap-8 sm:col-span-2 sm:px-36 xl:px-0 xl:col-span-1">
            {dividedAppCards.thirdCol}
          </div>
        </div>
        <div
          className={`absolute ${hideAll ? 'opacity-100' : 'opacity-0'} pointer-events-none h-1/2 select-none duration-700 transition-opacity w-full bg-gradient-to-b bottom-0 left-0 from-light/0 via-light/90 dark:via-bgdark/90 to-light dark:to-bgdark/100`}
        />
      </div>
      <button
        onClick={() => setHideAll((cur) => !cur)}
        className=" bg-secondary dark:bg-primary bottom-8 rounded-xl p-3 hover:brightness-105 transition-[filter] relative mx-auto block"
      >
        {hideAll && 'Show Apps'}
        {!hideAll && 'Hide Apps'}
      </button>
    </section>
  );
}

export { Hero, ExploreApps };
