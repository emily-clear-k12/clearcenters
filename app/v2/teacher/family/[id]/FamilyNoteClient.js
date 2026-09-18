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
import { getFamilyNoteStub } from "../../../../../lib/v2/demoFamilyNote";

/**
 * CI2.0 Family note stub — teacher-facing one-pager (not a parent portal).
 * Kid · today's focus · celebration + ask-home · copy message stub.
 * Beauty 80 / grammar 20.
 */
export default function FamilyNoteClient({ noteId }) {
  const router = useRouter();
  const note = useMemo(() => getFamilyNoteStub(noteId), [noteId]);
  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    if (!note?.copyMessage) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(note.copyMessage);
      } else {
        const ta = document.createElement("textarea");
        ta.value = note.copyMessage;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  if (!note) {
    return (
      <StationShell>
        <TeacherSubnav active="day" />
        <Glass>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 28, color: INK }}>
            Family note not found
          </h1>
          <p style={{ color: MUTED, marginTop: 8 }}>
            Open Check-ins and tap Family note on a kid card.
          </p>
          <Link
            href="/v2/teacher/check-ins"
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
            ← Check-ins
          </Link>
        </Glass>
      </StationShell>
    );
  }

  return (
    <StationShell>
      <TeacherSubnav active="day" />
      <Glass style={{ padding: "22px 22px 20px", maxWidth: 720 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            color: GLANCE.ready.fg,
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
              background: GLANCE.ready.fg,
              opacity: 0.85,
            }}
          />
          Family note · teacher one-pager
        </div>

        <p
          style={{
            margin: "8px 0 0",
            fontFamily: "'Poppins', sans-serif",
            fontSize: 16,
            fontWeight: 600,
            color: INK,
            lineHeight: 1.35,
          }}
        >
          {note.samLine}
        </p>

        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            margin: "14px 0 0",
            fontSize: 32,
            fontWeight: 700,
            color: INK,
            lineHeight: 1.2,
          }}
        >
          {note.studentFirst}
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
          <Chip label={note.dayLabel || "Today"} />
          <Chip
            label={
              note.standard
                ? `${note.subjectName} · ${note.standard}`
                : note.subjectName
            }
            color={note.subjectColor}
          />
          {note.assignment ? <Chip label={note.assignment} /> : null}
        </div>

        <section style={{ marginTop: 22 }}>
          <Label>TODAY&apos;S FOCUS</Label>
          <p style={{ margin: 0, color: INK, fontSize: 17, lineHeight: 1.45, fontWeight: 600 }}>
            {note.focusPlain}
          </p>
        </section>

        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          <div
            style={{
              ...glanceChipStyle("ready"),
              borderRadius: 16,
              padding: "14px 14px",
              display: "grid",
              gap: 6,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.4, opacity: 0.85 }}>
              CELEBRATE
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.35, color: INK }}>
              {note.celebration}
            </div>
          </div>
          <div
            style={{
              ...glanceChipStyle("needsYou"),
              borderRadius: 16,
              padding: "14px 14px",
              display: "grid",
              gap: 6,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.4, opacity: 0.85 }}>
              ASK AT HOME
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.35, color: INK }}>
              {note.askHome}
            </div>
          </div>
        </div>

        <section
          style={{
            marginTop: 20,
            background: SOFT_LAV,
            border: `1px solid ${LINE}`,
            borderRadius: 16,
            padding: "14px 14px 12px",
          }}
        >
          <Label>MESSAGE STUB · COPY</Label>
          <pre
            style={{
              margin: "6px 0 0",
              whiteSpace: "pre-wrap",
              fontFamily: "inherit",
              fontSize: 13,
              lineHeight: 1.45,
              color: INK,
            }}
          >
            {note.copyMessage}
          </pre>
          <button
            type="button"
            onClick={copyMessage}
            style={{
              marginTop: 12,
              border: "none",
              background: LAVENDER,
              color: "#fff",
              borderRadius: 999,
              padding: "10px 16px",
              fontWeight: 800,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 6px 16px rgba(139,108,255,.22)",
            }}
          >
            {copied ? "Copied ✓" : "Copy message"}
          </button>
        </section>

        <div
          style={{
            marginTop: 22,
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            onClick={() => router.push(note.checkInsHref)}
            style={{
              border: "none",
              background: LAVENDER,
              color: "#fff",
              borderRadius: 999,
              padding: "12px 18px",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 6px 18px rgba(139,108,255,.28)",
            }}
          >
            ← Check-ins
          </button>
          <Link
            href={note.reportsHref}
            style={{
              border: `1px solid ${GLANCE.ready.border}`,
              background: GLANCE.ready.bg,
              color: GLANCE.ready.fg,
              borderRadius: 999,
              padding: "12px 18px",
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Reports
          </Link>
          <Link
            href={note.dayHref}
            style={{
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
            Daily Focus
          </Link>
        </div>

        <p style={{ margin: "16px 0 0", color: MUTED, fontSize: 12, lineHeight: 1.45 }}>
          Stub only — teacher share sheet, not a parent portal or login.
        </p>
      </Glass>
    </StationShell>
  );
}

function Label({ children }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 800,
        color: MUTED,
        letterSpacing: 0.4,
        marginBottom: 6,
      }}
    >
      {children}
    </div>
  );
}

function Chip({ label, color }) {
  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 700,
        borderRadius: 999,
        padding: "5px 11px",
        color: color || MUTED,
        background: SOFT_LAV,
        border: `1px solid ${LINE}`,
      }}
    >
      {label}
    </span>
  );
}
