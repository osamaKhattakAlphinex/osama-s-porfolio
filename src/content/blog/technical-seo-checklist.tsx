import type { PostMeta } from "./types";
import { A, Figure, H2, Note } from "@/components/article";

export const meta: PostMeta = {
  slug: "technical-seo-checklist",
  title: "Technical SEO Checklist for Blogs and Content Sites",
  metaTitle: "Technical SEO Checklist for Blogs and Content Sites",
  description:
    "A practical technical SEO checklist for blogs and content sites: crawling, indexing, structure, internal links, structured data, speed and duplicates.",
  focusKeyword: "technical SEO checklist",
  keywords: ["technical SEO checklist", "SEO for blogs", "discovered currently not indexed", "content site SEO", "on-page SEO checklist"],
  category: "SEO",
  published: "2026-10-20",
  updated: "2026-10-20",
  project: "networkustad",
  services: ["seo-services", "nextjs-development"],
  image: "/blog/technical-seo-checklist.webp",
  imageAlt: "NetworkUstad IT certification guides home page in a browser window",
  excerpt:
    "Great articles don't rank if Google can't crawl, understand and trust the site around them. This is the checklist I work through on content sites, starting with the boring parts that matter most.",
  toc: [
    { id: "crawling-indexing", label: "1. Crawling and indexing" },
    { id: "not-indexed", label: "2. When pages are discovered but not indexed" },
    { id: "structure", label: "3. Site structure and topic clusters" },
    { id: "internal-links", label: "4. Internal links" },
    { id: "on-page", label: "5. Titles, descriptions and headings" },
    { id: "structured-data", label: "6. Structured data" },
    { id: "speed", label: "7. Page speed and Core Web Vitals" },
    { id: "duplicates", label: "8. Duplicate and thin content" },
    { id: "links", label: "9. Links from other sites" },
    { id: "monitoring", label: "10. Monitoring" },
  ],
  faqs: [
    {
      q: "What is the difference between technical SEO and on-page SEO?",
      a: "Technical SEO makes sure search engines can crawl, render and index the site: robots rules, sitemaps, speed, canonicals and structured data. On-page SEO is about each page's content: titles, headings, keywords and internal links. Content sites need both.",
    },
    {
      q: "What does 'Discovered - currently not indexed' mean?",
      a: "Google knows the URL exists but hasn't crawled it yet. On new or small sites it usually means Google doesn't yet see enough value to spend crawl time there. Stronger internal links, better content on those pages and links from other sites help.",
    },
    {
      q: "How often should I run a technical SEO audit?",
      a: "Check Search Console weekly for new errors, and run a full audit every few months or after any redesign, migration or change of theme.",
    },
  ],
};

export default function Body() {
  return (
    <>
      <p>
        I started my career in SEO, before I wrote much code. At Nausal Technologies, the work I did on client sites grew their
        traffic by 60%, ranked more than 50 target keywords and lifted organic leads by 35%. Very little of that came from clever
        tricks. Most of it came from fixing the unglamorous technical problems that stop good content from ranking.
      </p>
      <p>
        This is the checklist I work through on blogs and content sites, including{" "}
        <A href="/projects/networkustad">NetworkUstad</A>, an IT certification publication I did SEO for, and{" "}
        <A href="/projects/editorialdiary">EditorialDiary</A>, a multi-topic blog. It&apos;s ordered by impact: if step one is
        broken, nothing after it matters.
      </p>

      <H2 id="crawling-indexing">1. Crawling and indexing</H2>
      <p>Before anything else, confirm Google can reach and store your pages.</p>
      <ul>
        <li>
          <strong>robots.txt</strong> allows the pages you want indexed, and doesn&apos;t block the CSS and JavaScript Google needs
          to render them. Blocking a whole assets folder is a surprisingly common mistake.
        </li>
        <li>
          <strong>An XML sitemap</strong> lists every indexable URL and nothing else: no redirects, no 404s, no pages marked
          noindex. Submit it in Google Search Console.
        </li>
        <li>
          <strong>Every important page returns a 200 status</strong> and has a canonical tag that points to itself.
        </li>
        <li>
          <strong>Noindex is only where you mean it:</strong> thank-you pages, internal search results, thin tag archives. A
          leftover noindex from a staging site can hide an entire website.
        </li>
      </ul>

      <H2 id="not-indexed">2. When pages are discovered but not indexed</H2>
      <p>
        The Page indexing report in Search Console tells you why pages aren&apos;t indexed. The reason that confuses people most is
        &quot;Discovered - currently not indexed&quot;. Google knows the URL exists but hasn&apos;t bothered to crawl it.
      </p>
      <p>
        I saw it on my own portfolio a few weeks after launch: 11 pages indexed, 9 discovered but never crawled, including the
        service page I most wanted to rank. Nothing was technically broken. The site was new, it had no links from elsewhere, and
        several pages were short. Google simply didn&apos;t see enough reason to hurry.
      </p>
      <p>The fixes for that status are rarely technical:</p>
      <ul>
        <li>Make the pages worth crawling. Expand thin pages with real, specific content, or merge them.</li>
        <li>Link to them from pages Google already crawls often, such as your home page and your best-performing articles.</li>
        <li>Earn a few links from other sites, which tells Google the site matters.</li>
        <li>Use URL Inspection to request indexing for the most important pages, then give it time.</li>
      </ul>
      <Note title="Don't panic about it">
        <p>
          Requesting indexing over and over doesn&apos;t help. Improve the pages and the links pointing to them, then wait a week
          or two before checking again.
        </p>
      </Note>

      <H2 id="structure">3. Site structure and topic clusters</H2>
      <p>
        Content sites rank best when related articles are grouped and linked as a cluster: one broad guide, surrounded by detailed
        articles that link back to it.
      </p>
      <p>
        NetworkUstad is a good example. Its CCNA material is split into guides by exam domain, each with its own set of articles,
        so a reader and a search engine can both see how the topics fit together. A random stream of posts on the same subjects
        would rank far worse.
      </p>
      <Figure
        src="/work/networkustad/section.webp"
        alt="NetworkUstad certification study guides for Security+, Network+ and CySA+"
        caption="Study guides grouped by certification: a clear cluster for readers and for Google."
      />
      <p>
        For a multi-topic blog like EditorialDiary, which covers ten categories, the structure question is different: which
        categories deserve real depth? Keyword research answers it. Pick the topics where you can realistically rank, build those
        out properly, and stop spreading effort evenly across everything.
      </p>

      <H2 id="internal-links">4. Internal links</H2>
      <p>Internal links are the cheapest ranking factor you control.</p>
      <ul>
        <li>Link from every new article to two or three older, related ones, and go back and link older articles to the new one.</li>
        <li>Use descriptive anchor text, such as &quot;subnetting cheat sheet&quot;, never &quot;click here&quot;.</li>
        <li>Make sure no important page is an orphan, with no internal links pointing at it.</li>
        <li>Keep important pages within three clicks of the home page.</li>
        <li>Use breadcrumbs, which help users and give search engines the site hierarchy.</li>
      </ul>

      <H2 id="on-page">5. Titles, descriptions and headings</H2>
      <ul>
        <li>One unique title per page, under about 60 characters, with the main keyword near the start.</li>
        <li>A meta description of about 150 to 160 characters that reads like a reason to click.</li>
        <li>Exactly one H1 per page, matching what the page is about.</li>
        <li>H2s and H3s in order, describing sections the way a reader would scan them.</li>
        <li>Descriptive alt text on images, written for someone who can&apos;t see them.</li>
      </ul>
      <p>
        On WordPress sites, an SEO plugin makes these easy to manage at scale. On custom sites, build them into the templates so
        no page ships without them. I set up every new post on <A href="/projects/mindsieves">Mindsieves</A> this way, so it was
        search-ready the moment it was published.
      </p>

      <H2 id="structured-data">6. Structured data</H2>
      <p>
        Structured data, usually JSON-LD, tells search engines what a page is: an article, a breadcrumb trail, a product, a
        person. It can earn richer search results and it helps search engines and AI tools understand your content.
      </p>
      <ul>
        <li>Add Article or BlogPosting markup with the headline, author, dates and image.</li>
        <li>Add BreadcrumbList markup that matches the visible breadcrumbs.</li>
        <li>Add Organization or Person markup once, and link it from everything else.</li>
        <li>Test with Google&apos;s Rich Results Test and the Schema.org validator after every template change.</li>
      </ul>

      <H2 id="speed">7. Page speed and Core Web Vitals</H2>
      <p>
        Speed is a ranking factor, and it matters even more for keeping readers. When I worked on WordPress sites, the fixes that
        helped most were consistent: caching, compressing and resizing images, and cutting the plugin list down. On the HTML and
        CSS builds I did, trimming what each page loaded cut average load time by more than a second.
      </p>
      <ul>
        <li><strong>LCP</strong> (largest contentful paint): serve the main image or headline fast. Preload it, size it properly, and don&apos;t fade it in.</li>
        <li><strong>CLS</strong> (layout shift): give images and ads fixed dimensions so the page doesn&apos;t jump while loading.</li>
        <li><strong>INP</strong> (responsiveness): cut heavy scripts, especially third-party widgets that run on every page.</li>
      </ul>
      <p>
        If you&apos;re building something new, a framework that renders pages on the server, such as{" "}
        <A href="/services/nextjs-development">Next.js</A>, makes good scores far easier to reach and keep.
      </p>

      <H2 id="duplicates">8. Duplicate and thin content</H2>
      <p>Content sites generate duplicate pages without anyone noticing. Check for:</p>
      <ul>
        <li>Tag and date archives that repeat the same posts. Noindex them or remove them.</li>
        <li>The same page available with and without www, or with and without a trailing slash. Pick one and redirect the rest.</li>
        <li>Paginated archives with missing or wrong canonicals.</li>
        <li>Old, thin posts that get no traffic. Update them, merge them into a stronger article, or remove them with a redirect.</li>
      </ul>

      <H2 id="links">9. Links from other sites</H2>
      <p>
        Technical SEO gets a site ready to rank. Links from other sites are what convince Google it deserves to. For a content
        site, the links that work are the ones you earn: original guides people cite, useful tools, data nobody else has
        published. Relevant guest articles and outreach help too. Paying for bulk links from unrelated sites doesn&apos;t, and it
        can get you penalized.
      </p>

      <H2 id="monitoring">10. Monitoring</H2>
      <ul>
        <li>Check Search Console weekly for new indexing errors and drops in impressions.</li>
        <li>Watch which queries are climbing, and give those pages more internal links and fresher content.</li>
        <li>Re-test structured data and speed after every theme, plugin or template change.</li>
        <li>Run a full audit every few months, and always before and after a redesign or migration.</li>
      </ul>
      <p>
        If your content is good but your traffic isn&apos;t, the problem is usually somewhere in steps one to four. That&apos;s
        where my <A href="/services/seo-services">SEO service</A> starts, and because I&apos;m also the developer, the fixes get
        made in the code instead of sitting in a report. <A href="/contact">Send me your site</A> and I&apos;ll tell you what I&apos;d
        look at first.
      </p>
    </>
  );
}
