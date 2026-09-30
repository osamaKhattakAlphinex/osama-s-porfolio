import {
  siBootstrap,
  siExpress,
  siFigma,
  siGit,
  siGithub,
  siJavascript,
  siLaravel,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siTailwindcss,
  siWoocommerce,
  siWordpress,
  type SimpleIcon,
} from "simple-icons";
import type { Tool } from "@/content/site";

// Official marks from simple-icons, drawn in the current text colour.
const logos: Record<Tool, SimpleIcon> = {
  MongoDB: siMongodb,
  Express: siExpress,
  React: siReact,
  "Node.js": siNodedotjs,
  "Next.js": siNextdotjs,
  JavaScript: siJavascript,
  "Tailwind CSS": siTailwindcss,
  Laravel: siLaravel,
  WordPress: siWordpress,
  WooCommerce: siWoocommerce,
  Bootstrap: siBootstrap,
  Figma: siFigma,
  Git: siGit,
  GitHub: siGithub,
};

export function StackIcon({ tool, size = 16, className = "" }: { tool: Tool; size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden className={`shrink-0 ${className}`}>
      <path d={logos[tool].path} />
    </svg>
  );
}

/** Tool chips: logo plus name, so the tool names are real text for readers and search. */
export function ToolList({ tools, label = "Tools" }: { tools: Tool[]; label?: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {tools.map((t) => (
        <li key={t} className="inline-flex h-9 items-center gap-2 rounded-lg border border-rule bg-sheet px-3 text-sm font-medium">
          <StackIcon tool={t} className="text-ink-2" />
          {t}
        </li>
      ))}
    </ul>
  );
}
