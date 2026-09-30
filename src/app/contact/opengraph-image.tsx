import { person } from "@/content/site";
import { ogImage } from "@/lib/og";

export const alt = `Hire ${person.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Hire a MERN stack developer.", kicker: "Contact", tags: ["Freelance", "Full-time", "Remote"] });
}
