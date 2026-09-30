import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/site";
import { ButtonLink, Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="spotlight pointer-events-none absolute inset-0" />
      <Container className="relative py-24 md:py-36">
        <p className="font-mono text-sm text-accent-text">404</p>
        <h1 className="display mt-6 max-w-[16ch] text-[clamp(2.5rem,6vw,4.5rem)]">This page doesn&apos;t exist.</h1>
        <p className="mt-6 max-w-[48ch] text-lg text-ink-2">The link may be old or mistyped. These are good places to start:</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            See projects
          </ButtonLink>
        </div>
        <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-2 text-ink-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="underline decoration-rule-strong underline-offset-4 hover:text-ink">
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
