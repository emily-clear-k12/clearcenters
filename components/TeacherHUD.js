"use client";

// Sept 13, 2026 — the slim top bar that replaces TeacherSidebar on pages
// moved over to the new "console" look (see the Orbit Map redesign in
// app/teacher/page.js). Where the old sidebar was a permanent 216px column
// listing every destination at once, this trades that for a compact bar —
// logo/home, a menu button that reveals the same destination list on
// demand, a page title, and the same account controls Overview already
// has — freeing the full page width for content on data-dense pages like
// this one. Pages not yet reskinned keep using TeacherSidebar untouched;
// this is additive, not a replacement of that file.
//
// Revised same day: the first pass at this was a dark navy bar to match a
// flat dark "console" background Emily didn't want ("I don't like dark
// mode"). Reskinned pages now sit on a bright illustrated background image
// (see PAGE_BACKGROUNDS in lib/teacherTheme.js), so this bar is now a
// light, glassy panel tinted the same lavender/light-purple as the room
// art's own ambient light — per Emily's note to "make the window color
// that light purple color" — instead of a dark bar with white text.
import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { NAV_GROUPS } from "./TeacherSidebar";
import { COLORS } from "../lib/teacherTheme";

const ICONS = {
  menu: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M19.4 13.5c.04-.33.06-.66.06-1s-.02-.67-.06-1l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.4 7.4 0 0 0-1.73-1l-.36-2.54a.5.5 0 0 0-.5-.43h-3.84a.5.5 0 0 0-.5.43l-.36 2.54c-.63.24-1.21.58-1.73 1l-2.39-.96a.5.5 0 0 0-.6.22L2.65 9.28a.5.5 0 0 0 .12.64L4.8 11.5c-.04.33-.06.66-.06 1s.02.67.06 1L2.77 15.08a.5.5 0 0 0-.12.64l1.92 3.32c.13.23.4.32.6.22l2.39-.96c.52.42 1.1.76 1.73 1l.36 2.54a.5.5 0 0 0 .5.43h3.84a.5.5 0 0 0 .5-.43l.36-2.54c.63-.24 1.21-.58 1.73-1l2.39.96c.23.1.47 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64L19.4 13.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default function TeacherHUD({ title, subtitle, accent = COLORS.aqua, teacherName, teacherEmail, actions }) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function onClickAway(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClickAway);
    return () => document.removeEventListener("mousedown", onClickAway);
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const displayName = teacherName || teacherEmail || "Teacher";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "14px 28px",
        position: "relative",
        zIndex: 20,
        // The "light purple window" bar — a translucent lavender glass
        // panel over whatever background art the page sits on, rather than
        // a flat opaque color, so the room art still reads faintly through it.
        background: "rgba(233,221,252,.78)",
        borderBottom: `1px solid rgba(140,82,242,.25)`,
        backdropFilter: "blur(6px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>
        <div ref={menuRef} style={{ position: "relative" }}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 34, height: 34, borderRadius: 9,
              background: menuOpen ? "rgba(140,82,242,.16)" : "transparent",
              border: "1px solid rgba(140,82,242,.28)",
              color: COLORS.textDark, cursor: "pointer",
            }}
          >
            {ICONS.menu}
          </button>

          {menuOpen && (
            <div
              style={{
                position: "absolute", top: "calc(100% + 8px)", left: 0,
                width: 248, maxHeight: "70vh", overflowY: "auto",
                background: "rgba(250,248,255,.98)", border: "1px solid rgba(140,82,242,.2)",
                borderRadius: 14, boxShadow: "0 16px 48px rgba(80,60,150,.28)",
                padding: "6px 8px",
              }}
            >
              {NAV_GROUPS.map((group, gi) => (
                <div key={group.section || `top-${gi}`}>
                  {group.section && (
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: COLORS.violet, opacity: 0.8, padding: "12px 10px 4px" }}>
                      {group.section}
                    </div>
                  )}
                  {group.items.map((item) => {
                    const active = pathname === item.href || (item.href !== "/teacher" && pathname.startsWith(item.href));
                    return (
                      <button
                        key={item.label}
                        onClick={() => { setMenuOpen(false); router.push(item.href); }}
                        style={{
                          display: "flex", alignItems: "center", gap: 10, width: "100%",
                          padding: "8px 10px", borderRadius: 9, border: "none", cursor: "pointer",
                          background: active ? `linear-gradient(135deg, ${COLORS.violet}, ${COLORS.aqua})` : "transparent",
                          color: active ? COLORS.white : COLORS.textDark,
                          fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, textAlign: "left",
                        }}
                      >
                        <img src={item.icon} alt="" style={{ width: 17, height: 17, objectFit: "contain", opacity: active ? 1 : 0.85, filter: active ? "brightness(0) invert(1)" : "none" }} />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => router.push("/teacher")}
          style={{ display: "flex", alignItems: "center", gap: 9, background: "none", border: "none", cursor: "pointer", padding: "4px 2px" }}
          aria-label="Back to Overview"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M12 2 4 7v10l8 5 8-5V7l-8-5Z" fill={COLORS.violet} /><path d="M12 2 4 7l8 5 8-5-8-5Z" fill={COLORS.aqua} /></svg>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14, color: COLORS.textDark, whiteSpace: "nowrap" }}>ClearCenters</span>
        </button>
      </div>

      <div style={{ flex: 1, minWidth: 0, textAlign: "center" }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 19, color: COLORS.textDark, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: accent, boxShadow: `0 0 10px ${accent}` }} />
          {title}
        </div>
        {subtitle && <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{subtitle}</div>}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "0 0 auto" }}>
        {actions}
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(140,82,242,.18)", color: COLORS.violet, fontWeight: 700, fontSize: 12.5, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {displayName[0].toUpperCase()}
        </div>
        <button onClick={() => router.push("/teacher/settings")} style={{ background: "none", border: "none", color: COLORS.textMuted, cursor: "pointer", display: "flex" }} aria-label="Settings">
          {ICONS.gear}
        </button>
        <button onClick={handleLogout} style={{ background: "none", border: "none", color: COLORS.textMuted, fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
          Log Out
        </button>
      </div>
    </div>
  );
}
