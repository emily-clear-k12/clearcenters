"use client";
import React from "react";
import Link from "next/link";
import { S, C, Sam } from "./ui";

// ClearDecode student map (functional version; the redesign comes later).
// Planets in a row, each with its ruins. No numbers, levels or grades.
export default function CodeHome({ firstName, view }) {
  const { planets, current, session, doneToday, ready, relics, ruinName, pieces } = view;
  return (
    <main style={S.page}>
      <div style={S.wrap}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted }}>ClearDecode</div>
            <div style={{ font: "800 26px Poppins, sans-serif" }}>Relic Lab</div>
          </div>
          <Link href="/home" style={{ ...S.secondary, display: "inline-flex", alignItems: "center", textDecoration: "none" }}>Home</Link>
        </header>

        <section style={{ ...S.panel, display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, alignItems: "center" }}>
          <div>
            <div style={S.eyebrow}>Today&apos;s expedition</div>
            <h1 style={S.h1}>{ruinName}</h1>
            <p style={S.p}>
              {!ready ? "This part of the ruins is still being mapped. Check back soon, or ask your teacher."
                : doneToday ? "You finished today's session. The next one opens tomorrow."
                : session.kind === "vault" ? "The vault is ready. Crack its seals to earn this ruin's relic."
                : `Chamber ${session.n}. About 20 minutes.${session.retryPrep ? " One more practice run before the vault." : ""}`}
            </p>
            {ready && !doneToday && (
              <Link href="/decode/play" style={{ ...S.primary, display: "inline-flex", alignItems: "center", textDecoration: "none", marginTop: 14 }}>
                {session.kind === "vault" ? "Enter the vault" : `Enter chamber ${session.n}`}
              </Link>
            )}
          </div>
          <div>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>Relic pieces from this ruin</div>
            <div style={{ display: "flex", gap: 8 }}>
              {[0, 1, 2, 3].map((i) => <span key={i} style={{ flex: 1, height: 14, borderRadius: 999, background: i < pieces ? `linear-gradient(90deg, ${C.violet}, ${C.teal})` : "#262c68" }} />)}
            </div>
          </div>
        </section>

        <section style={{ ...S.panel }}>
          <div style={S.eyebrow}>The ruins</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12, marginTop: 14 }}>
            {planets.map((p) => (
              <div key={p.id} style={{ borderRadius: 16, padding: 14, background: p.here ? "#1d2358" : "#121640", border: `1px solid ${p.here ? C.teal : C.line}` }}>
                <div style={{ font: "700 15px Poppins, sans-serif", marginBottom: 10, color: p.here ? C.tealText : C.text }}>{p.name}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.ruins.map((r) => (
                    <span key={r.id} title={r.state === "done" ? "Explored" : r.state === "here" ? "You are here" : "Not explored yet"}
                      style={{ width: 22, height: 22, borderRadius: "50%", ...(r.state === "done" ? { background: C.teal } : r.state === "here" ? { background: "#1b2052", border: `3px solid ${C.teal}`, boxShadow: "0 0 14px rgba(47,212,200,0.6)" } : { background: "transparent", border: `2px dashed ${C.line2}` }) }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={S.panel}>
          <div style={S.eyebrow}>Relic case</div>
          {relics.length === 0 ? <p style={S.p}>Crack a ruin&apos;s vault to put its relic here.</p> : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginTop: 12 }}>
              {relics.map((r) => (
                <div key={r.id} style={{ borderRadius: 14, padding: 14, background: "#1d2358", border: "1px solid #4a52a8" }}>
                  <div style={{ font: "700 16px Poppins, sans-serif" }}>{r.name}</div>
                  <div style={{ fontSize: 13, color: C.soft, marginTop: 4 }}>{r.caption}</div>
                </div>
              ))}
            </div>
          )}
        </section>
        <Sam line={`Welcome back${firstName ? `, ${firstName}` : ""}. The builders left their code on every gate.`} />
      </div>
    </main>
  );
}
