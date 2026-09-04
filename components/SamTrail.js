"use client";

import { useEffect, useState } from "react";

// Sept 5, 2026 — the equipped-world-trail cosmetic, generalized from Glow
// Garden's original one-off "Bloom Trail" (a mouse-following sparkle
// effect — pure CSS/JS, no image asset at all). Any world's trail is just
// a 3-color palette (lib/worldStories.js's trailColors) fed into this same
// component, so a new world's trail costs zero new art.
//
// Scoped to Home only for this pass — mounted once in HomeClient.js, not
// in the root layout. Extending it to Missions/activities (matching
// SamStage's footprint) is a real, separate next step once this proves
// out, not something to silently do here: the root layout doesn't
// currently read student data the way every individual page does, so
// making the trail truly global is a bigger structural change than
// swapping a color palette.
export default function SamTrail({ colors, active }) {
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    if (!active || !colors || colors.length === 0) return undefined;
    let last = 0;
    function onMove(e) {
      const now = Date.now();
      if (now - last < 45) return;
      last = now;
      const id = Math.random().toString(36).slice(2);
      const size = 5 + Math.random() * 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      setSparks((prev) => [...prev, { id, x: e.clientX - size / 2, y: e.clientY - size / 2, size, color }]);
      setTimeout(() => setSparks((prev) => prev.filter((p) => p.id !== id)), 600);
    }
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, [active, colors]);

  if (!active || !colors || colors.length === 0) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 40, pointerEvents: "none" }}>
      <style>{`@keyframes sam-trail-fade { from { opacity: .85; transform: scale(1); } to { opacity: 0; transform: scale(.4); } }`}</style>
      {sparks.map((s) => (
        <div
          key={s.id}
          style={{
            position: "fixed",
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: s.color,
            boxShadow: `0 0 8px ${s.color}`,
            animation: "sam-trail-fade 550ms ease-out forwards",
          }}
        />
      ))}
    </div>
  );
}
