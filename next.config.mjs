/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1:8000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "ticketgo-backend-dev.onrender.com",
        pathname: "/media/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
