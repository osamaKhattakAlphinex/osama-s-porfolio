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
export const contentUpdated = "2026-09-30";

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
] as const;
export type Tool = (typeof stack)[number];

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
  /** What Osama did on it. */
  work: string[];
  /** Service pages this project is proof for. */
  services: ServiceSlug[];
  /** Only tools confirmed for this project. Leave empty rather than guess. */
  stack: Tool[];
  kind: string;
};

export const projects: Project[] = [
  {
    slug: "staffvertex",
    name: "Staffvertex",
    href: "https://staffvertex.com",
    image: "/work/sv.webp",
    categories: ["Full stack"],
    kind: "Time-tracking SaaS",
    summary: "A time-tracking product in the vein of Hubstaff. I built and maintain all of it: backend APIs, interface and fixes.",
    about:
      "Staffvertex is a time-tracking and team productivity product for businesses that pay by the hour, in the same category as Hubstaff. Teams track work hours, manage tasks and see where the time went.",
    work: [
      "Built the backend APIs that record time, tasks and team data.",
      "Built the web interface teams use every day.",
      "Own maintenance end to end: bug fixes, improvements and releases.",
    ],
    services: ["mern-stack-development", "nextjs-development"],
    stack: [],
  },
  {
    slug: "consultantsperhour",
    name: "ConsultantsPerHour",
    href: "https://consultantsperhour.com",
    image: "/work/cph.webp",
    categories: ["Frontend"],
    kind: "Consulting marketplace",
    summary: "Gig marketplace for consultants, with a responsive interface for booking and consulting workflows.",
    about:
      "ConsultantsPerHour is a marketplace where clients find consultants and book time with them by the hour. The interface has to carry browsing, booking and the consulting workflow on any screen.",
    work: [
      "Built the responsive interface for browsing consultants and booking sessions.",
      "Shaped the consulting workflow screens so each step is clear on mobile and desktop.",
    ],
    services: ["react-development", "ui-ux-design"],
    stack: [],
  },
  {
    slug: "timbera",
    name: "Timbera.pk",
    href: "https://timbera.pk",
    image: "/work/timbera.webp",
    categories: ["WordPress", "Frontend"],
    kind: "Furniture ecommerce store",
    summary: "Ecommerce furniture store on WordPress with a custom, responsive storefront.",
    about: "Timbera.pk is an online furniture store in Pakistan. It runs on WordPress with a storefront designed for browsing large product photos and buying on a phone.",
    work: [
      "Built the WordPress ecommerce store and its product catalogue.",
      "Designed and built a custom, responsive storefront.",
    ],
    services: ["wordpress-development"],
    stack: ["WordPress"],
  },
  {
    slug: "executivesdiary",
    name: "ExecutivesDiary",
    href: "https://executivesdiary.com",
    image: "/work/e-diary.webp",
    categories: ["Frontend"],
    kind: "Leadership publication",
    summary: "Leadership platform publishing articles and interviews from executives, on a custom front end.",
    about: "ExecutivesDiary publishes articles and interviews from executives and consultants. Readers come for long-form content, so the front end is built for reading.",
    work: ["Built the custom front end for articles and interviews.", "Laid out long-form content for comfortable reading on every screen size."],
    services: ["react-development"],
    stack: [],
  },
  {
    slug: "carports-hawaii",
    name: "Carports Hawaii",
    href: "https://carportshawaii.com",
    image: "/work/carport.webp",
    categories: ["WordPress"],
    kind: "Company website",
    summary: "Company site for aluminium carports, patio and pool covers, with an instant-quote form.",
    about: "Carports Hawaii sells and installs aluminium carports, patio covers and pool covers. The site's job is to turn visitors into quote requests.",
    work: ["Built the company site on WordPress.", "Added an instant-quote form so visitors can request a price in one step."],
    services: ["wordpress-development"],
    stack: ["WordPress"],
  },
  {
    slug: "teey",
    name: "Teey.pk",
    href: "https://teey.pk",
    image: "/work/teey.webp",
    categories: ["Frontend"],
    kind: "Printing and branding studio",
    summary: "Printing and branding studio site, laid out around service bookings.",
    about: "Teey.pk is a printing and branding studio. The site presents its services and is laid out to lead visitors to a booking.",
    work: ["Built the front end around the studio's services.", "Structured each page to lead visitors toward booking a service."],
    services: ["react-development"],
    stack: [],
  },
  {
    slug: "mindsieves",
    name: "Mindsieves",
    href: "https://mindsieves.com",
    image: "/work/mindsieve.webp",
    categories: ["WordPress"],
    kind: "Blogging platform",
    summary: "Blogging platform with category-based publishing and built-in SEO.",
    about: "Mindsieves is a blog that publishes across several categories. It needed an easy publishing flow for writers and solid search foundations.",
    work: ["Built the WordPress blog with category-based publishing.", "Set up on-page SEO so every new post is search-ready when it is published."],
    services: ["wordpress-development", "seo-services"],
    stack: ["WordPress"],
  },
  {
    slug: "networkustaad",
    name: "NetworkUstaad",
    href: "https://networkustaad.com",
    image: "/work/nw.webp",
    categories: ["SEO"],
    kind: "Tech publication",
    summary: "On-page and off-page SEO that put this tech publication among Google's top results.",
    about: "NetworkUstaad is a technology publication covering networking topics. The goal was organic search traffic.",
    work: ["On-page SEO across the publication's content.", "Off-page SEO and link building.", "Helped move the site into Google's top results for its topics."],
    services: ["seo-services"],
    stack: [],
  },
  {
    slug: "editorialdiary",
    name: "EditorialDiary",
    href: "https://editorialdiary.com",
    image: "/work/e-d-2.webp",
    categories: ["SEO"],
    kind: "Blog",
    summary: "Keyword research and technical fixes that improved search performance for this blog.",
    about: "EditorialDiary is a blog that relies on search for its readers.",
    work: ["Keyword research to find topics worth ranking for.", "Technical SEO fixes that improved the blog's search performance."],
    services: ["seo-services"],
    stack: [],
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
};

export const services: Service[] = [
  {
    slug: "mern-stack-development",
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

// ---------- Helpers ----------

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const fmtMonth = ([y, m]: [number, number]) => `${MONTHS[m - 1]} ${y}`;
export const fmtRange = (start: [number, number], end: [number, number] | "now") => `${fmtMonth(start)} - ${end === "now" ? "Present" : fmtMonth(end)}`;
export const isoMonth = ([y, m]: [number, number]) => `${y}-${String(m).padStart(2, "0")}`;
export const host = (href: string) => new URL(href).hostname.replace(/^www\./, "");
