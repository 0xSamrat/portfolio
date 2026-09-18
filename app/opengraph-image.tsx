import { ImageResponse } from "next/og";
import { IDENTITY, METRICS } from "./content/profile";

export const alt = `${IDENTITY.name} — ${IDENTITY.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Satisfies the `og:image` half of `metadata-completeness`. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf6ed",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: "#c2410c",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 26,
              color: "#7a7167",
              letterSpacing: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 42,
                height: 42,
                background: "#161512",
                color: "#faf6ed",
                borderRadius: 11,
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              0x
            </div>
            <div style={{ display: "flex" }}>0xsamrat.com</div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              color: "#161512",
              lineHeight: 1.08,
              letterSpacing: -2.5,
              marginTop: 26,
            }}
          >
            {IDENTITY.name}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 40,
              color: "#c2410c",
              fontWeight: 600,
              letterSpacing: -0.8,
              marginTop: 6,
            }}
          >
            AI Engineer · AI Agent Developer
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#3d362e",
              lineHeight: 1.4,
              marginTop: 20,
              maxWidth: 940,
            }}
          >
            LLM agents that take real actions — LangGraph orchestration, RAG
            grounded in user data, guardrails and evals.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 46,
            borderTop: "1px solid #ddd2bb",
            paddingTop: 26,
          }}
        >
          {METRICS.slice(0, 3).map((m) => (
            <div
              key={m.label}
              style={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 44,
                  fontWeight: 700,
                  color: "#161512",
                  letterSpacing: -1,
                }}
              >
                {m.value}
              </div>
              <div style={{ display: "flex", fontSize: 22, color: "#7a7167" }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
