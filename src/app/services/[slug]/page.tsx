import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { projects, serviceBySlug, services } from "@/content/site";
import { JsonLd, breadcrumbNode, faqNode, pageMetadata, serviceNode, webPageNode } from "@/lib/seo";
import { ButtonLink, Container, PageHeader, SectionTitle } from "@/components/ui";
import { ToolList } from "@/components/StackIcon";
import { CtaBand, Faq, Process, ProjectCard } from "@/components/sections";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}`, keywords: s.keywords });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();

  const path = `/services/${s.slug}`;
  const crumbs = [
    { name: "Services", path: "/services" },
    { name: s.name, path },
  ];
  const proof = projects.filter((p) => p.services.includes(s.slug));
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <JsonLd
        nodes={[
          webPageNode({ path, name: s.heading, description: s.metaDescription, crumbs, extra: { mainEntity: { "@id": serviceNode(s)["@id"] } } }),
          serviceNode(s),
          faqNode(path, s.faqs),
          breadcrumbNode(path, crumbs),
        ]}
      />

      <PageHeader crumbs={crumbs} title={s.heading} lede={s.short}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact">Hire me</ButtonLink>
          {proof.length > 0 && (
            <ButtonLink href="#work" variant="secondary">
              See related work
            </ButtonLink>
          )}
        </div>
      </PageHeader>

      <section aria-labelledby="intro-title" className="py-20 md:py-28">
        <Container className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <h2 id="intro-title" className="reveal heading text-[clamp(1.75rem,3vw,2.5rem)]">
              Why work with me on {s.name.replace(/ services$/, "")}
            </h2>
            <div className="reveal mt-6 space-y-5 text-lg leading-relaxed text-ink-2">
              {s.intro.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>
          <aside className="reveal md:col-span-4 md:col-start-9">
            <p className="font-mono text-xs text-ink-2">Stack</p>
            <div className="mt-4">
              <ToolList tools={s.tools} label={`Tools for ${s.name}`} />
            </div>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="deliverables-title" className="border-t border-rule bg-sheet py-24 md:py-28">
        <Container>
          <SectionTitle id="deliverables-title">What you get.</SectionTitle>
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {s.deliverables.map((d, i) => (
              <li key={d.title} className={`reveal rounded-xl border border-rule p-7 ${i === 0 ? "bg-accent-soft" : "bg-bg"}`}>
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{d.title}</h3>
                <p className="mt-2 text-ink-2">{d.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {proof.length > 0 && (
        <section id="work" aria-labelledby="work-title" className="border-t border-rule py-24 md:py-28">
          <Container>
            <SectionTitle id="work-title">Related work.</SectionTitle>
            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
              {proof.slice(0, 4).map((p) => (
                <ProjectCard key={p.slug} project={p} sizes="(min-width: 768px) 45vw, 100vw" />
              ))}
            </div>
          </Container>
        </section>
      )}

      <Process />
      <Faq items={s.faqs} title={`${s.name} questions.`} />

      <nav aria-labelledby="other-title" className="border-t border-rule py-20">
        <Container>
          <h2 id="other-title" className="heading text-[clamp(1.5rem,2.5vw,2rem)]">
            Other services
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug} className="border-t border-rule">
                <Link href={`/services/${o.slug}`} className="group flex items-center justify-between gap-4 py-5 text-lg font-medium">
                  {o.name}
                  <ArrowUpRight size={18} aria-hidden className="text-ink-2 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <CtaBand title={`Ready to start your ${s.name.replace(/ services$/, "")} project?`} />
    </>
  );
}
