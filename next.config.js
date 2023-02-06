/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.dicebear.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
  },
};

module.exports = nextConfig;
