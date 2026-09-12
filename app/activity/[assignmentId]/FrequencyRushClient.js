"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import BackToHubButton from "../../../components/BackToHubButton";
import { getGameSkinFile, DEFAULT_GAME_SKIN } from "../../../lib/frequencyRushSkins";

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
  // Sept 12, 2026 — Sort & Classify, plumbing-only pass: holds whatever
  // classify questions the start route found for this unit (possibly
  // none, if Emily hasn't authored/generated any for it yet — same
  // graceful-absence handling as the odd_signal_out format never getting
  // real groupings). Content itself lives in the same DB the vocabulary
  // word bank does (frequency_rush_classifications), not a separate file
  // pipeline — see lib/cases/frequency-rush.js.
  const [classifications, setClassifications] = useState([]);
  // Sept 12, 2026 — file-bank tap-the-bin sort (sort_bins) expanded per item
  // by /api/frequency-rush/start from lib/cases/frequency-rush/classify.
  const [sortBins, setSortBins] = useState([]);
  // Sept 12, 2026 — which static widget file to load into the iframe below,
  // teacher-chosen at assignment time (assignments.game_skin) and handed
  // back by /api/frequency-rush/start as `gameSkin` — see
  // lib/frequencyRushSkins.js for the full "world skins" design. Defaults
  // to Asteroid Run until the real value comes back from initialize().
  const [gameSkinFile, setGameSkinFile] = useState(getGameSkinFile(DEFAULT_GAME_SKIN));

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
      const nextWords = Array.isArray(data.words) ? data.words : [];
      const nextSortBins = Array.isArray(data.sortBins) ? data.sortBins : [];
      if (nextWords.length < 4 && nextSortBins.length < 1) {
        throw new Error("This unit needs at least 4 vocabulary words loaded before Asteroid Run can fly it.");
      }
      setWords(nextWords);
      setOutpostResources(data.outpost ? data.outpost.resources : 0);
      setClassifications(Array.isArray(data.classifications) ? data.classifications : []);
      setSortBins(nextSortBins);
      setGameSkinFile(getGameSkinFile(data.gameSkin));
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
          // Sept 9, 2026 — the "Adventure Edition" widget added 3 more
          // question formats; `type` and `choiceId` (renamed from the old
          // `chosenWordId`) now travel through so submit/route.js can grade
          // True/False correctly (its choiceId is a boolean, not a word
          // id) — see that route's comment for the full reasoning.
          // Sept 12, 2026 — sort_bins also sends itemId / questionId.
          answers: (result.answers || []).map((a) => ({
            wordId: a.wordId,
            itemId: a.itemId ?? a.questionId,
            questionId: a.questionId,
            type: a.type,
            choiceId: a.choiceId,
            correct: a.correct,
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
  // Safe to call more than once — setQuestionBank/setOutpostTotal/onComplete
  // are all idempotent from the widget's own intro/recap screen.
  const wireWidget = useCallback(() => {
    const win = iframeRef.current?.contentWindow;
    if (!win || !win.AsteroidRun || words === null) return;
    try {
      const hasVocab = words.length >= 4;
      const hasSort = sortBins.length > 0;
      const formats = [];
      if (hasVocab) formats.push("lock_signal", "true_false", "frequency_fill");
      if (hasSort) formats.push("sort_bins");
      if (!formats.length && hasSort) formats.push("sort_bins");

      // Sept 12, 2026 — switched from the old separate setWordBank() +
      // setFormats() calls to the "Adventure" build's unified
      // setQuestionBank(), which is what actually lets vocabulary AND Sort
      // & Classify content run in the SAME setup call — calling
      // setClassificationBank() on its own would wipe the word bank and
      // force classification-only mode (see its own doc comment in the
      // widget), which isn't what we want once real classify content
      // exists. setQuestionBank infers which content mode(s) to turn on
      // from what's actually non-empty, so an empty `classifications`
      // array (any unit Emily hasn't authored Sort & Classify for yet)
      // safely falls back to vocabulary-only — no separate branch needed
      // here for "has classify content or not."
      //
      // sort_bins is a tap-the-bin format (choice deck), not the multi-item
      // classification board — pass via sortBins, never as classifications.
      win.AsteroidRun.setQuestionBank({
        words: hasVocab ? words : [],
        classifications,
        sortBins: hasSort ? sortBins : [],
        // Sept 9, 2026 — "Adventure Edition": turn on the 3 vocabulary
        // formats we can support for real today. odd_signal_out is
        // deliberately left out — it needs human-curated word groupings
        // (setOddGroups) we haven't authored yet; per the handoff doc,
        // skipping setOddGroups entirely just makes the widget skip that
        // format gracefully, so leaving it out of `formats` too keeps a
        // real student from ever hitting a half-built round. Add
        // "odd_signal_out" back here once real groups exist and
        // oddGroups is passed alongside it.
        // Sept 12, 2026 — include sort_bins when file banks exist; sort-only
        // when words are missing/thin.
        formats,
      });
      win.AsteroidRun.setOutpostTotal(outpostResources);
      // Sept 9, 2026 — Emily's first live playtest feedback: the widget's
      // own default (8s of flight between each question) felt too long.
      // configure() only accepts flightSeconds 4-20 (its own validation),
      // so this is the shortest gap it supports short of the widget file
      // itself being changed. Tune this one number if it still feels off.
      win.AsteroidRun.configure({ flightSeconds: 4 });
      win.AsteroidRun.onComplete((result) => { submitRun(result); });
      hideAuthorOnlyControls(win);
    } catch (err) {
      // Only throws if the widget isn't on its intro/recap screen yet —
      // a genuine race on first load; the iframe's own load event retries
      // this right after.
    }
  }, [words, classifications, sortBins, outpostResources, submitRun]);

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
        src={gameSkinFile}
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

// Sept 9, 2026 — "Adventure Edition" added two author/QA-only controls to
// its own intro screen that have no API flag to suppress them: a "Question
// formats" checkbox panel (#format-settings) letting a player override
// which formats are active, and a "TRY ALL 4 FORMATS" button
// (#sample-mission-button) that loads fake demo content over whatever real
// setWordBank data we gave it. Neither should ever reach a real student —
// setFormats() above is how WE decide what a run tests, not the player,
// and the sample mission would silently swap in placeholder words mid-
// assignment. Rather than a one-time direct-hide (which the widget's own
// intro/recap re-render could undo on every replay), this injects a <style>
// tag straight into the iframe's document — CSS survives the widget's own
// DOM churn between runs, so this only needs to run once per iframe load.
// Wrapped in try/catch: if the widget's markup ever changes these ids,
// this silently no-ops rather than breaking anything real.
function hideAuthorOnlyControls(win) {
  try {
    const doc = win.document;
    if (!doc || doc.getElementById("cc-hide-author-controls")) return;
    const style = doc.createElement("style");
    style.id = "cc-hide-author-controls";
    style.textContent = "#format-settings, #sample-mission-button { display: none !important; }";
    doc.head.appendChild(style);
  } catch (err) {
    // Best-effort cosmetic cleanup only — never worth failing the run over.
  }
}
