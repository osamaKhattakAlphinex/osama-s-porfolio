// Generates the 1600x900 blog covers in public/blog from project screenshots, in the site's navy-and-cobalt style.
// Covers carry no text, so the 21:9 crop on article pages never cuts a headline. Run: node scripts/blog-covers.mjs
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";
import sharp from "sharp";

const root = process.cwd();
const font = (pkg, file) => readFile(join(root, "node_modules/@fontsource", pkg, "files", file));
const [display, mono] = await Promise.all([font("bricolage-grotesque", "bricolage-grotesque-latin-700-normal.woff"), font("jetbrains-mono", "jetbrains-mono-latin-400-normal.woff")]);

const c = { night: "#0c1222", night2: "#111829", night3: "#1a2236", rule: "#2a3550", bar: "#151c2e", dot: "#3a4560", muted: "#a3abbd", link: "#9db0ff", accent: "#2d46e0" };

const screenshot = async (path) => {
  const png = await sharp(join(root, "public", path)).resize(1520, 950, { fit: "cover", position: "north" }).png().toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
};

const shotCover = (src, url) =>
  h("div", { style: { width: "100%", height: "100%", display: "flex", background: c.night, padding: "96px 0 0 96px" } },
    h("div", { style: { display: "flex", flexDirection: "column", flex: 1, borderRadius: "22px 0 0 0", overflow: "hidden", border: `2px solid ${c.rule}`, borderRight: "none", borderBottom: "none" } },
      h("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "20px 26px", background: c.bar } },
        ...[0, 1, 2].map((i) => h("div", { key: i, style: { width: 18, height: 18, borderRadius: 9, background: c.dot } })),
        h("div", { style: { marginLeft: 20, padding: "6px 18px", borderRadius: 10, background: c.night, color: c.muted, fontFamily: "JetBrains Mono", fontSize: 22 } }, url),
      ),
      h("img", { src, width: 1504, height: 940, style: { width: 1504, height: 940, objectFit: "cover", objectPosition: "left top" } }),
    ),
  );

const mernCover = () =>
  h("div", { style: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 40, background: c.night } },
    ...[["M", "MongoDB"], ["E", "Express"], ["R", "React"], ["N", "Node.js"]].map(([letter, label]) =>
      h("div", {
        key: letter,
        style: {
          width: 280, height: 280, borderRadius: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
          background: letter === "R" ? c.accent : c.night3, border: letter === "R" ? "none" : `2px solid ${c.rule}`,
        },
      },
        h("span", { style: { fontFamily: "Bricolage Grotesque", fontSize: 150, lineHeight: 1, color: letter === "R" ? "#ffffff" : c.link } }, letter),
        h("span", { style: { fontFamily: "JetBrains Mono", fontSize: 26, color: letter === "R" ? "#dde3ff" : c.muted } }, label),
      ),
    ),
  );

const covers = [
  { slug: "build-time-tracking-app-like-hubstaff", shot: "/work/staffvertex/home.webp", url: "staffvertex.com" },
  { slug: "contractor-website-instant-quote-form", shot: "/work/carports-hawaii/home.webp", url: "carportshawaii.com" },
  { slug: "furniture-ecommerce-website-pakistan", shot: "/work/timbera/home.webp", url: "timbera.pk" },
  { slug: "technical-seo-checklist", shot: "/work/networkustad/home.webp", url: "networkustad.com" },
  { slug: "hire-mern-stack-developer" },
];

for (const cover of covers) {
  const tree = cover.shot ? shotCover(await screenshot(cover.shot), cover.url) : mernCover();
  const res = new ImageResponse(tree, {
    width: 1600,
    height: 900,
    fonts: [
      { name: "Bricolage Grotesque", data: display, weight: 700, style: "normal" },
      { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
    ],
  });
  const webp = await sharp(Buffer.from(await res.arrayBuffer())).webp({ quality: 82 }).toBuffer();
  await writeFile(join(root, "public/blog", `${cover.slug}.webp`), webp);
  console.log(`${cover.slug}.webp ${Math.round(webp.length / 1024)}KB`);
}
