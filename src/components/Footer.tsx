import Link from "next/link";
import { person, services, socials } from "@/content/site";

const pages = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

/** Short names for the footer's services column. */
const shortName: Record<string, string> = {
  "react-development": "React front end",
  "wordpress-development": "WordPress",
  "seo-services": "SEO",
};

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate overflow-hidden bg-night text-night-muted">
      <div aria-hidden className="pattern-grid-night fade-top pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-4 pt-14 pb-8 text-[0.9375rem] sm:px-6 md:gap-12 md:pt-[4.5rem] md:pb-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-3.5 md:col-span-1">
            <span className="flex items-center gap-2.5 font-display text-lg font-semibold text-white">
              <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-[9px] bg-white text-[0.8125rem] font-bold text-[#0c1222]">
                OK
              </span>
              {person.name}
            </span>
            <p>
              Full-stack developer building web products with React, Next.js and Node.js. {person.city}, working worldwide.
            </p>
            <a href={`mailto:${person.email}`} className="break-all text-night-link hover:text-white">
              {person.email}
            </a>
          </div>

          <FooterCol title="Pages">
            {pages.map((p) => (
              <FooterLink key={p.href} href={p.href}>
                {p.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Services">
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {shortName[s.slug] ?? s.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Elsewhere">
            <li>
              <a href={`mailto:${person.email}`} className="text-night-link transition-colors hover:text-white">
                Email
              </a>
            </li>
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer me" className="text-night-link transition-colors hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </FooterCol>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-night-rule pt-6 text-sm">
          <p>
            © {year} {person.fullName}
          </p>
          <p>Designed and built by Osama</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title}>
      <p className="eyebrow text-xs text-night-ink">{title}</p>
      <ul className="mt-3.5 flex flex-col gap-2.5">{children}</ul>
    </nav>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-night-link transition-colors hover:text-white">
        {children}
      </Link>
    </li>
  );
}
