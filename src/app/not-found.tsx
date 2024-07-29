import Link from 'next/link';

export const metadata = {
  title: 'Not Found | Optimisticoder',
};

export default async function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 bg-[rgb(221,198,142)] dark:bg-[#4b4637] dark:text-light grow text-dark">
      <h2 className="mt-4 text-3xl font-bold text-center animate-bounce md:text-5xl">
        404 Not Found
      </h2>
      <p className="text-center md:text-xl">
        Page that you&#39;ve searching for is not available.
      </p>
      <p className="text-center md:text-xl">
        Get back to{' '}
        <Link
          className="transition-all hover:underline hover:text-primary"
          href="/"
        >
          {'Home'}
        </Link>
      </p>
    </main>
  );
}
