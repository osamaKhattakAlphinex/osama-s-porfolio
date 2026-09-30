import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#c4f25a", color: "#0b0c0e", fontSize: 84, fontWeight: 700, letterSpacing: "-0.04em" }}>
        OK
      </div>
    ),
    size,
  );
}
