"use client";

import React, { useRef, useCallback } from "react";
import BackToHubButton from "../../../components/BackToHubButton";

// Sept 12, 2026 — wires the assigned question bank into Emily's finished
// Signal Defense widget (public/games/signal-defense-3-6b-gameplay-v4.html)
// via window.SignalDefense.setQuestionBank(), and posts a score summary on
// mission end via window.SignalDefense.onComplete() into /api/signal-defense/submit.
// Same Soft Crystal / navy shell as FrequencyRushClient; standalone HTML
// play still works when no bank is injected (built-in 3.6B bank).
export default function SignalDefenseClient({
  assignmentId,
  caseTitle,
  caseStandard,
  questionBank,
}) {
  const iframeRef = useRef(null);
  const submittingRef = useRef(false);

  const submitRun = useCallback(async (result) => {
    if (!assignmentId || !result) return;
    // Guard against a double-fire if the widget somehow emits twice before
    // Play Again reloads the iframe (endMission already self-guards on
    // state.ended, but a flaky host callback shouldn't double-POST).
    if (submittingRef.current) return;
    submittingRef.current = true;
    try {
      const res = await fetch("/api/signal-defense/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId,
          caseStandard: caseStandard || null,
          result: {
            reason: result.reason,
            win: !!result.win,
            score: Number(result.score) || 0,
            correct: Number(result.correct) || 0,
            attempted: Number(result.attempted) || 0,
            bestStreak: Number(result.bestStreak) || 0,
            questionsSeen: Number(result.questionsSeen) || 0,
            personalSalvage: Number(result.personalSalvage) || 0,
            teamSignals: Number(result.teamSignals) || 0,
            rescued: Number(result.rescued) || 0,
            health: Number(result.health) || 0,
            wave: Number(result.wave) || 0,
            unitId: result.unitId || null,
            confidence: result.confidence || null,
            results: Array.isArray(result.results) ? result.results : [],
          },
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Couldn't save this run.");
    } catch (err) {
      // Widget already shows the private recap — never yank the student out
      // of a finished mission over a network hiccup.
      console.error("Signal Defense submit failed:", err);
    } finally {
      submittingRef.current = false;
    }
  }, [assignmentId, caseStandard]);

  const wireWidget = useCallback(() => {
    const win = iframeRef.current?.contentWindow;
    if (!win || !win.SignalDefense) return;
    try {
      if (Array.isArray(questionBank) && questionBank.length > 0) {
        win.SignalDefense.setQuestionBank(questionBank);
      }
      win.SignalDefense.onComplete((result) => {
        submitRun(result);
      });
    } catch (err) {
      // setQuestionBank throws on a bad bank shape — log rather than blank
      // the shell; standalone built-in bank still plays.
      console.error("Signal Defense: could not configure widget:", err);
    }
  }, [questionBank, submitRun]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 20% 20%, #16243F 0%, #0D1B2A 45%, #060B16 100%)",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 24,
        position: "relative",
      }}
    >
      <BackToHubButton />
      <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: 48 }}>
        <iframe
          ref={iframeRef}
          src="/games/signal-defense-3-6b-gameplay-v4.html"
          title={caseTitle || "Signal Defense"}
          onLoad={wireWidget}
          style={{ width: "100%", maxWidth: 1320, height: "88vh", minHeight: 640, border: "none", borderRadius: 16, display: "block" }}
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
