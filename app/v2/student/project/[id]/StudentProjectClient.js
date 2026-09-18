"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getStudentProjectShell } from "../../../../../lib/v2/demoProject";
import { markMissionDone } from "../../../../../lib/v2/demoStudentActivity";
import { enqueueStudentSubmission } from "../../../../../lib/v2/demoGrading";
import { DEMO_STUDENT } from "../../../../../lib/v2/demoStudentDay";

const INK = "#2E2459";
const MUTED = "#5E577F";
const LINE = "#E4DEF4";
const LAVENDER = "#8B6CFF";
const SOFT_LAV = "#F3EEFF";
const CREAM = "#FFF8EE";
const WARM_BG = "linear-gradient(165deg, #F6F0FF 0%, #FFF9EE 55%, #F3EEFF 100%)";
const PROJECT_FG = "#5B4F9A";
const PROJECT_BG = "rgba(232, 228, 250, 0.95)";
const PROJECT_BORDER = "rgba(120, 108, 180, 0.42)";

/**
 * Light student project shell — checkpoints chips, evidence product, submit stub.
 * Open from My Day Later · Project (replaces toast-only).
 */
export default function StudentProjectClient({ projectId }) {
  const router = useRouter();
  const shell = useMemo(() => getStudentProjectShell(projectId), [projectId]);
  const [checked, setChecked] = useState({});
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  if (!shell) {
    return (
      <main style={pageStyle()}>
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "28px 16px" }}>
          <Link href="/v2/student" style={{ ...ghostBtn(), textDecoration: "none", display: "inline-block" }}>
            ← My Day
          </Link>
          <div style={{ ...card(), marginTop: 20 }}>
            <h1 style={h1()}>Project not found</h1>
            <p style={{ color: MUTED }}>
              That project isn’t assigned yet. Ask your teacher to Assign to My Day, or pick another card.
            </p>
            <Link
              href="/v2/student"
              style={{ ...primaryBtn({ big: true }), textDecoration: "none", display: "inline-block", marginTop: 12 }}
            >
              Back to My Day
            </Link>
          </div>
        </div>
      </main>
    );
  }

  function toggleChip(idx) {
    setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));
  }

  function handleSubmit() {
    if (submitting) return;
    setSubmitting(true);
    const missionId = shell.id; // project-act-N
    markMissionDone(missionId);
    const chipLines = (shell.checkpoints || [])
      .map((c, i) => `${checked[i] ? "✓" : "○"} ${c.dayLabel}: ${c.beat}`)
      .join("\n");
    const snippet = [
      `Evidence: ${shell.evidenceLabel}`,
      note.trim() ? `Note: ${note.trim()}` : "Note: (none)",
      chipLines || "Checkpoints: stub",
    ].join("\n");
    enqueueStudentSubmission({
      missionId,
      title: shell.title,
      subject: shell.subject,
      product: shell.product,
      studentFirst: DEMO_STUDENT.name,
      workSnippet: snippet,
      samScore: 3,
      samReason: "Project evidence stub — confirm when you've looked.",
      maxScore: 4,
      standard: shell.standard || null,
    });
    setToast({ text: "Project submitted — Ms. Rivera will see it in Grading.", tone: "ok" });
    setTimeout(() => {
      router.push(`/v2/student?done=${encodeURIComponent(missionId)}`);
    }, 450);
  }

  return (
    <main style={pageStyle()}>
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "24px 16px 88px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <Link href="/v2/student" style={{ ...ghostBtn(), textDecoration: "none", display: "inline-block" }}>
            ← My Day
          </Link>
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: PROJECT_FG,
              background: PROJECT_BG,
              border: `1px solid ${PROJECT_BORDER}`,
              borderRadius: 999,
              padding: "6px 12px",
              alignSelf: "center",
            }}
          >
            PROJECT
          </span>
        </div>

        <div style={{ ...card(), marginTop: 16 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: shell.subjectColor || LAVENDER,
              letterSpacing: 0.4,
              textTransform: "uppercase",
            }}
          >
            {shell.subjectName || "Subject"}
            {shell.audienceId === "small_group" ? " · Small group" : ""}
            {shell.spanChip ? ` · ${shell.spanChip}` : ""}
          </div>
          <h1 style={h1()}>{shell.title}</h1>
          <p style={{ color: MUTED, marginTop: 0, fontSize: 14 }}>
            {shell.minutes} min · {shell.teksLabel}
          </p>

          <div
            role="status"
            style={{
              marginTop: 8,
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
              background: "rgba(255,255,255,.9)",
              border: `1px solid ${LINE}`,
              borderRadius: 16,
              padding: "12px 14px",
            }}
          >
            <div
              aria-hidden
              style={{
                width: 40,
                height: 40,
                borderRadius: 14,
                background: "linear-gradient(145deg, #B8A4FF, #8B6CFF)",
                color: "#fff",
                fontWeight: 800,
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              SAM
            </div>
            <p style={{ margin: 0, color: INK, fontSize: 15, lineHeight: 1.45, paddingTop: 6 }}>
              {shell.samLine}
            </p>
          </div>

          {/* Checkpoint chips */}
          <section aria-label="Checkpoints" style={{ marginTop: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: MUTED, letterSpacing: 0.3, marginBottom: 8 }}>
              CHECKPOINTS
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {(shell.checkpoints || []).map((c, idx) => {
                const on = !!checked[idx];
                return (
                  <button
                    key={`${c.dayLabel}-${idx}`}
                    type="button"
                    onClick={() => toggleChip(idx)}
                    title={c.beat}
                    style={{
                      border: on ? `2px solid ${PROJECT_FG}` : `1px solid ${LINE}`,
                      background: on ? PROJECT_BG : "#fff",
                      color: on ? PROJECT_FG : INK,
                      borderRadius: 999,
                      padding: "8px 14px",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    {on ? "✓ " : ""}
                    {c.dayLabel}
                  </button>
                );
              })}
            </div>
            {(shell.checkpoints || []).some((_, i) => checked[i]) && (
              <p style={{ margin: "10px 0 0", fontSize: 13, color: MUTED, lineHeight: 1.4 }}>
                {(shell.checkpoints || [])
                  .filter((_, i) => checked[i])
                  .map((c) => c.beat)
                  .join(" · ")}
              </p>
            )}
          </section>

          {/* Evidence product */}
          <section aria-label="Evidence product" style={{ marginTop: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: MUTED, letterSpacing: 0.3, marginBottom: 8 }}>
              EVIDENCE PRODUCT
            </div>
            <div
              style={{
                background: SOFT_LAV,
                border: `1px solid #E8E0FF`,
                borderRadius: 16,
                padding: "14px 14px 16px",
              }}
            >
              <div style={{ fontWeight: 800, color: INK, fontSize: 16 }}>{shell.evidenceLabel}</div>
              <p style={{ margin: "6px 0 0", color: MUTED, fontSize: 14, lineHeight: 1.45 }}>
                {shell.evidenceBody}
              </p>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Optional note for your teacher…"
                rows={3}
                style={{
                  width: "100%",
                  marginTop: 12,
                  boxSizing: "border-box",
                  border: `1px solid ${LINE}`,
                  borderRadius: 14,
                  padding: "12px 14px",
                  fontFamily: "inherit",
                  fontSize: 15,
                  color: INK,
                  resize: "vertical",
                  background: "#fff",
                }}
              />
            </div>
          </section>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            style={{ ...primaryBtn({ big: true }), marginTop: 22, width: "100%" }}
          >
            {submitting ? "Saving…" : "Submit project"}
          </button>
          <p style={{ fontSize: 12, color: MUTED, marginTop: 10, textAlign: "center" }}>
            Stub only — queues grading like other submits (same browser).
          </p>
        </div>
      </div>
      {toast && (
        <div
          role="status"
          style={{
            position: "fixed",
            left: "50%",
            bottom: 22,
            transform: "translateX(-50%)",
            background: toast.tone === "soft" ? INK : LAVENDER,
            color: "#fff",
            borderRadius: 999,
            padding: "12px 18px",
            fontSize: 14,
            fontWeight: 600,
            boxShadow: "0 10px 28px rgba(46,36,89,.28)",
            zIndex: 40,
            maxWidth: "calc(100% - 28px)",
            textAlign: "center",
          }}
        >
          {toast.text}
        </div>
      )}
    </main>
  );
}

function pageStyle() {
  return {
    minHeight: "100vh",
    background: WARM_BG,
    fontFamily: "'Inter', system-ui, sans-serif",
  };
}

function card() {
  return {
    background: "#fff",
    border: `1px solid ${LINE}`,
    borderRadius: 24,
    padding: "24px 20px",
    boxShadow: "0 12px 36px rgba(91,79,154,.14)",
  };
}

function h1() {
  return {
    fontFamily: "'Poppins', sans-serif",
    color: INK,
    fontSize: 26,
    margin: "8px 0 6px",
    lineHeight: 1.2,
  };
}

function primaryBtn({ big } = {}) {
  return {
    border: "none",
    background: LAVENDER,
    color: "#fff",
    borderRadius: 999,
    padding: big ? "14px 22px" : "9px 16px",
    fontWeight: 800,
    fontSize: big ? 16 : 13,
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 6px 18px rgba(139,108,255,.28)",
  };
}

function ghostBtn() {
  return {
    border: `1px solid ${LINE}`,
    background: "rgba(255,255,255,.8)",
    color: INK,
    borderRadius: 999,
    padding: "8px 14px",
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "inherit",
  };
}
