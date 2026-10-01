"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import SamStage from "../SamStage";

// Shared scene stage for activity redesigns (Oct 1, 2026). Same approach as
// ClearDecode's Relic Lab stage: every screen is laid out on a fixed
// 1600 x 900 stage over Emily's background plate (public/scenes/...), and
// the whole stage scales to fit the window. Live text, buttons and S.A.M.
// sit on top with <At>, in stage pixels, so they line up with the art on
// any Chromebook or laptop.
//
// Plates are 1672 x 941 (16:9). A point measured on a plate at (px, py)
// lands on the stage at (px * 0.957, py * 0.957).
//
// Usage:
//   <SceneStage bg="/scenes/signal-check/01-transmission.webp">
//     <At x={400} y={120} w={800} h={300}><Glass>…</Glass></At>
//     <SamCorner skin={samSkin} line="Read carefully." />
//   </SceneStage>
export const W = 1600;
export const H = 900;
const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

export const INK = {
  text: "#13254a", navy: "#0f2350", muted: "#5b6b8d", soft: "#34466e",
  teal: "#14b8c8", tealText: "#0a8597", blue: "#2f7de1", violet: "#6a4fe0",
  gold: "#d99a14", warn: "#c8551f", line: "#c3e6f7", line2: "#8fd0ee", bg: "#0d1b3d",
};
const GLOW = "0 0 0 3px rgba(120,214,255,0.35), 0 10px 30px rgba(15,35,80,0.25)";
export const UI = {
  glass: { background: "rgba(240,249,255,0.88)", border: "2px solid rgba(160,222,250,0.9)", borderRadius: 24, boxShadow: GLOW, backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", color: INK.text, boxSizing: "border-box" },
  navyGlass: { background: "rgba(13,33,72,0.88)", border: "2px solid rgba(120,214,255,0.8)", borderRadius: 22, boxShadow: "0 0 22px rgba(80,200,255,0.4)", color: "#fff", boxSizing: "border-box" },
  primary: { minHeight: 60, padding: "0 34px", border: "2px solid rgba(255,255,255,0.7)", borderRadius: 18, background: "linear-gradient(180deg, #3aa0f2, #1f6fd1)", color: "#fff", font: "700 22px Poppins, sans-serif", cursor: "pointer", boxShadow: "0 0 0 3px rgba(58,160,242,0.35), 0 6px 18px rgba(31,111,209,0.35)" },
  secondary: { minHeight: 52, padding: "0 22px", border: `2px solid ${INK.line2}`, borderRadius: 16, background: "#ffffff", color: INK.navy, font: "700 17px Inter, sans-serif", cursor: "pointer", boxShadow: "0 4px 12px rgba(15,35,80,0.12)" },
  eyebrow: { fontSize: 13, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: INK.tealText },
  h1: { margin: 0, font: "800 34px Poppins, sans-serif", color: INK.navy },
  h2: { margin: 0, font: "700 26px Poppins, sans-serif", color: INK.navy },
  p: { margin: 0, fontSize: 18, color: INK.soft, lineHeight: 1.5 },
};

// A positioned box on the stage (stage pixels).
export function At({ x, y, w, h, style = {}, children, scroll = false }) {
  return <div style={{ position: "absolute", left: x, top: y, width: w, height: h, overflow: scroll ? "auto" : undefined, ...style }}>{children}</div>;
}
export function Glass({ children, style = {}, navy = false, scroll = false }) {
  return <div style={{ ...(navy ? UI.navyGlass : UI.glass), height: "100%", overflow: scroll ? "auto" : "hidden", ...style }}>{children}</div>;
}

// The student's own S.A.M. with a speech bubble (bubble left or right).
export function SamCorner({ skin, line, state = "idle", size = 140, side = "left", x, y, maxWidth = 300 }) {
  const bubble = line ? (
    <div style={{ maxWidth, background: "#ffffff", border: "2px solid #bfe6f8", borderRadius: 18, padding: "10px 16px", boxShadow: "0 8px 22px rgba(15,35,80,0.2)" }}>
      <div style={{ font: "800 13px Poppins, sans-serif", color: INK.gold, letterSpacing: "0.04em" }}>S.A.M.</div>
      <div style={{ font: "600 17px/1.3 Inter, sans-serif", color: INK.navy }}>{line}</div>
    </div>
  ) : null;
  return (
    <div style={{ position: "absolute", left: x, top: y, display: "flex", alignItems: "center", gap: 0, flexDirection: side === "left" ? "row" : "row-reverse" }}>
      {bubble}
      <div style={{ margin: side === "left" ? "0 0 0 -10px" : "0 -10px 0 0" }}><SamStage skinKey={skin} size={size} state={state} /></div>
    </div>
  );
}

// The stage. `fixed` (default) fills the window like a game screen.
export default function SceneStage({ bg, children, fixed = true, dim = 0 }) {
  const [scale, setScale] = useState(0);
  useIso(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return (
    <main style={{ position: fixed ? "fixed" : "relative", inset: 0, overflow: "hidden", background: INK.bg, fontFamily: "Inter, sans-serif", color: INK.text, minHeight: fixed ? undefined : "100vh" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: -40, backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(22px) brightness(0.8)" }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: W, height: H, marginLeft: -W / 2, marginTop: -H / 2, transform: `scale(${scale || 0.0001})`, opacity: scale ? 1 : 0, transformOrigin: "center center" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `url(${bg})`, backgroundSize: "100% 100%" }} />
        {dim > 0 && <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `rgba(10,20,45,${dim})` }} />}
        {children}
      </div>
    </main>
  );
}
