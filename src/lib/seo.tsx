import type { Metadata } from "next";
import {
  contentUpdated,
  education,
  faqs as generalFaqs,
  person,
  roles,
  siteUrl,
  skillGroups,
  socials,
  type Project,
  type Service,
} from "@/content/site";

export const siteName = `${person.name} | ${person.role}`;
export const url = (path = "/") => new URL(path, `${siteUrl}/`).toString().replace(/\/$/, "") || siteUrl;

// ---------- Metadata ----------

type PageMeta = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** Skip the " | Osama Khattak" suffix (home page). */
  absoluteTitle?: boolean;
  type?: "website" | "profile" | "article";
  noindex?: boolean;
};

/**
 * Next merges metadata shallowly, so a page that sets openGraph replaces the layout's openGraph whole.
 * Every page goes through here to get the complete set. Share images come from each route's opengraph-image.
 */
/** Keep descriptions inside the ~160 characters Google shows, cutting at a word boundary. */
const clip = (text: string, max = 160) => (text.length <= max ? text : `${text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,.;:]$/, "")}.`);

export function pageMetadata({ title, description: rawDescription, path, keywords = [], absoluteTitle, type = "website", noindex }: PageMeta): Metadata {
  const description = clip(rawDescription);
  const fullTitle = absoluteTitle ? title : `${title} | ${person.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [...keywords, person.name, "MERN stack developer", "Next.js developer", `web developer ${person.country}`],
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName,
      locale: "en_US",
      title: fullTitle,
      description,
      ...(type === "profile" ? { firstName: "Osama", lastName: "Khattak", username: "osamaKhattakAlphinex" } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

// ---------- JSON-LD ----------

type Node = Record<string, unknown>;

const ids = {
  person: `${siteUrl}/#person`,
  website: `${siteUrl}/#website`,
  employer: `${siteUrl}/#employer`,
  school: `${siteUrl}/#school`,
  portrait: `${siteUrl}/#portrait`,
};

const knowsAbout = [
  "MERN stack",
  "MongoDB",
  "Express.js",
  "React",
  "Node.js",
  "Next.js",
  "JavaScript",
  "REST APIs",
  "Full-stack web development",
  "Search engine optimization",
  "Technical SEO",
  "WordPress",
  "WooCommerce",
  "Tailwind CSS",
  "UI/UX design",
  "Figma",
];

const current = roles.at(-1)!;

export const personNode: Node = {
  "@type": "Person",
  "@id": ids.person,
  name: person.name,
  alternateName: person.fullName,
  givenName: "Osama",
  familyName: "Khattak",
  jobTitle: person.role,
  description: `${person.name} is a MERN stack and Next.js developer based in ${person.city}, ${person.country}, building fast, search-ready web applications for clients worldwide since ${person.since}.`,
  url: siteUrl,
  image: { "@id": ids.portrait },
  email: `mailto:${person.email}`,
  address: { "@type": "PostalAddress", addressLocality: person.city, addressCountry: person.countryCode },
  worksFor: { "@id": ids.employer },
  alumniOf: { "@id": ids.school },
  knowsAbout,
  knowsLanguage: "en",
  hasOccupation: {
    "@type": "Occupation",
    name: person.role,
    occupationLocation: { "@type": "Country", name: person.country },
    skills: skillGroups.flatMap((g) => g.items).join(", "),
  },
  sameAs: socials.map((s) => s.href),
};

const portraitNode: Node = {
  "@type": "ImageObject",
  "@id": ids.portrait,
  url: url(person.portrait),
  contentUrl: url(person.portrait),
  width: 432,
  height: 432,
  caption: `${person.name}, ${person.role}`,
};

const employerNode: Node = { "@type": "Organization", "@id": ids.employer, name: current.org };
const schoolNode: Node = { "@type": "CollegeOrUniversity", "@id": ids.school, name: education.orgFull, url: education.url };

const websiteNode: Node = {
  "@type": "WebSite",
  "@id": ids.website,
  url: siteUrl,
  name: siteName,
  alternateName: `${person.name} Portfolio`,
  description: `Portfolio of ${person.name}, MERN stack and Next.js developer in ${person.city}, ${person.country}.`,
  inLanguage: "en",
  publisher: { "@id": ids.person },
  author: { "@id": ids.person },
};

export type Crumb = { name: string; path: string };

export const breadcrumbNode = (path: string, crumbs: Crumb[]): Node => ({
  "@type": "BreadcrumbList",
  "@id": `${url(path)}#breadcrumb`,
  itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: url(c.path),
  })),
});

type WebPageInput = {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ProfilePage" | "CollectionPage" | "ContactPage" | "ItemPage";
  crumbs?: Crumb[];
  image?: string;
  extra?: Node;
};

export const webPageNode = ({ path, name, description, type = "WebPage", crumbs, image, extra }: WebPageInput): Node => ({
  "@type": type,
  "@id": `${url(path)}#webpage`,
  url: url(path),
  name,
  description,
  inLanguage: "en",
  isPartOf: { "@id": ids.website },
  about: { "@id": ids.person },
  author: { "@id": ids.person },
  dateModified: contentUpdated,
  ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: url(image) } } : {}),
  ...(crumbs ? { breadcrumb: { "@id": `${url(path)}#breadcrumb` } } : {}),
  ...extra,
});

export const faqNode = (path: string, list: { q: string; a: string }[] = generalFaqs): Node => ({
  "@type": "FAQPage",
  "@id": `${url(path)}#faq`,
  mainEntity: list.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const serviceNode = (s: Service): Node => ({
  "@type": "Service",
  "@id": `${url(`/services/${s.slug}`)}#service`,
  name: s.heading,
  serviceType: s.name,
  description: s.metaDescription,
  url: url(`/services/${s.slug}`),
  provider: { "@id": ids.person },
  areaServed: [{ "@type": "Country", name: person.country }, { "@type": "Place", name: "Worldwide" }],
  availableChannel: { "@type": "ServiceChannel", serviceUrl: url("/contact"), availableLanguage: "English" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: s.heading,
    itemListElement: s.deliverables.map((d) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: d.title, description: d.body },
    })),
  },
});

export const projectNode = (p: Project): Node => ({
  "@type": "CreativeWork",
  "@id": `${url(`/projects/${p.slug}`)}#project`,
  name: p.name,
  description: p.summary,
  abstract: p.about,
  genre: p.kind,
  url: url(`/projects/${p.slug}`),
  sameAs: p.href,
  image: url(p.image),
  creator: { "@id": ids.person },
  keywords: [...p.categories, ...p.stack].join(", "),
});

/** One @graph per page: the site-wide entities plus the page's own nodes, cross-linked by @id. */
export function JsonLd({ nodes }: { nodes: Node[] }) {
  const graph = { "@context": "https://schema.org", "@graph": [websiteNode, personNode, portraitNode, employerNode, schoolNode, ...nodes] };
  // Escape "<" so nothing in the data can close the script tag (per the Next.js JSON-LD guide).
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}
