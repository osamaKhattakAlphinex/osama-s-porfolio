import type { ServiceSlug } from "@/content/site";

export type PostMeta = {
  slug: string;
  /** The H1. */
  title: string;
  /** <title>, shown as is (no site suffix). Keep it under 60 characters. */
  metaTitle: string;
  /** 140-160 characters. */
  description: string;
  /** The one phrase the article is written to rank for. */
  focusKeyword: string;
  keywords: string[];
  category: string;
  /** ISO dates (YYYY-MM-DD). */
  published: string;
  updated: string;
  /** Project slug this article draws on, if any. */
  project?: string;
  /** Service pages the article links to and is listed on. */
  services: ServiceSlug[];
  /** 1600x900 featured image in public/blog. */
  image: string;
  imageAlt: string;
  /** One or two sentences for cards and the article lede. */
  excerpt: string;
  /** Must match the H2 ids in the article body, in order. */
  toc: { id: string; label: string }[];
  faqs: { q: string; a: string }[];
};

export type Post = PostMeta & { Body: () => React.ReactElement };
