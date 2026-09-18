"use client";

import { useEffect, useMemo, useState } from "react";
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
  MINT,
  CREAM,
  GLANCE,
  glanceChipStyle,
} from "../../../../../components/v2/StationShell";
import {
  assignProjectToMyDay,
  getProjectShell,
  isProjectAssigned,
  loadAudienceChoice,
  saveAudienceChoice,
  PROJECT_ASSIGNED_KEY,
  PROJECT_AUDIENCE_KEY,
} from "../../../../../lib/v2/demoProject";

/**
 * CI2.0 Project-on-teach — teacher one-pager (two columns).
 * LEFT: SAM · title · chips · who-for · Assign / Back
 * RIGHT: condensed notes (TEKS, checkpoint beats, materials/time, stub links)
 * Details only for rare extras. Default feels complete.
 */
export default function ProjectShellClient({ projectId }) {
  const router = useRouter();
  const shell = useMemo(() => getProjectShell(projectId), [projectId]);
  const [assigned, setAssigned] = useState(false);
  const [audienceId, setAudienceId] = useState("whole_class");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!shell) return;
    setAudienceId(loadAudienceChoice(shell.id, shell.defaultAudience || "whole_class"));
  }, [shell]);

  useEffect(() => {
    setAssigned(isProjectAssigned(projectId));
    const refresh = () => setAssigned(isProjectAssigned(projectId));
    const onStorage = (e) => {
      if (!e.key || e.key === PROJECT_ASSIGNED_KEY || e.key === PROJECT_AUDIENCE_KEY) refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", refresh);
    window.addEventListener("ci2-project-assigned", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("ci2-project-assigned", refresh);
    };
  }, [projectId]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  if (!shell) {
    return (
      <StationShell>
        <TeacherSubnav active="day" />
        <Glass>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 28, color: INK }}>
            Project not found
          </h1>
          <p style={{ color: MUTED, marginTop: 8 }}>
            That teach block isn’t in the demo week. Head back to Daily Focus and tap Project on a teach card.
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

  function handleAudience(nextId) {
    setAudienceId(nextId);
    saveAudienceChoice(shell.id, nextId);
  }

  function handleAssign() {
    assignProjectToMyDay(shell, { audienceId });
    setAssigned(true);
    const who = audienceId === "small_group" ? "small group" : "whole class";
    setToast({
      text: `Assigned to My Day (${who}) — Later · Project shows “${shell.evidence.label}”.`,
    });
  }

  const isSmall = audienceId === "small_group";
  const audienceChip =
    audienceId === "small_group" ? "Small group" : "Whole class";

  return (
    <StationShell>
      <TeacherSubnav active="day" />
      <Glass style={{ padding: "22px 22px 20px" }}>
        {/* Two-column teacher one-pager */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(240px, 0.92fr) minmax(280px, 1.35fr)",
            gap: 22,
            alignItems: "start",
          }}
          className="ci2-project-onepager"
        >
          {/* LEFT — assign lane */}
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: GLANCE.project.fg,
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
                  background: GLANCE.project.fg,
                  opacity: 0.85,
                }}
              />
              Project · <span style={{ color: shell.subjectColor }}>{shell.subjectName}</span>
            </div>
            <p
              style={{
                margin: "8px 0 0",
                fontFamily: "'Poppins', sans-serif",
                fontSize: 18,
                fontWeight: 600,
                color: INK,
                lineHeight: 1.35,
              }}
            >
              {shell.samLine}
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
              {shell.title}
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
              <Chip label={shell.evidence.chip || shell.evidence.label} tone="project" />
              <Chip label={shell.span.chip || shell.span.label} />
              <Chip label={audienceChip} />
            </div>

            <div style={{ marginTop: 18 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: MUTED,
                  letterSpacing: 0.4,
                  marginBottom: 8,
                }}
              >
                WHO IT’S FOR
              </div>
              <div
                style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                role="group"
                aria-label="Who it’s for"
              >
                {shell.audienceOptions.map((opt) => {
                  const on = audienceId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleAudience(opt.id)}
                      aria-pressed={on}
                      style={{
                        border: on ? `2px solid ${LAVENDER}` : `1px solid ${LINE}`,
                        background: on ? SOFT_LAV : "#fff",
                        color: INK,
                        borderRadius: 999,
                        padding: "10px 16px",
                        fontWeight: 800,
                        fontSize: 13,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              {isSmall && (
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 12,
                    color: MUTED,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    alignItems: "center",
                  }}
                >
                  <span>{(shell.smallGroupDemoNames || []).join(" · ") || "Stub names"}</span>
                  <Link
                    href={shell.whoNeedsMeHref || "/v2/teacher/who-needs-me"}
                    style={{ color: LAVENDER, fontWeight: 700, fontSize: 12 }}
                  >
                    Check-ins →
                  </Link>
                </div>
              )}
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
                onClick={handleAssign}
                style={{
                  border: "none",
                  background: assigned ? MINT : LAVENDER,
                  color: assigned ? INK : "#fff",
                  borderRadius: 999,
                  padding: "12px 20px",
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  boxShadow: assigned ? "none" : "0 6px 18px rgba(139,108,255,.28)",
                }}
              >
                {assigned ? "Assigned to My Day ✓" : "Assign to My Day"}
              </button>
              <button
                type="button"
                onClick={() => router.push(shell.backHref)}
                style={{
                  border: `1px solid ${LINE}`,
                  background: "#fff",
                  color: INK,
                  borderRadius: 999,
                  padding: "12px 18px",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                ← Back
              </button>
            </div>
          </div>

          {/* RIGHT — condensed teacher notes (fills the page) */}
          <div
            style={{
              minWidth: 0,
              background: "rgba(248,246,255,.72)",
              border: `1px solid ${GLANCE.project.border}`,
              borderRadius: 20,
              padding: "16px 18px 18px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: GLANCE.project.fg,
                letterSpacing: 0.45,
                marginBottom: 10,
              }}
            >
              TEACHER NOTES
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: MUTED, letterSpacing: 0.35 }}>
                STANDARD · TEKS
              </div>
              <p style={{ margin: "4px 0 0", color: INK, fontSize: 14, lineHeight: 1.45, fontWeight: 600 }}>
                <span style={{ color: shell.subjectColor }}>{shell.teksLabel}</span>
                {shell.standardOneLiner ? ` — ${shell.standardOneLiner}` : ""}
              </p>
              {!shell.standardOneLiner && (
                <p style={{ margin: "4px 0 0", color: MUTED, fontSize: 13, lineHeight: 1.4 }}>
                  {shell.why}
                </p>
              )}
            </div>

            <div style={{ marginBottom: 14 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: MUTED,
                  letterSpacing: 0.35,
                  marginBottom: 8,
                }}
              >
                CHECKPOINT BEATS
              </div>
              <ol
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {shell.checkpoints.map((cp) => (
                  <li
                    key={cp.id}
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
                    <div
                      aria-hidden
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: GLANCE.project.fg,
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: 12,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      D{cp.dayNum}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 800, color: INK, fontSize: 14, lineHeight: 1.3 }}>
                        {cp.title} · {cp.beat}
                      </div>
                      <div style={{ color: MUTED, fontSize: 12, marginTop: 2, lineHeight: 1.4 }}>
                        {cp.detail}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div
              style={{
                marginBottom: 14,
                background: "#fff",
                border: `1px solid ${LINE}`,
                borderRadius: 14,
                padding: "10px 12px",
                fontSize: 13,
                color: INK,
                lineHeight: 1.4,
              }}
            >
              <span style={{ fontWeight: 800, color: MUTED, fontSize: 11, letterSpacing: 0.35 }}>
                MATERIALS · TIME
              </span>
              <div style={{ marginTop: 4 }}>{shell.materialsStub}</div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
              <Link
                href={shell.standardInfoHref || "#"}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: LAVENDER,
                  textDecoration: "none",
                  borderBottom: `1px solid rgba(139,108,255,.35)`,
                  paddingBottom: 1,
                }}
              >
                Standard info
              </Link>
              <span style={{ color: LINE }} aria-hidden>
                ·
              </span>
              <Link
                href={shell.unitGuideHref || "#"}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: LAVENDER,
                  textDecoration: "none",
                  borderBottom: `1px solid rgba(139,108,255,.35)`,
                  paddingBottom: 1,
                }}
              >
                Unit teaching guide
              </Link>
            </div>

            {/* Details — rare extras only */}
            <div>
              <button
                type="button"
                onClick={() => setDetailsOpen((v) => !v)}
                aria-expanded={detailsOpen}
                style={{
                  border: `1px solid ${LINE}`,
                  background: detailsOpen ? SOFT_LAV : "#fff",
                  color: MUTED,
                  borderRadius: 999,
                  padding: "6px 12px",
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {detailsOpen ? "Hide extras ▲" : "Details · rare extras ▼"}
              </button>

              {detailsOpen && (
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {!shell.isTeach && (
                    <div
                      style={{
                        background: CREAM,
                        border: `1px solid #E8D9A8`,
                        borderRadius: 14,
                        padding: "10px 12px",
                        color: INK,
                        fontSize: 13,
                      }}
                    >
                      Meant for <strong>teach</strong> blocks — this one is “{shell.kind}”.
                    </div>
                  )}
                  <div
                    style={{
                      background: GLANCE.project.bg,
                      border: `1px solid ${GLANCE.project.border}`,
                      borderRadius: 14,
                      padding: "12px 14px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: GLANCE.project.fg,
                        letterSpacing: 0.4,
                      }}
                    >
                      EVIDENCE PRODUCT
                    </div>
                    <div style={{ fontWeight: 800, color: INK, fontSize: 15, marginTop: 4 }}>
                      {shell.evidence.label}
                    </div>
                    <p style={{ margin: "6px 0 0", color: MUTED, fontSize: 13, lineHeight: 1.45 }}>
                      {shell.evidence.body}
                    </p>
                    {shell.productAbout && (
                      <p style={{ margin: "8px 0 0", color: INK, fontSize: 12 }}>
                        From teach · {shell.product}: {shell.productAbout}
                      </p>
                    )}
                  </div>
                  {(shell.span.weekHint || shell.span.dateRange) && (
                    <div style={{ fontSize: 12, color: MUTED }}>
                      Span{shell.span.weekHint ? ` · ${shell.span.weekHint}` : ""}
                      {shell.span.dateRange ? ` · ${shell.span.dateRange}` : ""}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Narrow screens: stack without fighting the grid */}
        <style>{`
          @media (max-width: 820px) {
            .ci2-project-onepager {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </Glass>

      {toast && (
        <div
          role="status"
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: INK,
            color: "#fff",
            padding: "12px 18px",
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 600,
            maxWidth: 440,
            zIndex: 50,
            boxShadow: "0 12px 32px rgba(46,36,89,.35)",
          }}
        >
          {toast.text}
        </div>
      )}
    </StationShell>
  );
}

function Chip({ label, tone }) {
  if (tone === "project") {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          ...glanceChipStyle("project"),
          borderRadius: 999,
          padding: "6px 12px",
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {label}
      </span>
    );
  }
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: "#fff",
        border: `1px solid ${LINE}`,
        color: INK,
        borderRadius: 999,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {label}
    </span>
  );
}