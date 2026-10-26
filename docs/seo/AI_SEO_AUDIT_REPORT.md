# AI SEO, GEO, AEO, LLMO, E-E-A-T and Technical SEO Audit

**Site:** Osama Khattak (M. Osama Ahmad) developer portfolio
**Live URL:** https://osama-s-porfolio-beige.vercel.app (supplied after the first pass; live checks added 2026-10-26)
**Repository:** `osamaKhattakAlphinex/osama-s-porfolio`, branch `main` (the live site matches commit `ad17899`)
**Stack:** Next.js 16.3.6 (App Router, Turbopack), React 19.2, Tailwind CSS v4, fully static prerender
**Audit date:** 2026-10-26
**Scope:** Audit only. No application code was changed.

---

## How to read this report

- **Confirmed:** directly observed in the repository, in the local production build, or in a live HTTP response.
- **Suspected:** strong evidence, but the final effect depends on something outside the repository.
- **Unverified:** cannot be checked without a live deployment or account access (Search Console, Bing Webmaster Tools, Vercel dashboard, LinkedIn).

Each recommendation is labelled as a **Requirement** (needed for discovery or indexing), a **Recommendation** (likely to improve quality or understanding), or an **Optional experiment**.

No technique here guarantees rankings, traffic, or citations by an AI system. AI visibility is an outcome to measure after deployment, not something a code change can promise.

### What was actually executed

| Check | Tool | Result |
| --- | --- | --- |
| Lint | `npx eslint .` | 0 errors, 94 warnings. **All 94 are in `.claude/skills/impeccable/scripts/*`** (tooling, not app code). App code: 0 warnings. |
| Type check | `npx tsc --noEmit` | Pass |
| Production build | `npx next build` | Pass. 60 static outputs, every route prerendered (○ / ●). No warning about the missing site URL. |
| Rendered HTML of all 26 sitemap URLs | `next start` on port 3100 + Node fetch/regex script | Titles, descriptions, canonicals, robots, OG, H1s, images, JSON-LD parsed for every page (results below) |
| JSON-LD syntax | `JSON.parse` on every `application/ld+json` block, 26 pages | All parse. No duplicate graphs. |
| Status codes and redirects | `curl` | 200 on all sitemap URLs. 404 on unknown path. 308 for trailing slash and for `/projects/networkustaad` |
| Crawler user agents | `curl -A` with Googlebot, bingbot, OAI-SearchBot, PerplexityBot, GPTBot | All 200 with identical byte size (no UA-based differences) **on the local server only** |
| Mobile layout and lab performance | Playwright Chromium, 390×844, DPR 2, 8 key pages | No horizontal overflow. LCP 136–376 ms, CLS 0 (local lab, not field data) |
| **Live: rendered HTML of all 26 sitemap URLs** | Same script against `https://osama-s-porfolio-beige.vercel.app` | All 200. Identical titles, descriptions, H1s and JSON-LD to the local build. Canonicals, sitemap, robots and `llms.txt` all use the live domain. |
| **Live: status codes and redirects** | `curl` | 404 + `noindex` on unknown path. 308 for trailing slash, the legacy slug, and `http://` → `https://`. |
| **Live: crawler user agents** | `curl -A` with Googlebot, bingbot, OAI-SearchBot, GPTBot, PerplexityBot, ClaudeBot, Chrome | All 200, identical 151,934 bytes. No UA-based blocking or cloaking. |
| **Live: structured data** | Schema.org Validator (`validator.schema.org`) on 9 pages: `/`, `/about`, `/contact`, `/projects`, `/projects/staffvertex`, `/services`, `/services/mern-stack-development`, `/blog`, one post | **0 errors** on all 9 |
| **Live: Lighthouse 12.8.2** (simulated mobile, slow 4G) | Local Chromium against the live URL, 3 pages | SEO 100, Accessibility 100, Best Practices 100 on all three. Performance: home **83** (LCP 3.4 s), Staffvertex case study 91 (LCP 2.8 s), blog post 94 (LCP 2.7 s). See T-11, T-15. |
| PageSpeed Insights API | `googleapis.com/pagespeedonline/v5` | **Not run:** the shared key-less daily quota was exhausted. Lighthouse was run locally instead. Field (CrUX) data still unchecked. |
| **Live: index presence** | `site:` queries via web search, Bing HTML, DuckDuckGo HTML | No indexed pages found on any of the three (see T-14) |
| Other candidate URLs | `curl` | `osama-s-porfolio.vercel.app` (the URL on the GitHub repo) returns `DEPLOYMENT_NOT_FOUND` |
| GitHub profile | GitHub public REST API | Profile has no name, bio, location, or website |
| Client sites | `curl` of 9 project URLs | 8 reachable. ConsultantsPerHour returns 402 (already marked offline on the site). |
| Official documentation | WebFetch | OpenAI bots page, Google AI features page, Google FAQPage docs, Perplexity bots page, Next.js 16 `Image` docs (bundled in `node_modules`) |

**Not executed (needs account access or was blocked):** Google Rich Results Test (browser-only tool), PageSpeed Insights / CrUX field data (quota), Google Search Console, Bing Webmaster Tools, Vercel firewall settings, LinkedIn profile review. Section F gives the exact steps for each.

---

## A. Executive summary

### Overall readiness

**The site is live and technically sound for search. It doesn't appear to be indexed yet, and the content and off-site identity are what hold it back.**

The live site at `https://osama-s-porfolio-beige.vercel.app` behaves exactly like the local build:
- every page is statically prerendered HTML returning 200
- every indexable page has a unique title, description and self-canonical on the live domain
- there is one connected JSON-LD graph per page (0 errors in the Schema.org Validator on 9 pages)
- the sitemap is complete, `robots.txt` is permissive, and `llms.txt` is generated
- every page has its own Open Graph image, the 404 is correct, and HTTPS redirects work
- Lighthouse scores 100 for SEO, accessibility and best practices
- six search and AI crawler user agents get the same 200 response

Blog articles are long, first-hand and specific.

Four things still limit discovery:
- No indexed pages were found in Bing, DuckDuckGo or a general web search (T-14). Search Console and Bing Webmaster Tools will confirm.
- The domain is a randomly suffixed `vercel.app` subdomain that carries no name.
- The URL on the GitHub repo is a different, dead deployment (T-01).
- The URL is right in production only because Vercel supplies `VERCEL_PROJECT_PRODUCTION_URL`. Built anywhere else without `NEXT_PUBLIC_SITE_URL`, every canonical and sitemap URL silently becomes `http://localhost:3000` (T-02, confirmed locally).

### Most important weaknesses

1. **No indexed pages found yet, and webmaster tools are not set up** (T-14). Indexing is the gate for both search and AI-search visibility.
2. **Unbranded domain, and the GitHub repo links a dead deployment** (T-01). Moving domains later costs re-indexing, so the time to choose is now.
3. **The "MERN Stack Developer" positioning is not backed by the project evidence** (G-01). No project lists MongoDB or Express. The flagship Staffvertex is listed as Next.js, React and Node.js.
4. **The home page never states "Osama Khattak is…" in its main content** (G-02). The largest name in the home hero is "M. Osama Ahmad".
5. **Resume-style percentages have no context** (E-01): "60% more traffic", "40% fewer deployment bugs" and others, with no baseline, timeframe or method.
6. **Case studies are thin** (G-04). 8 of 9 project pages have 129–197 words of main content.
7. **External identity is weak** (X-01). The GitHub profile has no name, bio or website link, and no third-party page found links Osama to his work.
8. **Home page mobile LCP is 3.4 s in Lighthouse** (T-15). The cause is a fade-in animation on the hero paragraph, and the fix is small.

### Highest-impact opportunities

1. Pick the permanent domain now (a custom domain if you plan to have one), point the `vercel.app` URL at it, and set `NEXT_PUBLIC_SITE_URL`. Then verify Google Search Console and Bing Webmaster Tools, submit the sitemap, and request indexing for `/`, `/about` and `/projects/staffvertex`.
2. Add one visible, factual identity sentence to the home hero and align the name across GitHub, LinkedIn and the site.
3. Make the specialization match the evidence: either document the MongoDB/Express work that really exists, or re-weight the positioning to "full-stack Next.js / MERN".
4. Turn the strongest real projects into fuller case studies, and add context to the metrics or remove them.
5. Write 2–3 articles grounded in Staffvertex engineering (multi-tenancy, roles and permissions, API sync design), only where the facts are real.

### What is and is not verified

| Verified (Confirmed) | Not verifiable here |
| --- | --- |
| Repository code and build output. Live rendered HTML, status codes, redirects, robots/sitemap/llms.txt. Schema.org validation (9 live pages). Lighthouse lab scores (3 live pages). Crawler-UA responses. GitHub public profile. Reachability of client sites. Absence of a deployment at `osama-s-porfolio.vercel.app`. | Real indexing status (only public `site:` searches were possible), field Core Web Vitals, firewall behaviour toward real crawler IP ranges, Search Console and Bing data, LinkedIn content, AI citation or answer behaviour |

---

## B. Audit scorecard

### Scoring method

Each category has a fixed list of criteria taken from the audit brief. Each criterion is scored **1** (meets it), **0.5** (partly) or **0** (missing or failing). Criteria that cannot be verified without live access are marked **N/V** and **left out of the denominator** rather than scored zero. They are listed so nothing is hidden.

`Score = round(100 × points ÷ scored criteria)`

These are this audit's own scores for prioritizing work. They are **not** Google, OpenAI, Microsoft, Perplexity or any other platform's scores, and they do not predict rankings.

**Deployment gate: PASS** (live over HTTPS, all URLs 200). **Indexing gate: not yet observed** (T-14). Until pages are indexed, measured search and AI visibility will be near zero, whatever the scores say.

| Category | Score | Points | Main drag |
| --- | --- | --- | --- |
| Technical SEO | **79** | 9.5 / 12 | Truncated descriptions, home LCP 3.4 s (lab), webmaster tools not verified |
| GEO | **56** | 4.5 / 8 | Unsupported claims, no citations, MERN not evidenced |
| AEO | **75** | 7.5 / 10 | Home page lacks a direct identity answer |
| E-E-A-T | **45** | 4.5 / 10 | Metrics without context, no linked code, no references |
| LLMO | **79** | 5.5 / 7 | Identity ambiguity, schema/visible-content mismatches |
| Structured data | **78** | 7 / 9 | `creator` overstates authorship, date conflicts (syntax: 0 validator errors) |
| Content and topical authority | **50** | 4 / 8 | No depth on auth, multi-tenancy, deployment |
| AI crawler readiness | **83** | 5 / 6 | No indexed pages found yet; firewall and webmaster tools N/V |
| External authority and entity consistency | **33** | 2 / 6 | Empty GitHub profile, dead repo link, no third-party corroboration |

*First-pass scores before the live URL was supplied: Technical 67, LLMO 64, AI crawler readiness 70. The other categories don't depend on deployment and are unchanged.*

<details>
<summary>Criterion-level breakdown</summary>

**Technical SEO (12):** unique titles 1 · descriptions complete 0.5 · canonicals (correct live) 1 · robots directives 1 · sitemap accuracy 0.5 · status codes/redirects 1 · crawlable SSR content 1 · headings/semantics 1 · images alt/filenames 0.5 · public HTTPS deployment 1 · Search Console/Bing readiness 0.5 · performance/mobile (Lighthouse 83–94, field N/V) 0.5

**GEO (8):** info in rendered HTML 1 · clear who/what 0.5 · consistent specialization 0.5 · technical project detail 0.5 · original insight 1 · claims verifiable 0 · authoritative citations 0 · related internal links 1

**AEO (10):** who is 0.5 · technologies 1 · Next.js/React/MERN 0.5 · SaaS built 1 · industries/clients 0.5 · problems solved 1 · how to hire 1 · what is different 0.5 · FAQ used appropriately 1 · concise page summaries 0.5

**E-E-A-T (10):** bio 1 · verifiable experience 0.5 · detailed case studies 0.5 · personal contribution 1 · measurable results with context 0 · code/demos 0 · testimonials/references 0 · article author and dates 1 · sources 0 · privacy/business info 0.5

**LLMO (7 scored, 1 N/V):** search crawlers allowed 1 · training vs search choice deliberate 0.5 · public 200 HTML 1 · discoverable via links and sitemap 1 · schema matches visible content 0.5 · identity unambiguous 0.5 · factual descriptions 1 · *firewall behaviour toward real crawler IPs N/V*

**Structured data (9):** valid syntax 1 · stable @ids 1 · Person with sameAs 1 · WebSite/ProfilePage/Breadcrumb 1 · BlogPosting 1 · consistency with visible content 0.5 · no conflicting values 0.5 · accurate property values 0.5 · employer identified 0.5

**Content and topical authority (8):** React/Next.js depth 0.5 · full-stack/MERN 0.5 · SaaS 1 · multi-tenant 0 · authentication/authorization 0 · API/database 0.5 · deployment/performance 0.5 · real decisions and lessons 1

**AI crawler readiness (6 scored, 2 N/V):** robots allows search crawlers 1 · live 200 for crawlers 1 · no UA cloaking (6 UAs, live) 1 · absolute production sitemap URL 1 · server-rendered content 1 · pages found in a search index 0 · *webmaster tools N/V · firewall N/V*

**External authority (6 scored, 1 N/V):** GitHub consistent 0 · site linked from profiles 0 · real projects live and linked 1 · third-party credits found 0 · employer corroborated 0.5 · no conflicting names/titles 0.5 · *LinkedIn N/V*

</details>

---

## C. Detailed findings

### Summary table

| ID | Category | Issue | Severity | Confidence | Fix type |
| --- | --- | --- | --- | --- | --- |
| T-14 | Technical / AI crawlers | No indexed pages found; Search Console and Bing not verified | **Critical** | Suspected | External account |
| T-01 | Technical / Entity | Unbranded `-beige.vercel.app` domain; GitHub repo links a dead deployment | **High** | Confirmed | External account |
| T-15 | Performance | Hero paragraph fade-in delays mobile LCP (home: 3.4 s in Lighthouse) | Medium | Confirmed | Code |
| T-02 | Technical | Site URL silently falls back to `http://localhost:3000` off Vercel | Medium (latent; live is correct) | Confirmed | Code + config |
| G-01 | GEO / E-E-A-T | "MERN" positioning not evidenced by any project's stack | **High** | Confirmed | Content |
| G-02 | AEO | Home `<main>` never states "Osama Khattak"; hero shows "M. Osama Ahmad" | **High** | Confirmed | Code + content |
| E-01 | E-E-A-T | Percentage outcomes without baseline, timeframe or method | **High** | Confirmed | Content |
| X-01 | External | GitHub profile has no name, bio, location or website | **High** | Confirmed | External account |
| T-03 | Technical | Two meta descriptions are cut mid-phrase ("20+.", "9 case.") | Medium | Confirmed | Code / content |
| G-04 | GEO / E-E-A-T | 8 of 9 case studies are thin (129–197 words) | Medium | Confirmed | Content |
| G-05 | GEO | "Multi-tenant" claimed but never explained | Medium | Confirmed | Content |
| G-06 | GEO / E-E-A-T | Articles cite no external sources | Medium | Confirmed | Content |
| G-03 | Entity | Two names used without a consistent pattern | Medium | Confirmed | Content + external |
| S-01 | Structured data | `CreativeWork.creator` = Osama on every project, including SEO-only work and an Alphinex product | Medium | Confirmed | Code |
| E-02 | E-E-A-T | No public code or demos linked; 9 public repos unused | Medium | Confirmed | Content + external |
| E-03 | E-E-A-T | No résumé available (mailto request only) | Medium | Confirmed | Content |
| E-04 | E-E-A-T | No third-party corroboration (credits, references) | Medium | Confirmed (for checked pages) | External |
| C-01 | Content | No depth on auth, multi-tenancy, API design, deployment | Medium | Confirmed | Content |
| T-11 | Technical | Field Core Web Vitals unknown (lab: Lighthouse 83–94) | Medium | Lab Confirmed, field Unverified | External tools |
| L-02 | AI crawlers | Firewall rules may block real crawler IPs (UA test passed) | Low | Unverified | External account |
| T-16 | Performance | Case-study LCP image preloaded but not `fetchPriority="high"` | Low | Confirmed | Code |
| A-01 | Accessibility | External-link `aria-label`s don't start with the visible text (WCAG 2.5.3) | Low | Confirmed | Code |
| E-05 | Trust | No privacy notice although the form sends data to Formspree | Low | Confirmed | Content |
| S-03 | Structured data | Every `WebPage` claims `about: Person`, including articles | Low | Confirmed | Code |
| S-04 | Structured data | `WebPage.dateModified` conflicts with `BlogPosting.dateModified` | Low | Confirmed | Code |
| S-05 | Structured data | Portrait `ImageObject` says 432×432; file is 800×800 | Low | Confirmed | Code |
| S-06 | Structured data | Employer `Organization` has only a name | Low | Confirmed | Code (needs facts) |
| T-04 | Technical | Uniform hand-bumped `lastmod` across the sitemap | Low | Confirmed | Code |
| T-05 | Technical | Non-standard `Host:` line in robots.txt | Low | Confirmed | Code |
| T-07 | Technical / LLMO | `<br/>` in H1s concatenates words in plain-text extraction | Low | Suspected | Code |
| T-08 | Technical | Empty alt on /projects screenshots, cryptic filenames, public `.webp.json` sidecars | Low | Confirmed | Code + assets |
| T-09 | Technical | Canonical portrait is a 527 KB PNG | Low | Confirmed | Asset |
| T-12 | Social | Generic OG image alt on blog posts | Low | Confirmed | Code |
| T-13 | Docs | README drift (FAQPage on `/`, portrait size) | Low | Confirmed | Docs |
| G-07 | Entity | Three job-title variants | Low | Confirmed | Content |
| T-17 | Technical | 404 page emits two `robots` meta tags | Info | Confirmed | Optional code |
| L-01 | LLMO | Training crawlers allowed by default (a choice, not a defect) | Info | Confirmed | Decision |
| S-07 | Structured data | FAQPage markup no longer produces Google rich results | Info | Confirmed (Google docs) | None required |

---

### Detailed findings

#### T-14. No indexed pages found; webmaster tools not verified

- **Category:** Technical SEO / AI crawler readiness
- **Evidence:**
  - `site:osama-s-porfolio-beige.vercel.app` returned no pages from the domain in a general web search, the Bing HTML results page, or DuckDuckGo's HTML results (2026-10-26).
  - The live HTML has no `google-site-verification` or `msvalidate.01` meta tag, so the env-var verification route (`src/app/layout.tsx:31-34`) is not in use. DNS verification can't be checked from outside.
- **Affected URL:** whole site
- **Severity:** Critical · **Confidence:** Suspected. Public `site:` results are incomplete and lag behind real indexing. Only Search Console's Pages report and Bing Webmaster Tools are authoritative.
- **Why it matters:** Google's AI Overviews and AI Mode use pages from Google's index. Microsoft Copilot answers draw on Bing's index. ChatGPT search and Perplexity use their own crawlers (OAI-SearchBot, PerplexityBot), which are allowed here, but nothing guarantees they discover a new site with no inbound links. Without indexing there is nothing to rank or cite.
- **Fix (Requirement):**
  1. Settle the permanent domain first (T-01).
  2. Verify a Google Search Console property and a Bing Webmaster Tools site (Bing can import from Search Console).
  3. Submit `/sitemap.xml` to both.
  4. Use URL Inspection → Request indexing for `/`, `/about`, `/projects/staffvertex` and the strongest article.
  5. Add the URL to GitHub and LinkedIn (X-01), since inbound links help discovery.
- **Validate:** Search Console → Sitemaps shows "Success" with 26 discovered URLs. The Pages report shows indexed URLs. Bing → URL Inspection shows "Indexed".
- **Requires:** external account access.

#### T-01. Unbranded domain; the GitHub repo links a dead deployment

- **Category:** Technical SEO / entity consistency
- **Evidence:**
  - Live production is `https://osama-s-porfolio-beige.vercel.app`. The `-beige` suffix is Vercel's automatic disambiguator, and the hostname contains the repo name rather than your name.
  - The GitHub API lists the repo homepage as `https://osama-s-porfolio.vercel.app`. That returns `HTTP 404`, `X-Vercel-Error: DEPLOYMENT_NOT_FOUND` (checked 2026-10-26).
  - `https://osamakhattak.dev` (the README's example domain) does not resolve.
- **Files:** `README.md` (env var table example). GitHub repo settings.
- **Severity:** High · **Confidence:** Confirmed
- **Why it matters:**
  - **Domain move cost:** every link, citation and indexed URL built up on the `vercel.app` hostname has to be moved with redirects later, and re-indexing takes weeks. Moving before indexing starts costs almost nothing.
  - **Entity signal:** a name-based domain is a small but durable identity signal; this hostname has none.
  - **Dead link:** the GitHub repo is one of the few existing places that links to the site, and it currently leads to an error page.
- **Fix:**
  - **Requirement:** update the GitHub repo's "Website" field to the live URL today.
  - **Recommendation:** if you will own a custom domain (e.g. a `.dev` or `.com` with your name), add it in Vercel now and make it the primary domain. Vercel then redirects the `vercel.app` hostname to it. Set `NEXT_PUBLIC_SITE_URL` to it explicitly. Do this **before** P0 Search Console work, so you verify the final domain once.
  - If you keep the `vercel.app` URL, that is workable: just use it everywhere consistently.
- **Validate:** `curl -sI https://osama-s-porfolio-beige.vercel.app/` → 308 to the custom domain (if adopted). The custom domain returns 200 with matching canonicals. The GitHub repo page links a URL that returns 200.
- **Requires:** external account access (Vercel / DNS / GitHub).

#### T-02. Site URL silently falls back to localhost (latent)

- **Category:** Technical SEO
- **Live status:** **not affected.** On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` resolves to `osama-s-porfolio-beige.vercel.app`, and all live canonicals, sitemap URLs and JSON-LD use it.
- **Evidence:** `src/content/site.ts:9-12` resolves `NEXT_PUBLIC_SITE_URL`, then `VERCEL_PROJECT_PRODUCTION_URL`, then `"http://localhost:3000"`. In the local production build (neither env var set), the output contained:
  - `robots.txt`: `Host: http://localhost:3000`, `Sitemap: http://localhost:3000/sitemap.xml`
  - every `<loc>` in `/sitemap.xml`: `http://localhost:3000/...`
  - `<link rel="canonical" href="http://localhost:3000/...">` on every page
  - `og:url`, `og:image`, and every JSON-LD `@id` and `url` on localhost
  - `/llms.txt` links on localhost

  `next build` printed no warning.
- **Files:** `src/content/site.ts:9`, used by `src/app/layout.tsx` (`metadataBase`), `src/app/robots.ts:8-9`, `src/app/sitemap.ts`, `src/lib/seo.tsx`, `src/app/llms.txt/route.ts`
- **Severity:** Medium (latent). It would be critical if triggered. Any host other than Vercel (Netlify, a VPS, Docker, static export) is exposed.
- **Confidence:** Confirmed (behaviour). Production is currently unaffected.
- **Why it matters:** Canonicals pointing to localhost tell Google the real page is elsewhere. The sitemap is unusable, and AI systems would read entity IDs on a host that does not exist.
- **Fix (Requirement):** Set `NEXT_PUBLIC_SITE_URL=https://<domain>` in the production environment. **Recommended code hardening:** make a misconfigured production build loud. For example, log a clear warning during `next build` when `siteUrl` contains `localhost`, and fail the build when `process.env.CI` or `VERCEL_ENV === "production"` is set. Then local `npm run build` still works.
- **Validate:** `curl -s https://<domain>/sitemap.xml | grep -c localhost` returns `0` (it does on the live site today). View source on any page and check that `rel="canonical"` uses the production domain.
- **Requires:** config (and an optional small code change).

#### T-03. Meta descriptions truncated mid-phrase

- **Evidence:** `clip()` at `src/lib/seo.tsx:39` cuts source copy over 160 characters at the last space and appends a full stop. Rendered output:
  - `/`: "…and SaaS like Staffvertex. **20+.**" (source `src/app/page.tsx:34` ends "20+ projects shipped.")
  - `/projects`: "…each live and linked. **9 case.**" (source `src/app/projects/page.tsx:9`)
- **Severity:** Medium · **Confidence:** Confirmed
- **Why it matters:** The description is the snippet people (and answer engines that quote it) see. A dangling "20+." or "9 case." reads as an error on the two most important pages.
- **Fix (Recommendation):** Rewrite both source strings to ≤155 characters. Optionally make `clip()` log a warning in development so over-long copy is caught when it is written, not after.
- **Validate:** rerun the HTML extraction (Section F, step 3) and confirm every description ends on a complete phrase.
- **Requires:** code/content change.

#### T-04. Uniform, manually bumped `lastmod`

- **Evidence:** `src/app/sitemap.ts:7` uses `contentUpdated` (`src/content/site.ts:29`, `"2026-10-26"`) for every non-blog URL. Blog posts use their own `updated` (line 23). `changefreq` and `priority` are also emitted.
- **Severity:** Low · **Confidence:** Confirmed
- **Why it matters:** Google has said it uses `lastmod` only when it is consistently accurate, and it ignores `changefreq` and `priority`. Bumping one date for every page whenever anything changes trains crawlers to distrust it.
- **Fix (Recommendation):** Give projects and services their own `updated` field and use it. Drop `changefreq`/`priority` or leave them (harmless).
- **Requires:** code.

#### T-05. Non-standard `Host:` directive in robots.txt

- **Evidence:** `src/app/robots.ts:9` (`host: siteUrl`) emits `Host: http://localhost:3000` locally.
- **Severity:** Low · **Confidence:** Confirmed
- **Why it matters:** `Host` was a Yandex-specific directive. Google and Bing ignore it. It is not harmful, but it is noise and another place a wrong URL can leak.
- **Fix (Optional):** Remove `host`.

#### T-07. `<br/>` inside H1s joins words in text extraction

- **Evidence:** Plain-text extraction of rendered H1s gives "Notes from**the** work." (`src/app/blog/page.tsx:60-65`), "About**Osama Khattak**." (`src/app/about/page.tsx:55-59`) and "Let's build**something**." (`src/app/contact/page.tsx:41-45`). Playwright's LCP `textContent` showed the same "Let's buildsomething.".
- **Severity:** Low · **Confidence:** Suspected. Browsers and Google treat `<br>` as a break. Some HTML-to-text pipelines used by AI crawlers and scrapers do not.
- **Fix (Recommendation):** Put a space before each `<br />` (`{" "}<br />`). There is no visual change.

#### T-08. Image alt text and filenames

- **Evidence:**
  - `/projects`: 12 of 12 images have `alt=""`. The card screenshot link is `aria-hidden` (`src/components/sections.tsx:112-120`). This is acceptable for accessibility because the heading carries the name, but those screenshots carry no text signal for image search.
  - Legacy filenames: `public/work/cph.webp`, `nw.webp`, `e-d-2.webp`, `e-diary.webp`, `mindsieve.webp`. `public/work/sv.webp` is unused.
  - `public/work/*.webp.json` sidecars (generator metadata such as `"prompt": "origin: owner-supplied screenshot…"`) are publicly served.
- Case-study pages do use descriptive alt text (e.g. "Timbera.pk home page on desktop").
- **Severity:** Low · **Confidence:** Confirmed
- **Fix (Recommendation):** Rename legacy screenshots descriptively (`consultantsperhour-home.webp`, …). Delete `sv.webp`. Move the `.json` sidecars out of `public/`.

#### T-09. Canonical portrait is a heavy PNG

- **Evidence:** `public/osama.png` is 800×800, 526,869 bytes. It is referenced as the Person image in JSON-LD, the sitemap image for `/` and `/about`, and `primaryImageOfPage`. On-page rendering goes through `next/image` (about 22 KB at 256 px), so page speed is not affected.
- **Severity:** Low · **Confidence:** Confirmed
- **Fix (Optional):** Provide a 1200×1200 JPEG or WebP (about 100–150 KB) as the canonical portrait URL.

#### T-11. Core Web Vitals: lab data measured, field data unknown

- **Evidence (Lighthouse 12.8.2 against the live URL, simulated mobile on slow 4G; lab, not real users):**

  | Page | Perf | SEO | A11y | BP | LCP | TBT | CLS | FCP |
  | --- | --- | --- | --- | --- | --- | --- | --- | --- |
  | `/` | 83 | 100 | 100 | 100 | **3.4 s** | 300 ms | 0.046 | 1.6 s |
  | `/projects/staffvertex` | 91 | 100 | 100 | 100 | **2.8 s** | 220 ms | 0 | 1.4 s |
  | `/blog/build-time-tracking-app-like-hubstaff` | 94 | 100 | 100 | 100 | **2.7 s** | 130 ms | 0.047 | 1.2 s |

  - All three are above Google's 2.5 s "good" LCP threshold in this simulation.
  - TTFB was 620–700 ms in the run (served from Vercel's `sin1` edge for this test location).
  - Main-thread time on `/` is dominated by Style & Layout (about 1.6 s), with script evaluation at about 0.6 s. That suggests the decorative backdrops, blur and animations cost more than JavaScript does.
  - Unused JS: about 29 KiB. Legacy JS polyfills: about 14 KiB.
  - Local unthrottled check (8 pages, 390 px): no horizontal overflow, CLS 0.
- **Severity:** Medium · **Confidence:** Lab Confirmed. Field data Unverified (the PSI API quota was exhausted, and a new site has no CrUX data yet anyway).
- **Fix:** See T-15 for the main LCP cause. Re-run PageSpeed Insights in a browser on the same three pages. Once there is traffic, use the Search Console Core Web Vitals report, which reflects real users.

#### T-15. Hero paragraph fade-in delays mobile LCP

- **Evidence:**
  - Lighthouse's LCP element on `/` (mobile) is the hero intro paragraph ("I'm Osama, a full-stack Next.js developer at Alphinex Solutions…", `src/app/page.tsx:96`), not the H1. On a narrow screen the paragraph covers more area.
  - It has class `rise`, which runs `@keyframes rise` from `opacity: 0` with `animation-delay: calc(var(--i) * 70ms + 30ms)` and an 0.8 s duration (`src/app/globals.css:320-325`, `386-389`). Its `--i` is 2.
  - The stylesheet already says "Headlines are the Largest Contentful Paint; fading them from opacity 0 delays LCP, so they only slide" (`globals.css:327`). That is why `h1.rise` uses `lift`. The fix just doesn't cover this paragraph.
- **Severity:** Medium · **Confidence:** Confirmed (element and mechanism). The exact saving needs a re-run.
- **Fix (Recommendation):** Give the home hero lede the slide-only `lift` animation (no opacity fade), or no entrance animation, as was done for H1s. Check other above-the-fold `.rise` paragraphs on mobile: the About, case-study and service ledes.
- **Validate:** Re-run Lighthouse mobile on `/`. The LCP element should paint without the fade, and LCP should fall toward the FCP value (about 1.6 s in this run).

#### T-16. Case-study LCP image lacks `fetchPriority="high"`

- **Evidence:** On `/projects/staffvertex` the LCP element is the hero screenshot `<Image … preload>` (`src/app/projects/[slug]/page.tsx`, `HeroShot`). Lighthouse's LCP-discovery check: "fetchpriority=high should be applied: false".
  - Next.js 16's own `Image` docs (`node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`) say: "In most cases, you should use `loading="eager"` or `fetchPriority="high"` instead of `preload`". They also say not to use `preload` when several images could be the LCP depending on viewport.
- **Severity:** Low · **Fix (Recommendation):** For single, known LCP hero images, switch `preload` to `fetchPriority="high"` (with eager loading), per the Next 16 guidance. Measure before and after.

#### A-01. Accessible names don't start with the visible label

- **Evidence:** Lighthouse `label-content-name-mismatch` on the home page project index: `aria-label="Visit ExecutivesDiary (opens executivesdiary.com)"` on a link whose visible text is "executivesdiary.com →" (`src/app/page.tsx:345`). The same applies to Mindsieves and NetworkUstad. The header logo (`aria-label="Osama Khattak, home"`, visible "OK Osama Khattak") is also flagged, but "OK" is `aria-hidden`, so that one is marginal.
- **Severity:** Low (Lighthouse's accessibility score is still 100; this is an advisory check) · **Fix:** Start the accessible name with the visible text, e.g. `aria-label="executivesdiary.com: visit ExecutivesDiary (opens in a new tab)"`, so voice-control users can say what they see (WCAG 2.5.3).

#### T-17. Two robots meta tags on the 404 page (informational)

- **Evidence:** The live `/nope` returns 404 with both `<meta name="robots" content="noindex"/>` (added by Next.js for not-found responses) and `<meta name="robots" content="noindex, follow"/>` (from `src/app/not-found.tsx:7-10`).
- **Severity:** Info. A 404 status already keeps the page out of the index, and the duplicates don't conflict. **Fix (Optional):** Drop the `robots` field from `not-found.tsx` metadata.

#### T-12. Generic Open Graph image alt on blog posts

- **Evidence:** `src/app/blog/[slug]/opengraph-image.tsx:7`: `alt = "Featured image for the article"` for every post.
- **Severity:** Low · **Fix (Optional):** Use `generateImageMetadata` or a per-post alt (the post already has `imageAlt`).

#### T-13. README drift

- **Evidence:** `README.md:27` lists `FAQPage` on `/`, but the home page emits only `WebPage` plus the site graph. The README also says the portrait is 432 px, but `osama.png` is 800 px.
- **Severity:** Low · **Fix:** Update the README so future edits don't rely on wrong assumptions.

#### G-01. "MERN Stack Developer" positioning is not backed by project evidence

- **Category:** GEO / E-E-A-T / entity consistency
- **Evidence:**
  - `person.role = "MERN Stack Developer"` is the Person `jobTitle`, the home `<title>`, and repeated in metadata keywords on every page (`src/lib/seo.tsx:47`).
  - No project's `stack` contains `MongoDB` or `Express`. Staffvertex: `["Next.js", "React", "Node.js"]` (`src/content/site.ts:303`). Timbera and Carports: WordPress. Teey: Bootstrap. Four projects have empty stacks.
  - The Staffvertex article hedges: "Whether you use MongoDB or a relational database…".
  - MongoDB appears as evidence only in the Alphinex role tags and in the skill lists.
- **Severity:** High · **Confidence:** Confirmed (repository evidence)
- **Why it matters:** Hiring teams and answer engines cross-check claims against evidence. "Is Osama Khattak a MERN developer?" is best answered with a project that shows MongoDB, Express, React and Node together. Right now the evidence says "Next.js, React, Node.js and WordPress developer".
- **Fix (Recommendation):** Choose whichever is true:
  - If Staffvertex (or other Alphinex work) does use MongoDB and/or Express, add them to its `stack` and describe one concrete MongoDB decision. The data-model section already has natural places for this, such as the compound index example.
  - If not, link a public MERN repository (the GitHub account has 9 public repos; see E-02), or adjust positioning to "Full-stack Next.js developer (MERN)" so the headline matches the work.
  - Do not add tools that weren't used.
- **Validate:** For each claimed core technology, confirm at least one project page names it in its stack and explains how it was used.
- **Requires:** content.

#### G-02. The home page doesn't answer "Who is Osama Khattak?" in its main content

- **Evidence:**
  - Extracting text from `<main>` on `/` finds no occurrence of "Osama Khattak". It is also absent from `<main>` on `/services`, all `/services/*`, `/projects`, all `/projects/*` and `/contact`. It appears on `/about` and in blog bylines.
  - The home H1 is "I build complete web products, from the API to the last pixel." (`src/app/page.tsx:93-95`).
  - The hero copy says "I'm Osama…".
  - The most prominent name in the hero profile card is `person.fullName` "M. Osama Ahmad" (`src/app/page.tsx:156`).
  - "Osama Khattak" appears only in the header logo, footer, `<title>` and JSON-LD.
- **Severity:** High (AEO) · **Confidence:** Confirmed
- **Why it matters:** Answer engines and generative search build answers from the main content of pages. A one-sentence factual summary near the top of the home page is the most direct answer to name queries. Structured data alone is not enough: Google asks that structured data reflect visible content.
- **Fix (Recommendation):** Keep the creative H1. Add a visible line under it, for example: "Osama Khattak (M. Osama Ahmad) is a full-stack Next.js and MERN developer in Islamabad, Pakistan, currently Full Stack Next.js Developer at Alphinex Solutions." In the profile card, show "Osama Khattak" as the primary name with "M. Osama Ahmad" secondary, as the About page already does.
- **Validate:** Text extraction of `<main>` on `/` contains the identity sentence.
- **Requires:** code + content.

#### G-03. Two names without a consistent pattern

- **Evidence:**
  - Public name "Osama Khattak" (title, logo, JSON-LD `name`).
  - Full name "M. Osama Ahmad" (JSON-LD `alternateName`, home profile card, footer copyright `src/components/Footer.tsx:76`, résumé label).
  - The About page explains the relationship well: "My full name is M. Osama Ahmad; online I go by Osama Khattak."
  - The GitHub profile has no name at all (X-01).
- **Severity:** Medium · **Confidence:** Confirmed
- **Fix (Recommendation):** Use one pattern everywhere: primary "Osama Khattak", with "(M. Osama Ahmad)" on first mention on identity pages. Mirror it on GitHub and LinkedIn.

#### G-04. Thin case studies

- **Evidence:** Words of main content (rendered HTML): Timbera 197, Carports Hawaii 196, NetworkUstad 197, ConsultantsPerHour 184, EditorialDiary 157, Teey 155, ExecutivesDiary 135, Mindsieves 129. Staffvertex 539. The standard template (`src/app/projects/[slug]/page.tsx`, `CaseStudy`) shows about, a 2–3 bullet "What I did", and features copied from the live site.
- **Severity:** Medium · **Confidence:** Confirmed
- **Why it matters:** Case studies are the main evidence of experience. Pages that mostly describe what the client's site offers (rather than the problem, decisions, constraints and result of your work) give search engines and AI systems little to cite. They also read as near-duplicate templates.
- **Fix (Recommendation):** For 3–4 strongest projects (Timbera, Carports Hawaii, NetworkUstad, Staffvertex already done), add: the brief, constraints, what you decided and why, what was hard, timeline, and the honest outcome. Where the client's numbers aren't available, say so instead of estimating. For weak or very old projects, consider combining them into a shorter "Other work" section rather than expanding them with filler.
- **Requires:** content creation (from real project knowledge).

#### G-05. "Multi-tenant" is claimed but not explained

- **Evidence:**
  - "multi-tenant time tracker" in the case-study H1 (`src/content/site.ts:768`).
  - "multi-tenant time-tracking and project management SaaS" in the home hero.
  - "Multi-tenant" in the tags.
  - The only supporting text is "with each team's workspace kept separate".
- **Severity:** Medium · **Confidence:** Confirmed
- **Fix (Recommendation):** If you worked on it, add 3–5 factual sentences: how tenants are scoped (tenant ID on every document, middleware, separate databases?), how roles and permissions work, and one bug class this prevents. If tenancy was designed by someone else, say what you maintain.

#### G-06. No external citations

- **Evidence:** The only external links in all five articles are to the client sites (`staffvertex.com`, `carportshawaii.com`, `timbera.pk`). `technical-seo-checklist` makes crawling, indexing and canonical claims without linking Google Search Central. The time-tracking article's platform claims (e.g. macOS Screen Recording permission) are uncited.
- **Severity:** Medium · **Confidence:** Confirmed
- **Why it matters:** Linking primary documentation lets readers and AI systems verify factual claims. It separates your first-hand experience (the valuable part) from general facts.
- **Fix (Recommendation):** Add 2–5 primary-source links per article where a factual claim is made: Google Search Central, MDN, MongoDB docs, Apple developer docs, payment-provider docs. Use the existing `Out` component (`src/components/article.tsx:22`).

#### G-07. Job-title variants

- **Evidence:**
  - "MERN Stack Developer" (`person.role`, JSON-LD `jobTitle`)
  - "Full Stack Next.js Developer" (current role)
  - "Full Stack Developer" (blog byline, `src/app/blog/[slug]/page.tsx:87`)
  - "Full-stack developer" (footer)
- **Severity:** Low · **Fix (Optional):** Pick one public headline. Use the employer job title only where you describe that job.

#### E-01. Percentages without context

- **Evidence:** `src/content/site.ts:171-221` and their reuse on service pages (e.g. `:682`):
  - "grew client traffic by 60% and ranked over 50 target keywords"
  - "lifted organic leads by 35%"
  - "raising client satisfaction scores by 40%"
  - "Cut bounce rate by 25%"
  - "lifting client ratings by 35%"
  - "Trimmed average load time by 1.2 seconds"
  - "increased engagement time by 40%"
  - "cutting new feature time by 30%"
  - "reducing page load times by 20%"
  - "35% faster applications, 40% fewer deployment bugs"
  - "raised customer satisfaction by 25%"

  None states the baseline, period, measurement method or which client.
- **Severity:** High · **Confidence:** Confirmed (that they lack context; the numbers themselves are not disputed)
- **Why it matters:** Unqualified percentages are the classic marker of résumé inflation. Experienced reviewers and quality raters discount them, and they can lower trust in the true claims next to them. AI systems may repeat them as fact, which is a risk if one can't be backed up.
- **Fix (Recommendation):** For each metric, either add one line of context ("over 6 months on 3 client sites, measured in Google Analytics") or replace it with a qualitative, verifiable statement. Remove any you can't explain in an interview.
- **Requires:** content (only from real records).

#### E-02. No public code or demos linked

- **Evidence:**
  - The GitHub account has 9 public repos (`FYP`, `gym-book`, `PPM`, `vector-website`, `almaidah-cafe`, `hospital-website`, `spacehub-prototype`, `hackaton`, this portfolio), mostly TypeScript with Vercel demo URLs.
  - None is referenced on the site.
  - The site links only to the GitHub profile.
- **Severity:** Medium · **Confidence:** Confirmed
- **Fix (Recommendation):** Pin 3–4 representative repos with READMEs. Link the best one or two from the relevant service or case-study page. Linking this portfolio's own source is a strong Next.js signal. Only link repos you're comfortable having reviewed.

#### E-03. No résumé available

- **Evidence:** `person.resume = null` (`src/content/site.ts:49`). `ResumeAction` falls back to a `mailto:` "Request résumé" link (`src/components/sections.tsx:230-235`).
- **Severity:** Medium (for hiring-team visitors) · **Fix (Recommendation):** Publish a one-page PDF, or an HTML résumé page, with dates matching the About page.

#### E-04. No third-party corroboration found

- **Evidence:**
  - Home pages of 8 reachable client sites contain no mention of "Osama" or "Khattak".
  - `staffvertex.com` mentions "Alphinex" 3 times, which corroborates the employer relationship but not the individual.
  - One standard web search for the name plus specialization and city returned no results about this person.
  - No testimonials exist on the site. The PRODUCT.md notes these were removed deliberately and must not be fabricated, which is correct.
- **Severity:** Medium · **Confidence:** Confirmed for pages checked. Absence of search results does **not** prove no mentions exist.
- **Fix (Recommendation):**
  - Ask clients for a footer credit or a short attributed quote, with permission.
  - Request LinkedIn recommendations from CareerBooster.ai and Alphinex colleagues.
  - Make sure Alphinex's site or LinkedIn page lists you, if appropriate.

#### X-01. GitHub profile doesn't reinforce the identity

- **Category:** External authority / entity consistency
- **Evidence (GitHub public API, 2026-10-26):**
  - `name: null`, `bio: null`, `location: null`, `blog: ""` (no website), `company: null`.
  - The account (`osamaKhattakAlphinex`, created 2024-11-27) has 9 public repos and 1 follower.
  - This repo's homepage field is `https://osama-s-porfolio.vercel.app`, which returns `DEPLOYMENT_NOT_FOUND`, not the live `-beige` URL.
  - The site's Person `sameAs` points to this profile, so the identity link only works in one direction.
  - A search for "Osama Ahmad" / "Osama" portfolios turns up several unrelated people (e.g. a Dribbble "Osama Ahmad", other "Osama" portfolios). That makes it more important for each profile to state the same full identity and link back.
- **Severity:** High · **Confidence:** Confirmed
- **Fix (Recommendation):**
  - Set the GitHub name to "Osama Khattak", with a bio such as "Full-stack Next.js / MERN developer at Alphinex Solutions · Islamabad".
  - Set location and the website field to the live URL.
  - Fix the repo homepage and pin 3–4 repos.
  - Do the same alignment on LinkedIn (P1-6).
- **Validate:** `curl -s https://api.github.com/users/osamaKhattakAlphinex` shows `name`, `bio` and `blog` set. The repo page's website link returns 200.

#### E-05. No privacy notice

- **Evidence:** `src/components/ContactForm.tsx` posts name, email and message to Formspree (`formEndpoint`, `src/content/site.ts`). The footer and form link no privacy page.
- **Severity:** Low · **Fix (Recommendation):** Add a short `/privacy` page (what's collected, that Formspree processes it, retention, contact) and link it from the form and footer. This matters most for EU and UK clients.

#### S-01. `CreativeWork.creator` overstates authorship

- **Evidence:** `projectNode` sets `creator: { "@id": person }` for every project (`src/lib/seo.tsx:231`). That includes:
  - NetworkUstad and EditorialDiary, where the visible page says "My work here was SEO, not the design".
  - Staffvertex, which the page says "is a product of Alphinex Solutions".
- **Severity:** Medium · **Confidence:** Confirmed
- **Why it matters:** Structured data should match visible content. Claiming to be the creator of a site you only optimized is the kind of mismatch that undermines the trust signals the markup is meant to provide.
- **Fix (Recommendation):** Use `contributor` (the Person) together with a short `description` of the role for SEO-only or partial work. For Staffvertex, set `creator`/`publisher` to the Alphinex `Organization` and the Person as `contributor`. Keep `creator` only where you built the whole site.

#### S-03. Every `WebPage` is `about` the Person

- **Evidence:** `webPageNode` always sets `about: { "@id": person }` (`src/lib/seo.tsx:187`). That includes "How to Hire a MERN Stack Developer" and service pages.
- **Severity:** Low · **Fix:** Keep `about: Person` on `/`, `/about` and `/contact`. Omit it elsewhere, or point it at the page's real subject (the service, the project, or the article's topic).

#### S-04. Conflicting modified dates on the same page

- **Evidence:** On `/blog/hire-mern-stack-developer`, `WebPage.dateModified` = `2026-10-26T00:00:00+05:00` (global `contentUpdated`, `src/lib/seo.tsx:189`) while `BlogPosting.dateModified` = `2026-10-20T00:00:00+05:00`.
- **Severity:** Low · **Fix:** Pass a per-page `modified` date into `webPageNode`. For posts, use `post.updated`.

#### S-05. Portrait dimensions wrong

- **Evidence:** `width: 432, height: 432` (`src/lib/seo.tsx:136`). `/osama.png` is 800×800.
- **Severity:** Low · **Fix:** Correct the values, or derive them from the file.

#### S-06. Employer organization under-identified

- **Evidence:** `{ "@type": "Organization", name: "Alphinex Solutions" }` with no `url` or `sameAs` (`src/lib/seo.tsx:141`).
- **Severity:** Low · **Fix:** Add the company's official URL and LinkedIn company page, **if they exist** (not found in this audit; you need to supply them).

#### S-07. FAQPage markup and Google rich results (informational)

- **Evidence:** `FAQPage` is emitted on `/services`, all six service pages and all five posts. It is valid and matches visible FAQ content rendered in `<details>` with the first item open (`src/components/sections.tsx:13-30`).
- **Status:** Google's FAQPage documentation notes the feature "will no longer appear in Google Search starting May 7, 2026", and the rich-result documentation was removed in June 2026. Before that it had been limited since 2023 to well-known government and health sites.
- **Recommendation:** No change required. The markup is valid Schema.org and other consumers may still parse it, but it will not produce a Google rich result. **Do not add more FAQ sections expecting one.** Keep FAQs only where they answer real client questions, as they currently do.

#### L-01. Training crawlers allowed (a choice, not a defect)

- **Evidence:** `src/app/robots.ts:7` allows all user agents. That includes search crawlers (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot) and training crawlers (GPTBot, and Google-Extended, which is a control token rather than a separate crawler).
- **Facts (official docs):**
  - OpenAI: OAI-SearchBot "is used to surface websites in search results in ChatGPT's search features". GPTBot is for training. The two are independent settings. ChatGPT-User is user-initiated, and robots.txt "may not apply".
  - Perplexity: PerplexityBot powers search results and is "not used to crawl content for AI foundation models". Perplexity-User "generally ignores robots.txt rules".
- **Severity:** Info · **Recommendation:** Allowing everything is reasonable for a portfolio that wants maximum exposure. If you prefer not to contribute to model training while staying visible in AI search, add `User-agent: GPTBot` / `Disallow: /` (and similar for other training-only agents) and keep the search agents allowed. Either way, write the decision down.

#### L-02. Firewall or bot protection may block real crawlers

- **Evidence:** On the live site, Googlebot, bingbot, OAI-SearchBot, GPTBot, PerplexityBot, ClaudeBot and a Chrome user agent all got `200` and identical 151,934-byte HTML for `/about`. There is **no user-agent-based blocking or cloaking.** Vercel's firewall can also act on verified bot identity or IP reputation (bot-protection and AI-bot managed rules), and a spoofed user agent from a normal IP cannot test that.
- **Severity:** Low · **Confidence:** Unverified (IP-based behaviour)
- **Fix:** In Vercel → Firewall, confirm any bot-protection or AI-bot rule is off or set to allow the crawlers you want. After a few days, check firewall events and logs for challenges against real Googlebot, Bingbot, OAI-SearchBot or PerplexityBot traffic.

#### C-01. Topical depth gaps against claimed skills

- **Evidence:**
  - `skillMap` claims "Auth & security: Sign-up & login, Role-based access, Input validation", "Databases: Data modeling, Indexing" and "Deployment & tools: Environment config".
  - Services claim APIs, authentication, deployment and Core Web Vitals work.
  - Only the Staffvertex article and case study contain engineering detail (data model, offline sync). No page covers authentication or authorization, roles, multi-tenancy, API design, or deployment.
- **Severity:** Medium · **Confidence:** Confirmed
- **Fix:** See Section E, P2, for grounded topic suggestions with search intent.

---

### Positive findings (implemented correctly; keep)

| Area | Evidence |
| --- | --- |
| Static rendering | All 60 outputs prerendered (`○`/`●`). All content is in the HTML. No content depends on client JS. |
| Filters keep content crawlable | `ProjectFilter` and `BlogFilter` only toggle `hidden`. Every item is in the server HTML (`src/components/ProjectFilter.tsx:19-24`, `BlogFilter.tsx:20-26`). No filter URL parameters, so no duplicate URLs. |
| Unique metadata | 26 indexable pages, 0 duplicate titles, 0 duplicate descriptions. Titles 42–65 characters. |
| Canonicals | Self-referencing on every page via `pageMetadata()` (`src/lib/seo.tsx:48`) |
| Status codes | 200 on every sitemap URL. 404 plus `noindex` on unknown paths (`src/app/not-found.tsx`). 308 trailing-slash normalisation. 308 permanent redirect for the old misspelled slug (`next.config.ts`). |
| Headings | Exactly one H1 per page. Sections use `aria-labelledby` headings. Landmarks: `header`, `nav`, `main#main`, `footer`, skip link. |
| Sitemap | Covers all 26 indexable URLs plus image entries, referenced from robots.txt |
| Open Graph / Twitter | Complete on every page, with per-route 1200×630 images. `og:type` is `profile` on About and `article` on posts and projects, with `article:published_time`/`modified_time`/`author`. |
| JSON-LD architecture | One `@graph` per page with stable `@id`s (`#person`, `#website`, `#webpage`, `#breadcrumb`, `#article`). `<` is escaped. `ProfilePage` with `mainEntity` Person on About. Complete `BlogPosting`. **Schema.org Validator: 0 errors on 9 live pages.** |
| Lighthouse (live, mobile) | SEO 100, Accessibility 100, Best Practices 100 on `/`, `/projects/staffvertex` and a blog post |
| Live HTTPS and redirects | `http://` → `https://` 308. HSTS. Production canonicals and sitemap on the live hostname. |
| Honest attribution in visible copy | "My work here was SEO, not the design", "Taken from the live site, checked October 2026", the offline project is marked "No longer online", and the Staffvertex desktop app is credited as a separate project |
| Authorship | Article byline links `/about` with `rel="author"`. The author box shows the published date and the updated date when they differ. |
| Webmaster verification hooks | `verification.google` and `msvalidate.01` from env vars (`src/app/layout.tsx:31-34`) |
| Security headers | HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`. `poweredByHeader: false`. |
| Language | `<html lang="en">`, `og:locale` `en_US`. Single-language site, so hreflang is not applicable. |
| Mobile | No horizontal overflow at 390 px on 8 key pages. Viewport meta and theme-color set. |
| llms.txt | Generated from the same content source, so it can't drift from the site |

---

## D. Missing requirements checklist

Legend: ✅ implemented · 🟡 partial · ❌ missing · ➖ not applicable · ❔ externally unverifiable

### Technical SEO

| Item | Status | Note |
| --- | --- | --- |
| Live HTTPS deployment | ✅ | `osama-s-porfolio-beige.vercel.app` |
| Stable, name-based domain | 🟡 | Unbranded `vercel.app` subdomain (T-01) |
| Pages indexed in Google / Bing | ❌ / ❔ | None found in public `site:` searches (T-14) |
| Production site URL correct | ✅ | Via `VERCEL_PROJECT_PRODUCTION_URL`. `NEXT_PUBLIC_SITE_URL` not set explicitly, and there is no guard (T-02). |
| Unique titles | ✅ | |
| Unique, complete descriptions | 🟡 | T-03 |
| Self-referencing canonicals | ✅ | Correct once the domain is set |
| robots.txt | ✅ | Remove `Host` (T-05) |
| XML sitemap with images | ✅ | `lastmod` accuracy 🟡 (T-04) |
| 404 handling, redirects | ✅ | |
| One H1 per page, semantic landmarks | ✅ | |
| Descriptive alt on content images | 🟡 | T-08 |
| Open Graph / Twitter cards | ✅ | |
| Mobile layout | ✅ | No overflow at 390 px |
| Core Web Vitals (lab) | 🟡 | Lighthouse mobile LCP 2.7–3.4 s (T-11, T-15) |
| Core Web Vitals (field) | ❔ | No CrUX data yet |
| Mixed content | ✅ | No `http://` assets in source (other than the localhost fallback) |
| Pagination | ➖ | 5 posts, no pagination |
| Filter URLs | ➖ | Client-side only, no params |
| hreflang / international | ➖ | English only |
| Google Search Console verified, sitemap submitted | ❔ | |
| Bing Webmaster Tools verified | ❔ | |

### GEO / AEO

| Item | Status | Note |
| --- | --- | --- |
| Content in rendered HTML | ✅ | |
| Visible identity statement on home page | ❌ | G-02 |
| Consistent specialization backed by evidence | 🟡 | G-01 |
| Technical detail in case studies | 🟡 | Staffvertex only (G-04) |
| Original, first-hand articles | ✅ | 5 posts, 1,400–1,900 words of main content |
| External citations for factual claims | ❌ | G-06 |
| FAQs that answer real questions | ✅ | |
| FAQPage markup | ✅ | Valid, but no Google rich result (S-07) |
| Internal links between related content | ✅ | Project ↔ service ↔ article links throughout |

### E-E-A-T

| Item | Status | Note |
| --- | --- | --- |
| Professional bio | ✅ | About page |
| Work history with dates | ✅ | |
| Verifiable experience | 🟡 | Employer corroborated by staffvertex.com; the rest ❔ |
| Personal contribution per project | ✅ | |
| Metrics with context | ❌ | E-01 |
| Public code / demos | ❌ | E-02 |
| Testimonials / references | ❌ | Correctly not fabricated (E-04) |
| Résumé | ❌ | E-03 |
| Article author, dates | ✅ | |
| Privacy notice | ❌ | E-05 |

### Structured data

| Type | Status | Note |
| --- | --- | --- |
| `Person` | ✅ | Fix image dimensions (S-05) |
| `ProfilePage` | ✅ | `/about` |
| `WebSite` | ✅ | |
| `WebPage` / `CollectionPage` / `ContactPage` / `ItemPage` | 🟡 | `about` and `dateModified` (S-03, S-04) |
| `BlogPosting` | ✅ | |
| `Blog` | ✅ | |
| `BreadcrumbList` | ✅ | |
| `Service` + `OfferCatalog` | ✅ | Valid Schema.org. Google has no Service rich result. |
| `CreativeWork` (projects) | 🟡 | `creator` accuracy (S-01) |
| `FAQPage` | ✅ | No Google rich result since May 2026 |
| `Organization` (employer) | 🟡 | Name only (S-06) |
| `Organization` (as site owner) | ➖ | No business entity represented; Person is the right publisher |
| `SearchAction` / sitelinks search box | ➖ | Not useful for a 26-page site |

### LLMO / AI crawlers

| Item | Status | Note |
| --- | --- | --- |
| OAI-SearchBot, PerplexityBot, Googlebot, Bingbot allowed | ✅ | |
| Deliberate training-crawler policy | 🟡 | L-01 |
| No user-agent-based blocking | ✅ | 6 crawler UAs, identical 200 responses (live) |
| Firewall / bot protection not blocking real crawler IPs | ❔ | L-02 |
| llms.txt | ✅ | Optional (see Section G). Live and on the production hostname. |
| Live 200 responses to crawlers | ✅ | |

### External identity

| Item | Status | Note |
| --- | --- | --- |
| GitHub name, bio, website | ❌ | X-01 |
| GitHub repo homepage points to a live URL | ❌ | Points to `osama-s-porfolio.vercel.app` (`DEPLOYMENT_NOT_FOUND`), not the live `-beige` URL |
| LinkedIn headline, experience and website consistent | ❔ | Login wall; check manually |
| Instagram / Facebook are professional and consistent | ❔ | Listed in `sameAs`; keep them only if they present the same professional identity |
| Third-party mentions | ❌ / ❔ | None found; absence isn't proof |

---

## E. Prioritized remediation plan

Effort estimates assume familiarity with this codebase.

### P0. Critical indexing blockers

| # | Task | Effort | Depends on | Files / place | Expected benefit |
| --- | --- | --- | --- | --- | --- |
| P0-1 | Decide the permanent domain **now**. If you'll have a custom domain, add it as primary in Vercel (the `vercel.app` URL then redirects to it). Set `NEXT_PUBLIC_SITE_URL` explicitly. Update the GitHub repo "Website" field to the live URL **today** either way. | 15 min (GitHub) to 2 h (domain) | Domain purchase / DNS, if adopted | Vercel project settings, DNS, GitHub repo settings | Indexing starts on the final URL. No dead link from GitHub. |
| P0-2 | Verify Google Search Console and Bing Webmaster Tools for the final domain. Submit `/sitemap.xml`. Request indexing for `/`, `/about`, `/projects/staffvertex` and the best article. | 30 min + waiting | P0-1 | Env vars `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_BING_SITE_VERIFICATION`, or DNS verification | Gets the site into the indexes Google's AI features and Copilot draw on, and gives you the only real visibility measurements available |
| P0-3 | Check that Vercel firewall / bot protection does not challenge Googlebot, Bingbot, OAI-SearchBot or PerplexityBot | 15 min | none | Vercel dashboard → Firewall | Rules out a silent IP-based block (the UA test already passed) |

### P1. High-impact improvements

| # | Task | Effort | Depends on | Files | Expected benefit |
| --- | --- | --- | --- | --- | --- |
| P1-1 | Add a visible identity sentence to the home hero. Make "Osama Khattak" the primary name in the profile card. | 30 min | none | `src/app/page.tsx` (hero ~line 96, card line 156) | Direct answer for name queries; aligns visible content with the Person schema |
| P1-2 | Reconcile the MERN positioning with evidence (add real MongoDB/Express usage or adjust the headline) | 1–2 h | Your facts | `src/content/site.ts` (`person.role`, Staffvertex `stack`), case study copy | Specialization claims that survive a recruiter's or an AI's cross-check |
| P1-3 | Add context to or remove each percentage metric | 1–2 h | Your records | `src/content/site.ts:171-221`, service intros (`:682` etc.) | Higher trust; no risk of AI systems repeating claims you can't support |
| P1-4 | Fix the two truncated descriptions | 15 min | none | `src/app/page.tsx:34`, `src/app/projects/page.tsx:9` | Clean snippets on the two most important pages |
| P1-5 | Complete the GitHub profile (name "Osama Khattak", bio, location, website), pin 3–4 repos with READMEs | 1 h | P0-1 | GitHub | Profile consistency; corroborates the `sameAs` link |
| P1-6 | Align LinkedIn headline, experience dates and website link with the site | 30 min | P0-1 | LinkedIn | The strongest external identity signal for a developer |
| P1-7 | Stop fading the hero lede from opacity 0 (use the slide-only `lift`, as H1s do). Check other above-the-fold `.rise` paragraphs. | 20 min | none | `src/app/page.tsx:96`, `src/app/globals.css:320-389` | Home mobile LCP (3.4 s lab) should move toward FCP (about 1.6 s) |
| P1-8 | Make a localhost `siteUrl` loud: warn in every build, fail in CI or Vercel production | 30 min | none | `src/content/site.ts` (near line 9) | Prevents a silent canonical/sitemap failure on any future host change |

### P2. Content, authority and structured-data improvements

| # | Task | Effort | Depends on | Files | Expected benefit |
| --- | --- | --- | --- | --- | --- |
| P2-1 | Expand 3–4 case studies with problem, decisions, constraints and honest outcomes | 1–2 h each | Your project knowledge | `src/content/site.ts` (project fields); possibly new optional fields rendered in `CaseStudy` | Demonstrated experience; citable detail |
| P2-2 | Explain Staffvertex multi-tenancy and roles (only what you worked on) | 1 h | Facts | `staffvertexStory` in `site.ts` | Backs a headline claim |
| P2-3 | Fix `CreativeWork.creator` → `contributor`; Staffvertex creator → Alphinex | 30 min | none | `src/lib/seo.tsx:221-233`, maybe a `credit` field on `Project` | Markup that matches visible copy |
| P2-4 | Per-page `dateModified` and `about` in `webPageNode`; correct portrait dimensions; employer URL | 45 min | Alphinex URL from you | `src/lib/seo.tsx:136,141,179-193` and callers | Consistent, accurate graph |
| P2-5 | Add primary-source citations to the 5 articles | 1–2 h | none | `src/content/blog/*.tsx` | Verifiable claims; clearer separation of experience from general fact |
| P2-6 | Publish a résumé (PDF or HTML) | 1 h | none | `public/`, `person.resume` | Removes friction for hiring teams |
| P2-7 | Short privacy page linked from the form and footer | 30 min | none | new `src/app/privacy/page.tsx`, `Footer.tsx`, `ContactForm.tsx` | Trust, compliance for EU/UK enquiries |
| P2-8 | Write grounded articles (see the table below), 1 per 2–4 weeks | 4–6 h each | Facts | `src/content/blog/` | Topical depth in the areas you sell |
| P2-9 | Collect genuine references (LinkedIn recommendations, permitted client quotes, footer credits) | Ongoing | Clients/colleagues | Off-site, then the site | Third-party corroboration |

**Grounded topic suggestions.** Write only those you can support with real work.

| Topic (working title) | Search intent | Evidence it draws on | Links to |
| --- | --- | --- | --- |
| "How I keep tenants separate in a multi-tenant SaaS API" | Developers and founders evaluating SaaS architecture; hiring managers checking depth | Staffvertex APIs (only what you built) | `/projects/staffvertex`, `/services/mern-stack-development` |
| "Roles and permissions for team apps: admin, manager, member" | "role based access control node express", "SaaS permissions design" | Staffvertex, `skillMap` auth claims | Same, plus `/services/nextjs-development` |
| "Designing a sync API that never loses a minute" (idempotent batches, late data) | Engineers building offline-first or sync features | Already partly in the Hubstaff article; deepen the API side | `/blog/build-time-tracking-app-like-hubstaff`, Staffvertex |
| "Rebuilding my portfolio in Next.js 16 for search: what I changed and why" | "Next.js SEO", "Next.js portfolio SEO"; also proves Next.js depth | This repository (Bootstrap template → static Next.js, metadata, JSON-LD, OG images, llms.txt) | `/services/nextjs-development`, `/services/seo-services`, GitHub repo |
| "MERN or Next.js for your SaaS? How I choose" | Founders choosing a stack (commercial investigation) | The existing service FAQ answer, expanded with Staffvertex reasoning | `/services/mern-stack-development`, `/services/nextjs-development` |

Missing service page to **consider only if it is a genuine offer:** "SaaS development". The home page already sells "SaaS product development" but links to the case study (`src/app/page.tsx:47`). The intent ("hire SaaS developer") differs from "MERN stack development".

### P3. Optional experiments and lower priority

| # | Task | Effort | Note |
| --- | --- | --- | --- |
| P3-1 | Space before `<br />` in H1s | 10 min | `blog/page.tsx`, `about/page.tsx`, `contact/page.tsx` |
| P3-2 | Rename legacy screenshots, delete `sv.webp`, move `.webp.json` sidecars out of `public/` | 30 min | Update references in `site.ts` |
| P3-3 | Lighter canonical portrait (JPEG/WebP) | 15 min | `public/`, `person.portrait` |
| P3-4 | Per-project/service `lastmod`; drop the `Host` line | 30 min | `sitemap.ts`, `robots.ts` |
| P3-5 | Per-post OG image alt | 15 min | `blog/[slug]/opengraph-image.tsx` |
| P3-6 | Decide and document the training-crawler policy (GPTBot etc.) | 10 min | `robots.ts` |
| P3-7 | IndexNow ping on deploy (Bing, Yandex) | 1 h | Optional; Bing Webmaster Tools also accepts sitemap submission |
| P3-8 | Update README drift | 10 min | `README.md` |
| P3-9 | `fetchPriority="high"` instead of `preload` on single-LCP hero images | 20 min | T-16, per Next 16 `Image` docs |
| P3-10 | Accessible names that start with the visible link text | 15 min | A-01, `src/app/page.tsx:345` |
| P3-11 | Remove the duplicate `robots` from `not-found.tsx` | 5 min | T-17 |

---

## F. Validation plan

In the commands below, `<domain>` is currently `osama-s-porfolio-beige.vercel.app`. Use the custom domain instead if you adopt one (P0-1).

### 1. Build and code checks (local)

```bash
npx tsc --noEmit
npx eslint src            # scope to app code; .claude/skills scripts produce unrelated warnings
npx next build            # expect every route ○ or ●
```

### 2. Run a production server with the real domain

```bash
NEXT_PUBLIC_SITE_URL=https://<your-domain> npx next build
npx next start -p 3100
curl -s http://localhost:3100/robots.txt
curl -s http://localhost:3100/sitemap.xml | grep -c localhost        # expect 0
curl -s http://localhost:3100/llms.txt | head -20
```

### 3. Rendered HTML checks (local or live)

The audit script used here lives in the session scratchpad. Equivalent manual checks:

```bash
# Title, description, canonical, robots for one page
curl -s https://<domain>/ | grep -o -E '<title>[^<]*</title>|<meta name="description"[^>]*>|<link rel="canonical"[^>]*>|<meta name="robots"[^>]*>'
# Identity sentence present in home main content (after P1-1)
curl -s https://<domain>/ | grep -c "Osama Khattak is"
# JSON-LD parses
curl -s https://<domain>/about | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{for(const m of s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){const g=JSON.parse(m[1]);console.log(g["@graph"].map(n=>n["@type"]).join(", "))}})'
```

### 4. Status codes and redirects (live)

```bash
for p in / /about /contact /projects /services /blog /projects/staffvertex /blog/hire-mern-stack-developer /nope /projects/networkustaad /about/; do
  printf "%s -> " "$p"; curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" "https://<domain>$p"; done
# Expect 200s, 404 for /nope, 308 for the two redirects
curl -sI http://<domain>/ | head -3        # expect a redirect to https
curl -sI https://www.<domain>/ | head -3   # expect a redirect to the canonical host (or the reverse)
```

### 5. Crawler user-agent checks (live)

```bash
for ua in "Googlebot/2.1 (+http://www.google.com/bot.html)" "bingbot/2.0" "OAI-SearchBot/1.0; +https://openai.com/searchbot" "PerplexityBot/1.0" "GPTBot/1.1"; do
  printf "%-40s " "$ua"; curl -s -A "Mozilla/5.0 (compatible; $ua)" -o /dev/null -w "%{http_code} %{size_download}B\n" https://<domain>/about; done
```

Expect 200 and the same size for all. This only detects user-agent-based blocking. Real crawlers come from published IP ranges, so also check **Vercel → Firewall → events** for challenged or blocked bot traffic after a few days.

### 6. Structured data

- **Schema.org Validator:** https://validator.schema.org/ → paste each live URL: `/`, `/about`, `/projects/staffvertex`, `/services/mern-stack-development`, `/blog/build-time-tracking-app-like-hubstaff`. Expect 0 errors.
- **Google Rich Results Test:** https://search.google.com/test/rich-results → the same URLs. Expected eligible types: Breadcrumbs, Article (posts), Profile page (`/about`). **FAQ will not appear**, because Google retired it in May 2026. That is expected, not a failure.
- Check that the `ProfilePage` result shows the Person with the correct name and image.

### 7. Search Console and Bing (after P0-1 and P0-3)

1. Google Search Console → add a **Domain** property → verify via DNS TXT (or set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and redeploy).
2. Sitemaps → submit `https://<domain>/sitemap.xml` → status "Success", 26 discovered URLs.
3. URL Inspection → `/` → "Test live URL" → check the rendered HTML includes the identity sentence and the JSON-LD → "Request indexing". Repeat for `/about` and `/projects/staffvertex`.
4. After 1–4 weeks: Pages report (indexed vs not, with reasons), Performance report (queries containing your name; "MERN stack developer" variants), Enhancements (Breadcrumbs, Profile page).
5. Bing Webmaster Tools → import from Search Console, or verify with `msvalidate.01` → submit the sitemap → URL Inspection on `/`. Bing's index also feeds Microsoft Copilot answers.

### 8. Performance (field and lab)

- PageSpeed Insights (https://pagespeed.web.dev/) on `/`, `/projects/staffvertex`, `/blog/build-time-tracking-app-like-hubstaff`, mobile and desktop. Field data appears only once CrUX has enough traffic, so a "no data" result for a new site is normal.
- Search Console → Core Web Vitals report, once populated.

### 9. AI visibility (measure, don't assume)

Run these queries monthly after indexing and record the results. Expect them to vary by platform and over time:

- ChatGPT (search enabled), Perplexity, Google AI Mode / AI Overviews, Microsoft Copilot:
  - "Who is Osama Khattak developer Islamabad?"
  - "Osama Khattak Staffvertex"
  - "MERN stack developer in Islamabad for hire"
  - "How to build a time tracking app like Hubstaff"
- Record whether the site is cited, which page, and whether the facts are correct. A crawler visit in the logs does **not** mean a page is indexed or cited.

### 10. External profiles (manual)

- GitHub: name, bio, location, website set. Repo homepage loads (200).
- LinkedIn: headline matches the site's headline; experience entries match `roles` in `src/content/site.ts` (titles, organizations, month/year); website link points to the domain.
- Search `"Osama Khattak"` plus `Staffvertex` / `Alphinex` in Google and Bing every few months to track third-party mentions.

---

## G. Final verdict

### 1. What is preventing the portfolio from being discovered or understood?

**Discovery:**
- The site is live and technically crawlable, but no indexed pages were found, and Search Console and Bing Webmaster Tools have not been set up.
- It sits on an unbranded `vercel.app` hostname.
- Almost nothing links to it. The one obvious link, on the GitHub repo, points at a dead deployment.

Search engines and AI search tools can only cite what they have discovered and indexed.

**Understanding:**
- The home page never says in plain text who Osama Khattak is.
- The headline specialization (MERN) isn't backed by any project's stated stack.
- Several key claims (multi-tenant SaaS, percentage outcomes) have no supporting detail.
- Off-site, the GitHub profile has no name or link back, and no third-party page was found that ties the name to the work.

### 2. What is already implemented correctly?

Most of the technical foundation:
- fully static, crawlable HTML
- unique titles, descriptions and canonicals on all 26 pages
- correct robots, sitemap, 404 and redirects
- complete Open Graph tags with per-page images
- a single, well-linked JSON-LD graph with Person, ProfilePage, WebSite, BlogPosting and BreadcrumbList
- filters that keep all content in the HTML
- an `llms.txt` generated from the same source as the site
- honest scope notes on projects
- five long, first-hand articles with authorship and dates

These need no rework, only the fixes listed.

### 3. What is missing?

- Indexing, webmaster-tool verification, and a final (ideally name-based) domain
- A working link from GitHub
- A faster mobile LCP on the home page
- A build guard against the localhost fallback
- A visible identity sentence on the home page
- Evidence for the MERN claim
- Context for metrics
- Deeper case studies
- External citations in articles
- A résumé
- A privacy notice
- Public code links
- A complete GitHub profile
- Third-party references

### 4. Which fixes should be implemented first?

1. P0-1 to P0-3: fix the GitHub link today, settle the final domain, verify Search Console and Bing, submit the sitemap and request indexing, check the firewall.
2. P1-1 (identity sentence), P1-4 (truncated descriptions), P1-7 (hero LCP fade). All are small code changes.
3. P1-2 and P1-3: make the positioning and metrics match what you can prove.
4. P1-5 and P1-6: GitHub and LinkedIn consistency.

Then P2 content work, steadily.

### 5. What can only be verified through external tools?

- Indexing and coverage (Google Search Console, Bing Webmaster Tools). Public `site:` searches are only a rough signal.
- Rich-result eligibility on live URLs (Rich Results Test, a browser tool). Schema.org validity is already confirmed.
- Field Core Web Vitals (PageSpeed Insights / CrUX, once there is real traffic)
- Firewall or bot-protection behaviour toward real crawler IPs (Vercel dashboard)
- LinkedIn content
- Whether and how AI search products cite the site (manual queries over time)

### 6. What should you avoid wasting time on?

- **Adding more FAQPage markup for Google rich results.** Google stopped showing them on May 7, 2026.
- **Treating `llms.txt` as a ranking or discovery factor.** Google states there are no special files, AI text files or schema needed for AI Overviews or AI Mode. The current generated file costs nothing to keep. Don't invest further in it.
- **The `keywords` meta tag** (`src/lib/seo.tsx:47`). Google ignores it. Leave it or remove it; don't tune it.
- **`changefreq`, `priority` and the robots `Host` line.** Ignored by Google.
- **More service or blog pages without new evidence behind them.** Thin pages dilute the strong ones.
- **Any manipulation:** hidden text, keyword stuffing, cloaking content for AI user agents, fabricated testimonials, metrics or mentions. These risk penalties and damage the trust signals this site is built on.
- **Chasing a perfect lab Lighthouse score.** Local lab numbers are already good. Real-user field data is what to watch.

---

## H. Remediation log

### 2026-10-26: code fixes (not yet deployed)

Verified on a local production build with `NEXT_PUBLIC_SITE_URL` set to the live URL: `tsc` clean, ESLint clean on `src` and `next.config.ts`, 60/60 pages generated with no warnings.

| Finding | Change | Verification |
| --- | --- | --- |
| G-02 | The home hero now opens "I'm Osama Khattak, a full-stack Next.js and MERN developer in Islamabad, Pakistan. At Alphinex Solutions I build and maintain Staffvertex…". The profile card shows "Osama Khattak" as the primary name (`src/app/page.tsx`). | Home `<main>` text now contains "Osama Khattak" |
| T-03 | Rewrote the home and `/projects` descriptions (156 and 143 characters). `clip()` now logs a build warning whenever it has to cut (`src/lib/seo.tsx`). The warning immediately caught a third over-long description on `/contact` (162 characters, rewritten). | Rendered descriptions end on complete phrases. The build prints no clip warnings. |
| T-15 | `p.rise` now uses the slide-only `lift` animation, like `h1.rise` (`src/app/globals.css`) | Lighthouse trace (Chrome 153), home mobile: observed FCP→LCP gap **550 ms before → 0 ms after**. Lighthouse's *simulated* LCP did not drop in local runs: its model attributes the remaining render delay to main-thread work (Style & Layout, T-11). A throttled Playwright A/B on the same build showed no difference beyond run-to-run noise. **Re-check Lighthouse/PSI on the live site after deploying.** |
| T-16 | Case-study hero image uses `loading="eager" fetchPriority="high"` instead of `preload`, per the Next 16 `Image` docs. `fetchPriority` alone would leave Next's default `loading="lazy"`. | Rendered `<img>` has `loading="eager"` and `fetchPriority="high"` |
| T-02 | `next.config.ts` exports a phase function. On `next build`, if `siteUrl` resolves to localhost it warns, and throws when `CI` or `VERCEL` is set. It imports `siteUrl` from `site.ts`, so the check uses the same resolution logic. | `CI=1 next build` with no URL fails with the message. A plain local build warns. A build with the URL is silent. |
| S-01 | Projects use `contributor: Person`. Only `inHouse` projects (new field; set on Staffvertex) get `creator: Alphinex`. | Staffvertex: creator `#employer`, contributor `#person`. NetworkUstad: contributor only. |
| S-03 / S-04 | `webPageNode` no longer adds `about: Person` by default (the home page still passes it). It takes a per-page `modified` date, and blog posts pass `post.updated`. | Post WebPage and BlogPosting `dateModified` now match |
| S-05 | Portrait `ImageObject` 432×432 → 800×800 | Matches `public/osama.png` |
| T-05 | Removed `host` from `robots.ts` | `robots.txt` has only `User-agent`, `Allow` and `Sitemap` |
| T-07 | `{" "}` before `<br />` in the About, Contact and Writing H1s | Text extraction: "About Osama Khattak.", "Let's build something.", "Notes from the work." |
| A-01 | Project-index external links: `aria-label="executivesdiary.com: visit ExecutivesDiary (opens in a new tab)"` | The label now starts with the visible text |
| T-13 | README: removed `FAQPage` from the `/` row, replaced the outdated portrait note, documented the build guard | |
| T-17 | **Not changed.** Removing `robots` from `not-found.tsx` made the 404 inherit the layout's `index, follow` next to Next's automatic `noindex`. That conflict is worse than the harmless duplicate, so it was restored, with a comment explaining why. | 404 shows `noindex` + `noindex, follow` again |

**Status updates from the owner:** Google Search Console is verified (the `google-site-verification` meta tag is live).

**Deployed** as commit `48ea61f` (live about 40 s after the push). Live checks confirmed: new descriptions, the identity sentence, `robots.txt` without `Host`, Staffvertex `creator` = Alphinex with Osama as `contributor`, and 404 still returns 404. Lighthouse mobile on the live home page, two runs: performance 87 / 82, simulated LCP 2.8 s / 3.3 s (was 83 and 3.4 s in one run before). Observed FCP equals observed LCP in both runs (the gap was 550 ms before). The simulated score varies by about ±5 between runs, so treat the score change as within noise. The confirmed effect is that the LCP element now paints on first paint.

### 2026-10-26: external accounts

| Finding | Change | Verification |
| --- | --- | --- |
| T-14 (Bing) | The site was already added and verified in Bing Webmaster Tools. All 26 sitemap URLs were submitted with URL Submission (quota 100/day). **Sitemap submission failed three times** with Bing's "An unexpected error occurred on the server side"; Bing's banner says new-site data can take up to 48 hours to process. `robots.txt` already advertises the sitemap. | The URL Submission list shows the URLs "Submitted today at 21:05". **Retry the sitemap in Bing → Sitemaps in a day or two.** |
| X-01 / T-01 (GitHub) | Profile: name "Osama Khattak"; bio "Full-stack Next.js / MERN developer at Alphinex Solutions, building Staffvertex. Islamabad, Pakistan."; website = live URL; company "Alphinex Solutions"; location "Islamabad, Pakistan"; LinkedIn added as a social link. Repo: website changed from the dead `osama-s-porfolio.vercel.app` to the live URL, and a description added. Public email and pronouns were left unset. | `api.github.com/users/osamaKhattakAlphinex` returns the new name, bio, blog, company and location. `gh repo view` shows the new `homepageUrl` and description. |

### 2026-10-26: content (G-01, G-04, E-02)

- **NexIntern case study** (`/projects/nexintern`), the owner's solo final-year project. Every fact comes from the repo (`osamaKhattakAlphinex/FYP`) and the live site.
  - **Stack:** Next.js + Express/Node.js + **MySQL** (Sequelize) + a FastAPI AI service. The case study states the stack honestly; it is not presented as MongoDB.
  - **Migration story:** the switch from MongoDB to MySQL at the supervisor's request, confirmed by the 2026-05-11 "db changed" commit.
  - **Proof note:** a `proofNote` on the MERN service page says the same thing.
  - **Status:** Module 13 (document verification) is still pending per the repo, so the outcome says "twelve modules are complete".
  - **Screenshots:** cropped to the "How it works" section, because the FYP landing page shows placeholder statistics, testimonials and a "Trusted by" strip naming real organisations.
- **Timbera** gained a "How the build went" story (brief, approach, timeline, result) from the owner's answers.
- **G-01 status:** partly addressed. Express, Node.js and React are now evidenced by a public repo. MongoDB is evidenced only historically.
- **E-02:** FYP is pinned on GitHub, with a rewritten README, a description and topics.

**Still to do by hand:** pin 3–4 representative repos with READMEs (your choice of which); align LinkedIn's headline and website link with the site.

**Still open:**
- **Needs your facts or content:** G-01 (MERN evidence), E-01 (metric context), G-04/G-05 (case-study depth, multi-tenancy), G-06 (citations), E-02/E-03 (repos, résumé), E-05 (privacy page), S-06 (Alphinex URL)
- **Needs external accounts:** T-01 (GitHub repo link, domain decision), T-14 (Bing, indexing requests), X-01 (GitHub profile), L-02 (firewall)
- **Deliberately skipped:** T-12 (per-post OG alt would need `generateImageMetadata`, which changes OG image URLs; low value), T-08 (asset renames), T-04 (needs real per-page dates)

### Sources consulted

- OpenAI, *Overview of OpenAI Crawlers*: https://developers.openai.com/api/docs/bots
- Google Search Central, *AI features and your website*: https://developers.google.com/search/docs/appearance/ai-features
- Google Search Central, *FAQ (FAQPage) structured data* (deprecation notice and changelog): https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Perplexity, *Perplexity Crawlers*: https://docs.perplexity.ai/guides/bots
- Not re-fetched during this audit (general knowledge; check before relying on details): Microsoft Bing Webmaster Guidelines and IndexNow, Anthropic's crawler documentation, Vercel firewall bot-protection settings.
