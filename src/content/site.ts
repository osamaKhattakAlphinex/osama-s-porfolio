// Every fact on the site lives here. Sourced from the previous site (legacy/index.html)
// and confirmed with Osama. Marketing copy for services is written around those facts;
// nothing here invents clients, numbers or testimonials.

/**
 * The live domain. Canonical URLs, the sitemap, Open Graph tags and JSON-LD all resolve against it,
 * so set NEXT_PUBLIC_SITE_URL in production. On Vercel the production URL is picked up automatically.
 */
export const siteUrl =
  toOrigin(process.env.NEXT_PUBLIC_SITE_URL) ??
  toOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  "http://localhost:3000";

/** Accepts "https://example.com", "example.com" or "example.com/"; returns null for blank or unparseable values. */
function toOrigin(value: string | undefined): string | null {
  const raw = value?.trim();
  if (!raw) return null;
  try {
    const parsed = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    // A bare word like "loca" parses as a hostname; require a dot (or localhost) so typos fall through.
    if (!parsed.hostname.includes(".") && parsed.hostname !== "localhost") return null;
    return parsed.origin;
  } catch {
    return null;
  }
}

/** Bump when content changes; feeds sitemap lastModified and JSON-LD dateModified. */
export const contentUpdated = "2026-10-26";

/** Google wants full ISO 8601 date-times with a timezone in structured data (Pakistan, UTC+5). */
export const isoDateTime = (date: string) => `${date}T00:00:00+05:00`;

export const person = {
  name: "Osama Khattak",
  fullName: "M. Osama Ahmad",
  role: "MERN Stack Developer",
  city: "Islamabad",
  country: "Pakistan",
  countryCode: "PK",
  email: "osamakhattak162@gmail.com",
  portrait: "/osama.png",
  employer: "Alphinex Solutions",
  currentTitle: "Full Stack Next.js Developer",
  since: 2021,
  employerSince: "Oct 2024",
  timezone: "UTC+5",
  /** Public path of a résumé PDF in /public. Leave null until one exists: the site then offers to email it instead. */
  resume: null as string | null,
};

export const socials = [
  { label: "GitHub", href: "https://github.com/osamaKhattakAlphinex" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/osama-khattak-253626365/" },
  { label: "Instagram", href: "https://www.instagram.com/osamakhattak162/" },
  { label: "Facebook", href: "https://www.facebook.com/osama.khattak.400334" },
] as const;

export const stats = [
  { value: "3+", label: "Years shipping" },
  { value: "20+", label: "Projects delivered" },
  { value: "10+", label: "Clients served" },
];

// Tools with a logo in StackIcon. Order is the order of the stack strip.
export const stack = [
  "MongoDB",
  "Express",
  "React",
  "Node.js",
  "Next.js",
  "JavaScript",
  "Tailwind CSS",
  "Laravel",
  "WordPress",
  "WooCommerce",
  "Bootstrap",
  "Figma",
  "Git",
  "GitHub",
  "Vercel",
] as const;
export type Tool = (typeof stack)[number];

/** The tools in the home hero's "daily stack" line. */
export const dailyStack: Tool[] = ["React", "Next.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"];

/** Home page skills: grouped by where they sit in a product. Core tools are the ones used daily on production work. */
export const skillMap: { name: string; note: string; items: { label: string; tool?: Tool; core?: boolean }[] }[] = [
  {
    name: "Frontend",
    note: "Responsive, accessible interfaces from reusable components.",
    items: [
      { label: "React", tool: "React", core: true },
      { label: "Next.js", tool: "Next.js", core: true },
      { label: "JavaScript", tool: "JavaScript", core: true },
      { label: "Tailwind CSS", tool: "Tailwind CSS", core: true },
      { label: "Bootstrap", tool: "Bootstrap" },
      { label: "HTML & CSS" },
    ],
  },
  {
    name: "Backend & APIs",
    note: "APIs, server logic and data flows for real products.",
    items: [
      { label: "Node.js", tool: "Node.js", core: true },
      { label: "Express", tool: "Express", core: true },
      { label: "REST APIs", core: true },
      { label: "Laravel", tool: "Laravel" },
    ],
  },
  {
    name: "Databases",
    note: "Schemas and indexes designed around how the app reads data.",
    items: [{ label: "MongoDB", tool: "MongoDB", core: true }, { label: "Data modeling" }, { label: "Indexing" }],
  },
  {
    name: "Auth & security",
    note: "Accounts and role-based access for admins, staff and customers.",
    items: [{ label: "Sign-up & login" }, { label: "Role-based access" }, { label: "Input validation" }],
  },
  {
    name: "Deployment & tools",
    note: "Production builds, environments and a clean handover.",
    items: [
      { label: "Vercel", tool: "Vercel", core: true },
      { label: "Git", tool: "Git", core: true },
      { label: "GitHub", tool: "GitHub", core: true },
      { label: "Environment config" },
    ],
  },
  {
    name: "CMS, SEO & design",
    note: "Content sites, stores and search, designed in Figma first.",
    items: [
      { label: "WordPress", tool: "WordPress" },
      { label: "WooCommerce", tool: "WooCommerce" },
      { label: "Technical SEO" },
      { label: "Structured data" },
      { label: "Figma", tool: "Figma" },
    ],
  },
];

export const skillGroups: { name: string; items: Tool[]; note: string }[] = [
  { name: "Front end", items: ["React", "Next.js", "JavaScript", "Tailwind CSS", "Bootstrap"], note: "Responsive, accessible interfaces built from reusable components." },
  { name: "Back end and data", items: ["Node.js", "Express", "MongoDB", "Laravel"], note: "APIs, authentication and data models for real products." },
  { name: "CMS, design and workflow", items: ["WordPress", "WooCommerce", "Figma", "Git", "GitHub"], note: "Content sites, stores, design files and a clean handover." },
];

// ---------- Experience ----------

export type Role = {
  title: string;
  org: string;
  start: [number, number]; // [year, month 1-12]
  end: [number, number] | "now";
  points: string[];
  tags: string[];
};

// Oldest first.
export const roles: Role[] = [
  {
    title: "SEO Expert",
    org: "Nausal Technologies",
    start: [2021, 1],
    end: [2021, 6],
    tags: ["Technical SEO", "Keyword research", "Analytics"],
    points: [
      "Ran SEO strategies that grew client traffic by 60% and ranked over 50 target keywords.",
      "Keyword research, technical audits and backlink analysis lifted organic leads by 35%.",
      "Sent monthly performance reports and tuned sites against agreed KPIs.",
    ],
  },
  {
    title: "WordPress Developer",
    org: "Nausal Technologies",
    start: [2021, 7],
    end: [2021, 12],
    tags: ["WordPress", "Performance"],
    points: [
      "Built and customized 10+ WordPress sites, raising client satisfaction scores by 40%.",
      "Cut bounce rate by 25% with responsive layouts and usability testing.",
      "Sped sites up with caching, image compression and a leaner plugin set.",
    ],
  },
  {
    title: "HTML, CSS and Bootstrap Developer",
    org: "Nausal Technologies",
    start: [2022, 1],
    end: [2022, 12],
    tags: ["HTML", "CSS", "Bootstrap"],
    points: [
      "Delivered 20+ PSD-to-HTML builds, pixel-accurate and responsive on every device.",
      "Reworked visual design in CSS and Bootstrap, lifting client ratings by 35%.",
      "Trimmed average load time by 1.2 seconds.",
    ],
  },
  {
    title: "React.js Front End Developer",
    org: "CareerBooster.ai",
    start: [2023, 1],
    end: [2024, 10],
    tags: ["React", "JavaScript", "REST APIs"],
    points: [
      "Built responsive React interfaces that increased engagement time by 40%.",
      "Moved the codebase to reusable components, cutting new feature time by 30%.",
      "Worked with the backend team on API usage, reducing page load times by 20%.",
    ],
  },
  {
    title: "Full Stack Next.js Developer",
    org: "Alphinex Solutions",
    start: [2024, 10],
    end: "now",
    tags: ["Next.js", "Node.js", "MongoDB", "React"],
    points: [
      "Leads full-stack Next.js work: 35% faster applications, 40% fewer deployment bugs.",
      "Owns whole projects alone, from design through testing, delivered ahead of deadline.",
      "Applied UI and UX improvements that raised customer satisfaction by 25%.",
      "Builds and maintains Staffvertex: backend APIs, the web app and every release.",
    ],
  },
];

export const education = {
  title: "BS Software Engineering",
  org: "SZABIST",
  orgFull: "Shaheed Zulfikar Ali Bhutto Institute of Science and Technology (SZABIST), Islamabad",
  url: "https://szabist-isb.edu.pk",
  start: [2022, 9] as [number, number],
  end: "now" as const,
};

// ---------- Projects ----------

export type Category = "Full stack" | "Frontend" | "WordPress" | "SEO";

export type Shot = { src: string; alt: string; caption: string; width: number; height: number };

export type Project = {
  slug: string;
  name: string;
  href: string;
  image: string;
  categories: Category[];
  /** One line, used on cards and in meta descriptions. */
  summary: string;
  /** What the product is, for the case-study page. */
  about: string;
  /** What the live site offers, taken from the site itself (checked October 2026). */
  features: string[];
  /** What Osama did on it. */
  work: string[];
  /** Service pages this project is proof for. */
  services: ServiceSlug[];
  /** Only tools confirmed for this project. Leave empty rather than guess. */
  stack: Tool[];
  kind: string;
  /** Osama's part, in a few words, for the case-study fact row. */
  role: string;
  /** Shown under "What I did" when the work was narrower than the site (e.g. SEO only). */
  roleNote?: string;
  /** Extra screenshots for the case-study gallery. */
  gallery: Shot[];
  /** The live site is down; show the project but don't send visitors to it. */
  offline?: boolean;
};

const shots = (slug: string, name: string, what: { home: string; section: string; mobile: string }): Shot[] => [
  { src: `/work/${slug}/home.webp`, alt: `${name} home page on desktop`, caption: what.home, width: 1440, height: 900 },
  { src: `/work/${slug}/section.webp`, alt: `${name} page section on desktop`, caption: what.section, width: 1440, height: 900 },
  { src: `/work/${slug}/mobile.webp`, alt: `${name} home page on a phone`, caption: what.mobile, width: 780, height: 1688 },
];

export const projects: Project[] = [
  {
    slug: "staffvertex",
    name: "Staffvertex",
    href: "https://www.staffvertex.com",
    image: "/work/staffvertex/home.webp",
    categories: ["Full stack"],
    kind: "Time-tracking SaaS",
    role: "Full-stack developer",
    summary: "Time tracking and project management for teams that bill by the hour. I build and maintain its backend APIs and web app, and own its releases.",
    about:
      "Staffvertex is time tracking and project management for teams that bill or pay by the hour. People start a timer on the desktop app or in the browser, and the tracked hours turn into timesheets, reports and invoices. It is a product of Alphinex Solutions, where I work.",
    features: [
      "Desktop timer for Windows and macOS that keeps counting when the Wi-Fi drops and syncs when it comes back.",
      "Idle detection that lets the team decide whether idle time is kept, discarded or asked about.",
      "Optional screenshots, off by default, with blur controls for privacy.",
      "Projects, boards, task dependencies and deadlines alongside the timer.",
      "Timesheets with overtime, exportable reports, invoices and pay rates.",
      "A free plan for one user, then per-seat Pro and Business plans.",
    ],
    work: [
      "Built the backend APIs that record time, tasks and team data.",
      "Built the web interface teams use every day.",
      "Own maintenance end to end: bug fixes, improvements and releases.",
    ],
    services: ["mern-stack-development", "nextjs-development"],
    stack: ["Next.js", "React", "Node.js"],
    gallery: shots("staffvertex", "Staffvertex", {
      home: "The home page: start the timer in one click, free to start.",
      section: "How a tracked day works, from the first click to the invoice.",
      mobile: "The same page on a phone.",
    }),
  },
  {
    slug: "timbera",
    name: "Timbera.pk",
    href: "https://timbera.pk",
    image: "/work/timbera.webp",
    categories: ["WordPress", "Frontend"],
    kind: "Furniture ecommerce store",
    role: "WordPress build and storefront",
    summary: "Ecommerce furniture store on WordPress with a custom, responsive storefront.",
    about:
      "Timbera.pk is an online furniture store based in Islamabad. It sells sofas, beds, dining tables, chairs, mirrors, shelving and consoles, priced in rupees, to customers across Pakistan.",
    features: [
      "Category pages for sofas, tables and consoles, mirrors, shelves, beds, chairs and dining tables.",
      "Shop filters by price, colour and fabric, with sorting.",
      "Wishlist and cart on a WooCommerce checkout.",
      "Large product photography that holds up on a phone.",
      "Delivery and money-back promises shown on every page.",
    ],
    work: ["Built the WordPress ecommerce store and its product catalogue.", "Designed and built a custom, responsive storefront."],
    services: ["wordpress-development"],
    stack: ["WordPress", "WooCommerce"],
    gallery: shots("timbera", "Timbera.pk", {
      home: "The storefront hero on desktop.",
      section: "Category rows: beds, dining tables and more, each with price in rupees.",
      mobile: "The storefront on a phone, where most furniture browsing starts.",
    }),
  },
  {
    slug: "carports-hawaii",
    name: "Carports Hawaii",
    href: "https://carportshawaii.com",
    image: "/work/carport.webp",
    categories: ["WordPress"],
    kind: "Contractor website",
    role: "WordPress site and quote form",
    summary: "Company site for aluminium carports, patio and pool covers, with an instant-quote form.",
    about:
      "Carports Hawaii designs and installs aluminium carports, patio covers, pergolas and awnings across the Hawaiian islands. The website exists to turn a homeowner's first visit into a quote request.",
    features: [
      "An instant-quote form: enter the width and length, see the square footage and a price range.",
      "Product pages for carports, patio covers, pergolas and awnings.",
      "A photo gallery of finished installations.",
      "Service-area pages for each island.",
      "Reviews and licensing shown where visitors decide.",
    ],
    work: ["Built the company site on WordPress.", "Added an instant-quote form so visitors can request a price in one step."],
    services: ["wordpress-development"],
    stack: ["WordPress"],
    gallery: shots("carports-hawaii", "Carports Hawaii", {
      home: "The home page today: the offer and the call to action above the fold.",
      section: "Product range and the structure guide further down the page.",
      mobile: "The home page on a phone.",
    }),
  },
  {
    slug: "executivesdiary",
    name: "ExecutivesDiary",
    href: "https://executivesdiary.com",
    image: "/work/e-diary.webp",
    categories: ["Frontend"],
    kind: "Leadership publication",
    role: "Custom front end",
    summary: "Leadership platform publishing articles and interviews from executives, on a custom front end.",
    about:
      "ExecutivesDiary publishes the career stories of senior leaders: biographies and thought-leadership pieces written from interviews. Readers come for long-form content, so the front end is built for reading.",
    features: ["Executive biographies and thought-leadership sections.", "A featured diary of the day on the home page.", "Search across stories."],
    work: ["Built the custom front end for articles and interviews.", "Laid out long-form content for comfortable reading on every screen size."],
    services: ["react-development"],
    stack: [],
    gallery: [],
  },
  {
    slug: "teey",
    name: "Teey.pk",
    href: "https://teey.pk",
    image: "/work/teey.webp",
    categories: ["Frontend"],
    kind: "Printing and branding studio",
    role: "Front-end build",
    summary: "Printing and branding studio site, laid out around service bookings.",
    about:
      "Teey.pk is a custom print and promotional products studio in Islamabad. It handles design, offset and digital printing, event branding, promotional products, media production and digital marketing.",
    features: [
      "Service sections for design, printing, corporate events, promotional products, media and marketing.",
      "A portfolio of past work.",
      "A single, clear call to action on every page: get in touch.",
    ],
    work: ["Built the front end around the studio's services.", "Structured each page to lead visitors toward booking a service."],
    services: ["react-development"],
    stack: ["Bootstrap"],
    gallery: shots("teey", "Teey.pk", {
      home: "The hero: Think. Order. Made.",
      section: "Service cards and the studio's numbers.",
      mobile: "The home page on a phone.",
    }),
  },
  {
    slug: "consultantsperhour",
    name: "ConsultantsPerHour",
    href: "https://consultantsperhour.com",
    image: "/work/cph.webp",
    categories: ["Frontend"],
    kind: "Consulting marketplace",
    role: "Responsive interface and workflows",
    summary: "Gig marketplace for consultants, with a responsive interface for booking and consulting workflows.",
    about:
      "ConsultantsPerHour was a US marketplace that billed itself as a town square for the gig economy. Consultants built a profile, set out their expertise and rates, and were invited to vetted gigs. Employers could pick a consultant directly, post a job, or book a call with a recruiter.",
    features: [
      "Consultant profiles with expertise and pricing.",
      "Two paths for employers: choose a consultant directly or post a job.",
      "A recruiter call booking flow for employers who want help choosing.",
      "Industry browsing on the home page.",
    ],
    work: [
      "Built the responsive interface for browsing consultants and booking sessions.",
      "Shaped the consulting workflow screens so each step is clear on mobile and desktop.",
    ],
    services: ["react-development", "ui-ux-design"],
    stack: [],
    gallery: [],
    offline: true,
  },
  {
    slug: "mindsieves",
    name: "Mindsieves",
    href: "https://www.mindsieves.com",
    image: "/work/mindsieve.webp",
    categories: ["WordPress"],
    kind: "Blogging platform",
    role: "WordPress build and on-page SEO",
    summary: "Blogging platform with category-based publishing and built-in SEO.",
    about: "Mindsieves publishes essays and videos on Islamic thought, culture and current affairs. It needed an easy publishing flow for its writers and solid search foundations.",
    features: ["Category-based publishing.", "Featured posts on the home page.", "Search-ready posts from the moment they are published."],
    work: ["Built the WordPress blog with category-based publishing.", "Set up on-page SEO so every new post is search-ready when it is published."],
    services: ["wordpress-development", "seo-services"],
    stack: ["WordPress"],
    gallery: [],
  },
  {
    slug: "networkustad",
    name: "NetworkUstad",
    href: "https://networkustad.com",
    image: "/work/nw.webp",
    categories: ["SEO"],
    kind: "IT certification publication",
    role: "On-page and off-page SEO",
    roleNote: "My work here was SEO, not the design.",
    summary: "On-page and off-page SEO that put this tech publication among Google's top results.",
    about:
      "NetworkUstad publishes free study guides for IT certifications such as CCNA, Security+ and Network+, along with networking and cybersecurity articles. Almost all of its readers arrive from search, so rankings are the business.",
    features: [
      "Structured CCNA study guides split by exam domain.",
      "Guides for Security+, Network+ and an IT certification roadmap.",
      "Networking tools such as a subnet calculator.",
      "Networking, cybersecurity, technology and news sections.",
    ],
    work: ["On-page SEO across the publication's content.", "Off-page SEO and link building.", "Helped move the site into Google's top results for its topics."],
    services: ["seo-services"],
    stack: [],
    gallery: shots("networkustad", "NetworkUstad", {
      home: "The publication today. My work here was SEO, not the design.",
      section: "Certification study guides, the content that has to rank.",
      mobile: "The site on a phone, where Google ranks it from.",
    }),
  },
  {
    slug: "editorialdiary",
    name: "EditorialDiary",
    href: "https://editorialdiary.com",
    image: "/work/e-d-2.webp",
    categories: ["SEO"],
    kind: "Multi-topic blog",
    role: "Keyword research and technical SEO",
    roleNote: "My work here was SEO, not the design.",
    summary: "Keyword research and technical fixes that improved search performance for this blog.",
    about:
      "EditorialDiary is a multi-topic blog covering technology, business, travel, health, real estate and more. With that many topics, choosing which keywords to chase matters as much as the writing.",
    features: ["Ten topic categories, from tech and business to travel and real estate.", "Featured and latest posts on the home page.", "Category navigation on every page."],
    work: ["Keyword research to find topics worth ranking for.", "Technical SEO fixes that improved the blog's search performance."],
    services: ["seo-services"],
    stack: [],
    gallery: shots("editorialdiary", "EditorialDiary", {
      home: "The home page with featured posts.",
      section: "Latest posts by category.",
      mobile: "The blog on a phone.",
    }),
  },
];

export const projectCategories: Category[] = ["Full stack", "Frontend", "WordPress", "SEO"];

// ---------- Services ----------

export type ServiceSlug =
  | "mern-stack-development"
  | "nextjs-development"
  | "react-development"
  | "wordpress-development"
  | "seo-services"
  | "ui-ux-design";

export type Service = {
  slug: ServiceSlug;
  /** Two-digit position, shown as "Service 01 / 06". */
  n: string;
  /** Core offer (daily work) or also available. */
  core: boolean;
  name: string;
  /** Page H1, the phrase people search for. */
  heading: string;
  /** <title> without the site suffix. Keep it under ~45 characters. */
  metaTitle: string;
  /** 140-160 characters. */
  metaDescription: string;
  keywords: string[];
  /** One sentence for cards. */
  short: string;
  intro: string[];
  deliverables: { title: string; body: string }[];
  tools: Tool[];
  faqs: { q: string; a: string }[];
  /** Three deliverables shown as ticks on the services index. */
  highlights: string[];
  /** Headline of the closing call to action. */
  cta: string;
  /** Shown under the proof projects, when they need a caveat. */
  proofNote?: string;
};

export const services: Service[] = [
  {
    slug: "mern-stack-development",
    n: "01",
    core: true,
    highlights: ["APIs with Express and Node.js", "MongoDB data modeling", "Accounts and roles"],
    cta: "Planning a web app on the MERN stack?",
    name: "MERN stack development",
    heading: "MERN stack development services",
    metaTitle: "MERN Stack Development Services",
    metaDescription:
      "Hire a MERN stack developer to build your web app with MongoDB, Express, React and Node.js. Clean APIs, fast React interfaces, deployed and search-ready.",
    keywords: ["MERN stack developer", "MERN stack development services", "hire MERN stack developer", "MongoDB Express React Node.js developer", "full stack JavaScript developer"],
    short: "Complete web apps on MongoDB, Express, React and Node.js, from the data model to the deployed product.",
    intro: [
      "MERN is MongoDB, Express, React and Node.js: one language, JavaScript, from the database to the button your customer clicks. It is a strong fit for SaaS products, dashboards, marketplaces and internal tools that need to move quickly.",
      "I build the whole thing: the data model, the API, the interface and the deployment. You deal with one developer who understands every layer, so nothing gets lost between a front-end team and a back-end team.",
    ],
    deliverables: [
      { title: "APIs with Express and Node.js", body: "Structured routes, validation, authentication and error handling that your interface and any future mobile app can rely on." },
      { title: "MongoDB data modeling", body: "Collections and schemas designed around how your app actually reads and writes data, with indexes where they matter." },
      { title: "React interfaces", body: "Reusable components, responsive layouts and state that stays predictable as the feature list grows." },
      { title: "Accounts and roles", body: "Sign-up, login and role-based access for admins, staff and customers." },
      { title: "Deployment", body: "Production builds, environment configuration and hosting, so releasing a change is routine rather than risky." },
      { title: "Search-ready public pages", body: "Server rendering with Next.js where it counts, clean URLs, metadata and structured data, so marketing pages can rank." },
    ],
    tools: ["MongoDB", "Express", "React", "Node.js", "Next.js", "Tailwind CSS"],
    faqs: [
      {
        q: "What is the MERN stack?",
        a: "MongoDB for the database, Express and Node.js for the server and API, and React for the interface. JavaScript runs across the whole app, which keeps development fast and makes the codebase easier to hand over.",
      },
      {
        q: "Should my app use MERN or Next.js?",
        a: "For a dashboard or tool behind a login, a React front end on an Express API works well. When public pages need to rank on Google, I build them with Next.js so they render on the server. Both sit on the same MongoDB and Node.js foundation.",
      },
      { q: "Can you take over an existing MERN codebase?", a: "Yes. I start by running it locally and reading the code, fix whatever is blocking you, then move on to new features." },
      { q: "How long does a MERN project take?", a: "A focused first version usually takes two to six weeks. Larger products are split into milestones so you see working software at each step." },
    ],
  },
  {
    slug: "nextjs-development",
    n: "02",
    core: true,
    highlights: ["Marketing sites that rank", "Full-stack web apps", "Migrations without losing rankings"],
    cta: "Need a Next.js site that is fast and ranks?",
    name: "Next.js development",
    heading: "Next.js development services",
    metaTitle: "Next.js Developer for Hire",
    metaDescription:
      "Next.js developer building fast, server-rendered websites and web apps with React. Strong Core Web Vitals, clean SEO foundations and full-stack features.",
    keywords: ["Next.js developer", "hire Next.js developer", "Next.js development services", "React Next.js freelancer", "server-side rendering SEO"],
    short: "Server-rendered websites and apps that load fast, score well on Core Web Vitals and are easy for Google to read.",
    intro: [
      "Next.js is React with the parts a real product needs: server rendering, routing, image optimization and API routes. It is my default for anything with public pages, because it is the fastest way to get a React site that also ranks.",
      "Full-stack Next.js is my current day job. I lead that work at Alphinex Solutions, owning projects from design through testing and release.",
    ],
    deliverables: [
      { title: "Marketing sites that rank", body: "Static and server-rendered pages with metadata, sitemaps and structured data built in, not bolted on." },
      { title: "Full-stack web apps", body: "Server actions and API routes backed by MongoDB or your existing API, with authentication and dashboards." },
      { title: "Core Web Vitals", body: "Optimized images and fonts, minimal client JavaScript and layouts that do not shift while loading." },
      { title: "Migrations", body: "Moving an older React, WordPress or static site to Next.js without losing the rankings you already have." },
    ],
    tools: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS", "JavaScript"],
    faqs: [
      { q: "Why Next.js instead of plain React?", a: "Plain React renders in the browser, so search engines and slow phones wait for JavaScript. Next.js sends ready HTML from the server, which is faster for visitors and easier for Google to index." },
      { q: "Can you move my site to Next.js without losing SEO?", a: "Yes. I map every old URL to its new page, keep titles and content that already rank, set up redirects and check Search Console after launch." },
      { q: "Do you build the back end too?", a: "Yes. Next.js handles API routes and server logic well, and I pair it with MongoDB or Node.js services when an app needs more." },
    ],
  },
  {
    slug: "react-development",
    n: "03",
    core: true,
    highlights: ["Design to code", "Component systems", "API integration"],
    cta: "Have a design that needs building in React?",
    name: "React front-end development",
    heading: "React front-end development",
    metaTitle: "React Front-End Developer for Hire",
    metaDescription:
      "React developer building responsive, accessible interfaces from reusable components. Pixel-accurate builds from Figma, clean state and fast load times.",
    keywords: ["React developer", "hire React developer", "React front end developer", "React.js freelancer", "Figma to React"],
    short: "Responsive, accessible interfaces built from reusable components and matched closely to the design.",
    intro: [
      "I spent almost two years as the React front-end developer at CareerBooster.ai, where the interfaces I built increased engagement time by 40% and the move to reusable components cut the time to ship new features by 30%.",
      "I bring the same approach to client work: a small set of well-made components, layouts that hold up on every screen, and close work with whoever owns the API.",
    ],
    deliverables: [
      { title: "Design to code", body: "Figma or PSD designs turned into responsive, pixel-accurate React components." },
      { title: "Component systems", body: "Reusable building blocks so new pages and features are quicker to add and look consistent." },
      { title: "API integration", body: "Data fetching, loading and error states wired to your REST API." },
      { title: "Accessibility and speed", body: "Semantic markup, keyboard support and lean bundles that keep pages fast." },
    ],
    tools: ["React", "JavaScript", "Next.js", "Tailwind CSS", "Bootstrap", "Figma"],
    faqs: [
      { q: "Can you work with our existing back-end team?", a: "Yes. At CareerBooster.ai I worked alongside the backend team on API usage, which also reduced page load times by 20%." },
      { q: "Do you use Tailwind CSS or Bootstrap?", a: "Both. Tailwind CSS for new builds, and Bootstrap when a project already uses it or needs to move fast on a familiar grid." },
    ],
  },
  {
    slug: "wordpress-development",
    n: "04",
    core: false,
    highlights: ["Custom themes", "Ecommerce", "Speed optimization"],
    cta: "Want a WordPress site your team can run?",
    name: "WordPress development",
    heading: "WordPress development services",
    metaTitle: "WordPress Developer for Hire",
    metaDescription:
      "Custom WordPress websites and WooCommerce stores that are fast, easy to edit and built for search. Themes, plugins, speed work and ongoing support.",
    keywords: ["WordPress developer", "hire WordPress developer", "custom WordPress website", "WooCommerce developer", "WordPress speed optimization"],
    short: "Custom WordPress sites and stores that are fast, easy to edit and built to be found.",
    intro: [
      "WordPress is still the right answer for many content sites and stores, as long as it is built well. I have built and customized more than ten WordPress sites, and cut bounce rates by 25% with responsive layouts and usability testing.",
      "You get a site your team can update without calling a developer, that stays fast because the plugin list is short and the images are optimized.",
    ],
    deliverables: [
      { title: "Custom themes", body: "A design that fits your brand, built as a theme your team can edit safely." },
      { title: "Ecommerce", body: "Online stores with product catalogues, carts and checkout that work well on a phone." },
      { title: "Speed optimization", body: "Caching, image compression and a leaner plugin set for faster pages." },
      { title: "Lead generation", body: "Quote and contact forms placed where visitors are ready to act." },
    ],
    tools: ["WordPress", "WooCommerce", "Bootstrap", "Figma"],
    faqs: [
      { q: "Will I be able to edit the site myself?", a: "Yes. Pages, posts and products are edited in the normal WordPress dashboard, and I show you how before handover." },
      { q: "Can you speed up my existing WordPress site?", a: "Usually, yes. Most slow WordPress sites are slowed by heavy plugins, unoptimized images and missing caching, all of which can be fixed." },
    ],
  },
  {
    slug: "seo-services",
    n: "05",
    core: false,
    highlights: ["Technical SEO audit", "Structured data", "Keyword research and reporting"],
    cta: "Good content, but not ranking?",
    proofNote: "On NetworkUstad and EditorialDiary my work was SEO, not the design.",
    name: "SEO services",
    heading: "SEO services for websites and web apps",
    metaTitle: "SEO Services: Technical and On-Page SEO",
    metaDescription:
      "Technical SEO, on-page optimization and keyword research from a developer who can fix what the audit finds. Structured data, speed and content that ranks.",
    keywords: ["SEO services", "technical SEO", "on-page SEO", "SEO for web developers", "SEO optimization services"],
    short: "Technical audits, on-page optimization and keyword research, fixed in the code rather than handed over as a report.",
    intro: [
      "I started my career in SEO. At Nausal Technologies my work grew client traffic by 60%, ranked more than 50 target keywords and lifted organic leads by 35%.",
      "Because I am also the developer, the fixes an audit finds actually get made: page speed, rendering, metadata, structured data, internal links and site architecture.",
    ],
    deliverables: [
      { title: "Technical SEO audit", body: "Crawlability, indexing, Core Web Vitals, redirects and duplicate content, with every issue fixed in the code." },
      { title: "On-page optimization", body: "Titles, descriptions, headings, internal links and content structure aligned to the keywords that matter." },
      { title: "Structured data", body: "JSON-LD for your organization, products, articles, FAQs and breadcrumbs, validated for rich results." },
      { title: "Keyword research and reporting", body: "Topics worth ranking for, tracked against agreed goals with regular reports." },
    ],
    tools: ["Next.js", "WordPress", "JavaScript"],
    faqs: [
      { q: "How long does SEO take to show results?", a: "Technical fixes can show up within weeks once Google recrawls the site. Rankings for competitive keywords usually build over a few months." },
      { q: "Do you do link building?", a: "Yes, as part of off-page SEO, focusing on relevant sites rather than volume." },
    ],
  },
  {
    slug: "ui-ux-design",
    n: "06",
    core: false,
    highlights: ["Wireframes", "Clickable prototypes", "Interface design"],
    cta: "Want to see your product before it is built?",
    name: "UI and UX design",
    heading: "UI and UX design in Figma",
    metaTitle: "UI/UX Design for Web Apps in Figma",
    metaDescription:
      "UI and UX design in Figma for websites and web apps: wireframes, clickable prototypes and designs a developer can build exactly, because I build them too.",
    keywords: ["UI UX designer", "Figma designer", "web app UI design", "wireframes and prototypes", "UX design for developers"],
    short: "Wireframes, prototypes and interface designs in Figma, drawn by the person who will build them.",
    intro: [
      "Good interfaces are planned before they are coded. I design key screens in Figma first so you can see and approve the product before development starts.",
      "Because I build what I design, the designs stay realistic: components that reuse well, layouts that work on small screens and nothing that will be painful to implement.",
    ],
    deliverables: [
      { title: "Wireframes", body: "The structure of each key screen, agreed before any visual design." },
      { title: "Clickable prototypes", body: "Figma prototypes to test the main flows with real users or stakeholders." },
      { title: "Interface design", body: "Final screens with a small component library, ready for development." },
      { title: "UX improvements", body: "Reviews of existing products with concrete fixes. At Alphinex, UI and UX changes raised customer satisfaction by 25%." },
    ],
    tools: ["Figma", "React", "Tailwind CSS"],
    faqs: [
      { q: "Can you design and then build it?", a: "Yes, and that is the most efficient way to work with me: one person from the first wireframe to the deployed product." },
      { q: "Do you only design in Figma?", a: "Yes, Figma is where I design, prototype and hand off." },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

// ---------- Process and FAQ ----------

export const workProcess = [
  { name: "Plan", body: "We agree on the goal, scope, timeline and cost in writing before work starts." },
  { name: "Design", body: "Wireframes or Figma designs for the key screens, so you approve the look before it is built." },
  { name: "Build", body: "Development in small milestones, with progress shared over Zoom, Trello and GitHub." },
  { name: "Launch", body: "Deployment, speed and SEO checks, then support for fixes and updates after handover." },
];

export const faqs = [
  {
    q: "What do you specialize in?",
    a: "Full-stack JavaScript: the MERN stack (MongoDB, Express, React and Node.js) and Next.js. I also build WordPress sites, handle SEO, and design in Figma when a project needs it.",
  },
  { q: "Are you available for freelance work and full-time roles?", a: "Yes, both. I take on freelance projects and I am open to full-time remote roles." },
  { q: "Can you handle a project end to end?", a: "Yes. I take projects from wireframes and prototypes through development, deployment and SEO." },
  { q: "How long does a project take?", a: "Usually two to six weeks, depending on scope. We agree the timeline up front and I keep to it." },
  { q: "Do you offer support after launch?", a: "Yes: updates, bug fixes and performance monitoring so the site keeps working after handover." },
  { q: "Can we work together remotely?", a: "Yes. I am based in Islamabad, Pakistan, and work with clients worldwide over Zoom, Trello and GitHub." },
];

export const formEndpoint = "https://formspree.io/f/xpwrjvey";

// ---------- Home page and case-study extras ----------

/** One line per project for the home page's project index ("What I did"). */
export const projectOneLiners: Record<string, string> = {
  teey: "Front end structured around service bookings",
  executivesdiary: "Custom front end built for long-form reading",
  consultantsperhour: "Responsive browse and booking interface",
  mindsieves: "WordPress blog with search-ready publishing",
  networkustad: "On-page and off-page SEO into top results",
  editorialdiary: "Keyword research and technical SEO fixes",
};

/** The Staffvertex case study goes deeper than the other projects. Facts from the product and the build article. */
export const staffvertexStory = {
  headline: "Building and running Staffvertex, a multi-tenant time tracker.",
  lede: "Time tracking and project management for teams that bill or pay by the hour. Tracked time turns into timesheets, reports and invoices. I build its backend APIs and web app, and own its maintenance and releases.",
  problem:
    "When a team pays or invoices by the hour, the hours have to be right. People forget to start timers, lose connection mid-task, log meetings after the fact and split time across projects. Every gap turns into a dispute on a timesheet or an invoice.",
  product:
    "People start a timer on the desktop app or in the browser. The tracked hours flow into projects, boards, timesheets, reports and invoices, with each team's workspace kept separate. A free plan covers one user; Pro and Business are per seat.",
  homeProblem:
    "Teams that pay or invoice by the hour need hours they can trust. People forget timers, lose Wi-Fi and edit entries after the fact, and every one of those turns into a dispute on the invoice.",
  homeRole: [
    "Built the backend APIs that record time, tasks and team data.",
    "Built the web app teams use every day: timer, projects, boards and reports.",
    "Own maintenance end to end: bug fixes, improvements and releases.",
  ],
  features: [
    { title: "Offline-safe timer", body: "Desktop timer for Windows and macOS keeps counting when Wi-Fi drops and syncs when it returns.", short: "Keeps counting without Wi-Fi, syncs on reconnect." },
    { title: "Idle-time policies", body: "Each team decides whether idle time is kept, discarded or asked about.", short: "Keep, discard or ask, decided by the team." },
    { title: "Privacy-first screenshots", body: "Optional, off by default, with blur controls.", short: "" },
    { title: "Projects & boards", body: "Tasks, dependencies and deadlines alongside the timer.", short: "Tasks, dependencies and deadlines beside the timer." },
    { title: "Timesheets to invoices", body: "Overtime, exportable reports, invoices and pay rates.", short: "Timesheets, overtime, reports, pay rates." },
    { title: "Per-seat plans", body: "Free for one user, then Pro and Business per seat.", short: "" },
  ],
  engineeringIntro:
    "A time tracker is really three apps sharing one API: the web app for planning and reports, the desktop app that tracks, and the API with its database in the middle. The web app runs on Next.js, which also server-renders the public marketing and pricing pages so they rank.",
  engineering: [
    { title: "Store intervals, not totals", body: "Each entry has start, end, user, project and task in UTC. Durations are calculated, never the only record." },
    { title: "Record the source and keep edit history", body: "Desktop, web or manual, plus the old values on every change. It settles disputes and catches bugs." },
    { title: "Index for the questions asked most", body: "User + start time covers \"my week\"; project + start time covers project reports." },
    { title: "Day boundaries in the user's time zone", body: "Midnight where the person is, not midnight on the server." },
  ],
  outcome:
    "Staffvertex is live and in active development, with public sign-up, a free plan and paid per-seat tiers. I continue to ship its fixes and features.",
  tags: ["Next.js", "React", "Node.js API", "Multi-tenant"],
};

/** The screenshot that represents each service: real work that service was used on. */
export const serviceVisual: Record<ServiceSlug, string> = {
  "mern-stack-development": "/work/staffvertex/section.webp",
  "nextjs-development": "/work/staffvertex/home.webp",
  "react-development": "/work/teey/home.webp",
  "wordpress-development": "/work/timbera/home.webp",
  "seo-services": "/work/networkustad/home.webp",
  "ui-ux-design": "/work/cph.webp",
};

/** Career track bar (hero and About): share of time in each phase, oldest first. */
export const careerTrack = [
  { label: "SEO", years: "2021", weight: 6 },
  { label: "WordPress", years: "2021", weight: 6 },
  { label: "HTML, CSS, Bootstrap", years: "2022", weight: 12 },
  { label: "React, CareerBooster.ai", years: "2023", weight: 22 },
  { label: "Full stack, Alphinex", years: "2024", weight: 24 },
];

// ---------- Helpers ----------

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const fmtMonth = ([y, m]: [number, number]) => `${MONTHS[m - 1]} ${y}`;
export const fmtRange = (start: [number, number], end: [number, number] | "now") => `${fmtMonth(start)} – ${end === "now" ? "Present" : fmtMonth(end)}`;
export const isoMonth = ([y, m]: [number, number]) => `${y}-${String(m).padStart(2, "0")}`;
export const host = (href: string) => new URL(href).hostname.replace(/^www\./, "");

/** The best desktop screenshot for a project: the 16:10 home capture when there is one. */
export const heroShot = (p: Project) => p.gallery.find((g) => g.src.endsWith("/home.webp"))?.src ?? p.image;
export const mobileShot = (p: Project) => p.gallery.find((g) => g.height > g.width);
export const sectionShot = (p: Project) => p.gallery.find((g) => g.src.endsWith("/section.webp"));
