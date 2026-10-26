import { person } from "@/content/site";
import { JsonLd, breadcrumbNode, pageMetadata, personNode, webPageNode } from "@/lib/seo";
import { AvailableBadge, Breadcrumbs, Container } from "@/components/ui";
import { ContactLinks } from "@/components/sections";
import { ContactForm } from "@/components/ContactForm";
import { Backdrop } from "@/components/backdrops";
import Image from "next/image";

const path = "/contact";
const crumbs = [{ name: "Contact", path }];
const description = `Hire ${person.name}, MERN stack and Next.js developer, for your next web app, website or SEO project, or a full-time remote role. Send a message or email.`;

export const metadata = pageMetadata({
  title: "Contact: Hire a MERN Stack Developer",
  description,
  path,
  keywords: ["hire MERN stack developer", "hire full stack developer", "contact web developer", "freelance React developer for hire", "hire Next.js developer"],
});

const steps = [
  { title: "I reply personally", body: "With questions, a first opinion, or honest advice if your project needs someone else.", bar: "border-accent", num: "text-accent-ink" },
  { title: "We talk it through", body: "A short call over Zoom about goals, users and what \"done\" means.", bar: "border-[#9aa5b9]", num: "text-muted" },
  { title: "Scope in writing", body: "Goal, scope, timeline and cost agreed in writing before any work starts.", bar: "border-rule-2", num: "text-muted" },
];

export default function Contact() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageNode({ path, name: `Contact ${person.name}`, description, type: "ContactPage", crumbs, extra: { mainEntity: { "@id": personNode["@id"] } } }),
          breadcrumbNode(path, crumbs),
        ]}
      />

      <section aria-labelledby="contact-title" className="relative isolate overflow-hidden">
        <Backdrop pattern="grid" mask="radial" glows={[{ className: "-top-32 left-[-10%] h-[34rem] w-[34rem]" }, { className: "bottom-0 right-[-10%] h-[30rem] w-[30rem] opacity-70" }]} />
        <Container className="grid grid-cols-1 items-start gap-10 pt-10 pb-16 md:pt-14 md:pb-[5.5rem] lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5.5">
            <Breadcrumbs crumbs={crumbs} />
            <h1 id="contact-title" className="rise display text-[clamp(2.4rem,6vw,4.8rem)] leading-none">
              Let&apos;s build{" "}
              <br />
              <span className="text-accent-ink">something.</span>
            </h1>
            <p className="rise max-w-[28em] text-lg text-muted md:text-[1.1875rem]" style={{ "--i": 1 } as React.CSSProperties}>
              A web app, a website, SEO work or a full-time remote role: tell me about it. I read every message myself.
            </p>
            <div className="flex items-center gap-3.5 self-start rounded-2xl border border-rule bg-surface p-3 pr-4 shadow-[0_18px_40px_-28px_var(--shadow)]">
              <Image src={person.portrait} alt={`${person.name}`} width={56} height={56} sizes="56px" className="h-14 w-14 rounded-xl object-cover" />
              <span className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold">{person.fullName}</span>
                <AvailableBadge className="text-xs">Open to freelance &amp; full-time remote</AvailableBadge>
              </span>
            </div>
            <div className="mt-2">
              <ContactLinks />
            </div>
            <p className="text-sm text-muted">
              {person.city}, {person.country} ({person.timezone}). Afternoons here overlap with UK and European mornings; evenings with the US East Coast.
            </p>
          </div>

          <div className="rounded-[22px] border border-rule bg-surface p-6 shadow-[0_24px_60px_-36px_var(--shadow)] md:p-10">
            <ContactForm full title="Tell me about your project" />
          </div>
        </Container>
      </section>

      <section aria-labelledby="next-title" className="border-t border-rule bg-surface">
        <Container className="flex flex-col gap-10 py-16 md:py-[5.5rem]">
          <h2 id="next-title" className="heading text-[clamp(1.75rem,3.2vw,2.6rem)]">
            What happens after you write
          </h2>
          <ol className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className={`flex flex-col gap-2.5 border-t-[3px] pt-5 ${s.bar}`}>
                <span className={`font-mono ${s.num}`}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="text-base text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
