"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
import {
  getFamilyNoteStub,
  isFamilyNoteSent,
  markFamilyNoteSent,
  clearFamilyNoteSent,
  FAMILY_SENT_KEY,
} from "../../../../../lib/v2/demoFamilyNote";
import { rememberFamilyCare } from "../../../../../lib/v2/demoLoopSeams";

/**
 * CI2.0 Family note stub — teacher-facing one-pager (not a parent portal).
 * Kid · today's focus · celebration + ask-home · copy message stub.
 * Beauty 80 / grammar 20.
 */
export default function FamilyNoteClient({ noteId }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subjectFromQuery = (searchParams?.get("subject") || "").trim();
  const topicFromQuery = (searchParams?.get("topic") || "").trim();
  const periodFromQuery = (searchParams?.get("period") || "").trim();
  const standardFromQuery = (searchParams?.get("standard") || "").trim();

  const note = useMemo(
    () =>
      getFamilyNoteStub(noteId, {
        subject: subjectFromQuery || undefined,
        topic: topicFromQuery || undefined,
        periodId:
          periodFromQuery && periodFromQuery !== "all"
            ? periodFromQuery
            : undefined,
        standard: standardFromQuery || undefined,
      }),
    [noteId, subjectFromQuery, topicFromQuery, periodFromQuery, standardFromQuery]
  );
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [toast, setToast] = useState(null);
  const isSoftStory = note?.kind === "soft-story";
  const [draft, setDraft] = useState("");
  useEffect(() => {
    if (note?.copyMessage) setDraft(note.copyMessage);
  }, [note?.id, note?.copyMessage]);

  const periodId =
    periodFromQuery && periodFromQuery !== "all"
      ? periodFromQuery
      : note?.periodId || null;

  // Cheap period sync — keep Check-ins room lens when deep-linking from a kid card.
  useEffect(() => {
    if (!periodId || typeof window === "undefined") return;
    try {
      window.localStorage.setItem("ci2.teacher.classFilter", periodId);
    } catch {
      /* ignore */
    }
  }, [periodId]);

  useEffect(() => {
    if (!note?.id) return;
    const refresh = () => setSent(isFamilyNoteSent(note.id));
    refresh();
    const onStorage = (e) => {
      if (!e.key || e.key === FAMILY_SENT_KEY) refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", refresh);
    window.addEventListener("ci2-family-sent", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("ci2-family-sent", refresh);
    };
  }, [note?.id]);

  useEffect(() => {
    if (!toast) return;
    const ms = toast.undo ? 5600 : 3200;
    const t = setTimeout(() => setToast(null), ms);
    return () => clearTimeout(t);
  }, [toast]);

  function handleSendToFamily() {
    if (!note) return;
    markFamilyNoteSent(note.id, {
      studentFirst: note.studentFirst,
      draft: draft || note.copyMessage,
      kind: note.kind || "kid",
    });
    if (note.standard) {
      try {
        rememberFamilyCare(note.standard, {
          source: "family-note",
          whoLine: note.whoLine || note.studentFirst,
          names: note.studentNames || undefined,
        });
      } catch {
        /* ignore */
      }
    }
    setSent(true);
    setToast({
      text: isSoftStory
        ? `Note queued for ${note.whoLine || note.studentFirst} · demo only — no SMS.`
        : `Note queued for ${note.studentFirst}'s family · demo only — no SMS.`,
      undo: true,
    });
  }

  function handleUndoSent() {
    if (!note) return;
    clearFamilyNoteSent(note.id);
    setSent(false);
    setToast({ text: "Undone — Sent · demo cleared.", undo: false });
  }

  async function copyMessage() {
    const text = draft || note?.copyMessage;
    if (!text) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
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
          {isSoftStory ? "Family note · from the soft story" : "Family note · teacher one-pager"}
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
          {periodId ? <Chip label={`Period ${periodId}`} /> : null}
          {isSoftStory ? <Chip label="Class story · care" /> : null}
        </div>

        {isSoftStory && note.whyLine ? (
          <p
            style={{
              margin: "12px 0 0",
              fontSize: 14,
              fontWeight: 600,
              color: MUTED,
              lineHeight: 1.4,
            }}
          >
            Why · {note.whyLine}
          </p>
        ) : null}

        <section style={{ marginTop: 22 }}>
          <Label>{isSoftStory ? "WHAT WE'RE PRACTICING" : "TODAY'S FOCUS"}</Label>
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
          <Label>{isSoftStory ? "MESSAGE · EDIT & SEND" : "MESSAGE STUB · COPY"}</Label>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={8}
            aria-label="Family note message"
            style={{
              marginTop: 6,
              width: "100%",
              boxSizing: "border-box",
              whiteSpace: "pre-wrap",
              fontFamily: "inherit",
              fontSize: 13,
              lineHeight: 1.45,
              color: INK,
              background: "#fff",
              border: `1px solid ${LINE}`,
              borderRadius: 12,
              padding: "12px 12px",
              resize: "vertical",
            }}
          />
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
          <button
            type="button"
            onClick={handleSendToFamily}
            style={{
              marginTop: 12,
              marginLeft: 8,
              border: sent ? `1px solid ${GLANCE.ready.border}` : "none",
              background: sent ? GLANCE.ready.bg : GLANCE.ready.fg,
              color: sent ? GLANCE.ready.fg : "#fff",
              borderRadius: 999,
              padding: "10px 16px",
              fontWeight: 800,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: sent ? "none" : "0 6px 16px rgba(46,160,140,.22)",
            }}
          >
            {sent ? "Sent · demo ✓" : "Send to family"}
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
          {isSoftStory
            ? "Soft-story care door — who + why already filled. Send queues a demo confirmation (no SMS). The loop quietly remembers you reached home."
            : "Teacher share sheet stub — Send queues a demo confirmation (no SMS/email, no parent login). Undo clears the Sent · demo flag in this browser."}
        </p>
      </Glass>

      {toast && (
        <div
          role="status"
          style={{
            position: "fixed",
            left: "50%",
            bottom: 24,
            transform: "translateX(-50%)",
            background: INK,
            color: "#fff",
            borderRadius: 999,
            padding: "10px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 14,
            fontWeight: 600,
            boxShadow: "0 10px 30px rgba(42,35,80,.35)",
            zIndex: 30,
            maxWidth: "calc(100% - 32px)",
          }}
        >
          <span>{toast.text}</span>
          {toast.undo && (
            <button
              type="button"
              onClick={handleUndoSent}
              style={{
                background: "transparent",
                border: "none",
                color: GLANCE.ready.fg,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 14,
              }}
            >
              Undo
            </button>
          )}
        </div>
      )}
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
