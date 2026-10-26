import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/site";
import { ButtonLink, Container } from "@/components/ui";
import { Backdrop } from "@/components/backdrops";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="relative isolate flex min-h-[calc(100svh-var(--header-h)-1px)] items-center overflow-hidden">
      <Backdrop pattern="grid" mask="radial" glows={[{ className: "top-1/4 right-[-5%] h-[34rem] w-[34rem]" }]} />
      <Container className="grid grid-cols-1 items-center gap-12 py-16 md:py-20 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-5.5">
          <p className="eyebrow text-muted">Error 404</p>
          <h1 id="nf-title" className="display text-[clamp(2.4rem,5.4vw,4.4rem)]">
            This page isn&apos;t on the clock.
          </h1>
          <p className="max-w-[28em] text-lg text-muted md:text-[1.1875rem]">The link may be old or mistyped. Everything that exists is one click away.</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/">Back to home</ButtonLink>
            <ButtonLink href="/projects" variant="ghost">
              See my work
            </ButtonLink>
            <Link href="/contact" className="inline-flex min-h-12 items-center px-2 font-semibold text-accent-ink hover:underline">
              Contact me
            </Link>
          </div>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-muted underline decoration-rule-2 underline-offset-4 hover:text-ink">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div aria-hidden className="flex flex-col gap-6 rounded-3xl bg-night p-7 text-night-ink shadow-[0_40px_80px_-40px_rgb(12_18_34/0.6)] md:p-9">
          <div className="flex justify-between font-mono text-xs text-night-muted">
            <span>timer / unknown-route</span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#6b7896]" />
              stopped
            </span>
          </div>
          <div className="font-mono text-[clamp(3rem,8vw,6.4rem)] leading-none font-medium tracking-[-0.04em] text-white">00:04:04</div>
          <div className="flex h-3 gap-1">
            <span className="flex-[4] rounded-[3px] bg-accent" />
            <span className="flex-[0.4] rounded-[3px] bg-night-rule" />
            <span className="flex-[4] rounded-[3px] bg-accent" />
            <span className="flex-[6] rounded-[3px] bg-night-3" />
          </div>
          <div className="font-mono text-[0.8125rem] text-night-muted">GET /this-page → 404 Not Found</div>
        </div>
      </Container>
    </section>
  );
}
