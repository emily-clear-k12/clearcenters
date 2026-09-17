"use client";

import V2TopBar from "./V2TopBar";
import { DEMO_TEACHER } from "../../lib/v2/demoWeek";

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
