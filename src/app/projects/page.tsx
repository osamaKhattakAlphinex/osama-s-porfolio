import { person, projects } from "@/content/site";
import { JsonLd, breadcrumbNode, pageMetadata, url, webPageNode } from "@/lib/seo";
import { Container, PageHeader } from "@/components/ui";
import { CtaBand } from "@/components/sections";
import { ProjectFilter } from "@/components/ProjectFilter";

const path = "/projects";
const crumbs = [{ name: "Projects", path }];
const description = `Web development projects by ${person.name}: full-stack apps, React front ends, WordPress stores and SEO work, each live and linked. ${projects.length} case studies.`;

export const metadata = pageMetadata({
  title: "Projects: MERN, React and WordPress Work",
  description,
  path,
  keywords: ["MERN stack projects", "full stack developer portfolio", "web developer portfolio Pakistan", "React projects", "WordPress projects"],
});

export default function Projects() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageNode({
            path,
            name: `Projects by ${person.name}`,
            description,
            type: "CollectionPage",
            crumbs,
            extra: {
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: projects.length,
                itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: url(`/projects/${p.slug}`), name: p.name })),
              },
            },
          }),
          breadcrumbNode(path, crumbs),
        ]}
      />

      <PageHeader
        crumbs={crumbs}
        title="Projects, shipped and live."
        lede="Client work across full-stack apps, React front ends, WordPress and SEO. Every project here is real and online; open any of them for what I built."
      />

      <section aria-label="All projects" className="py-16 md:py-24">
        <Container>
          <ProjectFilter />
        </Container>
      </section>

      <CtaBand title="Want yours on this page?" />
    </>
  );
}
