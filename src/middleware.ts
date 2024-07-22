import { NextResponse, type NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/assets')) {
    return NextResponse.error();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/assets/README.md',
    '/assets/.gitignore',
    '/assets/.git/:path*',
    '/assets/:path*.json',
    '/assets/:path/:path/page.md',
  ],
};
