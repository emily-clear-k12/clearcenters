"use client";

import Link from "next/link";
import V2TopBar from "./V2TopBar";
import { DEMO_TEACHER, TEACHER_SETUPS, SUBJECTS, HANDS_OFF_LEVELS, setupUnitLabel } from "../../lib/v2/demoWeek";

const BG = "/teacher/console/bg-platform-room.jpg";

export const INK = "#2E2459";
export const MUTED = "#5E577F";
export const LINE = "#E4DEF4";
export const LAVENDER = "#8B6CFF";
export const MINT = "#E8F6EF";
export const CREAM = "#FFF8EE";
export const SOFT_LAV = "#F3EEFF";

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

/** Plan subnav: Daily Focus (teach today) | This Week (plan/publish). Demo today = Wed=2. */
export function TeacherSubnav({ active }) {
  const links = [
    { key: "day", label: "Daily Focus", href: "/v2/teacher/day?d=2", hint: "Teach today" },
    { key: "week", label: "This Week", href: "/v2/teacher", hint: "Plan & publish" },
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
            title={l.hint}
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

/**
 * SAM glance strip — max 3 calm needs with one-tap actions.
 * Soft lavender/cream/mint only; never scary red.
 */
export function SamGlance({ items, emptyLabel }) {
  const shown = (items || []).slice(0, 3);
  return (
    <section
      aria-label="SAM glance"
      style={{
        margin: "0 0 16px",
        background: SOFT_LAV,
        border: `1px solid ${LINE}`,
        borderRadius: 16,
        padding: "12px 14px",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: shown.length ? 10 : 0, flexWrap: "wrap" }}>
        <span style={{ fontWeight: 800, color: INK, fontSize: 13, letterSpacing: 0.3 }}>SAM glance</span>
        <span style={{ color: MUTED, fontSize: 12 }}>up to 3 things worth a look</span>
      </div>
      {shown.length === 0 ? (
        <div style={{ color: MUTED, fontSize: 14 }}>{emptyLabel || "Nothing waiting right now. You're in good shape."}</div>
      ) : (
        <div style={{ display: "grid", gap: 8 }}>
          {shown.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
                background: item.tone === "mint" ? MINT : item.tone === "cream" ? CREAM : "#fff",
                border: `1px solid ${LINE}`,
                borderRadius: 12,
                padding: "10px 12px",
              }}
            >
              <div style={{ flex: 1, minWidth: 180, color: INK, fontSize: 14, lineHeight: 1.35 }}>{item.text}</div>
              {item.actionLabel && (
                <button
                  type="button"
                  onClick={item.onAction}
                  style={{
                    border: `1px solid ${LAVENDER}`,
                    background: "#fff",
                    color: LAVENDER,
                    borderRadius: 999,
                    padding: "6px 12px",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.actionLabel}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * Period-as-rooms for departmentalized setups.
 * Bigger room cards replace tiny period chips.
 */
export function RoomCards({ classes, selectedKey, onSelect, setup, needsByClass }) {
  if (!classes || classes.length <= 1) return null;
  const unit = setupUnitLabel(setup);
  const subjectColor = setup?.subjects?.[0] ? SUBJECTS[setup.subjects[0]]?.color : LAVENDER;

  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(classes.length, 3)}, minmax(0, 1fr))`, gap: 10, margin: "12px 0 4px" }} role="listbox" aria-label="Period rooms">
      {classes.map((c) => {
        const on = selectedKey === c.key;
        const needs = needsByClass?.[c.key] || 0;
        const ready = needs === 0;
        return (
          <button
            key={c.key}
            type="button"
            role="option"
            aria-selected={on}
            onClick={() => onSelect(c.key)}
            style={{
              textAlign: "left",
              cursor: "pointer",
              fontFamily: "inherit",
              borderRadius: 16,
              padding: "14px 14px 12px",
              border: `2px solid ${on ? LAVENDER : LINE}`,
              background: on ? "rgba(139,108,255,.10)" : "#fff",
              boxShadow: on ? "0 8px 20px rgba(139,108,255,.18)" : "none",
              color: INK,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: subjectColor, flexShrink: 0 }} />
              <span style={{ fontWeight: 800, fontSize: 15 }}>{c.name}</span>
            </div>
            <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.35 }}>
              {unit ? `${unit} · ` : ""}
              {c.students != null ? `${c.students} kids` : "class"}
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 12,
                fontWeight: 700,
                color: ready ? "#2FA36B" : "#8A6A20",
                background: ready ? MINT : CREAM,
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                borderRadius: 999,
                padding: "3px 10px",
              }}
            >
              {ready ? "✓ ready" : "needs you"}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/** Compact self-contained class label when there's only one room. */
export function SingleRoomLabel({ cls, setup }) {
  if (!cls) return null;
  const unit = setupUnitLabel(setup);
  return (
    <span style={{ fontSize: 13, fontWeight: 600, color: MUTED, padding: "6px 4px" }}>
      {cls.name}
      {unit ? ` · ${unit}` : ""}
      {cls.students != null ? ` · ${cls.students} kids` : ""}
    </span>
  );
}

/**
 * Small hands-off dial: I'll plan / Plan for me / Run it.
 * Wired to HANDS_OFF_LEVELS; light behavior (toast via onChange).
 */
export function HandsOffDial({ level, onChange }) {
  return (
    <div
      role="group"
      aria-label="How weeks run"
      style={{
        display: "inline-flex",
        gap: 4,
        background: "rgba(255,255,255,.85)",
        border: `1px solid ${LINE}`,
        borderRadius: 999,
        padding: 3,
        flexWrap: "wrap",
      }}
    >
      {HANDS_OFF_LEVELS.map((l) => {
        const on = l.key === level;
        return (
          <button
            key={l.key}
            type="button"
            title={l.body}
            aria-pressed={on}
            onClick={() => onChange(l.key)}
            style={{
              border: "none",
              borderRadius: 999,
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              color: on ? "#fff" : MUTED,
              background: on ? LAVENDER : "transparent",
            }}
          >
            {l.short || l.title}
          </button>
        );
      })}
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