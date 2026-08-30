"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { GENERIC_HINTS, getCaseHints } from "../../../lib/hints";

// Mission Map's own locked palette — light sky-blue with a signal-gold
// accent for cleared ground (revised Aug 30 v3: replaced an initial dark
// "deep space" navy/indigo backdrop per Emily's direct ask after live-
// testing), distinct from Signal Check (navy/teal/violet/gold) and Group
// Chat (violet-led) so it still reads as its own activity even though it
// shares the app shell. The map itself keeps a darker, fog-of-war feel
// (see the SVG mask below) — only the surrounding page chrome went light.
const COLORS = {
  navy: "#0F1830",
  indigo: "#2A2F6B",
  // Light sky-blue surface colors (Emily's ask, Aug 30 — replaced the dark
  // navy/indigo "deep space" backdrop). navy/indigo stay defined above only
  // because they're still used as dark text-on-gold-button / marker-number
  // colors, which read fine in a light theme too.
  skyTop: "#EAF4FF",
  skyBottom: "#BEE0FF",
  gold: "#FFC44D",
  teal: "#00C2C7",
  fogGrey: "#3B4260",
  white: "#1F2A44",
  danger: "#E5484D",
  success: "#1FA35C",
  textMuted: "rgba(31,42,68,.62)",
};

// One consistent move at every checkpoint (pick the right clue from a few
// choices) — see MissionMap_Digital_Design_v1.md §2-3. Only two real phases
// plus the entry screen: brief the mission, walk the path checkpoint by
// checkpoint, then unlock the final written response.
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

// Reveal radii for the fog-of-war mask, in the SVG's own 0-100 coordinate
// space (see the <svg viewBox="0 0 100 100"> below) — a cleared checkpoint
// burns off a wider patch of fog than the "next stop" peek at the current,
// unresolved checkpoint, so the path ahead is hinted at, not fully spoiled.
const CLEARED_REVEAL_RADIUS = 15;
const CURRENT_PEEK_RADIUS = 9;

function EvidenceBlock({ evidence }) {
  if (!evidence) return null;
  const icon = evidence.type === "data" ? "📊" : "📖";
  const label = evidence.type === "data" ? "FIELD DATA" : "FIELD NOTES";
  return (
    <div style={{ background: "rgba(31,42,68,.05)", border: "1px solid rgba(31,42,68,.14)", borderRadius: 12, padding: 14, marginBottom: 14 }}>
      <div style={{ fontSize: 10.5, letterSpacing: 1, color: COLORS.gold, fontWeight: 700, marginBottom: 6 }}>{icon} {label}</div>
      <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "rgba(31,42,68,.88)" }}>{evidence.text}</div>
    </div>
  );
}

export default function MissionMapClient({
  assignmentId,
  studentId,
  caseStandard,
  publicCase,
  existingSubmission,
  alreadySubmitted,
  revisionRequested,
  revisionFeedback,
}) {
  const router = useRouter();
  // Scoped by studentId as well as assignmentId (fixed Aug 30, caught by a
  // real live-test bug report): a shared class-wide assignment has ONE
  // assignmentId for every student, but localStorage is shared per browser,
  // not per logged-in student. Without studentId in the key, switching
  // student accounts in the same browser without a hard refresh could show
  // the wrong student's saved-but-never-submitted draft phase (e.g. landing
  // straight on Final Unlock for a student who never got there). The real
  // submitted/graded state was always safe — it's read from the database,
  // scoped by student_id there too — only this transient local draft wasn't.
  const storageKey = `cc_missionmap_draft_${assignmentId}_${studentId || "anon"}`;
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
  const [mapImageFailed, setMapImageFailed] = useState(false);
  // Click-to-open: the current checkpoint's question doesn't show until the
  // student taps its marker on the map (Emily's explicit ask, Aug 30 v3) —
  // closes automatically whenever the mission advances to a new checkpoint.
  const [checkpointOpen, setCheckpointOpen] = useState(false);

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

  // Every time the mission moves to a new checkpoint, close the panel again
  // so the student is back looking at the map and has to tap the next stop.
  useEffect(() => {
    setCheckpointOpen(false);
  }, [currentIndex]);

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
      }, 700);
    } else {
      // The delay lets the character token's CSS transition actually play
      // out to the next checkpoint's map position before its card appears.
      setTimeout(() => setCurrentIndex(clearedSoFar), 700);
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

  const backgroundStyle = {
    minHeight: "100vh",
    background: `linear-gradient(180deg, ${COLORS.skyTop} 0%, ${COLORS.skyBottom} 100%)`,
    fontFamily: "'Inter', sans-serif",
    color: COLORS.white,
  };

  function SamHint({ checkpointId }) {
    const text = hintTextByCheckpoint[checkpointId];
    if (!text) return null;
    return (
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "rgba(31,42,68,.05)", border: "1px solid rgba(31,42,68,.1)", borderRadius: 12, padding: 12, marginTop: 12 }}>
        <img src="/icons/robot_point.png" alt="S.A.M." style={{ width: 32, height: 32, objectFit: "contain", flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.gold, marginBottom: 2 }}>S.A.M.</div>
          <div style={{ fontSize: 13.5, color: "rgba(31,42,68,.85)" }}>{text}</div>
        </div>
      </div>
    );
  }

  // --- The map itself -------------------------------------------------
  // A background image (Emily supplies one per case at publicCase.mapImage)
  // with checkpoint markers and a character token positioned by percentage
  // coordinates, a dashed path line connecting the gates in order, and a
  // fog-of-war layer with circular cutouts that "burn off" as checkpoints
  // clear. If the image isn't there yet, a themed placeholder gradient
  // stands in so nothing looks broken — same graceful-degradation approach
  // already used for missing case thumbnails elsewhere in the app.
  function MissionMap({ interactive } = {}) {
    const clearedIds = Object.keys(checkpointState).filter((id) => checkpointState[id].resolved);
    const revealCircles = [
      ...checkpoints
        .filter((cp) => clearedIds.includes(cp.id))
        .map((cp) => ({ x: cp.position.x, y: cp.position.y, r: CLEARED_REVEAL_RADIUS })),
    ];
    if (currentIndex < totalCheckpoints) {
      const cur = checkpoints[currentIndex];
      if (!clearedIds.includes(cur.id)) {
        revealCircles.push({ x: cur.position.x, y: cur.position.y, r: CURRENT_PEEK_RADIUS });
      }
    }
    const pathPoints = checkpoints.map((cp) => `${cp.position.x},${cp.position.y}`).join(" ");
    const tokenCp = checkpoints[Math.min(currentIndex, totalCheckpoints - 1)];

    return (
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: 16, overflow: "hidden", background: `linear-gradient(135deg, ${COLORS.skyBottom}, ${COLORS.skyTop})`, marginBottom: 18, boxShadow: "0 8px 20px rgba(31,42,68,.18)" }}>
        {!mapImageFailed && (
          <img
            src={publicCase.mapImage}
            alt=""
            onError={() => setMapImageFailed(true)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        {mapImageFailed && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 11, color: "rgba(31,42,68,.45)", letterSpacing: 1 }}>MAP ART PENDING</div>
          </div>
        )}

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <defs>
            <mask id="mm-fog-mask">
              <rect x="0" y="0" width="100" height="100" fill="white" />
              {revealCircles.map((c, i) => (
                <circle key={i} cx={c.x} cy={c.y} r={c.r} fill="black" />
              ))}
            </mask>
          </defs>
          <polyline points={pathPoints} fill="none" stroke="rgba(255,196,77,.65)" strokeWidth="0.8" strokeDasharray="2,2" />
          <rect x="0" y="0" width="100" height="100" fill="rgba(8,10,24,.72)" mask="url(#mm-fog-mask)" />
        </svg>

        {checkpoints.map((cp, i) => {
          const st = checkpointState[cp.id];
          const cleared = st && st.resolved;
          const isCurrent = i === currentIndex;
          const clickable = interactive && isCurrent && !cleared && !checkpointOpen;
          const bg = cleared ? (st.correct ? COLORS.success : COLORS.danger) : isCurrent ? COLORS.gold : COLORS.fogGrey;
          return (
            <div
              key={cp.id}
              title={clickable ? `Tap to investigate Checkpoint ${i + 1}` : `Checkpoint ${i + 1}`}
              onClick={clickable ? () => setCheckpointOpen(true) : undefined}
              className={clickable ? "mm-marker-pulse" : undefined}
              style={{
                position: "absolute",
                left: `${cp.position.x}%`,
                top: `${cp.position.y}%`,
                transform: "translate(-50%, -50%)",
                width: isCurrent ? 26 : 18,
                height: isCurrent ? 26 : 18,
                borderRadius: "50%",
                background: bg,
                border: "2px solid rgba(255,255,255,.85)",
                boxShadow: isCurrent ? `0 0 0 6px ${COLORS.gold}33` : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
                color: COLORS.navy,
                zIndex: 2,
                cursor: clickable ? "pointer" : "default",
              }}
            >
              {cleared ? (st.correct ? "✓" : "✕") : i + 1}
            </div>
          );
        })}

        {/* Character token — a cheap emoji placeholder standing in for real
            character art, positioned at the current checkpoint and animated
            there via a CSS transition whenever currentIndex advances. */}
        <div
          style={{
            position: "absolute",
            left: `${tokenCp.position.x}%`,
            top: `${tokenCp.position.y}%`,
            transform: "translate(-50%, -140%)",
            transition: "left 700ms ease, top 700ms ease",
            fontSize: 26,
            zIndex: 3,
            filter: "drop-shadow(0 3px 6px rgba(0,0,0,.5))",
          }}
        >
          🧑‍🚀
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
                    style={{ background: "rgba(31,42,68,.05)", border: "1px solid rgba(31,42,68,.18)", borderRadius: 12, padding: "10px 16px", color: COLORS.white }}>
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
        .mm-marker-pulse { animation: mm-marker-pulse 1.6s ease-in-out infinite; }
        @keyframes mm-marker-pulse { 0%,100%{box-shadow:0 0 0 6px ${COLORS.gold}33;} 50%{box-shadow:0 0 0 12px ${COLORS.gold}00;} }
      `}</style>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 20px 80px" }}>
        {revisionRequested && (
          <div style={{ background: "rgba(255,196,77,.15)", border: `1px solid ${COLORS.gold}`, borderRadius: 12, padding: 14, marginBottom: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Your teacher asked you to take another pass.</div>
            {revisionFeedback && <div style={{ fontSize: 13.5, color: "rgba(31,42,68,.8)" }}>{revisionFeedback}</div>}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 12, letterSpacing: 1, color: COLORS.teal, fontWeight: 700 }}>{PHASE_LABEL[phase]}</div>
          <div style={{ display: "flex", gap: 5 }}>
            {PHASES.map((p) => (
              <div key={p} style={{ width: 8, height: 8, borderRadius: 4, background: p === phase ? COLORS.gold : "rgba(31,42,68,.18)" }} />
            ))}
          </div>
        </div>

        {phase === "brief" && (
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 24 }}>{publicCase.title}</h1>
            <p style={{ color: "rgba(31,42,68,.85)", lineHeight: 1.6 }}>{publicCase.mission.briefText}</p>
            <div style={{ background: "rgba(31,42,68,.05)", border: "1px solid rgba(31,42,68,.1)", borderRadius: 12, padding: 16, margin: "16px 0" }}>
              <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.gold, fontWeight: 700, marginBottom: 6 }}>MISSION GOAL</div>
              <div>{publicCase.mission.goal}</div>
            </div>
            <MissionMap />
            <button className="mm-btn" onClick={startWalking}
              style={{ background: COLORS.gold, color: COLORS.navy, borderRadius: 12, padding: "14px 24px", fontWeight: 700, fontSize: 15 }}>
              Begin Mission
            </button>
          </div>
        )}

        {phase === "walk" && (
          <div>
            <MissionMap interactive />

            {showCelebration && (
              <div style={{ textAlign: "center", padding: 10, color: COLORS.gold, fontWeight: 700 }}>✨ Signal clearing — nice work, Cadet ✨</div>
            )}

            {currentIndex < totalCheckpoints && !checkpointOpen && (
              <div style={{ textAlign: "center", padding: "10px 0 4px", color: COLORS.textMuted, fontSize: 13 }}>
                📍 Tap the glowing marker on the map to check out Checkpoint {currentIndex + 1}
              </div>
            )}

            {currentIndex < totalCheckpoints && checkpointOpen ? (
              (() => {
                const cp = checkpoints[currentIndex];
                const st = checkpointState[cp.id] || { attempts: 0, resolved: false };
                return (
                  <div key={cp.id} style={{ background: "#FFFFFF", border: "1px solid rgba(31,42,68,.12)", boxShadow: "0 4px 16px rgba(31,42,68,.08)", borderRadius: 16, padding: 18, marginTop: 4 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div style={{ fontSize: 12, color: COLORS.textMuted }}>Checkpoint {currentIndex + 1} of {totalCheckpoints}</div>
                      {!st.resolved && (
                        <button
                          className="mm-btn"
                          onClick={() => setCheckpointOpen(false)}
                          style={{ background: "transparent", color: COLORS.textMuted, fontSize: 12, padding: 0 }}
                        >
                          ← Back to map
                        </button>
                      )}
                    </div>
                    <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 19, marginTop: 0 }}>{cp.prompt}</h2>
                    <EvidenceBlock evidence={cp.evidence} />
                    <div style={{ display: "grid", gap: 10, marginTop: 4 }}>
                      {cp.choices.map((choice) => (
                        <button
                          key={choice.id}
                          disabled={st.resolved}
                          onClick={() => pickChoice(cp, choice.id)}
                          className={`mm-btn mm-choice${wrongFlashChoiceId === choice.id ? " wrong-flash" : ""}`}
                          style={{
                            textAlign: "left",
                            background: "rgba(31,42,68,.04)",
                            border: "1px solid rgba(31,42,68,.16)",
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
              <div style={{ marginTop: 28, borderTop: "1px solid rgba(31,42,68,.14)", paddingTop: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.gold, fontWeight: 700, marginBottom: 8 }}>EVIDENCE LOG</div>
                <div style={{ display: "grid", gap: 6 }}>
                  {evidenceLog.map((e, i) => (
                    <div key={i} style={{ fontSize: 13, color: "rgba(31,42,68,.8)" }}>• {e.text}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {phase === "finalUnlock" && (
          <div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif" }}>Final Unlock</h2>
            <p style={{ color: "rgba(31,42,68,.85)" }}>{publicCase.finalResponsePrompt}</p>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, letterSpacing: 1, color: COLORS.gold, fontWeight: 700, marginBottom: 8 }}>YOUR EVIDENCE LOG</div>
              <div style={{ display: "grid", gap: 6, background: "rgba(31,42,68,.04)", border: "1px solid rgba(31,42,68,.1)", borderRadius: 12, padding: 12 }}>
                {evidenceLog.map((e, i) => (
                  <div key={i} style={{ fontSize: 13, color: "rgba(31,42,68,.8)" }}>• {e.text}</div>
                ))}
              </div>
            </div>

            <textarea
              value={finalResponseText}
              onChange={(e) => setFinalResponseText(e.target.value)}
              placeholder="Write your answer using what you collected..."
              rows={9}
              disabled={submitted}
              style={{ width: "100%", borderRadius: 12, padding: 14, fontSize: 14.5, border: "1px solid rgba(31,42,68,.2)", background: "#FFFFFF", color: COLORS.white, fontFamily: "inherit", resize: "vertical" }}
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
          <div style={{ background: "#FFFFFF", border: "1px solid rgba(31,42,68,.12)", boxShadow: "0 12px 30px rgba(31,42,68,.2)", borderRadius: 16, padding: 24, maxWidth: 360, textAlign: "center" }}>
            <h3 style={{ marginTop: 0 }}>Submit this mission?</h3>
            <p style={{ color: "rgba(31,42,68,.75)", fontSize: 13.5 }}>You can't change your answer after this.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16 }}>
              <button className="mm-btn" onClick={() => setShowSubmitConfirm(false)} style={{ background: "transparent", border: "1px solid rgba(31,42,68,.25)", color: COLORS.white, borderRadius: 10, padding: "10px 18px" }}>Not yet</button>
              <button className="mm-btn" onClick={confirmSubmit} style={{ background: COLORS.gold, color: COLORS.navy, borderRadius: 10, padding: "10px 18px", fontWeight: 700 }}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
