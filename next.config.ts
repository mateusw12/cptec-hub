import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    emotion: true,
  },
  transpilePackages: ["react-leaflet", "leaflet"],
};

export default nextConfig;
