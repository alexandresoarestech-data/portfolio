import type { NextConfig } from "next";

/**
 * Site 100% estático (`out/`). O mesmo build roda no Vercel e no GitHub Pages.
 * No GitHub Pages o workflow define NEXT_PUBLIC_BASE_PATH=/portfolio.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
