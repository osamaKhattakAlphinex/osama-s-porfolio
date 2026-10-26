import { person } from "@/content/site";
import { ogImage } from "@/lib/og";

export const alt = `${person.role} in ${person.city}, ${person.country}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "I build complete web products, from the API to the last pixel.", kicker: "Portfolio", tags: ["React", "Next.js", "Node.js", "MongoDB"], image: "/osama.png" });
}
