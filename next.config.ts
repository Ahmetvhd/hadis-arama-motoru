import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Büyük JSON dosyaları için
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
  // API route'lar için timeout artır
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
