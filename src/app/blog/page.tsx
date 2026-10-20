import { isoDateTime, person } from "@/content/site";
import { posts } from "@/content/blog";
import { JsonLd, blogNode, breadcrumbNode, pageMetadata, url, webPageNode } from "@/lib/seo";
import { Container, PageHeader } from "@/components/ui";
import { CtaBand } from "@/components/sections";
import { PostCard } from "@/components/blog-ui";

const path = "/blog";
const crumbs = [{ name: "Blog", path }];
const description = `Articles by ${person.name} on MERN stack and Next.js development, ecommerce, lead generation and SEO, written from real client projects.`;

export const metadata = pageMetadata({
  title: "Blog: MERN, Next.js and SEO Guides",
  description,
  path,
  keywords: ["MERN stack blog", "web development articles", "SEO guides", "Next.js articles"],
});

export default function Blog() {
  const [lead, ...rest] = posts;
  return (
    <>
      <JsonLd
        nodes={[
          webPageNode({
            path,
            name: `Blog by ${person.name}`,
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

      <PageHeader
        crumbs={crumbs}
        title="Notes from real projects."
        lede="Practical guides on building web apps, online stores and lead-generation sites, and on getting them found on Google. Each one draws on a project I've worked on."
      />

      <section aria-label="Articles" className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
            {lead && <PostCard post={lead} large headingLevel={2} />}
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} headingLevel={2} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
