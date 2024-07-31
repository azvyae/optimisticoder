'use client';

import { NavLink } from '@/components/link';
import { links } from '@/config/common';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Cookies from 'js-cookie';

import {
  MdBrightnessAuto,
  MdMenu,
  MdMenuOpen,
  MdNightlight,
  MdSunny,
} from 'react-icons/md';
import type { Theme } from '@/types/common';

const styles = {
  active: `!text-primary dark:brightness-125`,
  base: `w-full whitespace-nowrap font-medium transition-colors rounded group text-dark dark:text-light`,
  activeDarkToggler: `scale-100 group-hover:text-[#7e7e7e] rotate-0`,
  inactiveDarkToggler: `scale-0 rotate-90`,
};

function NavigationLinks({ defaultTheme }: { defaultTheme: Theme }) {
  return (
    <>
      {links.map((link, index) => {
        const Icon = link.Icon;
        return (
          <NavLink
            key={index}
            activeClassName={styles.active}
            className={`${styles.base} px-6 py-4 md:py-3 relative`}
            href={link.href ?? '/'}
            title={`${link.name} page`}
          >
            <div className="h-full w-0 transition-[width] max-md:group-hover:w-full bg-[#d8dfd6] dark:bg-[#474533] absolute top-0 left-0"></div>
            <div className="h-full w-0 transition-[width] duration-700 max-md:group-hover:w-3/4 border-b-4 absolute top-0 left-0"></div>

            <div className="flex relative items-center gap-2">
              {Icon ? <Icon size={18} /> : <></>}
              {link.name}
              <span className="border-b-2 md:group-hover:w-full w-0 transition-[width] absolute bottom-0"></span>
            </div>
          </NavLink>
        );
      })}
      <DarkModeSelector
        dataItem="desktop-dark-mode-toggler"
        className="max-md:hidden"
        defaultTheme={defaultTheme}
      />
    </>
  );
}

function NavigationMobile({ defaultTheme }: { defaultTheme: Theme }) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  function toggleNavbar() {
    setNavOpen((cur) => {
      if (cur) {
        document.body.classList.remove('overflow-y-hidden');
      } else {
        document.body.classList.add('overflow-y-hidden');
      }
      return !cur;
    });
  }
  useEffect(() => {
    document.body.classList.remove('overflow-y-hidden');
    setNavOpen(false);
  }, [pathname]);
  return (
    <div className="flex items-center gap-8 relative">
      <DarkModeSelector
        dataItem="mobile-dark-mode-toggler"
        className="md:hidden"
        defaultTheme={defaultTheme}
      />
      <button
        className="block md:hidden relative"
        title="Toggle navbar"
        type="button"
        data-item="hamburger"
        onClick={toggleNavbar}
      >
        {navOpen ? (
          <MdMenuOpen className="text-dark dark:text-[#868686]" size={32} />
        ) : (
          <MdMenu className="text-dark dark:text-[#868686]" size={32} />
        )}
      </button>
      {typeof window !== 'undefined' &&
        createPortal(
          navOpen ? (
            <div
              data-item="mobile-nav"
              className="fixed top-0 flex flex-col justify-between w-screen h-screen text-lg mt-[72px] z-20 bg-[#fff] dark:bg-bgdark md:hidden"
            >
              <div className="relative top-0 flex flex-col w-full h-full gap-2 pt-4 pb-64 overflow-y-auto bg-[#fff] dark:bg-bgdark">
                <NavigationLinks defaultTheme={defaultTheme} />
              </div>
            </div>
          ) : (
            <></>
          ),
          document.body,
        )}
    </div>
  );
}

function DarkModeSelector({
  className,
  dataItem,
  defaultTheme,
}: {
  className?: string;
  dataItem: string;
  defaultTheme: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  useEffect(() => {
    if (!defaultTheme) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        Cookies.set('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        Cookies.set('theme', 'light');
      }
    }
    setTheme(Cookies.get('theme') as Theme);
  }, [defaultTheme]);

  function toggle() {
    setTheme((t) => {
      switch (t) {
        case 'dark':
          document.documentElement.classList.remove('dark');
          Cookies.set('theme', 'light');
          return 'light';
        case 'light':
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          Cookies.remove('theme');
          return;
        default:
          document.documentElement.classList.add('dark');
          Cookies.set('theme', 'dark');
          return 'dark';
      }
    });
  }

  return (
    <button
      onClick={toggle}
      data-item={dataItem}
      className={`relative md:px-6 aspect-square py-4 md:py-3 flex items-center justify-center transition-colors text-dark group dark:text-light dark:max-md:text-[#868686] ${className}`}
    >
      <MdBrightnessAuto
        className={`absolute transition-[transform,color] duration-200 ${!theme ? styles.activeDarkToggler : styles.inactiveDarkToggler}`}
        size={24}
      />
      <MdSunny
        className={`absolute transition-[transform,color] duration-200 ${theme === 'light' ? styles.activeDarkToggler : styles.inactiveDarkToggler}`}
        size={24}
      />
      <MdNightlight
        className={`absolute transition-[transform,color] duration-200 ${theme === 'dark' ? styles.activeDarkToggler : styles.inactiveDarkToggler}`}
        size={24}
      />
    </button>
  );
}

export { NavigationLinks, NavigationMobile };
