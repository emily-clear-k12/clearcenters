"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  StationShell,
  Glass,
  TeacherSubnav,
  INK,
  MUTED,
  LINE,
  LAVENDER,
  SOFT_LAV,
  GLANCE,
  glanceChipStyle,
} from "../../../../../components/v2/StationShell";
import { getLessonPlanStub } from "../../../../../lib/v2/demoLessonPlan";

/**
 * CI2.0 Lesson plan stub — glance-first teacher one-pager (skeleton only).
 * Objective · TEKS · materials · 3-beat teach spine · exit ticket · stub links.
 * Not a full planner. Beauty 80 / grammar 20.
 */
export default function LessonPlanClient({ lessonId }) {
  const router = useRouter();
  const plan = useMemo(() => getLessonPlanStub(lessonId), [lessonId]);
  const [detailsOpen, setDetailsOpen] = useState(false);

  if (!plan) {
    return (
      <StationShell>
        <TeacherSubnav active="day" />
        <Glass>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 28, color: INK }}>
            Lesson plan not found
          </h1>
          <p style={{ color: MUTED, marginTop: 8 }}>
            That block isn’t in the demo week. Head back to Daily Focus and open Lesson plan on a teach card.
          </p>
          <Link
            href="/v2/teacher/day?d=2"
            style={{
              display: "inline-block",
              marginTop: 14,
              background: LAVENDER,
              color: "#fff",
              borderRadius: 999,
              padding: "10px 18px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            ← Daily Focus
          </Link>
        </Glass>
      </StationShell>
    );
  }

  return (
    <StationShell>
      <TeacherSubnav active="day" />
      <Glass style={{ padding: "22px 22px 20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(240px, 0.95fr) minmax(280px, 1.3fr)",
            gap: 22,
            alignItems: "start",
          }}
        >
          {/* LEFT — glance lane */}
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: GLANCE.teach.fg,
                textTransform: "uppercase",
                letterSpacing: 0.3,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: GLANCE.teach.fg,
                  opacity: 0.85,
                }}
              />
              Lesson plan · <span style={{ color: plan.subjectColor }}>{plan.subjectName}</span>
            </div>
            <p
              style={{
                margin: "8px 0 0",
                fontFamily: "'Poppins', sans-serif",
                fontSize: 17,
                fontWeight: 600,
                color: INK,
                lineHeight: 1.35,
              }}
            >
              {plan.samLine}
            </p>

            <h1
              style={{
                fontFamily: "'Poppins', sans-serif",
                margin: "14px 0 0",
                fontSize: 24,
                fontWeight: 700,
                color: INK,
                lineHeight: 1.25,
              }}
            >
              {plan.title}
            </h1>

            <div
              style={{
                marginTop: 12,
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                alignItems: "center",
              }}
            >
              <Chip label={plan.teksChip} tone="teach" />
              <Chip label={plan.dayLabel || "Today"} />
              <Chip label={`~${plan.minutes} min`} />
              <Chip label={plan.who} />
            </div>

            <div style={{ marginTop: 18 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: MUTED,
                  letterSpacing: 0.4,
                  marginBottom: 6,
                }}
              >
                OBJECTIVE
              </div>
              <p style={{ margin: 0, color: INK, fontSize: 15, lineHeight: 1.45, fontWeight: 600 }}>
                {plan.objective}
              </p>
            </div>

            <div style={{ marginTop: 16 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: MUTED,
                  letterSpacing: 0.4,
                  marginBottom: 6,
                }}
              >
                MATERIALS · TIME
              </div>
              <p style={{ margin: 0, color: INK, fontSize: 14, lineHeight: 1.4 }}>{plan.materials}</p>
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginTop: 22,
                alignItems: "center",
              }}
            >
              <button
                type="button"
                onClick={() => router.push(plan.backHref)}
                style={{
                  border: "none",
                  background: LAVENDER,
                  color: "#fff",
                  borderRadius: 999,
                  padding: "12px 20px",
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  boxShadow: "0 6px 18px rgba(139,108,255,.28)",
                }}
              >
                ← Daily Focus
              </button>
              {plan.projectHref && (
                <Link
                  href={plan.projectHref}
                  style={{
                    border: `1px solid ${GLANCE.project.border}`,
                    background: GLANCE.project.bg,
                    color: GLANCE.project.fg,
                    borderRadius: 999,
                    padding: "12px 18px",
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                >
                  Project →
                </Link>
              )}
            </div>
          </div>

          {/* RIGHT — teach spine + exit */}
          <div
            style={{
              minWidth: 0,
              background: "rgba(243,238,255,.72)",
              border: `1px solid ${GLANCE.teach.border}`,
              borderRadius: 20,
              padding: "16px 18px 18px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: GLANCE.teach.fg,
                letterSpacing: 0.45,
                marginBottom: 10,
              }}
            >
              3-BEAT TEACH SPINE
            </div>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {plan.spine.map((row, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    background: "#fff",
                    border: `1px solid ${LINE}`,
                    borderRadius: 14,
                    padding: "10px 12px",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 10,
                      background: GLANCE.teach.fg,
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 800, color: INK, fontSize: 14 }}>{row.beat}</div>
                    <div style={{ color: MUTED, fontSize: 13, lineHeight: 1.4, marginTop: 2 }}>
                      {row.detail}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: 16 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: MUTED,
                  letterSpacing: 0.35,
                  marginBottom: 6,
                }}
              >
                EXIT TICKET · STUB
              </div>
              <p
                style={{
                  margin: 0,
                  color: INK,
                  fontSize: 14,
                  lineHeight: 1.4,
                  fontWeight: 600,
                  background: "#fff",
                  border: `1px solid ${LINE}`,
                  borderRadius: 14,
                  padding: "10px 12px",
                }}
              >
                {plan.exitTicket}
              </p>
            </div>

            <div
              style={{
                marginTop: 16,
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Link
                href={plan.standardInfoHref}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: GLANCE.teach.fg,
                  textDecoration: "none",
                  border: `1px solid ${GLANCE.teach.border}`,
                  background: GLANCE.teach.bg,
                  borderRadius: 999,
                  padding: "8px 14px",
                }}
              >
                Standard info →
              </Link>
              <Link
                href={plan.unitGuideHref}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: GLANCE.project.fg,
                  textDecoration: "none",
                  border: `1px solid ${GLANCE.project.border}`,
                  background: GLANCE.project.bg,
                  borderRadius: 999,
                  padding: "8px 14px",
                }}
              >
                Unit teaching guide →
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setDetailsOpen((v) => !v)}
              style={{
                marginTop: 14,
                border: "none",
                background: "transparent",
                color: MUTED,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                padding: 0,
              }}
            >
              {detailsOpen ? "Hide details · rare extras" : "Details · rare extras"}
            </button>
            {detailsOpen && (
              <p style={{ margin: "8px 0 0", color: MUTED, fontSize: 13, lineHeight: 1.45 }}>
                Skeleton only — not a full planner, pacing guide, or district PDF import.
                {plan.productAbout ? ` Product whisper: ${plan.productAbout}` : ""}
                {plan.standardOneLiner ? ` · ${plan.standardOneLiner}` : ""}
              </p>
            )}
          </div>
        </div>
      </Glass>
      <style>{`
        @media (max-width: 820px) {
          .ci2-lesson-onepager, [style*="grid-template-columns: minmax(240px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </StationShell>
  );
}

function Chip({ label, tone }) {
  const style = tone
    ? glanceChipStyle(tone)
    : { color: MUTED, background: SOFT_LAV, border: `1px solid ${LINE}` };
  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 700,
        borderRadius: 999,
        padding: "5px 11px",
        ...style,
      }}
    >
      {label}
    </span>
  );
}
