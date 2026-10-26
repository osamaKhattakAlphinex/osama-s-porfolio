"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, Moon, Sun, X } from "@phosphor-icons/react";
import { person } from "@/content/site";

export const nav = [
  { href: "/projects", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Writing" },
] as const;

export function Header() {
  const pathname = usePathname();
  // The menu remembers the page it was opened on, so navigating anywhere closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-[var(--header-h)] max-w-[1200px] items-center justify-between gap-6 px-4 sm:px-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-7 text-[0.9375rem] font-medium min-[860px]:flex">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active(l.href) ? "page" : undefined}
              className="text-muted transition-colors hover:text-ink aria-[current=page]:font-semibold aria-[current=page]:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            aria-current={active("/contact") ? "page" : undefined}
            className="hidden min-h-11 items-center rounded-[10px] bg-accent px-4 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-accent-hover min-[860px]:inline-flex"
          >
            Let&apos;s work together
          </Link>
          <button
            type="button"
            onClick={() => setOpenOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-rule bg-surface text-ink min-[860px]:hidden"
          >
            {open ? <X size={18} aria-hidden /> : <List size={18} aria-hidden />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label="Main" hidden={!open} className="border-t border-rule bg-surface px-4 pt-2 pb-5 sm:px-6 min-[860px]:hidden">
        <ul>
          {nav.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active(l.href) ? "page" : undefined}
                className="flex min-h-11 items-center border-b border-sunken text-base font-medium text-ink aria-[current=page]:text-accent-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" className="mt-4 flex min-h-11 items-center justify-center rounded-[10px] bg-accent text-[0.9375rem] font-semibold text-white">
          Let&apos;s work together
        </Link>
      </nav>
    </header>
  );
}

/** The "OK" monogram. Ink on paper in light mode, paper on ink in dark mode. */
export function LogoMark({ size = "md" }: { size?: "md" | "sm" }) {
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-[10px] bg-ink font-display font-bold tracking-[-0.02em] text-bg ${
        size === "md" ? "h-9 w-9 text-[0.9375rem]" : "h-8 w-8 text-[0.8125rem]"
      }`}
    >
      OK
    </span>
  );
}

export function Logo() {
  return (
    <Link href="/" aria-label={`${person.name}, home`} className="inline-flex items-center gap-3 text-ink">
      <LogoMark />
      <span className="font-display text-lg font-semibold tracking-[-0.01em]">{person.name}</span>
    </Link>
  );
}

function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-rule bg-surface text-muted transition-colors hover:border-rule-2 hover:text-ink min-[860px]:h-11 min-[860px]:w-11"
    >
      <Sun size={18} aria-hidden className="theme-icon-sun" />
      <Moon size={18} aria-hidden className="theme-icon-moon" />
    </button>
  );
}
