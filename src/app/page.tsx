import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import {
  careerTrack,
  dailyStack,
  education,
  fmtRange,
  heroShot,
  host,
  mobileShot,
  person,
  projectBySlug,
  projectOneLiners,
  sectionShot,
  projects,
  roles,
  skillMap,
  staffvertexStory as sv,
  stats,
  workProcess,
} from "@/content/site";
import { postBySlug } from "@/content/blog";
import { JsonLd, pageMetadata, personNode, webPageNode } from "@/lib/seo";
import { AvailableBadge, BrowserFrame, ButtonLink, Container, Eyebrow, SectionHead } from "@/components/ui";
import { ContactLinks, ResumeAction, RoleList } from "@/components/sections";
import { StackIcon } from "@/components/StackIcon";
import { PostTextCard } from "@/components/blog-ui";
import { Backdrop, ShotBackdrop } from "@/components/backdrops";
import { IconTile, offeringIcons, skillIcons } from "@/components/icons";
import { ContactForm } from "@/components/ContactForm";

const title = `${person.name} | MERN Stack Developer in ${person.country}`;
const description = `Hire ${person.name}, a MERN stack and Next.js developer in ${person.city}. I build complete web products: APIs, React interfaces and SaaS like Staffvertex. 20+ projects shipped.`;

export const metadata = pageMetadata({
  title,
  description,
  path: "/",
  absoluteTitle: true,
  keywords: ["MERN stack developer", "MERN stack developer Pakistan", "MERN stack developer Islamabad", "hire MERN stack developer", "full stack Next.js developer", "freelance full stack developer"],
});

// Home-page framing of the services: written around outcomes rather than technologies.
const offerings = [
  { title: "Full-stack web applications", body: "From the data model and API to the interface and deployment. You get a working product, not a hand-off between three teams.", tools: "Next.js · React · Node.js · MongoDB", href: "/services/mern-stack-development" },
  { title: "SaaS product development", body: "Multi-user products with accounts, roles, teams, projects and reporting. The kind of product I build and maintain every day on Staffvertex.", tools: "Multi-tenant · Roles · Dashboards", href: "/projects/staffvertex" },
  { title: "React & Next.js front ends", body: "Server-rendered pages that load fast and rank, and component systems that stay consistent as your feature list grows.", tools: "Next.js · React · Tailwind CSS", href: "/services/nextjs-development" },
  { title: "APIs & back-end development", body: "Node.js and Express APIs with validation, authentication and clear errors, ready for your web app and any future mobile app.", tools: "Node.js · Express · REST", href: "/services/mern-stack-development" },
  { title: "Dashboards & internal tools", body: "Tables, timesheets and reports that turn your data into decisions, with loading, empty and error states handled properly.", tools: "React · Data viz · Reports", href: "/services/react-development" },
  { title: "Improving an existing app", body: "I run your codebase, fix what is blocking you, make it faster, then keep shipping features. Good for inherited or stalled projects.", tools: "Audits · Performance · Refactors", href: "/contact" },
];

const trackShades = ["bg-[#d5dae3] dark:bg-[#2b364c]", "bg-[#bcc4d2] dark:bg-[#3a4660]", "bg-[#9aa5b9] dark:bg-[#56637f]", "bg-[#6a7be6]", "bg-accent"];

export default function Home() {
  const staffvertex = projectBySlug("staffvertex")!;
  const svMobile = mobileShot(staffvertex)!;
  const svSection = sectionShot(staffvertex)?.src ?? heroShot(staffvertex);
  const timbera = projectBySlug("timbera")!;
  const carports = projectBySlug("carports-hawaii")!;
  const index = projects.filter((p) => p.slug in projectOneLiners);
  const posts = ["build-time-tracking-app-like-hubstaff", "hire-mern-stack-developer", "contractor-website-instant-quote-form"].map((s) => postBySlug(s)!);

  return (
    <>
      <JsonLd
        nodes={[
          webPageNode({
            path: "/",
            name: title,
            description,
            image: person.portrait,
            extra: { about: { "@id": personNode["@id"] } },
          }),
        ]}
      />

      {/* ===== Hero ===== */}
      <section aria-labelledby="hero-title" className="relative isolate">
        <Backdrop pattern="grid" mask="radial" glows={[{ className: "-top-32 right-[-10%] h-[38rem] w-[38rem]" }, { className: "bottom-[-20%] left-[-15%] h-[30rem] w-[30rem] opacity-70" }]} />
        <Container className="grid grid-cols-1 items-center gap-10 pt-10 pb-14 md:pt-16 lg:grid-cols-2 lg:gap-16 lg:pt-[5.5rem] lg:pb-[4.5rem]">
          <div className="flex flex-col gap-6 md:gap-7">
            <p className="rise flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.75rem] tracking-[0.04em] text-muted uppercase md:text-[0.8125rem]">
              <span>MERN stack developer</span>
              <span aria-hidden className="text-ghost">/</span>
              <span>React · Next.js · Node.js</span>
              <span aria-hidden className="text-ghost">/</span>
              <span>
                {person.city}, remote
              </span>
            </p>
            <h1 id="hero-title" className="rise display text-[clamp(2.1rem,5.4vw,4.6rem)] tracking-[-0.035em]" style={{ "--i": 1 } as React.CSSProperties}>
              I build complete web products, from the API to the <span className="text-accent-ink">last pixel.</span>
            </h1>
            <p className="rise max-w-[34em] text-lg leading-[1.65] text-muted md:text-[1.1875rem]" style={{ "--i": 2 } as React.CSSProperties}>
              I&apos;m Osama, a full-stack Next.js developer at {person.employer}. I build and maintain{" "}
              <Link href="/projects/staffvertex" className="font-semibold text-ink hover:text-accent-ink">
                Staffvertex
              </Link>
              , a multi-tenant time-tracking and project management SaaS: its backend APIs, the web app teams use every day, and every release since.
            </p>
            <div className="rise flex flex-wrap items-center gap-x-2.5 gap-y-3" style={{ "--i": 3 } as React.CSSProperties}>
              <ButtonLink href="#work">
                View my work <ArrowRight size={18} weight="bold" aria-hidden />
              </ButtonLink>
              <ResumeAction variant="ghost" />
              <Link href="/contact" className="inline-flex min-h-12 items-center px-1.5 font-semibold text-accent-ink hover:underline">
                Let&apos;s work together
              </Link>
            </div>
            <div className="rise mt-1 flex flex-wrap items-center gap-x-4.5 gap-y-3 border-t border-rule pt-4" style={{ "--i": 4 } as React.CSSProperties}>
              <span className="font-mono text-xs tracking-[0.04em] text-muted">DAILY STACK</span>
              <ul className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Daily stack">
                {dailyStack.map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-2">
                    <StackIcon tool={t} size={16} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Profile panel, with two floating cards that preview the stack and the work */}
          <div className="relative">
            <div aria-hidden className="float-slow absolute top-full right-6 z-10 mt-4 hidden items-center gap-2 rounded-xl border border-rule bg-surface px-3 py-2 shadow-[0_18px_40px_-20px_var(--shadow)] sm:flex">
              {dailyStack.slice(0, 4).map((t) => (
                <StackIcon key={t} tool={t} size={18} className="text-ink-2" />
              ))}
              <span className="ml-1 font-mono text-[0.6875rem] text-muted">DAILY</span>
            </div>
            <Link
              href="/projects/staffvertex"
              aria-label="Staffvertex case study"
              className="float absolute bottom-full left-6 z-10 mb-4 hidden w-60 items-center gap-3 rounded-2xl border border-rule bg-surface p-2.5 pr-3.5 shadow-[0_24px_50px_-24px_var(--shadow)] xl:flex"
            >
              <span className="relative h-12 w-[4.5rem] shrink-0 overflow-hidden rounded-lg bg-night">
                <Image src={heroShot(staffvertex)} alt="" fill sizes="72px" className="object-cover object-top" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-ink">Staffvertex</span>
                <span className="block truncate text-xs text-muted">Live SaaS · APIs + web app</span>
              </span>
            </Link>
          <aside aria-label="Profile summary" className="rise relative overflow-hidden rounded-[22px] border border-rule bg-surface shadow-[0_1px_0_rgb(12_18_34/0.04),0_24px_60px_-30px_var(--shadow)]" style={{ "--i": 2 } as React.CSSProperties}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sunken px-5 py-3.5 font-mono text-xs text-muted">
              <span>profile / osama-khattak</span>
              <AvailableBadge pulse className="text-xs">
                Open to freelance &amp; remote roles
              </AvailableBadge>
            </div>
            <div className="flex flex-wrap items-center gap-5 p-6 md:p-7">
              <Image src={person.portrait} alt={`Portrait of ${person.name}`} width={112} height={112} preload sizes="112px" className="h-24 w-24 rounded-[18px] bg-shot object-cover md:h-28 md:w-28" />
              <div className="flex min-w-0 flex-col gap-1">
                <span className="font-display text-2xl font-semibold tracking-[-0.02em]">{person.fullName}</span>
                <span className="text-[0.9375rem] text-muted">
                  {person.currentTitle}
                  <br />
                  {person.employer} · since {person.employerSince}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3.5 px-6 pb-6 md:px-7 md:pb-7">
              <div className="flex justify-between font-mono text-xs text-muted">
                <span>CAREER TRACK</span>
                <span>{person.since} → NOW</span>
              </div>
              <div role="img" aria-label="Career timeline: SEO and WordPress in 2021, HTML and CSS in 2022, React at CareerBooster.ai from 2023 to 2024, full-stack Next.js at Alphinex Solutions from 2024 to now" className="flex h-3.5 gap-[3px]">
                {careerTrack.map((c, i) => (
                  <span key={c.label} className={`rounded-[2px] first:rounded-l-[4px] last:rounded-r-[4px] ${trackShades[i]}`} style={{ flex: `${c.weight} 1 0` }} />
                ))}
              </div>
              <ul className="grid grid-cols-2 gap-x-5 gap-y-2.5 text-[0.8125rem] text-muted">
                {[
                  ["SEO & WordPress, 2021", 1],
                  ["HTML, CSS, Bootstrap, 2022", 2],
                  ["React, CareerBooster.ai", 3],
                  ["Full stack, Alphinex", 4],
                ].map(([label, i]) => (
                  <li key={label} className="flex items-center gap-2">
                    <span aria-hidden className={`h-2.5 w-2.5 shrink-0 rounded-[3px] ${trackShades[i as number]}`} />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <dl className="grid grid-cols-3 border-t border-sunken">
              {stats.map((s, i) => (
                <div key={s.label} className={`flex flex-col-reverse px-4 py-4 md:px-5 ${i < 2 ? "border-r border-sunken" : ""}`}>
                  <dt className="text-[0.8125rem] text-muted lowercase">{s.label}</dt>
                  <dd className="font-display text-[1.75rem] font-semibold tracking-[-0.02em]">{s.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
          </div>
        </Container>
      </section>

      {/* ===== Featured: Staffvertex ===== */}
      <section id="work" aria-labelledby="work-title" className="relative isolate overflow-hidden bg-night text-night-ink">
        <ShotBackdrop src={svSection} />
        <Container className="flex flex-col gap-10 py-16 md:gap-14 md:py-[6.5rem]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead id="work-title" night eyebrow="01 / Featured product" className="max-w-[47.5rem]" title="Staffvertex: time tracking and project management for teams that bill by the hour." />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/projects/staffvertex" variant="white">
                Read the case study
              </ButtonLink>
              <ButtonLink href={staffvertex.href} variant="night" external>
                {host(staffvertex.href)} <ArrowUpRight size={16} weight="bold" aria-hidden />
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="group relative pr-10 pb-10 sm:pr-16 sm:pb-12">
              <div className="overflow-hidden rounded-[14px] border border-night-rule shadow-[0_40px_80px_-40px_rgb(0_0_0/0.7)] transition-transform duration-300 group-hover:-translate-y-1.5">
                <BrowserFrame url="staffvertex.com" night className="rounded-none border-0">
                  <div className="relative aspect-[16/10]">
                    <Image src={heroShot(staffvertex)} alt="Staffvertex home page on desktop: start the timer in one click, free to start" fill sizes="(min-width: 1024px) 520px, 90vw" className="object-cover object-top" />
                  </div>
                </BrowserFrame>
              </div>
              <div className="absolute right-0 bottom-0 w-[30%] max-w-[190px] rounded-[22px] border border-night-rule bg-night-3 p-1.5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]">
                <div className="relative aspect-[9/19] overflow-hidden rounded-[17px]">
                  <Image src={svMobile.src} alt="Staffvertex home page on a phone" fill sizes="190px" className="object-cover object-top" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <h3 className="eyebrow text-night-muted">The problem</h3>
                <p className="text-lg text-night-ink">{sv.homeProblem}</p>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="eyebrow text-night-muted">My role</h3>
                <ul className="flex flex-col gap-2.5">
                  {sv.homeRole.map((r) => (
                    <li key={r} className="flex gap-3">
                      <span aria-hidden className="font-mono text-night-link">→</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-night-rule bg-night-rule sm:grid-cols-2">
                  {sv.features
                    .filter((f) => f.short)
                    .map((f) => (
                      <li key={f.title} className="bg-night-2 px-4.5 py-4">
                        <p className="text-[0.9375rem] font-semibold text-white">{f.title}</p>
                        <p className="text-sm text-night-muted">{f.short}</p>
                      </li>
                    ))}
                </ul>
                <p className="mt-3 text-[0.8125rem] text-night-muted">Product capabilities of Staffvertex. My part: the API and web app behind them.</p>
              </div>
              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {sv.tags.map((t) => (
                  <li key={t} className="rounded-lg bg-night-3 px-2.5 py-1.5 font-mono text-xs text-night-ink">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== Client work ===== */}
      <section aria-labelledby="client-work-title" className="relative isolate">
        <Backdrop pattern="dots" mask="top" className="h-[30rem]" />
        <Container className="flex flex-col gap-10 pt-16 pb-6 md:gap-12 md:pt-[6.5rem] md:pb-10">
          <SectionHead
            id="client-work-title"
            eyebrow="02 / Client work"
            title="Live sites for real businesses."
            lede="Stores, lead-generation sites and publications, each built around the one thing the business needs visitors to do."
          />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
            {[
              { p: timbera, tag: "Ecommerce · WooCommerce", body: "An Islamabad furniture store selling across Pakistan. I built the store, its catalogue and a custom responsive storefront with price, colour and fabric filters, wishlist and checkout.", alt: "Timbera.pk furniture storefront on desktop" },
              { p: carports, tag: "Contractor · Lead gen", body: "A site for an aluminium carport and patio-cover installer. I added an instant-quote form: enter width and length, see square footage and a price range, and request a quote in one step.", alt: "Carports Hawaii home page with the offer and call to action above the fold" },
            ].map(({ p, tag, body, alt }) => {
              const phone = p.slug === "timbera" ? mobileShot(p) : undefined;
              return (
                <article key={p.slug} className="group flex flex-col gap-5">
                  <div className="relative overflow-hidden rounded-[18px] bg-shot px-5 pt-5 sm:px-7 sm:pt-7">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-t-[10px] shadow-[0_20px_40px_-20px_var(--shadow)] transition-transform duration-300 group-hover:-translate-y-1.5">
                      <Image src={heroShot(p)} alt={alt} fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover object-top" />
                    </div>
                    {phone && (
                      <div className="absolute right-5 bottom-0 aspect-[9/17] w-[22%] overflow-hidden rounded-t-xl border-[5px] border-b-0 border-[#0c1222]">
                        <Image src={phone.src} alt={`${p.name} storefront on a phone`} fill sizes="120px" className="object-cover object-top" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="heading text-[1.625rem]">{p.name}</h3>
                      <span className="font-mono text-xs text-muted uppercase">{tag}</span>
                    </div>
                    <p className="text-muted">{body}</p>
                    <div className="flex flex-wrap gap-x-6">
                      <Link href={`/projects/${p.slug}`} className="inline-flex min-h-11 items-center font-semibold text-accent-ink hover:underline">
                        Read the case study →
                      </Link>
                      <a href={p.href} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-2 font-semibold text-muted hover:text-ink">
                        {host(p.href)} <ArrowUpRight size={16} weight="bold" aria-hidden />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Project index */}
          <div>
            <div className="hidden grid-cols-[1.1fr_1fr_1.6fr_150px] gap-6 border-b border-rule-2 px-5 py-3 font-mono text-xs tracking-[0.05em] text-muted md:grid" aria-hidden>
              <span className="pl-[4.25rem]">PROJECT</span>
              <span>TYPE</span>
              <span>WHAT I DID</span>
              <span className="text-right">LINK</span>
            </div>
            <ul>
              {index.map((p) => (
                <li key={p.slug} className="grid grid-cols-1 items-center gap-x-6 gap-y-1 rounded-[10px] border-b border-rule px-2 py-4 transition-colors hover:bg-surface md:grid-cols-[1.1fr_1fr_1.6fr_150px] md:px-5 md:py-5">
                  <Link href={`/projects/${p.slug}`} className="group flex items-center gap-3.5 font-display text-[1.25rem] font-semibold tracking-[-0.01em] text-ink">
                    <span aria-hidden className="relative aspect-[16/10] w-16 shrink-0 overflow-hidden rounded-md border border-rule bg-shot md:w-14">
                      <Image src={heroShot(p)} alt="" fill sizes="64px" className="object-cover object-top transition-transform duration-300 group-hover:scale-110" />
                    </span>
                    <span className="underline decoration-rule-2 underline-offset-[5px] group-hover:decoration-accent">{p.name}</span>
                  </Link>
                  <span className="text-[0.9375rem] text-muted">{p.kind}</span>
                  <span className="text-[0.9375rem] text-ink-2">{projectOneLiners[p.slug]}</span>
                  {p.offline ? (
                    <span className="font-mono text-[0.8125rem] text-muted md:justify-self-end">site offline</span>
                  ) : (
                    <a href={p.href} target="_blank" rel="noopener" aria-label={`Visit ${p.name} (opens ${host(p.href)})`} className="group inline-flex min-h-10 items-center gap-1.5 text-[0.9375rem] font-semibold text-accent-ink md:justify-self-end">
                      {host(p.href)}
                      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <Link href="/projects" className="mt-6 inline-flex min-h-11 items-center font-semibold text-accent-ink hover:underline">
              All {projects.length} projects →
            </Link>
          </div>
        </Container>
      </section>

      {/* ===== Services ===== */}
      <section id="services" aria-labelledby="services-title">
        <Container className="grid grid-cols-1 items-start gap-10 py-16 md:py-[6.5rem] lg:grid-cols-3 lg:gap-14">
          <div className="flex flex-col gap-4.5 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <SectionHead
              id="services-title"
              eyebrow="03 / Services"
              title="One developer for the whole product."
              lede="You talk to the person who designs the data, writes the API and builds the interface, so nothing gets lost between teams."
            />
            <ol className="mt-2 flex flex-col border-l-2 border-rule">
              {workProcess.map((s) => (
                <li key={s.name} className="py-2 pl-4.5 text-[0.9375rem]">
                  <strong className="font-semibold">{s.name}.</strong> <span className="text-muted">{shortProcess[s.name]}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex min-w-0 flex-col lg:col-span-2">
            <ul>
              {offerings.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 border-t border-rule py-6 md:grid-cols-[3.5rem_minmax(0,1fr)] md:gap-5 md:py-7">
                  <div className="flex flex-col items-start gap-2 pt-0.5">
                    <IconTile icon={offeringIcons[i]} />
                    <span className="font-mono text-xs text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="heading text-[1.375rem] md:text-2xl">
                      <Link href={s.href} className="hover:text-accent-ink">
                        {s.title}
                      </Link>
                    </h3>
                    <p className="text-muted">{s.body}</p>
                    <span className="font-mono text-xs text-muted uppercase">{s.tools}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-[14px] bg-accent-soft p-5 text-[0.9375rem] text-accent-soft-ink md:p-6">
              <span>
                <strong className="font-semibold">Also available:</strong> WordPress &amp; WooCommerce builds, technical SEO, Figma UI design.
              </span>
              <Link href="/services" className="inline-flex min-h-11 items-center font-semibold hover:underline">
                See all services →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== Skills ===== */}
      <section id="skills" aria-labelledby="skills-title" className="relative isolate border-y border-rule bg-surface">
        <Backdrop pattern="dots" mask="right" glows={[{ className: "-top-24 -left-24 h-[26rem] w-[26rem] opacity-60" }]} />
        <Container className="flex flex-col gap-10 py-16 md:gap-12 md:py-[6.5rem]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead id="skills-title" eyebrow="04 / Skills" title="The tools I ship with." className="max-w-[44rem]" />
            <p className="max-w-[26rem] text-base text-muted">Grouped by where they sit in a product. Highlighted tools are the ones I use daily on production work.</p>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[18px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {skillMap.map((g) => (
              <div key={g.name} className="flex flex-col gap-4 bg-surface p-6 md:p-7">
                <div className="flex items-start gap-3.5">
                  <IconTile icon={skillIcons[g.name]} />
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display text-xl font-semibold tracking-[-0.01em]">{g.name}</h3>
                    <p className="text-sm text-muted">{g.note}</p>
                  </div>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li
                      key={it.label}
                      className={`inline-flex items-center gap-1.5 rounded-[9px] border px-3 py-1.5 text-sm font-medium ${
                        it.core ? "border-chip-rule bg-chip text-accent-soft-ink" : "border-rule bg-bg text-ink-2"
                      }`}
                    >
                      {it.tool && <StackIcon tool={it.tool} size={15} />}
                      {it.label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Experience ===== */}
      <section id="experience" aria-labelledby="exp-title" className="relative isolate">
        <Backdrop pattern="grid" mask="top" className="h-[26rem]" />
        <Container className="grid grid-cols-1 items-start gap-10 py-16 md:py-[6.5rem] lg:grid-cols-3 lg:gap-14">
          <div className="flex flex-col gap-4.5">
            <SectionHead
              id="exp-title"
              eyebrow="05 / Experience"
              title="From search rankings to full products."
              lede="I started in SEO, moved through WordPress and front-end builds, and now own full-stack Next.js products. That path is why my sites are fast, findable and built to convert."
            />
            <div id="resume" className="mt-3 flex flex-col gap-3.5 rounded-[18px] border border-rule bg-surface p-6">
              <div className="flex items-center gap-3.5">
                <span aria-hidden className="inline-flex h-13 w-11 items-center justify-center rounded-lg bg-accent-soft font-mono text-[0.6875rem] font-medium text-accent-ink">
                  PDF
                </span>
                <div>
                  <p className="font-semibold">Résumé, {person.fullName}</p>
                  <p className="text-sm text-muted">One page · experience, skills, education</p>
                </div>
              </div>
              <ResumeAction />
            </div>
          </div>
          <ol className="min-w-0 lg:col-span-2">
            <RoleList roles={roles} limit={2} />
            <li className="grid grid-cols-1 gap-x-8 gap-y-2 border-t border-rule py-6 sm:grid-cols-3 md:py-7">
              <span className="font-mono text-[0.8125rem] text-muted">{fmtRange(education.start, education.end)}</span>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.015em] md:text-[1.375rem]">
                  {education.title} <span className="font-medium text-muted">· {education.org} Islamabad</span>
                </h3>
                <p className="text-base text-muted">Studying alongside full-time work.</p>
              </div>
            </li>
          </ol>
        </Container>
      </section>

      {/* ===== Writing ===== */}
      <section id="writing" aria-labelledby="writing-title" className="border-y border-rule bg-surface">
        <Container className="flex flex-col gap-9 py-16 md:gap-10 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead id="writing-title" eyebrow="06 / Writing" title="Notes from the work." />
            <Link href="/blog" className="inline-flex min-h-11 items-center font-semibold text-accent-ink hover:underline">
              All articles →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <PostTextCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Contact ===== */}
      <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden">
        <Backdrop pattern="grid" mask="radial" glows={[{ className: "top-1/4 right-[-10%] h-[34rem] w-[34rem]" }]} />
        <Container className="grid grid-cols-1 items-start gap-10 py-16 md:py-[6.5rem] lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-5">
            <Eyebrow>07 / Contact</Eyebrow>
            <h2 id="contact-title" className="display text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.04] tracking-[-0.035em]">
              Have a product to build? <span className="text-accent-ink">Let&apos;s talk.</span>
            </h2>
            <p className="max-w-[30em] text-lg text-muted">Freelance projects and full-time remote roles both welcome. Tell me what you&apos;re building and I&apos;ll reply personally.</p>
            <div className="flex items-center gap-3.5 self-start rounded-2xl border border-rule bg-surface p-3 pr-5">
              <Image src={person.portrait} alt="" width={52} height={52} sizes="52px" className="h-13 w-13 rounded-xl object-cover" />
              <span className="text-sm leading-snug">
                <span className="block font-semibold text-ink">{person.fullName}</span>
                <span className="text-muted">Reads and answers every message</span>
              </span>
            </div>
            <div className="mt-2">
              <ContactLinks />
            </div>
            <p className="text-sm text-muted">
              Based in {person.city}, {person.country} ({person.timezone}). Working with clients worldwide over Zoom, Trello and GitHub.
            </p>
          </div>
          <div className="rounded-[22px] border border-rule bg-surface p-6 shadow-[0_24px_60px_-36px_var(--shadow)] md:p-10">
            <ContactForm title="Start a conversation" headingLevel={3} />
          </div>
        </Container>
      </section>
    </>
  );
}

const shortProcess: Record<string, string> = {
  Plan: "Goal, scope, timeline and cost agreed in writing.",
  Design: "Key screens in Figma, approved before code.",
  Build: "Small milestones, shared on Zoom, Trello and GitHub.",
  Launch: "Deploy, speed and SEO checks, then support.",
};
