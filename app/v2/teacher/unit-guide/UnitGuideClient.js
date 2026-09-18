"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
} from "../../../../components/v2/StationShell";
import { getUnitGuideStub } from "../../../../lib/v2/demoStandardsUnit";

/**
 * CI2.0 Unit teaching guide — glance-first stub (not a curriculum PDF).
 * Hash / ?from= activity id → unit title, spine, materials, teach tips.
 */
export default function UnitGuideClient() {
  const searchParams = useSearchParams();
  const fromId = searchParams?.get("from") || null;
  const [hashId, setHashId] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    const read = () => {
      const h = (typeof window !== "undefined" && window.location.hash) || "";
      setHashId(decodeURIComponent(h.replace(/^#/, "")) || "");
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const activityId = hashId || fromId || null;

  const stub = useMemo(
    () => getUnitGuideStub({ activityId, fromId: fromId || activityId }),
    [activityId, fromId]
  );

  const backProject = stub.projectHref;
  const backDay = stub.dayHref || "/v2/teacher/day?d=2";

  return (
    <StationShell>
      <TeacherSubnav active="day" />
      <Glass style={{ padding: "22px 22px 20px" }}>
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
          Unit teaching guide
          {stub.subjectName ? (
            <span style={{ color: stub.subjectColor }}> · {stub.subjectName}</span>
          ) : null}
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
          {stub.samLine}
        </p>

        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            margin: "14px 0 0",
            fontSize: 26,
            fontWeight: 700,
            color: INK,
            lineHeight: 1.25,
          }}
        >
          {stub.unitTitle}
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
          <Chip label={stub.spanLabel || "Multi-day"} tone="project" />
          {stub.teksLabel ? <Chip label={stub.teksLabel} /> : null}
          {stub.activityTitle ? <Chip label={stub.activityTitle} /> : null}
        </div>

        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "minmax(240px, 1.2fr) minmax(200px, 0.9fr)",
            gap: 18,
            alignItems: "start",
          }}
          className="ci2-unit-guide-grid"
        >
          {/* Spine */}
          <div
            style={{
              background: "rgba(232,228,250,.72)",
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
              {stub.spine.length}-DAY SPINE
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
              {stub.spine.map((day) => (
                <li
                  key={day.id}
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
                    D{day.dayNum}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 800, color: INK, fontSize: 14, lineHeight: 1.3 }}>
                      {day.dayLabel}
                      {day.chip ? ` · ${day.chip}` : ""}
                    </div>
                    <div style={{ color: MUTED, fontSize: 12, marginTop: 2, lineHeight: 1.4 }}>
                      {day.beat}
                      {day.detail ? ` — ${day.detail}` : ""}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Materials + tips */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
            <div
              style={{
                background: "#fff",
                border: `1px solid ${LINE}`,
                borderRadius: 16,
                padding: "12px 14px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: MUTED,
                  letterSpacing: 0.35,
                }}
              >
                MATERIALS · TIME
              </div>
              <div style={{ marginTop: 6, color: INK, fontSize: 14, lineHeight: 1.4 }}>
                {stub.materials}
              </div>
            </div>

            <div
              style={{
                background: "rgba(243,238,255,.65)",
                border: `1px solid ${GLANCE.teach.border}`,
                borderRadius: 16,
                padding: "12px 14px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: GLANCE.teach.fg,
                  letterSpacing: 0.35,
                  marginBottom: 8,
                }}
              >
                TEACH TIPS
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {stub.tips.map((tip, i) => (
                  <div
                    key={i}
                    style={{
                      ...glanceChipStyle("teach"),
                      borderRadius: 12,
                      padding: "8px 10px",
                      fontSize: 13,
                      fontWeight: 600,
                      lineHeight: 1.35,
                    }}
                  >
                    {tip}
                  </div>
                ))}
              </div>
            </div>

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
                    background: "#fff",
                    border: `1px solid ${LINE}`,
                    borderRadius: 14,
                    padding: "12px 14px",
                    fontSize: 13,
                    color: MUTED,
                    lineHeight: 1.45,
                  }}
                >
                  Stub unit guide — not a PDF import or district pacing guide. Spine mirrors Project
                  checkpoint beats when opened from a teach. Real curriculum packs stay out of
                  scope for this pass.
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 20,
            alignItems: "center",
          }}
        >
          {backProject ? (
            <Link
              href={backProject}
              style={{
                display: "inline-block",
                background: LAVENDER,
                color: "#fff",
                borderRadius: 999,
                padding: "12px 18px",
                fontWeight: 800,
                fontSize: 14,
                textDecoration: "none",
                boxShadow: "0 6px 18px rgba(139,108,255,.28)",
              }}
            >
              ← Back to Project
            </Link>
          ) : null}
          <Link
            href={backDay}
            style={{
              display: "inline-block",
              border: `1px solid ${LINE}`,
              background: "#fff",
              color: INK,
              borderRadius: 999,
              padding: "12px 18px",
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            ← Daily Focus
          </Link>
        </div>

        <style>{`
          @media (max-width: 820px) {
            .ci2-unit-guide-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </Glass>
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
