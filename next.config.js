/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
    domains: ["f004.backblazeb2.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dogs",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
