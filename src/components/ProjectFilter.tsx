"use client";

import { useState } from "react";
import { projectCategories, projects, type Category } from "@/content/site";
import { ProjectRow } from "./sections";

const filters: ("All" | Category)[] = ["All", ...projectCategories];

/** Every project is in the server-rendered HTML; filtering only hides rows, so crawlers always see the full list. */
export function ProjectFilter() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-5">
        <div role="group" aria-label="Filter projects by type" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const count = f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
            return <Chip key={f} label={f} count={count} active={f === filter} onClick={() => setFilter(f)} />;
          })}
        </div>
        <p role="status" className="font-mono text-[0.8125rem] text-muted">
          Showing {shown.length} of {projects.length}
        </p>
      </div>

      <ul className="mt-8 flex flex-col gap-6">
        {projects.map((p) => (
          <li key={p.slug} hidden={!shown.includes(p)}>
            <ProjectRow project={p} />
          </li>
        ))}
      </ul>
    </>
  );
}

export function Chip({ label, count, active, onClick }: { label: string; count?: number; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-10 items-center gap-2 rounded-full border-[1.5px] px-3.5 text-sm transition-colors md:min-h-11 md:px-4 md:text-[0.9375rem] ${
        active ? "border-ink bg-ink font-semibold text-bg" : "border-rule-2 bg-surface font-medium text-ink-2 hover:border-ink"
      }`}
    >
      {label}
      {count !== undefined && <span className="font-mono text-xs opacity-70">{count}</span>}
    </button>
  );
}
