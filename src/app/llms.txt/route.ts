import { faqs, person, projects, roles, services, socials } from "@/content/site";
import { url } from "@/lib/seo";

export const dynamic = "force-static";

/** llms.txt: a plain-text map of the site for AI assistants and AI search (https://llmstxt.org). */
export function GET() {
  const current = roles.at(-1)!;
  const body = `# ${person.name} (${person.fullName}), ${person.role}

> ${person.name} is a MERN stack (MongoDB, Express, React, Node.js) and Next.js developer based in ${person.city}, ${person.country}. Currently ${current.title} at ${current.org}. Available for freelance projects and full-time remote roles. Contact: ${person.email}.

## Pages

- [Home](${url("/")}): overview, selected work, services and experience
- [About](${url("/about")}): background, skills, full experience and education
- [Projects](${url("/projects")}): all client projects
- [Services](${url("/services")}): everything offered, with process and FAQ
- [Contact](${url("/contact")}): hire ${person.name}

## Services

${services.map((s) => `- [${s.heading}](${url(`/services/${s.slug}`)}): ${s.short}`).join("\n")}

## Projects

${projects.map((p) => `- [${p.name}](${url(`/projects/${p.slug}`)}): ${p.summary} Live at ${p.href}`).join("\n")}

## Experience

${[...roles].reverse().map((r) => `- ${r.title}, ${r.org}: ${r.points[0]}`).join("\n")}

## FAQ

${faqs.map((f) => `- ${f.q} ${f.a}`).join("\n")}

## Profiles

${socials.map((s) => `- [${s.label}](${s.href})`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
