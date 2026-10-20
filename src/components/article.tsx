import Image from "next/image";
import Link from "next/link";

// Building blocks for articles in src/content/blog. Typography comes from .prose-article in globals.css.

export function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id}>
      <a href={`#${id}`} className="heading-anchor">
        {children}
      </a>
    </h2>
  );
}

/** Internal link. Every article should link to at least one service page and one project. */
export function A({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href}>{children}</Link>;
}

/** External link: opens in a new tab, no referrer leakage beyond the origin. */
export function Out({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener">
      {children}
    </a>
  );
}

export function Figure({ src, alt, caption, width = 1440, height = 900 }: { src: string; alt: string; caption: string; width?: number; height?: number }) {
  const tall = height > width;
  return (
    <figure className={tall ? "figure-tall" : undefined}>
      <Image src={src} alt={alt} width={width} height={height} sizes={tall ? "320px" : "(min-width: 1024px) 720px, 100vw"} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** A short boxed aside: a takeaway, a warning or a rule of thumb. */
export function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="note" aria-label={title}>
      <p className="note-title">{title}</p>
      {children}
    </aside>
  );
}
