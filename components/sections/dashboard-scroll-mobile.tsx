"use client";

import { useEffect, useRef, useState } from "react";
import { Layers, ShoppingCart, TrendingUp, Users, DollarSign, type LucideIcon } from "lucide-react";
import { MODULES, type DashboardModule } from "@/components/sections/dashboard/moduleData";

const iconMap: Record<DashboardModule["icon"], LucideIcon> = {
  Layers,
  ShoppingCart,
  TrendingUp,
  Users,
  DollarSign,
};

function MobileCard({ module }: { module: DashboardModule }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const Icon = iconMap[module.icon];

  return (
    <div
      ref={ref}
      style={{
        background: "#ffffff",
        borderRadius: 18,
        padding: 28,
        border: "1px solid #e5e5ea",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        transform: visible ? "translateX(0)" : "translateX(36px)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.45s ease, opacity 0.45s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: `${module.color}12`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={22} color={module.color} />
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#1d1d1f" }}>{module.label}</div>
          <div style={{ fontSize: 12, color: "#6e6e73" }}>{module.sub}</div>
        </div>
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1d1d1f", marginBottom: 10, letterSpacing: "-0.02em" }}>
        {module.headline}
      </h3>
      <p style={{ fontSize: 14, color: "#6e6e73", lineHeight: 1.65, marginBottom: 20 }}>{module.body}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, paddingTop: 16, borderTop: "1px solid #e5e5ea" }}>
        {module.stats.map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: module.color, letterSpacing: "-0.04em" }}>{stat.value}</div>
            <div style={{ fontSize: 10, color: "#6e6e73", marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Mobile homepage product deep dive — intentionally no GSAP (keeps LCP/TBT weight off the critical path). */
export function DashboardMobileModules() {
  return (
    <section id="product-deep-dive" className="bg-[#f5f5f7] px-5 py-20 lg:hidden">
      <div className="mb-12 text-center">
        <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-blue">How It Works</div>
        <h2 className="text-balance text-[clamp(1.75rem,6vw,2.5rem)] font-bold tracking-[-0.03em] text-[#1d1d1f]">
          One operating record. <span style={{ color: "#0047FF" }}>Every team working from it.</span>
        </h2>
      </div>

      <div className="mx-auto flex max-w-lg flex-col gap-8 pb-12">
        {MODULES.map((module) => (
          <MobileCard key={module.id} module={module} />
        ))}
      </div>
    </section>
  );
}

export default DashboardMobileModules;
