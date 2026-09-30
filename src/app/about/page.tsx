import Image from "next/image";
import { GraduationCap } from "@phosphor-icons/react/dist/ssr";
import { education, fmtRange, person, roles, skillGroups, socials, stats } from "@/content/site";
import { JsonLd, breadcrumbNode, pageMetadata, personNode, webPageNode } from "@/lib/seo";
import { StackIcon } from "@/components/StackIcon";
import { Container, PageHeader, SectionTitle } from "@/components/ui";
import { CtaBand, Process, Timeline } from "@/components/sections";

const path = "/about";
const crumbs = [{ name: "About", path }];
const description = `About ${person.name} (${person.fullName}), a MERN stack and Next.js developer in ${person.city}, ${person.country}. Experience, skills and education since ${person.since}.`;

export const metadata = pageMetadata({
  title: `About ${person.name} | ${person.role}`,
  absoluteTitle: true,
  description,
  path,
  type: "profile",
  keywords: [`${person.name}`, person.fullName, "MERN stack developer resume", "full stack developer experience"],
});

export default function About() {
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
            extra: { mainEntity: { "@id": personNode["@id"] }, dateCreated: "2026-09-30" },
          }),
          breadcrumbNode(path, crumbs),
        ]}
      />

      <PageHeader
        crumbs={crumbs}
        title={<>About {person.name}.</>}
        lede={`I'm a MERN stack developer in ${person.city}, ${person.country}. I've spent every year since ${person.since} on a different layer of the web, and now I build whole products.`}
      />

      <section aria-labelledby="story-title" className="py-20 md:py-28">
        <Container className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <h2 id="story-title" className="sr-only">
              My story
            </h2>
            <div className="reveal space-y-5 text-lg leading-relaxed text-ink-2 [&_strong]:font-semibold [&_strong]:text-ink">
              <p>
                My full name is <strong>{person.fullName}</strong>; online I go by {person.name}. I started in {person.since} as an{" "}
                <strong>SEO specialist</strong>, getting client sites onto the first page of Google. That taught me what makes a site
                fast, readable and easy to find, which still shapes every build.
              </p>
              <p>
                From there I moved to <strong>WordPress</strong> and hand-coded HTML, CSS and Bootstrap sites, then spent almost two years
                as the <strong>React front-end developer at CareerBooster.ai</strong>, turning a growing product into a set of reusable
                components.
              </p>
              <p>
                Today I&apos;m a <strong>{person.currentTitle} at {person.employer}</strong>, where I lead full-stack work and own
                projects on my own, from design to release. My core stack is <strong>MongoDB, Express, React and Node.js</strong>, with
                Next.js whenever public pages need to rank.
              </p>
              <p>
                Alongside work I&apos;m studying for a <strong>BS in Software Engineering at SZABIST Islamabad</strong>. I take on freelance
                projects for clients worldwide and I&apos;m open to full-time remote roles.
              </p>
            </div>

            <dl className="reveal mt-12 grid grid-cols-3 gap-4 border-t border-rule pt-8">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-sm text-ink-2">{s.label}</dt>
                  <dd className="heading tabular text-[clamp(2rem,3.4vw,2.75rem)]">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <div className="relative aspect-square w-full max-w-[22rem] overflow-hidden rounded-xl border border-rule bg-sheet">
              <Image src={person.portrait} alt={`Portrait of ${person.name}`} fill sizes="(min-width: 768px) 352px, 90vw" className="object-cover" />
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem]">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer me" className="font-medium underline decoration-rule-strong underline-offset-4 hover:decoration-ink">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="skills-title" className="border-t border-rule bg-sheet py-24 md:py-28">
        <Container>
          <SectionTitle id="skills-title">Skills and tools.</SectionTitle>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {skillGroups.map((g) => (
              <article key={g.name} className="reveal rounded-xl border border-rule bg-bg p-7">
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{g.name}</h3>
                <p className="mt-2 text-ink-2">{g.note}</p>
                <ul className="mt-7 space-y-3">
                  {g.items.map((t) => (
                    <li key={t} className="flex items-center gap-3 font-medium">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-rule bg-sheet">
                        <StackIcon tool={t} size={17} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="experience-title" className="border-t border-rule py-24 md:py-32">
        <Container>
          <SectionTitle id="experience-title">Experience.</SectionTitle>
          <Timeline roles={roles} detailed />
          <div className="reveal grid grid-cols-1 gap-3 border-y border-rule py-9 md:grid-cols-12 md:gap-10">
            <p className="tabular pt-1 font-mono text-[0.8rem] text-ink-2 md:col-span-3">{fmtRange(education.start, education.end)}</p>
            <div className="flex items-start gap-3 md:col-span-9">
              <GraduationCap size={24} aria-hidden className="mt-0.5 shrink-0 text-accent-text" />
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.02em]">{education.title}</h3>
                <p className="mt-1 text-ink-2">{education.orgFull}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Process />

      <CtaBand title="Want this experience on your team?" />
    </>
  );
}
