"use client";

import Link from "next/link";
import V2TopBar from "./V2TopBar";
import { DEMO_TEACHER, TEACHER_SETUPS, SUBJECTS, HANDS_OFF_LEVELS, DAYS, DAY_NAMES, DATES, setupUnitLabel, handsOffLevelMeta } from "../../lib/v2/demoWeek";
import { GLANCE, GLANCE_CSS_VARS, glanceToken, glanceChipStyle, glanceCardStyle, GLANCE_LEGEND_HINT } from "../../lib/v2/glanceGrammar";

const BG = "/teacher/console/bg-platform-room.jpg";

export const INK = "#2E2459";
export const MUTED = "#5E577F";
export const LINE = "#E4DEF4";
export const LAVENDER = "#8B6CFF";
export const MINT = "#E8F6EF";
export const CREAM = "#FFF8EE";
export const SOFT_LAV = "#F3EEFF";

// Glance grammar re-exports (soft meaning cues — see lib/v2/glanceGrammar.js)
export { GLANCE, glanceToken, glanceChipStyle, glanceCardStyle, GLANCE_LEGEND_HINT };

export function StationShell({ children, active = "plan" }) {
  return (
    <div style={{ minHeight: "100vh", background: "#EDE8FA", ...GLANCE_CSS_VARS }}>
      <V2TopBar active={active} teacherName={DEMO_TEACHER.name} />
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
export function TeacherSubnav({ active, gradeCount }) {
  const n = typeof gradeCount === "number" ? gradeCount : 0;
  const links = [
    { key: "day", label: "Daily Focus", href: "/v2/teacher/day?d=2", hint: "Teach today" },
    { key: "week", label: "This Week", href: "/v2/teacher", hint: "Plan & publish" },
    { key: "grading", label: "Grading", href: "/v2/teacher/grading", hint: "Confirm scores" },
    { key: "reports", label: "Reports", href: "/v2/teacher/reports", hint: "By standard · stub" },
    { key: "library", label: "Library", href: "/v2/teacher/library", hint: "Browse · add stub" },
  ];
  const gradeTone = glanceToken("toGrade");
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
        const showGradeCount = l.key === "grading" && n > 0;
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
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {l.label}
            {showGradeCount && (
              <span
                aria-label={`${n} to grade`}
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: on ? "#fff" : gradeTone.fg,
                  background: on ? "rgba(255,255,255,.22)" : gradeTone.bg,
                  border: on ? "1px solid rgba(255,255,255,.35)" : `1px solid ${gradeTone.border}`,
                  borderRadius: 999,
                  padding: "1px 7px",
                  minWidth: 18,
                  textAlign: "center",
                }}
              >
                {n}
              </span>
            )}
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
                ...glanceCardStyle(item.meaning || item.tone || "teach"),
                borderRadius: 12,
                padding: "10px 12px",
              }}
            >
              <div style={{ flex: 1, minWidth: 180, color: INK, fontSize: 14, lineHeight: 1.35 }}>{item.text}</div>
              {item.actionLabel && item.href && (
                <Link
                  href={item.href}
                  style={{
                    border: `1px solid ${LAVENDER}`,
                    background: "#fff",
                    color: LAVENDER,
                    borderRadius: 999,
                    padding: "6px 12px",
                    fontWeight: 700,
                    fontSize: 13,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.actionLabel}
                </Link>
              )}
              {item.actionLabel && !item.href && (
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
 * One-time quiet provenance helper (not a tour modal).
 * “Tiles remember where they came from.” — dismiss → localStorage.
 */
export function ProvenanceHelperLine({ show, onDismiss, text = "Tiles remember where they came from." }) {
  if (!show) return null;
  return (
    <div
      role="status"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        flexWrap: "wrap",
        margin: "0 0 12px",
        padding: "8px 12px",
        borderRadius: 12,
        background: "rgba(255,255,255,.72)",
        border: `1px solid ${LINE}`,
        color: MUTED,
        fontSize: 13,
        lineHeight: 1.35,
      }}
    >
      <span>{text}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss provenance tip"
          style={{
            border: `1px solid ${LINE}`,
            background: "#fff",
            color: MUTED,
            borderRadius: 999,
            padding: "4px 10px",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            whiteSpace: "nowrap",
          }}
        >
          Got it
        </button>
      )}
    </div>
  );
}

/**
 * Period-as-rooms for departmentalized setups.
 * Bigger room cards replace tiny period chips.
 */

/**
 * SAM morning card — ~30-second warm open on Daily Focus.
 * Agenda headline + one win (first) + one calm watch.
 * Always offers a calm Open Check-ins CTA; amber glance when needs > 0.
 */
export function MorningCard({
  greeting,
  agendaLine,
  win,
  watch,
  onDismiss,
  checkInsCount = 0,
  checkInsHref = "/v2/teacher/check-ins",
}) {
  const needs = Number(checkInsCount) > 0;
  const ctaLabel = needs
    ? `Open Check-ins · ${checkInsCount} waiting`
    : "Open Check-ins";

  return (
    <section
      aria-label="SAM morning card"
      style={{
        margin: "0 0 16px",
        background: needs
          ? "linear-gradient(135deg, rgba(255,244,230,.98), rgba(255,255,255,.96))"
          : "linear-gradient(135deg, rgba(243,238,255,.98), rgba(255,255,255,.94))",
        border: needs
          ? `1px solid ${GLANCE.needsYou.border}`
          : `1px solid ${LINE}`,
        borderRadius: 18,
        padding: "14px 16px 12px",
        boxShadow: needs
          ? "0 10px 28px rgba(196,140,60,.12)"
          : "0 10px 28px rgba(139,108,255,.12)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
            <span
              style={{
                fontWeight: 800,
                color: needs ? GLANCE.needsYou.fg : INK,
                fontSize: 13,
                letterSpacing: 0.3,
              }}
            >
              SAM morning
            </span>
            <span style={{ color: MUTED, fontSize: 12 }}>
              {needs ? "~30 seconds · Check-ins waiting" : "~30 seconds · honest + calm"}
            </span>
          </div>
          {greeting && (
            <div style={{ marginTop: 4, color: INK, fontSize: 15, fontWeight: 600, lineHeight: 1.35 }}>{greeting}</div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <a
            href={checkInsHref}
            title={needs ? "Kids waiting for a Check-in" : "Open Check-ins"}
            style={{
              border: needs ? `1px solid ${GLANCE.needsYou.border}` : `1px solid ${LINE}`,
              background: needs ? GLANCE.needsYou.bg : "#fff",
              color: needs ? GLANCE.needsYou.fg : MUTED,
              borderRadius: 999,
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 800,
              textDecoration: "none",
              whiteSpace: "nowrap",
              fontFamily: "inherit",
            }}
          >
            {ctaLabel}
          </a>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss morning card for today"
              style={{
                border: `1px solid ${LINE}`,
                background: "#fff",
                color: MUTED,
                borderRadius: 999,
                padding: "6px 12px",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              Dismiss today
            </button>
          )}
        </div>
      </div>

      {agendaLine && (
        <div
          style={{
            ...glanceCardStyle("teach"),
            borderRadius: 12,
            padding: "10px 12px",
            marginBottom: 8,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, color: GLANCE.teach.fg, letterSpacing: 0.4, marginBottom: 2 }}>TODAY · NOW</div>
          <div style={{ color: INK, fontSize: 15, fontWeight: 700, lineHeight: 1.35 }}>{agendaLine}</div>
        </div>
      )}

      {win && (
        <div
          style={{
            ...glanceCardStyle("ready"),
            borderRadius: 12,
            padding: "10px 12px",
            marginBottom: 8,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, color: GLANCE.ready.fg, letterSpacing: 0.4, marginBottom: 2 }}>WIN · YESTERDAY</div>
          <div style={{ color: INK, fontSize: 14, lineHeight: 1.4 }}>{win}</div>
        </div>
      )}

      {watch && (
        <div
          style={{
            ...glanceCardStyle("needsYou"),
            borderRadius: 12,
            padding: "10px 12px",
            marginBottom: 8,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, color: GLANCE.needsYou.fg, letterSpacing: 0.4, marginBottom: 2 }}>WATCH · NOT YET</div>
          <div style={{ color: INK, fontSize: 14, lineHeight: 1.4 }}>{watch}</div>
        </div>
      )}

      {needs && (
        <div
          style={{
            marginTop: 2,
            fontSize: 12,
            fontWeight: 700,
            color: GLANCE.needsYou.fg,
            lineHeight: 1.4,
          }}
        >
          {checkInsCount === 1
            ? "1 kid waiting on Check-ins — a calm pull when you are ready."
            : `${checkInsCount} kids waiting on Check-ins — a calm pull when you are ready.`}
        </div>
      )}
    </section>
  );
}

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
                ...glanceChipStyle(ready ? "ready" : "needsYou"),
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
 * Tangible hands-off dial: I'll plan / Plan for me / Run it.
 * Shows brief body for the active level; optional subjectLabel for per-subject scope.
 */
export function HandsOffDial({ level, onChange, subjectLabel, compact }) {
  const meta = handsOffLevelMeta(level);
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: 4, alignItems: "flex-start", maxWidth: compact ? 320 : 520 }}>
      <div
        role="group"
        aria-label={subjectLabel ? `How weeks run · ${subjectLabel}` : "How weeks run"}
        style={{
          display: "inline-flex",
          gap: 4,
          background: "rgba(255,255,255,.85)",
          border: `1px solid ${LINE}`,
          borderRadius: 999,
          padding: 3,
          flexWrap: "wrap",
          boxShadow: level === "run_for_me" ? "0 0 0 2px rgba(139,108,255,.25)" : "none",
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
                padding: compact ? "5px 10px" : "6px 12px",
                fontSize: compact ? 11 : 12,
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
      {!compact && (
        <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.35, paddingLeft: 4 }}>
          {subjectLabel ? (
            <span style={{ fontWeight: 700, color: INK }}>{subjectLabel}: </span>
          ) : null}
          {meta.body}
          {meta.dialHint ? <span style={{ color: LAVENDER }}> · {meta.dialHint}</span> : null}
        </div>
      )}
    </div>
  );
}

/** Light chip reflecting current hands-off on Daily Focus. */
export function HandsOffChip({ level, onOpenPreview }) {
  const meta = handsOffLevelMeta(level);
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: INK,
          background: SOFT_LAV,
          border: `1px solid ${LINE}`,
          borderRadius: 999,
          padding: "6px 12px",
        }}
        title={meta.body}
      >
        Weeks: {meta.short}
      </span>
      {(level === "plan_for_me" || level === "run_for_me") && onOpenPreview && (
        <button
          type="button"
          onClick={onOpenPreview}
          style={{
            border: "none",
            background: "transparent",
            color: LAVENDER,
            fontWeight: 700,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "inherit",
            textDecoration: "underline",
            padding: 0,
          }}
        >
          Preview what goes out
        </button>
      )}
    </div>
  );
}


/** Calm entry chip → Check-ins (reteach / small-group stub). Path: /v2/teacher/check-ins. */
export function WhoNeedsMeChip({ count, href = "/v2/teacher/check-ins" }) {
  const n = typeof count === "number" ? count : 0;
  const label = n === 0 ? "Check-ins · clear" : n === 1 ? "Check-ins · 1" : `Check-ins · ${n}`;
  const ready = n === 0;
  return (
    <Link
      href={href}
      title="Open Check-ins"
      style={{
        fontSize: 12,
        fontWeight: 700,
        ...glanceChipStyle(ready ? "ready" : "needsYou"),
        borderRadius: 999,
        padding: "6px 12px",
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Link>
  );
}

/** Tiny collapsed legend hint — docs first; optional one-liner, never a loud key. */
export function GlanceLegendHint({ show = false }) {
  if (!show) return null;
  return (
    <p
      title={GLANCE_LEGEND_HINT}
      style={{
        margin: "0 0 8px",
        fontSize: 11,
        color: MUTED,
        opacity: 0.75,
        letterSpacing: 0.2,
      }}
    >
      {GLANCE_LEGEND_HINT}
    </p>
  );
}

/**
 * Sunday preview / safety net — "Here's what goes out".
 * Lists outbound assigns by day / subject / period; Change + Looks good.
 */
export function SundayPreviewModal({ open, onClose, rows, onChangeDay, onAcknowledge, onApplyToWeek, applied, weekLabel }) {
  if (!open) return null;

  const byDay = {};
  for (const r of rows || []) {
    if (!byDay[r.day]) byDay[r.day] = [];
    byDay[r.day].push(r);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sunday preview"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(46,36,89,.40)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 40,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(255,255,255,.97)",
          borderRadius: 22,
          padding: "22px 22px 18px",
          maxWidth: 640,
          width: "100%",
          maxHeight: "min(86vh, 720px)",
          overflow: "auto",
          boxShadow: "0 24px 60px rgba(46,36,89,.28)",
          border: `1px solid ${LINE}`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 22, color: INK }}>
              Here&apos;s what goes out
            </h2>
            <p style={{ margin: "4px 0 0", color: MUTED, fontSize: 14 }}>
              {weekLabel || "This week"} · Sunday preview · change anything before it assigns
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{ border: "none", background: "transparent", color: MUTED, fontWeight: 700, cursor: "pointer", fontSize: 18 }}
          >
            ×
          </button>
        </div>

        <div style={{ marginTop: 16, display: "grid", gap: 14 }}>
          {DAYS.map((d, i) => {
            const items = byDay[i] || [];
            if (items.length === 0) return null;
            return (
              <section key={d} style={{ background: SOFT_LAV, borderRadius: 14, padding: "12px 12px 10px", border: `1px solid ${LINE}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, gap: 8, flexWrap: "wrap" }}>
                  <div style={{ fontWeight: 800, color: INK, fontSize: 14 }}>
                    {DAY_NAMES[i]} · {DATES[i]}
                  </div>
                  {onChangeDay && !items.every((x) => x.type === "calendar") && (
                    <button
                      type="button"
                      onClick={() => onChangeDay(i)}
                      style={{
                        border: `1px solid ${LAVENDER}`,
                        background: "#fff",
                        color: LAVENDER,
                        borderRadius: 999,
                        padding: "4px 12px",
                        fontWeight: 700,
                        fontSize: 12,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      Change
                    </button>
                  )}
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  {items.map((r) => {
                    if (r.type === "calendar") {
                      return (
                        <div
                          key={r.id}
                          style={{
                            background: CREAM,
                            border: `1px solid ${LINE}`,
                            borderRadius: 10,
                            padding: "10px 12px",
                            color: "#8A6A20",
                            fontWeight: 700,
                            fontSize: 13,
                          }}
                        >
                          {r.text}
                        </div>
                      );
                    }
                    const sub = SUBJECTS[r.subject];
                    return (
                      <div
                        key={r.id}
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "flex-start",
                          background: "#fff",
                          border: `1px solid ${LINE}`,
                          borderRadius: 10,
                          padding: "8px 10px",
                        }}
                      >
                        <span style={{ width: 5, alignSelf: "stretch", background: sub?.color || LAVENDER, borderRadius: 4 }} />
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ fontSize: 11, fontWeight: 800, color: sub?.color || MUTED, textTransform: "uppercase" }}>
                            {sub?.name || r.subject} · {r.periodLabel}
                            {r.auto ? " · auto" : ""}
                          </div>
                          <div style={{ fontSize: 14, fontWeight: 650, color: INK }}>{r.title}</div>
                          {r.minutes != null && (
                            <div style={{ fontSize: 12, color: MUTED }}>{r.minutes} min</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: `1px solid ${LINE}`,
              background: "#fff",
              color: INK,
              borderRadius: 999,
              padding: "10px 16px",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Keep editing
          </button>
          {onApplyToWeek && (
            <button
              type="button"
              onClick={onApplyToWeek}
              title="Write demo routine blocks onto This Week"
              style={{
                border: applied ? `1px solid ${MINT}` : "none",
                background: applied ? MINT : "#5B4F9A",
                color: applied ? INK : "#fff",
                borderRadius: 999,
                padding: "10px 16px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: applied ? "none" : "0 6px 16px rgba(91,79,154,.22)",
              }}
            >
              {applied ? "Applied to This Week ✓" : "Apply to This Week"}
            </button>
          )}
          <button
            type="button"
            onClick={onAcknowledge}
            style={{
              border: "none",
              background: LAVENDER,
              color: "#fff",
              borderRadius: 999,
              padding: "10px 18px",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Looks good
          </button>
        </div>
      </div>
    </div>
  );
}

/** Banner prompting Sunday preview when Plan for me / Run it is on. */
export function SundayPreviewBanner({ onOpen, acked, onApplyToWeek, applied }) {
  if (acked) return null;
  return (
    <div
      style={{
        margin: "0 0 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
        background: CREAM,
        border: `1px solid ${LINE}`,
        borderRadius: 14,
        padding: "10px 14px",
      }}
    >
      <div style={{ flex: 1, minWidth: 200, color: INK, fontSize: 14, lineHeight: 1.35 }}>
        <strong>Sunday preview:</strong> peek at what goes out this week before anything assigns.
      </div>
      <button
        type="button"
        onClick={onOpen}
        style={{
          border: "none",
          background: LAVENDER,
          color: "#fff",
          borderRadius: 999,
          padding: "8px 14px",
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer",
          fontFamily: "inherit",
          whiteSpace: "nowrap",
        }}
      >
        Preview what goes out
      </button>
      {onApplyToWeek && (
        <button
          type="button"
          onClick={onApplyToWeek}
          style={{
            border: applied ? `1px solid ${LINE}` : "none",
            background: applied ? MINT : "#5B4F9A",
            color: applied ? INK : "#fff",
            borderRadius: 999,
            padding: "8px 14px",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "inherit",
            whiteSpace: "nowrap",
          }}
        >
          {applied ? "Applied ✓" : "Apply to This Week"}
        </button>
      )}
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