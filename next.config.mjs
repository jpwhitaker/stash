/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.stashrewards.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.stashrewards.com',
        pathname: '/**',
      }
    ],
  }
};

export default nextConfig;
