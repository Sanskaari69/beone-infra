import type { NextConfig } from "next";

// GitHub Pages project sites are served under /<repo>. Set NEXT_PUBLIC_BASE_PATH=/<repo> at build time.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
