"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

  const refresh = useCallback(() => {
    setConfirmedIds(loadConfirmedIds());
  }, []);

  useEffect(() => {
    refresh();
    setHydrated(true);
    const onStorage = (e) => {
      if (e.key === GRADING_STORAGE_KEY || e.key === GRADING_INBOX_KEY) refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("ci2-grading-updated", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("ci2-grading-updated", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [refresh]);

  const view = useMemo(
    () => getKidGradingView(studentFirst || "Student", confirmedIds),
    [studentFirst, confirmedIds]
  );

  const inboxFilterHref = gradingInboxHref({ studentFirst: view.studentFirst });

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

        {/* SAM tip — optional one-liner */}
        <div
          style={{
            marginTop: 14,
            ...glanceCardStyle(view.needsCount ? "needsYou" : "teach"),
            borderRadius: 14,
            padding: "10px 14px",
            fontSize: 13,
            color: INK,
            lineHeight: 1.4,
            maxWidth: 640,
          }}
        >
          <span style={{ fontWeight: 800, letterSpacing: 0.3, fontSize: 11, color: MUTED, marginRight: 8 }}>
            SAM
          </span>
          {view.needsCount
            ? `Start with the amber subject${view.needsCount === 1 ? "" : "s"} — ${view.studentFirst} may need a quick check-in there.`
            : `${view.studentFirst} looks steady across subjects. Open More only if you want the assignment trail.`}
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
              />
            );
          })}
        </div>
      </Glass>
    </StationShell>
  );
}

function SubjectCard({ subject, open, onToggleMore, hydrated }) {
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
              <AssignmentRow key={a.id} item={a} subjectColor={subject.color} />
            ))
          )}
        </div>
      )}
    </article>
  );
}

function AssignmentRow({ item, subjectColor }) {
  const ago = item.submittedAt ? formatSubmittedAgo(item.submittedAt, DEMO_GRADING_NOW) : "";
  const soft = item.pct != null && item.pct < 70;
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        background: soft ? CREAM : MINT,
        border: `1px solid ${LINE}`,
        borderRadius: 12,
        padding: "10px 12px",
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
