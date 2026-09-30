import Image from "next/image";
import { faqs, person, roles } from "@/content/site";
import { JsonLd, faqNode, pageMetadata, webPageNode } from "@/lib/seo";
import { Spotlight } from "@/components/Spotlight";
import { ButtonLink, Container, SectionTitle, TextLink } from "@/components/ui";
import { CtaBand, Faq, ProofStrip, SelectedWork, ServicesBento, Timeline } from "@/components/sections";

const title = `${person.name} | MERN Stack Developer in ${person.country}`;
const description = `Hire ${person.name}, a MERN stack and Next.js developer in ${person.city}. Fast, search-ready web apps with MongoDB, Express, React and Node.js. 20+ projects shipped.`;

export const metadata = pageMetadata({
  title,
  description,
  path: "/",
  absoluteTitle: true,
  keywords: ["MERN stack developer", "MERN stack developer Pakistan", "MERN stack developer Islamabad", "hire MERN stack developer", "freelance full stack developer", "React developer"],
});

export default function Home() {
  return (
    <>
      <JsonLd nodes={[webPageNode({ path: "/", name: title, description, image: person.portrait }), faqNode("/", faqs)]} />

      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <Spotlight />
        <Container className="relative grid grid-cols-1 items-center gap-12 pt-12 pb-20 md:grid-cols-12 md:gap-10 md:pt-16 md:pb-24">
          <div className="md:col-span-8">
            <p className="rise inline-flex items-center gap-2.5 rounded-xl border border-rule bg-sheet px-3.5 py-1.5 text-sm font-medium" style={{ "--i": 0 } as React.CSSProperties}>
              {/* The only status dot on the site: it states real availability. */}
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-70 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-text" />
              </span>
              Available for freelance and full-time work
            </p>

            <h1 id="hero-title" className="rise display mt-6 max-w-[17ch] text-[clamp(2.6rem,5.2vw,4.4rem)]" style={{ "--i": 1 } as React.CSSProperties}>
              MERN stack developer for web apps that <span className="text-accent-text">rank</span>.
            </h1>

            <p className="rise prose-lede mt-6 max-w-[46ch] text-lg text-ink-2 md:text-xl" style={{ "--i": 2 } as React.CSSProperties}>
              I&apos;m {person.name}. I build fast MongoDB, Express, React and Node.js apps, and make sure Google can find them.
            </p>

            <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ "--i": 3 } as React.CSSProperties}>
              <ButtonLink href="/contact">Hire me</ButtonLink>
              <ButtonLink href="/projects" variant="secondary">
                See projects
              </ButtonLink>
            </div>
          </div>

          <figure className="rise md:col-span-4" style={{ "--i": 2 } as React.CSSProperties}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[19rem] overflow-hidden rounded-xl border border-rule bg-sheet md:mr-0">
              <Image
                src={person.portrait}
                alt={`${person.name}, MERN stack developer in ${person.city}`}
                fill
                preload
                sizes="(min-width: 768px) 320px, 80vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mx-auto mt-4 max-w-[19rem] text-sm text-ink-2 md:mr-0">
              Currently <span className="font-semibold text-ink">{person.currentTitle}</span> at {person.employer}
            </figcaption>
          </figure>
        </Container>
      </section>

      <ProofStrip />

      <SelectedWork />

      <section aria-labelledby="services-title" className="border-t border-rule bg-sheet py-24 md:py-32">
        <Container>
          <SectionTitle id="services-title" className="max-w-[18ch]">
            What I can build for you.
          </SectionTitle>
          <p className="reveal mt-5 max-w-[56ch] text-lg text-ink-2">
            Most projects need a few of these at once. Tell me the result you want and I&apos;ll pick the stack.
          </p>
          <div className="mt-14">
            <ServicesBento />
          </div>
        </Container>
      </section>

      <section aria-labelledby="experience-title" className="border-t border-rule py-24 md:py-32">
        <Container>
          <SectionTitle id="experience-title" className="max-w-[20ch]">
            From ranking sites to leading full-stack builds.
          </SectionTitle>
          <p className="reveal mt-5 max-w-[60ch] text-lg text-ink-2">
            I started in {person.since} getting sites to rank on Google, then built WordPress and hand-coded sites, React
            interfaces at CareerBooster.ai, and now full-stack apps at {person.employer}.
          </p>
          <Timeline roles={roles.slice(-3)} />
          <div className="mt-4 border-t border-rule pt-8">
            <TextLink href="/about">Full experience and skills</TextLink>
          </div>
        </Container>
      </section>

      <Faq items={faqs} />

      <CtaBand />
    </>
  );
}
