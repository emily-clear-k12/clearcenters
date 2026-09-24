"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import BackToHubButton from "../../components/BackToHubButton";
import StarSky from "../../components/StarSky";
import { layoutSky, starDotStyle, studentStar, BANDS } from "../../lib/starChartLayout";

// Sept 24, 2026 — the student's Star Chart ("My Sky"). It answers one
// question: what's mine to work on?
//   1. How many stars they've lit, and how many are new this week.
//   2. "Power up these 3": their weakest words, with Play buttons. Playing
//      brings them back as SECOND CHANCE (My Missed Words).
//   3. My Sky: their own stars. Stars lit this week twinkle. Tap a star to
//      see the word and what it means.
// Star colors are the same score bands teachers see (0–50 red … 90–100 blue),
// so a color means the same thing to a student as it does on a grade.
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function statusLine(st) {
  if (st.pct == null) return "Not tried yet.";
  if (st.stuck) return `${st.pct}% on your last tries. It will come back as SECOND CHANCE.`;
  if (st.pct >= 90) return `${st.pct}%. You own this one!`;
  if (st.pct >= 80) return `${st.pct}%. Lit! Keep it glowing.`;
  if (st.pct >= 70) return `${st.pct}%. Almost lit. One more good run!`;
  return `${st.pct}%. Keep practicing. You've got this.`;
}

export default function StarChartClient({ studentId, firstName, activities }) {
  const router = useRouter();
  const box = useRef(null);
  const [width, setWidth] = useState(1000);
  const [sel, setSel] = useState(null); // { caseStandard, key }

  useEffect(() => {
    if (!box.current || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const w = Math.floor(entries[0].contentRect.width) - 40;
      if (w > 200) setWidth(w);
    });
    ro.observe(box.current);
    return () => ro.disconnect();
  }, []);

  const { lit, fresh, twinkleKeys, powerUp } = useMemo(() => {
    const now = Date.now();
    let litCount = 0;
    const tw = new Set();
    const weak = [];
    activities.forEach((a) => a.stars.forEach((s) => {
      const st = studentStar(s, studentId);
      if (st.pct != null && st.pct >= 80) {
        litCount += 1;
        const at = s.litAt && s.litAt[studentId];
        if (at && now - new Date(at).getTime() < WEEK_MS) tw.add(a.caseStandard + "|" + s.key);
      }
      if (st.stuck || (st.pct != null && st.pct < 80)) weak.push({ act: a, star: s, st });
    }));
    // missed questions first, then the lowest scores
    weak.sort((x, y) => (y.st.stuck ? 1 : 0) - (x.st.stuck ? 1 : 0) || x.st.pct - y.st.pct);
    return { lit: litCount, fresh: tw.size, twinkleKeys: tw, powerUp: weak.slice(0, 3) };
  }, [activities, studentId]);

  const layout = useMemo(() => layoutSky(activities, { width, bandOf: (a, s) => studentStar(s, studentId).band }), [activities, width, studentId]);

  const selAct = sel && activities.find((a) => a.caseStandard === sel.caseStandard);
  const selStar = selAct && selAct.stars.find((s) => s.key === sel.key);
  const selSt = selStar ? studentStar(selStar, studentId) : null;
  const playHref = powerUp.length ? `/activity/${powerUp[0].act.assignmentId}` : null;

  return (
    <div style={{ minHeight: "100vh", background: "#070C1A", color: "#F2F0FA", fontFamily: "'Inter', sans-serif", padding: "24px 28px 40px", boxSizing: "border-box", position: "relative" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');`}</style>
      <BackToHubButton />
      <div style={{ maxWidth: 1240, margin: "44px auto 0", display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.2, color: "#A9A3C6", textTransform: "uppercase" }}>Frequency Rush</div>
            <h1 style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 34 }}>{firstName ? `${firstName}'s Star Chart` : "My Star Chart"}</h1>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Stat value={lit} label="stars at 80%+" />
            <Stat value={fresh} label="new this week" color="#9FDCFF" />
          </div>
        </div>

        {activities.length === 0 ? (
          <div style={{ background: "#121A33", border: "1px solid #25305A", borderRadius: 20, padding: 28, fontSize: 16, color: "#DAD6EE" }}>
            Your sky is waiting. Play a Frequency Rush mission and your first stars will appear here.
          </div>
        ) : (
          <>
            <div style={{ background: "#1A1440", border: "1px solid #3B2F7A", borderRadius: 20, padding: "18px 22px", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
              <div style={{ width: 230 }}>
                <h2 style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 20 }}>{powerUp.length ? `Power up ${powerUp.length === 1 ? "this one" : `these ${powerUp.length}`}` : "All caught up"}</h2>
                <div style={{ fontSize: 13, color: "#CFC8EE" }}>
                  {powerUp.length ? "They'll come back as SECOND CHANCE in your next run." : "Nothing to power up right now. Keep lighting stars!"}
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, flex: 1, flexWrap: "wrap" }}>
                {powerUp.map((p) => (
                  <button
                    key={p.act.caseStandard + p.star.key}
                    type="button"
                    onClick={() => router.push(`/activity/${p.act.assignmentId}`)}
                    style={{ flex: "1 1 180px", background: "#0F1530", border: "1px solid #2E2A5E", borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, color: "#F2F0FA", cursor: "pointer", textAlign: "left", fontFamily: "inherit", minHeight: 56 }}
                  >
                    <span style={starDotStyle(p.st.band, { inline: true })} />
                    <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                      <span style={{ fontSize: 16, fontWeight: 700 }}>{p.star.label}</span>
                      <span style={{ fontSize: 12, color: "#B8B2D6", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.st.pct}% · {p.act.title}</span>
                    </span>
                  </button>
                ))}
              </div>
              {playHref && (
                <button type="button" onClick={() => router.push(playHref)} style={{ background: "#F4B94A", color: "#1A1440", border: "none", borderRadius: 999, padding: "14px 26px", fontSize: 16, fontWeight: 800, minHeight: 48, cursor: "pointer", fontFamily: "inherit" }}>
                  Play now
                </button>
              )}
            </div>

            <div ref={box} style={{ background: "#0B1226", border: "1px solid #1B2447", borderRadius: 20, padding: "16px 20px 20px", position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <h2 style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 17 }}>My sky</h2>
                  <span style={{ fontSize: 13, color: "#A9A3C6" }}>Tap a star to see the word</span>
                </div>
                <div style={{ display: "flex", gap: 14, fontSize: 12, color: "#C9C4E0", flexWrap: "wrap" }}>
                  {BANDS.map((b) => (
                    <span key={b.key} style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={starDotStyle(b.key, { inline: true })} />{b.label}</span>
                  ))}
                </div>
              </div>
              <StarSky
                layout={layout}
                width={width}
                selectedCase={sel && sel.caseStandard}
                selectedKey={sel && sel.key}
                onPickCons={(cs) => setSel({ caseStandard: cs, key: null })}
                onPickStar={(cs, key) => setSel({ caseStandard: cs, key })}
                twinkleKeys={twinkleKeys}
                ariaFor={(cs, s) => { const st = studentStar(s, studentId); return st.pct == null ? `${s.label}, not tried yet` : `${s.label}, ${st.pct}%`; }}
              />
              {selStar && (
                <div role="status" style={{ position: "absolute", right: 20, bottom: 20, width: 320, maxWidth: "calc(100% - 40px)", background: "#141C3A", border: "1px solid #34407A", borderRadius: 16, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={starDotStyle(selSt.band, { inline: true })} />
                    <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 22, fontWeight: 700 }}>{selStar.label}</div>
                  </div>
                  {selStar.detail && <div style={{ fontSize: 14, color: "#DAD6EE", lineHeight: 1.45 }}>{selStar.detail}</div>}
                  <div style={{ fontSize: 13, color: "#9FDCFF", fontWeight: 600 }}>
                    {selSt.pct >= 80 && twinkleKeys.has(sel.caseStandard + "|" + sel.key) ? `${selSt.pct}%. You lit this star this week!` : statusLine(selSt)}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Stat({ value, label, color }) {
  return (
    <div style={{ background: "#121A33", border: "1px solid #25305A", borderRadius: 16, padding: "10px 18px" }}>
      <div style={{ fontFamily: "Poppins, sans-serif", fontSize: 26, fontWeight: 700, color: color || "#F2F0FA" }}>{value}</div>
      <div style={{ fontSize: 12.5, color: "#C9C4E0" }}>{label}</div>
    </div>
  );
}
