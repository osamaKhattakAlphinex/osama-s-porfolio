import { person } from "@/content/site";
import { ogImage } from "@/lib/og";

export const alt = `Blog by ${person.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Notes from real projects.", kicker: "Blog", tags: ["MERN", "Next.js", "Ecommerce", "SEO"] });
}
