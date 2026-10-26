import Image from "next/image";
import Link from "next/link";
import { readingMinutes, type Post } from "@/content/blog";

export const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

/** "OCT 20, 2026 · 9 MIN READ" */
export function PostMeta({ post, className = "text-muted" }: { post: Post; className?: string }) {
  return (
    <p className={`font-mono text-xs tracking-[0.04em] uppercase ${className}`}>
      <time dateTime={post.published}>{fmtDate(post.published)}</time> · {readingMinutes(post.slug)} min read
    </p>
  );
}

/** Image card for the Writing page grid and related reading. */
export function PostCard({ post, headingLevel = 3 }: { post: Post; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as const;
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-1 flex-col gap-4 text-ink">
      <div className="relative aspect-[16/9] overflow-hidden rounded-[18px] bg-night">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute top-3.5 left-3.5 rounded-md bg-[#0c1222]/85 px-2 py-1 font-mono text-[0.6875rem] tracking-[0.06em] text-white uppercase">{post.category}</span>
      </div>
      <PostMeta post={post} />
      <H className="font-display text-[1.375rem] leading-[1.2] font-semibold tracking-[-0.015em] transition-colors group-hover:text-accent-ink md:text-[1.4375rem]">{post.title}</H>
      <p className="text-base text-muted">{post.excerpt}</p>
    </Link>
  );
}

/** Text-only article card (home page "Writing"). */
export function PostTextCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-rule bg-surface-2 text-ink transition-colors hover:bg-surface"
    >
      <span className="relative block aspect-[16/8] overflow-hidden bg-night">
        <Image src={post.image} alt="" fill sizes="(min-width: 768px) 370px, 100vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
      </span>
      <span className="flex grow flex-col gap-3.5 p-6">
      <span className="font-mono text-xs tracking-[0.04em] text-muted uppercase">
        {post.category} · {new Date(`${post.published}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })}
      </span>
      <h3 className="font-display text-[1.3125rem] leading-[1.25] font-semibold tracking-[-0.015em]">{post.title}</h3>
      <span className="grow text-[0.9375rem] text-muted">{post.excerpt}</span>
      <span className="text-[0.9375rem] font-semibold text-accent-ink">
        Read article <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
      </span>
      </span>
    </Link>
  );
}
