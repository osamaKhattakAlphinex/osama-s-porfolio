import { person, serviceBySlug, services } from "@/content/site";
import { ogImage } from "@/lib/og";

export const alt = `Web development service by ${person.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = serviceBySlug((await params).slug)!;
  return ogImage({ title: s.heading, kicker: "Service", tags: s.tools.slice(0, 4) });
}
