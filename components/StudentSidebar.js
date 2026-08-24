"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

const COLORS = {
  navy: "#0D1B2A",
  deepNavy: "#162845",
  white: "#FFFFFF",
  gold: "#FFC44D",
};

// "Home", "My Missions", "Progress", "My Notebook", and "Gear Locker" all
// have real pages behind them now. "Badges" stays visible (so the sidebar
// doesn't look broken) but is non-interactive and dimmed, instead of
// looking clickable and silently doing nothing like they used to — the
// badge collection itself already lives on the Home screen.
const NAV_ITEMS = [
  { label: "Home", icon: "/icons/nav_home.png", href: "/home" },
  { label: "My Missions", icon: "/icons/nav_missions.png", href: "/missions" },
  { label: "Progress", icon: "/icons/nav_progress.png", href: "/progress" },
  { label: "Badges", icon: "/icons/nav_badges.png" },
  { label: "My Notebook", icon: "/icons/nav_notebook.png", href: "/notebook" },
  { label: "Gear Locker", icon: "/icons/nav_gear.png", href: "/gear-locker" },
];

export default function StudentSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/student-logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <aside style={{ width: 168, background: COLORS.navy, padding: "20px 12px", display: "flex", flexDirection: "column", gap: 20, flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px" }}>
        <img src="/icons/crystal_logo.png" alt="" style={{ width: 24 }} />
        <div style={{ fontFamily: "'Poppins', sans-serif", color: COLORS.white, fontWeight: 700, fontSize: 14.5 }}>
          ClearCenters<span style={{ color: COLORS.gold }}> HQ</span>
        </div>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {NAV_ITEMS.map((item) => {
          const active = item.href ? pathname === item.href : false;
          return (
            <button
              key={item.label}
              type="button"
              onClick={item.href ? () => router.push(item.href) : undefined}
              disabled={!item.href}
              style={{
                display: "flex", alignItems: "center", gap: 11, height: 46, padding: "0 10px", borderRadius: 12,
                background: active ? COLORS.deepNavy : "transparent",
                boxShadow: active ? `inset 3px 0 0 ${COLORS.gold}` : "none",
                color: active ? COLORS.white : "rgba(255,255,255,.75)",
                fontWeight: 600, fontSize: 13, width: "100%", textAlign: "left", border: "none",
                cursor: item.href ? "pointer" : "default",
                opacity: item.href ? 1 : 0.5,
                fontFamily: "inherit",
              }}
            >
              <img src={item.icon} alt="" style={{ width: 21, height: 21, objectFit: "contain" }} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div style={{ marginTop: "auto" }}>
        <button type="button" onClick={handleLogout} className="gc-btn" style={{ width: "100%", background: "rgba(255,255,255,.08)", color: COLORS.white, borderRadius: 10, padding: "9px 10px", fontWeight: 600, fontSize: 12.5, border: "none" }}>
          Log Out
        </button>
      </div>
    </aside>
  );
}
