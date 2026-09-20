"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  StationShell,
  Glass,
  TeacherSubnav,
  INK,
  MUTED,
  LINE,
  LAVENDER,
  SOFT_LAV,
  MINT,
  CREAM,
  glanceChipStyle,
  glanceCardStyle,
} from "../../../../../../components/v2/StationShell";
import {
  DEMO_TEACHER,
} from "../../../../../../lib/v2/demoWeek";
import {
  formatSubmittedAgo,
  DEMO_GRADING_NOW,
  getKidGradingView,
  GRADING_INBOX_HREF,
  GRADING_INBOX_KEY,
  GRADING_STORAGE_KEY,
  loadConfirmedIds,
  productLabel,
  gradingInboxHref,
} from "../../../../../../lib/v2/demoGrading";
import {
  getKidCheckInMotion,
  WHO_NEEDS_ME_STORAGE_KEY,
  FOCUS_BLOCKS_KEY,
} from "../../../../../../lib/v2/demoWhoNeedsMe";
import { FAMILY_NOTE_HREF } from "../../../../../../lib/v2/demoFamilyNote";

/**
 * Kid-first grading — one tap → all subjects for that student.
 * Donut average + short summary → More expands that subject's assignments.
 */
export default function KidGradingClient() {
  const params = useParams();
  const raw = params?.student;
  const studentFirst = decodeURIComponent(
    Array.isArray(raw) ? raw[0] || "" : String(raw || "")
  ).trim();

  const [confirmedIds, setConfirmedIds] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [openSubject, setOpenSubject] = useState(null);
  const [checkInMotion, setCheckInMotion] = useState(null);
  const [trendFocus, setTrendFocus] = useState(null); // { pointId, assignmentId, subject }
  const assignmentRefs = useRef({});

  const refresh = useCallback(() => {
    const ids = loadConfirmedIds();
    setConfirmedIds(ids);
    setCheckInMotion(getKidCheckInMotion(studentFirst || "Student", ids));
  }, [studentFirst]);

  useEffect(() => {
    refresh();
    setHydrated(true);
    const onStorage = (e) => {
      if (
        e.key === GRADING_STORAGE_KEY ||
        e.key === GRADING_INBOX_KEY ||
        e.key === WHO_NEEDS_ME_STORAGE_KEY ||
        e.key === FOCUS_BLOCKS_KEY
      ) {
        refresh();
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("ci2-grading-updated", refresh);
    window.addEventListener("ci2-who-needs-updated", refresh);
    window.addEventListener("ci2-focus-blocks-updated", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("ci2-grading-updated", refresh);
      window.removeEventListener("ci2-who-needs-updated", refresh);
      window.removeEventListener("ci2-focus-blocks-updated", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [refresh]);

  const view = useMemo(
    () => getKidGradingView(studentFirst || "Student", confirmedIds),
    [studentFirst, confirmedIds]
  );

  const inboxFilterHref = gradingInboxHref({ studentFirst: view.studentFirst });

  const familyHref = useMemo(() => {
    const subjectKey = view.struggleSubjectKey || "math";
    const topic =
      subjectKey === "math"
        ? "Equivalent fractions — a short note home"
        : view.struggleSubjectName
          ? `${view.struggleSubjectName} — a short note home`
          : undefined;
    const periodId = checkInMotion?.periodId || null;
    return FAMILY_NOTE_HREF(view.studentFirst, {
      subject: subjectKey,
      topic,
      periodId,
    });
  }, [view.studentFirst, view.struggleSubjectKey, view.struggleSubjectName, checkInMotion]);


  const onTrendPoint = useCallback((point) => {
    if (!point) return;
    setTrendFocus({
      pointId: point.id,
      assignmentId: point.assignmentId || null,
      subject: point.subject || null,
      assignment: point.assignment || "",
      pct: point.pct,
      anomaly: point.anomaly || null,
      dateLabel: point.dateLabel || "",
      subjectName: point.subjectName || "",
    });
    if (point.subject) {
      setOpenSubject(point.subject);
    }
  }, []);

  useEffect(() => {
    const id = trendFocus?.assignmentId;
    if (!id || !openSubject) return;
    const t = window.setTimeout(() => {
      const el = assignmentRefs.current[id];
      if (el && typeof el.scrollIntoView === "function") {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 80);
    return () => window.clearTimeout(t);
  }, [trendFocus, openSubject]);

  return (
    <StationShell active="check">
      <TeacherSubnav active="grading" />
      <Glass>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 6 }}>
              <Link
                href={GRADING_INBOX_HREF}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: LAVENDER,
                  textDecoration: "none",
                  border: `1px solid ${LINE}`,
                  background: "rgba(255,255,255,.9)",
                  borderRadius: 999,
                  padding: "5px 12px",
                }}
              >
                ← Grading inbox
              </Link>
              <Link
                href={inboxFilterHref}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: MUTED,
                  textDecoration: "none",
                  border: `1px solid ${LINE}`,
                  background: "#fff",
                  borderRadius: 999,
                  padding: "5px 12px",
                }}
                title="Open inbox filtered to this student"
              >
                Pending for {view.studentFirst}
              </Link>
            </div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 32, color: INK }}>
              {view.studentFirst}
            </h1>
            <div style={{ color: MUTED, marginTop: 4, fontSize: 14, lineHeight: 1.45, maxWidth: 520 }}>
              Everything for {view.studentFirst} in one place — tap <strong style={{ color: INK, fontWeight: 700 }}>More</strong> on a subject for the full list.
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              {view.overallPct != null && (
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: INK,
                    background: SOFT_LAV,
                    borderRadius: 999,
                    padding: "5px 12px",
                    border: `1px solid ${LINE}`,
                  }}
                >
                  Overall · {view.overallPct}%
                </span>
              )}
              {view.needsCount > 0 ? (
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    ...glanceChipStyle("needsYou"),
                    borderRadius: 999,
                    padding: "5px 12px",
                  }}
                >
                  {view.needsCount} subject{view.needsCount === 1 ? "" : "s"} need a glance
                </span>
              ) : (
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    ...glanceChipStyle("ready"),
                    borderRadius: 999,
                    padding: "5px 12px",
                  }}
                >
                  Looking steady
                </span>
              )}
              <span style={{ fontSize: 12, color: MUTED }}>
                {DEMO_TEACHER.name} · demo gradebook
              </span>
            </div>
          </div>
        </div>

        {/* 1 · Whole-kid calm line (above donuts) */}
        <div
          style={{
            marginTop: 14,
            ...glanceCardStyle(view.needsCount ? "needsYou" : "teach"),
            borderRadius: 14,
            padding: "10px 14px",
            fontSize: 14,
            fontWeight: 600,
            color: INK,
            lineHeight: 1.4,
            maxWidth: 640,
          }}
        >
          <span style={{ fontWeight: 800, letterSpacing: 0.3, fontSize: 11, color: MUTED, marginRight: 8 }}>
            SAM
          </span>
          {view.wholeKidLine ||
            (view.needsCount
              ? `Mostly steady — a subject needs a short look.`
              : `Mostly steady across subjects.`)}
        </div>

        {/* 2–4 · Check-ins in motion · supports · Note home */}
        <div
          style={{
            marginTop: 12,
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "center",
            maxWidth: 720,
          }}
        >
          {hydrated && checkInMotion ? (
            <Link
              href={checkInMotion.href}
              title={checkInMotion.samLine}
              style={{
                fontSize: 12,
                fontWeight: 800,
                textDecoration: "none",
                borderRadius: 999,
                padding: "6px 12px",
                ...glanceChipStyle(
                  checkInMotion.status === "open" && checkInMotion.kind === "check_in"
                    ? "needsYou"
                    : "ready"
                ),
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {checkInMotion.label}
              <span style={{ fontWeight: 700, opacity: 0.85 }}>→ Check-ins</span>
            </Link>
          ) : null}
          {hydrated && checkInMotion?.samLine ? (
            <span style={{ fontSize: 12, color: MUTED, lineHeight: 1.35, maxWidth: 280 }}>
              {checkInMotion.samLine}
            </span>
          ) : null}
          {view.supports ? (
            <span
              title={view.supports.detail}
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: LAVENDER,
                background: SOFT_LAV,
                border: `1px solid ${LINE}`,
                borderRadius: 999,
                padding: "6px 12px",
              }}
            >
              {view.supports.chip}
            </span>
          ) : null}
          <Link
            href={familyHref}
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: "#fff",
              background: LAVENDER,
              borderRadius: 999,
              padding: "7px 14px",
              textDecoration: "none",
              boxShadow: "0 6px 16px rgba(139,108,255,.25)",
              marginLeft: view.supports || checkInMotion ? 0 : undefined,
            }}
            title={
              view.struggleSubjectName
                ? `Note home · prefill ${view.struggleSubjectName}`
                : "Note home · family one-pager"
            }
          >
            Note home
          </Link>
        </div>

        <div
          className="kid-subject-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 14,
            marginTop: 18,
          }}
        >
          {view.subjects.map((sub) => {
            const open = openSubject === sub.key;
            return (
              <SubjectCard
                key={sub.key}
                subject={sub}
                open={open}
                hydrated={hydrated}
                onToggleMore={() => setOpenSubject(open ? null : sub.key)}
                highlightAssignmentId={
                  open && trendFocus?.subject === sub.key ? trendFocus.assignmentId : null
                }
                assignmentRefs={assignmentRefs}
              />
            );
          })}
        </div>

        {/* School-year trend — soft line under subject donuts */}
        <YearTrendPanel
          trend={view.yearTrend}
          studentFirst={view.studentFirst}
          focus={trendFocus}
          onSelectPoint={onTrendPoint}
        />
      </Glass>
    </StationShell>
  );
}

function SubjectCard({ subject, open, onToggleMore, hydrated, highlightAssignmentId, assignmentRefs }) {
  const wash = subject.needsYou
    ? { background: "rgba(255,248,240,.92)", border: `1px solid rgba(212,168,98,.35)` }
    : { background: "rgba(255,255,255,.92)", border: `1px solid ${LINE}` };

  return (
    <article
      style={{
        ...wash,
        borderRadius: 18,
        padding: "16px 16px 14px",
        boxShadow: "0 10px 26px rgba(46,36,89,.07)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        gridColumn: open ? "1 / -1" : undefined,
      }}
    >
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <SubjectDonut
          pct={subject.averagePct}
          color={subject.needsYou ? "#C4A056" : subject.color}
          label={subject.name}
        />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: subject.color,
                  textTransform: "uppercase",
                  letterSpacing: 0.4,
                }}
              >
                {subject.name}
                {subject.unit ? ` · ${subject.unit}` : ""}
              </div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 20, color: INK, marginTop: 2 }}>
                {subject.averagePct != null ? `${subject.averagePct}%` : "—"}
              </div>
            </div>
            {subject.needsYou && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  ...glanceChipStyle("needsYou"),
                  borderRadius: 999,
                  padding: "3px 10px",
                }}
              >
                needs you
              </span>
            )}
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 14, color: INK, lineHeight: 1.45 }}>
            {subject.summary}
          </p>
          {subject.struggle && (
            <p style={{ margin: "6px 0 0", fontSize: 12, color: MUTED, lineHeight: 1.35 }}>
              {subject.struggle}
            </p>
          )}
          <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <button
              type="button"
              onClick={onToggleMore}
              aria-expanded={open}
              style={{
                border: `1px solid ${open ? LAVENDER : LINE}`,
                background: open ? SOFT_LAV : "#fff",
                color: open ? LAVENDER : INK,
                borderRadius: 999,
                padding: "7px 14px",
                fontWeight: 800,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {open ? "Less" : "More"}
            </button>
            <span style={{ fontSize: 12, color: MUTED }}>
              {hydrated ? subject.assignmentCount : "…"} assignment
              {subject.assignmentCount === 1 ? "" : "s"}
              {subject.pendingCount > 0 ? ` · ${subject.pendingCount} to confirm` : ""}
            </span>
          </div>
        </div>
      </div>

      {open && (
        <div
          style={{
            marginTop: 4,
            borderTop: `1px solid ${LINE}`,
            paddingTop: 12,
            display: "grid",
            gap: 8,
          }}
          aria-label={`${subject.name} assignments for this student`}
        >
          {subject.assignments.length === 0 ? (
            <div style={{ ...glanceCardStyle("ready"), borderRadius: 12, padding: "14px 12px", color: MUTED, fontSize: 13 }}>
              Nothing scored in {subject.name} yet.
            </div>
          ) : (
            subject.assignments.map((a) => (
              <AssignmentRow
                key={a.id}
                item={a}
                subjectColor={subject.color}
                highlighted={highlightAssignmentId === a.id}
                rowRef={(el) => {
                  if (!assignmentRefs) return;
                  if (el) assignmentRefs.current[a.id] = el;
                  else delete assignmentRefs.current[a.id];
                }}
              />
            ))
          )}
        </div>
      )}
    </article>
  );
}

function AssignmentRow({ item, subjectColor, highlighted, rowRef }) {
  const ago = item.submittedAt ? formatSubmittedAgo(item.submittedAt, DEMO_GRADING_NOW) : "";
  const soft = item.pct != null && item.pct < 70;
  return (
    <div
      ref={rowRef}
      id={`kid-asn-${item.id}`}
      style={{
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        background: soft ? CREAM : MINT,
        border: highlighted
          ? `2px solid ${LAVENDER}`
          : `1px solid ${LINE}`,
        boxShadow: highlighted ? "0 0 0 3px rgba(139,108,255,.18)" : undefined,
        borderRadius: 12,
        padding: "10px 12px",
        transition: "box-shadow 0.2s ease, border-color 0.2s ease",
      }}
    >
      <span
        style={{
          width: 4,
          alignSelf: "stretch",
          borderRadius: 4,
          background: soft ? "#C4A056" : subjectColor,
          flexShrink: 0,
        }}
      />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontWeight: 800, fontSize: 14, color: INK }}>{item.assignment}</span>
          <span style={{ fontWeight: 800, fontSize: 14, color: INK, whiteSpace: "nowrap" }}>
            {item.score != null ? `${item.score}/${item.maxScore}` : "—"}
            {item.pct != null ? ` · ${item.pct}%` : ""}
          </span>
        </div>
        <div style={{ marginTop: 4, display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: MUTED,
              background: "#fff",
              borderRadius: 999,
              padding: "2px 8px",
              border: `1px solid ${LINE}`,
            }}
          >
            {productLabel(item.product)}
          </span>
          {item.standard && (
            <span style={{ fontSize: 11, fontWeight: 700, color: MUTED }}>{item.standard}</span>
          )}
          {item.pending && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                ...glanceChipStyle("toGrade"),
                borderRadius: 999,
                padding: "2px 8px",
              }}
            >
              to confirm
            </span>
          )}
          {ago && <span style={{ fontSize: 11, color: MUTED }}>{ago}</span>}
        </div>
        {item.note && (
          <p style={{ margin: "6px 0 0", fontSize: 13, color: MUTED, lineHeight: 1.4 }}>{item.note}</p>
        )}
      </div>
    </div>
  );
}

/** Calm circular progress — subject color, amber only when needsYou passed as color. */
function SubjectDonut({ pct, color, label, size = 72 }) {
  const r = 28;
  const c = 2 * Math.PI * r;
  const value = pct == null ? 0 : Math.max(0, Math.min(100, pct));
  const dash = (value / 100) * c;
  const track = "rgba(228,222,244,.85)";

  return (
    <div
      role="img"
      aria-label={pct != null ? `${label} average ${pct} percent` : `${label} average not yet`}
      style={{ width: size, height: size, flexShrink: 0, position: "relative" }}
    >
      <svg width={size} height={size} viewBox="0 0 72 72" aria-hidden="true">
        <circle cx="36" cy="36" r={r} fill="none" stroke={track} strokeWidth="8" />
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          transform="rotate(-90 36 36)"
          style={{ transition: "stroke-dasharray 0.4s ease" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: 13,
          color: INK,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {pct != null ? `${pct}` : "—"}
      </div>
    </div>
  );
}

/** Soft school-year trend under subject donuts — per-subject color lines + anomaly marks. */
function YearTrendPanel({ trend, studentFirst, focus, onSelectPoint }) {
  const points = trend?.points || [];
  const series = trend?.series || [];
  if (!points.length) return null;

  return (
    <section
      aria-label={`School-year score trend for ${studentFirst}`}
      style={{
        marginTop: 20,
        background: "rgba(255,255,255,.92)",
        border: `1px solid ${LINE}`,
        borderRadius: 18,
        padding: "16px 16px 14px",
        boxShadow: "0 10px 26px rgba(46,36,89,.06)",
        maxWidth: 920,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "baseline" }}>
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: LAVENDER,
              letterSpacing: 0.35,
              textTransform: "uppercase",
            }}
          >
            School-year trend
          </div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 17, color: INK, marginTop: 2 }}>
            By subject · how scores moved
          </div>
        </div>
        {trend.anomalyCount > 0 ? (
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: MUTED,
              background: SOFT_LAV,
              border: `1px solid ${LINE}`,
              borderRadius: 999,
              padding: "4px 11px",
            }}
          >
            {trend.anomalyCount} pattern break{trend.anomalyCount === 1 ? "" : "s"}
          </span>
        ) : (
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              ...glanceChipStyle("ready"),
              borderRadius: 999,
              padding: "4px 11px",
            }}
          >
            Steady lines
          </span>
        )}
      </div>

      <YearTrendChart
        points={points}
        series={series}
        focusId={focus?.pointId}
        onSelectPoint={onSelectPoint}
      />

      {focus ? (
        <div
          style={{
            marginTop: 10,
            ...glanceCardStyle(focus.anomaly === "drop" ? "needsYou" : "teach"),
            borderRadius: 12,
            padding: "10px 12px",
            fontSize: 13,
            color: INK,
            lineHeight: 1.4,
          }}
        >
          <strong style={{ fontWeight: 800 }}>
            {focus.dateLabel ? `${focus.dateLabel} · ` : ""}
            {focus.assignment}
          </strong>
          <span style={{ color: MUTED }}>
            {" "}
            · {focus.subjectName || focus.subject}
            {focus.pct != null ? ` · ${focus.pct}%` : ""}
            {focus.anomaly === "drop"
              ? " · marked drop"
              : focus.anomaly === "jump"
                ? " · marked jump"
                : ""}
          </span>
          {focus.assignmentId ? (
            <span style={{ display: "block", marginTop: 4, fontSize: 12, color: MUTED }}>
              Opened in More — scroll to that assignment.
            </span>
          ) : null}
        </div>
      ) : null}

      {trend.caption ? (
        <p style={{ margin: "12px 0 0", fontSize: 13, color: MUTED, lineHeight: 1.45, maxWidth: 640 }}>
          <span style={{ fontWeight: 800, letterSpacing: 0.3, fontSize: 11, color: MUTED, marginRight: 8 }}>
            SAM
          </span>
          {trend.caption}
        </p>
      ) : null}
    </section>
  );
}

/**
 * Calm multi-line SVG — one soft line per subject (donut colors).
 * Anomaly dots stay per-subject; amber ring only on real concern drops.
 */
function YearTrendChart({ points, series, focusId, onSelectPoint }) {
  const W = 640;
  const H = 178;
  const padL = 36;
  const padR = 16;
  const padT = 18;
  const padB = 30;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const times = points
    .map((p) => new Date(p.date).getTime())
    .filter((t) => !Number.isNaN(t));
  const tMin = times.length ? Math.min(...times) : 0;
  const tMax = times.length ? Math.max(...times) : 1;
  const xFor = (date) => {
    const t = new Date(date).getTime();
    if (Number.isNaN(t) || tMax === tMin) return padL + innerW / 2;
    return padL + ((t - tMin) / (tMax - tMin)) * innerW;
  };
  const yFor = (pct) => padT + innerH * (1 - Math.max(0, Math.min(100, pct)) / 100);

  const lines = (Array.isArray(series) && series.length
    ? series
    : [
        {
          key: "all",
          name: "Overall",
          color: LAVENDER,
          points,
        },
      ]
  ).map((s, idx) => {
    const pts = (s.points || []).filter((p) => typeof p.pct === "number");
    const lineD = pts
      .map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(p.date).toFixed(1)} ${yFor(p.pct).toFixed(1)}`)
      .join(" ");
    // Slight stroke contrast so soft overlaps stay readable
    const strokeW = 2.4 - idx * 0.15;
    const opacity = 0.88 - idx * 0.06;
    return { ...s, pts, lineD, strokeW: Math.max(1.8, strokeW), opacity: Math.max(0.62, opacity) };
  });

  const guidePcts = [70, 85];
  const firstLabel = points[0]?.dateLabel || "";
  const lastLabel = points[points.length - 1]?.dateLabel || "";
  // Prefer chronological extremes for date labels
  const byDate = [...points].sort((a, b) => new Date(a.date) - new Date(b.date));
  const startLabel = byDate[0]?.dateLabel || firstLabel;
  const endLabel = byDate[byDate.length - 1]?.dateLabel || lastLabel;

  return (
    <div style={{ marginTop: 12, width: "100%", overflow: "hidden" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="auto"
        role="img"
        aria-label="Score trend by subject across the school year"
        style={{ display: "block", maxHeight: 210 }}
      >
        {/* Soft guides — not a corporate grid */}
        {guidePcts.map((g) => (
          <g key={g}>
            <line
              x1={padL}
              x2={W - padR}
              y1={yFor(g)}
              y2={yFor(g)}
              stroke="rgba(228,222,244,.9)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            <text
              x={padL - 8}
              y={yFor(g) + 3}
              textAnchor="end"
              fontSize="10"
              fill={MUTED}
              fontFamily="inherit"
            >
              {g}
            </text>
          </g>
        ))}

        {lines.map((s) =>
          s.lineD ? (
            <path
              key={`line-${s.key}`}
              d={s.lineD}
              fill="none"
              stroke={s.color}
              strokeWidth={s.strokeW}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={s.opacity}
            />
          ) : null
        )}

        {lines.flatMap((s) =>
          s.pts.map((p) => {
            const cx = xFor(p.date);
            const cy = yFor(p.pct);
            const isFocus = focusId === p.id;
            const isAnomaly = !!p.anomaly;
            const isDrop = p.anomaly === "drop";
            const r = isAnomaly ? (isFocus ? 8 : 7) : isFocus ? 4.5 : 3.2;
            const fill = p.subjectColor || s.color;
            const title = `${p.subjectName || s.name} · ${p.dateLabel || ""} · ${p.assignment} · ${p.pct}%${
              p.anomaly === "drop" ? " · drop" : p.anomaly === "jump" ? " · jump" : ""
            }`;

            return (
              <g key={p.id}>
                {isDrop ? (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r + 4}
                    fill="none"
                    stroke="#C4A056"
                    strokeWidth="2"
                    opacity="0.85"
                  />
                ) : null}
                {p.anomaly === "jump" ? (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r + 3.5}
                    fill="none"
                    stroke={fill}
                    strokeWidth="1.5"
                    opacity="0.45"
                  />
                ) : null}
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={fill}
                  stroke="#fff"
                  strokeWidth={isAnomaly ? 2 : 1.25}
                  opacity={isAnomaly ? 0.95 : 0.55}
                  style={{ cursor: "pointer" }}
                >
                  <title>{title}</title>
                </circle>
                {/* Larger hit target */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={14}
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                  onClick={() => onSelectPoint && onSelectPoint(p)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectPoint && onSelectPoint(p);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={
                    isAnomaly
                      ? `${p.subjectName || s.name} · ${p.anomaly} · ${p.assignment}, ${p.pct} percent`
                      : `${p.subjectName || s.name} · ${p.assignment}, ${p.pct} percent`
                  }
                />
              </g>
            );
          })
        )}

        {startLabel ? (
          <text x={padL} y={H - 8} fontSize="11" fill={MUTED} fontFamily="inherit">
            {startLabel}
          </text>
        ) : null}
        {endLabel ? (
          <text
            x={W - padR}
            y={H - 8}
            textAnchor="end"
            fontSize="11"
            fill={MUTED}
            fontFamily="inherit"
          >
            {endLabel}
          </text>
        ) : null}
      </svg>

      <div
        style={{
          marginTop: 8,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          fontSize: 11,
          color: MUTED,
          fontWeight: 600,
          alignItems: "center",
        }}
      >
        {lines.map((s) => (
          <span key={`leg-${s.key}`} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 16,
                height: 3,
                borderRadius: 99,
                background: s.color,
                opacity: 0.9,
              }}
            />
            {s.name}
          </span>
        ))}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginLeft: 4 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 99,
              background: "#00A8D4",
              boxShadow: "0 0 0 2px #C4A056",
            }}
          />
          Drop
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 99, background: "#C2185B" }} />
          Jump
        </span>
        <span style={{ color: MUTED, fontWeight: 500 }}>Tap a marked point to open it in More</span>
      </div>
    </div>
  );
}
