import { links } from '@/config/common';
import Link from 'next/link';
import { FiGithub } from 'react-icons/fi';
import { IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io5';
import { RiTwitterXLine, RiTiktokFill, RiThreadsFill } from 'react-icons/ri';
const styles = {
  base: `w-fit whitespace-nowrap font-medium transition-colors rounded group text-[#5a685d] dark:text-light`,
  activeDarkToggler: `scale-100 group-hover:text-[#7e7e7e] rotate-0`,
  inactiveDarkToggler: `scale-0 rotate-90`,
};

function MainLinks() {
  return (
    <>
      {links.map((link, index) => {
        const Icon = link.Icon;
        return (
          <Link
            key={index}
            className={`${styles.base} py-1 relative`}
            href={link.href ?? '/'}
            title={
              link.name === 'Connect' ? 'LinkedIn page' : `${link.name} page`
            }
            target={link.href?.includes('http') ? '_blank' : undefined}
          >
            <div className="flex relative items-center gap-2">
              {Icon ? <Icon size={18} /> : <></>}
              {link.name}
              <span className="border-b-2 group-hover:w-full w-0 transition-[width] absolute bottom-0"></span>
            </div>
          </Link>
        );
      })}
    </>
  );
}

const socialMedia = [
  {
    name: 'Azvya on Instagram',
    url: 'https://instagram.com/azvyae',
    icon: (
      <IoLogoInstagram
        className="hover:text-[#E4B1F0] dark:hover:text-[#8f74cb] text-[#696969] dark:text-[#9e9e9e] transition-colors"
        size={24}
      />
    ),
  },
  {
    name: 'Azvya on X',
    url: 'https://x.com/azvyae',
    icon: (
      <RiTwitterXLine
        className="hover:text-[#000000] dark:hover:text-[#fff] text-[#696969] dark:text-[#9e9e9e] transition-colors"
        size={24}
      />
    ),
  },
  {
    name: 'Azvya on LinkedIn',
    url: 'https://www.linkedin.com/in/azvyae',
    icon: (
      <IoLogoLinkedin
        className="hover:text-[#4a7cbc] dark:hover:text-[#5684c0] text-[#696969] dark:text-[#9e9e9e] transition-colors"
        size={24}
      />
    ),
  },
  {
    name: 'Azvya on TikTok',
    url: 'https://www.tiktok.com/@azvyae',
    icon: (
      <RiTiktokFill
        className="hover:text-[#D91656] dark:hover:text-[#fc5d92] text-[#696969] dark:text-[#9e9e9e] transition-colors"
        size={24}
      />
    ),
  },
  {
    name: 'Azvya on Threads',
    url: 'https://www.threads.net/@azvyae',
    icon: (
      <RiThreadsFill
        className="hover:text-[#d78f36] dark:hover:text-[#ffb65e] text-[#696969] dark:text-[#9e9e9e] transition-colors"
        size={24}
      />
    ),
  },
  {
    name: 'Azvya on GitHub',
    url: 'https://www.github.com/azvyae',
    icon: (
      <FiGithub
        className="hover:text-[#81c53d] dark:hover:text-[#8FD14F] text-[#696969] dark:text-[#9e9e9e] transition-colors"
        size={24}
      />
    ),
  },
];

function SocialMediaLinks() {
  const items = socialMedia.map((item, i) => (
    <Link target="_blank" key={i} href={item.url} title={item.name}>
      {item.icon}
    </Link>
  ));
  return <div className="flex gap-4 flex-wrap justify-around">{items}</div>;
}

export { MainLinks, SocialMediaLinks };
