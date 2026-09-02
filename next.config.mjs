/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    allowedDevOrigins: ['192.168.1.132:3000', 'localhost:3000'],
  },
};

export default nextConfig;
