import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { person, projectBySlug, serviceBySlug } from "@/content/site";
import { postBySlug, posts, wordCount } from "@/content/blog";
import { JsonLd, blogPostingNode, breadcrumbNode, faqNode, pageMetadata, webPageNode } from "@/lib/seo";
import { Breadcrumbs, Container, SectionTitle } from "@/components/ui";
import { CtaBand, Faq } from "@/components/sections";
import { PostCard, PostMetaLine } from "@/components/blog-ui";

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

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = postBySlug((await params).slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const crumbs = [
    { name: "Blog", path: "/blog" },
    { name: post.title, path },
  ];
  const words = wordCount(post.slug);
  const project = post.project ? projectBySlug(post.project) : undefined;
  const services = post.services.map(serviceBySlug).filter((s) => s !== undefined);
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
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
        <header className="relative overflow-hidden border-b border-rule">
          <div aria-hidden className="spotlight pointer-events-none absolute inset-0 [--x:20%] [--y:0%]" />
          <Container className="relative pt-10 pb-12 md:pt-14 md:pb-16">
            <Breadcrumbs crumbs={crumbs} />
            <p className="mt-8 font-mono text-xs text-accent-text">{post.category}</p>
            <h1 className="rise display mt-4 max-w-[22ch] text-[clamp(2.25rem,4.6vw,3.75rem)]">{post.title}</h1>
            <p className="rise prose-lede mt-6 max-w-[62ch] text-lg text-ink-2 md:text-xl" style={{ "--i": 1 } as React.CSSProperties}>
              {post.excerpt}
            </p>
            <div className="rise mt-8 flex flex-wrap items-center gap-4" style={{ "--i": 2 } as React.CSSProperties}>
              <Link href="/about" className="flex items-center gap-3" rel="author">
                <span className="relative h-10 w-10 overflow-hidden rounded-full border border-rule">
                  <Image src={person.portrait} alt="" fill sizes="40px" className="object-cover" />
                </span>
                <span className="text-sm">
                  <span className="block font-semibold">{person.name}</span>
                  <span className="text-ink-2">{person.role}</span>
                </span>
              </Link>
              <span className="hidden h-8 w-px bg-rule sm:block" aria-hidden />
              <PostMetaLine post={post} />
            </div>
          </Container>
        </header>

        <Container className="pt-10 md:pt-14">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-rule bg-sheet-2">
            <Image src={post.image} alt={post.imageAlt} fill preload sizes="(min-width: 1240px) 1176px, 100vw" className="object-cover" />
          </div>
        </Container>

        <Container className="grid grid-cols-1 gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-3">
            <nav aria-labelledby="toc-title" className="rounded-xl border border-rule bg-sheet p-5 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
              <p id="toc-title" className="font-mono text-xs text-ink-2">
                In this article
              </p>
              <ol className="mt-3 space-y-2 text-[0.925rem]">
                {post.toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="text-ink-2 transition-colors hover:text-ink">
                      {t.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="prose-article min-w-0 lg:col-span-8 lg:col-start-5">
            <Body />

            <div className="not-prose mt-14 grid gap-4 sm:grid-cols-2">
              {project && (
                <Link href={`/projects/${project.slug}`} className="group rounded-xl border border-rule bg-sheet p-5 transition-colors hover:border-rule-strong">
                  <p className="font-mono text-xs text-ink-2">Case study</p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-lg font-semibold">
                    {project.name}
                    <ArrowUpRight size={16} weight="bold" aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </p>
                  <p className="mt-1 text-sm text-ink-2">{project.kind}</p>
                </Link>
              )}
              {services.slice(0, project ? 1 : 2).map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="group rounded-xl border border-rule bg-accent-soft p-5 transition-colors hover:border-rule-strong">
                  <p className="font-mono text-xs text-ink-2">Service</p>
                  <p className="mt-2 inline-flex items-center gap-1.5 text-lg font-semibold">
                    {s.name}
                    <ArrowUpRight size={16} weight="bold" aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </p>
                  <p className="mt-1 text-sm text-ink-2">{s.short}</p>
                </Link>
              ))}
            </div>

            <div className="not-prose mt-10 flex items-start gap-4 rounded-xl border border-rule p-6">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-rule">
                <Image src={person.portrait} alt={`${person.name}`} fill sizes="56px" className="object-cover" />
              </span>
              <div>
                <p className="font-semibold">Written by {person.name}</p>
                <p className="mt-1 text-[0.95rem] text-ink-2">
                  {person.role} in {person.city}, {person.country}, and {person.currentTitle} at {person.employer}. I&apos;ve worked on
                  the web since {person.since}, starting in SEO.{" "}
                  <Link href="/about" className="font-medium text-ink underline decoration-rule-strong underline-offset-4 hover:decoration-ink">
                    More about me
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </Container>
      </article>

      <Faq items={post.faqs} title="Questions about this topic." />

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-rule bg-sheet py-20 md:py-28">
          <Container>
            <SectionTitle id="related-title">Keep reading</SectionTitle>
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand />
    </>
  );
}
