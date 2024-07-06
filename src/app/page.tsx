import { readdirSync } from 'fs';

async function readFiles() {
  return readdirSync('./_stories');
}

async function Page() {
  const files = await readFiles();
  return (
    <main className="flex min-h-screen h-[1500px] flex-col items-center justify-between p-24">
      <div className="w-full">
        <p className="text-3xl w-full">Coming soon.</p>
        <pre className="bg-dark text-warning px-4 py-4 max-w-xl w-full">
          {JSON.stringify(files)}
        </pre>
      </div>
    </main>
  );
}

export default Page;
