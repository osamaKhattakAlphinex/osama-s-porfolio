import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { person, projectBySlug } from "@/content/site";
import { postBySlug, posts, readingMinutes, wordCount } from "@/content/blog";
import { JsonLd, blogPostingNode, breadcrumbNode, faqNode, pageMetadata, webPageNode } from "@/lib/seo";
import { Breadcrumbs, ButtonLink, Container } from "@/components/ui";
import { FaqList } from "@/components/sections";
import { fmtDate } from "@/components/blog-ui";
import { Backdrop } from "@/components/backdrops";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const p = postBySlug((await params).slug);
  if (!p) return {};
  return pageMetadata({
    title: p.metaTitle,
    absoluteTitle: true,
    description: p.description,
    path: `/blog/${p.slug}`,
    type: "article",
    keywords: p.keywords,
    article: { published: p.published, modified: p.updated, section: p.category, tags: p.keywords },
  });
}

/** The call to action under each article, matched to its topic. */
const ctaFor: Record<string, string> = {
  "SaaS development": "Discuss your SaaS",
  Hiring: "Talk about your project",
  "Lead generation": "Get more leads",
  Ecommerce: "Plan your store",
  SEO: "Get an SEO audit",
};

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = postBySlug((await params).slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const crumbs = [
    { name: "Writing", path: "/blog" },
    { name: post.title, path },
  ];
  const words = wordCount(post.slug);
  const project = post.project ? projectBySlug(post.project) : undefined;
  const i = posts.indexOf(post);
  const others = [1, 2, 3].map((n) => posts[(i + n) % posts.length]).slice(0, project ? 2 : 3);
  const { Body } = post;

  return (
    <>
      <JsonLd
        nodes={[
          webPageNode({ path, name: post.metaTitle, description: post.description, crumbs, image: post.image, extra: { mainEntity: { "@id": blogPostingNode(post, words)["@id"] } } }),
          blogPostingNode(post, words),
          faqNode(path, post.faqs),
          breadcrumbNode(path, crumbs),
        ]}
      />

      <article>
        <header className="relative isolate overflow-hidden">
          <Backdrop pattern="grid" mask="radial" glows={[{ className: "-top-48 left-[calc(50%-16rem)] h-[32rem] w-[32rem]" }]} />
          <div className="mx-auto flex max-w-[920px] flex-col gap-5 px-4 pt-10 pb-8 sm:px-6 md:gap-5.5 md:pt-14 md:pb-10">
            {/* The visible trail ends on the topic to stay short; the structured data carries the full title. */}
            <Breadcrumbs crumbs={[crumbs[0], { name: post.category, path }]} />
            <p className="font-mono text-[0.8125rem] tracking-[0.05em] text-accent-ink uppercase">
              {post.category} · <time dateTime={post.published}>{fmtDate(post.published)}</time> · {readingMinutes(post.slug)} min read
            </p>
            <h1 className="rise display text-[clamp(2rem,4.8vw,3.9rem)] leading-[1.05] tracking-[-0.035em]">{post.title}</h1>
            <p className="rise text-lg leading-[1.55] text-muted md:text-[1.3125rem]" style={{ "--i": 1 } as React.CSSProperties}>
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3.5 pt-2">
              <Image src={person.portrait} alt="" width={48} height={48} sizes="48px" className="h-12 w-12 rounded-full bg-shot object-cover" />
              <span className="flex flex-col leading-[1.35]">
                <Link href="/about" rel="author" className="font-semibold text-ink hover:text-accent-ink">
                  {person.name}
                </Link>
                <span className="text-sm text-muted">
                  Full Stack Developer · Published <time dateTime={post.published}>{fmtDate(post.published)}</time>
                  {post.updated !== post.published && (
                    <>
                      {" "}
                      · Updated <time dateTime={post.updated}>{fmtDate(post.updated)}</time>
                    </>
                  )}
                </span>
              </span>
            </div>
          </div>
        </header>

        <Container>
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-night md:aspect-[21/9]">
            <Image src={post.image} alt={post.imageAlt} fill preload sizes="(min-width: 1200px) 1152px, 100vw" className="object-cover object-top" />
          </div>
        </Container>

        <Container className="flex flex-wrap items-start gap-8 pt-8 pb-10 md:gap-14 md:pt-16 md:pb-12">
          {/* Phones: collapsed so the article starts on the first screen. Desktop: a sticky sidebar. */}
          <details className="group w-full rounded-2xl border border-rule bg-surface lg:hidden">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-5 font-mono text-xs tracking-[0.06em] text-muted [&::-webkit-details-marker]:hidden">
              ON THIS PAGE · {post.toc.length} SECTIONS
              <span aria-hidden className="text-xl leading-none text-accent-ink transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <TocList toc={post.toc} className="px-3 pb-4" />
          </details>
          <nav aria-labelledby="toc-title" className="sticky top-[calc(var(--header-h)+1.75rem)] hidden max-w-[300px] flex-[1_1_240px] rounded-2xl border border-rule bg-surface p-5 lg:block">
            <p id="toc-title" className="pb-2 font-mono text-xs tracking-[0.06em] text-muted">
              ON THIS PAGE
            </p>
            <TocList toc={post.toc} />
          </nav>

          <div className="min-w-0 flex-[999_1_560px] lg:max-w-[720px]">
            <div className="prose-article">
              <Body />
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-5 rounded-[20px] border border-rule bg-surface p-6 md:p-7">
              <Image src={person.portrait} alt={person.name} width={72} height={72} sizes="72px" className="h-16 w-16 rounded-2xl bg-shot object-cover md:h-18 md:w-18" />
              <div className="flex flex-[1_1_260px] flex-col gap-1 text-base leading-[1.55]">
                <p className="font-semibold text-ink">Written by {person.name}</p>
                <p className="text-muted">
                  Full-stack developer at {person.employer}, building Staffvertex. I take on freelance projects and I&apos;m open to full-time remote roles.{" "}
                  <Link href="/about" className="font-medium text-accent-ink hover:underline">
                    More about me
                  </Link>
                </p>
              </div>
              <ButtonLink href="/contact">{ctaFor[post.category] ?? "Let's work together"}</ButtonLink>
            </div>

            {post.faqs.length > 0 && (
              <section aria-labelledby="faq-title" className="mt-14">
                <h2 id="faq-title" className="heading mb-5 text-[clamp(1.5rem,2.6vw,1.875rem)]">
                  Questions about this topic
                </h2>
                <FaqList items={post.faqs} />
              </section>
            )}
          </div>
        </Container>

        <section aria-labelledby="rel-title">
          <Container className="flex flex-col gap-7 pt-8 pb-16 md:pt-12 md:pb-24">
            <h2 id="rel-title" className="heading border-t border-rule-2 pt-8 text-[1.75rem]">
              Keep reading
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {project && (
                <Link href={`/projects/${project.slug}`} className="flex flex-col gap-3 rounded-[18px] bg-night p-6 text-night-ink">
                  <span className="font-mono text-xs tracking-[0.06em] text-night-link">CASE STUDY</span>
                  <span className="font-display text-[1.375rem] font-semibold text-white">{project.name}</span>
                  <span className="text-[0.9375rem] text-night-muted">See the project this article draws on.</span>
                  <span className="font-semibold text-[#c9d3ff]">View project →</span>
                </Link>
              )}
              {others.map((m) => (
                <Link key={m.slug} href={`/blog/${m.slug}`} className="flex flex-col gap-3 rounded-[18px] border border-rule bg-surface p-6 text-ink transition-colors hover:border-rule-2">
                  <span className="font-mono text-xs tracking-[0.06em] text-muted uppercase">
                    {m.category} · {readingMinutes(m.slug)} min read
                  </span>
                  <span className="font-display text-[1.3125rem] leading-[1.25] font-semibold">{m.title}</span>
                  <span className="font-semibold text-accent-ink">Read article →</span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </article>
    </>
  );
}

function TocList({ toc, className = "" }: { toc: { id: string; label: string }[]; className?: string }) {
  return (
    <ol className={`flex flex-col gap-0.5 ${className}`}>
      {toc.map((t) => (
        <li key={t.id}>
          <a href={`#${t.id}`} className="block rounded-lg px-2.5 py-1.5 text-[0.9375rem] leading-[1.35] text-ink-2 transition-colors hover:bg-bg hover:text-accent-ink">
            {t.label}
          </a>
        </li>
      ))}
    </ol>
  );
}
