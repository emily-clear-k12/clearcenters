"use client";

import React, { useRef } from "react";
import BackToHubButton from "../../../components/BackToHubButton";

// Sept 11, 2026 — first real wiring of Signal Ops' Signal Defense mode into
// the app, per Emily's call to get it live/clickable before the full
// integration (live multiplayer sync, dynamic question-bank loading by
// standard, roster/assignment hookup, persistence) is built. Same embedding
// pattern FrequencyRushClient.js already established for Asteroid Run: the
// widget is someone else's finished, already-tested build
// (public/games/signal-defense-3-6b-gameplay-v4.html) — this wrapper just
// gives it the app's shell (back button) and drops it in an iframe. Nothing
// here calls window.SignalDefense.setQuestionBank() yet — the widget's own
// hardcoded 3.6B, 25-question bank runs as-is, exactly like the standalone
// prototype Emily reviewed. No submit/session wiring either: per the design
// doc (FrequencyRush_Digital_Design_v1.md §2.19b), this prototype has no
// data persistence yet — that's real integration work for a later pass, not
// this "make it reachable and playable" step.
export default function SignalDefenseClient({ caseTitle }) {
  const iframeRef = useRef(null);

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
          style={{ width: "100%", maxWidth: 1320, height: "88vh", minHeight: 640, border: "none", borderRadius: 16, display: "block" }}
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
