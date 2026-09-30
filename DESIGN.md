# Design

Developer portfolio for two audiences, freelance clients and hiring teams. Dark-first, typographic, one accent.
References: brittanychiang.com (dark, restrained, dates beside roles) and the MERN portfolios that rank for "MERN stack developer" (which win on keyword titles, not design).

## Tokens (src/app/globals.css)

- Neutral greys, one accent: lime `#c4f25a` as a fill (buttons, logo, marks). `--accent-text` is the readable version for text: lime on dark, `#3d6b00` on light.
- Themes: follows the OS until the visitor toggles; the choice is stored in `localStorage.theme` and applied before paint by the inline script in `layout.tsx`. Without JS, `prefers-color-scheme` decides.
- Type: Geist Sans for everything, Geist Mono for small metadata (dates, breadcrumbs, tags). `.display` for H1s, `.heading` for H2s.
- Shape: 12px (`rounded-xl`) for cards, images, buttons, inputs; 8px (`rounded-lg`) for small tags.
- Width: `max-w-[1240px]` container, `px-4` mobile / `px-8` desktop.

## Motion

- `.rise`: load-in for the first screen, staggered by `--i`.
- `.reveal`: sections rise as they enter (CSS scroll-driven animation where supported).
- Stack marquee under the home hero (the only marquee), pauses on hover.
- `Spotlight`: accent glow follows the pointer in the home hero (fine pointers only).
- All of it is off under `prefers-reduced-motion`; the marquee wraps into a static list instead.

## Rules

- One contact label everywhere: "Hire me". One portfolio label: "See projects".
- One status dot on the site, the real availability flag in the home hero.
- No em or en dashes in visible copy. No invented numbers, clients or testimonials: every figure comes from `src/content/site.ts`.
