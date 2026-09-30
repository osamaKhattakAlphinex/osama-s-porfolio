import type { MetadataRoute } from "next";
import { person } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${person.name} | ${person.role}`,
    short_name: person.name,
    description: `Portfolio of ${person.name}, MERN stack and Next.js developer in ${person.city}, ${person.country}.`,
    start_url: "/",
    display: "browser",
    background_color: "#0b0c0e",
    theme_color: "#0b0c0e",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
