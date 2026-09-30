import { person } from "@/content/site";
import { ogImage } from "@/lib/og";

export const alt = `Web development services by ${person.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Web development services.", kicker: "Services", tags: ["MERN", "Next.js", "WordPress", "SEO"] });
}
