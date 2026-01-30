/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/createpoly',
  assetPrefix: '/createpoly/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
