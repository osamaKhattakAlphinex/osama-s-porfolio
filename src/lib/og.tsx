import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { person, siteUrl } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "node_modules/geist/dist/fonts");
const fonts = Promise.all([
  readFile(join(fontDir, "geist-sans/Geist-Regular.ttf")),
  readFile(join(fontDir, "geist-sans/Geist-Bold.ttf")),
  readFile(join(fontDir, "geist-mono/GeistMono-Medium.ttf")),
]);

const c = { bg: "#0b0c0e", sheet: "#131518", rule: "#262a30", ink: "#eceef0", ink2: "#9ba2ab", accent: "#c4f25a", onAccent: "#0b0c0e" };

type Og = {
  title: string;
  /** Small line above the title, e.g. "Case study" or "Service". */
  kicker: string;
  tags?: string[];
  /** Public path of a screenshot or photo to show on the right. */
  image?: string;
};

/** Shared 1200x630 share card: same layout and type as the site, so links look like they belong to it. */
export async function ogImage({ title, kicker, tags = [], image }: Og) {
  const [regular, bold, mono] = await fonts;
  const img = image ? `data:image/${image.endsWith(".jpg") ? "jpeg" : "png"};base64,${(await toPng(image)).toString("base64")}` : null;
  const domain = new URL(siteUrl).host;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: c.bg, color: c.ink, fontFamily: "Geist", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: `radial-gradient(900px 500px at 0% 0%, rgba(196,242,90,0.13), transparent 60%)`,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: img ? 700 : "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: c.accent, color: c.onAccent, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 20 }}>
              OK
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 24, fontWeight: 700 }}>{person.name}</span>
              <span style={{ fontSize: 18, color: c.ink2, fontFamily: "Geist Mono" }}>{person.role}</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <span style={{ fontFamily: "Geist Mono", fontSize: 22, color: c.accent }}>{kicker}</span>
            <span style={{ fontSize: title.length > 40 ? 58 : 70, fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.035em" }}>{title}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 10 }}>
              {tags.slice(0, 4).map((t) => (
                <span key={t} style={{ border: `1px solid ${c.rule}`, background: c.sheet, borderRadius: 10, padding: "6px 14px", fontSize: 18, color: c.ink2 }}>
                  {t}
                </span>
              ))}
            </div>
            {!img && <span style={{ fontFamily: "Geist Mono", fontSize: 20, color: c.ink2 }}>{domain}</span>}
          </div>
        </div>

        {img && (
          <div style={{ display: "flex", flex: 1, padding: "64px 64px 0 0", alignItems: "flex-end" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
            <img
              src={img}
              alt=""
              width={436}
              height={566}
              style={{ width: 436, height: 566, objectFit: "cover", objectPosition: "left top", borderRadius: "16px 16px 0 0", border: `1px solid ${c.rule}` }}
            />
          </div>
        )}
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: bold, weight: 700, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}

/** Satori can't decode WebP, so screenshots are converted with sharp (already a Next dependency). */
async function toPng(publicPath: string) {
  const file = await readFile(join(process.cwd(), "public", publicPath));
  if (!publicPath.endsWith(".webp")) return file;
  const sharp = (await import("sharp")).default;
  return sharp(file).resize({ width: 872, height: 1132, fit: "cover", position: "northwest" }).png({ compressionLevel: 9 }).toBuffer();
}
