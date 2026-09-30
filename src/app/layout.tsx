import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { person, siteUrl } from "@/content/site";
import { siteName } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

// Self-hosted at build time, Latin subset only. Mono is used for small labels, so it isn't preloaded.
const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", preload: false });

// Site-wide defaults. Each page overrides title, description, canonical and Open Graph through pageMetadata().
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${person.name} | MERN Stack Developer in ${person.country}`, template: `%s | ${person.name}` },
  description: `${person.name} is a MERN stack and Next.js developer in ${person.city}, ${person.country}, building fast, search-ready web apps for clients and teams worldwide.`,
  applicationName: siteName,
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  publisher: person.name,
  category: "technology",
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Paste the Search Console / Bing tokens into env vars to verify ownership.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } } : {}),
  },
  openGraph: { type: "website", siteName, locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0e" },
  ],
};

// Runs before first paint so there is no flash of the wrong theme: stored choice first, then the OS setting.
const themeScript = `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* Extensions (e.g. ColorZilla) add attributes to <body> before hydration. */}
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only z-50 rounded-xl bg-accent px-4 py-2 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
