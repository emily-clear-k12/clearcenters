"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import BackToHubButton from "../../../components/BackToHubButton";

// Sept 9, 2026 — Asteroid Run now embeds the "Pilot Edition" widget Emily's
// game generator produced (public/games/asteroid-run.html) instead of the
// from-scratch React canvas this file used to be. That file is a genuinely
// complete, polished, accessible standalone game — this wrapper's only job
// is handing it THIS student's real word bank + real Outpost standing, and
// reporting what it did back to our real start/submit routes. The widget
// itself is never edited; everything below just drives its exposed
// window.AsteroidRun API (setWordBank / setOutpostTotal / onComplete).
//
// One real architectural wrinkle from embedding someone else's finished
// game rather than building the loop ourselves: the widget's own recap
// screen has its own "Play Again" button, which restarts a run directly
// inside the iframe — we never see that click. So instead of holding one
// sessionId for this whole page visit (like the old client did), a fresh
// session row is minted right before EVERY submit, including the first —
// see mintSession() below. That keeps every real run backed by its own
// row, exactly matching how many times the student actually flew, with no
// "this session already finished" conflict on a replay.
//
// See app/api/frequency-rush/submit/route.js for the one real grading
// trade-off this embedding creates: the widget builds its own round order
// internally, so grading validates each answer's word against the real
// unit word list rather than a pre-fixed server round order.
export default function FrequencyRushClient({ assignmentId, caseTitle }) {
  const [phase, setPhase] = useState("loading"); // loading | ready | error
  const [errorMsg, setErrorMsg] = useState(null);
  const [words, setWords] = useState(null);
  const [outpostResources, setOutpostResources] = useState(0);

  const iframeRef = useRef(null);
  const pendingSessionIdRef = useRef(null); // sessionId reserved for the NEXT completion to submit against

  // Fetches session info purely to (a) get this unit's real word bank +
  // this student's current Outpost total once, to configure the widget,
  // and (b) mint a fresh session row to submit the next completed run
  // against. Every call creates one new frequency_rush_sessions row —
  // same as the old client did on every "Fly Again," just moved to fire
  // right before a submit instead of right before a launch, since that's
  // the only moment this wrapper can reliably hook into.
  const mintSession = useCallback(async () => {
    const res = await fetch("/api/frequency-rush/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignmentId, gameMode: "asteroid_run" }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Couldn't start the run.");
    return data;
  }, [assignmentId]);

  const initialize = useCallback(async () => {
    setPhase("loading");
    setErrorMsg(null);
    try {
      const data = await mintSession();
      if (!data.words || data.words.length < 4) {
        throw new Error("This unit needs at least 4 vocabulary words loaded before Asteroid Run can fly it.");
      }
      setWords(data.words);
      setOutpostResources(data.outpost ? data.outpost.resources : 0);
      pendingSessionIdRef.current = data.sessionId;
      setPhase("ready");
    } catch (err) {
      setErrorMsg(err.message);
      setPhase("error");
    }
  }, [mintSession]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const submitRun = useCallback(async (result) => {
    // A completion fired before we had a reserved session (shouldn't
    // normally happen — configure() below only succeeds once one exists —
    // but never silently drop a finished run over it either).
    let thisSessionId = pendingSessionIdRef.current;
    if (!thisSessionId) {
      try {
        const data = await mintSession();
        thisSessionId = data.sessionId;
      } catch (err) {
        console.error("Frequency Rush: couldn't reserve a session to save this run:", err);
        return;
      }
    }
    pendingSessionIdRef.current = null;

    try {
      const res = await fetch("/api/frequency-rush/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: thisSessionId,
          endedReason: result.reason,
          fuelBonus: result.fuelBonus,
          answers: (result.answers || []).map((a) => ({
            wordId: a.wordId,
            chosenWordId: a.choiceId,
            responseTimeMs: a.responseTimeMs,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Couldn't save this run.");

      // Sync the widget's own (locally-computed) Outpost total with the
      // real, server-banked figure, in case they drifted.
      const win = iframeRef.current?.contentWindow;
      if (win && win.AsteroidRun && data.outpost) {
        try { win.AsteroidRun.setOutpostTotal(data.outpost.resources); } catch (err) { /* widget mid-flight already on a new run — fine, next completion re-syncs */ }
      }
    } catch (err) {
      // The widget already shows the student their own local recap
      // regardless — logging here rather than yanking them out of a
      // finished run over a network hiccup.
      console.error("Frequency Rush submit failed:", err);
    }

    // Reserve the NEXT session now, so if the student clicks the widget's
    // own "Play Again" this same tick, a session is already waiting.
    try {
      const next = await mintSession();
      pendingSessionIdRef.current = next.sessionId;
    } catch (err) {
      // Reserved lazily at the top of submitRun itself if this didn't land in time.
    }
  }, [mintSession]);

  // Wires the widget's window.AsteroidRun API to this student's real data.
  // Safe to call more than once — setWordBank/setOutpostTotal/onComplete
  // are all idempotent from the widget's own intro/recap screen.
  const wireWidget = useCallback(() => {
    const win = iframeRef.current?.contentWindow;
    if (!win || !win.AsteroidRun || !words) return;
    try {
      win.AsteroidRun.setWordBank(words);
      win.AsteroidRun.setOutpostTotal(outpostResources);
      win.AsteroidRun.onComplete((result) => { submitRun(result); });
    } catch (err) {
      // Only throws if the widget isn't on its intro/recap screen yet —
      // a genuine race on first load; the iframe's own load event retries
      // this right after.
    }
  }, [words, outpostResources, submitRun]);

  useEffect(() => {
    if (phase === "ready") wireWidget();
  }, [phase, wireWidget]);

  if (phase === "loading") {
    return (
      <Shell>
        <p style={{ color: "#fff", opacity: 0.8 }}>Prepping the ship…</p>
      </Shell>
    );
  }

  if (phase === "error") {
    return (
      <Shell>
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <p style={{ color: "#fff", marginBottom: 16 }}>{errorMsg || "Something went wrong."}</p>
          <button onClick={initialize} style={buttonStyle()}>Try Again</button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell wide>
      <iframe
        ref={iframeRef}
        src="/games/asteroid-run.html"
        title={caseTitle || "Asteroid Run"}
        onLoad={wireWidget}
        style={{ width: "100%", maxWidth: 1320, height: "88vh", minHeight: 640, border: "none", borderRadius: 16, display: "block" }}
        allow="fullscreen"
      />
    </Shell>
  );
}

function Shell({ children, wide }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 20% 20%, #16243F 0%, #0D1B2A 45%, #060B16 100%)",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: wide ? "flex-start" : "center",
      padding: 24,
      position: "relative",
    }}>
      <BackToHubButton />
      <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: wide ? 48 : 0 }}>
        {children}
      </div>
    </div>
  );
}

function buttonStyle() {
  return { background: "#7B5DFF", color: "#fff", border: "none", borderRadius: 999, padding: "12px 28px", fontWeight: 700, fontSize: 14.5, cursor: "pointer" };
}
