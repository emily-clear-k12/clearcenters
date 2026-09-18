"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getStudentActivity,
  markMissionDone,
} from "../../../../../lib/v2/demoStudentActivity";
import {
  buildWorkSnippetFromAnswers,
  enqueueStudentSubmission,
} from "../../../../../lib/v2/demoGrading";
import { DEMO_STUDENT } from "../../../../../lib/v2/demoStudentDay";
import StudentToolsPanel from "../../../../../components/v2/StudentToolsPanel";

const INK = "#2E2459";
const MUTED = "#5E577F";
const LINE = "#E4DEF4";
const LAVENDER = "#8B6CFF";
const SOFT_LAV = "#F3EEFF";
const CREAM = "#FFF8EE";
const WARM_BG = "linear-gradient(165deg, #F6F0FF 0%, #FFF9EE 55%, #F3EEFF 100%)";

/**
 * CI2.0 Student activity Start stub.
 * Skeleton shell: directions, 1–2 demo items, SAM 3-step hint, Tools panel, Submit → My Day.
 */
export default function StudentActivityClient({ missionId }) {
  const router = useRouter();
  const activity = useMemo(() => getStudentActivity(missionId), [missionId]);

  const [answers, setAnswers] = useState({});
  const [samStep, setSamStep] = useState(-1); // -1 hidden, 0..2 shown
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (!activity) {
    return (
      <main style={pageStyle()}>
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "28px 16px" }}>
          <Link href="/v2/student" style={{ ...ghostBtn(), textDecoration: "none", display: "inline-block" }}>
            ← My Day
          </Link>
          <div style={{ ...card(), marginTop: 20 }}>
            <h1 style={h1()}>Mission not found</h1>
            <p style={{ color: MUTED }}>
              That activity isn’t in today’s demo list. Head back and pick Start on a card.
            </p>
            <Link href="/v2/student" style={{ ...primaryBtn({ big: true }), textDecoration: "none", display: "inline-block", marginTop: 12 }}>
              Back to My Day
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const { mission, directions, items, samSteps, subjectColor, subjectLabel, productLabel } =
    activity;

  function setAnswer(itemId, value) {
    setAnswers((prev) => ({ ...prev, [itemId]: value }));
  }

  function advanceSam() {
    setSamStep((s) => {
      if (s < 0) return 0;
      if (s >= samSteps.length - 1) return s;
      return s + 1;
    });
  }

  function handleSubmit() {
    if (submitting) return;
    const missing = items.filter((it) => {
      const v = answers[it.id];
      if (it.kind === "mc") return !v;
      return !String(v || "").trim();
    });
    if (missing.length) {
      setToast({
        text: "Almost — answer each item, then Submit. You’ve got this.",
        tone: "soft",
      });
      return;
    }
    setSubmitting(true);
    markMissionDone(mission.id);
    // Same-browser bridge → teacher /v2/teacher/grading
    enqueueStudentSubmission({
      missionId: mission.id,
      title: mission.title,
      subject: mission.subject,
      product: mission.product,
      studentFirst: DEMO_STUDENT.name,
      workSnippet: buildWorkSnippetFromAnswers(items, answers),
      samScore: 3,
      samReason: "First read stub — confirm when you've looked.",
      maxScore: 4,
    });
    setToast({ text: "Nice work — Ms. Rivera will see this in Grading.", tone: "ok" });
    setTimeout(() => {
      router.push(`/v2/student?done=${encodeURIComponent(mission.id)}`);
    }, 450);
  }

  const samText =
    samStep < 0
      ? null
      : samSteps[Math.min(samStep, samSteps.length - 1)];

  return (
    <main style={pageStyle()}>
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "24px 16px 88px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <Link href="/v2/student" style={{ ...ghostBtn(), textDecoration: "none", display: "inline-block" }}>
            ← My Day
          </Link>
          <button type="button" onClick={() => setToolsOpen((o) => !o)} style={ghostBtn()}>
            Tools
          </button>
        </div>

        {toolsOpen && (
          <div style={{ marginTop: 12 }}>
            <StudentToolsPanel compact onClose={() => setToolsOpen(false)} backHref={null} />
          </div>
        )}

        <div style={{ ...card(), marginTop: 18 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: subjectColor,
              letterSpacing: 0.4,
              textTransform: "uppercase",
            }}
          >
            {productLabel}
            {subjectLabel ? ` · ${subjectLabel}` : ""}
          </div>
          <h1 style={h1()}>{mission.title}</h1>
          <p style={{ color: MUTED, marginTop: 0, fontSize: 14 }}>
            {mission.minutes} min · activity stub
          </p>

          <p style={{ color: INK, fontSize: 15, lineHeight: 1.5, marginTop: 8 }}>{directions}</p>

          <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
            {items.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  background: SOFT_LAV,
                  borderRadius: 18,
                  padding: "14px 14px 16px",
                  border: `1px solid #E8E0FF`,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: MUTED, marginBottom: 6 }}>
                  Item {idx + 1}
                </div>
                <div style={{ fontWeight: 700, color: INK, fontSize: 16, lineHeight: 1.35 }}>
                  {item.prompt}
                </div>
                {item.kind === "mc" ? (
                  <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
                    {item.choices.map((c) => {
                      const selected = answers[item.id] === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setAnswer(item.id, c.id)}
                          style={{
                            textAlign: "left",
                            border: selected ? `2px solid ${LAVENDER}` : `1px solid ${LINE}`,
                            background: selected ? "#fff" : "rgba(255,255,255,.85)",
                            color: INK,
                            borderRadius: 14,
                            padding: "12px 14px",
                            fontWeight: 700,
                            fontSize: 15,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            boxShadow: selected ? "0 4px 14px rgba(139,108,255,.2)" : "none",
                          }}
                        >
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <textarea
                    value={answers[item.id] || ""}
                    onChange={(e) => setAnswer(item.id, e.target.value)}
                    placeholder={item.placeholder || "Type here…"}
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
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <button type="button" onClick={advanceSam} style={ghostBtn()}>
              {samStep < 0 ? "SAM hint" : samStep >= samSteps.length - 1 ? "SAM hint · done" : "SAM hint · next"}
            </button>
            <span style={{ fontSize: 12, color: MUTED }}>
              3-step stub · nudge → hint → example
            </span>
          </div>

          {samText && (
            <div
              role="status"
              style={{
                marginTop: 12,
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                background: "rgba(255,255,255,.9)",
                border: `1px solid ${LINE}`,
                borderRadius: 18,
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
              <div style={{ paddingTop: 2 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: LAVENDER, letterSpacing: 0.3 }}>
                  {samText.label}
                </div>
                <p style={{ margin: "4px 0 0", color: INK, fontSize: 15, lineHeight: 1.45 }}>
                  {samText.text}
                </p>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            style={{ ...primaryBtn({ big: true }), marginTop: 22, width: "100%" }}
          >
            {submitting ? "Saving…" : "Submit"}
          </button>
          <p style={{ fontSize: 12, color: MUTED, marginTop: 10, textAlign: "center" }}>
            Stub only — answers stay on this device. Submit also queues a grading item for your teacher (same browser).
          </p>
        </div>
      </div>
      <Toast toast={toast} onClear={() => setToast(null)} />
    </main>
  );
}

function Toast({ toast, onClear }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => onClear?.(), 4000);
    return () => clearTimeout(t);
  }, [toast, onClear]);
  if (!toast) return null;
  return (
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
    boxShadow: "0 12px 36px rgba(139,108,255,.14)",
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
