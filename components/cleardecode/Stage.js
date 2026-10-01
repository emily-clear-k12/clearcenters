"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import SamStage from "../SamStage";
import { C } from "./ui";

// Relic Lab stage (Sept 30, 2026). Every student screen is laid out on a
// fixed 1600 x 900 stage over one of Emily's scene backgrounds, like her
// mockups, then the whole stage scales to fit the window. That keeps words
// lined up with the art (the stone wall, the door console, the vault seals)
// on any Chromebook or laptop.
export const W = 1600;
export const H = 900;
const useIso = typeof window === "undefined" ? useEffect : useLayoutEffect;

export const SCENES = {
  map: "/decode/scenes/map.webp",
  scan: "/decode/scenes/scan.webp",
  flats: "/decode/scenes/flats.webp",
  wall: "/decode/scenes/wall.webp",
  door: "/decode/scenes/door.webp",
  vault: "/decode/scenes/vault.webp",
};

export function Logo({ size = 1 }) {
  return (
    <div style={{ lineHeight: 1, userSelect: "none" }}>
      <div style={{ font: `900 ${Math.round(46 * size)}px Poppins, sans-serif`, letterSpacing: "-0.01em", filter: "drop-shadow(0 0 2px #fff) drop-shadow(0 0 10px rgba(255,255,255,0.85))" }}>
        <span style={{ color: C.navy }}>CLEAR</span><span style={{ color: "#1d86e0" }}>DECODE</span>
      </div>
      <div style={{ font: `800 ${Math.round(17 * size)}px Inter, sans-serif`, letterSpacing: "0.55em", color: C.navy, marginTop: 4, paddingLeft: 4, filter: "drop-shadow(0 0 3px #fff) drop-shadow(0 0 6px #fff)" }}>RELIC LAB</div>
    </div>
  );
}

export function SamBubble({ skin, line, state = "idle", size = 150 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      <div style={{ marginRight: -18 }}><SamStage skinKey={skin} size={size} state={state} /></div>
      {line && (
        <div style={{ position: "relative", maxWidth: 330, background: "#ffffff", border: "2px solid #bfe6f8", borderRadius: 18, padding: "12px 18px", boxShadow: "0 8px 22px rgba(15,35,80,0.2)" }}>
          <div style={{ font: "800 14px Poppins, sans-serif", color: C.gold, letterSpacing: "0.04em" }}>S.A.M.</div>
          <div style={{ font: "600 19px/1.3 Inter, sans-serif", color: C.navy }}>{line}</div>
        </div>
      )}
    </div>
  );
}

export function ExitButton({ href = "/home", label = "Save and exit" }) {
  return (
    <Link href={href} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 20px", borderRadius: 16, background: "rgba(13,33,72,0.86)", border: "2px solid rgba(120,214,255,0.7)", color: "#eaf6ff", font: "700 18px Inter, sans-serif", textDecoration: "none", boxShadow: "0 6px 16px rgba(0,0,0,0.25)" }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></svg>
      {label}
    </Link>
  );
}

// The left card: planet, ruin, today's chamber and room checklist.
export function SideCard({ meta, title, steps = [], children, width = 330 }) {
  return (
    <div style={{ width, background: "rgba(247,252,255,0.94)", border: "2px solid rgba(160,222,250,0.95)", borderRadius: 22, boxShadow: "0 0 0 3px rgba(120,214,255,0.3), 0 10px 26px rgba(15,35,80,0.25)", overflow: "hidden" }}>
      {meta && (
        <div style={{ padding: "16px 20px", background: "linear-gradient(135deg, #e6f6ff, #ffffff)", borderBottom: "2px solid #d4eefa", display: "flex", alignItems: "center", gap: 14 }}>
          <PlanetOrb id={meta.planetId} size={58} />
          <div style={{ minWidth: 0 }}>
            <div style={{ font: "700 14px Inter, sans-serif", color: C.muted }}>{meta.planetName}</div>
            <div style={{ font: "800 23px/1.15 Poppins, sans-serif", color: C.navy }}>{meta.ruinName}</div>
            <div style={{ font: "700 16px Inter, sans-serif", color: C.blue }}>{meta.codeLabel}</div>
          </div>
        </div>
      )}
      <div style={{ padding: "14px 20px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
        {title && <div style={{ font: "800 24px Poppins, sans-serif", color: C.navy }}>{title}</div>}
        {steps.map((st, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, font: `${st.state === "now" ? 800 : 600} 17px Inter, sans-serif`, color: st.state === "todo" ? "#8a98b3" : C.navy }}>
            <span style={{ width: 24, height: 24, flexShrink: 0, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", ...(st.state === "done" ? { background: "#20b07a", color: "#fff" } : st.state === "now" ? { background: "#fff", border: `3px solid ${C.teal}`, boxShadow: "0 0 10px rgba(20,184,200,0.6)" } : { background: "#fff", border: "2px solid #c6d3e6" }) }}>
              {st.state === "done" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5 9-10" /></svg>}
            </span>
            {st.label}
          </div>
        ))}
        {children}
      </div>
    </div>
  );
}

// Planet art: real art goes in /public/decode/planets/<id>.webp (see
// image-prompts/cleardecode). Until a file is listed here, a styled orb
// stands in, colored for the planet's story.
// Emily's planet art, Sept 30, 2026 (trimmed, squared, 360px WebP).
const PLANET_ART = Object.fromEntries("ABCDEFGHIJK".split("").map((k) => [k, `/decode/planets/${k}.webp`]));
const ORB = {
  A: ["#c8a46a", "#6f5a2e"], B: ["#9aa7b8", "#4a5466"], C: ["#b5e3ef", "#3f7d9a"], D: ["#f2b46b", "#8a4b2a"],
  E: ["#d8e4f0", "#7c8ea8"], F: ["#a3b6ff", "#3b4fa8"], G: ["#6fd8f0", "#1f6fa8"], H: ["#c9a0ff", "#5a3aa8"],
  I: ["#e8f6ff", "#8ab4d6"], J: ["#5a628c", "#1c2140"], K: ["#c6f3ff", "#4aa8d6"],
};
export function PlanetOrb({ id, size = 60, dim = false, glow = false }) {
  const art = PLANET_ART[id];
  const [a, b] = ORB[id] || ["#cde", "#567"];
  const look = { width: size, height: size, borderRadius: "50%", flexShrink: 0, filter: dim ? "grayscale(0.7) brightness(0.75)" : "none", boxShadow: glow ? "0 0 0 4px rgba(120,230,255,0.9), 0 0 30px rgba(80,220,255,0.9)" : "0 4px 10px rgba(0,0,0,0.25)" };
  if (art) {
    const f = [dim ? "grayscale(0.65) brightness(0.7)" : "", glow ? "drop-shadow(0 0 14px rgba(80,220,255,0.95)) drop-shadow(0 0 4px rgba(255,255,255,0.8))" : "drop-shadow(0 6px 8px rgba(0,0,0,0.35))"].filter(Boolean).join(" ");
    return <img src={art} alt="" style={{ width: size, height: size, flexShrink: 0, objectFit: "contain", filter: f }} />;
  }
  return <span aria-hidden="true" style={{ ...look, display: "inline-block", background: `radial-gradient(circle at 32% 28%, #ffffff 0%, ${a} 22%, ${b} 100%)` }} />;
}

// The stage itself.
export default function Stage({ scene = "flats", children, sam, logo = true, exit = { href: "/home", label: "Save and exit" }, side, sideTop = 130 }) {
  const [scale, setScale] = useState(0);
  useIso(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  const src = SCENES[scene] || SCENES.flats;
  return (
    <main style={{ position: "fixed", inset: 0, overflow: "hidden", background: C.bg, fontFamily: "Inter, sans-serif", color: C.text }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: -40, backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(22px) brightness(0.8)" }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: W, height: H, marginLeft: -W / 2, marginTop: -H / 2, transform: `scale(${scale || 0.0001})`, opacity: scale ? 1 : 0, transformOrigin: "center center" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: `url(${src})`, backgroundSize: "100% 100%" }} />
        {logo && <div style={{ position: "absolute", left: 40, top: 26 }}><Logo /></div>}
        {sam && <div style={{ position: "absolute", right: 30, top: 0 }}><SamBubble {...sam} /></div>}
        {side && <div style={{ position: "absolute", left: 28, top: sideTop }}>{side}</div>}
        {exit && <div style={{ position: "absolute", left: 28, bottom: 24 }}><ExitButton {...exit} /></div>}
        {children}
      </div>
    </main>
  );
}

// A positioned box on the stage (coordinates in stage pixels).
export function At({ x, y, w, h, style = {}, children }) {
  return <div style={{ position: "absolute", left: x, top: y, width: w, height: h, ...style }}>{children}</div>;
}
