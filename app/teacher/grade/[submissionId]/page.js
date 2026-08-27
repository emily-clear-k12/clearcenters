"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, Sparkles } from "lucide-react";
import { supabase } from "../../../../lib/supabaseClient";
import { getPublicCase } from "../../../../lib/cases/index.public";
import { getNewsroomBNPublicCase } from "../../../../lib/cases/newsroom-bn/index.public";
import { getSignalCheckPublicCase } from "../../../../lib/cases/signal-check/index.public";
import TeacherSidebar from "../../../../components/TeacherSidebar";

const COLORS = {
  navy: "#0D1B2A",
  cream: "#F2F0FA",
  violet: "#8C52F2",
  violetSoft: "#EEE6FD",
  teal: "#6FD8F5",
  tealSoft: "#E6F8F9",
  gold: "#FFC44D",
  border: "#E1E2EE",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#697386",
  success: "#22C55E",
  warning: "#FF9F43",
};

const GRADE_LABELS = { 0: "Level 0", 1: "Level 1", 2: "Level 2" };
// Crystal Points awarded when a grade is released, scaled to score so effort
// still earns something even at Level 0. Easy to retune later — just these
// three numbers.
const POINTS_BY_GRADE = { 0: 10, 1: 20, 2: 30 };
const CONFIDENCE_META = {
  shaky: { emoji: "😕", label: "Still shaky" },
  solid: { emoji: "🙂", label: "Pretty solid" },
  strong: { emoji: "😄", label: "Really strong" },
};

const NEXT_STEPS_GENERIC = {
  0: { heading: "Reteach the core idea", body: "This student is still holding onto the trap claim. Sit down together and walk back through the evidence bank one piece at a time." },
  1: { heading: "Close the gap", body: "They're partway there but missing a piece. Point them back to the evidence they didn't use yet and ask them to add one more connection." },
};

// Same shape as NEXT_STEPS_GENERIC above, reworded for Signal Check — there's
// no single "trap claim" here, just true/false/misleading verdicts on each
// signal, so the reteach language points at the evidence per signal instead.
const SIGNAL_CHECK_NEXT_STEPS = {
  0: { heading: "Reteach the core idea", body: "This student is still misreading the evidence — most of their verdicts don't match what the readings actually show. Sit down together and walk through the evidence, signal by signal." },
  1: { heading: "Close the gap", body: "They got some signals right, but at least one verdict doesn't match the evidence, or the reasoning behind it is thin. Point them back to the signal(s) they missed and ask them to reconnect their reasoning to the evidence." },
};
const SIGNAL_CHECK_PUSH_FURTHER = "This student read every signal correctly. Challenge them to point out a piece of evidence they didn't cite, or explain why a different verdict wouldn't fit as well.";

function ScorePill({ label, value, color, sublabel }) {
  return (
    <div style={{ background: COLORS.white, borderRadius: 14, padding: 14, textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,.08)", flex: 1 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, letterSpacing: 0.4, marginBottom: 6, textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: color || COLORS.textDark, fontFamily: "'Poppins', sans-serif" }}>{value}</div>
      {sublabel && <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{sublabel}</div>}
    </div>
  );
}

function ReleaseConfirmModal({ open, studentName, grade, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(13,20,35,.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div style={{ background: COLORS.white, borderRadius: 18, width: "min(420px, 100%)", padding: 24, boxShadow: "0 24px 60px rgba(0,0,0,.4)", textAlign: "center" }}>
        <div style={{ fontSize: 36, marginBottom: 10 }}>📤</div>
        <div style={{ fontWeight: 700, fontSize: 17, color: COLORS.textDark, marginBottom: 8 }}>Release this grade to {studentName}?</div>
        <div style={{ fontSize: 13.5, color: COLORS.textMuted, lineHeight: 1.5, marginBottom: 6 }}>
          They'll see <strong>{GRADE_LABELS[grade]}</strong> and your feedback. They will not see the AI's score or rationale.
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 18 }}>
          <button onClick={onCancel} style={{ background: COLORS.cream, color: COLORS.textDark, border: "none", borderRadius: 999, padding: "11px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Not yet</button>
          <button onClick={onConfirm} style={{ background: COLORS.violet, color: COLORS.white, border: "none", borderRadius: 999, padding: "11px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Release grade</button>
        </div>
      </div>
    </div>
  );
}

function SendBackConfirmModal({ open, studentName, feedback, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(13,20,35,.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div style={{ background: COLORS.white, borderRadius: 18, width: "min(440px, 100%)", padding: 24, boxShadow: "0 24px 60px rgba(0,0,0,.4)", textAlign: "center" }}>
        <div style={{ fontSize: 36, marginBottom: 10 }}>🔁</div>
        <div style={{ fontWeight: 700, fontSize: 17, color: COLORS.textDark, marginBottom: 8 }}>Send this back to {studentName} to try again?</div>
        <div style={{ fontSize: 13.5, color: COLORS.textMuted, lineHeight: 1.5, marginBottom: 10 }}>
          No grade will be released yet. They'll see this note from you and get a chance to revise their answer:
        </div>
        <div style={{ background: COLORS.cream, borderRadius: 10, padding: 12, fontSize: 13, color: COLORS.textDark, textAlign: "left", lineHeight: 1.5, marginBottom: 6 }}>{feedback}</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 18 }}>
          <button onClick={onCancel} style={{ background: COLORS.cream, color: COLORS.textDark, border: "none", borderRadius: 999, padding: "11px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Not yet</button>
          <button onClick={onConfirm} style={{ background: COLORS.warning, color: COLORS.white, border: "none", borderRadius: 999, padding: "11px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Send back</button>
        </div>
      </div>
    </div>
  );
}

export default function TeacherGradeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const submissionId = params.submissionId;

  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [submission, setSubmission] = useState(null);
  const [error, setError] = useState(null);

  const [finalGrade, setFinalGrade] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(null);
  const [showSendBackConfirm, setShowSendBackConfirm] = useState(false);
  const [sendingBack, setSendingBack] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError || !data?.user) {
        router.push("/login");
        return;
      }
      setTeacherEmail(data.user.email || "");
      setLoadingAuth(false);
    });
  }, [router]);

  const loadSubmission = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("submissions")
      .select("*")
      .eq("id", submissionId)
      .single();

    if (fetchError || !data) {
      setError("Couldn't load this submission — it may not exist, or you may not have access to it.");
      setLoading(false);
      return;
    }

    const { data: student } = await supabase.from("students").select("first_name").eq("id", data.student_id).single();
    const { data: assignment } = await supabase.from("assignments").select("case_standard, due_date, class_id").eq("id", data.assignment_id).single();

    let className = null;
    let caseTitle = null;
    let caseEngine = "group_chat";
    if (assignment) {
      const { data: cls } = await supabase.from("classes").select("name").eq("id", assignment.class_id).single();
      const { data: caseRow } = await supabase.from("cases").select("title, engine").eq("standard", assignment.case_standard).single();
      className = cls?.name;
      caseTitle = caseRow?.title;
      caseEngine = caseRow?.engine || "group_chat";
    }

    const merged = {
      ...data,
      studentName: student?.first_name || "Unknown student",
      className,
      caseTitle,
      caseStandard: assignment?.case_standard,
      caseEngine,
    };

    setSubmission(merged);
    setFinalGrade(merged.teacher_grade !== null && merged.teacher_grade !== undefined ? merged.teacher_grade : (merged.ai_score !== null ? merged.ai_score : 0));
    setFeedback(merged.teacher_feedback || "");
    setLoading(false);
  }, [submissionId]);

  useEffect(() => {
    if (!loadingAuth) loadSubmission();
  }, [loadingAuth, loadSubmission]);

  async function handleRelease() {
    setSaving(true);
    setShowConfirm(false);
    const { error: updateError } = await supabase
      .from("submissions")
      .update({ teacher_grade: finalGrade, teacher_feedback: feedback, released: true, released_at: new Date().toISOString() })
      .eq("id", submissionId);
    if (updateError) {
      setSaving(false);
      setError("Couldn't release the grade: " + updateError.message);
      return;
    }

    // Award Crystal Points for this release. This runs through the
    // increment_crystal_points() Postgres function (not a plain client-side
    // read-then-write) so two releases landing at the same moment can't
    // stomp on each other's point total.
    const amount = POINTS_BY_GRADE[finalGrade] ?? 0;
    if (amount > 0 && submission.student_id) {
      const { error: pointsError } = await supabase.rpc("increment_crystal_points", {
        p_student_id: submission.student_id,
        p_amount: amount,
      });
      if (!pointsError) setPointsAwarded(amount);
      // A points hiccup shouldn't block the release the teacher already
      // confirmed — the grade is what matters most; points can be
      // reconciled later if this ever actually fails.
    }

    setSaving(false);
    await loadSubmission();
  }

  async function handleSendBack() {
    setSendingBack(true);
    setShowSendBackConfirm(false);
    const { error: updateError } = await supabase
      .from("submissions")
      .update({ revision_requested: true, revision_requested_at: new Date().toISOString(), teacher_feedback: feedback, released: false })
      .eq("id", submissionId);
    if (updateError) {
      setSendingBack(false);
      setError("Couldn't send this back: " + updateError.message);
      return;
    }
    setSendingBack(false);
    await loadSubmission();
  }

  async function handleCancelSendBack() {
    setSendingBack(true);
    const { error: updateError } = await supabase
      .from("submissions")
      .update({ revision_requested: false, revision_requested_at: null })
      .eq("id", submissionId);
    if (updateError) {
      setSendingBack(false);
      setError("Couldn't undo that: " + updateError.message);
      return;
    }
    setSendingBack(false);
    await loadSubmission();
  }

  if (loadingAuth || loading) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.cream, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textMuted, fontFamily: "'Inter', sans-serif" }}>
        Loading...
      </div>
    );
  }

  if (error && !submission) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.cream, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textDark, fontFamily: "'Inter', sans-serif", padding: 20, textAlign: "center" }}>
        <div>
          <p>{error}</p>
          <button onClick={() => router.push("/teacher/grade")} style={{ background: COLORS.violet, color: COLORS.white, border: "none", borderRadius: 999, padding: "10px 20px", fontWeight: 700, cursor: "pointer" }}>Back to Submissions</button>
        </div>
      </div>
    );
  }

  const isSignalCheck = submission.caseEngine === "fact_check_desk";
  const caseEntry = isSignalCheck ? null : getPublicCase(submission.caseStandard);
  const signalCheckCase = isSignalCheck ? getSignalCheckPublicCase(submission.caseStandard) : null;
  const isNewsroom = (submission.caseEngine || "").startsWith("newsroom");
  const newsroomCase = isNewsroom ? getNewsroomBNPublicCase(submission.caseStandard) : null;
  const newsroomVoiceName = (id) => (newsroomCase?.voices.find((v) => v.id === id) || {}).name || id;
  const nd = submission.newsroom_data || null;
  const studentName = submission.studentName || "This student";
  const confMeta = submission.self_confidence ? CONFIDENCE_META[submission.self_confidence] : null;
  const checklist = submission.checklist || [];
  const checkedCount = checklist.filter(Boolean).length;
  const selfCheckQuestions = isSignalCheck ? (signalCheckCase?.selfCheckQuestions || []) : (caseEntry?.publicCase?.selfCheckQuestions || []);
  const gapFlag =
    submission.ai_score !== null &&
    (Math.abs(finalGrade - submission.ai_score) >= 2 ||
      (submission.self_confidence === "strong" && finalGrade === 0) ||
      (submission.self_confidence === "shaky" && finalGrade === 2));

  // The signals this student's verdicts don't match — used both for the
  // structured per-question breakdown on the left and the reteach
  // springboard below. Empty when this isn't a Signal Check submission or
  // the case content can't be found.
  const signalCheckAnswers = (submission.signal_data && submission.signal_data.statementAnswers) || {};
  function signalCheckVerdict(s) {
    const a = signalCheckAnswers[s.id] || {};
    return signalCheckCase?.stemMode === "open" ? a.verdictText : a.verdict;
  }
  const signalCheckWrongSignals =
    isSignalCheck && signalCheckCase
      ? signalCheckCase.statements.filter((s) => signalCheckVerdict(s) !== s.correctVerdict)
      : [];

  const nextStep = isSignalCheck
    ? finalGrade === 2
      ? { heading: "Push further", body: SIGNAL_CHECK_PUSH_FURTHER }
      : SIGNAL_CHECK_NEXT_STEPS[finalGrade] || SIGNAL_CHECK_NEXT_STEPS[0]
    : finalGrade === 2 && caseEntry
    ? { heading: "Push further", body: caseEntry.pushAngle }
    : NEXT_STEPS_GENERIC[finalGrade] || NEXT_STEPS_GENERIC[0];

  // Springboard for the teacher: the standard's core question and the
  // specific misconception (Group Chat) or the missed signals (Signal
  // Check) this case is built around, pulled from the same public case
  // content already shown to the student — not new authored content, just
  // surfaced here so the teacher doesn't have to go look it up separately
  // before reteaching.
  const standardSpringboard = isSignalCheck
    ? finalGrade !== 2 && signalCheckCase
      ? { kind: "signal-check", claimHeadline: signalCheckCase.transmission.claimHeadline, wrongSignals: signalCheckWrongSignals }
      : null
    : finalGrade !== 2 && caseEntry && caseEntry.publicCase
    ? { kind: "group-chat", bigQuestion: caseEntry.publicCase.bigQuestion, trapLine: caseEntry.publicCase.trapLine }
    : null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.cream, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
        .gc-fade-in { animation: gcFadeIn 220ms ease-out; }
        @keyframes gcFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
      `}</style>

      <TeacherSidebar teacherEmail={teacherEmail} />

      <div style={{ flex: 1, padding: "24px 32px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: "14px 20px", marginBottom: 20, boxShadow: "0 4px 16px rgba(13,27,42,.06)" }}>
          <button onClick={() => router.push("/teacher/grade")} style={{ background: "none", border: "none", color: COLORS.textMuted, display: "flex", alignItems: "center", padding: 6, borderRadius: 8, cursor: "pointer" }}>
            <ChevronLeft size={20} />
          </button>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: COLORS.violetSoft, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.violet, fontSize: 15, flexShrink: 0 }}>
            {studentName[0]}
          </div>
          <div style={{ marginRight: "auto" }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", color: COLORS.textDark, fontWeight: 700, fontSize: 15 }}>{studentName}</div>
            <div style={{ color: COLORS.textMuted, fontSize: 12 }}>{submission.className}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: COLORS.textDark, fontWeight: 700, fontSize: 13.5 }}>{submission.caseTitle || submission.caseStandard}</div>
            <div style={{ color: COLORS.textMuted, fontSize: 11.5 }}>Submitted {new Date(submission.submitted_at).toLocaleString()}</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 1000, display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {isSignalCheck ? (
              // Signal Check only ever has one attempt — no revise step —
              // so the Attempt 1 / Attempt 2 split doesn't apply here. Show
              // each signal matched with what the student actually answered
              // instead of the flattened one-paragraph summary.
              <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)" }}>
                <div style={{ fontWeight: 700, fontSize: 12.5, color: COLORS.textMuted, marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Student's Responses</div>
                {signalCheckCase ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {signalCheckCase.statements.map((s, i) => {
                      const a = signalCheckAnswers[s.id] || {};
                      const verdict = signalCheckVerdict(s);
                      const isCorrect = verdict && verdict === s.correctVerdict;
                      const evidenceById = {};
                      (signalCheckCase.evidenceReadings || []).forEach((e) => { evidenceById[e.id] = e; });
                      return (
                        <div key={s.id} style={{ paddingTop: i === 0 ? 0 : 14, borderTop: i === 0 ? "none" : `1px solid ${COLORS.border}` }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.4 }}>{s.tag}</div>
                          <div style={{ fontSize: 13.5, color: COLORS.textDark, marginBottom: 8, fontStyle: "italic" }}>"{s.text}"</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: !verdict ? COLORS.textMuted : isCorrect ? COLORS.success : COLORS.warning }}>
                              Answered: {verdict ? verdict.toUpperCase() : "(no answer)"}
                            </span>
                            {verdict && (
                              <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10.5, fontWeight: 700, letterSpacing: 0.3, padding: "2px 8px", borderRadius: 999, background: isCorrect ? "#E9F9EE" : "#FBEAEA", color: isCorrect ? COLORS.success : "#B23A3A" }}>
                                {isCorrect ? "✓ CORRECT" : "✗ INCORRECT"}
                              </span>
                            )}
                            {verdict && !isCorrect ? <span style={{ fontSize: 12, color: COLORS.textMuted }}>correct answer: {s.correctVerdict.toUpperCase()}</span> : ""}
                          </div>
                          {signalCheckCase.stemMode === "dropdown" ? (
                            <div style={{ background: COLORS.cream, borderRadius: 10, padding: 10, fontSize: 13, color: COLORS.textDark }}>
                              Evidence cited: {[a.evidence1, a.evidence2].filter(Boolean).map((id) => evidenceById[id]?.label || id).join(", ") || <span style={{ color: COLORS.textMuted, fontStyle: "italic" }}>(none picked)</span>}
                            </div>
                          ) : (
                            <div style={{ background: COLORS.cream, borderRadius: 10, padding: 10, fontSize: 13, lineHeight: 1.5, color: COLORS.textDark }}>
                              {a.reasoning || <span style={{ color: COLORS.textMuted, fontStyle: "italic" }}>(no reasoning written)</span>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ background: COLORS.cream, borderRadius: 10, padding: 12, fontSize: 13, color: COLORS.textMuted, fontStyle: "italic" }}>{submission.attempt2 || "(no answer written)"}</div>
                )}
              </div>
            ) : (
              <>
                <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)" }}>
                  <div style={{ fontWeight: 700, fontSize: 12.5, color: COLORS.textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Attempt 1</div>
                  <div style={{ background: COLORS.cream, borderRadius: 10, padding: 12, fontSize: 14, lineHeight: 1.5, color: COLORS.textDark }}>{submission.attempt1 || <span style={{ color: COLORS.textMuted, fontStyle: "italic" }}>(no answer written)</span>}</div>
                </div>

                {submission.attempt2 && (
                  <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ fontWeight: 700, fontSize: 12.5, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>Attempt 2 · Revised</div>
                      <span style={{ background: COLORS.tealSoft, color: COLORS.teal, fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>2nd attempt</span>
                    </div>
                    <div style={{ background: COLORS.cream, borderRadius: 10, padding: 12, fontSize: 14, lineHeight: 1.5, color: COLORS.textDark }}>{submission.attempt2}</div>
                  </div>
                )}
              </>
            )}

            {isNewsroom && nd && (
              <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)" }}>
                <div style={{ fontWeight: 700, fontSize: 12.5, color: COLORS.textMuted, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Newsroom Investigation</div>

                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, marginBottom: 3 }}>First Guess</div>
                <div style={{ fontSize: 13, color: COLORS.textDark, marginBottom: 12, fontStyle: "italic" }}>{nd.firstGuess || "—"}</div>

                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, marginBottom: 5 }}>Investigation Log ({(nd.investigationLog || []).length} claims logged)</div>
                <div style={{ display: "grid", gap: 6, marginBottom: 12 }}>
                  {(nd.investigationLog || []).map((log, i) => (
                    <div key={i} style={{ background: COLORS.cream, borderRadius: 8, padding: "8px 10px", fontSize: 12 }}>
                      <span style={{ fontWeight: 700 }}>{newsroomVoiceName(log.voiceId)}</span>
                      <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 999, background: log.stamp === "observation" ? "#E9F9EE" : "#EEE6FD", color: log.stamp === "observation" ? COLORS.success : COLORS.violet }}>
                        {log.stamp === "observation" ? "Observation" : "Inference"}
                      </span>
                      <div style={{ marginTop: 3, color: COLORS.textDark }}>{log.text}</div>
                    </div>
                  ))}
                  {(nd.investigationLog || []).length === 0 && <div style={{ fontSize: 12, color: COLORS.textMuted }}>No claims logged.</div>}
                </div>

                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, marginBottom: 3 }}>Cause & Effect Chain</div>
                <div style={{ fontSize: 12.5, color: COLORS.textDark, marginBottom: 4 }}><b>Root cause:</b> {nd.causeChain?.rootCause || "—"}</div>
                {(nd.causeChain?.ripples || []).map((r, i) => (
                  <div key={i} style={{ fontSize: 12.5, color: COLORS.textDark, marginBottom: 4 }}><b>Ripple {i + 1}:</b> {r}</div>
                ))}

                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, margin: "10px 0 3px" }}>Design a Next Test</div>
                <div style={{ fontSize: 12.5, color: COLORS.textDark, marginBottom: 2 }}><b>Would measure:</b> {nd.nextTest?.measure || "—"}</div>
                <div style={{ fontSize: 12.5, color: COLORS.textDark, marginBottom: 10 }}><b>Would hold constant:</b> {nd.nextTest?.constant || "—"}</div>

                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, marginBottom: 3 }}>Second Look — Sources Used vs. Rejected</div>
                <div style={{ fontSize: 12.5, color: COLORS.textDark, marginBottom: 2 }}><b>Used:</b> {(nd.attempt2?.usedVoiceIds || []).map(newsroomVoiceName).join(", ") || "—"}</div>
                <div style={{ fontSize: 12.5, color: COLORS.textDark, marginBottom: 2 }}><b>Rejected:</b> {nd.attempt2?.rejectedVoiceId ? newsroomVoiceName(nd.attempt2.rejectedVoiceId) : "—"}</div>
                <div style={{ fontSize: 12.5, color: COLORS.textDark, marginBottom: 10 }}><b>Why:</b> {nd.attempt2?.rejectedJustification || "—"}</div>

                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, marginBottom: 3 }}>Final Headline</div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: COLORS.textDark }}>{nd.headline || "—"}</div>
              </div>
            )}

            <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Sparkles size={15} color={COLORS.violet} />
                <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.violet }}>AI First Reader</div>
                <span style={{ marginLeft: "auto", fontSize: 10.5, color: COLORS.textMuted, fontStyle: "italic" }}>not the final grade — teacher preview only</span>
              </div>
              {submission.ai_score !== null && submission.ai_score !== undefined ? (
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: COLORS.violetSoft, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 20, color: COLORS.violet, flexShrink: 0 }}>
                    {submission.ai_score}
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.textDark, lineHeight: 1.45 }}>{submission.ai_rationale}</div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 13, color: COLORS.textMuted, fontStyle: "italic" }}>AI scoring wasn't available for this submission — grade manually below.</div>
                  {/* Failed grading calls stash the real error here (prefixed
                      "[AI grading error]") instead of a bare null, so a
                      persistent failure is diagnosable from this screen
                      instead of looking identical every time. */}
                  {submission.ai_rationale && submission.ai_rationale.startsWith("[AI grading error]") && (
                    <div style={{ marginTop: 8, background: "#FBEAEA", border: "1px solid #F0C4C4", borderRadius: 8, padding: "8px 10px", fontSize: 11.5, color: "#8A3030", fontFamily: "monospace" }}>{submission.ai_rationale}</div>
                  )}
                </div>
              )}
            </div>

            <div className="gc-fade-in" style={{ background: finalGrade === 2 ? COLORS.tealSoft : "#FFF7E6", borderRadius: 16, padding: 16, border: `1.5px solid ${finalGrade === 2 ? COLORS.teal : COLORS.gold}` }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: finalGrade === 2 ? COLORS.teal : "#B8860B", marginBottom: 6 }}>
                Suggested Next Step · {nextStep.heading}
              </div>
              <div style={{ fontSize: 12.5, color: COLORS.textDark, lineHeight: 1.5 }}>{nextStep.body}</div>
              {standardSpringboard && standardSpringboard.kind === "group-chat" && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(0,0,0,.08)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>Core Idea of This Standard</div>
                  <div style={{ fontSize: 12.5, color: COLORS.textDark, lineHeight: 1.5, marginBottom: 10 }}>{standardSpringboard.bigQuestion}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>Misconception They May Be Holding Onto</div>
                  <div style={{ fontSize: 12.5, color: COLORS.textDark, lineHeight: 1.5, fontStyle: "italic" }}>"{standardSpringboard.trapLine}"</div>
                </div>
              )}
              {standardSpringboard && standardSpringboard.kind === "signal-check" && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(0,0,0,.08)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>The Claim Being Fact-Checked</div>
                  <div style={{ fontSize: 12.5, color: COLORS.textDark, lineHeight: 1.5, fontStyle: "italic", marginBottom: 10 }}>"{standardSpringboard.claimHeadline}"</div>
                  {standardSpringboard.wrongSignals.length > 0 ? (
                    <>
                      <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>Signals to Revisit</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {standardSpringboard.wrongSignals.map((s) => (
                          <div key={s.id} style={{ fontSize: 12.5, color: COLORS.textDark, lineHeight: 1.5 }}>
                            <b>{s.tag} — should be {s.correctVerdict.toUpperCase()}:</b> {s.reasonText}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div style={{ fontSize: 12.5, color: COLORS.textDark, lineHeight: 1.5 }}>Every verdict matched the evidence — the gap here is likely in how the reasoning is explained rather than which signals were picked.</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {checklist.length > 0 && selfCheckQuestions.length > 0 && (
              <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)" }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.textDark, marginBottom: 2 }}>Student's Self-Check</div>
                <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginBottom: 10 }}>Checked {checkedCount} of {checklist.length} before submitting</div>
                <div style={{ display: "grid", gap: 6 }}>
                  {selfCheckQuestions.map((q, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12, lineHeight: 1.4 }}>
                      <span style={{ color: checklist[i] ? COLORS.success : "#D8D4E8", fontWeight: 700, flexShrink: 0 }}>{checklist[i] ? "✓" : "○"}</span>
                      <span style={{ color: checklist[i] ? COLORS.textDark : COLORS.textMuted }}>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 10 }}>
              <ScorePill label="AI First Read" value={submission.ai_score !== null && submission.ai_score !== undefined ? submission.ai_score : "—"} color={COLORS.violet} />
              <ScorePill label="Student Felt" value={confMeta ? confMeta.emoji : "—"} sublabel={confMeta ? confMeta.label : "Not shared"} color={COLORS.teal} />
              <ScorePill label="Your Grade" value={finalGrade} color={COLORS.gold} />
            </div>

            {gapFlag && (
              <div className="gc-fade-in" style={{ background: "#FFF4E5", border: `1.5px solid ${COLORS.warning}`, borderRadius: 12, padding: "10px 12px", fontSize: 12, color: "#8A5A00", lineHeight: 1.4 }}>
                Heads up — there's a notable gap between how the student felt about this answer and the grade you're giving. Might be worth a quick word with them.
              </div>
            )}

            <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.textDark, marginBottom: 10 }}>Final Grade</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 12 }}>
                {[0, 1, 2].map((g) => (
                  <button
                    key={g}
                    className="gc-btn"
                    onClick={() => setFinalGrade(g)}
                    disabled={submission.released || submission.revision_requested}
                    style={{ padding: "12px 8px", borderRadius: 10, fontWeight: 700, fontSize: 14, border: finalGrade === g ? `2px solid ${COLORS.gold}` : "2px solid transparent", background: finalGrade === g ? "#FFF7E6" : COLORS.cream, color: COLORS.textDark }}
                  >
                    {GRADE_LABELS[g]}
                  </button>
                ))}
              </div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                disabled={submission.released || submission.revision_requested}
                placeholder="Feedback for the student — required if you're sending this back for a revision, optional if you're releasing a grade..."
                style={{ width: "100%", minHeight: 70, resize: "vertical", border: "2px solid #ECEAF5", borderRadius: 10, padding: 10, fontFamily: "inherit", fontSize: 13, boxSizing: "border-box", marginBottom: 12 }}
              />
              {submission.released ? (
                <div className="gc-fade-in" style={{ textAlign: "center", background: COLORS.tealSoft, color: COLORS.teal, borderRadius: 10, padding: "10px 12px", fontWeight: 700, fontSize: 13 }}>
                  ✓ Released to {studentName}
                  {pointsAwarded !== null && <span> · +{pointsAwarded} Crystal Points 🔮</span>}
                </div>
              ) : submission.revision_requested ? (
                <div className="gc-fade-in">
                  <div style={{ textAlign: "center", background: "#FFF4E5", color: "#8A5A00", borderRadius: 10, padding: "10px 12px", fontWeight: 700, fontSize: 13, marginBottom: 8 }}>
                    🔁 Sent back — waiting for {studentName} to try again
                  </div>
                  <button className="gc-btn" onClick={handleCancelSendBack} disabled={sendingBack} style={{ width: "100%", background: "none", color: COLORS.textMuted, border: `1.5px solid ${COLORS.border}`, borderRadius: 999, padding: "9px 16px", fontWeight: 700, fontSize: 12.5 }}>
                    {sendingBack ? "Undoing..." : "Undo — go back to grading"}
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <button className="gc-btn" onClick={() => setShowConfirm(true)} disabled={saving || sendingBack} style={{ width: "100%", background: COLORS.violet, color: COLORS.white, border: "none", borderRadius: 999, padding: "12px 20px", fontWeight: 700, fontSize: 14.5 }}>
                    {saving ? "Saving..." : "Release Grade →"}
                  </button>
                  <button
                    className="gc-btn"
                    onClick={() => setShowSendBackConfirm(true)}
                    disabled={saving || sendingBack || !feedback.trim()}
                    title={!feedback.trim() ? "Add feedback above so the student knows what to fix" : ""}
                    style={{ width: "100%", background: "none", color: !feedback.trim() ? COLORS.textMuted : "#B8860B", border: `1.5px solid ${!feedback.trim() ? COLORS.border : COLORS.warning}`, borderRadius: 999, padding: "10px 20px", fontWeight: 700, fontSize: 13.5, opacity: !feedback.trim() ? 0.6 : 1 }}
                  >
                    {sendingBack ? "Sending..." : "🔁 Send Back for Revision"}
                  </button>
                  {!feedback.trim() && (
                    <div style={{ fontSize: 11.5, color: COLORS.textMuted, textAlign: "center" }}>Add feedback above to send this back for a revision.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>

      <ReleaseConfirmModal open={showConfirm} studentName={studentName} grade={finalGrade} onCancel={() => setShowConfirm(false)} onConfirm={handleRelease} />
      <SendBackConfirmModal open={showSendBackConfirm} studentName={studentName} feedback={feedback} onCancel={() => setShowSendBackConfirm(false)} onConfirm={handleSendBack} />
    </div>
  );
}
