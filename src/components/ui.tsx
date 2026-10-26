import Link from "next/link";
import type { Crumb } from "@/lib/seo";
import { Backdrop } from "./backdrops";

/** Page width and side padding, shared by every section. */
export function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-4 sm:px-6 ${className}`}>{children}</div>;
}

const buttonStyles = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  ghost: "border-[1.5px] border-ghost text-ink hover:border-ink",
  white: "bg-white text-[#0c1222] hover:bg-[#e8ebf0]",
  night: "border-[1.5px] border-night-rule text-night-ink hover:border-night-ink",
} as const;

export type ButtonVariant = keyof typeof buttonStyles;

export function buttonClass(variant: ButtonVariant = "primary", size: "md" | "sm" = "md") {
  const sizing = size === "md" ? "min-h-12 px-5 text-base" : "min-h-11 px-4 text-[0.9375rem]";
  return `inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold whitespace-nowrap transition-colors duration-200 ${sizing} ${buttonStyles[variant]}`;
}

/** Internal links go through next/link; anything with a scheme or a hash renders a plain anchor. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: "md" | "sm";
  className?: string;
  external?: boolean;
}) {
  const cls = `${buttonClass(variant, size)} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={cls}>
        {children}
      </a>
    );
  }
  if (/^(mailto:|https?:|#)/.test(href)) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Small uppercase mono label above headings, e.g. "02 / Client work". */
export function Eyebrow({ children, className = "text-muted", as: Tag = "span" }: { children: React.ReactNode; className?: string; as?: "span" | "p" | "h2" | "h3" }) {
  return <Tag className={`eyebrow ${className}`}>{children}</Tag>;
}

/** Visible breadcrumb trail; the matching BreadcrumbList lives in the page's JSON-LD. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[0.8125rem] text-muted">
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        {all.map((c, i) => (
          <li key={c.path} className="inline-flex items-center gap-2.5">
            {i > 0 && <span aria-hidden>/</span>}
            {i === all.length - 1 ? (
              <span aria-current="page">{c.name}</span>
            ) : (
              <Link href={c.path} className="text-accent-ink hover:underline">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Index-page intro: breadcrumb, then a big H1 with the lede beside it on wide screens. */
export function PageIntro({
  crumbs,
  title,
  lede,
  titleClass = "max-w-[13ch]",
  visual,
}: {
  crumbs: Crumb[];
  title: React.ReactNode;
  lede: React.ReactNode;
  titleClass?: string;
  /** Illustration shown beside the heading on wide screens. */
  visual?: React.ReactNode;
}) {
  if (visual) {
    return (
      <section aria-labelledby="page-title" className="relative isolate overflow-hidden pt-10 pb-8 md:pt-14 md:pb-12">
        <Backdrop pattern="grid" mask="radial" glows={[{ className: "-top-40 right-[-12%] h-[36rem] w-[36rem]" }]} />
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="flex flex-col gap-6">
            <Breadcrumbs crumbs={crumbs} />
            <h1 id="page-title" className={`rise display text-[clamp(2.25rem,5.6vw,4.6rem)] leading-none ${titleClass}`}>
              {title}
            </h1>
            <p className="rise max-w-[30em] text-lg text-muted md:text-[1.1875rem]" style={{ "--i": 1 } as React.CSSProperties}>
              {lede}
            </p>
          </div>
          <div className="rise hidden sm:block" style={{ "--i": 2 } as React.CSSProperties}>
            {visual}
          </div>
        </Container>
      </section>
    );
  }
  return (
    <section aria-labelledby="page-title" className="relative isolate pt-10 pb-8 md:pt-14 md:pb-10">
      <Backdrop pattern="grid" mask="radial" glows={[{ className: "-top-48 left-[30%] h-[32rem] w-[32rem]" }]} />
      <Container className="flex flex-col gap-6">
        <Breadcrumbs crumbs={crumbs} />
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <h1 id="page-title" className={`rise display text-[clamp(2.25rem,6vw,5rem)] leading-none ${titleClass}`}>
            {title}
          </h1>
          <p className="rise max-w-[26em] text-lg text-muted md:text-[1.1875rem]" style={{ "--i": 1 } as React.CSSProperties}>
            {lede}
          </p>
        </div>
      </Container>
    </section>
  );
}

/** Section heading with an optional eyebrow and lede. */
export function SectionHead({
  id,
  eyebrow,
  title,
  lede,
  night,
  className = "max-w-[45rem]",
  size = "lg",
}: {
  id: string;
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  night?: boolean;
  className?: string;
  size?: "lg" | "md";
}) {
  return (
    <div className={`flex flex-col gap-3.5 ${className}`}>
      {eyebrow && <Eyebrow className={night ? "text-night-muted" : "text-muted"}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={`heading ${size === "lg" ? "text-[clamp(1.75rem,3.6vw,3.1rem)]" : "text-[clamp(1.6rem,3vw,2.6rem)]"} ${night ? "text-white" : ""}`}>
        {title}
      </h2>
      {lede && <p className={`text-lg ${night ? "text-night-muted" : "text-muted"}`}>{lede}</p>}
    </div>
  );
}

/** Browser chrome around a screenshot. */
export function BrowserFrame({ url, night, children, className = "" }: { url: string; night?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-t-xl border border-b-0 ${night ? "border-night-rule bg-night-3" : "border-rule-2 bg-surface"} ${className}`}>
      <div className={`flex items-center gap-2 px-3.5 py-2.5 ${night ? "bg-[#151c2e]" : "border-b border-rule bg-bg"}`} aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className={`h-2.5 w-2.5 rounded-full ${night ? "bg-[#3a4560]" : "bg-rule-2"}`} />
        ))}
        <span className={`ml-3 truncate rounded-md px-2.5 py-0.5 font-mono text-xs ${night ? "bg-night text-night-muted" : "border border-rule bg-surface text-muted"}`}>{url}</span>
      </div>
      {children}
    </div>
  );
}

/** The cobalt closing band used on About, Work and service pages. */
export function CtaPanel({ title, body, label = "Let's work together", href = "/contact", id = "cta-title" }: { title: string; body: string; label?: string; href?: string; id?: string }) {
  return (
    <section aria-labelledby={id} className="py-14 md:py-24">
      <Container>
        <div className="relative isolate flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-[1.75rem] bg-accent px-6 py-9 text-white sm:px-10 md:px-[4.5rem] md:py-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="pattern-dots-light fade-right absolute inset-0" />
            <div className="absolute -right-24 -bottom-40 h-[26rem] w-[26rem] rounded-full border-[48px] border-white/[0.07]" />
            <div className="absolute -top-24 right-[22%] h-56 w-56 rounded-full border-[28px] border-white/[0.05]" />
          </div>
          <div className="flex max-w-[40rem] flex-col gap-2.5">
            <h2 id={id} className="heading text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.06]">
              {title}
            </h2>
            <p className="text-lg text-[#dde3ff]">{body}</p>
          </div>
          <ButtonLink href={href} variant="white">
            {label} <span aria-hidden>→</span>
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

/** Availability pill. The pulsing dot only appears in the home hero. */
export function AvailableBadge({ children, pulse, className = "" }: { children: React.ReactNode; pulse?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full bg-warn-bg px-2.5 py-1 text-[0.8125rem] text-warn-ink ${className}`}>
      <span className={`h-2 w-2 shrink-0 rounded-full bg-warn-dot ${pulse ? "pulse-dot" : ""}`} aria-hidden />
      {children}
    </span>
  );
}
