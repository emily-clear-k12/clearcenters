"use client";

// Sept 13, 2026 — the slim top bar that replaces TeacherSidebar on pages
// moved over to the new "console" look (see the Orbit Map redesign in
// app/teacher/page.js). Where the old sidebar was a permanent 216px column
// listing every destination at once, this trades that for a compact bar —
// a big "The Hub" button, three category buttons, a page title, and the
// same account controls Overview already has — freeing the full page
// width for content on data-dense pages. TeacherSidebar itself is no
// longer imported anywhere (every teacher page now uses this bar), but its
// file still exports NAV_GROUPS as the one shared source of truth for every
// destination's label/icon/href, so this bar and that file never drift.
//
// Revised same day: the first pass at this was a dark navy bar to match a
// flat dark "console" background Emily didn't want ("I don't like dark
// mode"). Reskinned pages now sit on a bright illustrated background image
// (see PAGE_BACKGROUNDS in lib/teacherTheme.js), so this bar is now a
// light, glassy panel tinted the same lavender/light-purple as the room
// art's own ambient light — per Emily's note to "make the window color
// that light purple color" — instead of a dark bar with white text.
//
// Revised again, later same day: this used to be a single hamburger menu
// that opened one long list of every destination in the app. Two things
// fixed at once here: (1) a real bug — that dropdown's background was
// rgba(...,.98), 98% opaque rather than 100%, which let a faint ghost of
// whatever page content sat behind it (most visibly a bold heading like
// "Challenge Library") bleed through at ~2% strength. Barely visible in
// isolation, but very noticeable against high-contrast text, and it
// affected every reskinned page since they all share this one component.
// Every floating panel here now uses a fully opaque solid-hex background
// (never an alpha below 1) — audited the rest of the app for the same
// "nearly-but-not-100%-opaque panel over live content" pattern and found
// one more instance (the case detail modal on My Classes), fixed there too.
// (2) Emily's actual redesign ask: replace that single "everything in one
// dropdown" menu with three always-visible category buttons — Teach /
// Track / Grow — each opening its own small dropdown scoped to just that
// section's pages, so a teacher isn't scanning one long list every time.
// "The Hub" (was "Overview," renamed to match the student side's own
// terminology) gets its own bigger, dedicated button rather than living
// inside a dropdown, since it's the one destination every teacher jumps
// back to constantly.
//
// Revised again, later same day (round 3): the title in the middle used to
// sit in a `flex: 1` div between the nav cluster and the account cluster —
// `justify-content: space-between` on the row meant that middle div's own
// width was "whatever's left over," and centering text inside THAT only
// centers it relative to the leftover space, not the bar as a whole. Since
// the nav cluster (Hub button + 3 category buttons) is quite a bit wider
// than the account cluster (avatar + gear + log out), the title always sat
// visibly left of true-center. Switched the outer row from flex to a
// `1fr auto auto-sized-middle auto 1fr`-style CSS grid instead — two equal
// side tracks with the title in a middle column sized to its own content —
// which centers the title on the bar's actual full width no matter how
// unevenly sized the two side clusters are.
import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { NAV_GROUPS } from "./TeacherSidebar";
import { COLORS } from "../lib/teacherTheme";

const ICONS = {
  chevron: (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
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

// Short button labels for the top bar itself — the fuller name ("Grow &
// Manage") still shows as the section header inside that button's own
// dropdown, so nothing is lost, the top bar just stays compact.
const BUTTON_LABEL = { Teach: "Teach", Track: "Track", "Grow & Manage": "Grow" };

export default function TeacherHUD({ title, subtitle, accent = COLORS.aqua, teacherName, teacherEmail, actions }) {
  const router = useRouter();
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState(null); // null | "Teach" | "Track" | "Grow & Manage"
  const navRef = useRef(null);

  useEffect(() => {
    function onClickAway(e) {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenSection(null);
    }
    document.addEventListener("mousedown", onClickAway);
    return () => document.removeEventListener("mousedown", onClickAway);
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const displayName = teacherName || teacherEmail || "Teacher";

  const hubItem = NAV_GROUPS.find((g) => g.section === null)?.items?.[0];
  const categoryGroups = NAV_GROUPS.filter((g) => g.section !== null);

  function isActive(href) {
    return pathname === href || (href !== "/teacher" && pathname.startsWith(href));
  }
  function sectionHasActiveItem(group) {
    return group.items.some((item) => isActive(item.href));
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: 16,
        padding: "12px 28px",
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
      <div ref={navRef} style={{ display: "flex", alignItems: "center", gap: 8, justifySelf: "start", minWidth: 0 }}>
        {/* The Hub — bigger, and its own dedicated button with no dropdown,
            since it's the one place every teacher jumps back to constantly. */}
        <button
          onClick={() => { setOpenSection(null); router.push(hubItem?.href || "/teacher"); }}
          className="hud-btn"
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: isActive("/teacher") ? `linear-gradient(135deg, ${COLORS.violet}, ${COLORS.aqua})` : "rgba(255,255,255,.55)",
            border: `1.5px solid ${isActive("/teacher") ? "transparent" : "rgba(140,82,242,.3)"}`,
            borderRadius: 999,
            padding: "8px 16px 8px 10px",
            cursor: "pointer",
          }}
          aria-label="Back to The Hub"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path d="M12 2 4 7v10l8 5 8-5V7l-8-5Z" fill={isActive("/teacher") ? COLORS.white : COLORS.violet} />
            <path d="M12 2 4 7l8 5 8-5-8-5Z" fill={isActive("/teacher") ? "rgba(255,255,255,.75)" : COLORS.aqua} />
          </svg>
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14.5, color: isActive("/teacher") ? COLORS.white : COLORS.textDark, whiteSpace: "nowrap" }}>
            The Hub
          </span>
        </button>

        <div style={{ width: 1, height: 22, background: "rgba(140,82,242,.22)", margin: "0 2px" }} />

        {categoryGroups.map((group) => {
          const active = sectionHasActiveItem(group);
          const open = openSection === group.section;
          return (
            <div key={group.section} style={{ position: "relative" }}>
              <button
                onClick={() => setOpenSection((prev) => (prev === group.section ? null : group.section))}
                className="hud-btn"
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: active ? "rgba(140,82,242,.16)" : open ? "rgba(140,82,242,.1)" : "transparent",
                  border: `1px solid ${active || open ? "rgba(140,82,242,.35)" : "rgba(140,82,242,.2)"}`,
                  borderRadius: 999,
                  padding: "8px 14px",
                  cursor: "pointer",
                  color: COLORS.textDark,
                  fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13.5,
                }}
              >
                {BUTTON_LABEL[group.section] || group.section}
                <span style={{ display: "flex", transform: open ? "rotate(180deg)" : "none", transition: "transform 150ms ease", opacity: 0.7 }}>
                  {ICONS.chevron}
                </span>
              </button>

              {open && (
                <div
                  style={{
                    position: "absolute", top: "calc(100% + 8px)", left: 0,
                    width: 232, maxHeight: "70vh", overflowY: "auto",
                    // Fully opaque — see the fix note at the top of this file.
                    background: "#FAF8FF",
                    border: "1px solid rgba(140,82,242,.2)",
                    borderRadius: 14, boxShadow: "0 16px 48px rgba(80,60,150,.28)",
                    padding: "10px 8px 6px",
                    zIndex: 30,
                  }}
                >
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: COLORS.violet, opacity: 0.8, padding: "0 10px 8px" }}>
                    {group.section}
                  </div>
                  {group.items.map((item) => {
                    const itemActive = isActive(item.href);
                    return (
                      <button
                        key={item.label}
                        onClick={() => { setOpenSection(null); router.push(item.href); }}
                        style={{
                          display: "flex", alignItems: "center", gap: 10, width: "100%",
                          padding: "8px 10px", borderRadius: 9, border: "none", cursor: "pointer",
                          background: itemActive ? `linear-gradient(135deg, ${COLORS.violet}, ${COLORS.aqua})` : "transparent",
                          color: itemActive ? COLORS.white : COLORS.textDark,
                          fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, textAlign: "left",
                        }}
                      >
                        <img src={item.icon} alt="" style={{ width: 17, height: 17, objectFit: "contain", opacity: itemActive ? 1 : 0.85, filter: itemActive ? "brightness(0) invert(1)" : "none" }} />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", minWidth: 0 }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 19, color: COLORS.textDark, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: accent, boxShadow: `0 0 10px ${accent}`, flexShrink: 0 }} />
          {title}
        </div>
        {subtitle && <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{subtitle}</div>}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, justifySelf: "end", minWidth: 0 }}>
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
