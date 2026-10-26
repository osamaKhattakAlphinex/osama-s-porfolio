import Image from "next/image";
import Link from "next/link";
import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { fmtRange, heroShot, host, person, socials, workProcess, type Project, type Role } from "@/content/site";
import { IconTile, processIcons } from "./icons";

const linkedin = socials.find((s) => s.label === "LinkedIn")!;
const github = socials.find((s) => s.label === "GitHub")!;

// ---------- FAQ ----------

/** Accordion list. The first answer starts open so the content is visible without a click. */
export function FaqList({ items, headingLevel = 3 }: { items: { q: string; a: string }[]; headingLevel?: 3 | 4 }) {
  const H = `h${headingLevel}` as const;
  return (
    <div className="min-w-0 border-t border-rule-2">
      {items.map((f, i) => (
        <details key={f.q} className="group border-b border-rule-2" open={i === 0}>
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-1 py-5 [&::-webkit-details-marker]:hidden">
            <H className="text-[1.0625rem] font-semibold md:text-[1.1875rem]">{f.q}</H>
            <span aria-hidden className="text-2xl leading-none text-accent-ink transition-transform duration-200 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-[44em] px-1 pb-6 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

// ---------- Process ----------

/** Four steps as cells on the navy band (services index). */
export function ProcessGrid() {
  return (
    <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-[18px] border border-night-rule bg-night-rule sm:grid-cols-2 lg:grid-cols-4">
      {workProcess.map((p, i) => (
        <li key={p.name} className="flex flex-col gap-2.5 bg-night-2/90 p-6 backdrop-blur-sm md:p-7">
          <div className="flex items-center justify-between">
            <IconTile icon={processIcons[p.name]} night />
            <span className="font-mono text-night-link">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <h3 className="font-display text-[1.375rem] font-semibold text-white">{p.name}</h3>
          <p className="text-base text-night-muted">{p.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Four steps with graded top rules (service pages). */
export function ProcessSteps() {
  const bars = ["border-accent", "border-[#6a7be6]", "border-[#9aa5b9]", "border-rule-2"];
  return (
    <ol className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
      {workProcess.map((p, i) => (
        <li key={p.name} className={`flex flex-col gap-2 border-t-[3px] pt-4.5 ${bars[i]}`}>
          <IconTile icon={processIcons[p.name]} />
          <h3 className="eyebrow text-accent-ink">
            {String(i + 1).padStart(2, "0")} {p.name}
          </h3>
          <p className="text-base text-ink-2">{p.body}</p>
        </li>
      ))}
    </ol>
  );
}

// ---------- Contact links ----------

export function ContactLinks() {
  const rows = [
    { href: `mailto:${person.email}`, label: "Email", value: person.email, Icon: EnvelopeSimple, external: false },
    { href: linkedin.href, label: "LinkedIn", value: "in/osama-khattak", Icon: LinkedinLogo, external: true },
    { href: github.href, label: "GitHub", value: "osamaKhattakAlphinex", Icon: GithubLogo, external: true },
  ];
  return (
    <ul className="flex flex-col border-t border-rule">
      {rows.map(({ href, label, value, Icon, external }) => (
        <li key={label} className="border-b border-rule">
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer me" } : {})}
            className="group flex min-h-14 items-center justify-between gap-3 rounded-lg px-2 py-4 text-ink transition-colors hover:bg-surface"
          >
            <span className="flex min-w-0 items-center gap-3.5">
              <Icon size={20} aria-hidden className="shrink-0" />
              <span className="min-w-0">
                <span className="block text-[0.8125rem] text-muted">{label}</span>
                <span className="block truncate font-semibold">{value}</span>
              </span>
            </span>
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent-ink">
              →
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

// ---------- Projects ----------

/** Horizontal project card on the Work page: screenshot on a tinted panel, facts beside it. */
export function ProjectRow({ project: p, headingLevel = 2 }: { project: Project; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as const;
  const lead = p.slug === "staffvertex";
  return (
    <article className="group grid grid-cols-1 overflow-hidden rounded-[22px] border border-rule bg-surface md:grid-cols-2">
      <Link
        href={`/projects/${p.slug}`}
        tabIndex={-1}
        aria-hidden
        className={`block overflow-hidden px-5 pt-5 sm:px-8 sm:pt-8 ${lead ? "bg-night" : "bg-shot"}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-[10px] shadow-[0_20px_40px_-20px_var(--shadow)] transition-transform duration-300 group-hover:-translate-y-1.5">
          <Image src={heroShot(p)} alt="" fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover object-top" />
        </div>
      </Link>
      <div className="flex flex-col justify-center gap-3.5 p-6 md:p-10">
        <div className="flex flex-wrap items-center gap-2">
          {p.categories.map((c) => (
            <span key={c} className="rounded-md bg-accent-soft px-2 py-1 font-mono text-xs text-accent-soft-ink">
              {c}
            </span>
          ))}
          <span className="font-mono text-xs text-muted">{p.kind}</span>
        </div>
        <H className="heading text-[clamp(1.5rem,2.6vw,2.3rem)] leading-[1.1]">
          <Link href={`/projects/${p.slug}`} className="text-ink hover:text-accent-ink">
            {p.name}
          </Link>
        </H>
        <p className="text-muted">{p.summary}</p>
        {p.stack.length > 0 && <p className="font-mono text-[0.8125rem] text-ink-2">{p.stack.join(" · ")}</p>}
        <div className="flex flex-wrap gap-x-6 gap-y-1 pt-1">
          <Link href={`/projects/${p.slug}`} className="inline-flex min-h-11 items-center font-semibold text-accent-ink hover:underline">
            Read the case study →
          </Link>
          {p.offline ? (
            <span className="inline-flex min-h-11 items-center text-sm text-muted">Live site no longer online</span>
          ) : (
            <a href={p.href} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center font-semibold text-muted hover:text-ink">
              {host(p.href)} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/** Screenshot card on the navy proof band (service pages). */
export function ProofCard({ project: p }: { project: Project }) {
  return (
    <Link href={`/projects/${p.slug}`} className="group flex flex-1 flex-col overflow-hidden rounded-[18px] border border-night-rule bg-night-2 text-night-ink">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={heroShot(p)} alt={`${p.name} home page`} fill sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="flex flex-col gap-1 px-5.5 pt-4 pb-5.5">
        <span className="eyebrow text-xs text-night-muted">{p.kind}</span>
        <span className="font-display text-[1.375rem] font-semibold text-white">{p.name}</span>
        <span className="mt-1.5 text-[0.9375rem] font-semibold text-[#c9d3ff]">Read the case study →</span>
      </div>
    </Link>
  );
}

// ---------- Experience ----------

/** Role list with dates on the left (home page). */
export function RoleList({ roles, limit = 3 }: { roles: Role[]; limit?: number }) {
  return (
    <>
      {[...roles].reverse().map((r, i) => (
        <li key={r.title + r.org} className="grid grid-cols-1 gap-x-8 gap-y-2 border-t border-rule py-6 sm:grid-cols-3 md:py-7">
          <div className="flex flex-col gap-1.5">
            <time className="font-mono text-[0.8125rem] text-muted" dateTime={`${r.start[0]}-${String(r.start[1]).padStart(2, "0")}`}>
              {fmtRange(r.start, r.end)}
            </time>
            {i === 0 && r.end === "now" && (
              <span className="self-start rounded-md bg-accent-soft px-2 py-0.5 font-mono text-[0.6875rem] tracking-[0.05em] text-accent-soft-ink">CURRENT</span>
            )}
          </div>
          <div className="flex flex-col gap-2.5 sm:col-span-2">
            <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.015em] md:text-[1.375rem]">
              {r.title} <span className="font-medium text-muted">· {r.org}</span>
            </h3>
            <ul className="flex list-disc flex-col gap-1.5 pl-4.5 text-base text-ink-2 marker:text-rule-2">
              {r.points.slice(0, limit).map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-1.5" aria-label="Skills used">
              {r.tags.map((t) => (
                <li key={t} className="rounded-md bg-tag px-2 py-1 font-mono text-xs text-ink-2">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </>
  );
}

/** Résumé download, or an email request while no PDF exists. */
export function ResumeAction({ label = "Download résumé", variant = "primary" }: { label?: string; variant?: "primary" | "ghost" }) {
  const cls =
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent-hover"
      : "border-[1.5px] border-ghost text-ink hover:border-ink";
  const base = `inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-5 font-semibold whitespace-nowrap transition-colors ${cls}`;
  const icon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  );
  if (person.resume) {
    return (
      <a href={person.resume} download className={base}>
        {icon}
        {label}
      </a>
    );
  }
  return (
    <a href={`mailto:${person.email}?subject=${encodeURIComponent("Résumé request")}`} className={base}>
      {icon}
      {label.replace("Download", "Request")}
    </a>
  );
}
