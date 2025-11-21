import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Turbopack'i devre dışı bırak, Webpack kullan
  experimental: {
    turbo: false,
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
