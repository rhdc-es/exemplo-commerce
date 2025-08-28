/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.dummyjson.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        pathname: '**',
      },
    ],
  }
};

export default nextConfig;
