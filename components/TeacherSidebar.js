"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

const COLORS = {
  navy: "#0D1B2A",
  deepNavy: "#162845",
  canvas: "#F2F0FA",
  white: "#FFFFFF",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#697386",
};

const NAV_ITEMS = [
  { label: "Overview", icon: "/teacher/nav_overview.png", href: "/teacher" },
  { label: "My Classes", icon: "/teacher/nav_my_classes.png", href: "/teacher/assign" },
  { label: "Assignments", icon: "/teacher/nav_assignments.png", href: "/teacher/assign" },
  { label: "Student Progress", icon: "/teacher/nav_student_progress.png", href: "/teacher/progress" },
  { label: "Submissions", icon: "/teacher/nav_submissions.png", href: "/teacher/grade" },
  { label: "Reports", icon: "/teacher/nav_reports.png", href: "/teacher/reports" },
  { label: "Resources", icon: "/teacher/nav_resources.png", href: "/teacher/resources" },
  { label: "Messages", icon: "/teacher/nav_messages.png", href: "/teacher/messages" },
  { label: "Badges & Rewards", icon: "/teacher/nav_badges_rewards.png", href: "/teacher/badges" },
  { label: "Class Settings", icon: "/teacher/nav_class_settings.png", href: "/teacher/settings" },
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
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "24px 20px 20px" }}>
        <img src="/teacher/brand_crystal_mark.png" alt="" style={{ width: 26, height: "auto" }} />
        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: COLORS.textDark }}>ClearCenters</div>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 2, padding: "8px 12px", flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || (item.href !== "/teacher" && pathname.startsWith(item.href));
          return (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                height: 46,
                padding: "0 12px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                background: active ? COLORS.violetSoft : "transparent",
                color: active ? COLORS.violet : COLORS.textDark,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 13.5,
                textAlign: "left",
                transition: "background 120ms ease",
              }}
            >
              <img src={item.icon} alt="" style={{ width: 20, height: 20, objectFit: "contain", opacity: active ? 1 : 0.75 }} />
              {item.label}
            </button>
          );
        })}
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
