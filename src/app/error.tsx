'use client';

import { APP_ENV } from '@/config/common';

export const metadata = {
  title: 'Error | Optimisticoder',
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4 bg-[rgb(255,193,193)] dark:bg-[rgb(74,54,54)] dark:text-light grow text-dark px-4">
      <h2 className="mt-4 text-3xl font-bold text-center animate-bounce md:text-5xl">
        Uh oh
      </h2>
      <p className="text-center md:text-xl">
        We&#39;ve got a problem, please be kindly wait until we fix this.
      </p>
      {APP_ENV === 'local' && (
        <pre className="bg-secondary dark:bg-bgdark px-4 py-2 w-full max-w-screen-md border overflow-auto">
          {error.stack}
        </pre>
      )}
      <button
        className="text-center px-8 transition-colors py-1 hover:text-[rgb(64,120,64)] hover:underline rounded-full md:text-xl"
        onClick={() => reset()}
      >
        Refresh
      </button>
    </main>
  );
}
