"use client";

import React from "react";
import { Check, ArrowRight } from "lucide-react";
import type { DashboardModule } from "@/components/sections/dashboard/moduleData";

interface ContentPanelProps {
  module: DashboardModule;
}

export const ContentPanel = React.forwardRef<HTMLDivElement, ContentPanelProps>(({ module }, ref) => {
  const isRight = module.panelSide === "right";

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: "50%",
        [isRight ? "right" : "left"]: "5%",
        transform: "translateY(-50%)",
        width: "min(420px, 36vw)",
        opacity: 0,
        zIndex: 20,
        background: "rgba(255,255,255,0.93)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 24,
        padding: "36px 32px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: module.color,
          marginBottom: 16,
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: module.color }} />
        {module.eyebrow ?? module.label}
      </div>

      <h3
        style={{
          fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          color: "#1d1d1f",
          lineHeight: 1.2,
          marginBottom: 14,
        }}
      >
        {module.headline}
      </h3>

      <p style={{ fontSize: 14, color: "#6e6e73", lineHeight: 1.65, marginBottom: 24 }}>{module.body}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          padding: "20px 0",
          borderTop: "1px solid #e5e5ea",
          borderBottom: "1px solid #e5e5ea",
          marginBottom: 20,
        }}
      >
        {module.stats.map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: module.color,
                lineHeight: 1,
                marginBottom: 4,
              }}
            >
              {stat.value}
            </div>
            <div style={{ fontSize: 10, color: "#6e6e73", fontWeight: 500, lineHeight: 1.3 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10 }}>
        {module.bullets.map((bullet) => (
          <li
            key={bullet}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontSize: 13,
              color: "#3a3a3c",
              lineHeight: 1.5,
            }}
          >
            <Check size={13} style={{ color: module.color, flexShrink: 0, marginTop: 2 }} />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <a
        href="#pricing"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 13,
          fontWeight: 600,
          color: "#0047FF",
          textDecoration: "none",
        }}
      >
        Explore {module.label} <ArrowRight size={14} />
      </a>
    </div>
  );
});

ContentPanel.displayName = "ContentPanel";
