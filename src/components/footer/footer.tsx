import { AutoBacklinks } from '@/components/footer/autobacklink';
import { MainLinks, SocialMediaLinks } from '@/components/footer/components';
import logoFull from '@public/static/logo/optimisticoder-logo-full.png';
import Image from 'next/image';
import Link from 'next/link';
import { HiExternalLink } from 'react-icons/hi';
function Footer() {
  return (
    <footer className="w-full pt-10 px-8 xl:px-32  sm:pt-20 relative">
      <Link className="inline-block h-10 py-2" href={'/'}>
        <Image
          alt="optimisticoder logo"
          title="Optimisticoder logo"
          className="h-full object-contain w-fit dark:brightness-125"
          src={logoFull}
        />
      </Link>
      <div className="w-full mx-auto transition-colors duration-500 grid md:grid-cols-3 items-start justify-between gap-8 py-4 md:gap-2.5 max-w-screen-2k">
        <div
          data-item="footer-links"
          className="justify-center flex-col items-start text-base flex"
        >
          <h6 className="font-extrabold text-lg mb-2">Links</h6>
          <MainLinks />
        </div>
        <div
          data-item="social-links"
          className="justify-center flex-col items-start text-base flex"
        >
          <h6 className="font-extrabold text-lg mb-2">Social Media</h6>
          <SocialMediaLinks />
        </div>
        <div
          data-item="backlinks"
          className="justify-center flex-col items-start text-base flex"
        >
          <h6 className="font-extrabold text-lg mb-2 flex gap-2 items-center">
            Check Also <HiExternalLink />
          </h6>
          <div className="flex-wrap gap-2 items-start text-base flex">
            <AutoBacklinks />
          </div>
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
