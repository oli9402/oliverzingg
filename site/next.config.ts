import type { NextConfig } from 'next';

// Static export: `npm run build` writes plain HTML/CSS/JS to ./out,
// which any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, nginx) can serve.
// Set BASE_PATH when hosting under a sub-path, e.g. BASE_PATH=/Portfolio for GitHub Pages project sites.
const basePath = process.env.BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
