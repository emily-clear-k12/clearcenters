"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import SamIcon from "../../../components/SamIcon";
import SamStage from "../../../components/SamStage";
import DistressCallBadge from "../../../components/DistressCallBadge";

// Soft Crystal Sci-Fi palette — ClearCenters_Space_Theme_Master_Design_System.md.
// Bright orbital learning HQ: lavender canvas, white cards, violet/teal accents.
// Deliberately NOT the dark cyberpunk look.
const COLORS = {
  canvas: "#F2F0FA",
  white: "#FFFFFF",
  softLavender: "#EDE6FF",
  softTeal: "#E6F8F9",
  hqNavy: "#0D1B2A",
  deepNavy: "#162845",
  violet: "#7B5DFF",
  teal: "#00C2C7",
  aqua: "#4DD6FF",
  gold: "#FFC44D",
  textDark: "#1F2A44",
  textMuted: "#697386",
  border: "#E1E2EE",
  success: "#00C2C7",
  danger: "#E25555",
};

const PHASES = ["rule", "stream", "transfer", "wrapup"];
const PHASE_LABEL = {
  rule: "The Rule",
  stream: "The Stream",
  transfer: "Mystery Sample",
  wrapup: "Wrap-up",
};

const REQUIRED_CHECKS = 3;
const TIMED_SECONDS = 12;

const CONFIDENCE_LEVELS = [
  { id: "shaky", emoji: "😕", label: "Still shaky" },
  { id: "solid", emoji: "🙂", label: "Pretty solid" },
  { id: "strong", emoji: "😄", label: "Really strong" },
];

const SAM_REACTIONS = {
  arrival: [
    "Ready to sort, Cadet? Read the rule first — then the belt starts.",
    "Bins are standing by. Let's lock in the sorting rule.",
  ],
  correct: [
    "Nice sort — that matches the rule.",
    "Locked. Keep that streak going!",
    "Clean call, Cadet.",
  ],
  incorrect: [
    "Not that bin — check the rule and keep going.",
    "Close. Look at shape, pour, or fill again.",
    "Missed that one — streak resets, but you're still in it.",
  ],
  flag: [
    "Flag item! Sort it, then tell Mission Control why.",
    "This one's tricky on purpose — write a short justification.",
  ],
  transfer: [
    "Mystery Sample inbound — run the checks, then pick a bin.",
    "Quick tests first. Then choose Solid, Liquid, or Gas.",
  ],
  wrapup: [
    "Wrap-up time — check your work and send the report.",
    "Almost done, Cadet. Self-check, then submit.",
  ],
};

function pickSamLine(category) {
  const list = SAM_REACTIONS[category] || SAM_REACTIONS.arrival;
  return list[Math.floor(Math.random() * list.length)];
}

function ItemCard({ item }) {
  return (
    <div
      style={{
        background: COLORS.softLavender,
        border: `1.5px solid ${COLORS.border}`,
        borderRadius: 16,
        padding: "28px 20px",
        textAlign: "center",
        minHeight: 140,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      {item.mediaType === "image" ? (
        <>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: `linear-gradient(145deg, ${COLORS.aqua}55, ${COLORS.violet}44)`,
              border: `1px solid ${COLORS.violet}33`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
            aria-hidden
          >
            🔬
          </div>
          <div style={{ fontWeight: 700, fontSize: 17, color: COLORS.textDark }}>{item.display}</div>
          <div style={{ fontSize: 11, color: COLORS.textMuted }}>(image placeholder)</div>
        </>
      ) : (
        <div style={{ fontWeight: 700, fontSize: 17, color: COLORS.textDark, lineHeight: 1.4 }}>
          {item.display}
        </div>
      )}
    </div>
  );
}

function StreakMeter({ streak, best }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: COLORS.softTeal,
        border: `1px solid ${COLORS.teal}44`,
        borderRadius: 999,
        padding: "6px 14px",
        fontSize: 12.5,
        fontWeight: 700,
        color: COLORS.deepNavy,
      }}
    >
      <span style={{ color: COLORS.gold }}>✦</span>
      Streak {streak}
      <span style={{ color: COLORS.textMuted, fontWeight: 600 }}>· best {best}</span>
    </div>
  );
}

export default function ClassificationLabClient({
  assignmentId,
  studentId,
  caseStandard,
  publicCase,
  existingSubmission,
  alreadySubmitted,
  revisionRequested,
  revisionFeedback,
  samSkin,
  samNickname,
  pacingMode: pacingModeProp,
}) {
  const router = useRouter();
  const samLabel = samNickname || "S.A.M.";
  const pacingMode = pacingModeProp === "timed" ? "timed" : "steady";
  const storageKey = `cc_classlab_draft_${assignmentId}_${studentId || "anon"}`;

  const draft = (() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      return {};
    }
  })();

  const itemsById = {};
  (publicCase.items || []).forEach((it) => {
    itemsById[it.id] = it;
  });

  const [phase, setPhase] = useState(
    alreadySubmitted && !revisionRequested ? "wrapup" : draft.phase || "rule"
  );
  const [waveIndex, setWaveIndex] = useState(draft.waveIndex || 0);
  const [itemIndex, setItemIndex] = useState(draft.itemIndex || 0);
  const [sortLog, setSortLog] = useState(draft.sortLog || []);
  const [streak, setStreak] = useState(draft.streak || 0);
  const [bestStreak, setBestStreak] = useState(draft.bestStreak || 0);
  const [feedback, setFeedback] = useState(null); // { correct, message }
  const [awaitingFlagWrite, setAwaitingFlagWrite] = useState(draft.awaitingFlagWrite || false);
  const [flagText, setFlagText] = useState(draft.flagText || "");
  const [pendingFlagBin, setPendingFlagBin] = useState(draft.pendingFlagBin || null);

  const [transferChecks, setTransferChecks] = useState(draft.transferChecks || {});
  const [transferBin, setTransferBin] = useState(draft.transferBin || null);
  const [transferDone, setTransferDone] = useState(draft.transferDone || false);

  const [checklist, setChecklist] = useState(
    draft.checklist || new Array((publicCase.selfCheckQuestions || []).length).fill(false)
  );
  const [showChecklistError, setShowChecklistError] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(!!alreadySubmitted);
  const [cleanRun, setCleanRun] = useState(false);
  const [selfConfidence, setSelfConfidence] = useState(draft.self_confidence || null);

  const [samLine, setSamLine] = useState(null);
  const samTimerRef = useRef(null);
  const [timerLeft, setTimerLeft] = useState(null);
  const timerRef = useRef(null);

  const waveIds = (publicCase.waves && publicCase.waves[waveIndex]) || [];
  const currentItemId = waveIds[itemIndex];
  const currentItem = currentItemId ? itemsById[currentItemId] : null;

  function showSam(category) {
    if (samTimerRef.current) clearTimeout(samTimerRef.current);
    setSamLine(pickSamLine(category));
  }

  useEffect(() => {
    if (!samLine) showSam("arrival");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          phase,
          waveIndex,
          itemIndex,
          sortLog,
          streak,
          bestStreak,
          awaitingFlagWrite,
          flagText,
          pendingFlagBin,
          transferChecks,
          transferBin,
          transferDone,
          checklist,
          self_confidence: selfConfidence,
        })
      );
    } catch (err) {}
  }, [
    phase,
    waveIndex,
    itemIndex,
    sortLog,
    streak,
    bestStreak,
    awaitingFlagWrite,
    flagText,
    pendingFlagBin,
    transferChecks,
    transferBin,
    transferDone,
    checklist,
    selfConfidence,
    storageKey,
  ]);

  const timeoutHandlerRef = useRef(null);

  function recordSort({ itemId, submittedBinId, timedOut, correct }) {
    setSortLog((prev) => {
      const without = prev.filter((s) => s.itemId !== itemId);
      return [...without, { itemId, submittedBinId, timedOut: !!timedOut, correct: !!correct }];
    });
    if (correct) {
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      setStreak(0);
    }
  }

  function advanceAfterItem() {
    setFeedback(null);
    const waves = publicCase.waves || [];
    const ids = waves[waveIndex] || [];
    if (itemIndex + 1 < ids.length) {
      setItemIndex(itemIndex + 1);
      return;
    }
    if (waveIndex + 1 < waves.length) {
      setWaveIndex(waveIndex + 1);
      setItemIndex(0);
      return;
    }
    setPhase("transfer");
    showSam("transfer");
  }

  function handleBinPick(binId) {
    if (!currentItem || feedback || awaitingFlagWrite) return;
    const correct = binId === currentItem.correctBinId;
    recordSort({
      itemId: currentItem.id,
      submittedBinId: binId,
      timedOut: false,
      correct,
    });
    showSam(correct ? "correct" : "incorrect");

    if (currentItem.isTricky) {
      setPendingFlagBin(binId);
      setAwaitingFlagWrite(true);
      setFeedback({
        correct,
        message: correct
          ? "Flag locked — now write why it belongs there."
          : `Flag miss — correct bin was ${labelForBin(currentItem.correctBinId)}. Still write your why.`,
      });
      showSam("flag");
      return;
    }

    setFeedback({
      correct,
      message: correct ? "Correct!" : `Not quite — that one is a ${labelForBin(currentItem.correctBinId)}.`,
    });
    setTimeout(() => advanceAfterItem(), 900);
  }

  function handleTimeout() {
    if (!currentItem || feedback || awaitingFlagWrite) return;
    recordSort({
      itemId: currentItem.id,
      submittedBinId: null,
      timedOut: true,
      correct: false,
    });
    showSam("incorrect");
    if (currentItem.isTricky) {
      setPendingFlagBin(null);
      setAwaitingFlagWrite(true);
      setFeedback({
        correct: false,
        message: "Time's up on the Flag — write your best justification anyway.",
      });
      showSam("flag");
      return;
    }
    setFeedback({ correct: false, message: "Time's up — moving on." });
    setTimeout(() => advanceAfterItem(), 900);
  }

  useEffect(() => {
    timeoutHandlerRef.current = handleTimeout;
  });

  // Timed Belt — per-item countdown while on stream (not during Flag write / feedback).
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (phase !== "stream" || pacingMode !== "timed" || !currentItem || feedback || awaitingFlagWrite || submitted) {
      setTimerLeft(null);
      return undefined;
    }
    setTimerLeft(TIMED_SECONDS);
    timerRef.current = setInterval(() => {
      setTimerLeft((prev) => {
        if (prev === null) return prev;
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setTimeout(() => {
            if (timeoutHandlerRef.current) timeoutHandlerRef.current();
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, waveIndex, itemIndex, pacingMode, feedback, awaitingFlagWrite, currentItemId]);

  function labelForBin(id) {
    const b = (publicCase.bins || []).find((x) => x.id === id);
    return b ? b.label : id;
  }

  function confirmFlagWrite() {
    if (!flagText.trim()) return;
    setAwaitingFlagWrite(false);
    setFeedback(null);
    advanceAfterItem();
  }

  function allTransferChecksAnswered() {
    const checks = (publicCase.transfer && publicCase.transfer.checks) || [];
    return checks.every((c) => transferChecks[c.id] === "yes" || transferChecks[c.id] === "no");
  }

  function finishTransfer() {
    if (!transferBin || !allTransferChecksAnswered()) return;
    setTransferDone(true);
    setPhase("wrapup");
    showSam("wrapup");
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

  function handleRequestSubmit() {
    if (!flagText.trim()) {
      setSubmitError("Add your Flag justification before submitting.");
      return;
    }
    if (!checklistPasses) {
      setShowChecklistError(true);
      return;
    }
    setShowChecklistError(false);
    setSubmitError(null);
    setShowSubmitConfirm(true);
  }

  async function submitForGrading() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/classification-lab/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId,
          caseStandard,
          sortResults: sortLog,
          flagJustificationText: flagText,
          transferSubmission: {
            type: "mystery_sample",
            submittedBinId: transferBin,
            checks: transferChecks,
          },
          checklist,
          streakBest: bestStreak,
          pacingMode,
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      const data = await res.json().catch(() => ({}));
      setCleanRun(!!data.cleanRun);
      try {
        localStorage.removeItem(storageKey);
      } catch (err) {}
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        "Couldn't submit your mission just now — nothing has been lost. Check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function pickConfidence(id) {
    setSelfConfidence(id);
  }

  const backgroundStyle = {
    minHeight: "100vh",
    background: `linear-gradient(180deg, ${COLORS.canvas} 0%, #E8EEF8 100%)`,
    color: COLORS.textDark,
    fontFamily: "'Inter', sans-serif",
    position: "relative",
  };

  const cardStyle = {
    position: "relative",
    zIndex: 2,
    maxWidth: 720,
    margin: "40px auto",
    padding: "28px 24px 40px",
    background: COLORS.white,
    borderRadius: 20,
    boxShadow: "0 16px 40px rgba(13,27,42,.08)",
    border: `1px solid ${COLORS.border}`,
  };

  if (submitted) {
    return (
      <div style={backgroundStyle}>
        <div style={{ ...cardStyle, textAlign: "center", padding: "60px 20px" }}>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", color: COLORS.hqNavy }}>
            Transmission received, Cadet.
          </h1>
          {cleanRun && (
            <div
              style={{
                display: "inline-block",
                background: "rgba(255,196,77,.2)",
                border: `1px solid ${COLORS.gold}`,
                borderRadius: 999,
                padding: "8px 18px",
                fontWeight: 700,
                color: COLORS.deepNavy,
                marginBottom: 14,
              }}
            >
              ✦ Clean run — every sort and the Mystery Sample bin correct!
            </div>
          )}
          <p style={{ color: COLORS.textMuted }}>
            Your Classification Lab report is in. ECHO&apos;s read is just a first pass — your teacher is
            always the scorer of record.
          </p>
          {!selfConfidence ? (
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 12.5, color: COLORS.textMuted, marginBottom: 10 }}>
                How solid do you feel about this one?
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                {CONFIDENCE_LEVELS.map((c) => (
                  <button
                    key={c.id}
                    className="cl-btn"
                    onClick={() => pickConfidence(c.id)}
                    style={{
                      background: COLORS.softLavender,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 12,
                      padding: "12px 16px",
                      color: COLORS.textDark,
                      fontSize: 13,
                    }}
                  >
                    <div style={{ fontSize: 22 }}>{c.emoji}</div>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ marginTop: 20, fontSize: 13, color: COLORS.textMuted }}>Thanks, Cadet.</div>
          )}
          <button
            className="cl-btn"
            onClick={() => router.push("/home")}
            style={{
              marginTop: 28,
              background: COLORS.violet,
              color: COLORS.white,
              borderRadius: 12,
              padding: "12px 24px",
              fontWeight: 700,
            }}
          >
            ← Back to Home
          </button>
        </div>
        <SamStage
          skinKey={samSkin}
          alt={samLabel}
          size={150}
          style={{ position: "fixed", right: 12, bottom: 12, zIndex: 4 }}
        />
      </div>
    );
  }

  const sortCorrectCount = sortLog.filter((s) => s.correct).length;

  return (
    <div style={backgroundStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .cl-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .cl-btn:hover:not(:disabled) { transform: translateY(-1px); }
        .cl-btn:disabled { cursor: default; opacity: 0.55; }
      `}</style>

      <DistressCallBadge assignmentId={assignmentId} />

      <div style={cardStyle}>
        {revisionRequested && (
          <div
            style={{
              background: "rgba(255,196,77,.18)",
              border: `1px solid ${COLORS.gold}`,
              borderRadius: 12,
              padding: 14,
              marginBottom: 20,
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Your teacher asked you to take another pass.</div>
            {revisionFeedback && (
              <div style={{ fontSize: 13.5, color: COLORS.textMuted }}>{revisionFeedback}</div>
            )}
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              type="button"
              className="cl-btn"
              onClick={() => router.push("/home")}
              style={{ background: "none", color: COLORS.violet, padding: 0, fontWeight: 700, fontSize: 13 }}
            >
              ← Home
            </button>
            <div>
              <div
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: COLORS.hqNavy,
                }}
              >
                {publicCase.title}
              </div>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>
                Classification Lab · {pacingMode === "timed" ? "Timed Belt" : "Steady"}
              </div>
            </div>
          </div>
          <StreakMeter streak={streak} best={bestStreak} />
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
          {PHASES.map((p) => {
            const active = phase === p;
            const done =
              (p === "rule" && phase !== "rule") ||
              (p === "stream" && (phase === "transfer" || phase === "wrapup")) ||
              (p === "transfer" && phase === "wrapup");
            return (
              <div
                key={p}
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  padding: "6px 12px",
                  borderRadius: 999,
                  background: active ? COLORS.violet : done ? COLORS.softTeal : COLORS.canvas,
                  color: active ? COLORS.white : COLORS.textDark,
                  border: `1px solid ${active ? COLORS.violet : COLORS.border}`,
                }}
              >
                {PHASE_LABEL[p]}
              </div>
            );
          })}
        </div>

        {samLine && (
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
              background: COLORS.softLavender,
              borderRadius: 14,
              padding: "12px 14px",
              marginBottom: 20,
              border: `1px solid ${COLORS.violet}33`,
            }}
          >
            <SamIcon skinKey={samSkin} size={36} />
            <div style={{ fontSize: 13.5, color: COLORS.textDark, lineHeight: 1.45 }}>
              <span style={{ fontWeight: 700, color: COLORS.violet }}>{samLabel} — </span>
              {samLine}
            </div>
          </div>
        )}

        {phase === "rule" && (
          <div>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                color: COLORS.hqNavy,
                fontSize: 22,
                marginTop: 0,
              }}
            >
              {publicCase.binRule.title}
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.55, color: COLORS.textDark }}>
              {publicCase.binRule.text}
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "18px 0 24px" }}>
              {(publicCase.bins || []).map((b) => (
                <div
                  key={b.id}
                  style={{
                    flex: "1 1 120px",
                    background: COLORS.softTeal,
                    border: `1.5px solid ${COLORS.teal}55`,
                    borderRadius: 14,
                    padding: "14px 12px",
                    textAlign: "center",
                    fontWeight: 700,
                    color: COLORS.deepNavy,
                  }}
                >
                  {b.label}
                </div>
              ))}
            </div>
            <button
              className="cl-btn"
              onClick={() => {
                setPhase("stream");
                showSam("correct");
              }}
              style={{
                width: "100%",
                background: COLORS.violet,
                color: COLORS.white,
                borderRadius: 12,
                padding: "14px 20px",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              Start the Stream →
            </button>
          </div>
        )}

        {phase === "stream" && currentItem && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <div style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.textMuted }}>
                Wave {waveIndex + 1} of {(publicCase.waves || []).length} · Item {itemIndex + 1} of{" "}
                {waveIds.length}
                {currentItem.isTricky ? " · FLAG" : ""}
              </div>
              {pacingMode === "timed" && timerLeft !== null && !feedback && !awaitingFlagWrite && (
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 13,
                    color: timerLeft <= 3 ? COLORS.danger : COLORS.deepNavy,
                    background: COLORS.softTeal,
                    borderRadius: 999,
                    padding: "4px 12px",
                  }}
                >
                  {timerLeft}s
                </div>
              )}
            </div>

            {currentItem.isTricky && (
              <div
                style={{
                  background: "rgba(255,196,77,.2)",
                  border: `1px solid ${COLORS.gold}`,
                  borderRadius: 12,
                  padding: "10px 12px",
                  marginBottom: 12,
                  fontSize: 13,
                  fontWeight: 600,
                  color: COLORS.deepNavy,
                }}
              >
                {publicCase.flagPrompt}
              </div>
            )}

            <ItemCard item={currentItem} />

            <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
              {(publicCase.bins || []).map((b) => (
                <button
                  key={b.id}
                  className="cl-btn"
                  disabled={!!feedback || awaitingFlagWrite}
                  onClick={() => handleBinPick(b.id)}
                  style={{
                    flex: "1 1 120px",
                    background: COLORS.white,
                    border: `2px solid ${COLORS.violet}`,
                    color: COLORS.violet,
                    borderRadius: 12,
                    padding: "14px 12px",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>

            {feedback && (
              <div
                style={{
                  marginTop: 14,
                  padding: "12px 14px",
                  borderRadius: 12,
                  background: feedback.correct ? COLORS.softTeal : "rgba(226,85,85,.1)",
                  border: `1px solid ${feedback.correct ? COLORS.teal : COLORS.danger}`,
                  color: COLORS.textDark,
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {feedback.message}
              </div>
            )}

            {awaitingFlagWrite && (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 8, color: COLORS.hqNavy }}>
                  Flag justification
                  {pendingFlagBin ? ` (you chose ${labelForBin(pendingFlagBin)})` : ""}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                  {(publicCase.responseStems || []).map((stem) => (
                    <button
                      key={stem}
                      type="button"
                      className="cl-btn"
                      onClick={() =>
                        setFlagText((prev) => (prev ? prev.trimEnd() + " " + stem : stem))
                      }
                      style={{
                        background: COLORS.softLavender,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 999,
                        padding: "6px 10px",
                        fontSize: 11.5,
                        color: COLORS.textDark,
                      }}
                    >
                      {stem}
                    </button>
                  ))}
                </div>
                <textarea
                  value={flagText}
                  onChange={(e) => setFlagText(e.target.value)}
                  rows={4}
                  placeholder="Why does this belong in that bin? Use the rule (shape / pour / fill)."
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    borderRadius: 12,
                    border: `2px solid ${COLORS.border}`,
                    padding: 12,
                    fontSize: 14,
                    fontFamily: "inherit",
                    color: COLORS.textDark,
                    resize: "vertical",
                  }}
                />
                <button
                  className="cl-btn"
                  disabled={!flagText.trim()}
                  onClick={confirmFlagWrite}
                  style={{
                    marginTop: 10,
                    width: "100%",
                    background: COLORS.teal,
                    color: COLORS.hqNavy,
                    borderRadius: 12,
                    padding: "12px 16px",
                    fontWeight: 700,
                  }}
                >
                  Lock Flag write & continue →
                </button>
              </div>
            )}
          </div>
        )}

        {phase === "transfer" && publicCase.transfer && publicCase.transfer.type === "mystery_sample" && (
          <div>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                color: COLORS.hqNavy,
                fontSize: 22,
                marginTop: 0,
              }}
            >
              {publicCase.transfer.title}
            </h2>
            <p style={{ color: COLORS.textDark, lineHeight: 1.5 }}>{publicCase.transfer.prompt}</p>
            <ItemCard item={publicCase.transfer.sample} />

            <div style={{ marginTop: 18 }}>
              <div style={{ fontWeight: 700, marginBottom: 10, color: COLORS.hqNavy }}>Quick checks</div>
              {(publicCase.transfer.checks || []).map((c) => (
                <div
                  key={c.id}
                  style={{
                    background: COLORS.softTeal,
                    borderRadius: 12,
                    padding: 12,
                    marginBottom: 10,
                    border: `1px solid ${COLORS.teal}33`,
                  }}
                >
                  <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 8 }}>{c.question}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["yes", "no"].map((ans) => (
                      <button
                        key={ans}
                        type="button"
                        className="cl-btn"
                        onClick={() =>
                          setTransferChecks((prev) => ({ ...prev, [c.id]: ans }))
                        }
                        style={{
                          flex: 1,
                          borderRadius: 10,
                          padding: "10px 12px",
                          fontWeight: 700,
                          background:
                            transferChecks[c.id] === ans ? COLORS.violet : COLORS.white,
                          color: transferChecks[c.id] === ans ? COLORS.white : COLORS.textDark,
                          border: `1.5px solid ${
                            transferChecks[c.id] === ans ? COLORS.violet : COLORS.border
                          }`,
                        }}
                      >
                        {ans === "yes" ? "Yes" : "No"}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontWeight: 700, margin: "16px 0 10px", color: COLORS.hqNavy }}>
              {publicCase.transfer.choosePrompt}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {(publicCase.bins || []).map((b) => (
                <button
                  key={b.id}
                  type="button"
                  className="cl-btn"
                  onClick={() => setTransferBin(b.id)}
                  style={{
                    flex: "1 1 120px",
                    borderRadius: 12,
                    padding: "14px 12px",
                    fontWeight: 700,
                    background: transferBin === b.id ? COLORS.violet : COLORS.white,
                    color: transferBin === b.id ? COLORS.white : COLORS.violet,
                    border: `2px solid ${COLORS.violet}`,
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>

            <button
              className="cl-btn"
              disabled={!transferBin || !allTransferChecksAnswered()}
              onClick={finishTransfer}
              style={{
                marginTop: 18,
                width: "100%",
                background: COLORS.violet,
                color: COLORS.white,
                borderRadius: 12,
                padding: "14px 20px",
                fontWeight: 700,
              }}
            >
              Finish Mystery Sample →
            </button>
          </div>
        )}

        {phase === "wrapup" && (
          <div>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                color: COLORS.hqNavy,
                fontSize: 22,
                marginTop: 0,
              }}
            >
              Mission Wrap-up
            </h2>
            <p style={{ color: COLORS.textMuted }}>{publicCase.wrapUpPrompt}</p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                margin: "16px 0 20px",
              }}
            >
              <div
                style={{
                  background: COLORS.softTeal,
                  borderRadius: 14,
                  padding: 14,
                  border: `1px solid ${COLORS.teal}44`,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted }}>SORTS</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.hqNavy }}>
                  {sortCorrectCount}/{sortLog.length || (publicCase.items || []).length}
                </div>
              </div>
              <div
                style={{
                  background: "rgba(255,196,77,.18)",
                  borderRadius: 14,
                  padding: 14,
                  border: `1px solid ${COLORS.gold}`,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted }}>BEST STREAK</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.hqNavy }}>{bestStreak}</div>
              </div>
            </div>

            <div style={{ fontWeight: 700, marginBottom: 8 }}>Your Flag write</div>
            <div
              style={{
                background: COLORS.canvas,
                borderRadius: 12,
                padding: 12,
                fontSize: 13.5,
                color: COLORS.textDark,
                marginBottom: 16,
                whiteSpace: "pre-wrap",
              }}
            >
              {flagText || "(none yet — go back if you can edit your draft)"}
            </div>

            <div style={{ fontWeight: 700, marginBottom: 8 }}>Self-check (pick at least {REQUIRED_CHECKS})</div>
            {(publicCase.selfCheckQuestions || []).map((q, i) => (
              <button
                key={q}
                type="button"
                className="cl-btn"
                onClick={() => toggleChecklistItem(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  textAlign: "left",
                  background: checklist[i] ? COLORS.softLavender : COLORS.white,
                  border: `1.5px solid ${checklist[i] ? COLORS.violet : COLORS.border}`,
                  borderRadius: 10,
                  padding: "10px 12px",
                  marginBottom: 8,
                  color: COLORS.textDark,
                  fontSize: 13,
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                    background: checklist[i] ? COLORS.violet : COLORS.white,
                    border: `1.5px solid ${checklist[i] ? COLORS.violet : COLORS.border}`,
                    color: COLORS.white,
                    fontSize: 12,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {checklist[i] ? "✓" : ""}
                </div>
                {q}
              </button>
            ))}
            {showChecklistError && (
              <div style={{ color: COLORS.danger, fontSize: 13, marginBottom: 8 }}>
                Check at least {REQUIRED_CHECKS} boxes before submitting.
              </div>
            )}
            {submitError && (
              <div style={{ color: COLORS.danger, fontSize: 13, marginBottom: 8 }}>{submitError}</div>
            )}

            <button
              className="cl-btn"
              disabled={submitting}
              onClick={handleRequestSubmit}
              style={{
                marginTop: 8,
                width: "100%",
                background: COLORS.violet,
                color: COLORS.white,
                borderRadius: 12,
                padding: "14px 20px",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              {submitting ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <Loader2 size={16} className="spin" /> Submitting…
                </span>
              ) : (
                "Submit Classification Lab"
              )}
            </button>
          </div>
        )}
      </div>

      {showSubmitConfirm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(13,27,42,.45)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              background: COLORS.white,
              borderRadius: 18,
              padding: 24,
              maxWidth: 400,
              width: "100%",
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8, color: COLORS.hqNavy }}>
              Ready to submit for grading?
            </div>
            <p style={{ fontSize: 13.5, color: COLORS.textMuted, marginBottom: 18 }}>
              Your sorts, Flag write, and Mystery Sample will go to your teacher.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="cl-btn"
                onClick={() => setShowSubmitConfirm(false)}
                style={{
                  flex: 1,
                  background: COLORS.canvas,
                  color: COLORS.textDark,
                  borderRadius: 999,
                  padding: "11px 16px",
                  fontWeight: 700,
                }}
              >
                Keep editing
              </button>
              <button
                className="cl-btn"
                onClick={() => {
                  setShowSubmitConfirm(false);
                  submitForGrading();
                }}
                style={{
                  flex: 1,
                  background: COLORS.teal,
                  color: COLORS.hqNavy,
                  borderRadius: 999,
                  padding: "11px 16px",
                  fontWeight: 700,
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <SamStage
        skinKey={samSkin}
        alt={samLabel}
        size={150}
        style={{ position: "fixed", right: 12, bottom: 12, zIndex: 4 }}
      />
    </div>
  );
}
