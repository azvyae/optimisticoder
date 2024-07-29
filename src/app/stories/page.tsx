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
      <div className="w-full">
        <p className="text-3xl w-full">Coming soon.</p>
        <pre className="bg-dark text-warning px-4 py-4 max-w-xl w-full">
          {JSON.stringify(files)}
        </pre>
        <p>{theFile.readTime.text}</p>
        <pre className="bg-dark text-warning px-4 py-4 text-wrap w-full">
          {theFile.file}
        </pre>
      </div>
    </main>
  );
}

export default Page;
