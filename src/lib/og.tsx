import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { person, siteUrl } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

const fs = (pkg: string, file: string) => readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));
const fonts = Promise.all([
  fs("bricolage-grotesque", "bricolage-grotesque-latin-600-normal.woff"),
  fs("instrument-sans", "instrument-sans-latin-500-normal.woff"),
  fs("jetbrains-mono", "jetbrains-mono-latin-500-normal.woff"),
]);

// The site's light palette: paper, ink, one cobalt accent, and the screenshot panel grey.
const c = { bg: "#f4f5f7", surface: "#ffffff", shot: "#e3e6ec", rule: "#dce0e7", ink: "#0c1222", muted: "#4a5468", accent: "#2d46e0", chip: "#eef1ff", chipRule: "#d3d9fb", chipInk: "#1b2fa8" };

type Og = {
  title: string;
  /** Small line above the title, e.g. "Case study" or "Service". */
  kicker: string;
  tags?: string[];
  /** Public path of a screenshot or photo to show on the right. */
  image?: string;
};

/** Shared 1200x630 share card: same palette and type as the site, so links look like they belong to it. */
export async function ogImage({ title, kicker, tags = [], image }: Og) {
  const [display, sans, mono] = await fonts;
  const img = image ? `data:image/${image.endsWith(".jpg") ? "jpeg" : "png"};base64,${(await toPng(image)).toString("base64")}` : null;
  const domain = new URL(siteUrl).host;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: c.bg, color: c.ink, fontFamily: "Instrument Sans" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 64px", width: img ? 690 : "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: c.ink, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Bricolage Grotesque", fontSize: 20 }}>
              OK
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "Bricolage Grotesque", fontSize: 26 }}>{person.name}</span>
              <span style={{ fontSize: 17, color: c.muted, fontFamily: "JetBrains Mono", letterSpacing: "0.04em" }}>{person.role.toUpperCase()}</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span style={{ fontFamily: "JetBrains Mono", fontSize: 20, color: c.accent, letterSpacing: "0.06em" }}>{kicker.toUpperCase()}</span>
            <span style={{ fontFamily: "Bricolage Grotesque", fontSize: title.length > 48 ? 52 : title.length > 32 ? 60 : 70, lineHeight: 1.04, letterSpacing: "-0.035em" }}>{title}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 10 }}>
              {tags.slice(0, 4).map((t) => (
                <span key={t} style={{ border: `1px solid ${c.chipRule}`, background: c.chip, color: c.chipInk, borderRadius: 10, padding: "6px 14px", fontSize: 17, fontFamily: "JetBrains Mono" }}>
                  {t}
                </span>
              ))}
            </div>
            {!img && <span style={{ fontFamily: "JetBrains Mono", fontSize: 19, color: c.muted }}>{domain}</span>}
          </div>
        </div>

        {img && (
          <div style={{ display: "flex", flex: 1, margin: "40px 40px 40px 0", borderRadius: 24, background: c.shot, padding: "40px 0 0 40px", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
            <img
              src={img}
              alt=""
              width={430}
              height={510}
              style={{ width: 430, height: 510, objectFit: "cover", objectPosition: "left top", borderRadius: "14px 0 0 0", border: `1px solid ${c.rule}` }}
            />
          </div>
        )}
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bricolage Grotesque", data: display, weight: 600, style: "normal" },
        { name: "Instrument Sans", data: sans, weight: 500, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}

/** Satori can't decode WebP, so screenshots are converted with sharp (already a Next dependency). */
async function toPng(publicPath: string) {
  const file = await readFile(join(process.cwd(), "public", publicPath));
  if (!publicPath.endsWith(".webp")) return file;
  const sharp = (await import("sharp")).default;
  return sharp(file).resize({ width: 860, height: 1020, fit: "cover", position: "northwest" }).png({ compressionLevel: 9 }).toBuffer();
}
