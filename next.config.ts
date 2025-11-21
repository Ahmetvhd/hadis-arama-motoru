import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // API route'lar için timeout artır
  experimental: {
    turbo: false, // Turbopack'i devre dışı bırak, Webpack kullan
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
