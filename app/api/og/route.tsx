import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "ePubAI";
  const subtitle = searchParams.get("subtitle") || "AI‑Crafted Ghostwritten Books";
  const bg = searchParams.get("bg") || "dark"; // dark | light | slate

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background:
            bg === "light"
              ? "#f7f7f7"
              : bg === "slate"
              ? "linear-gradient(135deg,#0b0b0b 0%, #101317 100%)"
              : "#0a0a0a",
          color: bg === "light" ? "#0a0a0a" : "#ededed",
          padding: "64px",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        <div style={{
          display: "inline-flex",
          gap: 8,
          alignItems: "center",
          opacity: 0.8,
          fontSize: 26,
          marginBottom: 16,
          letterSpacing: "-0.01em",
        }}>
          <div style={{ width: 12, height: 12, borderRadius: 9999, background: bg === "light" ? "#111" : "#e5e7eb" }} />
          <div>ePubAI</div>
        </div>
        <div style={{ maxWidth: 960 }}>
          <div style={{ fontSize: 58, lineHeight: 1.05, letterSpacing: "-0.01em" }}>{title}</div>
          <div style={{ marginTop: 10, fontSize: 28, opacity: 0.75 }}>{subtitle}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}


