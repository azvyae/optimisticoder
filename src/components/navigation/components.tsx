'use client';

import { NavLink } from '@/components/link';
import { links } from '@/config/common';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MdMenu, MdMenuOpen } from 'react-icons/md';

const styles = {
  active: `!text-primary`,
  base: `w-full whitespace-nowrap font-medium transition-colors rounded group text-dark`,
};

function NavigationLinks() {
  return links.map((link, index) => {
    const Icon = link.Icon;
    return (
      <NavLink
        key={index}
        activeClassName={styles.active}
        className={`${styles.base} px-6 py-4 md:py-3 relative`}
        href={link.href ?? '/'}
        title={`${link.name} page`}
      >
        <div className="h-full w-0 transition-[width] max-md:group-hover:w-full border-b-4 border-warning/30 bg-[#d8dfd6] absolute top-0 left-0"></div>

        <div className="flex relative items-center gap-2">
          {Icon ? <Icon size={18} /> : <></>}
          {link.name}
          <span className="border-b-2 md:group-hover:w-full w-0 transition-[width] absolute bottom-0"></span>
        </div>
      </NavLink>
    );
  });
}

function NavigationMobile() {
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
    <>
      <button
        className="block md:hidden"
        title="Toggle navbar"
        type="button"
        data-item="hamburger"
        onClick={toggleNavbar}
      >
        {navOpen ? (
          <MdMenuOpen className="text-dark" size={32} />
        ) : (
          <MdMenu className="text-dark" size={32} />
        )}
      </button>
      {typeof window !== 'undefined' &&
        createPortal(
          navOpen ? (
            <div
              data-item="mobile-nav"
              className="fixed top-0 flex flex-col justify-between w-screen h-screen text-lg mt-[72px] z-20 bg-[#fff] md:hidden"
            >
              <div className="relative top-0 flex flex-col w-full h-full gap-2 pt-4 pb-64 overflow-y-auto bg-[#fff]">
                <NavigationLinks />
              </div>
            </div>
          ) : (
            <></>
          ),
          document.body,
        )}
    </>
  );
}

export { NavigationMobile, NavigationLinks };
