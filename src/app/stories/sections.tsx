import Stars from '@public/static/svg/stars.svg';
import Image from 'next/image';

function StoriesHero() {
  return (
    <section className="w-full relative py-8" data-item="stories-hero">
      <div className="w-full max-w-2xl mx-auto gap-3 grid">
        <div className="flex gap-2 justify-center">
          <h1 className="font-medium text-center">Stories</h1>
          <Image
            src={Stars}
            draggable={false}
            alt={'Stars symbol'}
            className="dark:invert"
          />
        </div>
        <div className="grid gap-4">
          <h2 className="text-center text-6xl font-bold">
            Explore New Things!
          </h2>
          <p className="text-center text-lg text-[#979797] px-16">
            Learn about software development, programming languages, and stay
            updated on the IT industry. Discover our latest stories, coding
            tips, tech news, career insights, and much more.
          </p>
        </div>
      </div>
    </section>
  );
}

export { StoriesHero };
