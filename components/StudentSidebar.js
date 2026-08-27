"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const COLORS = {
  navy: "#0D1B2A",
  deepNavy: "#162845",
  white: "#FFFFFF",
  gold: "#FFC44D",
};

// "My Notebook" merged into "Progress" (Aug 27, 2026) — that page now
// covers both "what needs your attention" and "finished & graded case
// files" in one place, so its own nav entry and route went away (the old
// /notebook URL now just redirects to /progress, see app/notebook/page.js).
//
// "Badges" stays visible (so the sidebar doesn't look broken) but is
// non-interactive and dimmed, instead of looking clickable and silently
// doing nothing like it used to — the badge collection itself lives on
// the Home screen. It's slated to move into Gear Locker under a new
// combined name; leave this dimmed until that page exists.
const NAV_ITEMS = [
  { label: "Home", icon: "/icons/nav_home.png", href: "/home" },
  { label: "My Missions", icon: "/icons/nav_missions.png", href: "/missions" },
  { label: "Progress", icon: "/icons/nav_progress.png", href: "/progress" },
  { label: "Badges", icon: "/icons/nav_badges.png" },
  { label: "Gear Locker", icon: "/icons/nav_gear.png", href: "/gear-locker" },
];

export default function StudentSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  // Small badge on "Progress" — a new grade waiting, or a mission sent
  // back for revision. Fetched once on mount rather than threaded down as
  // a prop, so every page that renders this sidebar gets it for free
  // without each page.js needing to fetch and pass it through.
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/student/notifications")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) setNotifCount(data.count || 0);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [pathname]);

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
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.href === "/progress" && notifCount > 0 && (
                <span style={{ minWidth: 18, height: 18, borderRadius: 999, background: "#FF9F43", color: COLORS.white, fontSize: 10.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px", flexShrink: 0 }}>
                  {notifCount > 9 ? "9+" : notifCount}
                </span>
              )}
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
