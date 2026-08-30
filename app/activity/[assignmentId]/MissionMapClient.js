"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { GENERIC_HINTS, getCaseHints } from "../../../lib/hints";

// Mission Map's own locked palette — deep space navy/indigo with a signal-
// gold accent for cleared ground, distinct from Signal Check (navy/teal/
// violet/gold) and Group Chat (violet-led) so it reads as its own activity
// even though it shares the app shell.
const COLORS = {
  navy: "#0F1830",
  indigo: "#2A2F6B",
  gold: "#FFC44D",
  teal: "#00C2C7",
  fogGrey: "#3B4260",
  white: "#FFFFFF",
  danger: "#FF6B6B",
  success: "#22C55E",
  textMuted: "rgba(255,255,255,.65)",
};

// One consistent move at every checkpoint (pick the right clue from a few
// choices) — see MissionMap_Digital_Design_v1.md §2-3. Only two real phases
// plus the entry screen: brief the mission, walk the path checkpoint by
// checkpoint, then unlock the final written response. The Evidence Log
// isn't its own phase — it's a persistent panel visible through "walk" and
// "finalUnlock", same spirit as Signal Check's always-reachable evidence.
const PHASES = ["brief", "walk", "finalUnlock"];
const PHASE_LABEL = { brief: "Mission Brief", walk: "Walk the Path", finalUnlock: "Final Unlock" };

const CONFIDENCE_LEVELS = [
  { id: "shaky", emoji: "😕", label: "Still shaky" },
  { id: "solid", emoji: "🙂", label: "Pretty solid" },
  { id: "strong", emoji: "😄", label: "Really strong" },
];

// Same product-wide rule as every other engine: at least 3 of 5 self-check
// questions must be checked before submit unlocks.
const REQUIRED_CHECKS = 3;

// The lock-in rule from the design doc (§3.4): a checkpoint missed twice
// gets a S.A.M. hint; missed a 3rd time, that pick locks in as the recorded
// answer for that checkpoint — but the mission keeps moving regardless, so
// one struggle never blocks the rest of the quest.
const HINT_AFTER_MISSES = 2;
const LOCK_IN_AFTER_MISSES = 3;

export default function MissionMapClient({
  assignmentId,
  caseStandard,
  publicCase,
  existingSubmission,
  alreadySubmitted,
  revisionRequested,
  revisionFeedback,
}) {
  const router = useRouter();
  const storageKey = `cc_missionmap_draft_${assignmentId}`;
  const checkpoints = publicCase.checkpoints;
  const totalCheckpoints = checkpoints.length;

  const draft = (() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      return {};
    }
  })();

  const [phase, setPhase] = useState(
    alreadySubmitted && !revisionRequested ? "finalUnlock" : draft.phase || "brief"
  );

  // checkpointState[id] = { attempts, resolved, correct, choiceId }
  const [checkpointState, setCheckpointState] = useState(draft.checkpointState || {});
  const [currentIndex, setCurrentIndex] = useState(draft.currentIndex || 0);
  const [evidenceLog, setEvidenceLog] = useState(draft.evidenceLog || []);
  const [wrongFlashChoiceId, setWrongFlashChoiceId] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const [hintTextByCheckpoint, setHintTextByCheckpoint] = useState({});
  const [hintCount, setHintCount] = useState(0);

  const [finalResponseText, setFinalResponseText] = useState(
    draft.finalResponseText || (existingSubmission && existingSubmission.mission_map_data && existingSubmission.mission_map_data.finalResponseText) || ""
  );
  const [checklist, setChecklist] = useState(
    draft.checklist || publicCase.selfCheckQuestions.map(() => false)
  );
  const [showChecklistError, setShowChecklistError] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [selfConfidence, setSelfConfidence] = useState(draft.self_confidence || null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(alreadySubmitted);

  // Autosave the in-progress mission to localStorage, same convention as
  // Signal Check — this is client-side draft resilience, separate from the
  // server-side saveProgress() calls at real phase transitions below.
  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ phase, checkpointState, currentIndex, evidenceLog, finalResponseText, checklist, self_confidence: selfConfidence })
      );
    } catch (err) {}
  }, [phase, checkpointState, currentIndex, evidenceLog, finalResponseText, checklist, selfConfidence]);

  function saveProgress(fields) {
    return fetch("/api/submission/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignmentId, ...fields }),
    }).then((res) => res.ok).catch(() => false);
  }

  function startWalking() {
    setPhase("walk");
    saveProgress({ phase: "walk" });
  }

  function requestHint(checkpointId) {
    const caseHints = getCaseHints(caseStandard);
    const hint = hintCount < caseHints.length
      ? caseHints[hintCount]
      : GENERIC_HINTS[(hintCount - caseHints.length) % GENERIC_HINTS.length];
    setHintTextByCheckpoint((prev) => ({ ...prev, [checkpointId]: hint }));
    setHintCount((c) => c + 1);
  }

  function pickChoice(checkpoint, choiceId) {
    const existing = checkpointState[checkpoint.id] || { attempts: 0, resolved: false };
    if (existing.resolved) return; // already cleared or locked in — ignore further taps

    const isCorrect = choiceId === checkpoint.correctChoiceId;
    const attempts = existing.attempts + 1;

    if (isCorrect) {
      resolveCheckpoint(checkpoint, choiceId, true, attempts);
      return;
    }

    // Wrong pick: bounce back, no penalty beyond the attempt count itself —
    // the character just doesn't move yet (design doc §3.3).
    setWrongFlashChoiceId(choiceId);
    setTimeout(() => setWrongFlashChoiceId(null), 500);

    if (attempts >= LOCK_IN_AFTER_MISSES) {
      // 3rd miss: this wrong pick locks in as the recorded answer, but the
      // mission keeps moving regardless (design doc §3.4).
      resolveCheckpoint(checkpoint, choiceId, false, attempts);
      return;
    }

    setCheckpointState((prev) => ({ ...prev, [checkpoint.id]: { attempts, resolved: false } }));

    if (attempts >= HINT_AFTER_MISSES) {
      requestHint(checkpoint.id);
    }
  }

  function resolveCheckpoint(checkpoint, choiceId, correct, attempts) {
    setCheckpointState((prev) => ({
      ...prev,
      [checkpoint.id]: { attempts, resolved: true, correct, choiceId },
    }));
    // Evidence Log gets the entry whether the checkpoint was cleared
    // correctly or locked in wrong — a locked-in miss is still a real
    // signal worth keeping visible, not erased from the mission record.
    setEvidenceLog((prev) => [
      ...prev,
      { checkpointId: checkpoint.id, text: checkpoint.evidenceLogEntry, correct },
    ]);

    const clearedSoFar = currentIndex + 1;
    if (clearedSoFar % 2 === 0 && clearedSoFar < totalCheckpoints) {
      // Mid-path celebration every couple of checkpoints, not just once at
      // the very end (design doc §5).
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1400);
    }

    if (clearedSoFar >= totalCheckpoints) {
      setTimeout(() => {
        setPhase("finalUnlock");
        saveProgress({ phase: "finalUnlock" });
      }, 500);
    } else {
      setTimeout(() => setCurrentIndex(clearedSoFar), 500);
    }
  }

  const checkedCount = checklist.filter(Boolean).length;
  const checklistPasses = checkedCount >= REQUIRED_CHECKS;

  function toggleChecklistItem(i) {
    setChecklist((prev) => {
      const next = prev.slice();
      next[i] = !next[i];
      return next;
    });
  }

  function pickConfidence(id) {
    setSelfConfidence(id);
    saveProgress({ self_confidence: id });
  }

  function handleRequestSubmit() {
    if (!finalResponseText.trim()) {
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!checklistPasses) { setShowChecklistError(true); return; }
    setShowChecklistError(false);
    setShowSubmitConfirm(true);
  }

  async function submitForGrading() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const checkpointResults = checkpoints.map((cp) => {
        const st = checkpointState[cp.id] || { attempts: 0, resolved: false };
        return {
          id: cp.id,
          finalChoiceId: st.choiceId || null,
          firstTryCorrect: !!st.correct && st.attempts === 1,
          attempts: st.attempts,
          lockedInWrong: st.resolved && !st.correct,
        };
      });

      const res = await fetch("/api/mission-map/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId,
          caseStandard,
          checkpointResults,
          finalResponseText,
          checklist,
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      try { localStorage.removeItem(storageKey); } catch (err) {}
      setSubmitted(true);
    } catch (err) {
      setSubmitError("Couldn't submit your mission just now — nothing has been lost. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function confirmSubmit() {
    setShowSubmitConfirm(false);
    submitForGrading();
  }

  // Fog reveal + static-clearing progress, both driven by the same fraction
  // of checkpoints cleared — two flavors of the same signal, per §5.
  const clearedCount = Object.values(checkpointState).filter((s) => s.resolved).length;
  const clearFraction = totalCheckpoints ? clearedCount / totalCheckpoints : 0;

  const backgroundStyle = {
    minHeight: "100vh",
    background: `linear-gradient(180deg, ${COLORS.navy} 0%, ${COLORS.indigo} 100%)`,
    fontFamily: "'Inter', sans-serif",
    color: COLORS.white,
  };

  function SamHint({ checkpointId }) {
    const text = hintTextByCheckpoint[checkpointId];
    if (!text) return null;
    return (
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "rgba(255,255,255,.08)", borderRadius: 12, padding: 12, marginTop: 12 }}>
        <img src="/icons/robot_point.png" alt="S.A.M." style={{ width: 32, height: 32, objectFit: "contain", flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.gold, marginBottom: 2 }}>S.A.M.</div>
          <div style={{ fontSize: 13.5, color: "rgba(255,255,255,.9)" }}>{text}</div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={backgroundStyle}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "60px 20px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Poppins', sans-serif" }}>Transmission received, Cadet.</h1>
          <p style={{ color: COLORS.textMuted }}>
            Your mission report is in. ECHO's read is just a first pass — your teacher is always the scorer of record.
          </p>
          {!selfConfidence && (
            <div style={{ marginTop: 24 }}>
              <div style={{ marginBottom: 10, fontSize: 13.5, color: COLORS.textMuted }}>How solid do you feel about this mission?</div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                {CONFIDENCE_LEVELS.map((c) => (
                  <button key={c.id} className="mm-btn" onClick={() => pickConfidence(c.id)}
                    style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 12, padding: "10px 16px", color: COLORS.white }}>
                    <div style={{ fontSize: 22 }}>{c.emoji}</div>
                    <div style={{ fontSize: 11 }}>{c.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          <button className="mm-btn" onClick={() => router.push("/home")}
            style={{ marginTop: 30, background: COLORS.gold, color: COLORS.navy, border: "none", borderRadius: 12, padding: "12px 24px", fontWeight: 700 }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={backgroundStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .mm-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .mm-btn:hover:not(:disabled) { transform: translateY(-1px); }
        .mm-choice { transition: all 150ms ease; }
        .mm-choice.wrong-flash { animation: mm-shake .5s; border-color: ${COLORS.danger} !important; }
        @keyframes mm-shake { 0%,100%{transform:translateX(0);} 25%{transform:translateX(-6px);} 75%{transform:translateX(6px);} }
      `}</style>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 20px 80px" }}>
        {revisionRequested && (
          <div style={{ background: "rgba(255,196,77,.15)", border: `1px solid ${COLORS.gold}`, borderRadius: 12, padding: 14, marginBottom: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Your teacher asked you to take another pass.</div>
            {revisionFeedback && <div style={{ fontSize: 13.5, color: "rgba(255,255,255,.85)" }}>{revisionFeedback}</div>}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 12, letterSpacing: 1, color: COLORS.teal, fontWeight: 700 }}>{PHASE_LABEL[phase]}</div>
          <div style={{ display: "flex", gap: 5 }}>
            {PHASES.map((p) => (
              <div key={p} style={{ width: 8, height: 8, borderRadius: 4, background: p === phase ? COLORS.gold : "rgba(255,255,255,.25)" }} />
            ))}
          </div>
        </div>

        {phase === "brief" && (
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 24 }}>{publicCase.title}</h1>
            <p style={{ color: "rgba(255,255,255,.9)", lineHeight: 1.6 }}>{publicCase.mission.briefText}</p>
            <div style={{ background: "rgba(255,255,255,.06)", borderRadius: 12, padding: 16, margin: "16px 0" }}>
              <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.gold, fontWeight: 700, marginBottom: 6 }}>MISSION GOAL</div>
              <div>{publicCase.mission.goal}</div>
            </div>
            {/* Fog-covered map preview — a locked node per checkpoint, all shrouded until Walk the Path begins. */}
            <div style={{ display: "flex", gap: 8, margin: "20px 0" }}>
              {checkpoints.map((cp, i) => (
                <div key={cp.id} style={{ flex: 1, height: 8, borderRadius: 4, background: COLORS.fogGrey }} />
              ))}
            </div>
            <button className="mm-btn" onClick={startWalking}
              style={{ background: COLORS.gold, color: COLORS.navy, borderRadius: 12, padding: "14px 24px", fontWeight: 700, fontSize: 15 }}>
              Begin Mission
            </button>
          </div>
        )}

        {phase === "walk" && (
          <div>
            {/* Fog reveal + static-clearing bar — one shared component, driven purely by clearFraction, reused identically across every case. */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {checkpoints.map((cp, i) => {
                const st = checkpointState[cp.id];
                const cleared = st && st.resolved;
                const active = i === currentIndex;
                return (
                  <div key={cp.id} style={{
                    flex: 1, height: 10, borderRadius: 5,
                    background: cleared ? (st.correct ? COLORS.success : COLORS.danger) : active ? COLORS.teal : COLORS.fogGrey,
                    opacity: cleared || active ? 1 : 0.5,
                  }} />
                );
              })}
            </div>

            {showCelebration && (
              <div style={{ textAlign: "center", padding: 10, color: COLORS.gold, fontWeight: 700 }}>✨ Signal clearing — nice work, Cadet ✨</div>
            )}

            {currentIndex < totalCheckpoints ? (
              (() => {
                const cp = checkpoints[currentIndex];
                const st = checkpointState[cp.id] || { attempts: 0, resolved: false };
                return (
                  <div key={cp.id}>
                    <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 6 }}>Checkpoint {currentIndex + 1} of {totalCheckpoints}</div>
                    <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 19 }}>{cp.prompt}</h2>
                    <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
                      {cp.choices.map((choice) => (
                        <button
                          key={choice.id}
                          disabled={st.resolved}
                          onClick={() => pickChoice(cp, choice.id)}
                          className={`mm-btn mm-choice${wrongFlashChoiceId === choice.id ? " wrong-flash" : ""}`}
                          style={{
                            textAlign: "left",
                            background: "rgba(255,255,255,.07)",
                            border: "1px solid rgba(255,255,255,.2)",
                            borderRadius: 12,
                            padding: "14px 16px",
                            color: COLORS.white,
                            fontSize: 14.5,
                          }}
                        >
                          {choice.text}
                        </button>
                      ))}
                    </div>
                    <SamHint checkpointId={cp.id} />
                  </div>
                );
              })()
            ) : null}

            {evidenceLog.length > 0 && (
              <div style={{ marginTop: 28, borderTop: "1px solid rgba(255,255,255,.15)", paddingTop: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.gold, fontWeight: 700, marginBottom: 8 }}>EVIDENCE LOG</div>
                <div style={{ display: "grid", gap: 6 }}>
                  {evidenceLog.map((e, i) => (
                    <div key={i} style={{ fontSize: 13, color: "rgba(255,255,255,.85)" }}>• {e.text}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {phase === "finalUnlock" && (
          <div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif" }}>Final Unlock</h2>
            <p style={{ color: "rgba(255,255,255,.9)" }}>{publicCase.finalResponsePrompt}</p>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.gold, fontWeight: 700, marginBottom: 8 }}>YOUR EVIDENCE LOG</div>
              <div style={{ display: "grid", gap: 6, background: "rgba(255,255,255,.06)", borderRadius: 12, padding: 12 }}>
                {evidenceLog.map((e, i) => (
                  <div key={i} style={{ fontSize: 13, color: "rgba(255,255,255,.85)" }}>• {e.text}</div>
                ))}
              </div>
            </div>

            <textarea
              value={finalResponseText}
              onChange={(e) => setFinalResponseText(e.target.value)}
              placeholder="Write your answer using what you collected..."
              rows={7}
              disabled={submitted}
              style={{ width: "100%", borderRadius: 12, padding: 14, fontSize: 14.5, border: "1px solid rgba(255,255,255,.25)", background: "rgba(255,255,255,.06)", color: COLORS.white, fontFamily: "inherit", resize: "vertical" }}
            />

            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginBottom: 10 }}>
                Check off the ones that are true — you need at least {REQUIRED_CHECKS} of {publicCase.selfCheckQuestions.length} ({checkedCount}/{publicCase.selfCheckQuestions.length} so far).
              </div>
              {publicCase.selfCheckQuestions.map((q, i) => (
                <label key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8, fontSize: 13.5, cursor: "pointer" }}>
                  <input type="checkbox" checked={checklist[i]} onChange={() => toggleChecklistItem(i)} style={{ marginTop: 3 }} />
                  <span>{q}</span>
                </label>
              ))}
              {showChecklistError && (
                <div style={{ color: COLORS.danger, fontSize: 12, fontWeight: 600, marginTop: 6 }}>Check at least {REQUIRED_CHECKS} before submitting.</div>
              )}
            </div>

            <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginTop: 16, fontStyle: "italic" }}>
              ECHO's read is just a first pass — your teacher is always the scorer of record.
            </div>

            {submitError && <div style={{ color: COLORS.danger, marginTop: 10 }}>{submitError}</div>}

            <button className="mm-btn" onClick={handleRequestSubmit} disabled={submitting}
              style={{ marginTop: 18, background: COLORS.gold, color: COLORS.navy, borderRadius: 12, padding: "14px 24px", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
              {submitting ? <Loader2 className="animate-spin" size={16} /> : null}
              Submit Mission
            </button>
          </div>
        )}
      </div>

      {showSubmitConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(8,10,20,.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
          <div style={{ background: COLORS.indigo, borderRadius: 16, padding: 24, maxWidth: 360, textAlign: "center" }}>
            <h3 style={{ marginTop: 0 }}>Submit this mission?</h3>
            <p style={{ color: "rgba(255,255,255,.8)", fontSize: 13.5 }}>You can't change your answer after this.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16 }}>
              <button className="mm-btn" onClick={() => setShowSubmitConfirm(false)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,.3)", color: COLORS.white, borderRadius: 10, padding: "10px 18px" }}>Not yet</button>
              <button className="mm-btn" onClick={confirmSubmit} style={{ background: COLORS.gold, color: COLORS.navy, borderRadius: 10, padding: "10px 18px", fontWeight: 700 }}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
