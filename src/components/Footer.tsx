import Link from "next/link";
import { person, projects, services, socials } from "@/content/site";
import { Logo } from "./Header";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-rule bg-sheet">
      <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-x-8 gap-y-12 px-4 py-16 md:grid-cols-12 md:px-8">
        <div className="col-span-2 md:col-span-4">
          <Logo />
          <p className="mt-5 max-w-[34ch] text-[0.975rem] text-ink-2">
            {person.role} in {person.city}, {person.country}. Building fast, search-ready web apps for clients and teams worldwide.
          </p>
          <a href={`mailto:${person.email}`} className="mt-5 inline-block font-medium underline decoration-rule-strong hover:decoration-ink">
            {person.email}
          </a>
        </div>

        <FooterCol title="Services" className="col-span-2 sm:col-span-1 md:col-span-3">
          {services.map((s) => (
            <FooterLink key={s.slug} href={`/services/${s.slug}`}>
              {s.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Work" className="md:col-span-2">
          {projects.slice(0, 5).map((p) => (
            <FooterLink key={p.slug} href={`/projects/${p.slug}`}>
              {p.name}
            </FooterLink>
          ))}
          <FooterLink href="/projects">All projects</FooterLink>
        </FooterCol>

        <FooterCol title="Site" className="md:col-span-3">
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer me" className="text-ink-2 transition-colors hover:text-ink">
                {s.label}
              </a>
            </li>
          ))}
        </FooterCol>
      </div>
      <div className="border-t border-rule">
        <p className="mx-auto max-w-[1240px] px-4 py-6 text-sm text-ink-2 md:px-8">
          © {year} {person.fullName} ({person.name}). All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title} className={className}>
      <p className="font-mono text-xs text-ink-2">{title}</p>
      <ul className="mt-4 space-y-2.5 text-[0.95rem]">{children}</ul>
    </nav>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-ink-2 transition-colors hover:text-ink">
        {children}
      </Link>
    </li>
  );
}
