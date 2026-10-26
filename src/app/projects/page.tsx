import { heroShot, person, projectBySlug, projects } from "@/content/site";
import { JsonLd, breadcrumbNode, pageMetadata, url, webPageNode } from "@/lib/seo";
import { Container, CtaPanel, PageIntro } from "@/components/ui";
import { ProjectFilter } from "@/components/ProjectFilter";
import { ScreenFan } from "@/components/backdrops";

const path = "/projects";
const crumbs = [{ name: "Work", path }];
const description = `Web development projects by ${person.name}: a time-tracking SaaS, full-stack apps, React front ends, WordPress stores and SEO work, each live and linked. ${projects.length} case studies.`;

export const metadata = pageMetadata({
  title: "Work: MERN, Next.js, React and WordPress Projects",
  description,
  path,
  keywords: ["MERN stack projects", "full stack developer portfolio", "web developer portfolio Pakistan", "Next.js projects", "React projects", "WordPress projects"],
});

export default function Projects() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageNode({
            path,
            name: `Work by ${person.name}`,
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

      <PageIntro
        crumbs={crumbs}
        titleClass="max-w-[12ch]"
        title="Work that's live and in use."
        lede="A SaaS product I build every day, plus stores, lead-generation sites and publications for clients. Each page says exactly what my part was."
        visual={<ScreenFan shots={["timbera", "networkustad", "staffvertex"].map((s) => ({ src: heroShot(projectBySlug(s)!), alt: "" }))} />}
      />

      <section aria-label="Projects" className="pt-4 pb-6 md:pt-4">
        <Container>
          <ProjectFilter />
        </Container>
      </section>

      <CtaPanel title="Want yours on this page?" body="Tell me what you're building and when you need it." label="Start a project" />
    </>
  );
}
