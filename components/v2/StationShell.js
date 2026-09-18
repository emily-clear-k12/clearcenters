"use client";

import Link from "next/link";
import V2TopBar from "./V2TopBar";
import { DEMO_TEACHER, TEACHER_SETUPS } from "../../lib/v2/demoWeek";

const BG = "/teacher/console/bg-platform-room.jpg";

export const INK = "#2E2459";
export const MUTED = "#5E577F";
export const LINE = "#E4DEF4";
export const LAVENDER = "#8B6CFF";

export function StationShell({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#EDE8FA" }}>
      <V2TopBar active="plan" teacherName={DEMO_TEACHER.name} />
      <div
        style={{
          position: "relative",
          minHeight: "calc(100vh - 58px)",
          backgroundImage: `linear-gradient(180deg, rgba(247,244,255,.35), rgba(247,244,255,.55)), url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <main style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "22px 16px 72px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

/** Plan subnav: This Week | Daily Focus (Wed=2 is demo "today"). */
export function TeacherSubnav({ active }) {
  const links = [
    { key: "week", label: "This Week", href: "/v2/teacher" },
    { key: "day", label: "Daily Focus", href: "/v2/teacher/day?d=2" },
  ];
  return (
    <nav
      aria-label="Teacher plan"
      style={{
        display: "inline-flex",
        gap: 4,
        background: "rgba(255,255,255,.7)",
        border: `1px solid ${LINE}`,
        borderRadius: 999,
        padding: 4,
        marginBottom: 14,
      }}
    >
      {links.map((l) => {
        const on = l.key === active;
        return (
          <Link
            key={l.key}
            href={l.href}
            aria-current={on ? "page" : undefined}
            style={{
              padding: "7px 16px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              color: on ? "#fff" : INK,
              background: on ? LAVENDER : "transparent",
            }}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}

/** Visible setup switcher: self-contained vs departmentalized. */
export function SetupSwitcher({ setupKey, onChange }) {
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "#fff",
        border: `1px solid ${LINE}`,
        borderRadius: 999,
        padding: "6px 14px",
        fontSize: 13,
        fontWeight: 600,
        color: INK,
      }}
    >
      <span style={{ color: MUTED, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.4 }}>
        Setup
      </span>
      <select
        value={setupKey}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Teacher setup"
        style={{ border: "none", background: "transparent", font: "inherit", color: "inherit", cursor: "pointer", outline: "none", maxWidth: "min(420px, 70vw)" }}
      >
        {Object.entries(TEACHER_SETUPS).map(([key, s]) => (
          <option key={key} value={key}>
            {s.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Glass({ children, style }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,.94)",
        border: "1px solid rgba(255,255,255,.8)",
        borderRadius: 28,
        boxShadow: "0 24px 60px rgba(46,36,89,.16)",
        padding: "22px 22px 18px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Pill({ active, onClick, children, color }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        borderRadius: 999,
        padding: "7px 14px",
        fontSize: 14,
        fontWeight: 700,
        fontFamily: "inherit",
        cursor: "pointer",
        color: active ? "#fff" : INK,
        background: active ? LAVENDER : "#fff",
        border: `1px solid ${active ? LAVENDER : LINE}`,
      }}
    >
      {color && <span style={{ width: 9, height: 9, borderRadius: 999, background: color, boxShadow: active ? "0 0 0 2px #fff" : "none" }} />}
      {children}
    </button>
  );
}

export function SelectChip({ value, onChange, options }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", background: "#fff", border: `1px solid ${LINE}`, borderRadius: 999, padding: "6px 12px", fontSize: 14, fontWeight: 600, color: INK }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ border: "none", background: "transparent", font: "inherit", color: "inherit", cursor: "pointer", outline: "none" }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
