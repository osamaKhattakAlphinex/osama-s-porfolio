import { faqs, person, services } from "@/content/site";
import { JsonLd, breadcrumbNode, faqNode, pageMetadata, serviceNode, url, webPageNode } from "@/lib/seo";
import { Container, PageHeader } from "@/components/ui";
import { CtaBand, Faq, Process, ServicesBento } from "@/components/sections";

const path = "/services";
const crumbs = [{ name: "Services", path }];
const description = `Web development services from ${person.name}: MERN stack and Next.js apps, React front ends, WordPress sites, SEO and UI/UX design, for clients worldwide.`;

export const metadata = pageMetadata({
  title: "Web Development Services: MERN, Next.js, SEO",
  description,
  path,
  keywords: ["web development services", "full stack development services", "hire web developer Pakistan", "freelance web developer"],
});

export default function Services() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageNode({
            path,
            name: `Services by ${person.name}`,
            description,
            type: "CollectionPage",
            crumbs,
            extra: {
              mainEntity: {
                "@type": "ItemList",
                itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: url(`/services/${s.slug}`), name: s.heading })),
              },
            },
          }),
          ...services.map(serviceNode),
          faqNode(path, faqs),
          breadcrumbNode(path, crumbs),
        ]}
      />

      <PageHeader
        crumbs={crumbs}
        title="Web development services."
        lede="Full-stack apps, front ends, WordPress sites, SEO and design. One developer across every layer, so nothing gets lost between teams."
      />

      <section aria-label="Services" className="py-16 md:py-24">
        <Container>
          <ServicesBento headingLevel={1} />
        </Container>
      </section>

      <Process />
      <Faq items={faqs} />
      <CtaBand />
    </>
  );
}
