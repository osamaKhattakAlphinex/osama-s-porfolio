import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

// Everything public is crawlable, including by AI search crawlers, so the site can be cited in AI answers too.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
