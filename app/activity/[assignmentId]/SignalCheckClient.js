"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// Signal Check's own locked palette — navy/teal/violet/gold, distinct from
// Group Chat (violet-led) and Newsroom (navy/gold-led) so it reads as its
// own activity even though it shares the app shell.
const COLORS = {
  navy: "#16243F",
  teal: "#00C2C7",
  gold: "#FFC44D",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  white: "#FFFFFF",
  danger: "#FF6B6B",
  success: "#22C55E",
  cream: "#F2F0FA",
  textDark: "#1F2A44",
  textMuted: "#697386",
};

// "verdict" (the old spoiler reveal screen) is gone — it showed the correct
// answer, already locked in, before the student ever picked one themselves.
// "answer" is now a single combined screen: students press True/Misleading/
// False, can revise those picks freely, can reopen the evidence to double
// check themselves, self-check, and submit — all without leaving the page
// or losing their place. No separate locked "review" screen in between.
const PHASES = ["main", "scan", "sort", "answer"];
const PHASE_LABEL = { main: "Transmission", scan: "Scan", sort: "Sensor Sort", answer: "Verdict & Submit" };

const CONFIDENCE_LEVELS = [
  { id: "shaky", emoji: "😕", label: "Still shaky" },
  { id: "solid", emoji: "🙂", label: "Pretty solid" },
  { id: "strong", emoji: "😄", label: "Really strong" },
];

// Same product-wide rule as Group Chat: at least 3 of the 5 self-check
// questions must be checked before a student can submit for grading.
const REQUIRED_CHECKS = 3;

function TopBar({ standard, subject }) {
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 0", zIndex: 2 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: 3, color: COLORS.white }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke={COLORS.teal} strokeWidth="2" /><path d="M20 20L16 16" stroke={COLORS.teal} strokeWidth="2" strokeLinecap="round" /></svg>
        SIGNAL CHECK
      </div>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "rgba(255,255,255,.85)", background: "rgba(10,8,20,.5)", border: "1px solid rgba(255,255,255,.22)", padding: "6px 12px", borderRadius: 999 }}>
        {standard} · SECTOR: {(subject || "").toUpperCase()}
      </span>
    </div>
  );
}

function Dots({ phase }) {
  const idx = PHASES.indexOf(phase);
  return (
    <div style={{ position: "relative", display: "flex", gap: 8, justifyContent: "center", margin: "14px 0 0", zIndex: 2 }}>
      {PHASES.map((p, i) => (
        <span key={p} style={{ width: 8, height: 8, borderRadius: "50%", background: i <= idx ? COLORS.teal : "rgba(255,255,255,.28)", boxShadow: i <= idx ? `0 0 8px ${COLORS.teal}` : "none" }} />
      ))}
    </div>
  );
}

function EchoLine({ text }) {
  if (!text) return null;
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 12, maxWidth: 640, margin: "0 auto", zIndex: 2 }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, background: `radial-gradient(circle at 35% 30%, ${COLORS.teal}, #0c2230 75%)`, boxShadow: "0 0 14px rgba(0,194,199,.65)" }} />
      <div style={{ fontSize: 13.5, lineHeight: 1.4, color: "rgba(255,255,255,.92)", background: "rgba(8,10,22,.55)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 14, padding: "11px 16px" }}>
        <span style={{ color: COLORS.teal, fontWeight: 700, letterSpacing: 0.5 }}>ECHO — </span>{text}
      </div>
    </div>
  );
}

function GlassCard({ children, style }) {
  return (
    <div style={{ position: "relative", background: "rgba(8,10,22,.55)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 18, padding: "20px 24px", backdropFilter: "blur(4px)", zIndex: 2, ...style }}>
      {children}
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled, style }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="sc-btn"
      style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14.5, color: COLORS.navy, background: disabled ? "rgba(0,194,199,.4)" : COLORS.teal, border: "none", borderRadius: 999, padding: "13px 26px", cursor: disabled ? "default" : "pointer", boxShadow: disabled ? "none" : "0 8px 24px rgba(0,194,199,.45)", ...style }}
    >
      {children}
    </button>
  );
}

function verdictColor(v) {
  if (v === "False") return COLORS.danger;
  if (v === "True") return COLORS.success;
  return COLORS.gold;
}

// Real tap-to-pick buttons for True/Misleading/False — replaces the old
// dropdown/typed-text verdict inputs. Emily's ask: "if anything pressing
// the actual buttons to say if its true/false."
function VerdictButtons({ options, value, onChange, hasErr }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
      {(options || []).map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className="sc-btn"
            style={{
              flex: 1,
              textAlign: "center",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              padding: "10px 4px",
              borderRadius: 9,
              background: active ? `${verdictColor(opt)}29` : "rgba(255,255,255,.06)",
              border: active ? `1.5px solid ${verdictColor(opt)}` : hasErr ? `1.5px solid ${COLORS.danger}` : "1.5px solid rgba(255,255,255,.2)",
              color: active ? COLORS.white : "rgba(255,255,255,.65)",
              cursor: "pointer",
            }}
          >
            {opt.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

// Ported from Group Chat's SubmitConfirmModal — same copy, Signal Check's
// own navy/teal styling instead of violet/cream so it still reads as this
// activity's own UI.
function SubmitConfirmModal({ open, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(6,8,16,.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div style={{ background: COLORS.navy, border: "1px solid rgba(255,255,255,.2)", borderRadius: 18, width: "min(420px, 100%)", padding: 24, boxShadow: "0 24px 60px rgba(0,0,0,.5)", textAlign: "center", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ fontSize: 36, marginBottom: 10 }}>📡</div>
        <div style={{ fontWeight: 700, fontSize: 17, color: COLORS.white, marginBottom: 8 }}>Ready to submit for grading?</div>
        <div style={{ fontSize: 13.5, color: "rgba(255,255,255,.7)", lineHeight: 1.5, marginBottom: 6 }}>Once you submit, you won't be able to make more changes to your answer.</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 18 }}>
          <button onClick={onCancel} style={{ background: "rgba(255,255,255,.1)", color: COLORS.white, border: "none", borderRadius: 999, padding: "11px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>No, go back</button>
          <button onClick={onConfirm} style={{ background: COLORS.teal, color: COLORS.navy, border: "none", borderRadius: 999, padding: "11px 22px", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Yes, submit</button>
        </div>
      </div>
    </div>
  );
}

// Ported from Group Chat's CelebrationModal.
function CelebrationModal({ open, onGoHome }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(6,8,16,.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div style={{ background: COLORS.navy, border: "1px solid rgba(255,255,255,.2)", borderRadius: 18, width: "min(420px, 100%)", padding: 28, boxShadow: "0 24px 60px rgba(0,0,0,.5)", textAlign: "center", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
        <div style={{ fontWeight: 700, fontSize: 18, color: COLORS.white, marginBottom: 6 }}>Thanks for reflecting on your work!</div>
        <div style={{ fontSize: 13.5, color: "rgba(255,255,255,.7)", marginBottom: 20 }}>Your teacher will release your final grade soon.</div>
        <button onClick={onGoHome} style={{ background: COLORS.teal, color: COLORS.navy, border: "none", borderRadius: 999, padding: "12px 26px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Back to Missions</button>
      </div>
    </div>
  );
}

export default function SignalCheckClient({ assignmentId, caseStandard, publicCase, existingSubmission, alreadySubmitted, revisionRequested, revisionFeedback }) {
  const router = useRouter();
  const storageKey = "cc_signalcheck_draft_" + assignmentId;

  const draft = existingSubmission || {};
  const draftAnswers = (draft.signal_data && draft.signal_data.statementAnswers) || {};
  const selfCheckQuestions = publicCase.selfCheckQuestions || [];

  const [phase, setPhase] = useState(alreadySubmitted && !revisionRequested ? "answer" : "main");

  // Sensor Sort game state — self-check practice, never graded.
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [placements, setPlacements] = useState({}); // { itemId: binId }
  const [attemptsByItem, setAttemptsByItem] = useState({}); // { itemId: n }
  const [firstTryCorrect, setFirstTryCorrect] = useState(0);
  const [wrongFlashBinId, setWrongFlashBinId] = useState(null);

  // Answer phase state, shape depends on publicCase.stemMode.
  const [statementAnswers, setStatementAnswers] = useState(draftAnswers);
  const [errors, setErrors] = useState({});

  // Self-check checklist, confirm modal, real submit, post-submit
  // confidence — same pattern as Group Chat's revise/share steps, folded
  // into the same screen as the verdict cards instead of a separate step.
  const [checklist, setChecklist] = useState(draft.checklist || selfCheckQuestions.map(() => false));
  const [showChecklistError, setShowChecklistError] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [selfConfidence, setSelfConfidence] = useState(draft.self_confidence || null);
  // Lets a student re-open the evidence they already scanned, right from the
  // verdict screen, to double-check themselves before submitting — instead
  // of having to navigate all the way back to the Scan screen and lose their
  // in-progress answers.
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(alreadySubmitted);

  const hydrated = useRef(false);

  useEffect(() => {
    if (alreadySubmitted) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const d = JSON.parse(raw);
        // Older drafts saved under the previous 5-phase version may have
        // "verdict" or "reflect" stored — both now live under "answer".
        const restoredPhase = d.phase === "verdict" || d.phase === "reflect" ? "answer" : d.phase;
        if (!revisionRequested) setPhase(restoredPhase || "main");
        setPlacements(d.placements || {});
        setAttemptsByItem(d.attemptsByItem || {});
        setFirstTryCorrect(d.firstTryCorrect || 0);
        setStatementAnswers(d.statementAnswers || {});
        setChecklist(d.checklist || selfCheckQuestions.map(() => false));
      }
    } catch (err) {}
    hydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydrated.current || submitted) return;
    const d = { phase, placements, attemptsByItem, firstTryCorrect, statementAnswers, checklist };
    try { localStorage.setItem(storageKey, JSON.stringify(d)); } catch (err) {}
  }, [phase, placements, attemptsByItem, firstTryCorrect, statementAnswers, checklist, submitted, storageKey]);

  function goTo(next) {
    setPhase(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const evidenceById = {};
  publicCase.evidenceReadings.forEach((e) => { evidenceById[e.id] = e; });

  const statementById = {};
  publicCase.statements.forEach((s) => { statementById[s.id] = s; });

  const unplacedItems = publicCase.evidenceReadings.filter((e) => !placements[e.id]);
  const allSorted = Object.keys(placements).length === publicCase.evidenceReadings.length;

  function pickItem(itemId) {
    setSelectedItemId((prev) => (prev === itemId ? null : itemId));
  }

  function placeInBin(bin) {
    if (!selectedItemId) return;
    const itemId = selectedItemId;
    const isCorrect = bin.correctItemIds.includes(itemId);
    setAttemptsByItem((prev) => {
      const n = (prev[itemId] || 0) + 1;
      if (isCorrect && n === 1) setFirstTryCorrect((f) => f + 1);
      return { ...prev, [itemId]: n };
    });
    if (isCorrect) {
      setPlacements((prev) => ({ ...prev, [itemId]: bin.id }));
      setSelectedItemId(null);
    } else {
      setWrongFlashBinId(bin.id);
      setTimeout(() => setWrongFlashBinId(null), 420);
    }
  }

  function setAnswer(stmtId, field, value) {
    setStatementAnswers((prev) => ({ ...prev, [stmtId]: { ...prev[stmtId], [field]: value } }));
  }

  function validateAnswers() {
    const mode = publicCase.stemMode;
    const nextErrors = {};
    publicCase.statements.forEach((s) => {
      const a = statementAnswers[s.id] || {};
      if (mode === "dropdown") {
        if (!a.verdict || !a.evidence1 || !a.evidence2) nextErrors[s.id] = true;
      } else if (mode === "dropdown-open") {
        if (!a.verdict || !a.reasoning || !a.reasoning.trim()) nextErrors[s.id] = true;
      } else {
        if (!a.verdictText || !a.reasoning || !a.reasoning.trim()) nextErrors[s.id] = true;
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function toggleChecklistItem(i) {
    setChecklist((prev) => {
      const next = prev.slice();
      next[i] = !next[i];
      return next;
    });
  }
  const checkedCount = checklist.filter(Boolean).length;
  const checklistPasses = checkedCount >= REQUIRED_CHECKS;

  function handleRequestSubmit() {
    // Verdicts first — a missing/invalid answer is a bigger problem than an
    // unchecked self-check box, so surface that error first if both apply.
    if (!validateAnswers()) {
      setShowChecklistError(false);
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!checklistPasses) { setShowChecklistError(true); return; }
    setShowChecklistError(false);
    setShowSubmitConfirm(true);
  }

  function saveProgress(fields) {
    return fetch("/api/submission/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignmentId, ...fields }),
    }).then((res) => res.ok).catch(() => false);
  }

  function pickConfidence(id) {
    setSelfConfidence(id);
    saveProgress({ self_confidence: id });
  }

  async function submitForGrading() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/signal-check/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId,
          caseStandard,
          stemMode: publicCase.stemMode,
          statementAnswers,
          checklist,
          practiceContext: {
            sortTotalItems: publicCase.evidenceReadings.length,
            sortFirstTryCorrect: firstTryCorrect,
            sortTotalAttempts: Object.values(attemptsByItem).reduce((a, b) => a + b, 0),
          },
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      try { localStorage.removeItem(storageKey); } catch (err) {}
      setSubmitted(true);
    } catch (err) {
      setSubmitError("Couldn't submit your report just now — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function confirmSubmit() {
    setShowSubmitConfirm(false);
    submitForGrading();
  }

  const backgroundStyle = {
    minHeight: "100vh",
    backgroundImage: 'url("/signal-check/window.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center 45%",
    backgroundAttachment: "fixed",
    fontFamily: "'Inter', sans-serif",
    color: COLORS.white,
  };

  return (
    <div style={backgroundStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        .sc-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .sc-btn:hover:not(:disabled) { transform: translateY(-1px); }
        .sc-scrim { position: fixed; inset: 0; background: linear-gradient(180deg, rgba(10,8,20,.55) 0%, rgba(8,6,18,.78) 45%, rgba(8,6,18,.9) 100%); z-index: 0; pointer-events: none; }
        .sc-chip { cursor: pointer; transition: transform 120ms ease, box-shadow 120ms ease; }
        .sc-chip:hover { transform: translateY(-1px); }
        .sc-chip.selected { box-shadow: 0 0 0 2px ${COLORS.teal}; }
        .sc-bin.flash { animation: sc-flash 0.4s ease; }
        @keyframes sc-flash { 0%,100% { box-shadow: none; } 50% { box-shadow: 0 0 0 3px ${COLORS.danger}; } }
        .sc-select { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 13px; background: rgba(0,194,199,.16); border: 1.5px solid ${COLORS.teal}; color: ${COLORS.white}; border-radius: 8px; padding: 5px 8px; margin: 0 3px; }
        .sc-textarea { width: 100%; resize: vertical; min-height: 70px; border: 1.5px solid rgba(255,255,255,.25); border-radius: 10px; padding: 10px 12px; font-family: 'Inter', sans-serif; font-size: 13.5px; background: rgba(255,255,255,.06); color: ${COLORS.white}; box-sizing: border-box; }
        .sc-textarea::placeholder { color: rgba(255,255,255,.4); }
        .sc-textarea.err { border-color: ${COLORS.danger}; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
      <div className="sc-scrim" />

      <TopBar standard={publicCase.teksLabel} subject={publicCase.subject} />
      <Dots phase={phase} />

      {revisionRequested && phase === "main" && (
        <div style={{ position: "relative", maxWidth: 760, margin: "16px auto 0", padding: "0 20px", zIndex: 2 }}>
          <div style={{ background: "rgba(255,196,77,.16)", border: `1.5px solid ${COLORS.gold}`, borderRadius: 14, padding: "14px 16px", fontSize: 13.5, color: "#FFE4A6" }}>
            🔁 Your teacher asked you to take another pass at this signal. Their note: "{revisionFeedback || "Take another look at your evidence."}"
          </div>
        </div>
      )}

      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto", padding: "20px 20px 60px", zIndex: 2 }}>

        {phase === "main" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22, textAlign: "center", padding: "30px 0" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, color: COLORS.teal }}>⟶ INCOMING TRANSMISSION · SOURCE: {publicCase.transmission.source}</div>
            <GlassCard style={{ maxWidth: 560 }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 26, lineHeight: 1.3 }}>"{publicCase.transmission.claimHeadline}"</div>
              <div style={{ marginTop: 12, fontSize: 12.5, color: "rgba(255,255,255,.6)" }}>— logged by {publicCase.transmission.source}, {publicCase.transmission.loggedAt}</div>
            </GlassCard>
            <PrimaryButton onClick={() => goTo("scan")}>
              Scan the Evidence
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={COLORS.navy} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </PrimaryButton>
            <EchoLine text={publicCase.echo.main} />
          </div>
        )}

        {phase === "scan" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {publicCase.fieldReport ? (
              // One photo + a short field-note paragraph, read as a single
              // report instead of a grid of separate evidence cards — scales
              // to new cases without needing a photo per individual reading.
              <GlassCard style={{ padding: 0, overflow: "hidden" }}>
                <img src={publicCase.fieldReport.image} alt={publicCase.fieldReport.imageCaption || "Field evidence photo"} style={{ display: "block", width: "100%", maxHeight: 360, objectFit: "cover" }} />
                <div style={{ padding: "16px 20px" }}>
                  {publicCase.fieldReport.imageCaption && (
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10.5, letterSpacing: 1, color: COLORS.teal, marginBottom: 8 }}>{publicCase.fieldReport.imageCaption.toUpperCase()}</div>
                  )}
                  <div style={{ fontSize: 13.5, lineHeight: 1.6, color: "rgba(255,255,255,.9)" }}>{publicCase.fieldReport.notes}</div>
                </div>
              </GlassCard>
            ) : (
              // Fallback for cases without a field report photo yet — the
              // numbered sensor log, no category badges (a "distractor" or
              // "photo/data" badge here would telegraph which readings
              // matter before the student has sorted anything).
              <>
                <div style={{ textAlign: "center", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, color: COLORS.teal }}>⟶ SENSOR LOG · {publicCase.evidenceReadings.length} RAW READINGS</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {publicCase.evidenceReadings.map((e, i) => (
                    <div key={e.id} style={{ display: "flex", gap: 12, background: "rgba(8,10,22,.55)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 14, padding: "12px 16px" }}>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, color: COLORS.teal, flexShrink: 0, width: 26 }}>#{i + 1}</div>
                      <div>
                        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13 }}>{e.label}</div>
                        <div style={{ fontSize: 12.5, lineHeight: 1.4, color: "rgba(255,255,255,.78)", marginTop: 2 }}>{e.reading}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              {publicCase.statements.map((s) => (
                <div key={s.id} style={{ background: "rgba(8,10,22,.6)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 14, padding: "10px 16px", maxWidth: 320 }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9.5, letterSpacing: 1, color: COLORS.teal }}>{s.tag}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.35, marginTop: 3 }}>"{s.text}"</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
              <PrimaryButton onClick={() => goTo("sort")}>
                Match the Signal
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={COLORS.navy} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </PrimaryButton>
            </div>
            <EchoLine text={publicCase.echo.scan} />
          </div>
        )}

        {phase === "sort" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16 }}>🛰️ Sensor Sort</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10.5, letterSpacing: 1.5, color: COLORS.teal, marginTop: 3 }}>TAP A READING, THEN TAP THE SIGNAL IT PROVES</div>
            </div>

            <div style={{ background: "rgba(8,10,22,.5)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 16, padding: 14, minHeight: 60 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 1, color: "rgba(255,255,255,.6)", marginBottom: 8, textAlign: "center" }}>SENSOR TRAY</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                {unplacedItems.length === 0 && <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>All readings sorted.</div>}
                {unplacedItems.map((e) => (
                  <div key={e.id} onClick={() => pickItem(e.id)} className={"sc-chip" + (selectedItemId === e.id ? " selected" : "")} style={{ background: "rgba(255,255,255,.08)", border: "1.5px dashed rgba(255,255,255,.4)", borderRadius: 12, padding: "10px 14px", maxWidth: 240, textAlign: "left" }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 0.5, color: COLORS.teal, marginBottom: 3 }}>{e.label.toUpperCase()}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12.5, lineHeight: 1.35 }}>{e.reading}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {publicCase.sortBins.map((bin) => {
                const stmt = statementById[bin.id];
                return (
                  <div key={bin.id} onClick={() => placeInBin(bin)} className={"sc-bin" + (wrongFlashBinId === bin.id ? " flash" : "")} style={{ flex: "1 1 220px", cursor: selectedItemId ? "pointer" : "default", background: "rgba(8,10,22,.5)", border: `1.5px solid ${bin.id === "none" ? "rgba(255,255,255,.3)" : "rgba(0,194,199,.5)"}`, borderRadius: 16, padding: "12px 14px", minHeight: 90 }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 1, color: bin.id === "none" ? "rgba(255,255,255,.6)" : COLORS.teal }}>{bin.label}</div>
                    {stmt && <div style={{ fontSize: 12, lineHeight: 1.35, color: "rgba(255,255,255,.82)", marginTop: 5 }}>"{stmt.text}"</div>}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                      {publicCase.evidenceReadings.filter((e) => placements[e.id] === bin.id).map((e) => (
                        <div key={e.id} style={{ background: "rgba(0,194,199,.14)", border: "1.5px solid rgba(0,194,199,.6)", borderRadius: 9, padding: "7px 10px" }}>
                          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8.5, letterSpacing: 0.5, color: COLORS.teal, marginBottom: 2 }}>{e.label.toUpperCase()}</div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, lineHeight: 1.35 }}>{e.reading}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
              <PrimaryButton disabled={!allSorted} onClick={() => goTo("answer")}>
                Lock In Sort — {Object.keys(placements).length}/{publicCase.evidenceReadings.length}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={COLORS.navy} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </PrimaryButton>
            </div>
            <EchoLine text={publicCase.echo.sort} />
          </div>
        )}

        {phase === "answer" && !submitted && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ textAlign: "center", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, color: COLORS.teal }}>
              ⟶ FILE A VERDICT ON EACH SIGNAL
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 640, margin: "0 auto", width: "100%" }}>
              {publicCase.statements.map((s) => {
                const a = statementAnswers[s.id] || {};
                const hasErr = !!errors[s.id];
                return (
                  <div key={s.id} style={{ background: "rgba(8,10,22,.6)", border: hasErr ? `1.5px solid ${COLORS.danger}` : "1px solid rgba(255,255,255,.2)", borderRadius: 16, padding: "14px 18px" }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 1, color: COLORS.teal, marginBottom: 6 }}>{s.tag}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.5, color: "rgba(255,255,255,.9)", marginBottom: 10 }}>"{s.text}"</div>

                    {publicCase.stemMode === "dropdown" && (
                      <>
                        <VerdictButtons options={publicCase.verdictOptions} value={a.verdict} onChange={(v) => setAnswer(s.id, "verdict", v)} hasErr={hasErr && !a.verdict} />
                        <div style={{ fontSize: 13, lineHeight: 1.7 }}>
                          because{" "}
                          <select className="sc-select" value={a.evidence1 || ""} onChange={(e) => setAnswer(s.id, "evidence1", e.target.value)}>
                            <option value="">choose ▾</option>
                            {publicCase.evidenceReadings.map((e) => <option key={e.id} value={e.id}>{e.label}</option>)}
                          </select>{" "}
                          and{" "}
                          <select className="sc-select" value={a.evidence2 || ""} onChange={(e) => setAnswer(s.id, "evidence2", e.target.value)}>
                            <option value="">choose ▾</option>
                            {publicCase.evidenceReadings.map((e) => <option key={e.id} value={e.id}>{e.label}</option>)}
                          </select>.
                        </div>
                      </>
                    )}

                    {publicCase.stemMode === "dropdown-open" && (
                      <>
                        <VerdictButtons options={publicCase.verdictOptions} value={a.verdict} onChange={(v) => setAnswer(s.id, "verdict", v)} hasErr={hasErr && !a.verdict} />
                        <textarea className={"sc-textarea" + (hasErr ? " err" : "")} placeholder="Explain your reasoning using the evidence..." value={a.reasoning || ""} onChange={(e) => setAnswer(s.id, "reasoning", e.target.value)} />
                      </>
                    )}

                    {publicCase.stemMode === "open" && (
                      <>
                        <VerdictButtons options={publicCase.verdictOptions} value={a.verdictText} onChange={(v) => setAnswer(s.id, "verdictText", v)} hasErr={hasErr && !a.verdictText} />
                        <textarea className={"sc-textarea" + (hasErr ? " err" : "")} placeholder="Explain your reasoning using the evidence..." value={a.reasoning || ""} onChange={(e) => setAnswer(s.id, "reasoning", e.target.value)} />
                      </>
                    )}

                    {hasErr && <div style={{ color: COLORS.danger, fontSize: 11, fontWeight: 600, marginTop: 6 }}>Fill this in before submitting.</div>}
                  </div>
                );
              })}
            </div>

            {/* Lets a student re-check the evidence right here, without losing
                their in-progress answers by navigating back to Scan. */}
            <GlassCard style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
              <button className="sc-btn" onClick={() => setEvidenceOpen((o) => !o)} style={{ background: "none", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: 0, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14, color: COLORS.white }}>
                📋 Review the Evidence Again
                <span style={{ color: COLORS.teal, fontSize: 12 }}>{evidenceOpen ? "▲ HIDE" : "▼ SHOW"}</span>
              </button>
              {evidenceOpen && (
                <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                  {publicCase.evidenceReadings.map((e, i) => (
                    <div key={e.id} style={{ display: "flex", gap: 10, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 12, padding: "10px 14px" }}>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, color: COLORS.teal, flexShrink: 0, width: 22 }}>#{i + 1}</div>
                      <div>
                        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 12.5 }}>{e.label}</div>
                        <div style={{ fontSize: 12, lineHeight: 1.4, color: "rgba(255,255,255,.75)", marginTop: 2 }}>{e.reading}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>

            <GlassCard style={{ maxWidth: 640, margin: "0 auto", width: "100%" }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Self-Check</div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.65)", marginBottom: 10 }}>Check off the ones that are true — you need at least {REQUIRED_CHECKS} of {selfCheckQuestions.length} ({checkedCount}/{selfCheckQuestions.length} so far).</div>
              <div style={{ display: "grid", gap: 8 }}>
                {selfCheckQuestions.map((item, i) => (
                  <div key={i} onClick={() => toggleChecklistItem(i)} className="sc-chip" style={{ display: "flex", gap: 8, alignItems: "flex-start", background: checklist[i] ? "rgba(0,194,199,.14)" : "rgba(255,255,255,.06)", border: checklist[i] ? `1.5px solid ${COLORS.teal}` : "1.5px solid rgba(255,255,255,.18)", borderRadius: 10, padding: "9px 11px" }}>
                    <div style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1, border: `2px solid ${checklist[i] ? COLORS.teal : "rgba(255,255,255,.3)"}`, background: checklist[i] ? COLORS.teal : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.navy, fontSize: 12, fontWeight: 700 }}>{checklist[i] ? "✓" : ""}</div>
                    <div style={{ fontSize: 12.5, lineHeight: 1.4 }}>{item}</div>
                  </div>
                ))}
              </div>
              {showChecklistError && !checklistPasses && (
                <div style={{ color: COLORS.danger, fontSize: 12, fontWeight: 600, marginTop: 10 }}>Check at least {REQUIRED_CHECKS} before submitting.</div>
              )}
            </GlassCard>

            {submitError && <div style={{ textAlign: "center", color: COLORS.danger, fontSize: 13, fontWeight: 600 }}>{submitError}</div>}

            <div style={{ textAlign: "center" }}>
              <PrimaryButton onClick={handleRequestSubmit} disabled={submitting}>
                {submitting ? <Loader2 size={16} className="spin" style={{ animation: "spin 1s linear infinite" }} /> : null}
                Submit for Grading
                {!submitting && <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 12L20 4L14 20L11 13L4 12Z" stroke={COLORS.navy} strokeWidth="1.8" strokeLinejoin="round" /></svg>}
              </PrimaryButton>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", marginTop: 8 }}>Goes to your teacher for review — ECHO's read is just a first pass.</div>
            </div>

            <EchoLine text={publicCase.echo.reflect || publicCase.echo.submit} />
          </div>
        )}

        {phase === "answer" && submitted && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ textAlign: "center", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, color: COLORS.teal }}>⟶ REPORT FILED</div>

            <GlassCard style={{ maxWidth: 520, margin: "0 auto", width: "100%", textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>📡</div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Submitted! Nice work.</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.75)", lineHeight: 1.5 }}>Your teacher will release your grade soon. Take a second to think about how it went.</div>
            </GlassCard>

            <GlassCard style={{ maxWidth: 520, margin: "0 auto", width: "100%" }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 10, textAlign: "center" }}>How confident are you in your report?</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {CONFIDENCE_LEVELS.map((c) => (
                  <button key={c.id} className="sc-btn" onClick={() => pickConfidence(c.id)} style={{ padding: "14px 8px", borderRadius: 12, fontWeight: 700, fontSize: 12.5, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: selfConfidence === c.id ? COLORS.teal : "rgba(255,255,255,.08)", color: selfConfidence === c.id ? COLORS.navy : COLORS.white, border: selfConfidence === c.id ? `2px solid ${COLORS.teal}` : "2px solid transparent" }}>
                    <span style={{ fontSize: 24 }}>{c.emoji}</span>{c.label}
                  </button>
                ))}
              </div>
            </GlassCard>

            <div style={{ textAlign: "center" }}>
              <PrimaryButton onClick={() => router.push("/missions")}>Back to Missions</PrimaryButton>
            </div>
          </div>
        )}

      </div>

      <SubmitConfirmModal open={showSubmitConfirm} onCancel={() => setShowSubmitConfirm(false)} onConfirm={confirmSubmit} />
      <CelebrationModal open={selfConfidence !== null && phase === "answer" && submitted} onGoHome={() => router.push("/missions")} />
    </div>
  );
}
