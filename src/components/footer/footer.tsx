import { MainLinks, SocialMediaLinks } from '@/components/footer/components';
import logoFull from '@public/static/logo/optimisticoder-logo-full.png';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="w-full pt-10 px-8 xl:px-32  sm:pt-20 relative">
      <div className="w-full mx-auto transition-colors md:items-center duration-500 bg-[#FAFBFC] dark:bg-bgdark grid md:grid-cols-3 items-start justify-between gap-8 py-4 md:gap-2.5 max-w-screen-2k">
        <Link className="inline-block h-10 py-2" href={'/'}>
          <Image
            alt="optimisticoder logo"
            title="Optimisticoder logo"
            className="h-full object-contain w-fit dark:brightness-125"
            src={logoFull}
          />
        </Link>
        <div
          data-item="footer-links"
          className="md:items-center justify-center flex-col items-start md:gap-8 text-base flex md:flex-row"
        >
          <h6 className="font-extrabold md:hidden text-lg mb-2">Links</h6>
          <MainLinks />
        </div>
        <div
          data-item="social-links"
          className="md:items-center justify-end flex-col items-start md:gap-8 text-base flex md:flex-row"
        >
          <h6 className="font-extrabold md:hidden text-lg mb-2">
            Social Media
          </h6>
          <SocialMediaLinks />
        </div>
      </div>
      <hr className="w-full text-[#19231B]/15 dark:text-[#a3e3b0]/15" />
      <div
        data-item="additional-links"
        className="flex gap-4 justify-center py-4 dark:text-[#b6b6b6] text-[#5a5a5a] text-sm"
      >
        <Link href={'/disclaimer'} className="underline">
          Disclaimer
        </Link>
        <Link href={'/privacy-policy'} className="underline">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}

export { Footer };
