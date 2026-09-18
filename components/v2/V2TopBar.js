"use client";

// CI2.0 teacher top bar. Same light-glass look as TeacherHUD, but with the
// CI2.0 navigation: Plan · Teach · Check · Grow, plus Library.
// Plan lands on Daily Focus (teach today); This Week stays under Plan subnav.

import Link from "next/link";
import SamIcon from "../SamIcon";
import { COLORS } from "../../lib/teacherTheme";

const NAV = [
  { key: "plan", label: "Plan", href: "/v2/teacher/day?d=2" },
  { key: "teach", label: "Teach" },
  { key: "check", label: "Check", href: "/v2/teacher/grading" },
  { key: "grow", label: "Grow", href: "/v2/teacher/reports" },
  { key: "library", label: "Library" },
];

export default function V2TopBar({ active = "plan", teacherName }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
        padding: "10px 20px",
        background: "#F4EFFF",
        borderBottom: `1px solid ${COLORS.border}`,
        boxShadow: "0 4px 18px rgba(80,60,150,.10)",
        position: "relative",
        zIndex: 5,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: 17,
            color: COLORS.textDark,
          }}
        >
          Crystal Instruction
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#fff",
            background: COLORS.violet,
            borderRadius: 999,
            padding: "2px 8px",
          }}
        >
          2.0
        </span>
      </div>

      <nav aria-label="Main" style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {NAV.map((item) => {
          const isActive = item.key === active;
          const base = {
            padding: "7px 14px",
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            border: "1px solid transparent",
          };
          if (!item.href) {
            return (
              <span
                key={item.key}
                title="Coming soon"
                style={{ ...base, color: COLORS.textMuted, opacity: 0.55, cursor: "default" }}
              >
                {item.label}
              </span>
            );
          }
          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              style={{
                ...base,
                color: isActive ? "#fff" : COLORS.textDark,
                background: isActive ? COLORS.violet : "transparent",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 8, color: COLORS.textDark, fontSize: 14, fontWeight: 600 }}>
        <SamIcon skinKey="cosmic" size={30} />
        <span>{teacherName}</span>
      </div>
    </header>
  );
}