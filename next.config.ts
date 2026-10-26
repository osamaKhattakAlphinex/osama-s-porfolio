import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { siteUrl } from "./src/content/site";

/**
 * Without NEXT_PUBLIC_SITE_URL (or Vercel's production URL), canonicals, the sitemap, Open Graph and JSON-LD
 * all point at http://localhost:3000. Warn on any production build, and stop CI and Vercel builds outright.
 */
function checkSiteUrl() {
  if (new URL(siteUrl).hostname !== "localhost") return;
  const message = `Site URL resolved to ${siteUrl}. Set NEXT_PUBLIC_SITE_URL to the live domain, or every canonical and sitemap URL will point at localhost.`;
  if (process.env.CI || process.env.VERCEL) throw new Error(message);
  console.warn(`⚠ ${message}`);
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF first, WebP fallback: smaller screenshots, better LCP.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // The project was first published under a misspelled slug.
    return [{ source: "/projects/networkustaad", destination: "/projects/networkustad", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default function config(phase: string): NextConfig {
  if (phase === PHASE_PRODUCTION_BUILD) checkSiteUrl();
  return nextConfig;
}
