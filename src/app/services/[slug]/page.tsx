import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { heroShot, host, mobileShot, projects, serviceBySlug, serviceVisual, services } from "@/content/site";
import { postsForService } from "@/content/blog";
import { JsonLd, breadcrumbNode, faqNode, pageMetadata, serviceNode, webPageNode } from "@/lib/seo";
import { Breadcrumbs, ButtonLink, Container, CtaPanel, Eyebrow, SectionHead } from "@/components/ui";
import { FaqList, ProcessSteps, ProofCard } from "@/components/sections";
import { PostTextCard } from "@/components/blog-ui";
import { Backdrop, ShotBackdrop } from "@/components/backdrops";
import { IconTile, serviceIcons } from "@/components/icons";
import { StackIcon } from "@/components/StackIcon";

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
  const reading = postsForService(s.slug).slice(0, 3);
  const lead = proof[0];
  const phone = lead ? mobileShot(lead) : undefined;

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

      {/* Hero */}
      <section aria-labelledby="svc-title" className="relative isolate overflow-hidden">
        <Backdrop pattern="grid" mask="radial" glows={[{ className: "-top-40 right-[-10%] h-[36rem] w-[36rem]" }]} />
        <Container className="grid grid-cols-1 items-center gap-10 pt-10 pb-12 md:pt-14 md:pb-[4.5rem] lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-5.5">
            <Breadcrumbs crumbs={crumbs} />
            <span className="flex items-center gap-3">
              <IconTile icon={serviceIcons[s.slug]} />
              <Eyebrow className="text-accent-ink">Service {s.n} / 06</Eyebrow>
            </span>
            <h1 id="svc-title" className="rise display text-[clamp(2.2rem,5.4vw,4.4rem)] leading-[1.02]">
              {s.heading}
            </h1>
            <p className="rise max-w-[32em] text-lg leading-[1.55] text-muted md:text-[1.3125rem]" style={{ "--i": 1 } as React.CSSProperties}>
              {s.short}
            </p>
            <div className="rise flex flex-wrap gap-3" style={{ "--i": 2 } as React.CSSProperties}>
              <ButtonLink href="/contact">Discuss your project</ButtonLink>
              {proof.length > 0 && (
                <ButtonLink href="#proof" variant="ghost">
                  See related work
                </ButtonLink>
              )}
            </div>
          </div>
          {/* Visual: the work this service was used on, with the tools floating around it. */}
          <div className="relative px-2 pt-2 pb-10 sm:px-6">
            <div className="overflow-hidden rounded-2xl border border-rule bg-surface shadow-[0_30px_70px_-34px_var(--shadow)]">
              <div className="flex items-center gap-2 border-b border-rule bg-bg px-3.5 py-2.5" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-2.5 w-2.5 rounded-full bg-rule-2" />
                ))}
                <span className="ml-3 truncate rounded-md border border-rule bg-surface px-2.5 py-0.5 font-mono text-xs text-muted">{lead && !lead.offline ? host(lead.href) : "figma.com"}</span>
              </div>
              <div className="relative aspect-[16/10]">
                <Image src={lead ? heroShot(lead) : serviceVisual[s.slug]} alt={lead ? `${lead.name}, built with ${s.name.toLowerCase()}` : ""} fill preload sizes="(min-width: 1024px) 540px, 100vw" className="object-cover object-top" />
              </div>
            </div>
            {phone && (
              <div aria-hidden className="float-slow absolute right-0 bottom-0 aspect-[9/18] w-[22%] max-w-[120px] overflow-hidden rounded-[18px] border-[5px] border-[#0c1222] shadow-[0_24px_50px_-20px_rgb(12_18_34/0.55)]">
                <Image src={phone.src} alt="" fill sizes="120px" className="object-cover object-top" />
              </div>
            )}
            <ul aria-label={`Tools for ${s.name}`} className="float absolute bottom-0 left-0 flex max-w-[72%] flex-wrap gap-1.5 rounded-xl border border-rule bg-surface/95 p-2 shadow-[0_18px_40px_-20px_var(--shadow)] backdrop-blur">
              {s.tools.slice(0, 4).map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5 rounded-lg bg-chip px-2 py-1 font-mono text-[0.6875rem] text-accent-soft-ink">
                  <StackIcon tool={t} size={13} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Why me */}
      <section aria-labelledby="why-title">
        <Container className="pb-12 md:pb-16">
          <div className="grid grid-cols-1 gap-6 rounded-[22px] border border-rule bg-surface p-6 md:grid-cols-[1fr_2fr] md:gap-10 md:p-10">
            <div className="flex flex-col gap-4">
              <h2 id="why-title" className="heading text-[clamp(1.5rem,2.6vw,2rem)]">
                Why work with me on {s.name.replace(/ services$/, "")}
              </h2>
              <ul className="flex flex-wrap gap-2" aria-label="Full tool list">
                {s.tools.map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5 rounded-lg border border-chip-rule bg-chip px-2.5 py-1.5 font-mono text-xs text-accent-soft-ink">
                    <StackIcon tool={t} size={13} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              {s.intro.map((para) => (
                <p key={para} className="text-[1.0625rem] leading-[1.7] text-ink-2 md:text-lg">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Deliverables */}
      <section aria-labelledby="del-title">
        <Container className="flex flex-col gap-8 pt-4 pb-16 md:pt-8 md:pb-24">
          <h2 id="del-title" className="heading text-[clamp(1.75rem,3.4vw,2.8rem)]">
            What you get
          </h2>
          <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {s.deliverables.map((d, i) => (
              <li key={d.title} className="flex flex-col gap-2.5 bg-surface p-6 md:p-7.5">
                <span className="font-mono text-[0.8125rem] text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-[1.3125rem] font-semibold tracking-[-0.015em] md:text-[1.375rem]">{d.title}</h3>
                <p className="text-base text-muted">{d.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Proof */}
      {proof.length > 0 && (
        <section id="proof" aria-labelledby="proof-title" className="relative isolate overflow-hidden bg-night text-night-ink">
          <ShotBackdrop src={heroShot(proof[0])} />
          <Container className="flex flex-col gap-9 py-16 md:py-24">
            <SectionHead id="proof-title" night eyebrow="Proof" title="Where I've done this before" size="md" />
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {proof.map((p) => (
                <li key={p.slug} className="flex">
                  <ProofCard project={p} />
                </li>
              ))}
            </ul>
            {s.proofNote && <p className="text-[0.9375rem] text-night-muted">{s.proofNote}</p>}
          </Container>
        </section>
      )}

      {/* Process */}
      <section aria-labelledby="proc-title">
        <Container className="flex flex-col gap-8 pt-16 pb-10 md:pt-24 md:pb-12">
          <h2 id="proc-title" className="heading text-[clamp(1.6rem,3vw,2.4rem)]">
            How it runs
          </h2>
          <ProcessSteps />
        </Container>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title">
        <Container className="grid grid-cols-1 items-start gap-8 pt-10 pb-14 md:pt-12 md:pb-20 lg:grid-cols-3 lg:gap-12">
          <h2 id="faq-title" className="heading text-[clamp(1.6rem,3vw,2.4rem)]">
            Common questions
          </h2>
          <div className="lg:col-span-2">
            <FaqList items={s.faqs} />
          </div>
        </Container>
      </section>

      {/* Related reading */}
      {reading.length > 0 && (
        <section aria-labelledby="reading-title" className="border-y border-rule bg-surface">
          <Container className="flex flex-col gap-8 py-14 md:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="reading-title" className="heading text-[clamp(1.6rem,3vw,2.4rem)]">
                Further reading
              </h2>
              <Link href="/blog" className="inline-flex min-h-11 items-center font-semibold text-accent-ink hover:underline">
                All articles →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {reading.map((p) => (
                <PostTextCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Other services */}
      <nav aria-labelledby="other-title">
        <Container className="flex flex-wrap items-center gap-2.5 pt-14 md:pt-20">
          <h2 id="other-title" className="mr-2 font-mono text-[0.8125rem] tracking-[0.05em] text-muted">
            OTHER SERVICES
          </h2>
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/services/${o.slug}`}
              className="inline-flex min-h-10 items-center rounded-full border-[1.5px] border-rule-2 bg-surface px-4 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-ink md:min-h-11"
            >
              {o.name}
            </Link>
          ))}
        </Container>
      </nav>

      <CtaPanel title={s.cta} body="Freelance projects and full-time remote roles both welcome." />
    </>
  );
}
