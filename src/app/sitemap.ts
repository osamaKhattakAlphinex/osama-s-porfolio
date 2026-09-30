import type { MetadataRoute } from "next";
import { contentUpdated, person, projects, services } from "@/content/site";
import { url } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(contentUpdated);
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly", images?: string[]) => ({
    url: url(path),
    lastModified,
    changeFrequency,
    priority,
    ...(images ? { images: images.map((i) => url(i)) } : {}),
  });

  return [
    page("/", 1, "weekly", [person.portrait]),
    page("/services", 0.9, "monthly"),
    ...services.map((s) => page(`/services/${s.slug}`, s.slug === "mern-stack-development" ? 0.9 : 0.8, "monthly")),
    page("/projects", 0.8, "monthly", projects.map((p) => p.image)),
    ...projects.map((p) => page(`/projects/${p.slug}`, 0.7, "yearly", [p.image])),
    page("/about", 0.7, "monthly", [person.portrait]),
    page("/contact", 0.6, "yearly"),
  ];
}
