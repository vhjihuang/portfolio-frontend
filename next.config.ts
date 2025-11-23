import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 生产环境 - Railway Strapi
      {
        protocol: "https",
        hostname: "portfolio-cms-production-9ea6.up.railway.app",
      },
      // 开发环境 - 本地 Strapi
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
    ],
    // 开发环境禁用图片优化（可选，如果本地 Strapi 有问题）
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
