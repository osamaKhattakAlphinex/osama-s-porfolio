import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { heroShot, host, mobileShot, person, projectBySlug, projects, sectionShot, serviceBySlug, staffvertexStory as sv, type Project } from "@/content/site";
import { postsForProject } from "@/content/blog";
import { JsonLd, breadcrumbNode, pageMetadata, projectNode, webPageNode } from "@/lib/seo";
import { Breadcrumbs, BrowserFrame, ButtonLink, Container, Eyebrow } from "@/components/ui";
import { Backdrop, ShotBackdrop } from "@/components/backdrops";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  const p = projectBySlug((await params).slug);
  if (!p) return {};
  return pageMetadata({
    // "Case Study" only when the whole title still fits in ~65 characters with the name suffix.
    title: `${p.name}: ${p.kind}${`${p.name}: ${p.kind} Case Study`.length <= 46 ? " Case Study" : ""}`,
    description: [`${p.summary} Case study by ${person.name}: what the site does and what I built.`, `${p.summary} A case study by ${person.name}.`, p.summary].find((d) => d.length <= 160)!,
    path: `/projects/${p.slug}`,
    type: "article",
    keywords: [p.name, host(p.href), p.kind, `${p.name} case study`, ...p.categories.map((c) => `${c} project`)],
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const p = projectBySlug((await params).slug);
  if (!p) notFound();

  const path = `/projects/${p.slug}`;
  const crumbs = [
    { name: "Work", path: "/projects" },
    { name: p.name, path },
  ];
  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  return (
    <>
      <JsonLd
        nodes={[
          webPageNode({ path, name: `${p.name} case study`, description: p.summary, type: "ItemPage", crumbs, image: heroShot(p), extra: { mainEntity: { "@id": projectNode(p)["@id"] } } }),
          projectNode(p),
          breadcrumbNode(path, crumbs),
        ]}
      />
      <article>
        {p.slug === "staffvertex" ? <Staffvertex p={p} crumbs={crumbs} /> : <CaseStudy p={p} crumbs={crumbs} />}
        <NextProject next={next} />
      </article>
    </>
  );
}

type Crumbs = { name: string; path: string }[];

function Facts({ items }: { items: [string, React.ReactNode][] }) {
  return (
    <dl className="mt-2 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-rule bg-rule lg:grid-cols-4">
      {items.map(([k, v]) => (
        <div key={k} className="bg-surface px-4 py-4 md:px-5">
          <dt className="font-mono text-xs tracking-[0.05em] text-muted uppercase">{k}</dt>
          <dd className="mt-1 font-semibold">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function LiveLink({ p }: { p: Project }) {
  return p.offline ? (
    <span className="font-medium text-muted">No longer online</span>
  ) : (
    <a href={p.href} target="_blank" rel="noopener" className="text-accent-ink hover:underline">
      {host(p.href)} ↗
    </a>
  );
}

function Intro({ p, crumbs, eyebrow, title, lede, facts }: { p: Project; crumbs: Crumbs; eyebrow: string; title: React.ReactNode; lede: string; facts: [string, React.ReactNode][] }) {
  return (
    <header className="relative isolate overflow-hidden">
      <Backdrop pattern="grid" mask="right" glows={[{ className: "-top-40 right-[-10%] h-[34rem] w-[34rem]" }]} />
      <Container className="flex flex-col gap-6 pt-10 pb-10 md:gap-7 md:pt-14 md:pb-12">
        <Breadcrumbs crumbs={crumbs} />
        <div className="flex max-w-[55rem] flex-col gap-4.5">
          <Eyebrow className="text-accent-ink">{eyebrow}</Eyebrow>
          <h1 className={`rise display ${p.slug === "staffvertex" ? "text-[clamp(2.1rem,5vw,4.2rem)]" : "text-[clamp(2.4rem,5.6vw,4.6rem)]"} leading-[1.02]`}>{title}</h1>
          <p className="rise max-w-[34em] text-lg leading-[1.55] text-muted md:text-[1.3125rem]" style={{ "--i": 1 } as React.CSSProperties}>
            {lede}
          </p>
        </div>
        <Facts items={facts} />
      </Container>
    </header>
  );
}

function HeroShot({ p, night }: { p: Project; night?: boolean }) {
  const phone = mobileShot(p);
  return (
    <section aria-label={`${p.name} screenshots`}>
      <Container>
        <div className={`relative isolate overflow-hidden rounded-3xl px-4 pt-4 sm:px-10 sm:pt-10 lg:px-16 lg:pt-16 ${night ? "bg-night" : "bg-shot"}`}>
          <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 ${night ? "pattern-grid-night" : "pattern-dots"} fade-top`} />
          <BrowserFrame url={p.offline ? `${host(p.href)} (archived)` : host(p.href)} night={night} className={night ? "" : "shadow-[0_30px_60px_-30px_var(--shadow)]"}>
            <div className="relative aspect-[16/10]">
              <Image src={heroShot(p)} alt={`${p.name} home page on desktop`} fill preload sizes="(min-width: 1200px) 1020px, 100vw" className="object-cover object-top" />
            </div>
          </BrowserFrame>
          {phone && !night && (
            <div className="absolute right-[clamp(12px,4vw,40px)] bottom-0 aspect-[9/17] w-[17%] min-w-[78px] overflow-hidden rounded-t-[18px] border-[5px] border-b-0 border-[#0c1222] shadow-[0_30px_60px_-20px_rgb(12_18_34/0.5)] sm:border-[6px]">
              <Image src={phone.src} alt={`${p.name} on a phone`} fill sizes="200px" className="object-cover object-top" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

function Gallery({ p, sectionCaption }: { p: Project; sectionCaption?: string }) {
  const wide = sectionShot(p);
  const tall = mobileShot(p);
  if (!wide || !tall) return null;
  return (
    <section aria-label={`More screens from ${p.name}`}>
      <Container className="grid grid-cols-1 items-end gap-8 py-10 sm:grid-cols-3 md:py-12">
        <figure className="flex flex-col gap-3 sm:col-span-2">
          <Image src={wide.src} alt={wide.alt} width={wide.width} height={wide.height} sizes="(min-width: 1200px) 760px, (min-width: 640px) 66vw, 100vw" className="aspect-[16/10] w-full rounded-[14px] border border-rule object-cover object-top" />
          <figcaption className="text-sm text-muted">{sectionCaption ?? wide.caption}</figcaption>
        </figure>
        <figure className="flex w-full max-w-[210px] flex-col gap-3 justify-self-center sm:max-w-[300px]">
          <Image src={tall.src} alt={tall.alt} width={tall.width} height={tall.height} sizes="300px" className="aspect-[9/18] w-full rounded-[22px] border-[6px] border-[#0c1222] object-cover object-top" />
          <figcaption className="text-sm text-muted">{tall.caption}</figcaption>
        </figure>
      </Container>
    </section>
  );
}

function Related({ p }: { p: Project }) {
  const services = p.services.map(serviceBySlug).filter((s) => s !== undefined);
  const article = postsForProject(p.slug)[0];
  return (
    <section aria-label="Related">
      <Container className="grid grid-cols-1 gap-6 pt-10 pb-8 md:grid-cols-2 md:pt-12">
        <div className="flex flex-col gap-3.5 rounded-[20px] border border-rule bg-surface p-6 md:p-7">
          <h2 className="eyebrow text-muted">Related services</h2>
          <div className="flex flex-wrap gap-2.5">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="inline-flex min-h-11 items-center rounded-[10px] bg-accent-soft px-4 font-semibold text-accent-soft-ink hover:underline">
                {s.name} →
              </Link>
            ))}
          </div>
        </div>
        {article && (
          <Link href={`/blog/${article.slug}`} className="flex flex-col gap-2.5 rounded-[20px] bg-night p-6 text-night-ink md:p-7">
            <span className="eyebrow text-night-link">I wrote about this</span>
            <span className="font-display text-[1.375rem] leading-[1.25] font-semibold text-white">{article.title}</span>
            <span className="font-semibold text-[#c9d3ff]">Read article →</span>
          </Link>
        )}
      </Container>
    </section>
  );
}

function NextProject({ next }: { next: Project }) {
  return (
    <section aria-label="Next project">
      <Container className="pt-8 pb-16 md:pb-24">
        <Link href={`/projects/${next.slug}`} className="group flex flex-wrap items-center justify-between gap-6 border-y border-rule-2 py-7 text-ink md:py-8">
          <span className="flex flex-col gap-1">
            <span className="font-mono text-[0.8125rem] tracking-[0.05em] text-muted">NEXT PROJECT</span>
            <span className="heading text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05] group-hover:text-accent-ink">{next.name}</span>
          </span>
          <span aria-hidden className="inline-flex h-13 w-13 items-center justify-center rounded-full bg-accent text-2xl text-white transition-transform duration-200 group-hover:translate-x-1 md:h-16 md:w-16">
            →
          </span>
        </Link>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 md:mt-12">
          <p className="heading text-[1.5rem] md:text-[1.625rem]">Need something like this?</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/contact">Let&apos;s work together</ButtonLink>
            <ButtonLink href="/projects" variant="ghost">
              All projects
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ---------- Standard case study ----------

function CaseStudy({ p, crumbs }: { p: Project; crumbs: Crumbs }) {
  return (
    <>
      <Intro
        p={p}
        crumbs={crumbs}
        eyebrow={`Case study · ${p.kind}`}
        title={p.name}
        lede={p.summary}
        facts={[
          ["Type", p.kind],
          ["My role", p.role],
          p.stack.length ? ["Stack", p.stack.join(", ")] : ["Work", p.categories.join(", ")],
          ["Live site", <LiveLink key="live" p={p} />],
        ]}
      />
      <HeroShot p={p} />

      <section aria-labelledby="about-title">
        <Container className="grid grid-cols-1 items-start gap-8 pt-14 pb-10 md:grid-cols-2 md:gap-12 md:pt-24 md:pb-12">
          <div className="flex flex-col gap-3.5">
            <h2 id="about-title" className="heading text-[1.75rem] md:text-[1.875rem]">
              About the project
            </h2>
            <p className="text-lg leading-[1.7] text-ink-2 md:text-[1.1875rem]">{p.about}</p>
          </div>
          <div className="flex flex-col gap-3.5 rounded-[20px] border border-rule bg-surface p-6 md:p-7">
            <h2 className="eyebrow text-accent-ink">What I did</h2>
            <ul className="flex flex-col gap-3">
              {p.work.map((w) => (
                <li key={w} className="flex gap-3 text-[1.0625rem] md:text-lg">
                  <span aria-hidden className="font-mono text-accent-ink">→</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
            {p.roleNote && <p className="mt-1 rounded-[10px] bg-bg px-3.5 py-3 text-[0.9375rem] text-muted">{p.roleNote}</p>}
          </div>
        </Container>
      </section>

      <section aria-labelledby="features-title">
        <Container className="flex flex-col gap-7 py-10 md:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="features-title" className="heading text-[clamp(1.6rem,3vw,2.6rem)]">
              What the site offers
            </h2>
            <p className="max-w-[22.5rem] text-sm text-muted">{p.offline ? "From the site while it was live." : "Taken from the live site, checked October 2026."}</p>
          </div>
          <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-[18px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {p.features.map((f, i) => (
              <li key={f} className="flex flex-col gap-2 bg-surface p-6">
                <span className="font-mono text-[0.8125rem] text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-ink-2">{f}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Gallery p={p} />
      <Related p={p} />
    </>
  );
}

// ---------- Staffvertex: the deeper SaaS case study ----------

function Staffvertex({ p, crumbs }: { p: Project; crumbs: Crumbs }) {
  const article = postsForProject(p.slug)[0];
  return (
    <>
      <Intro
        p={p}
        crumbs={crumbs}
        eyebrow="Case study · SaaS"
        title={sv.headline}
        lede={sv.lede}
        facts={[
          ["Role", p.role],
          ["Company", person.employer],
          ["Status", "Live, in active development"],
          ["Live", <LiveLink key="live" p={p} />],
        ]}
      />
      <HeroShot p={p} night />

      <section aria-label="Overview">
        <Container className="grid grid-cols-1 gap-10 pt-14 pb-8 md:grid-cols-3 md:gap-12 md:pt-24 md:pb-10">
          <div className="flex flex-col gap-3">
            <h2 className="heading text-[1.625rem] md:text-[1.75rem]">The problem</h2>
            <p className="text-ink-2">{sv.problem}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="heading text-[1.625rem] md:text-[1.75rem]">The product</h2>
            <p className="text-ink-2">{sv.product}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="heading text-[1.625rem] md:text-[1.75rem]">My contribution</h2>
            <ul className="flex list-disc flex-col gap-2 pl-4.5 text-ink-2 marker:text-accent">
              {p.work.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section aria-labelledby="features-title">
        <Container className="flex flex-col gap-7 py-12 md:py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="features-title" className="heading text-[clamp(1.6rem,3vw,2.6rem)]">
              What the platform does
            </h2>
            <p className="max-w-[24rem] text-sm text-muted">Product capabilities, as shipped. My work is the API and web app that serve them; the desktop clients are a separate project.</p>
          </div>
          <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-[18px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {sv.features.map((f, i) => (
              <li key={f.title} className="flex flex-col gap-2 bg-surface p-6">
                <span className="font-mono text-[0.8125rem] text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[1.1875rem] font-semibold">{f.title}</h3>
                <p className="text-base text-muted">{f.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="eng-title" className="relative isolate mt-8 overflow-hidden bg-night text-night-ink md:mt-12">
        <ShotBackdrop src={sectionShot(p)?.src ?? heroShot(p)} />
        <Container className="grid grid-cols-1 gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-4">
            <Eyebrow className="text-night-muted">Engineering notes</Eyebrow>
            <h2 id="eng-title" className="heading text-[clamp(1.75rem,3.2vw,2.8rem)] leading-[1.1] text-white">
              A data model that survives people editing their time.
            </h2>
            <p className="text-night-muted">{sv.engineeringIntro}</p>
            {article && (
              <Link href={`/blog/${article.slug}`} className="inline-flex min-h-11 items-center font-semibold text-night-link hover:text-white">
                Read the full write-up →
              </Link>
            )}
          </div>
          <ol className="flex flex-col border-t border-night-rule">
            {sv.engineering.map((e, i) => (
              <li key={e.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-b border-night-rule py-5">
                <span className="font-mono text-night-link">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-semibold text-white">{e.title}</h3>
                  <p className="text-base text-night-muted">{e.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Gallery p={p} />

      <section aria-labelledby="outcome-title">
        <Container className="grid grid-cols-1 items-start gap-8 pt-10 pb-6 md:grid-cols-2 md:gap-12 md:pt-14">
          <div className="flex flex-col gap-3.5">
            <h2 id="outcome-title" className="heading text-[clamp(1.6rem,3vw,2.6rem)]">
              Outcome
            </h2>
            <p className="text-ink-2">{sv.outcome}</p>
          </div>
          <div className="flex flex-col gap-4 rounded-[20px] border border-rule bg-surface p-6 md:p-8">
            <h2 className="heading text-[1.5rem] md:text-[1.625rem]">Building a SaaS product?</h2>
            <p className="text-muted">I can take it from data model to deployed product, or step into an existing codebase and keep it shipping.</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact">Let&apos;s work together</ButtonLink>
              <ButtonLink href="/services/mern-stack-development" variant="ghost">
                MERN stack development
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
      <Related p={p} />
    </>
  );
}
