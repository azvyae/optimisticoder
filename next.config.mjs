const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: isProd,
  images: {
    remotePatterns: [
      ...(isProd ? [] : [{ hostname: 'localhost' }]),
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: '*.optimisticoder.com' },
      { hostname: 'api.dicebear.com' },
    ],
  },
};

export default nextConfig;
