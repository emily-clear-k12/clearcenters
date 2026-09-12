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

function sessionIsPlayable(data) {
  if (!data?.session) return false;
  if (data.active) return true;
  const outcome = data.session.outcome;
  // Keep the student on the live board for the class end state.
  if (outcome === "regroup" || outcome === "victory") return true;
  if (data.session.status === "ended") return true;
  return false;
}

// Sept 12, 2026 — V1.5 live crew: shared votes, power drain, wave damage.
// Sept 12, 2026 (playtest): hide prototype demo UI during live class play.
// Sept 12, 2026 (product): remove solo / fake-crew fallback entirely for
// assigned Signal Ops. No open live session → waiting UI only. Live /
// lobby / just-ended → immersive full-viewport student game (no prototype
// chrome wrapper). Teacher board Start/Begin/End unchanged.
export default function SignalDefenseClient({
  assignmentId,
  caseTitle,
  caseStandard,
  questionBank,
  studentFirstName,
}) {
  const iframeRef = useRef(null);
  const submittingRef = useRef(false);
  const liveRef = useRef({ active: false, status: null, sessionId: null, outcome: null });
  const widgetReadyRef = useRef(false);
  const lastPayloadRef = useRef(null);
  const [liveBanner, setLiveBanner] = useState(null);
  const [sessionReady, setSessionReady] = useState(false);
  const [inLivePlay, setInLivePlay] = useState(false);

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
    lastPayloadRef.current = payload;
    try {
      if (typeof win.SignalDefense.configureLive === "function") {
        win.SignalDefense.configureLive({
          // Stay in live presentation for lobby, live, and just-ended recap
          // so prototype setup / demo tools never reappear on the student view.
          enabled: sessionIsPlayable(payload),
          status: payload.session.status,
          playerName: studentFirstName || "YOU",
          outcome: payload.session.outcome || "ongoing",
        });
      }
      if (typeof win.SignalDefense.applySharedMeters === "function") {
        win.SignalDefense.applySharedMeters({
          salvage: payload.session.salvage,
          power: payload.session.power,
          baseHealth: payload.session.baseHealth,
          totalCorrect: payload.session.totalCorrect,
          waveIndex: payload.session.waveIndex,
          waveRemainingMs: payload.session.waveRemainingMs,
          nextVoteThreshold: payload.session.nextVoteThreshold,
          maxWaves: payload.session.maxWaves,
        });
      }
      if (typeof win.SignalDefense.applyLiveOps === "function") {
        win.SignalDefense.applyLiveOps({
          upgrades: payload.session.upgrades,
          vote: payload.session.vote,
          lastUpgradeId: payload.session.lastUpgradeId,
          outcome: payload.session.outcome,
          status: payload.session.status,
        });
      }
      if (typeof win.SignalDefense.setRoster === "function") {
        win.SignalDefense.setRoster(payload.participants || []);
      }
      if (typeof win.SignalDefense.setLivePhase === "function") {
        win.SignalDefense.setLivePhase(payload.session.status, payload.session.outcome);
      }
    } catch (err) {
      console.error("Signal Defense live push failed:", err);
    }
  }, [studentFirstName]);

  const contributeCorrect = useCallback(async () => {
    if (!assignmentId || !liveRef.current.active) return;
    if (liveRef.current.status !== "live") return;
    if (liveRef.current.outcome && liveRef.current.outcome !== "ongoing") return;
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
          outcome: data.session.outcome || "ongoing",
        };
        pushLiveToWidget(data);
      }
    } catch (err) {
      console.error("Signal Defense contribute failed:", err);
    }
  }, [assignmentId, pushLiveToWidget]);

  const castVote = useCallback(async (upgradeId) => {
    if (!assignmentId || !liveRef.current.active) return;
    if (!upgradeId) return;
    try {
      const res = await fetch("/api/signal-defense/session/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, upgradeId }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.session) {
        liveRef.current = {
          active: data.active,
          status: data.session.status,
          sessionId: data.session.id,
          outcome: data.session.outcome || "ongoing",
        };
        pushLiveToWidget(data);
      }
    } catch (err) {
      console.error("Signal Defense vote failed:", err);
    }
  }, [assignmentId, pushLiveToWidget]);

  const wireWidget = useCallback(() => {
    const win = iframeRef.current?.contentWindow;
    if (!win || !win.SignalDefense) return;
    widgetReadyRef.current = true;
    try {
      // Assigned case bank must win over the HTML file's built-in 3.6B demo bank.
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
      if (typeof win.SignalDefense.onVote === "function") {
        win.SignalDefense.onVote((upgradeId) => {
          castVote(upgradeId);
        });
      }
      // Prefer the payload already learned from the pre-iframe session sync so
      // live mode suppresses prototype UI on the first paint inside the widget.
      if (lastPayloadRef.current?.session) {
        pushLiveToWidget(lastPayloadRef.current);
      } else {
        fetch(`/api/signal-defense/session?assignmentId=${encodeURIComponent(assignmentId)}&includeEnded=1`)
          .then((r) => r.json())
          .then((data) => {
            if (data?.session && sessionIsPlayable(data)) {
              liveRef.current = {
                active: !!data.active || data.session.status === "ended",
                status: data.session.status,
                sessionId: data.session.id,
                outcome: data.session.outcome || "ongoing",
              };
              lastPayloadRef.current = data;
              pushLiveToWidget(data);
            }
          })
          .catch(() => {});
      }
    } catch (err) {
      console.error("Signal Defense: could not configure widget:", err);
    }
  }, [questionBank, submitRun, contributeCorrect, castVote, assignmentId, pushLiveToWidget]);

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
      if (sessionIsPlayable(data)) {
        const active = !!data.active;
        liveRef.current = {
          active: active || data.session.status === "ended",
          status: data.session.status,
          sessionId: data.session.id,
          outcome: data.session.outcome || "ongoing",
        };
        lastPayloadRef.current = data;
        setInLivePlay(true);
        if (data.session.outcome === "regroup") {
          setLiveBanner("The base held on as long as it could — regroup for the next wave. Ask your teacher to relaunch.");
        } else if (data.session.outcome === "victory") {
          setLiveBanner("Outpost secured — great crew work.");
        } else if (data.session.vote?.open) {
          setLiveBanner("Class upgrade vote — same options on every device. Majority wins.");
        } else if (data.session.status === "lobby") {
          setLiveBanner("Live crew lobby — waiting for your teacher to begin.");
        } else if ((data.session.power || 0) <= 0) {
          setLiveBanner("Power is out — upgrades are offline until correct answers restore the grid.");
        } else {
          setLiveBanner("Live Signal Ops — shared meters with your class.");
        }
        if (widgetReadyRef.current) pushLiveToWidget(data);
      } else {
        liveRef.current = { active: false, status: null, sessionId: null, outcome: null };
        lastPayloadRef.current = null;
        widgetReadyRef.current = false;
        setInLivePlay(false);
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
          const res = await fetch(`/api/signal-defense/session?assignmentId=${encodeURIComponent(assignmentId)}&includeEnded=1`);
          data = await res.json().catch(() => ({}));
        }
        await applyPayload(data);
      } catch (err) {
        // No solo fallback — stay on the waiting screen until a live session opens.
      } finally {
        if (!cancelled) setSessionReady(true);
      }
    }

    syncOnce();
    timer = setInterval(syncOnce, POLL_MS);
    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, [assignmentId, pushLiveToWidget]);

  // Immersive student shell: full viewport, no padded card chrome around the game.
  const shellStyle = {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",
    background: SHELL.bg,
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden",
    zIndex: 1,
  };

  const waitingCard = (
    <div
      style={{
        width: "min(520px, 92vw)",
        background: SHELL.card,
        border: `1.5px solid ${SHELL.border}`,
        borderRadius: 20,
        padding: "36px 32px",
        textAlign: "center",
        boxShadow: "0 12px 40px rgba(140,82,242,.12)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 1.6,
          color: SHELL.violet,
          marginBottom: 12,
        }}
      >
        SIGNAL OPS
      </div>
      <h1
        style={{
          margin: "0 0 12px",
          fontSize: 26,
          lineHeight: 1.25,
          color: SHELL.text,
          fontWeight: 800,
        }}
      >
        Waiting for teacher to start Signal Ops
      </h1>
      <p style={{ margin: 0, color: SHELL.muted, fontSize: 15, lineHeight: 1.5, fontWeight: 500 }}>
        This mission runs as a live class session. Stay on this page — when your teacher starts Signal Ops, you will join automatically.
      </p>
      <div
        style={{
          marginTop: 22,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          borderRadius: 999,
          background: "rgba(140,82,242,.08)",
          color: SHELL.violet,
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: SHELL.teal,
            boxShadow: `0 0 0 4px rgba(46,184,200,.2)`,
            display: "inline-block",
          }}
        />
        Listening for live session…
      </div>
    </div>
  );

  return (
    <div style={shellStyle}>
      <BackToHubButton />
      {!sessionReady ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: SHELL.muted,
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          Connecting to Signal Ops...
        </div>
      ) : !inLivePlay ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          {waitingCard}
        </div>
      ) : (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {liveBanner && (
            <div
              style={{
                position: "absolute",
                top: 14,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 20,
                maxWidth: "min(720px, 70vw)",
                background: "rgba(255,255,255,.92)",
                border: `1px solid ${SHELL.border}`,
                borderRadius: 999,
                padding: "8px 16px",
                color: SHELL.text,
                fontSize: 12.5,
                fontWeight: 600,
                boxShadow: "0 6px 20px rgba(31,42,68,.12)",
                display: "flex",
                alignItems: "center",
                gap: 10,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                pointerEvents: "none",
              }}
            >
              <span style={{ color: SHELL.violet, fontWeight: 800, letterSpacing: 0.4 }}>LIVE</span>
              <span style={{ color: SHELL.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {liveBanner}
              </span>
            </div>
          )}
          <iframe
            ref={iframeRef}
            src="/games/signal-defense-3-6b-gameplay-v4.html?live=1"
            title={caseTitle || "Signal Defense"}
            onLoad={wireWidget}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
              background: "#06182e",
            }}
            allow="fullscreen"
          />
        </div>
      )}
    </div>
  );
}
