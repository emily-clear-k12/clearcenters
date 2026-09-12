"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import BackToHubButton from "../../../components/BackToHubButton";

const POLL_MS = 1500;

// Soft Crystal shell (lavender / white / violet / teal) — not dark cyberpunk.
const SHELL = {
  bg: "radial-gradient(ellipse at 18% 12%, #EDE6FF 0%, #F7F5FC 42%, #E8F7FB 100%)",
  card: "#FFFFFF",
  violet: "#8C52F2",
  teal: "#2EB8C8",
  gold: "#D4A017",
  text: "#1F2A44",
  muted: "#697386",
  border: "#E1E2EE",
};

// Sept 12, 2026 — wires the assigned question bank into Emily's Signal Defense
// widget, posts scores on mission end, and (when a teacher has an open live
// session) auto-joins classmates with shared Salvage / Power / Base Health.
// Solo + fake crew remain the fallback when no live session exists.
export default function SignalDefenseClient({
  assignmentId,
  caseTitle,
  caseStandard,
  questionBank,
  studentFirstName,
}) {
  const iframeRef = useRef(null);
  const submittingRef = useRef(false);
  const liveRef = useRef({ active: false, status: null, sessionId: null });
  const widgetReadyRef = useRef(false);
  const [liveBanner, setLiveBanner] = useState(null);

  const submitRun = useCallback(async (result) => {
    if (!assignmentId || !result) return;
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
      console.error("Signal Defense submit failed:", err);
    } finally {
      submittingRef.current = false;
    }
  }, [assignmentId, caseStandard]);

  const pushLiveToWidget = useCallback((payload) => {
    const win = iframeRef.current?.contentWindow;
    if (!win || !win.SignalDefense || !payload?.session) return;
    try {
      if (typeof win.SignalDefense.configureLive === "function") {
        win.SignalDefense.configureLive({
          enabled: payload.active && payload.session.status !== "ended",
          status: payload.session.status,
          playerName: studentFirstName || "YOU",
        });
      }
      if (typeof win.SignalDefense.applySharedMeters === "function") {
        win.SignalDefense.applySharedMeters({
          salvage: payload.session.salvage,
          power: payload.session.power,
          baseHealth: payload.session.baseHealth,
          totalCorrect: payload.session.totalCorrect,
        });
      }
      if (typeof win.SignalDefense.setRoster === "function") {
        win.SignalDefense.setRoster(payload.participants || []);
      }
      if (typeof win.SignalDefense.setLivePhase === "function") {
        win.SignalDefense.setLivePhase(payload.session.status);
      }
    } catch (err) {
      console.error("Signal Defense live push failed:", err);
    }
  }, [studentFirstName]);

  const contributeCorrect = useCallback(async () => {
    if (!assignmentId || !liveRef.current.active) return;
    if (liveRef.current.status !== "live") return;
    try {
      const res = await fetch("/api/signal-defense/session/contribute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.session) {
        liveRef.current = {
          active: data.active,
          status: data.session.status,
          sessionId: data.session.id,
        };
        pushLiveToWidget(data);
      }
    } catch (err) {
      console.error("Signal Defense contribute failed:", err);
    }
  }, [assignmentId, pushLiveToWidget]);

  const wireWidget = useCallback(() => {
    const win = iframeRef.current?.contentWindow;
    if (!win || !win.SignalDefense) return;
    widgetReadyRef.current = true;
    try {
      if (Array.isArray(questionBank) && questionBank.length > 0) {
        win.SignalDefense.setQuestionBank(questionBank);
      }
      win.SignalDefense.onComplete((result) => {
        submitRun(result);
      });
      if (typeof win.SignalDefense.onContribute === "function") {
        win.SignalDefense.onContribute(() => {
          contributeCorrect();
        });
      }
      if (liveRef.current.active) {
        // Re-apply last known live state after iframe (re)load.
        fetch(`/api/signal-defense/session?assignmentId=${encodeURIComponent(assignmentId)}`)
          .then((r) => r.json())
          .then((data) => {
            if (data?.session) {
              liveRef.current = {
                active: !!data.active,
                status: data.session.status,
                sessionId: data.session.id,
              };
              pushLiveToWidget(data);
            }
          })
          .catch(() => {});
      }
    } catch (err) {
      console.error("Signal Defense: could not configure widget:", err);
    }
  }, [questionBank, submitRun, contributeCorrect, assignmentId, pushLiveToWidget]);

  useEffect(() => {
    if (!assignmentId) return;
    let cancelled = false;
    let timer = null;
    let ticks = 0;
    let joinedOnce = false;

    async function joinOnce() {
      const joinRes = await fetch("/api/signal-defense/session/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId }),
      });
      return joinRes.json().catch(() => ({}));
    }

    async function applyPayload(data) {
      if (cancelled) return;
      if (data?.session && data.active) {
        liveRef.current = {
          active: true,
          status: data.session.status,
          sessionId: data.session.id,
        };
        setLiveBanner(
          data.session.status === "lobby"
            ? "Live crew lobby — waiting for your teacher to begin."
            : "Live Signal Ops — shared meters with your class."
        );
        if (widgetReadyRef.current) pushLiveToWidget(data);
      } else {
        liveRef.current = { active: false, status: null, sessionId: null };
        setLiveBanner(null);
      }
    }

    async function syncOnce() {
      try {
        ticks += 1;
        let data;
        if (!joinedOnce || ticks % 8 === 0) {
          data = await joinOnce();
          joinedOnce = true;
        } else {
          const res = await fetch(`/api/signal-defense/session?assignmentId=${encodeURIComponent(assignmentId)}`);
          data = await res.json().catch(() => ({}));
        }
        await applyPayload(data);
      } catch (err) {
        // Solo fallback if the session tables aren't migrated yet.
      }
    }

    syncOnce();
    timer = setInterval(syncOnce, POLL_MS);
    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, [assignmentId, pushLiveToWidget]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: SHELL.bg,
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
      <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: 48, gap: 12 }}>
        {liveBanner && (
          <div
            style={{
              width: "100%",
              maxWidth: 1320,
              background: SHELL.card,
              border: `1.5px solid ${SHELL.border}`,
              borderRadius: 14,
              padding: "10px 16px",
              color: SHELL.text,
              fontSize: 13.5,
              fontWeight: 600,
              boxShadow: "0 4px 16px rgba(140,82,242,.08)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ color: SHELL.violet, fontWeight: 800, letterSpacing: 0.4 }}>LIVE CREW</span>
            <span style={{ color: SHELL.muted }}>{liveBanner}</span>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src="/games/signal-defense-3-6b-gameplay-v4.html"
          title={caseTitle || "Signal Defense"}
          onLoad={wireWidget}
          style={{ width: "100%", maxWidth: 1320, height: "88vh", minHeight: 640, border: `1px solid ${SHELL.border}`, borderRadius: 16, display: "block", background: "#fff", boxShadow: "0 8px 28px rgba(31,42,68,.08)" }}
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
