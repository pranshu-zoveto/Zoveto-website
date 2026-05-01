"use client";

import React from "react";
import {
  Terminal,
  Layers,
  ShoppingCart,
  TrendingUp,
  Users,
  DollarSign,
  Megaphone,
  Wrench,
  Settings,
  Shield,
  Search,
  Bell,
  type LucideIcon,
} from "lucide-react";
import { MODULES, type DashboardModule } from "@/components/sections/dashboard/moduleData";

type Tile = {
  id: string;
  label: string;
  sub: string;
  Icon: LucideIcon;
};

const MODULE_ICON: Record<DashboardModule["icon"], LucideIcon> = {
  Layers,
  ShoppingCart,
  TrendingUp,
  Users,
  DollarSign,
};

const TILES_ROW1: Tile[] = [
  { id: "command-center", label: "Command Center", sub: "Priorities and daily control", Icon: Terminal },
  ...MODULES.map((m) => ({
    id: m.id,
    label: m.label,
    sub: m.sub,
    Icon: MODULE_ICON[m.icon],
  })),
];

const TILES_ROW2: Tile[] = [
  { id: "marketing", label: "Marketing & Content", sub: "Content, growth & campaigns", Icon: Megaphone },
  { id: "service", label: "Service Center", sub: "Repairs and jobs", Icon: Wrench },
  { id: "settings", label: "Settings", sub: "Company, access, and billing", Icon: Settings },
  { id: "admin", label: "Zoveto Admin", sub: "Platform operations", Icon: Shield },
];

function DashTile({ id, label, sub, Icon }: Tile) {
  return (
    <div
      className="dash-tile"
      data-module={id}
      style={{
        background: "#ffffff",
        border: "1px solid #e5e5ea",
        borderRadius: 18,
        padding: "28px 20px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 12,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        backfaceVisibility: "hidden",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
          background: "rgba(0, 71, 255, 0.06)",
          color: "#0047FF",
        }}
      >
        <Icon size={22} />
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#1d1d1f", lineHeight: 1.3 }}>{label}</div>
      <div style={{ fontSize: 11, color: "#6e6e73", lineHeight: 1.4 }}>{sub}</div>
    </div>
  );
}

export function DashboardLight() {
  return (
    <div
      className="dash-wrapper"
      style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f5f7", width: "100%" }}
    >
      <div
        style={{
          height: 48,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #e5e5ea",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              background: "#0047FF",
              color: "white",
              borderRadius: 7,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 14,
            }}
          >
            Z
          </div>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#1d1d1f" }}>ZOVETO</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#f5f5f7",
            border: "1px solid #e5e5ea",
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 12,
            color: "#6e6e73",
            width: 240,
          }}
        >
          <Search size={14} />
          <span>Search</span>
          <kbd
            style={{
              marginLeft: "auto",
              fontSize: 10,
              color: "#aeaeb2",
              background: "#ebebeb",
              padding: "1px 4px",
              borderRadius: 4,
            }}
          >
            ⌘K
          </kbd>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Bell size={18} color="#6e6e73" />
          <div
            style={{
              width: 30,
              height: 30,
              background: "#0047FF",
              color: "white",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            SA
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 14,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(140px, 1fr))", gap: 14, maxWidth: 1480, margin: "0 auto", width: "100%" }}>
          {TILES_ROW1.map((tile) => (
            <DashTile key={tile.id} {...tile} />
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(140px, 1fr))", gap: 14, maxWidth: 1480, margin: "0 auto", width: "100%" }}>
          {TILES_ROW2.map((tile) => (
            <DashTile key={tile.id} {...tile} />
          ))}
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}
