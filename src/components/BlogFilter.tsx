"use client";

import { useState } from "react";
import { Chip } from "./ProjectFilter";

/**
 * Topic filter for the Writing page. The cards are rendered on the server and passed in as children
 * keyed by category; filtering only hides them, so every article stays in the HTML.
 */
export function BlogFilter({ heading, categories, items }: { heading: React.ReactNode; categories: string[]; items: { category: string; node: React.ReactNode }[] }) {
  const [cat, setCat] = useState("All");
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule pb-5">
        {heading}
        <div role="group" aria-label="Filter articles by topic" className="flex flex-wrap gap-2">
          {["All", ...categories].map((c) => (
            <Chip key={c} label={c} active={c === cat} onClick={() => setCat(c)} />
          ))}
        </div>
      </div>
      <ul className="mt-7 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <li key={i} hidden={cat !== "All" && it.category !== cat} className="flex">
            {it.node}
          </li>
        ))}
      </ul>
    </>
  );
}
