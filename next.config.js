/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "utfs.io",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
