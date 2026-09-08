"use client";

import React, { useState, useEffect, useRef } from "react";

// The "in-activity acknowledgment" from Distress Call's design (§4): a
// small persistent indicator on the activity screen itself, with a brief
// pulse when a correct answer contributes to the meter — so the signal is
// felt while doing the work, not just checked later on a separate screen.
// Polls every 5s while mounted; renders nothing at all for an assignment
// that isn't flagged (the vast majority) or whose engine doesn't support a
// meter, so it's safe to drop into any engine's client unconditionally.
export default function DistressCallBadge({ assignmentId }) {
  const [progress, setProgress] = useState(null);
  const [pulse, setPulse] = useState(false);
  const lastCurrentRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let timer = null;

    async function poll() {
      try {
        const res = await fetch(`/api/distress-call/${assignmentId}`);
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        if (data.active && data.supported) {
          if (lastCurrentRef.current !== null && data.current > lastCurrentRef.current) {
            setPulse(true);
            setTimeout(() => setPulse(false), 700);
          }
          lastCurrentRef.current = data.current;
          setProgress(data);
        } else {
          setProgress(null);
        }
      } catch (err) {
        // A missed poll just means a stale badge for a few seconds — never
        // worth surfacing an error over.
      }
    }

    poll();
    timer = setInterval(poll, 5000);
    return () => { cancelled = true; clearInterval(timer); };
  }, [assignmentId]);

  if (!progress) return null;

  const pct = progress.target ? Math.min(100, Math.round((progress.current / progress.target) * 100)) : null;
  const hasReward = progress.rewardPoints > 0;

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 50,
        background: "rgba(20,16,50,.72)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: 14,
        padding: "10px 16px",
        color: "#FFFFFF",
        fontFamily: "'Inter', sans-serif",
        minWidth: 150,
        boxShadow: progress.rewardGiven ? "0 0 0 3px #FFC44D" : pulse ? "0 0 0 3px #6FD8F5" : "0 4px 14px rgba(0,0,0,.25)",
        transition: "box-shadow .3s ease",
      }}
    >
      <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, opacity: 0.7, marginBottom: 4 }}>
        📡 Active Signal
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: pct !== null ? 6 : 0 }}>
        {progress.current}{progress.target ? ` / ${progress.target}` : ""} checkpoints cleared
      </div>
      {pct !== null && (
        <div style={{ height: 5, background: "rgba(255,255,255,.2)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "#6FD8F5", transition: "width .4s ease" }} />
        </div>
      )}
      {/* The prize: shown as a preview while the class is still working
          toward it, then swaps to a one-line celebration the moment the
          server confirms points went out (progress.rewardGiven) — never
          awarded from here, this badge only ever reflects what already
          happened server-side in lib/distressCall.js. */}
      {hasReward && (
        <div style={{ fontSize: 10.5, fontWeight: 700, marginTop: 6, color: progress.rewardGiven ? "#FFC44D" : "rgba(255,255,255,.75)" }}>
          {progress.rewardGiven ? `🎉 +${progress.rewardPoints} crystal points earned!` : `💎 +${progress.rewardPoints} pts for everyone at the goal`}
        </div>
      )}
    </div>
  );
}
