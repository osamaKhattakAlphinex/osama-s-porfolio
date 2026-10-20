import Image from "next/image";
import Link from "next/link";
import { posts, readingMinutes, type Post } from "@/content/blog";
import { ButtonLink, Container, SectionTitle } from "./ui";

const fmtDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

export function PostMetaLine({ post }: { post: Post }) {
  return (
    <p className="font-mono text-xs text-ink-2">
      <time dateTime={post.published}>{fmtDate(post.published)}</time>
      <span aria-hidden> / </span>
      {readingMinutes(post.slug)} min read
    </p>
  );
}

export function PostCard({ post, large = false, headingLevel = 3 }: { post: Post; large?: boolean; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as const;
  return (
    <article className={`reveal ${large ? "md:col-span-2" : ""}`}>
      <Link href={`/blog/${post.slug}`} className={`group grid gap-6 ${large ? "md:grid-cols-2 md:items-center md:gap-10" : ""}`}>
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-rule bg-sheet-2">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes={large ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 45vw, 100vw"}
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.025]"
          />
        </div>
        <div>
          <p className="font-mono text-xs text-accent-text">{post.category}</p>
          <H className={`mt-3 font-semibold tracking-[-0.025em] group-hover:underline ${large ? "heading text-[clamp(1.6rem,2.8vw,2.25rem)]" : "text-xl leading-snug"}`}>
            {post.title}
          </H>
          <p className="mt-3 max-w-[60ch] text-ink-2">{post.excerpt}</p>
          <div className="mt-4">
            <PostMetaLine post={post} />
          </div>
        </div>
      </Link>
    </article>
  );
}

/** "Latest articles" band for the home page and other hubs. */
export function LatestPosts({ title = "Articles from real projects.", items = posts.slice(0, 3) }: { title?: string; items?: Post[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="posts-title" className="border-t border-rule py-24 md:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle id="posts-title" className="max-w-[18ch]">
            {title}
          </SectionTitle>
          <ButtonLink href="/blog" variant="secondary">
            All articles
          </ButtonLink>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-3">
          {items.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
