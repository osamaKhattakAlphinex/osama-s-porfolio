import { person, projectBySlug, projects } from "@/content/site";
import { ogImage } from "@/lib/og";

export const alt = `Project case study by ${person.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = projectBySlug((await params).slug)!;
  return ogImage({ title: p.name, kicker: `Case study: ${p.kind}`, tags: p.categories, image: p.image });
}
