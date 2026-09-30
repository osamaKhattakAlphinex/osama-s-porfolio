import { person } from "@/content/site";
import { ogImage } from "@/lib/og";

export const alt = `${person.role} in ${person.city}, ${person.country}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "MERN stack developer for web apps that rank.", kicker: "Portfolio", tags: ["MongoDB", "Express", "React", "Node.js"], image: "/osama.jpg" });
}
