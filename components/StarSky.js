"use client";

import React, { useMemo } from "react";
import { starDotStyle } from "../lib/starChartLayout";

// Sept 24, 2026 — the Star Chart sky, shared by the teacher page and the
// student's My Sky. Draws what lib/starChartLayout.js laid out: faint star
// dust, the lines of each constellation, a button per star, and a label per
// constellation. Words are shown only for the selected constellation, so the
// sky stays calm.
//
// props:
//   layout          { constellations, height } from layoutSky()
//   width           sky width in px
//   selectedCase    caseStandard of the open constellation (or null)
//   selectedKey     key of the selected star (or null)
//   onPickCons(caseStandard)
//   onPickStar(caseStandard, starKey)
//   twinkleKeys     Set of "caseStandard|key" to twinkle (newly lit)
//   ariaFor         (caseStandard, star) => what a screen reader says for a star
export default function StarSky({ layout, width, selectedCase, selectedKey, onPickCons, onPickStar, twinkleKeys, ariaFor }) {
  const height = Math.max(260, layout.height);
  const dust = useMemo(() => {
    const out = [];
    const n = Math.round((width * height) / 9000);
    for (let i = 0; i < n; i++) {
      out.push({ x: (i * 157) % width, y: (i * 89 + (i % 7) * 31) % height, o: 0.12 + ((i * 37) % 30) / 100 });
    }
    return out;
  }, [width, height]);

  return (
    <div style={{ position: "relative", width, height }}>
      <style>{`
        .cc-star-btn{position:absolute;width:30px;height:30px;padding:0;margin:0;border:none;background:transparent;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center}
        .cc-star-btn:focus-visible{outline:2px solid #fff;outline-offset:2px}
        .cc-cons-btn{position:absolute;border:none;background:transparent;cursor:pointer;font:inherit;padding:4px 8px;border-radius:8px;text-align:left;max-width:280px}
        .cc-cons-btn:hover{background:rgba(255,255,255,.08)}
        .cc-twinkle{animation:ccTwinkle 2.4s ease-in-out infinite}
        @keyframes ccTwinkle{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.35);opacity:.75}}
        @media (prefers-reduced-motion: reduce){.cc-twinkle{animation:none}}
      `}</style>
      {dust.map((d, i) => (
        <div key={"d" + i} style={{ position: "absolute", left: d.x, top: d.y, width: 2, height: 2, borderRadius: "50%", background: "#fff", opacity: d.o, pointerEvents: "none" }} />
      ))}
      {layout.constellations.map((c) => {
        const open = c.caseStandard === selectedCase;
        return (
          <React.Fragment key={c.caseStandard}>
            {c.lines.map((ln, i) => (
              <div key={"l" + i} style={{ position: "absolute", left: ln.x, top: ln.y, width: ln.len, height: 1, transformOrigin: "0 50%", transform: `rotate(${ln.angle}deg)`, background: open ? "rgba(210,200,255,0.45)" : "rgba(210,200,255,0.16)", pointerEvents: "none" }} />
            ))}
            {c.stars.map((s) => (
              <button
                key={s.key}
                type="button"
                className="cc-star-btn"
                aria-label={ariaFor ? ariaFor(c.caseStandard, s) : s.label}
                title={s.label}
                onClick={() => onPickStar && onPickStar(c.caseStandard, s.key)}
                style={{ left: s.x - 15, top: s.y - 15 }}
              >
                <span
                  className={twinkleKeys && twinkleKeys.has(c.caseStandard + "|" + s.key) ? "cc-twinkle" : undefined}
                  style={starDotStyle(s.band, { selected: open && s.key === selectedKey })}
                />
              </button>
            ))}
            {open && c.stars.map((s) => (
              <div key={"w" + s.key} style={{ position: "absolute", left: s.x + 12, top: s.y - 8, fontSize: 11.5, color: "#DAD6EE", whiteSpace: "nowrap", pointerEvents: "none" }}>
                {s.label}
              </div>
            ))}
            <button type="button" className="cc-cons-btn" onClick={() => onPickCons && onPickCons(c.caseStandard)} style={{ left: c.labelX - 8, top: c.labelY }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: open ? "#FFFFFF" : "#C9C4E0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.title}</div>
              <div style={{ fontSize: 12, color: "#A9A3C6" }}>
                {c.lit} of {c.total} at 80%+{c.more ? ` · ${c.more} more in the list` : ""}
              </div>
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}
