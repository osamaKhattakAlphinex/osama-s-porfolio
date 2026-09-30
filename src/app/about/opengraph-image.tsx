import { person } from "@/content/site";
import { ogImage } from "@/lib/og";

export const alt = `About ${person.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: `About ${person.name}`, kicker: "About", tags: ["Since 2021", "20+ projects", "10+ clients"], image: "/osama.jpg" });
}
