import { EnvelopeSimple, MapPin } from "@phosphor-icons/react/dist/ssr";
import { person, socials } from "@/content/site";
import { JsonLd, breadcrumbNode, pageMetadata, personNode, webPageNode } from "@/lib/seo";
import { Breadcrumbs, Container } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";

const path = "/contact";
const crumbs = [{ name: "Contact", path }];
const description = `Hire ${person.name}, MERN stack and Next.js developer, for your next web app, website or SEO project, or a full-time remote role. Send a message or email directly.`;

export const metadata = pageMetadata({
  title: "Contact: Hire a MERN Stack Developer",
  description,
  path,
  keywords: ["hire MERN stack developer", "hire full stack developer", "contact web developer", "freelance React developer for hire"],
});

export default function Contact() {
  return (
    <>
      <JsonLd
        nodes={[
          webPageNode({ path, name: `Contact ${person.name}`, description, type: "ContactPage", crumbs, extra: { mainEntity: { "@id": personNode["@id"] } } }),
          breadcrumbNode(path, crumbs),
        ]}
      />

      <section aria-labelledby="contact-title" className="relative overflow-hidden">
        <div aria-hidden className="spotlight pointer-events-none absolute inset-0 [--x:10%] [--y:0%]" />
        <Container className="relative grid grid-cols-1 gap-14 pt-10 pb-24 md:grid-cols-12 md:gap-10 md:pt-14 md:pb-32">
          <div className="md:col-span-5">
            <Breadcrumbs crumbs={crumbs} />
            <h1 id="contact-title" className="rise display mt-8 text-[clamp(2.5rem,5vw,4.25rem)]">
              Tell me what you&apos;re building.
            </h1>
            <p className="rise prose-lede mt-6 max-w-[40ch] text-lg text-ink-2" style={{ "--i": 1 } as React.CSSProperties}>
              Hiring a MERN stack developer for a project, or for your team? Use the form or write to me directly.
            </p>

            <ul className="rise mt-10 space-y-4" style={{ "--i": 2 } as React.CSSProperties}>
              <li className="flex items-center gap-3">
                <EnvelopeSimple size={20} aria-hidden className="shrink-0 text-accent-text" />
                <a href={`mailto:${person.email}`} className="text-lg font-semibold break-all underline decoration-rule-strong underline-offset-[6px] hover:decoration-ink">
                  {person.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-ink-2">
                <MapPin size={20} aria-hidden className="shrink-0 text-accent-text" />
                {person.city}, {person.country}. Working with clients worldwide.
              </li>
            </ul>

            <ul className="mt-10 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex h-10 items-center rounded-xl border border-rule px-4 text-sm font-medium text-ink-2 transition-colors hover:border-ink hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rise md:col-span-7" style={{ "--i": 2 } as React.CSSProperties}>
            <h2 className="sr-only">Send a message</h2>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
