"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import V2TopBar from "./V2TopBar";
import { DEMO_TEACHER, TEACHER_SETUPS, SUBJECTS, HANDS_OFF_LEVELS, DAYS, DAY_NAMES, DATES, setupUnitLabel, handsOffLevelMeta } from "../../lib/v2/demoWeek";
import { GLANCE, GLANCE_CSS_VARS, glanceToken, glanceChipStyle, glanceCardStyle, GLANCE_LEGEND_HINT } from "../../lib/v2/glanceGrammar";
import {
  CHECK_INS_HREF,
  getWhoNeedsMeCount,
  readSelectedClassFilter,
  TEACHER_CLASS_FILTER_KEY,
  WHO_NEEDS_ME_STORAGE_KEY,
} from "../../lib/v2/demoWhoNeedsMe";
import { GRADING_INBOX_KEY, GRADING_STORAGE_KEY } from "../../lib/v2/demoGrading";

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

/** Plan subnav: Daily Focus | This Week | Check-ins | Grading | Reports | Library. Demo today = Wed=2.
 * Check-ins amber count self-loads with current period/room filter (same lens as Daily Focus / Check-ins). */
export function TeacherSubnav({ active, gradeCount, checkInsCount: checkInsCountProp }) {
  const n = typeof gradeCount === "number" ? gradeCount : 0;
  const [checkInsLocal, setCheckInsLocal] = useState(0);

  useEffect(() => {
    if (typeof checkInsCountProp === "number") return undefined;
    const refresh = () => {
      try {
        const selectedClass = readSelectedClassFilter();
        setCheckInsLocal(
          getWhoNeedsMeCount(undefined, undefined, {
            classFilter: selectedClass,
            inheritPeriodId: selectedClass || "A",
          })
        );
      } catch (_) {
        setCheckInsLocal(0);
      }
    };
    refresh();
    const onStorage = (e) => {
      if (
        !e.key ||
        e.key === WHO_NEEDS_ME_STORAGE_KEY ||
        e.key === GRADING_STORAGE_KEY ||
        e.key === GRADING_INBOX_KEY ||
        e.key === TEACHER_CLASS_FILTER_KEY
      ) {
        refresh();
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", refresh);
    window.addEventListener("ci2-who-needs-updated", refresh);
    window.addEventListener("ci2-grading-updated", refresh);
    window.addEventListener("ci2-class-filter-updated", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("ci2-who-needs-updated", refresh);
      window.removeEventListener("ci2-grading-updated", refresh);
      window.removeEventListener("ci2-class-filter-updated", refresh);
    };
  }, [checkInsCountProp]);

  const checkInsN = typeof checkInsCountProp === "number" ? checkInsCountProp : checkInsLocal;
  const links = [
    { key: "day", label: "Daily Focus", href: "/v2/teacher/day?d=2", hint: "Teach today" },
    { key: "week", label: "This Week", href: "/v2/teacher", hint: "Plan & publish" },
    { key: "checkins", label: "Check-ins", href: CHECK_INS_HREF, hint: "Kids who need you" },
    { key: "grading", label: "Grading", href: "/v2/teacher/grading", hint: "Confirm scores" },
    { key: "reports", label: "Reports", href: "/v2/teacher/reports", hint: "By standard · glance" },
    { key: "library", label: "Library", href: "/v2/teacher/library", hint: "Browse · add stub" },
  ];
  const gradeTone = glanceToken("toGrade");
  const checkInsTone = glanceToken("needsYou");
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
        flexWrap: "wrap",
      }}
    >
      {links.map((l) => {
        const on = l.key === active;
        const showGradeCount = l.key === "grading" && n > 0;
        const showCheckInsCount = l.key === "checkins" && checkInsN > 0;
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
            {showCheckInsCount && (
              <span
                aria-label={`${checkInsN} Check-ins waiting`}
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: on ? "#fff" : checkInsTone.fg,
                  background: on ? "rgba(255,255,255,.22)" : checkInsTone.bg,
                  border: on ? "1px solid rgba(255,255,255,.35)" : `1px solid ${checkInsTone.border}`,
                  borderRadius: 999,
                  padding: "1px 7px",
                  minWidth: 18,
                  textAlign: "center",
                }}
              >
                {checkInsN}
              </span>
            )}
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
 * Soft lavender/cream/white; amber only when a row truly needs you.
 * compact: shorter for side-by-side SAM morning | glance row.
 */
export function SamGlance({ items, emptyLabel, compact = false, style }) {
  const shown = (items || []).slice(0, 3);
  const pad = compact ? "8px 12px" : "12px 14px";
  const rowPad = compact ? "7px 10px" : "10px 12px";
  return (
    <section
      aria-label="SAM glance"
      style={{
        margin: 0,
        background: "linear-gradient(135deg, rgba(243,238,255,.96), rgba(255,255,255,.97))",
        border: `1px solid ${LINE}`,
        borderRadius: compact ? 14 : 16,
        padding: pad,
        height: "100%",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: shown.length ? (compact ? 6 : 10) : 0, flexWrap: "wrap" }}>
        <span style={{ fontWeight: 800, color: INK, fontSize: compact ? 12 : 13, letterSpacing: 0.3 }}>SAM glance</span>
        <span style={{ color: MUTED, fontSize: compact ? 11 : 12 }}>up to 3 things worth a look</span>
      </div>
      {shown.length === 0 ? (
        <div style={{ color: MUTED, fontSize: compact ? 13 : 14 }}>{emptyLabel || "Nothing waiting right now. You're in good shape."}</div>
      ) : (
        <div style={{ display: "grid", gap: compact ? 6 : 8 }}>
          {shown.map((item) => {
            const meaning = item.meaning || item.tone || "teach";
            const isNeeds = String(meaning).toLowerCase().includes("need") || meaning === "cream" || meaning === "amber";
            const rowStyle = isNeeds
              ? glanceCardStyle("needsYou")
              : { background: "rgba(255,255,255,.88)", border: `1px solid ${LINE}` };
            return (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
                ...rowStyle,
                borderRadius: 10,
                padding: rowPad,
              }}
            >
              <div style={{ flex: 1, minWidth: compact ? 120 : 180, color: INK, fontSize: compact ? 13 : 14, lineHeight: 1.3 }}>{item.text}</div>
              {item.actionLabel && item.href && (
                <Link
                  href={item.href}
                  style={{
                    border: `1px solid ${LAVENDER}`,
                    background: "#fff",
                    color: LAVENDER,
                    borderRadius: 999,
                    padding: compact ? "4px 10px" : "6px 12px",
                    fontWeight: 700,
                    fontSize: compact ? 12 : 13,
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
                    padding: compact ? "4px 10px" : "6px 12px",
                    fontWeight: 700,
                    fontSize: compact ? 12 : 13,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.actionLabel}
                </button>
              )}
            </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

/**
 * Side-by-side SAM morning | SAM glance at the top (md+).
 * Stacks on narrow screens. Short band — keep height quiet.
 */
export function SamMorningGlanceRow({ children, style }) {
  return (
    <div className="sam-mg-row" style={{ margin: "0 0 14px", ...style }}>
      <style>{`
        .sam-mg-row{
          display:grid;
          grid-template-columns:minmax(0,1fr) minmax(0,1fr);
          gap:12px;
          align-items:stretch;
        }
        @media (max-width:720px){
          .sam-mg-row{grid-template-columns:1fr}
        }
      `}</style>
      {children}
    </div>
  );
}

/**
 * Quiet SAM voice bubble (teacher) — reuse student SamBubble pattern.
 * One calm line; caller gates spam with session/day keys.
 */
export function SamBubble({ text, style }) {
  if (!text) return null;
  return (
    <div
      role="status"
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        background: "rgba(255,255,255,.88)",
        border: `1px solid ${LINE}`,
        borderRadius: 16,
        padding: "10px 12px",
        ...style,
      }}
    >
      <div
        aria-hidden
        style={{
          width: 36,
          height: 36,
          borderRadius: 12,
          background: "linear-gradient(145deg, #B8A4FF, #8B6CFF)",
          color: "#fff",
          fontWeight: 800,
          fontSize: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        SAM
      </div>
      <p style={{ margin: 0, color: INK, fontSize: 14, lineHeight: 1.4, paddingTop: 6 }}>{text}</p>
    </div>
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
 * SAM morning card — ~30-second warm open on Daily Focus / This Week.
 * Soft lavender/cream/white chrome — never amber fills inside SAM shell.
 * Amber only on real-need CTA / WATCH cues when Check-ins wait.
 * compact: shorter for side-by-side with SAM glance.
 */
export function MorningCard({
  greeting,
  agendaLine,
  win,
  watch,
  onDismiss,
  checkInsCount = 0,
  checkInsHref = "/v2/teacher/check-ins",
  softWho = null,
  softestHref = null,
  softestCode = null,
  readiness = null,
  compact = false,
  style,
}) {
  const needs = Number(checkInsCount) > 0;
  const ctaLabel = needs
    ? `Open Check-ins · ${checkInsCount} waiting`
    : "Open Check-ins";

  return (
    <section
      aria-label="SAM morning card"
      style={{
        margin: 0,
        background: "linear-gradient(135deg, rgba(243,238,255,.98), rgba(255,248,238,.94), rgba(255,255,255,.97))",
        border: `1px solid ${LINE}`,
        borderRadius: compact ? 14 : 18,
        padding: compact ? "10px 12px 8px" : "14px 16px 12px",
        boxShadow: "0 8px 22px rgba(139,108,255,.10)",
        height: "100%",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, flexWrap: "wrap", marginBottom: compact ? 6 : 10 }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
            <span
              style={{
                fontWeight: 800,
                color: INK,
                fontSize: compact ? 12 : 13,
                letterSpacing: 0.3,
              }}
            >
              SAM morning
            </span>
            <span style={{ color: MUTED, fontSize: compact ? 11 : 12 }}>
              {needs ? "~30 sec · Check-ins waiting" : "~30 seconds · honest + calm"}
            </span>
          </div>
          {greeting && (
            <div style={{ marginTop: 2, color: INK, fontSize: compact ? 13 : 15, fontWeight: 600, lineHeight: 1.3 }}>{greeting}</div>
          )}
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <a
            href={checkInsHref}
            title={needs ? "Kids waiting for a Check-in" : "Open Check-ins"}
            style={{
              border: needs ? `1px solid ${GLANCE.needsYou.border}` : `1px solid ${LINE}`,
              background: needs ? GLANCE.needsYou.bg : "#fff",
              color: needs ? GLANCE.needsYou.fg : MUTED,
              borderRadius: 999,
              padding: compact ? "4px 10px" : "6px 12px",
              fontSize: compact ? 11 : 12,
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
                padding: compact ? "4px 10px" : "6px 12px",
                fontSize: compact ? 11 : 12,
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
            background: "rgba(255,255,255,.88)",
            border: `1px solid ${LINE}`,
            borderRadius: 10,
            padding: compact ? "7px 10px" : "10px 12px",
            marginBottom: compact ? 6 : 8,
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 800, color: GLANCE.teach.fg, letterSpacing: 0.4, marginBottom: 1 }}>TODAY · NOW</div>
          <div style={{ color: INK, fontSize: compact ? 13 : 15, fontWeight: 700, lineHeight: 1.3 }}>{agendaLine}</div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: compact && win && watch ? "1fr 1fr" : "1fr", gap: compact ? 6 : 8 }}>
      {win && (
        <div
          style={{
            background: "rgba(255,255,255,.82)",
            border: `1px solid ${LINE}`,
            borderRadius: 10,
            padding: compact ? "7px 10px" : "10px 12px",
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 800, color: MUTED, letterSpacing: 0.4, marginBottom: 1 }}>WIN · YESTERDAY</div>
          <div style={{ color: INK, fontSize: compact ? 12 : 14, lineHeight: 1.35 }}>{win}</div>
        </div>
      )}

      {watch && (
        <div
          style={{
            background: "rgba(255,255,255,.82)",
            border: `1px solid ${LINE}`,
            borderRadius: 10,
            padding: compact ? "7px 10px" : "10px 12px",
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 800, color: needs ? GLANCE.needsYou.fg : MUTED, letterSpacing: 0.4, marginBottom: 1 }}>
            {readiness === "You're covered" || readiness === "Covered"
              ? "COVERED · CLEAR FOR NOW"
              : readiness === "Needs a look"
              ? "WATCH · NEEDS A LOOK"
              : readiness === "Mixed"
                ? "WATCH · MIXED"
                : readiness === "Mostly clear"
                  ? "WATCH · MOSTLY CLEAR"
                  : "WATCH · NOT YET"}
          </div>
          <div style={{ color: INK, fontSize: compact ? 12 : 14, lineHeight: 1.35 }}>{watch}</div>
          {(softWho || softestHref) && (
            <div style={{ marginTop: 6, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              {softWho ? (
                <span style={{ fontSize: 11, fontWeight: 700, color: MUTED }}>
                  Soft cluster · {softWho}
                </span>
              ) : null}
              {softestHref ? (
                <a
                  href={softestHref}
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: LAVENDER,
                    textDecoration: "none",
                  }}
                >
                  {softestCode ? `${softestCode} report` : "Reports"} →
                </a>
              ) : null}
            </div>
          )}
        </div>
      )}
      </div>

      {needs && !compact && (
        <div
          style={{
            marginTop: 6,
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
                ...(ready
                  ? { color: MUTED, background: "rgba(255,255,255,.85)", border: `1px solid ${LINE}` }
                  : glanceChipStyle("needsYou")),
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                borderRadius: 999,
                padding: "3px 10px",
              }}
            >
              {ready ? "ready" : "needs you"}
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
/**
 * Quiet Daily Focus loop strip — Plan · Teach · Check with tiny counts.
 * Glass/calm Plan · soft Teach · amber Check only when checkNeeds. No decorative green/yellow.
 */
export function TodayLoopStrip({
  planCount = 0,
  teachCount = 0,
  checkCount = 0,
  planHref = "/v2/teacher",
  teachHref = null,
  checkHref = "/v2/teacher/check-ins",
  checkNeeds = false,
}) {
  const plan = Number(planCount) || 0;
  const teach = Number(teachCount) || 0;
  const check = Number(checkCount) || 0;
  // Amber only when Check-ins need attention — grading count alone stays quiet.
  const needs = !!checkNeeds;

  const quiet = {
    color: INK,
    background: "rgba(255,255,255,.88)",
    border: `1px solid ${LINE}`,
  };
  const teachQuiet = {
    color: GLANCE.teach.fg,
    background: "rgba(243,238,255,.72)",
    border: `1px solid ${LINE}`,
  };

  const seg = (label, count, href, meaning) => {
    const tone =
      meaning === "needsYou"
        ? glanceChipStyle("needsYou")
        : meaning === "teach"
          ? teachQuiet
          : quiet;
    const chip = (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          borderRadius: 999,
          padding: "5px 11px",
          fontSize: 12,
          fontWeight: 700,
          ...tone,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ opacity: 0.85 }}>{label}</span>
        <span style={{ fontWeight: 800 }}>{count}</span>
      </span>
    );
    if (!href) return <span key={label}>{chip}</span>;
    return (
      <Link key={label} href={href} style={{ textDecoration: "none" }} title={`${label} · ${count}`}>
        {chip}
      </Link>
    );
  };

  return (
    <div
      aria-label="Today loop"
      style={{
        marginTop: 0,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 800,
          color: MUTED,
          letterSpacing: 0.35,
          textTransform: "uppercase",
        }}
      >
        Today
      </span>
      {seg("Plan", plan, planHref, "quiet")}
      <span style={{ color: MUTED, fontSize: 12, opacity: 0.55 }}>·</span>
      {seg("Teach", teach, teachHref, "teach")}
      <span style={{ color: MUTED, fontSize: 12, opacity: 0.55 }}>·</span>
      {seg("Check", check, checkHref, needs ? "needsYou" : "quiet")}
    </div>
  );
}

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
        ...(ready
          ? { color: MUTED, background: "rgba(255,255,255,.88)", border: `1px solid ${LINE}` }
          : glanceChipStyle("needsYou")),
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
 * Sunday preview — same calm loop voice as Focus / This Week.
 * Glance first: week/class story · who · next moves into existing doors.
 * Outbound day list + dial + Apply / Looks good stay secondary (plan depth).
 * Amber only when live Check-ins waiting > 0. No Demo shout.
 *
 * loopGlance (optional): {
 *   story, softOpen, waiting, whoNeedsCount,
 *   softest: { code, plain, subject, subjectName, softCluster },
 *   readiness, whoLine, softDoors: [{ name, href }],
 *   checkInsHref, checkInsLabel, dayHref, weekHref,
 *   reportHref, reportLabel, familyNoteHref, gradingHref, gradingLabel
 * }
 */
export function SundayPreviewModal({
  open,
  onClose,
  rows,
  onChangeDay,
  onAcknowledge,
  onApplyToWeek,
  applied,
  weekLabel,
  dialLevel,
  loopGlance,
}) {
  if (!open) return null;

  const meta = handsOffLevelMeta(dialLevel);
  const byDay = {};
  for (const r of rows || []) {
    if (!byDay[r.day]) byDay[r.day] = [];
    byDay[r.day].push(r);
  }
  const assignCount = (rows || []).filter((r) => r.type === "assign").length;
  const g = loopGlance || null;
  const softOpen = !!(g && g.softOpen);
  const waiting = !!(g && g.waiting);
  const softDoors = Array.isArray(g?.softDoors) ? g.softDoors.filter((d) => d && d.name) : [];
  const softest = g?.softest || null;

  const btnBase = {
    borderRadius: 999,
    padding: "8px 12px",
    fontWeight: 800,
    fontSize: 12,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    cursor: "pointer",
    border: "none",
    whiteSpace: "nowrap",
  };
  const amberPrimary = {
    background: GLANCE.needsYou.bg,
    color: GLANCE.needsYou.fg,
    border: `1px solid ${GLANCE.needsYou.border}`,
  };
  const softPrimary = {
    background: "rgba(243,238,255,.88)",
    color: LAVENDER,
    border: `1px solid ${LINE}`,
  };
  const calmSecondary = {
    background: GLANCE.ready.bg,
    color: GLANCE.ready.fg,
    border: `1px solid ${GLANCE.ready.border}`,
  };
  const quietTertiary = {
    color: MUTED,
    background: "rgba(255,255,255,.88)",
    border: `1px solid ${LINE}`,
    fontWeight: 700,
  };

  function doorClick() {
    if (typeof onClose === "function") onClose();
  }

  const checkInsLabel =
    g?.checkInsLabel ||
    (waiting
      ? `Check-ins · ${g?.whoNeedsCount || 0} waiting`
      : softOpen && g?.whoLine
        ? `Sit · ${String(g.whoLine).split(" · ").slice(0, 2).join(" · ")}`
        : "Check-ins");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sunday"
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
          padding: "20px 20px 16px",
          maxWidth: 640,
          width: "100%",
          maxHeight: "min(86vh, 760px)",
          overflow: "auto",
          boxShadow: "0 24px 60px rgba(46,36,89,.28)",
          border: `1px solid ${LINE}`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
          <div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 22, color: INK }}>
              Sunday
            </h2>
            <p style={{ margin: "4px 0 0", color: MUTED, fontSize: 13 }}>
              {weekLabel || "This week"} · week prep · same story as Focus / This Week
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

        {/* Glance — story / who / next (INTUITIVE · fewer clicks) */}
        {g ? (
          <div style={{ marginTop: 12, display: "grid", gap: 10 }} aria-label="Sunday glance">
            <p
              style={{
                margin: 0,
                fontFamily: "'Poppins', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: INK,
                lineHeight: 1.45,
              }}
            >
              {g.story || "Steady week — plan when ready."}
            </p>

            <div
              style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}
              aria-label="Next move"
            >
              {g.checkInsHref ? (
                <Link
                  href={g.checkInsHref}
                  onClick={doorClick}
                  style={{
                    ...btnBase,
                    ...(waiting ? amberPrimary : softOpen ? softPrimary : calmSecondary),
                  }}
                  title={
                    waiting
                      ? "Open Check-ins — live waiting needs you"
                      : softOpen
                        ? `Sit Check-ins · ${g.whoLine || "soft cluster"}`
                        : "Open Check-ins"
                  }
                >
                  {checkInsLabel} →
                </Link>
              ) : null}
              {g.dayHref ? (
                <Link
                  href={g.dayHref}
                  onClick={doorClick}
                  style={{ ...btnBase, ...(softOpen || waiting ? quietTertiary : softPrimary) }}
                  title="Open Daily Focus — teach today"
                >
                  Daily Focus →
                </Link>
              ) : null}
              {!waiting && softOpen && g.reportHref ? (
                <Link
                  href={g.reportHref}
                  onClick={doorClick}
                  style={{ ...btnBase, ...quietTertiary }}
                  title={`Softest report · TEKS ${softest?.code || ""}`}
                >
                  {g.reportLabel || "Reports"} →
                </Link>
              ) : null}
              {!waiting && softOpen && g.familyNoteHref ? (
                <Link
                  href={g.familyNoteHref}
                  onClick={doorClick}
                  style={{ ...btnBase, ...quietTertiary }}
                  title="Family note · soft story · already knows who + why"
                >
                  Family note
                </Link>
              ) : null}
              {g.gradingHref ? (
                <Link
                  href={g.gradingHref}
                  onClick={doorClick}
                  style={{ ...btnBase, ...quietTertiary }}
                  title="Open Grading inbox"
                >
                  {g.gradingLabel || "Grading"}
                </Link>
              ) : null}
              {g.weekHref ? (
                <Link
                  href={g.weekHref}
                  onClick={doorClick}
                  style={{ ...btnBase, ...quietTertiary }}
                  title="Back to This Week board"
                >
                  This Week →
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  style={{ ...btnBase, ...quietTertiary }}
                  title="Back to This Week board"
                >
                  This Week →
                </button>
              )}
              {!softOpen && g.reportHref ? (
                <Link
                  href={g.reportHref}
                  onClick={doorClick}
                  style={{ ...btnBase, ...quietTertiary }}
                  title="Open Reports glance"
                >
                  Reports
                </Link>
              ) : null}
            </div>

            {softOpen && softest ? (
              <article
                style={{
                  display: "flex",
                  gap: 0,
                  alignItems: "stretch",
                  background: "rgba(255,248,240,.92)",
                  border: `1px solid ${GLANCE.needsYou.border}`,
                  borderRadius: 14,
                  overflow: "hidden",
                  minHeight: 72,
                }}
                aria-label="Needs you · who"
              >
                <span
                  aria-hidden
                  style={{
                    width: 5,
                    flexShrink: 0,
                    background: SUBJECTS[softest.subject]?.color || LAVENDER,
                    opacity: 0.9,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0, padding: "10px 12px", display: "grid", gap: 5 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start" }}>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          color: MUTED,
                          textTransform: "uppercase",
                          letterSpacing: 0.2,
                        }}
                      >
                        Soft cluster · {softest.subjectName || SUBJECTS[softest.subject]?.name || "Science"} ·{" "}
                        {softest.code}
                      </div>
                      <div style={{ marginTop: 2, fontWeight: 700, color: INK, fontSize: 13, lineHeight: 1.3 }}>
                        {softest.plain || "Needs a look"}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        ...glanceChipStyle(g.readiness === "Mostly clear" ? "ready" : "needsYou"),
                        borderRadius: 999,
                        padding: "4px 8px",
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {g.readiness || "Needs a look"}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: MUTED, lineHeight: 1.35 }}>
                    {softDoors.length ? (
                      softDoors.map((d, i) => (
                        <span key={d.name}>
                          {i > 0 ? " · " : ""}
                          <Link
                            href={d.href}
                            onClick={doorClick}
                            title={`Open ${d.name}`}
                            style={{
                              color: LAVENDER,
                              fontWeight: 800,
                              textDecoration: "none",
                              borderBottom: `1px dashed ${LINE}`,
                            }}
                          >
                            {d.name}
                          </Link>
                        </span>
                      ))
                    ) : (
                      g.whoLine || "Soft cluster"
                    )}
                  </div>
                </div>
              </article>
            ) : (
              <p style={{ margin: 0, fontSize: 12, color: MUTED, lineHeight: 1.4 }}>
                Soft story covered — preview what goes out, then teach from Daily Focus.
              </p>
            )}
          </div>
        ) : null}

        {/* Secondary — outbound depth (dial + day rows) */}
        <div
          style={{
            marginTop: g ? 16 : 12,
            paddingTop: g ? 14 : 0,
            borderTop: g ? `1px solid ${LINE}` : "none",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 0.35,
              color: MUTED,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            What goes out · preview
          </div>

          <div
            role="status"
            key={`dial-${dialLevel || "default"}-${assignCount}`}
            style={{
              background: SOFT_LAV,
              border: `1px solid ${LINE}`,
              borderRadius: 14,
              padding: "10px 12px",
              fontSize: 13,
              color: INK,
              lineHeight: 1.4,
            }}
          >
            <strong style={{ color: LAVENDER }}>Hands-off · {meta?.short || "Plan for me"}</strong>
            {meta?.dialHint ? <span style={{ color: MUTED }}> · {meta.dialHint}</span> : null}
            <span style={{ color: MUTED }}>
              {" "}
              · {assignCount} outbound block{assignCount === 1 ? "" : "s"} (updates with the dial)
            </span>
          </div>

          <div style={{ marginTop: 12, display: "grid", gap: 12 }} key={`rows-${dialLevel || "default"}-${assignCount}`}>
            {DAYS.map((d, i) => {
              const items = byDay[i] || [];
              if (items.length === 0) {
                return (
                  <section key={d} style={{ background: "#fff", borderRadius: 14, padding: "10px 12px 8px", border: `1px dashed ${LINE}` }}>
                    <div style={{ fontWeight: 800, color: INK, fontSize: 13 }}>
                      {DAY_NAMES[i]} · {DATES[i]}
                    </div>
                    <div style={{ marginTop: 4, fontSize: 12, color: MUTED }}>
                      Nothing outbound this day for the current dial.
                    </div>
                  </section>
                );
              }
              return (
                <section key={d} style={{ background: SOFT_LAV, borderRadius: 14, padding: "10px 12px 8px", border: `1px solid ${LINE}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, gap: 8, flexWrap: "wrap" }}>
                    <div style={{ fontWeight: 800, color: INK, fontSize: 13 }}>
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
                              padding: "8px 10px",
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
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
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

/** Banner prompting Sunday when Plan for me / Run it is on — loop voice, not a publish island. */
export function SundayPreviewBanner({ onOpen, acked, onApplyToWeek, applied, softWhoLine }) {
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
        <strong>Sunday:</strong>{" "}
        {softWhoLine
          ? `same week story · ${softWhoLine} · then what goes out.`
          : "same week story as Focus · who · next · then what goes out."}
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
        Open Sunday
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