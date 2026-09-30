import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, EnvelopeSimple, Plus } from "@phosphor-icons/react/dist/ssr";
import {
  fmtRange,
  person,
  workProcess,
  projects,
  services,
  stack,
  stats,
  type Project,
  type Role,
} from "@/content/site";
import { StackIcon } from "./StackIcon";
import { ButtonLink, Container, SectionTitle } from "./ui";

// ---------- Stats and stack marquee (under the home hero) ----------

export function ProofStrip() {
  return (
    <section aria-label="Experience in numbers and tools" className="border-y border-rule bg-sheet">
      <Container className="grid grid-cols-1 items-center gap-8 py-10 md:grid-cols-12 md:gap-10">
        <dl className="grid grid-cols-3 gap-4 md:col-span-5">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-ink-2">{s.label}</dt>
              <dd className="heading tabular text-[clamp(2.25rem,4vw,3rem)]">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="marquee relative overflow-hidden md:col-span-7 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <p className="sr-only">Tools I work with: {stack.join(", ")}.</p>
          {/* Second copy makes the loop seamless; hidden from assistive tech. Under reduced motion only the first copy shows, wrapped. */}
          <div className="marquee-track flex w-max gap-2 motion-reduce:w-full motion-reduce:flex-wrap" aria-hidden>
            {[0, 1].map((copy) => (
              <ul key={copy} className={`flex gap-2 motion-reduce:flex-wrap ${copy ? "motion-reduce:hidden" : ""}`}>
                {stack.map((t) => (
                  <li key={t} className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border border-rule bg-bg px-3.5 text-sm font-medium">
                    <StackIcon tool={t} className="text-ink-2" />
                    {t}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ---------- Projects ----------

export function ProjectShot({ project, sizes, className = "", eager }: { project: Project; sizes: string; className?: string; eager?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-rule bg-sheet-2 ${className}`}>
      <Image
        src={project.image}
        alt={`${project.name} website home page, built by ${person.name}`}
        fill
        sizes={sizes}
        preload={eager}
        className="object-cover object-[left_top] transition-transform duration-700 ease-out-expo group-hover:scale-[1.025]"
      />
    </div>
  );
}

export function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Type of work">
      {items.map((c) => (
        <li key={c} className="rounded-lg border border-rule px-2.5 py-0.5 font-mono text-xs text-ink-2">
          {c}
        </li>
      ))}
    </ul>
  );
}

export function ProjectCard({ project, sizes, aspect = "aspect-[16/10]", headingLevel = 3 }: { project: Project; sizes: string; aspect?: string; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as const;
  return (
    <article className="reveal">
      <Link href={`/projects/${project.slug}`} className="group block">
        <ProjectShot project={project} sizes={sizes} className={aspect} />
        <div className="mt-5 flex items-start justify-between gap-4">
          <H className="text-xl font-semibold tracking-[-0.02em] group-hover:underline">{project.name}</H>
          <Tags items={project.categories} />
        </div>
        <p className="mt-2 max-w-[56ch] text-ink-2">{project.summary}</p>
      </Link>
    </article>
  );
}

/** Home page work section: the lead project as a wide case-study card, four more under it. */
export function SelectedWork() {
  const [lead, ...rest] = projects;
  return (
    <section aria-labelledby="work-title" className="py-24 md:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle id="work-title" className="max-w-[16ch]">
            Selected work, shipped and live.
          </SectionTitle>
          <ButtonLink href="/projects" variant="secondary">
            See projects
          </ButtonLink>
        </div>

        <article className="reveal mt-14 grid grid-cols-1 overflow-hidden rounded-xl border border-rule bg-sheet md:grid-cols-12">
          <Link href={`/projects/${lead.slug}`} className="group block p-3 md:col-span-7 md:p-4" tabIndex={-1} aria-hidden>
            <ProjectShot project={lead} sizes="(min-width: 768px) 55vw, 100vw" className="aspect-[16/10]" />
          </Link>
          <div className="flex flex-col p-7 md:col-span-5 md:p-10">
            <Tags items={[...lead.categories, lead.kind]} />
            <h3 className="heading mt-5 text-[clamp(1.75rem,3vw,2.5rem)]">
              <Link href={`/projects/${lead.slug}`} className="hover:underline">
                {lead.name}
              </Link>
            </h3>
            <p className="mt-4 text-lg text-ink-2">{lead.summary}</p>
            <ul className="mt-6 space-y-2.5">
              {lead.work.map((w) => (
                <li key={w} className="flex gap-3">
                  <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {w}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <Link href={`/projects/${lead.slug}`} className="font-semibold underline decoration-rule-strong underline-offset-[6px] hover:decoration-ink">
                Read the {lead.name} case study
              </Link>
            </div>
          </div>
        </article>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12">
          {rest.slice(0, 4).map((p, i) => (
            // Alternating wide-narrow, narrow-wide keeps the grid from reading as a template.
            <div key={p.slug} className={i === 0 || i === 3 ? "md:col-span-7" : "md:col-span-5"}>
              <ProjectCard project={p} sizes="(min-width: 768px) 50vw, 100vw" aspect={i === 0 || i === 3 ? "aspect-[16/10]" : "aspect-[16/10] md:aspect-[4/3.6]"} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ---------- Services ----------

/** Six services, six cells. MERN leads at 2x2; two cells carry real screenshots. */
export function ServicesBento({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const by = (slug: string) => services.find((s) => s.slug === slug)!;
  const H = `h${headingLevel + 1}` as "h2" | "h3";
  const mern = by("mern-stack-development");

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Link
        href={`/services/${mern.slug}`}
        className="reveal group relative flex flex-col overflow-hidden rounded-xl border border-rule bg-accent-soft p-7 md:col-span-2 md:p-10 lg:row-span-2"
      >
        <ul className="flex gap-4" aria-label="MERN stack">
          {(["MongoDB", "Express", "React", "Node.js"] as const).map((t) => (
            <li key={t} className="flex flex-col items-center gap-2">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-rule bg-bg">
                <StackIcon tool={t} size={26} />
              </span>
              <span className="font-mono text-[0.72rem] text-ink-2">{t}</span>
            </li>
          ))}
        </ul>
        <H className="heading mt-12 text-[clamp(2rem,3.6vw,3rem)]">{mern.name}</H>
        <p className="mt-4 max-w-[46ch] text-lg">{mern.short}</p>
        <p className="mt-3 max-w-[50ch] text-ink-2">{mern.intro[1]}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-10 font-semibold underline decoration-rule-strong underline-offset-[6px] group-hover:decoration-ink">
          MERN stack development
          <ArrowUpRight size={16} weight="bold" aria-hidden className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </Link>

      {(["nextjs-development", "react-development"] as const).map((slug) => (
        <ServiceCell key={slug} slug={slug} H={H} />
      ))}
      <ServiceCell slug="wordpress-development" H={H} image="/work/timbera.webp" />
      <ServiceCell slug="seo-services" H={H} image="/work/nw.webp" />
      <ServiceCell slug="ui-ux-design" H={H} />
    </div>
  );
}

function ServiceCell({ slug, H, image }: { slug: string; H: "h2" | "h3"; image?: string }) {
  const s = services.find((x) => x.slug === slug)!;
  return (
    <Link href={`/services/${s.slug}`} className="reveal group flex flex-col overflow-hidden rounded-xl border border-rule bg-sheet transition-colors hover:border-rule-strong">
      <div className="flex flex-1 flex-col p-7">
        <ul className="flex gap-2.5" aria-label="Tools">
          {s.tools.slice(0, 3).map((t) => (
            <li key={t} title={t}>
              <StackIcon tool={t} size={18} className="text-ink-2" />
              <span className="sr-only">{t}</span>
            </li>
          ))}
        </ul>
        <H className="mt-6 inline-flex items-center gap-1.5 text-[1.35rem] font-semibold tracking-[-0.02em]">
          {s.name}
          <ArrowUpRight size={17} weight="bold" aria-hidden className="text-ink-2 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
        </H>
        <p className="mt-2 text-ink-2">{s.short}</p>
      </div>
      {image && (
        <div className="relative mx-7 h-36 overflow-hidden rounded-t-lg border border-b-0 border-rule">
          <Image src={image} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw" className="object-cover object-[left_top] transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]" />
        </div>
      )}
    </Link>
  );
}

// ---------- Experience ----------

export function Timeline({ roles, detailed = false }: { roles: Role[]; detailed?: boolean }) {
  return (
    <ol className="mt-12">
      {[...roles].reverse().map((r) => (
        <li key={r.title + r.org} className="reveal grid grid-cols-1 gap-3 border-t border-rule py-9 md:grid-cols-12 md:gap-10">
          <p className="tabular pt-1 font-mono text-[0.8rem] text-ink-2 md:col-span-3">
            <time dateTime={`${r.start[0]}-${String(r.start[1]).padStart(2, "0")}`}>{fmtRange(r.start, r.end)}</time>
          </p>
          <div className="md:col-span-9">
            <h3 className="text-xl font-semibold tracking-[-0.02em]">
              {r.title} <span className="text-ink-2">at {r.org}</span>
            </h3>
            {detailed ? (
              <ul className="mt-4 max-w-[64ch] space-y-2.5">
                {r.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-[0.72em] h-px w-3 shrink-0 bg-accent-text" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 max-w-[64ch] text-ink-2">{r.points[0]}</p>
            )}
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Skills used">
              {r.tags.map((t) => (
                <li key={t} className="rounded-lg bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-text">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

// ---------- Process ----------

export function Process() {
  return (
    <section aria-labelledby="process-title" className="border-t border-rule py-24 md:py-28">
      <Container>
        <SectionTitle id="process-title" className="max-w-[18ch]">
          How a project runs.
        </SectionTitle>
        <ol className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
          {workProcess.map((p, i) => (
            <li key={p.name} className="reveal flex flex-col bg-sheet p-7">
              <span className="tabular font-mono text-sm text-accent-text" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-10 text-2xl font-semibold tracking-[-0.02em]">{p.name}</h3>
              <p className="mt-2 text-ink-2">{p.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

// ---------- FAQ ----------

export function Faq({ items, title = "Questions people ask first." }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <section aria-labelledby="faq-title" className="border-t border-rule py-24 md:py-32">
      <Container className="grid grid-cols-1 gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <SectionTitle id="faq-title" className="md:sticky md:top-[calc(var(--header-h)+2.5rem)]">
            {title}
          </SectionTitle>
        </div>
        <div className="border-b border-rule md:col-span-8">
          {items.map((f, i) => (
            <details key={f.q} className="group border-t border-rule" open={i === 0}>
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold transition-colors hover:text-accent-text [&::-webkit-details-marker]:hidden">
                <h3>{f.q}</h3>
                <Plus size={18} weight="bold" aria-hidden className="shrink-0 text-ink-2 transition-transform duration-300 ease-out-expo group-open:rotate-45" />
              </summary>
              <p className="max-w-[62ch] pb-7 text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ---------- Closing call to action ----------

export function CtaBand({ title = "Have a project or a role in mind?", body }: { title?: string; body?: string }) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-rule">
      <div aria-hidden className="spotlight pointer-events-none absolute inset-0 [--x:15%] [--y:100%]" />
      <Container className="relative py-24 md:py-32">
        <h2 id="cta-title" className="reveal display max-w-[16ch] text-[clamp(2.5rem,6vw,5rem)]">
          {title}
        </h2>
        <p className="reveal mt-6 max-w-[52ch] text-lg text-ink-2 md:text-xl">
          {body ?? "Tell me what you're building, your timeline and your budget, and I'll reply with next steps."}
        </p>
        <div className="reveal mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <ButtonLink href="/contact">Hire me</ButtonLink>
          <a href={`mailto:${person.email}`} className="inline-flex items-center gap-2 font-medium text-ink-2 transition-colors hover:text-ink">
            <EnvelopeSimple size={18} aria-hidden />
            {person.email}
          </a>
        </div>
      </Container>
    </section>
  );
}
