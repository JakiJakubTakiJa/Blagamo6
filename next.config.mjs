/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: false,
  },
  images: {
    domains: ["img.clerk.com"],
  },
};

export default nextConfig;
