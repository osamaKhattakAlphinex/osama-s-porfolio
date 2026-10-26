import Image from "next/image";
import Link from "next/link";
import { isoDateTime, person } from "@/content/site";
import { postBySlug, posts, readingMinutes } from "@/content/blog";
import { JsonLd, blogNode, breadcrumbNode, pageMetadata, url, webPageNode } from "@/lib/seo";
import { Container, PageIntro } from "@/components/ui";
import { PostCard } from "@/components/blog-ui";
import { BlogFilter } from "@/components/BlogFilter";

const path = "/blog";
const crumbs = [{ name: "Writing", path }];
const description = `Articles by ${person.name} on MERN stack and Next.js development, SaaS, ecommerce, lead generation and SEO, written from real client projects.`;

export const metadata = pageMetadata({
  title: "Writing: MERN, Next.js and SEO Guides",
  description,
  path,
  keywords: ["MERN stack blog", "web development articles", "SEO guides", "Next.js articles", "SaaS development guide"],
});

const featuredSlug = "build-time-tracking-app-like-hubstaff";

export default function Blog() {
  const featured = postBySlug(featuredSlug)!;
  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <>
      <JsonLd
        nodes={[
          webPageNode({
            path,
            name: `Writing by ${person.name}`,
            description,
            type: "CollectionPage",
            crumbs,
            extra: {
              mainEntity: { "@id": blogNode()["@id"] },
              hasPart: posts.map((p) => ({ "@id": `${url(`/blog/${p.slug}`)}#article` })),
            },
          }),
          {
            ...blogNode(),
            blogPost: posts.map((p) => ({
              "@type": "BlogPosting",
              "@id": `${url(`/blog/${p.slug}`)}#article`,
              headline: p.title,
              url: url(`/blog/${p.slug}`),
              datePublished: isoDateTime(p.published),
              image: url(p.image),
            })),
          },
          breadcrumbNode(path, crumbs),
        ]}
      />

      <PageIntro
        crumbs={crumbs}
        titleClass=""
        title={
          <>
            Notes from{" "}
            <br />
            the work.
          </>
        }
        lede="Practical write-ups from projects I've built: SaaS, ecommerce, lead generation, hiring and SEO. No filler, just what I'd tell a client over a call."
      />

      {/* Featured */}
      <section aria-label="Featured article">
        <Container className="pt-2 pb-12 md:pt-4 md:pb-14">
          <Link href={`/blog/${featured.slug}`} className="group relative isolate grid grid-cols-1 overflow-hidden rounded-3xl bg-night text-night-ink lg:grid-cols-2">
            <div aria-hidden className="pattern-grid-night fade-right pointer-events-none absolute inset-0 -z-10" />
            <div aria-hidden className="glow-blob pointer-events-none -right-24 -bottom-32 -z-10 h-[28rem] w-[28rem]" />
            <div className="min-h-[13rem] overflow-hidden bg-night-2/70 pt-6 pl-6 md:min-h-[18.75rem] md:pt-10 md:pl-10">
              <div className="relative aspect-[16/10] overflow-hidden rounded-tl-xl">
                <Image src="/work/staffvertex/home.webp" alt="Staffvertex time tracking app home page" fill preload sizes="(min-width: 1024px) 560px, 100vw" className="object-cover object-[left_top] transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-4.5 p-6 md:p-10 lg:p-14">
              <span className="font-mono text-xs tracking-[0.06em] text-night-link uppercase">
                Featured · {featured.category} · {readingMinutes(featured.slug)} min read
              </span>
              <h2 className="heading text-[clamp(1.6rem,3vw,2.7rem)] leading-[1.1] text-white transition-colors group-hover:text-[#c9d3ff]">{featured.title}</h2>
              <p className="text-lg text-night-muted">{featured.excerpt}</p>
              <span className="font-semibold text-white">Read article →</span>
            </div>
          </Link>
        </Container>
      </section>

      <section aria-labelledby="all-title">
        <Container className="pb-16 md:pb-24">
          <BlogFilter
            heading={
              <h2 id="all-title" className="heading text-[1.75rem]">
                All articles
              </h2>
            }
            categories={categories}
            items={posts.map((p) => ({ category: p.category, node: <PostCard post={p} /> }))}
          />
        </Container>
      </section>
    </>
  );
}
