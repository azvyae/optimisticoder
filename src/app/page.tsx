import { Hero } from '@/app/components';

async function Page() {
  return (
    <main className="flex min-h-screen h-[1500px] flex-col items-center justify-between mt-[72px]">
      <Hero />
    </main>
  );
}

export default Page;
