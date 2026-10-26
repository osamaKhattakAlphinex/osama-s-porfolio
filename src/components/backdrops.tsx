import Image from "next/image";
import Link from "next/link";
import { heroShot, projects, type Project } from "@/content/site";

// Decorative layers behind sections. Every one is aria-hidden and pointer-events-none;
// the section using them needs `relative isolate` so the layer sits behind its content.

type Glow = { className: string };

/** Line grid or dot field, faded out with a mask, with optional drifting cobalt glows. */
export function Backdrop({
  pattern = "grid",
  mask = "radial",
  glows = [],
  className = "",
}: {
  pattern?: "grid" | "dots" | "grid-night" | "dots-light" | "none";
  mask?: "radial" | "right" | "top" | "none";
  glows?: Glow[];
  className?: string;
}) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {pattern !== "none" && <div className={`absolute inset-0 pattern-${pattern} ${mask !== "none" ? `fade-${mask}` : ""}`} />}
      {glows.map((g, i) => (
        <div key={i} className={`glow-blob ${g.className}`} style={{ animationDelay: `${i * -5}s` }} />
      ))}
    </div>
  );
}

/** A project screenshot, blurred and dimmed, behind a navy band, with a grid on top. */
export function ShotBackdrop({ src, position = "object-top" }: { src: string; position?: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Image src={src} alt="" fill sizes="640px" className={`scale-110 object-cover opacity-[0.16] blur-2xl saturate-150 ${position}`} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--night)_0%,transparent_30%,transparent_70%,var(--night)_100%)]" />
      <div className="pattern-grid-night fade-radial absolute inset-0" />
      <div className="glow-blob -top-40 -right-32 h-[34rem] w-[34rem]" />
    </div>
  );
}

/**
 * An endless strip of project screenshots. The first copy is real links; the second copy (for a seamless
 * loop) is hidden from assistive tech. Under reduced motion it becomes a horizontally scrollable row.
 */
export function ProjectReel({ items = projects }: { items?: Project[] }) {
  const card = (p: Project, hidden: boolean) => (
    <li key={`${p.slug}-${hidden}`} className="shrink-0">
      <Link
        href={`/projects/${p.slug}`}
        tabIndex={hidden ? -1 : undefined}
        className="group block w-[15rem] overflow-hidden rounded-2xl border border-rule bg-surface shadow-[0_18px_40px_-28px_var(--shadow)] transition-transform duration-300 hover:-translate-y-1 sm:w-[18rem]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-shot">
          <Image src={heroShot(p)} alt="" fill sizes="288px" loading="lazy" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
        </div>
        <div className="flex items-center justify-between gap-2 px-3.5 py-2.5">
          <span className="truncate text-sm font-semibold text-ink">{p.name}</span>
          <span className="shrink-0 font-mono text-[0.6875rem] text-muted uppercase">{p.categories[0]}</span>
        </div>
      </Link>
    </li>
  );
  return (
    <div className="reel fade-x overflow-hidden motion-reduce:overflow-x-auto">
      <div className="reel-track flex w-max gap-4 py-3">
        <ul className="flex gap-4" aria-label="Projects">
          {items.map((p) => card(p, false))}
        </ul>
        <ul className="flex gap-4 motion-reduce:hidden" aria-hidden>
          {items.map((p) => card(p, true))}
        </ul>
      </div>
    </div>
  );
}

/** Three screenshots fanned out in perspective, for page intros. */
export function ScreenFan({ shots }: { shots: { src: string; alt: string }[] }) {
  const pos = [
    "left-0 top-10 w-[62%] -rotate-[6deg] z-10",
    "right-0 top-0 w-[62%] rotate-[5deg] z-20 float-slow",
    "left-[19%] top-[34%] w-[62%] z-30 float",
  ];
  return (
    <div aria-hidden className="relative mx-auto aspect-[16/11] w-full max-w-[520px]">
      {shots.slice(0, 3).map((s, i) => (
        <div key={s.src} className={`absolute overflow-hidden rounded-xl border border-rule bg-surface shadow-[0_30px_60px_-30px_var(--shadow)] ${pos[i]}`}>
          <div className="flex gap-1 border-b border-rule bg-bg px-2.5 py-1.5">
            {[0, 1, 2].map((d) => (
              <span key={d} className="h-1.5 w-1.5 rounded-full bg-rule-2" />
            ))}
          </div>
          <div className="relative aspect-[16/10]">
            <Image src={s.src} alt="" fill sizes="320px" className="object-cover object-top" />
          </div>
        </div>
      ))}
    </div>
  );
}
