import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Muskan Designs — Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const iconBuffer = await readFile(join(process.cwd(), "src/app/icon.png"));
  const iconSrc = `data:image/png;base64,${iconBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#ffffff",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: 480,
            background:
              "linear-gradient(135deg, rgba(255,173,173,0.7), rgba(202,187,233,0.7), rgba(179,222,193,0.7))",
            display: "flex",
          }}
        />
        <img
          src={iconSrc}
          width={96}
          height={96}
          style={{ borderRadius: 24, marginBottom: 40 }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 600,
            color: "#2d2b2a",
            letterSpacing: "-1px",
          }}
        >
          Muskan Bhatia
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#302e2c",
            opacity: 0.75,
            marginTop: 16,
            maxWidth: 820,
          }}
        >
          Product Designer &amp; Growth Strategist
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#302e2c",
            opacity: 0.6,
            marginTop: 28,
            maxWidth: 760,
          }}
        >
          I design websites and apps that drive results.
        </div>
      </div>
    ),
    { ...size }
  );
}
