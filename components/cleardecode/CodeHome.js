"use client";
import React, { useState } from "react";
import Link from "next/link";
import { S, C } from "./ui";
import Stage, { At, PlanetOrb } from "./Stage";

// ClearDecode home: the Relic Lab star chart (redesign, Sept 30, 2026).
// Left: today's expedition. Right: a holographic star chart with all 11
// planets on one path. No numbers, levels or grades anywhere.

// Planet positions inside the star chart (chart-local pixels, 910 x 690).
const SPOTS = [
  [95, 175], [235, 120], [380, 165], [520, 115], [665, 160], [800, 235],
  [770, 470], [625, 535], [470, 480], [315, 540], [150, 470],
];

export default function CodeHome({ firstName, view, skin }) {
  const { planets, session, doneToday, ready, relics, ruinName, pieces, planetName, codeLabel, currentPlanet, keeper } = view;
  const [caseOpen, setCaseOpen] = useState(false);
  const [page, setPage] = useState(0);
  const status = keeper ? (doneToday ? "Keeper mission done for today. The archive is safe." : "You can read the builders' code. A short keeper mission keeps every code sharp.")
    : !ready ? "This part of the ruins is still being mapped. Ask your teacher."
    : doneToday ? "You finished today's session. The next one opens tomorrow."
    : session.kind === "vault" ? "The vault is ready. Crack its seals to earn this ruin's relic."
    : `${session.retryPrep ? "One more practice run before the vault. " : ""}Hear, read, and build words with ${codeLabel}.`;
  const path = SPOTS.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  return (
    <Stage scene="map" exit={{ href: "/home", label: "Back to Home" }} sam={{ skin, line: doneToday ? `Good work today${firstName ? `, ${firstName}` : ""}.` : keeper ? "The archive needs its keeper." : `Ready for ${ruinName}?`, state: "idle" }}>
      {/* Today's expedition */}
      <At x={50} y={150} w={570} h={660}>
        <div style={{ ...S.glass, background: "rgba(247,252,255,0.95)", height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 24px", background: "linear-gradient(90deg, #0f3a78, #1468b8)", color: "#fff", font: "800 22px Poppins, sans-serif", letterSpacing: "0.06em" }}>TODAY&apos;S EXPEDITION</div>
          <div style={{ padding: "20px 24px", display: "flex", gap: 18, alignItems: "center", borderBottom: "2px solid #d9eefa" }}>
            <PlanetOrb id={currentPlanet} size={110} glow />
            <div>
              <div style={{ font: "700 18px Inter, sans-serif", color: C.muted }}>{planetName}</div>
              <div style={{ font: "800 32px/1.1 Poppins, sans-serif", color: C.navy }}>{ruinName}</div>
              <span style={{ display: "inline-block", marginTop: 8, padding: "4px 14px", borderRadius: 10, background: "#e3f3ff", color: C.blue, font: "800 20px Inter, sans-serif" }}>{codeLabel}</span>
            </div>
          </div>
          <div style={{ padding: "18px 24px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
            <div style={{ font: "800 30px Poppins, sans-serif", color: C.navy }}>{keeper ? "Keeper mission" : !ready ? "Uncharted" : doneToday ? "Done for today" : session.kind === "vault" ? "The vault" : `Chamber ${session.n}`}</div>
            <div style={{ font: "600 20px/1.4 Inter, sans-serif", color: C.soft }}>{status}</div>
            {ready && !doneToday && <div style={{ display: "flex", alignItems: "center", gap: 8, font: "600 18px Inter, sans-serif", color: C.soft }}>⏱ About {keeper ? 10 : 20} minutes</div>}
            {ready && !doneToday && (
              <Link href="/decode/play" style={{ ...S.primary, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", minHeight: 76, fontSize: 30, marginTop: 4 }}>
                {keeper ? "Start keeper mission →" : session.kind === "vault" ? "Enter the vault →" : `Enter Chamber ${session.n} →`}
              </Link>
            )}
            <div style={{ marginTop: "auto", padding: "14px 18px", borderRadius: 18, background: "#eef6fb", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ flex: 1, visibility: keeper ? "hidden" : "visible" }}>
                <div style={{ font: "700 18px Inter, sans-serif", color: C.navy, marginBottom: 8 }}>{pieces} of 4 relic pieces</div>
                <div style={{ display: "flex", gap: 10 }}>
                  {[0, 1, 2, 3].map((i) => <div key={i} style={{ width: 54, height: 54, borderRadius: 12, border: "3px solid #bfdcef", background: i < pieces ? "linear-gradient(135deg, #ffd765, #d99a14)" : "#fff", boxShadow: i < pieces ? "0 0 12px rgba(255,200,60,0.7)" : "none" }} />)}
                </div>
              </div>
              <button type="button" style={{ ...S.secondary, minHeight: 64 }} onClick={() => setCaseOpen(true)}>Relic case ({relics.length})</button>
            </div>
          </div>
        </div>
      </At>

      {/* Star chart */}
      <At x={660} y={150} w={910} h={690}>
        <div style={{ position: "relative", height: "100%", borderRadius: 30, background: "rgba(8,24,64,0.55)", border: "2px solid rgba(120,214,255,0.7)", boxShadow: "0 0 30px rgba(80,200,255,0.35), inset 0 0 60px rgba(80,200,255,0.12)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 26, top: 18, font: "800 18px Poppins, sans-serif", letterSpacing: "0.14em", color: "#9fe9ff" }}>STAR CHART</div>
          <svg width="910" height="690" style={{ position: "absolute", inset: 0 }} aria-hidden="true">
            <path d={path} fill="none" stroke="rgba(140,230,255,0.75)" strokeWidth="4" strokeDasharray="4 12" strokeLinecap="round" />
          </svg>
          {planets.map((p, i) => {
            const [x, y] = SPOTS[i] || [0, 0];
            const done = p.ruins.every((r) => r.state === "done");
            const locked = !p.here && !done;
            const size = p.here ? 140 : 104;
            return (
              <div key={p.id} style={{ position: "absolute", left: x - 90, top: y - size / 2 - 20, width: 180, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textAlign: "center" }}>
                <span style={{ width: 38, height: 38, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", font: "800 19px Poppins, sans-serif", color: "#fff", background: p.here ? "#14a9d6" : done ? "#20b07a" : "rgba(20,40,80,0.9)", border: "2px solid rgba(255,255,255,0.85)", boxShadow: p.here ? "0 0 14px rgba(80,220,255,0.9)" : "none" }}>{done ? "✓" : p.id}</span>
                <PlanetOrb id={p.id} size={size} dim={locked} glow={p.here} />
                <div style={{ font: `800 ${p.here ? 21 : 17}px/1.15 Poppins, sans-serif`, color: locked ? "#9fb3d6" : "#fff", textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}>{p.name}</div>
                <div style={{ font: "700 14px Inter, sans-serif", color: p.here ? "#7ff0ff" : "#b8c9e6", textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}>{p.skill}</div>
                {p.here && (
                  <div style={{ display: "flex", gap: 5 }}>
                    {p.ruins.map((r) => <span key={r.id} style={{ width: 12, height: 12, borderRadius: "50%", ...(r.state === "done" ? { background: "#4fe3ff" } : r.state === "here" ? { background: "#fff", boxShadow: "0 0 8px #4fe3ff" } : { border: "2px dashed rgba(180,220,255,0.7)" }) }} />)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </At>

      {caseOpen && (
        <At x={0} y={0} w={1600} h={900} style={{ zIndex: 5 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/decode/scenes/case.webp)", backgroundSize: "100% 100%" }} />
          <div style={{ position: "absolute", left: 40, top: 26 }}><div style={{ ...S.glass, padding: "12px 22px", font: "800 30px Poppins, sans-serif", color: C.navy }}>Relic case · {relics.length} {relics.length === 1 ? "relic" : "relics"}</div></div>
          {/* Shelves: top row y 185-355, bottom row y 410-525; columns x 415-675, 685-925, 935-1185 */}
          {relics.length === 0 && <div style={{ position: "absolute", left: 420, top: 240, width: 760, textAlign: "center", font: "700 26px Poppins, sans-serif", color: C.navy }}>Crack a ruin&apos;s vault to put its relic here.</div>}
          {relics.slice(page * 6, page * 6 + 6).map((r, i) => {
            const col = [[415, 260], [685, 240], [935, 250]][i % 3];
            const top = i < 3 ? 200 : 412;
            const h = i < 3 ? 140 : 104;
            return (
              <div key={r.id} title={r.caption} style={{ position: "absolute", left: col[0] + 8, top, width: col[1] - 16, height: h, borderRadius: 16, background: "linear-gradient(180deg, rgba(255,250,235,0.95), rgba(255,236,190,0.95))", border: "3px solid #e3b44a", boxShadow: "0 0 20px rgba(255,200,80,0.7)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 8, boxSizing: "border-box" }}>
                <div style={{ font: "800 20px/1.15 Poppins, sans-serif", color: "#5a3b00" }}>{r.name}</div>
                {i < 3 && <div style={{ font: "600 13px/1.3 Inter, sans-serif", color: "#6b5a3a", marginTop: 6 }}>{r.caption}</div>}
              </div>
            );
          })}
          <div style={{ position: "absolute", left: 420, top: 640, width: 760, display: "flex", justifyContent: "center", gap: 16 }}>
            {page > 0 && <button type="button" style={S.secondary} onClick={() => setPage(page - 1)}>← Earlier relics</button>}
            <button type="button" style={S.primary} onClick={() => { setCaseOpen(false); setPage(0); }}>Close the case</button>
            {(page + 1) * 6 < relics.length && <button type="button" style={S.secondary} onClick={() => setPage(page + 1)}>More relics →</button>}
          </div>
        </At>
      )}
    </Stage>
  );
}
