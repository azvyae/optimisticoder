import Link from 'next/link';

async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p className="text-3xl">Coming soon.</p>
      <Link href={'/test'}>Go Test</Link>
    </main>
  );
}

export default Page;
