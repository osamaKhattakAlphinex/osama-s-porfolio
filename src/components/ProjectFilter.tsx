"use client";

import { useState } from "react";
import { projectCategories, projects, type Category } from "@/content/site";
import { ProjectCard } from "./sections";

const filters: ("All" | Category)[] = ["All", ...projectCategories];

/** Every project is in the server-rendered HTML; filtering only hides cards, so crawlers always see the full list. */
export function ProjectFilter() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <>
      <div role="group" aria-label="Filter projects by type" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`tabular inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-colors active:translate-y-px ${
                active ? "border-ink bg-ink text-bg" : "border-rule text-ink-2 hover:border-rule-strong hover:text-ink"
              }`}
            >
              {f}
              <span className="opacity-70">{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
        {projects.map((p) => (
          <div key={p.slug} hidden={!shown.includes(p)}>
            <ProjectCard project={p} sizes="(min-width: 768px) 45vw, 100vw" headingLevel={2} />
          </div>
        ))}
      </div>
    </>
  );
}
