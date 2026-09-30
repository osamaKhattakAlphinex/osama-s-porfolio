import { person } from "@/content/site";
import { ogImage } from "@/lib/og";

export const alt = `Projects by ${person.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Projects, shipped and live.", kicker: "Portfolio", tags: ["Full stack", "Frontend", "WordPress", "SEO"] });
}
