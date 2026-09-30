"use client";
import React, { useState } from "react";
import { reportCsv } from "../../lib/clearkeysReport";

// ClearKeys Report (Sept 29, 2026): speed over time, year-goal status,
// a gradebook mark in the site's Got it / Almost / Not yet words, and a
// family note per student. Pure view; the page passes the summaries in.
const BADGE = { met: "teal", on: "", build: "neutral", none: "neutral" };

function Spark({ values }) {
  if (!values || values.length < 2) return <span className="cc-muted" style={{ fontSize: 12 }}>—</span>;
  const w = 110, h = 28, pad = 3, max = Math.max(...values, 1), min = Math.min(...values, 0);
  const pts = values.map((v, i) => [pad + (i * (w - 2 * pad)) / (values.length - 1), h - pad - ((v - min) / Math.max(1, max - min)) * (h - 2 * pad)]);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`Daily speed from ${values[0]} to ${values[values.length - 1]} words per minute`}>
      <polyline fill="none" stroke="#7541cf" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points={pts.map((p) => p.join(",")).join(" ")} />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3" fill="#00C2C7" />
    </svg>
  );
}

export default function ClearKeysReportView({ className, summaries, grade }) {
  const [copied, setCopied] = useState(null);
  const [sort, setSort] = useState("name");
  const rows = [...(summaries || [])].sort((a, b) => {
    if (sort === "speed") return (b.nowWpm ?? -1) - (a.nowWpm ?? -1);
    if (sort === "levels") return b.levelsPassed - a.levelsPassed;
    return String(a.firstName).localeCompare(String(b.firstName));
  });
  const goal = rows[0]?.goal;

  function download() {
    const blob = new Blob([reportCsv(rows, className)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ClearKeys report${className ? ` - ${className}` : ""}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function copy(text, key) {
    try { await navigator.clipboard.writeText(text); setCopied(key); setTimeout(() => setCopied(null), 1800); } catch (e) { setCopied("fail"); }
  }

  if (!rows.length) return <div className="cc-empty">No students in this class yet.</div>;

  return (
    <>
      <section className="cc-panel" style={{ marginBottom: 18 }}>
        <div className="cc-row cc-between">
          <div style={{ flex: "1 1 320px" }}>
            <h2 style={{ fontSize: 20 }}>Grade {grade} year goal: {goal?.wpm} words per minute at {goal?.accuracy}% accuracy</h2>
            <p className="cc-muted" style={{ margin: 0 }}>“Speed now” is the average of each student&apos;s last 5 Daily Transmissions (or last 5 passed levels). The mark uses Got it / Almost / Not yet, the same words as your gradebook. These are ClearKeys goals built from Tech Apps 3–5.12C, not an official benchmark.</p>
          </div>
          <div className="cc-row">
            <button type="button" className="cc-btn" onClick={download}>Download for Excel</button>
            <button type="button" className="cc-btn secondary" onClick={() => copy(rows.map((r) => `${r.firstName}: ${r.family}`).join("\n\n"), "all")}>{copied === "all" ? "Copied!" : "Copy all family notes"}</button>
          </div>
        </div>
      </section>

      <div className="cc-row" style={{ marginBottom: 10 }}>
        <span className="cc-muted" style={{ fontSize: 13 }}>Sort by</span>
        {[["name", "Name"], ["speed", "Speed now"], ["levels", "Levels passed"]].map(([k, l]) => (
          <button key={k} type="button" className={`cc-btn ${sort === k ? "" : "quiet"}`} style={{ minHeight: 34, padding: "6px 14px" }} aria-pressed={sort === k} onClick={() => setSort(k)}>{l}</button>
        ))}
      </div>

      <div className="cc-panel" style={{ padding: 0, overflow: "hidden" }}>
        <div className="cc-table-scroll">
          <table className="cc-table">
            <thead>
              <tr>
                <th>Student</th><th>Levels</th><th>Speed now</th><th>Daily speed trend</th><th>Year goal</th><th>Mark</th><th>Family note</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={`${r.firstName}-${i}`}>
                  <td><b>{r.firstName}</b><small>{r.minutesWeek} min this week · {r.dailyDays} Daily days{r.fluencyPassed ? ` · ${r.fluencyPassed} Fluency` : ""}</small>{r.supports && <small style={{ color: "#513193" }}>Supports: {r.supports.labels.join(", ")}{r.supports.beforeAcc != null && r.supports.afterAcc != null ? ` · accuracy ${r.supports.beforeAcc}% before → ${r.supports.afterAcc}% with supports` : r.supports.since ? " · too soon to compare" : ""}</small>}</td>
                  <td>{r.complete ? "All 20" : `${r.levelsPassed} of 20`}<small>{r.stars} stars</small></td>
                  <td>{r.nowWpm != null ? <><b>{r.nowWpm}</b> WPM<small>{r.nowAcc}% accuracy{r.bestWpm ? ` · best ${r.bestWpm}` : ""}</small></> : <span className="cc-muted">—</span>}</td>
                  <td><Spark values={r.history} />{r.startWpm != null && r.nowWpm != null && <small>{r.startWpm} → {r.nowWpm} WPM</small>}</td>
                  <td><span className={`cc-badge ${BADGE[r.status.key]}`}>{r.status.label}</span></td>
                  <td>{r.mark || <span className="cc-muted">—</span>}</td>
                  <td style={{ maxWidth: 360 }}>
                    <span style={{ fontSize: 12.5 }}>{r.family}</span>
                    <button type="button" className="cc-btn quiet" style={{ minHeight: 30, padding: "4px 12px", marginTop: 6, display: "flex" }} onClick={() => copy(r.family, i)}>{copied === i ? "Copied!" : "Copy"}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
