import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { postBySlug, posts } from "@/content/blog";

// The share image is the article's featured image, cropped to 1200x630 and served as JPEG for every social network.
export const alt = "Featured image for the article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = postBySlug((await params).slug)!;
  const file = await readFile(join(process.cwd(), "public", post.image));
  const jpg = await sharp(file).resize(1200, 630, { fit: "cover", position: "centre" }).jpeg({ quality: 85 }).toBuffer();
  return new Response(new Uint8Array(jpg), { headers: { "Content-Type": "image/jpeg" } });
}
