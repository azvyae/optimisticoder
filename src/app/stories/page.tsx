import { BackgroundGrid } from '@/app/stories/components';
import { StoriesHero } from '@/app/stories/sections';
import { readdirSync, readFileSync } from 'fs';
import readingTime from 'reading-time';
async function readFiles() {
  return readdirSync('./_stories');
}

async function readSomeFile() {
  const file = readFileSync('./_stories/index-stories.json');
  return {
    file: file.toString(),
    readTime: readingTime(file.toString()),
  };
}

async function Page() {
  const files = await readFiles();
  const theFile = await readSomeFile();
  return (
    <main className="flex min-h-screen h-[1500px] flex-col items-center justify-between p-24">
      <BackgroundGrid />
      <StoriesHero />
    </main>
  );
}

export default Page;
