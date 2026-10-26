import { person } from "@/content/site";
import { ogImage } from "@/lib/og";

export const alt = `Writing by ${person.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Notes from the work.", kicker: "Writing", tags: ["SaaS", "Hiring", "Ecommerce", "SEO"] });
}
