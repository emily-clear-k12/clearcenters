"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import BackToHubButton from "../../../components/BackToHubButton";
import { pointsForCorrectAnswer } from "../../../lib/frequencyRushScoring";

const COLORS = {
  navy: "#0D1B2A",
  violet: "#7B5DFF",
  teal: "#6FD8F5",
  gold: "#FFC44D",
  green: "#3FBF7F",
  red: "#E8586A",
  cream: "#F2F0FA",
  white: "#FFFFFF",
  textDark: "#1F2A44",
  textMuted: "#8892A6",
};

// Frequency Rush — Individual Practice, Lock the Signal format only (week-1
// scope per the Sept 7 design doc). Group Live, the other three formats, and
// the three game-mode skins are all later phases; this is the plain
// word<->definition round loop with the blended scoring model from §2.
//
// Session length, round count, and distractor selection are all decided
// server-side (see lib/cases/frequency-rush.js + api/frequency-rush/start) —
// this component only renders whatever round order it's handed and reports
// back what the student clicked. Every score shown here before submit is a
// LOCAL, OPTIMISTIC preview; the server re-scores everything from scratch on
// submit, and that's the number that actually gets saved.
export default function FrequencyRushClient({ assignmentId, caseTitle }) {
  const [phase, setPhase] = useState("intro"); // intro | loading | playing | submitting | recap | error
  const [errorMsg, setErrorMsg] = useState(null);
  const [session, setSession] = useState(null); // { sessionId, roundSeconds, rounds }
  const [roundIndex, setRoundIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [locked, setLocked] = useState(false); // true once this round's choice is made, until the brief feedback flash clears
  const [chosenId, setChosenId] = useState(null);
  const [streak, setStreak] = useState(0);
  const [previewScore, setPreviewScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const roundStartRef = useRef(null);
  const timerRef = useRef(null);

  const startSession = useCallback(async () => {
    setPhase("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/frequency-rush/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't start the round.");
      setSession(data);
      setRoundIndex(0);
      setStreak(0);
      setPreviewScore(0);
      setAnswers([]);
      setResult(null);
      setLocked(false);
      setChosenId(null);
      setTimeLeft(data.roundSeconds);
      roundStartRef.current = Date.now();
      setPhase("playing");
    } catch (err) {
      setErrorMsg(err.message);
      setPhase("error");
    }
  }, [assignmentId]);

  const submitRound = useCallback(async (finalAnswers) => {
    setPhase("submitting");
    try {
      const res = await fetch("/api/frequency-rush/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: session.sessionId, answers: finalAnswers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't save this round.");
      setResult(data);
      setPhase("recap");
    } catch (err) {
      setErrorMsg(err.message);
      setPhase("error");
    }
  }, [session]);

  const goToNextRound = useCallback((updatedAnswers) => {
    const nextIndex = roundIndex + 1;
    if (!session || nextIndex >= session.rounds.length) {
      submitRound(updatedAnswers);
      return;
    }
    setRoundIndex(nextIndex);
    setLocked(false);
    setChosenId(null);
    setTimeLeft(session.roundSeconds);
    roundStartRef.current = Date.now();
  }, [roundIndex, session, submitRound]);

  const handleChoice = useCallback((choiceId) => {
    if (locked || phase !== "playing") return;
    setLocked(true);
    setChosenId(choiceId);
    const responseTimeMs = Date.now() - roundStartRef.current;
    const round = session.rounds[roundIndex];
    const correct = choiceId !== null && choiceId === round.promptWordId;

    // Live feedback only — the server recomputes this from scratch on submit
    // using the session's own stored round order, and that recomputed number
    // is what actually gets saved (see api/frequency-rush/submit).
    let nextStreak = streak;
    if (correct) {
      nextStreak = streak + 1;
      const earned = pointsForCorrectAnswer({ responseTimeMs, roundSeconds: session.roundSeconds, streakAfterThisAnswer: nextStreak });
      setPreviewScore((s) => s + earned);
    } else {
      nextStreak = 0;
    }
    setStreak(nextStreak);

    const updatedAnswers = [...answers, { roundIndex, chosenWordId: choiceId, responseTimeMs }];
    setAnswers(updatedAnswers);
    const t = setTimeout(() => goToNextRound(updatedAnswers), 650);
    return () => clearTimeout(t);
  }, [locked, phase, session, roundIndex, answers, streak, goToNextRound]);

  // Per-round countdown.
  useEffect(() => {
    if (phase !== "playing" || locked) return;
    if (timeLeft <= 0) {
      handleChoice(null); // time ran out — counts as a miss, resets streak, no penalty beyond that
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [phase, locked, timeLeft, handleChoice]);

  if (phase === "intro") {
    return (
      <Shell>
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📡</div>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 24, fontWeight: 700, margin: "0 0 8px 0" }}>Incoming Transmission</h1>
          <p style={{ color: COLORS.textMuted, fontSize: 14, margin: "0 0 4px 0" }}>{caseTitle || "Frequency Rush"}</p>
          <p style={{ color: COLORS.textMuted, fontSize: 13, margin: "0 0 24px 0" }}>
            Lock onto the right signal before it scrambles. You can play this as many times as you want.
          </p>
          <button onClick={startSession} style={buttonStyle(COLORS.violet)}>Start Practice</button>
        </div>
      </Shell>
    );
  }

  if (phase === "loading" || phase === "submitting") {
    return (
      <Shell>
        <p style={{ color: COLORS.white, opacity: 0.8 }}>{phase === "loading" ? "Tuning in…" : "Locking in your results…"}</p>
      </Shell>
    );
  }

  if (phase === "error") {
    return (
      <Shell>
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <p style={{ color: COLORS.white, marginBottom: 16 }}>{errorMsg || "Something went wrong."}</p>
          <button onClick={startSession} style={buttonStyle(COLORS.violet)}>Try Again</button>
        </div>
      </Shell>
    );
  }

  if (phase === "recap" && result) {
    return (
      <Shell>
        <div style={{ textAlign: "center", maxWidth: 440 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 24, fontWeight: 700, margin: "0 0 16px 0", color: COLORS.white }}>Transmission Restored</h1>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <StatPill label="Score" value={result.score} />
            <StatPill label="Correct" value={`${result.correctCount}/${result.total}`} />
            <StatPill label="Best Streak" value={result.bestStreak} />
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button onClick={startSession} style={buttonStyle(COLORS.violet)}>Play Again</button>
            <a href="/home" style={{ ...buttonStyle(COLORS.white), color: COLORS.textDark, textDecoration: "none", display: "inline-block" }}>Back to Hub</a>
          </div>
        </div>
      </Shell>
    );
  }

  // phase === "playing"
  const round = session.rounds[roundIndex];
  return (
    <Shell>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, color: COLORS.white, fontSize: 13, opacity: 0.85 }}>
          <span>Signal {roundIndex + 1} of {session.rounds.length}</span>
          <span>🔥 Streak {streak}</span>
          <span>{previewScore} pts</span>
        </div>

        <div style={{ height: 6, background: "rgba(255,255,255,.15)", borderRadius: 999, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(timeLeft / session.roundSeconds) * 100}%`, background: timeLeft <= 2 ? COLORS.red : COLORS.teal, transition: "width 1s linear" }} />
        </div>

        <div style={{ background: COLORS.white, borderRadius: 20, padding: "28px 24px", textAlign: "center", marginBottom: 18, boxShadow: "0 8px 24px rgba(0,0,0,.25)" }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.5, margin: "0 0 6px 0" }}>Which definition matches?</p>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 28, fontWeight: 700, margin: 0, color: COLORS.textDark }}>{round.word}</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {round.choices.map((choice) => {
            const isChosen = chosenId === choice.id;
            const isTheCorrectOne = choice.id === round.promptWordId;
            // Once locked: the chosen wrong answer flashes red, the actual
            // correct choice flashes green (so a miss still shows what the
            // right answer was), everything else fades — same
            // no-extra-shame spirit as the rest of the app (a miss is shown
            // plainly, never dwelt on).
            let border = "2px solid transparent";
            let background = COLORS.white;
            if (locked) {
              if (isChosen && isTheCorrectOne) { border = `2px solid ${COLORS.green}`; background = "#EAFBF2"; }
              else if (isChosen && !isTheCorrectOne) { border = `2px solid ${COLORS.red}`; background = "#FDECEE"; }
              else if (isTheCorrectOne) { border = `2px solid ${COLORS.green}`; }
            } else if (isChosen) {
              border = `2px solid ${COLORS.teal}`;
            }
            return (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice.id)}
                disabled={locked}
                style={{
                  textAlign: "left",
                  padding: "14px 16px",
                  borderRadius: 14,
                  border,
                  background,
                  color: COLORS.textDark,
                  fontSize: 14.5,
                  lineHeight: 1.35,
                  cursor: locked ? "default" : "pointer",
                  opacity: locked && !isChosen && !isTheCorrectOne ? 0.55 : 1,
                }}
              >
                {choice.definition}
              </button>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg, ${COLORS.navy} 0%, #16243F 100%)`, fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
      <BackToHubButton />
      {children}
    </div>
  );
}

function StatPill({ label, value }) {
  return (
    <div style={{ background: "rgba(255,255,255,.08)", borderRadius: 14, padding: "10px 18px", minWidth: 90 }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.white }}>{value}</div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", textTransform: "uppercase", letterSpacing: 0.4 }}>{label}</div>
    </div>
  );
}

function buttonStyle(bg) {
  return {
    background: bg,
    color: COLORS.white,
    border: "none",
    borderRadius: 999,
    padding: "12px 28px",
    fontWeight: 700,
    fontSize: 14.5,
    cursor: "pointer",
  };
}
