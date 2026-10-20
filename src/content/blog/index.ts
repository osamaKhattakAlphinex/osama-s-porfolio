import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Post, PostMeta } from "./types";
import * as timeTracking from "./build-time-tracking-app-like-hubstaff";
import * as furniture from "./furniture-ecommerce-website-pakistan";
import * as contractor from "./contractor-website-instant-quote-form";
import * as seo from "./technical-seo-checklist";
import * as hiring from "./hire-mern-stack-developer";

export type { Post, PostMeta } from "./types";

const toPost = (m: { meta: PostMeta; default: Post["Body"] }): Post => ({ ...m.meta, Body: m.default });

// Newest first; ties keep this order (the strongest article for the main keyword first).
export const posts: Post[] = [hiring, timeTracking, seo, furniture, contractor]
  .map(toPost)
  .sort((a, b) => b.published.localeCompare(a.published));

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
export const postsForService = (slug: string) => posts.filter((p) => p.services.includes(slug as Post["services"][number]));
export const postsForProject = (slug: string) => posts.filter((p) => p.project === slug);

/** Word count from the article source at build time: strip imports, meta, tags and JSX attributes. */
export function wordCount(slug: string) {
  const src = readFileSync(join(process.cwd(), "src/content/blog", `${slug}.tsx`), "utf8");
  const body = src.slice(src.indexOf("export default function"));
  const text = body
    .replace(/<[^>]+>/g, " ")
    .replace(/\{["'`]\s*["'`]\}/g, " ")
    .replace(/&apos;|&quot;/g, "'")
    .replace(/[{}();=]/g, " ");
  return text.split(/\s+/).filter((w) => /[a-z]/i.test(w)).length;
}

export const readingMinutes = (slug: string) => Math.max(1, Math.round(wordCount(slug) / 230));
