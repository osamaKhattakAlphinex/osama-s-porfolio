import Link from "next/link";
import { ArrowRight, CaretRight } from "@phosphor-icons/react/dist/ssr";
import type { Crumb } from "@/lib/seo";

/** Page width and side padding, shared by every section. */
export function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-4 md:px-8 ${className}`}>{children}</div>;
}

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  const base = "group inline-flex h-12 items-center gap-2 rounded-xl px-6 font-semibold whitespace-nowrap transition-[translate,border-color,background-color] duration-200 ease-out-expo active:translate-y-px";
  const styles =
    variant === "primary" ? "bg-accent text-on-accent hover:-translate-y-0.5" : "border border-rule-strong text-ink hover:border-ink";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
      <ArrowRight size={17} weight="bold" aria-hidden className="transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5" />
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-1.5 font-semibold underline decoration-rule-strong underline-offset-[6px] transition-colors hover:decoration-ink">
      {children}
      <ArrowRight size={16} weight="bold" aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

/** Visible breadcrumb trail; the matching BreadcrumbList lives in the page's JSON-LD. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[0.8rem] text-ink-2">
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((c, i) => (
          <li key={c.path} className="inline-flex items-center gap-1.5">
            {i > 0 && <CaretRight size={11} aria-hidden />}
            {i === all.length - 1 ? (
              <span aria-current="page" className="text-ink">
                {c.name}
              </span>
            ) : (
              <Link href={c.path} className="transition-colors hover:text-ink">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Standard inner-page header: breadcrumb, H1, lede. */
export function PageHeader({ crumbs, title, lede, children }: { crumbs: Crumb[]; title: React.ReactNode; lede?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="relative overflow-hidden border-b border-rule">
      <div aria-hidden className="spotlight pointer-events-none absolute inset-0" />
      <Container className="relative pt-10 pb-16 md:pt-14 md:pb-20">
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="rise display mt-8 max-w-[18ch] text-[clamp(2.5rem,5.4vw,4.5rem)]">{title}</h1>
        {lede && (
          <p className="rise prose-lede mt-6 max-w-[58ch] text-lg text-ink-2 md:text-xl" style={{ "--i": 1 } as React.CSSProperties}>
            {lede}
          </p>
        )}
        {children && (
          <div className="rise mt-9" style={{ "--i": 2 } as React.CSSProperties}>
            {children}
          </div>
        )}
      </Container>
    </header>
  );
}

export function SectionTitle({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <h2 id={id} className={`reveal heading text-[clamp(2rem,4vw,3.25rem)] ${className}`}>
      {children}
    </h2>
  );
}
