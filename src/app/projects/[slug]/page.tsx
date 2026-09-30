import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { host, person, projectBySlug, projects, serviceBySlug } from "@/content/site";
import { JsonLd, breadcrumbNode, pageMetadata, projectNode, webPageNode } from "@/lib/seo";
import { Breadcrumbs, Container, SectionTitle } from "@/components/ui";
import { ToolList } from "@/components/StackIcon";
import { CtaBand, ProjectCard, ProjectShot, Tags } from "@/components/sections";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  const p = projectBySlug((await params).slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.name}: ${p.kind}`,
    description: `${p.summary} Case study by ${person.name}.`,
    path: `/projects/${p.slug}`,
    type: "article",
    keywords: [p.name, host(p.href), p.kind, ...p.categories.map((c) => `${c} project`)],
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const p = projectBySlug((await params).slug);
  if (!p) notFound();

  const path = `/projects/${p.slug}`;
  const crumbs = [
    { name: "Projects", path: "/projects" },
    { name: p.name, path },
  ];
  const related = p.services.map(serviceBySlug).filter((s) => s !== undefined);
  const i = projects.indexOf(p);
  const more = [projects[(i + 1) % projects.length], projects[(i + 2) % projects.length]];

  return (
    <>
      <JsonLd
        nodes={[
          webPageNode({ path, name: `${p.name} case study`, description: p.summary, type: "ItemPage", crumbs, image: p.image, extra: { mainEntity: { "@id": projectNode(p)["@id"] } } }),
          projectNode(p),
          breadcrumbNode(path, crumbs),
        ]}
      />

      <article>
        <header className="border-b border-rule">
          <Container className="pt-10 md:pt-14">
            <Breadcrumbs crumbs={crumbs} />
            <div className="mt-8 grid grid-cols-1 gap-8 pb-12 md:grid-cols-12 md:gap-10 md:pb-16">
              <div className="md:col-span-8">
                <Tags items={[...p.categories, p.kind]} />
                <h1 className="rise display mt-6 text-[clamp(2.75rem,6vw,5rem)]">{p.name}</h1>
                <p className="rise prose-lede mt-6 max-w-[56ch] text-lg text-ink-2 md:text-xl" style={{ "--i": 1 } as React.CSSProperties}>
                  {p.summary}
                </p>
              </div>
              <div className="rise flex items-end md:col-span-4 md:justify-end" style={{ "--i": 2 } as React.CSSProperties}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex h-12 items-center gap-2 rounded-xl bg-accent px-6 font-semibold text-on-accent transition-transform duration-200 ease-out-expo hover:-translate-y-0.5"
                >
                  Visit {host(p.href)}
                  <ArrowUpRight size={17} weight="bold" aria-hidden className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </Container>
        </header>

        <Container className="py-12 md:py-16">
          <ProjectShot project={p} eager sizes="(min-width: 1240px) 1176px, 100vw" className="aspect-[16/9] md:aspect-[2/1]" />
        </Container>

        <Container className="grid grid-cols-1 gap-12 pb-24 md:grid-cols-12 md:gap-10 md:pb-32">
          <div className="md:col-span-7">
            <section aria-labelledby="about-title">
              <h2 id="about-title" className="heading text-[clamp(1.75rem,3vw,2.25rem)]">
                The project
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-2">{p.about}</p>
            </section>
            <section aria-labelledby="work-title" className="mt-14">
              <h2 id="work-title" className="heading text-[clamp(1.75rem,3vw,2.25rem)]">
                What I did
              </h2>
              <ul className="mt-5 space-y-3.5 text-lg">
                {p.work.map((w) => (
                  <li key={w} className="flex gap-3">
                    <span className="mt-[0.75em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-text" aria-hidden />
                    {w}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <dl className="divide-y divide-rule rounded-xl border border-rule bg-sheet">
              <Row term="Type">{p.kind}</Row>
              <Row term="Work">{p.categories.join(", ")}</Row>
              <Row term="Live site">
                <a href={p.href} target="_blank" rel="noopener" className="font-medium underline decoration-rule-strong underline-offset-4 hover:decoration-ink">
                  {host(p.href)}
                </a>
              </Row>
              {p.stack.length > 0 && (
                <div className="p-5">
                  <dt className="font-mono text-xs text-ink-2">Built with</dt>
                  <dd className="mt-3">
                    <ToolList tools={p.stack} />
                  </dd>
                </div>
              )}
            </dl>
            {related.length > 0 && (
              <div className="mt-6 rounded-xl border border-rule p-5">
                <p className="font-mono text-xs text-ink-2">Related services</p>
                <ul className="mt-3 space-y-2">
                  {related.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="font-medium underline decoration-rule-strong underline-offset-4 hover:decoration-ink">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </Container>
      </article>

      <section aria-labelledby="more-title" className="border-t border-rule bg-sheet py-20 md:py-28">
        <Container>
          <SectionTitle id="more-title">More projects</SectionTitle>
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
            {more.map((m) => (
              <ProjectCard key={m.slug} project={m} sizes="(min-width: 768px) 45vw, 100vw" />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title={`Need something like ${p.name}?`} />
    </>
  );
}

function Row({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 p-5">
      <dt className="font-mono text-xs text-ink-2">{term}</dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
}
