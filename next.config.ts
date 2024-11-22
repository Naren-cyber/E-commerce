import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["info", "error", "warn"],
          }
        : false,
  },
  experimental: {
    reactCompiler: true,
    ppr: true,
    dynamicIO: true,
  },
  images: {
    remotePatterns: [{ hostname: "**" }],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
