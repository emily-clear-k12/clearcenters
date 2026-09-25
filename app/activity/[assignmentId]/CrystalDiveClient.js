"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import BackToHubButton from "../../../components/BackToHubButton";

export default function CrystalDiveClient({ assignmentId, caseTitle }) {
  const [phase, setPhase] = useState("loading");
  const [error, setError] = useState("");
  const [bank, setBank] = useState(null);
  const [settings, setSettings] = useState({ sessionMinutes: 10, questionSeconds: 0 });
  const iframeRef = useRef(null);
  const sessionRef = useRef(null);
  const preparingRef = useRef(null);

  const startSession = useCallback(async () => {
    const response = await fetch("/api/frequency-rush/start", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignmentId, gameMode: "crystal_dive" }),
    });
    const data = await response.json();
    if (!response.ok) throw Error(data.error || "Could not start Crystal Dive.");
    if (data.gameSkin !== "crystal_dive") throw Error("This assignment uses a different game.");
    return data;
  }, [assignmentId]);

  const initialize = useCallback(async () => {
    setPhase("loading"); setError("");
    try {
      const data = await startSession();
      const nextBank = { words: data.words || [], sortBins: data.sortBins || [], classifications: data.classifications || [] };
      if (!(nextBank.words.length >= 4 || nextBank.sortBins.length || nextBank.classifications.length)) throw Error("This assignment needs a question bank before Crystal Dive can start.");
      sessionRef.current = data.sessionId;
      setSettings({ sessionMinutes: data.sessionMinutes || 10, questionSeconds: data.questionSeconds || 0 });
      setBank(nextBank); setPhase("ready");
    } catch (cause) { setError(cause.message); setPhase("error"); }
  }, [startSession]);

  useEffect(() => { initialize(); }, [initialize]);

  const prepareAward = useCallback(async (run) => {
    if (preparingRef.current) return preparingRef.current;
    const request = (async () => {
      if (!sessionRef.current) {
        const next = await startSession();
        sessionRef.current = next.sessionId;
      }
      const response = await fetch("/api/crystal-dive/submit", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionRef.current, ...run }),
      });
      const data = await response.json();
      if (!response.ok) throw Error(data.error || "Could not save the run. Please try again.");
      return data;
    })();
    preparingRef.current = request;
    try { return await request; } finally { preparingRef.current = null; }
  }, [startSession]);

  const completed = useCallback(async () => {
    // The server committed this run before the wheel appeared. Reserve a
    // different session for the iframe's own Dive again button.
    sessionRef.current = null;
    try { const next = await startSession(); sessionRef.current = next.sessionId; }
    catch (cause) { console.error("Crystal Dive: next session will be reserved when the next run ends.", cause); }
  }, [startSession]);

  const wire = useCallback(() => {
    const game = iframeRef.current?.contentWindow?.CrystalDive;
    if (!game || !bank) return;
    try {
      game.setQuestionBank(bank);
      game.configure(settings);
      game.onPrepare(prepareAward);
      game.onComplete(completed);
    } catch (cause) { console.error("Crystal Dive setup failed:", cause); }
  }, [bank, settings, prepareAward, completed]);

  useEffect(() => { if (phase === "ready") wire(); }, [phase, wire]);

  return <div style={{ minHeight: "100vh", padding: "70px 20px 20px", background: "#10283d", color: "white", textAlign: "center" }}>
    <BackToHubButton />
    {phase === "loading" && <p>Preparing the Solara dig…</p>}
    {phase === "error" && <div role="alert"><p>{error}</p><button onClick={initialize}>Try again</button></div>}
    {phase === "ready" && <iframe ref={iframeRef} src="/games/crystal-dive-prototype.html" title={caseTitle || "Crystal Dive"} onLoad={wire} style={{ width: "100%", maxWidth: 1320, height: "88vh", minHeight: 640, border: 0, borderRadius: 18 }} />}
  </div>;
}
