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
} from "../../../../../components/v2/StationShell";
import { getStandardInfoStub } from "../../../../../lib/v2/demoStandardsUnit";

/**
 * CI2.0 Standard info — glance-first stub (not a TEKS DB).
 * Hash = TEKS code; ?from= activity id for back to Project.
 */
export default function StandardsInfoClient() {
  const searchParams = useSearchParams();
  const fromId = searchParams?.get("from") || null;
  const [hashCode, setHashCode] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    const read = () => {
      const h = (typeof window !== "undefined" && window.location.hash) || "";
      setHashCode(decodeURIComponent(h.replace(/^#/, "")) || "");
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const stub = useMemo(
    () => getStandardInfoStub({ code: hashCode, fromId }),
    [hashCode, fromId]
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
          Standard info
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
          <span style={{ color: stub.subjectColor || LAVENDER }}>{stub.teksLabel}</span>
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
          <Chip label="In plain words" tone="teach" />
          {stub.unitHint ? <Chip label={stub.unitHint} /> : null}
          {stub.code ? <Chip label={stub.code} /> : <Chip label="Stub" />}
        </div>

        <div
          style={{
            marginTop: 18,
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
              marginBottom: 8,
            }}
          >
            IN PLAIN WORDS
          </div>
          <p style={{ margin: 0, color: INK, fontSize: 15, lineHeight: 1.45, fontWeight: 600 }}>
            {stub.plain}
          </p>

          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: MUTED,
              letterSpacing: 0.35,
              margin: "16px 0 8px",
            }}
          >
            MASTERY LOOK-FORS
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
            {stub.lookFors.map((line, i) => (
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
                <span style={{ color: INK, fontSize: 14, lineHeight: 1.4 }}>{line}</span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 14 }}>
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
                Stub only — not a full TEKS database. Official wording, vertical alignment, and
                district packs come later.{" "}
                {stub.activityTitle ? (
                  <>
                    Tied to teach: <strong style={{ color: INK }}>{stub.activityTitle}</strong>.
                  </>
                ) : (
                  "Open from a Project one-pager to keep the back link warm."
                )}
              </div>
            )}
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
      </Glass>
    </StationShell>
  );
}

function Chip({ label, tone }) {
  if (tone === "teach") {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          ...glanceChipStyle("teach"),
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
