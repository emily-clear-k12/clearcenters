"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, Sparkles } from "lucide-react";
import { supabase } from "../../../../lib/supabaseClient";
import { getPublicCase } from "../../../../lib/cases/index.public";
import TeacherSidebar from "../../../../components/TeacherSidebar";

const COLORS = {
  navy: "#0D1B2A",
  cream: "#F2F0FA",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
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
const CONFIDENCE_META = {
  shaky: { emoji: "😕", label: "Still shaky" },
  solid: { emoji: "🙂", label: "Pretty solid" },
  strong: { emoji: "😄", label: "Really strong" },
};

const NEXT_STEPS_GENERIC = {
  0: { heading: "Reteach the core idea", body: "This student is still holding onto the trap claim. Sit down together and walk back through the evidence bank one piece at a time." },
  1: { heading: "Close the gap", body: "They're partway there but missing a piece. Point them back to the evidence they didn't use yet and ask them to add one more connection." },
};

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
    if (assignment) {
      const { data: cls } = await supabase.from("classes").select("name").eq("id", assignment.class_id).single();
      const { data: caseRow } = await supabase.from("cases").select("title").eq("standard", assignment.case_standard).single();
      className = cls?.name;
      caseTitle = caseRow?.title;
    }

    const merged = {
      ...data,
      studentName: student?.first_name || "Unknown student",
      className,
      caseTitle,
      caseStandard: assignment?.case_standard,
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
      .update({ teacher_grade: finalGrade, teacher_feedback: feedback, released: true })
      .eq("id", submissionId);
    setSaving(false);
    if (updateError) {
      setError("Couldn't release the grade: " + updateError.message);
      return;
    }
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

  const caseEntry = getPublicCase(submission.caseStandard);
  const studentName = submission.studentName || "This student";
  const confMeta = submission.self_confidence ? CONFIDENCE_META[submission.self_confidence] : null;
  const checklist = submission.checklist || [];
  const checkedCount = checklist.filter(Boolean).length;
  const gapFlag =
    submission.ai_score !== null &&
    (Math.abs(finalGrade - submission.ai_score) >= 2 ||
      (submission.self_confidence === "strong" && finalGrade === 0) ||
      (submission.self_confidence === "shaky" && finalGrade === 2));

  const nextStep =
    finalGrade === 2 && caseEntry
      ? { heading: "Push further", body: caseEntry.pushAngle }
      : NEXT_STEPS_GENERIC[finalGrade] || NEXT_STEPS_GENERIC[0];

  // Springboard for the teacher: the standard's core question and the
  // specific misconception this case is built around, pulled from the same
  // public case content already shown to the student — not new authored
  // content, just surfaced here so the teacher doesn't have to go look it
  // up separately before reteaching.
  const standardSpringboard =
    finalGrade !== 2 && caseEntry && caseEntry.publicCase
      ? { bigQuestion: caseEntry.publicCase.bigQuestion, trapLine: caseEntry.publicCase.trapLine }
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
                <div style={{ fontSize: 13, color: COLORS.textMuted, fontStyle: "italic" }}>AI scoring wasn't available for this submission — grade manually below.</div>
              )}
            </div>

            <div className="gc-fade-in" style={{ background: finalGrade === 2 ? COLORS.tealSoft : "#FFF7E6", borderRadius: 16, padding: 16, border: `1.5px solid ${finalGrade === 2 ? COLORS.teal : COLORS.gold}` }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: finalGrade === 2 ? COLORS.teal : "#B8860B", marginBottom: 6 }}>
                Suggested Next Step · {nextStep.heading}
              </div>
              <div style={{ fontSize: 12.5, color: COLORS.textDark, lineHeight: 1.5 }}>{nextStep.body}</div>
              {standardSpringboard && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(0,0,0,.08)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>Core Idea of This Standard</div>
                  <div style={{ fontSize: 12.5, color: COLORS.textDark, lineHeight: 1.5, marginBottom: 10 }}>{standardSpringboard.bigQuestion}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>Misconception They May Be Holding Onto</div>
                  <div style={{ fontSize: 12.5, color: COLORS.textDark, lineHeight: 1.5, fontStyle: "italic" }}>"{standardSpringboard.trapLine}"</div>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {checklist.length > 0 && caseEntry && (
              <div style={{ background: COLORS.white, borderRadius: 16, padding: 16, boxShadow: "0 4px 16px rgba(0,0,0,.12)" }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.textDark, marginBottom: 2 }}>Student's Self-Check</div>
                <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginBottom: 10 }}>Checked {checkedCount} of {checklist.length} before submitting</div>
                <div style={{ display: "grid", gap: 6 }}>
                  {caseEntry.publicCase.selfCheckQuestions.map((q, i) => (
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
                    disabled={submission.released}
                    style={{ padding: "12px 8px", borderRadius: 10, fontWeight: 700, fontSize: 14, border: finalGrade === g ? `2px solid ${COLORS.gold}` : "2px solid transparent", background: finalGrade === g ? "#FFF7E6" : COLORS.cream, color: COLORS.textDark }}
                  >
                    {GRADE_LABELS[g]}
                  </button>
                ))}
              </div>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                disabled={submission.released}
                placeholder="Optional feedback for the student..."
                style={{ width: "100%", minHeight: 70, resize: "vertical", border: "2px solid #ECEAF5", borderRadius: 10, padding: 10, fontFamily: "inherit", fontSize: 13, boxSizing: "border-box", marginBottom: 12 }}
              />
              {submission.released ? (
                <div className="gc-fade-in" style={{ textAlign: "center", background: COLORS.tealSoft, color: COLORS.teal, borderRadius: 10, padding: "10px 12px", fontWeight: 700, fontSize: 13 }}>
                  ✓ Released to {studentName}
                </div>
              ) : (
                <button className="gc-btn" onClick={() => setShowConfirm(true)} disabled={saving} style={{ width: "100%", background: COLORS.violet, color: COLORS.white, border: "none", borderRadius: 999, padding: "12px 20px", fontWeight: 700, fontSize: 14.5 }}>
                  {saving ? "Saving..." : "Release Grade →"}
                </button>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>

      <ReleaseConfirmModal open={showConfirm} studentName={studentName} grade={finalGrade} onCancel={() => setShowConfirm(false)} onConfirm={handleRelease} />
    </div>
  );
}
