import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // API route'lar için timeout artır
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
