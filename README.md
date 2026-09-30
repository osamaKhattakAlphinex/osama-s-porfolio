# Osama Khattak, MERN stack developer portfolio

Multi-page portfolio built with Next.js 16 (App Router), Tailwind CSS v4 and Geist. Every route is statically prerendered.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Before deploying (SEO depends on these)

| Env var | Why |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The live domain, e.g. `https://osamakhattak.dev`. Canonicals, sitemap, Open Graph and JSON-LD all use it. On Vercel the production URL is used if this is unset, but set it once you have a custom domain. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Token from Google Search Console (HTML tag method). |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Optional, Bing Webmaster Tools. |

After the first deploy: verify the site in Search Console, submit `/sitemap.xml`, and request indexing for `/` and `/services/mern-stack-development`.

## Pages

| Route | Targets | Structured data |
| --- | --- | --- |
| `/` | MERN stack developer (Pakistan, Islamabad) | WebPage, FAQPage |
| `/about` | Name searches, experience | ProfilePage (mainEntity Person) |
| `/projects`, `/projects/[slug]` | Portfolio, each client project | CollectionPage + ItemList, ItemPage + CreativeWork |
| `/services`, `/services/[slug]` | MERN, Next.js, React, WordPress, SEO, UI/UX service searches | CollectionPage, Service + OfferCatalog, FAQPage |
| `/contact` | Hire a MERN stack developer | ContactPage |

Every page also carries the site-wide graph (WebSite, Person, employer, school, portrait) linked by `@id`, plus a BreadcrumbList on inner pages.

Also generated: `/sitemap.xml` (with image entries), `/robots.txt`, `/manifest.webmanifest`, `/llms.txt` (for AI search), a 1200x630 share image per page (`opengraph-image.tsx`), favicon and Apple icon. The 404 page is `noindex`.

## Where things live

- `src/content/site.ts`: every fact and line of copy (roles, projects, services, FAQ, links). Edit content here; pages, sitemap, JSON-LD and llms.txt all update from it.
- `src/lib/seo.tsx`: `pageMetadata()` (title, description, canonical, OG, Twitter for each page) and the JSON-LD builders.
- `src/lib/og.tsx`: the shared share-image design.
- `src/components/`: header, footer, sections, contact form, project filter.
- `DESIGN.md`: tokens, motion and copy rules.
- `legacy/`: the previous Bootstrap site, kept for reference. Safe to delete.

## Adding a project

Add an entry to `projects` in `site.ts` with a screenshot in `public/work/` (WebP, 1600px wide). Fill `stack` only with tools you actually used on it. The page, share image, sitemap entry and JSON-LD are generated.

## Replacing the portrait

Drop a high-resolution photo at `public/osama.jpg` (1200px or more, 4:5 or square). The current one is 432px, the weakest asset on the site.
