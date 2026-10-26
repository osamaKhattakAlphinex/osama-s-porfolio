import Image from "next/image";
import Link from "next/link";
import { faqs, person, serviceVisual, services } from "@/content/site";
import { JsonLd, breadcrumbNode, faqNode, pageMetadata, serviceNode, url, webPageNode } from "@/lib/seo";
import { Container, PageIntro, SectionHead } from "@/components/ui";
import { FaqList, ProcessGrid } from "@/components/sections";
import { Backdrop, ScreenFan } from "@/components/backdrops";
import { IconTile, serviceIcons } from "@/components/icons";

const path = "/services";
const crumbs = [{ name: "Services", path }];
const description = `Web development services from ${person.name}: MERN stack and Next.js apps, React front ends, WordPress sites, SEO and UI/UX design, for clients worldwide.`;

export const metadata = pageMetadata({
  title: "Web Development Services: MERN, Next.js, SEO",
  description,
  path,
  keywords: ["web development services", "full stack development services", "hire web developer Pakistan", "freelance web developer", "MERN stack development services"],
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

      <PageIntro
        crumbs={crumbs}
        title="From first wireframe to a product that ranks."
        lede="One developer across the data model, API, interface, deployment and search. Pick what you need, or hand me the whole thing."
        visual={<ScreenFan shots={["/work/staffvertex/section.webp", "/work/teey/home.webp", "/work/carports-hawaii/home.webp"].map((src) => ({ src, alt: "" }))} />}
      />

      <section aria-label="All services">
        <Container className="pt-4 pb-16 md:pb-24">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug} className="flex">
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex flex-1 flex-col gap-4 overflow-hidden rounded-[20px] border-[1.5px] border-rule bg-surface p-6 text-ink transition-colors hover:border-accent md:p-8"
                >
                  <div className="relative -mx-6 -mt-6 mb-1 h-36 overflow-hidden border-b border-rule bg-shot md:-mx-8 md:-mt-8 md:h-40">
                    <Image src={serviceVisual[s.slug]} alt="" fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
                    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,var(--surface)_100%)]" />
                    <span className="absolute bottom-3 left-6 md:left-8">
                      <IconTile icon={serviceIcons[s.slug]} size="lg" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.8125rem] text-accent-ink">{s.n}</span>
                    <span
                      className={`rounded-md px-2 py-1 font-mono text-[0.6875rem] tracking-[0.05em] ${
                        s.core ? "bg-accent-soft text-accent-soft-ink" : "bg-sunken text-muted"
                      }`}
                    >
                      {s.core ? "CORE" : "ALSO"}
                    </span>
                  </div>
                  <h2 className="heading text-[1.5rem] leading-[1.15] md:text-[1.6875rem]">{s.name}</h2>
                  <p className="text-muted">{s.short}</p>
                  <ul className="flex grow flex-col gap-1.5 text-[0.9375rem] text-ink-2">
                    {s.highlights.map((d) => (
                      <li key={d} className="flex gap-2.5">
                        <span aria-hidden className="text-accent-ink">
                          ✓
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between gap-3 border-t border-sunken pt-4">
                    <span className="font-mono text-xs text-muted uppercase">{s.tools.slice(0, 4).join(" · ")}</span>
                    <span className="font-semibold whitespace-nowrap text-accent-ink">
                      Details <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="proc-title" className="relative isolate overflow-hidden bg-night text-night-ink">
        <Backdrop pattern="grid-night" mask="radial" glows={[{ className: "-bottom-40 -left-32 h-[32rem] w-[32rem]" }]} />
        <Container className="flex flex-col gap-10 py-16 md:gap-12 md:py-24">
          <SectionHead id="proc-title" night eyebrow="How we'd work" title="Four steps, no surprises." />
          <ProcessGrid />
        </Container>
      </section>

      <section aria-labelledby="faq-title">
        <Container className="grid grid-cols-1 items-start gap-8 py-16 md:py-24 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col gap-3.5">
            <SectionHead id="faq-title" eyebrow="FAQ" title="Questions clients ask first." size="md" />
            <Link href="/contact" className="inline-flex min-h-11 items-center font-semibold text-accent-ink hover:underline">
              Ask me something else →
            </Link>
          </div>
          <div className="lg:col-span-2">
            <FaqList items={faqs} />
          </div>
        </Container>
      </section>
    </>
  );
}
