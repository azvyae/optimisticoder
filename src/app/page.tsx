import { ExploreApps, Hero } from '@/app/components';

async function Page() {
  return (
    <main className="flex flex-col items-center justify-between mt-[72px]">
      <Hero />
      <ExploreApps />
    </main>
  );
}

export default Page;
