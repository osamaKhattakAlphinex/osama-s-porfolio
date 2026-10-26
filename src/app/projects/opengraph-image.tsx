import { person } from "@/content/site";
import { ogImage } from "@/lib/og";

export const alt = `Work by ${person.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Work that's live and in use.", kicker: "Work", tags: ["Full stack", "Frontend", "WordPress", "SEO"], image: "/work/staffvertex/home.webp" });
}
