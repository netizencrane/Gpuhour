import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f7f4ee",
          color: "#1b1d18",
          padding: 80,
          fontSize: 56,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase" }}>
          {SITE_NAME}
        </div>
        <div style={{ marginTop: 24, fontWeight: 600, maxWidth: 900 }}>
          GPU rental prices, sourced and dated
        </div>
      </div>
    ),
    size,
  );
}
