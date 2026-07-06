import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "app/styles")],
    loadPaths: [path.join(__dirname, "app/styles")],
  },
};

export default nextConfig;
