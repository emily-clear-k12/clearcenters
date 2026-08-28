"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

// Palette updated Aug 27 (evening pass) to match the new sci-fi banner art
// Emily supplied — violet and teal sampled directly from that image's
// crystal glow and edge lighting, replacing the app's older, bluer violet
// (#7B5DFF) and darker teal (#00C2C7). This same pair now also lives in
// every app/teacher/*/page.js COLORS object, so the two need to stay in
// sync if either is ever tuned again.
const COLORS = {
  navy: "#0D1B2A",
  deepNavy: "#162845",
  canvas: "#F2F0FA",
  white: "#FFFFFF",
  violet: "#8C52F2",
  violetSoft: "#EEE6FD",
  teal: "#6FD8F5",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#697386",
};

// Grouped Aug 27 (evening pass) — was one flat list of 10 items, which read
// as 10 equally-weighted destinations with no sense of where to look for
// something. Grouping into Teach / Track / Grow & Manage (with Overview
// standing alone up top as the home destination) gives a teacher a smaller
// set of categories to scan instead of one long list. The hrefs, icons, and
// destinations themselves are unchanged — this is a presentation-only
// reorganization, nothing was renamed or moved.
const NAV_GROUPS = [
  {
    section: null,
    items: [{ label: "Overview", icon: "/teacher/nav_overview.png", href: "/teacher" }],
  },
  {
    section: "Teach",
    items: [
      { label: "My Classes", icon: "/teacher/nav_my_classes.png", href: "/teacher/assign" },
      { label: "Challenge Library", icon: "/teacher/nav_assignments.png", href: "/teacher/assign/new" },
    ],
  },
  {
    section: "Track",
    items: [
      { label: "Student Progress", icon: "/teacher/nav_student_progress.png", href: "/teacher/progress" },
      { label: "Submissions", icon: "/teacher/nav_submissions.png", href: "/teacher/grade" },
      { label: "Reports", icon: "/teacher/nav_reports.png", href: "/teacher/reports" },
    ],
  },
  {
    section: "Grow & Manage",
    items: [
      { label: "Badges & Rewards", icon: "/teacher/nav_badges_rewards.png", href: "/teacher/badges" },
      { label: "Resources", icon: "/teacher/nav_resources.png", href: "/teacher/resources" },
      { label: "Messages", icon: "/teacher/nav_messages.png", href: "/teacher/messages" },
      { label: "Class Settings", icon: "/teacher/nav_class_settings.png", href: "/teacher/settings" },
    ],
  },
];

export default function TeacherSidebar({ teacherName, teacherEmail }) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <aside
      style={{
        width: 216,
        background: COLORS.white,
        borderRight: `1px solid ${COLORS.border}`,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        minHeight: "100vh",
      }}
    >
      {/* Real ClearCenters logo lockup (Aug 27), replacing the small crystal
          icon + text wordmark this sidebar used before — same transparent
          brand asset Emily supplied, just scoped to its own file under
          public/teacher/ rather than reusing the student login page's copy
          (public/clearcenters_logo.png), since there's no confirmation the
          two are pixel-identical crops. This sidebar is shared by every
          teacher page, so this one change updates the brand mark across the
          entire teacher dashboard at once. Capped at 170px so it comfortably
          fits the sidebar's 216px width with its existing 20px side padding;
          the "PROVE GROW SHINE" tagline is legible but necessarily small at
          this scale — a real, accepted trade-off of a wide 3:1 lockup living
          in a narrow sidebar column, not an oversight. */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 16px 16px" }}>
        <img src="/teacher/clearcenters_logo.png" alt="ClearCenters" style={{ width: "100%", maxWidth: 170, height: "auto", display: "block" }} />
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 2, padding: "4px 12px", flex: 1 }}>
        {NAV_GROUPS.map((group, gi) => (
          <React.Fragment key={group.section || `top-${gi}`}>
            {group.section && (
              <div
                style={{
                  fontSize: 10.5,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  color: COLORS.violet,
                  opacity: 0.8,
                  padding: "16px 12px 6px",
                }}
              >
                {group.section}
              </div>
            )}
            {group.items.map((item) => {
              const active = pathname === item.href || (item.href !== "/teacher" && pathname.startsWith(item.href));
              return (
                <button
                  key={item.label}
                  onClick={() => router.push(item.href)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    height: 44,
                    padding: "0 12px",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    // Active state is now the violet-to-teal gradient pill
                    // from the mockup instead of a flat soft-violet fill —
                    // ties the sidebar to the same brand gradient used on
                    // buttons throughout the app.
                    background: active ? `linear-gradient(135deg, ${COLORS.violet}, ${COLORS.teal})` : "transparent",
                    color: active ? COLORS.white : COLORS.textDark,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 13.5,
                    textAlign: "left",
                    transition: "background 120ms ease",
                    boxShadow: active ? "0 4px 14px rgba(140,82,242,.3)" : "none",
                  }}
                >
                  <img
                    src={item.icon}
                    alt=""
                    style={{
                      width: 20,
                      height: 20,
                      objectFit: "contain",
                      opacity: active ? 1 : 0.75,
                      // The nav icon art is a single flat violet color, which
                      // would go nearly invisible sitting on top of the new
                      // gradient pill — this forces the icon to solid white
                      // only while active, no new icon art needed.
                      filter: active ? "brightness(0) invert(1)" : "none",
                    }}
                  />
                  {item.label}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </nav>

      <div style={{ padding: 16, borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 6px" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: COLORS.violetSoft, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.violet, fontSize: 14, flexShrink: 0 }}>
            {(teacherName || teacherEmail || "T")[0].toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.textDark, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {teacherName || teacherEmail || "Teacher"}
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted }}>Teacher</div>
          </div>
          <button onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: COLORS.violet, fontWeight: 700 }}>
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
}
