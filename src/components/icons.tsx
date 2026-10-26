import {
  AppWindow,
  Atom,
  Browser,
  ChartBar,
  ClipboardText,
  CloudArrowUp,
  Code,
  Database,
  FigmaLogo,
  HardDrives,
  Layout,
  Lightning,
  MagnifyingGlass,
  PenNib,
  PlugsConnected,
  RocketLaunch,
  ShieldCheck,
  Stack,
  UsersThree,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";

// One place for the icons that give sections a visual anchor. Keys match content in src/content/site.ts.

export const serviceIcons: Record<string, Icon> = {
  "mern-stack-development": Stack,
  "nextjs-development": Lightning,
  "react-development": Atom,
  "wordpress-development": Layout,
  "seo-services": MagnifyingGlass,
  "ui-ux-design": FigmaLogo,
};

export const processIcons: Record<string, Icon> = {
  Plan: ClipboardText,
  Design: PenNib,
  Build: Code,
  Launch: RocketLaunch,
};

export const skillIcons: Record<string, Icon> = {
  Frontend: Browser,
  "Backend & APIs": HardDrives,
  Databases: Database,
  "Auth & security": ShieldCheck,
  "Deployment & tools": CloudArrowUp,
  "CMS, SEO & design": PenNib,
};

export const offeringIcons: Icon[] = [AppWindow, UsersThree, Lightning, PlugsConnected, ChartBar, Wrench];

/** Icon in a soft cobalt tile. */
export function IconTile({ icon: I, size = "md", night }: { icon: Icon; size?: "md" | "lg"; night?: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-xl ${night ? "bg-night-3 text-night-link ring-1 ring-night-rule" : "bg-accent-soft text-accent-ink ring-1 ring-chip-rule"} ${
        size === "lg" ? "h-12 w-12" : "h-10 w-10"
      }`}
    >
      <I size={size === "lg" ? 24 : 20} weight="duotone" />
    </span>
  );
}
