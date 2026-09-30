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
] as const;

export function Header() {
  const pathname = usePathname();
  // The menu remembers the page it was opened on, so navigating anywhere closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-4 md:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active(l.href) ? "page" : undefined}
              className="rounded-lg px-3 py-2 text-[0.9375rem] text-ink-2 transition-colors hover:text-ink aria-[current=page]:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden h-10 items-center rounded-xl bg-accent px-4 text-[0.9375rem] font-semibold text-on-accent transition-transform duration-200 ease-out-expo hover:-translate-y-px active:translate-y-px sm:inline-flex"
          >
            Hire me
          </Link>
          <button
            type="button"
            onClick={() => setOpenOn(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-rule md:hidden"
          >
            {open ? <X size={18} aria-hidden /> : <List size={18} aria-hidden />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label="Main" hidden={!open} className="border-t border-rule px-4 pt-2 pb-5 md:hidden">
        <ul>
          {nav.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active(l.href) ? "page" : undefined}
                className="flex min-h-12 items-center border-b border-rule text-lg font-medium text-ink-2 aria-[current=page]:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" className="mt-5 flex h-12 items-center justify-center rounded-xl bg-accent font-semibold text-on-accent">
          Hire me
        </Link>
      </nav>
    </header>
  );
}

export function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label={`${person.name}, home`}>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-mono text-[0.8rem] font-bold text-on-accent transition-transform duration-300 ease-out-expo group-hover:-rotate-6">
        OK
      </span>
      <span className="text-[1rem] font-semibold tracking-[-0.02em]">{person.name}</span>
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
      aria-label="Switch colour theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-rule text-ink-2 transition-colors hover:border-rule-strong hover:text-ink"
    >
      <Sun size={18} aria-hidden className="theme-icon-sun" />
      <Moon size={18} aria-hidden className="theme-icon-moon" />
    </button>
  );
}
