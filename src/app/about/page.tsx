import Image from "next/image";
import Link from "next/link";
import { careerTrack, education, fmtRange, isoDateTime, person, roles, skillGroups, stats } from "@/content/site";
import { JsonLd, breadcrumbNode, pageMetadata, personNode, webPageNode } from "@/lib/seo";
import { AvailableBadge, Breadcrumbs, ButtonLink, Container, CtaPanel, SectionHead } from "@/components/ui";
import { ResumeAction } from "@/components/sections";
import { Backdrop, ProjectReel, ShotBackdrop } from "@/components/backdrops";
import { IconTile } from "@/components/icons";
import { Browser, HardDrives, PenNib } from "@phosphor-icons/react/dist/ssr";

const path = "/about";
const crumbs = [{ name: "About", path }];
const description = `About ${person.name} (${person.fullName}), a MERN stack and Next.js developer in ${person.city}, ${person.country}. Experience, skills and education since ${person.since}.`;

export const metadata = pageMetadata({
  title: `About ${person.name} | ${person.role}`,
  absoluteTitle: true,
  description,
  path,
  type: "profile",
  keywords: [`${person.name}`, person.fullName, "MERN stack developer resume", "full stack developer experience", "Next.js developer Islamabad"],
});

const trackShades = ["bg-[#3a4560]", "bg-[#4e5b7a]", "bg-[#6b7896]", "bg-[#6a7be6]", "bg-night-link"];

export default function About() {
  const timeline = [
    ...[...roles].reverse().map((r) => ({ dates: fmtRange(r.start, r.end), title: r.title, org: r.org, points: r.points, now: r.end === "now" })),
    { dates: fmtRange(education.start, education.end), title: education.title, org: `${education.org} Islamabad`, points: ["Studying alongside full-time work."], now: false },
  ];

  return (
    <>
      <JsonLd
        nodes={[
          webPageNode({
            path,
            name: `About ${person.name}`,
            description,
            type: "ProfilePage",
            crumbs,
            image: person.portrait,
            extra: { mainEntity: { "@id": personNode["@id"] }, dateCreated: isoDateTime("2026-09-30") },
          }),
          breadcrumbNode(path, crumbs),
        ]}
      />

      {/* Hero */}
      <section aria-labelledby="about-title" className="relative isolate overflow-hidden">
        <Backdrop pattern="grid" mask="radial" glows={[{ className: "top-0 right-[-8%] h-[36rem] w-[36rem]" }]} />
        <Container className="grid grid-cols-1 items-end gap-10 pt-10 pb-14 md:grid-cols-2 md:gap-16 md:pt-14 md:pb-20">
          <div className="flex flex-col gap-6">
            <Breadcrumbs crumbs={crumbs} />
            <h1 id="about-title" className="rise display text-[clamp(2.4rem,6vw,5rem)] leading-none">
              About{" "}
              <br />
              {person.name}.
            </h1>
            <p className="rise max-w-[30em] text-lg leading-[1.55] text-muted md:text-[1.3125rem]" style={{ "--i": 1 } as React.CSSProperties}>
              I&apos;m a full-stack developer in {person.city}, {person.country}. I&apos;ve spent every year since {person.since} on a different layer of the web, and now I build whole products.
            </p>
            <div className="rise flex flex-wrap gap-3" style={{ "--i": 2 } as React.CSSProperties}>
              <ResumeAction />
              <ButtonLink href="/contact" variant="ghost">
                Let&apos;s work together
              </ButtonLink>
            </div>
          </div>
          <figure className="relative w-full max-w-[460px] justify-self-center md:justify-self-end">
            <div aria-hidden className="pattern-dots absolute -top-6 -right-6 -z-10 h-40 w-40 rounded-3xl" />
            <div aria-hidden className="absolute -bottom-5 -left-5 -z-10 h-32 w-32 rounded-3xl bg-accent-soft" />
            <Image src={person.portrait} alt={`Portrait of ${person.name}`} width={560} height={560} preload sizes="(min-width: 768px) 460px, 90vw" className="aspect-square w-full rounded-3xl bg-shot object-cover" />
            <figcaption className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-3 rounded-[14px] bg-white/95 px-4.5 py-3.5 text-[#0c1222] md:inset-x-5 md:bottom-5">
              <span>
                <span className="block font-semibold">{person.fullName}</span>
                <span className="text-sm text-[#4a5468]">
                  {person.city}, {person.country} · {person.timezone}
                </span>
              </span>
              <AvailableBadge className="bg-[#fff4e2]! text-[#6b4100]!">Available</AvailableBadge>
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* Facts */}
      <section aria-label="Quick facts">
        <Container>
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-[18px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Now", `${person.currentTitle}, ${person.employer}`],
              ["Core stack", "MongoDB, Express, React, Node.js, Next.js"],
              ["Studying", `${education.title}, ${education.org} Islamabad`],
              ["Open to", "Freelance projects and full-time remote roles"],
            ].map(([k, v]) => (
              <div key={k} className="bg-surface px-6 py-5">
                <dt className="font-mono text-xs tracking-[0.05em] text-muted uppercase">{k}</dt>
                <dd className="mt-1.5 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Story */}
      <section aria-labelledby="story-title">
        <Container className="grid grid-cols-1 gap-8 py-16 md:py-[6.5rem] lg:grid-cols-3 lg:gap-14">
          <SectionHead id="story-title" eyebrow="My story" title="Every layer of the web, one at a time." size="md" />
          <div className="flex max-w-[40em] flex-col gap-5 text-lg leading-[1.7] text-ink-2 md:text-[1.1875rem] lg:col-span-2 [&_strong]:font-semibold [&_strong]:text-ink">
            <p>
              My full name is <strong>{person.fullName}</strong>; online I go by {person.name}. I started in {person.since} as an <strong>SEO specialist</strong>, getting client sites onto the first page of Google. That taught me what makes a site fast, readable and easy to find, which still shapes every build.
            </p>
            <p>
              From there I moved to <strong>WordPress</strong> and hand-coded HTML, CSS and Bootstrap sites, then spent almost two years as the <strong>React front-end developer at CareerBooster.ai</strong>, turning a growing product into a set of reusable components.
            </p>
            <p>
              Today I&apos;m a <strong>{person.currentTitle} at {person.employer}</strong>, where I lead full-stack work and own projects on my own, from design to release. That includes Staffvertex, our time-tracking SaaS. My core stack is <strong>MongoDB, Express, React and Node.js</strong>, with Next.js whenever public pages need to rank.
            </p>
            <p>
              Alongside work I&apos;m studying for a <strong>BS in Software Engineering at SZABIST Islamabad</strong>. I take on freelance projects for clients worldwide and I&apos;m open to full-time remote roles.
            </p>
          </div>
        </Container>
      </section>

      {/* Work across every layer */}
      <section aria-labelledby="shipped-title" className="pb-16 md:pb-24">
        <Container className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2 id="shipped-title" className="heading text-[clamp(1.5rem,2.6vw,2.2rem)]">
            Things I&apos;ve shipped
          </h2>
          <Link href="/projects" className="inline-flex min-h-11 items-center font-semibold text-accent-ink hover:underline">
            All work →
          </Link>
        </Container>
        <ProjectReel />
      </section>

      {/* Stats + track */}
      <section aria-label="Career at a glance" className="relative isolate overflow-hidden bg-night text-night-ink">
        <ShotBackdrop src="/work/staffvertex/home.webp" />
        <Container className="flex flex-col gap-10 py-16 md:gap-12 md:py-[5.5rem]">
          <dl className="grid grid-cols-3 gap-6 md:gap-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-2 text-sm text-night-muted md:text-base">{s.label.toLowerCase()}</dt>
                <dd className="font-display text-[clamp(2.4rem,6vw,4rem)] leading-none font-semibold tracking-[-0.04em] text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-3.5">
            <div role="img" aria-label="Career track from 2021 to now: SEO, WordPress, HTML and CSS, React at CareerBooster.ai, full-stack Next.js at Alphinex Solutions" className="flex h-4.5 gap-1">
              {careerTrack.map((c, i) => (
                <span key={c.label} className={`rounded-[2px] first:rounded-l-[5px] last:rounded-r-[5px] ${trackShades[i]}`} style={{ flex: `${c.weight} 1 0` }} />
              ))}
            </div>
            <div className="flex flex-wrap justify-between gap-2 font-mono text-xs text-night-muted" aria-hidden>
              <span>2021 SEO</span>
              <span>WordPress</span>
              <span>2022 HTML/CSS</span>
              <span>2023 React</span>
              <span>2024 Full stack</span>
              <span>NOW</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Experience */}
      <section aria-labelledby="exp-title">
        <Container className="grid grid-cols-1 items-start gap-10 pt-16 pb-8 md:pt-[6.5rem] md:pb-12 lg:grid-cols-3 lg:gap-14">
          <div className="flex flex-col gap-3.5">
            <SectionHead id="exp-title" eyebrow="Experience" title="Where I've worked." size="md" />
            <div id="resume" className="mt-4 flex flex-col gap-3 rounded-[18px] border border-rule bg-surface p-5.5">
              <p className="font-semibold">Prefer a one-pager?</p>
              <ResumeAction label="Download résumé (PDF)" />
            </div>
          </div>
          <ol className="min-w-0 lg:col-span-2">
            {timeline.map((r) => (
              <li key={r.title + r.org} className="grid grid-cols-[22px_minmax(0,1fr)] gap-4 md:gap-5">
                <div className="flex flex-col items-center" aria-hidden>
                  {r.now ? (
                    <span className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full bg-accent shadow-[0_0_0_5px_var(--accent-soft)]" />
                  ) : (
                    <span className="mt-[7px] h-3 w-3 shrink-0 rounded-full border-2 border-[#9aa5b9] bg-surface" />
                  )}
                  <span className="w-0.5 flex-1 bg-rule" />
                </div>
                <div className="flex flex-col gap-2 pb-9 md:pb-10">
                  <span className="font-mono text-[0.8125rem] text-muted">{r.dates}</span>
                  <h3 className="font-display text-[1.3125rem] font-semibold tracking-[-0.015em] md:text-[1.4375rem]">
                    {r.title} <span className="font-medium text-muted">· {r.org}</span>
                  </h3>
                  <ul className="flex list-disc flex-col gap-1.5 pl-4.5 text-base text-ink-2 marker:text-rule-2">
                    {r.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Skills */}
      <section aria-labelledby="skills-title" className="border-y border-rule bg-surface">
        <Container className="flex flex-col gap-9 py-16 md:py-[5.5rem]">
          <h2 id="skills-title" className="heading text-[clamp(1.6rem,3vw,2.5rem)]">
            What I work with
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {skillGroups.map((g) => (
              <div key={g.name} className="flex flex-col gap-2.5">
                <IconTile icon={[Browser, HardDrives, PenNib][skillGroups.indexOf(g)]} />
                <h3 className="text-lg font-semibold">{g.name}</h3>
                <p className="text-[0.9375rem] text-muted">{g.note}</p>
                <p className="font-mono text-[0.8125rem] text-ink-2">{g.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaPanel title="Hiring, or have a project in mind?" body="Tell me about the role or the product. I'll reply personally." />
    </>
  );
}
