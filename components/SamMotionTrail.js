"use client";

import { useEffect, useRef, useState } from "react";

// Sept 12, 2026 — a sparkle trail that follows S.A.M.'s own body while it
// flies between spots on Home, instead of the mouse cursor SamTrail.js
// already follows. Emily's ask: "when SAM is floating we should have the
// tail follow it too." Same exact spark-particle trick as SamTrail (small
// colored divs that fade+shrink over ~650ms, no image asset), just sourced
// from `targetRef`'s live position via requestAnimationFrame instead of a
// mousemove listener — a CSS-transitioned element's getBoundingClientRect()
// reflects its true on-screen position at any sampled instant, so this
// reads the same "where is it right now" info the browser is already
// computing for the glide.
//
// Reuses the equipped world trail's own color palette (equippedTrailColors
// in HomeClient.js) so it's the same earned cosmetic, not a second
// unrelated effect — `active` should be true only while S.A.M. is actually
// mid-flight AND a trail is equipped, same "only show it if it's earned"
// rule SamTrail already follows.
export default function SamMotionTrail({ targetRef, active, colors }) {
  const [sparks, setSparks] = useState([]);
  const rafRef = useRef(null);
  const lastRef = useRef(0);

  useEffect(() => {
    if (!active || !targetRef?.current || !colors || colors.length === 0) return undefined;

    function tick() {
      const el = targetRef.current;
      if (el) {
        const now = Date.now();
        if (now - lastRef.current >= 55) {
          lastRef.current = now;
          const rect = el.getBoundingClientRect();
          // Spawn near S.A.M.'s "feet" (80% down its box) rather than dead
          // center, so the trail reads as coming from the platform it's
          // standing/floating on, not from its face.
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height * 0.8;
          const id = Math.random().toString(36).slice(2);
          const size = 6 + Math.random() * 6;
          const color = colors[Math.floor(Math.random() * colors.length)];
          setSparks((prev) => [...prev, { id, x: cx - size / 2, y: cy - size / 2, size, color }]);
          setTimeout(() => setSparks((prev) => prev.filter((p) => p.id !== id)), 650);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, targetRef, colors]);

  if (!active || !colors || colors.length === 0) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 4, pointerEvents: "none" }}>
      <style>{`@keyframes sam-motion-trail-fade { from { opacity: .85; transform: scale(1); } to { opacity: 0; transform: scale(.35); } }`}</style>
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
            animation: "sam-motion-trail-fade 650ms ease-out forwards",
          }}
        />
      ))}
    </div>
  );
}
