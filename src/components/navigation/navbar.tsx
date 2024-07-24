import logoFull from '@public/static/logo/optimisticoder-logo-full.png';
import logoShort from '@public/static/logo/optimisticoder-logo-short.png';
import Image from 'next/image';
import Link from 'next/link';
import {
  NavigationLinks,
  NavigationMobile,
} from '@/components/navigation/components';
async function Navbar() {
  return (
    <nav className="relative" data-item="main-nav">
      <div
        className={`fixed top-0 z-20 w-full bg-light dark:bg-bgdark h-[72px]`}
      >
        <div className="flex items-center justify-between px-8 py-4 xl:px-32 gap-2.5 h-full max-w-screen-2k mx-auto">
          <Link className="inline-block h-full py-2" href={'/'} tabIndex={0}>
            <Image
              alt="optimisticoder logo"
              title="Optimisticoder logo"
              className="h-full w-fit max-sm:hidden dark:brightness-125"
              src={logoFull}
            />
            <Image
              alt="optimisticoder logo"
              title="Optimisticoder logo"
              className="h-full w-fit sm:hidden dark:brightness-125"
              src={logoShort}
            />
          </Link>
          <NavigationMobile />
          <div
            data-item="desktop-nav"
            className="items-center justify-center hidden gap-4 text-base md:flex"
          >
            <NavigationLinks />
          </div>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
