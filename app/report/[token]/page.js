"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

// Sept 14 — the public, read-only side of Feature 3 (Shareable reports —
// see Teacher_SiteWide_Redesign_Plan.md). Reached only via a per-student
// share link a teacher copies from their own report page
// (app/teacher/reports/student/[studentId]) — nothing here requires
// signing in, and nothing here is reachable except by the token in the
// URL. No supabase import at all: every bit of data comes from the one
// public API route below, which does its own token check server-side.
//
// Deliberately its own simple light page rather than reusing the
// console-interior chrome (TeacherHUD, PAGE_ACCENTS/BACKGROUNDS) — a
// parent or admin opening this link isn't "in" the teacher app at all, so
// it gets the same plain, printable-document treatment as the report card
// itself, just wrapped in enough ClearCenters branding (the real logo, per
// Emily's ask) to be recognizable as a legitimate report rather than a
// bare, unbranded page.
const COLORS = {
  violet: "#8C52F2",
  teal: "#6FD8F5",
  canvas: "#F3EFFC",
  white: "#FFFFFF",
  textDark: "#2A2350",
  textMuted: "#6B6491",
  border: "rgba(140,82,242,.22)",
  danger: "#E4574C",
};

function StatBlock({ label, value }) {
  return (
    <div style={{ flex: 1, textAlign: "center" }}>
      <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: COLORS.textDark }}>{value}</div>
      <div style={{ fontSize: 11.5, color: COLORS.textMuted, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function BandBadge({ band }) {
  if (!band) return <span style={{ fontSize: 10.5, color: COLORS.textMuted, fontStyle: "italic" }}>No grade yet</span>;
  return <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 999, background: band.color + "22", color: band.color }}>{band.label}</span>;
}

// Same inline SVG line chart as the teacher's own report pages — kept as
// its own copy rather than a shared import, matching how this same chart
// is already duplicated between the class and student report pages.
function TrendChart({ series, labels, height = 170 }) {
  const width = 680;
  const padL = 32, padR = 10, padTop = 12, padBottom = 22;
  const plotW = width - padL - padR;
  const plotH = height - padTop - padBottom;
  const n = labels.length;
  const yMax = 100;
  const xFor = (i) => padL + (n > 1 ? (plotW * i) / (n - 1) : plotW / 2);
  const yFor = (v) => padTop + plotH * (1 - v / yMax);

  if (n === 0) {
    return <div style={{ fontSize: 13, color: COLORS.textMuted }}>Not enough data yet.</div>;
  }

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ display: "block", overflow: "visible" }}>
      {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
        const y = padTop + plotH * (1 - frac);
        return (
          <g key={frac}>
            <line x1={padL} y1={y} x2={width - padR} y2={y} stroke={COLORS.border} strokeWidth={1} />
            <text x={padL - 6} y={y + 3} textAnchor="end" fontSize={9.5} fill={COLORS.textMuted}>{Math.round(frac * yMax)}</text>
          </g>
        );
      })}
      {series.map((s) => {
        const segments = [];
        let current = [];
        labels.forEach((_, i) => {
          const v = s.values[i];
          if (v === null || v === undefined) {
            if (current.length > 1) segments.push(current);
            current = [];
          } else {
            current.push([xFor(i), yFor(v)]);
          }
        });
        if (current.length > 1) segments.push(current);
        return (
          <g key={s.label}>
            {segments.map((seg, si) => (
              <polyline key={si} points={seg.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")} fill="none" stroke={s.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            ))}
            {labels.map((_, i) => {
              const v = s.values[i];
              if (v === null || v === undefined) return null;
              return (
                <circle key={i} cx={xFor(i)} cy={yFor(v)} r={3.5} fill={s.color} stroke="white" strokeWidth={1.5}>
                  <title>{`${s.label} — ${s.pointTitles ? s.pointTitles[i] + ": " : ""}${v}%`}</title>
                </circle>
              );
            })}
          </g>
        );
      })}
      {labels.map((lab, i) => (
        <text key={i} x={xFor(i)} y={height - 4} textAnchor="middle" fontSize={9.5} fill={COLORS.textMuted}>{lab}</text>
      ))}
    </svg>
  );
}

export default function SharedReportPage() {
  const params = useParams();
  const token = params.token;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/reports/shared/${token}`)
      .then(async (res) => {
        const body = await res.json();
        if (cancelled) return;
        if (!res.ok) { setError(body.error || "Couldn't load this report."); setLoading(false); return; }
        setReport(body);
        setLoading(false);
      })
      .catch(() => { if (!cancelled) { setError("Couldn't load this report — check your connection and try again."); setLoading(false); } });
    return () => { cancelled = true; };
  }, [token]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>
        Loading report...
      </div>
    );
  }

  if (error || !report) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", padding: 20 }}>
        <div style={{ background: COLORS.white, borderRadius: 20, padding: "32px 36px", textAlign: "center", maxWidth: 420, boxShadow: "0 8px 28px rgba(80,60,150,.16)" }}>
          <img src="/clearcenters_logo.png" alt="ClearCenters" style={{ width: "min(200px, 60%)", height: "auto", margin: "0 auto 18px" }} />
          <p style={{ color: COLORS.danger, fontSize: 14.5, margin: 0 }}>{error || "Couldn't load this report."}</p>
        </div>
      </div>
    );
  }

  const generatedDate = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  const delta = report.avgPct !== null && report.classAveragePct !== null ? report.avgPct - report.classAveragePct : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.canvas,
        fontFamily: "'Inter', sans-serif",
        color: COLORS.textDark,
        padding: "36px 20px 60px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        @media print {
          .no-print { display: none !important; }
          body, html { background: white !important; }
          .report-card { box-shadow: none !important; border: 1px solid #ddd !important; }
        }
      `}</style>

      <div style={{ maxWidth: 800, margin: "0 auto 16px", display: "flex", justifyContent: "flex-end" }} className="no-print">
        <button onClick={() => window.print()} className="gc-btn" style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "10px 20px", fontWeight: 700, fontSize: 13.5 }}>
          Print / Save as PDF
        </button>
      </div>

      <div className="report-card" style={{ maxWidth: 800, margin: "0 auto", background: COLORS.white, borderRadius: 20, padding: 36, boxShadow: "0 8px 28px rgba(80,60,150,.16)" }}>
        <img
          src="/clearcenters_logo.png"
          alt="ClearCenters — Prove, Grow, Shine"
          style={{ display: "block", width: "min(220px, 60%)", height: "auto", margin: "0 auto 22px" }}
        />

        <div style={{ marginBottom: 24, textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.violet, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Student Report</div>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 26, margin: "0 0 4px 0" }}>{report.studentName}</h1>
          <div style={{ fontSize: 12.5, color: COLORS.textMuted }}>
            {report.className}{report.teacherName ? ` · ${report.teacherName}` : ""} · Generated {generatedDate}
          </div>
        </div>

        <div style={{ display: "flex", padding: "16px 0", borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, marginBottom: 24 }}>
          <StatBlock label="Missions Completed" value={`${report.missionsCompleted} of ${report.assignmentCount}`} />
          <StatBlock label="Average Score" value={report.avgPct !== null ? `${report.avgPct}%` : "—"} />
          <StatBlock label="Band" value={report.band ? report.band.label : "No grade yet"} />
          <StatBlock label="vs. Class Average" value={delta !== null ? `${delta >= 0 ? "+" : ""}${delta} pts` : "—"} />
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>Score Over Time</div>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10 }}>
            <span style={{ color: COLORS.violet, fontWeight: 700 }}>● {report.studentName}</span>{"  "}
            <span style={{ color: COLORS.teal, fontWeight: 700 }}>● Class Average</span>{"  "}
            — gaps mean the assignment wasn't submitted or hasn't been graded yet.
          </div>
          <TrendChart series={[
            { label: report.studentName, color: COLORS.violet, values: report.myScores, pointTitles: report.titles },
            { label: "Class Average", color: COLORS.teal, values: report.classAvgSeries, pointTitles: report.titles },
          ]} labels={report.labels} />
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Assignment History</div>
          {report.assignmentRows.length === 0 ? (
            <div style={{ fontSize: 13, color: COLORS.textMuted }}>Nothing assigned yet.</div>
          ) : (
            <div style={{ display: "grid", gap: 2 }}>
              {report.assignmentRows.map((r) => (
                <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 4px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 12.5 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{r.title}</div>
                    <div style={{ fontSize: 10.5, color: COLORS.textMuted }}>{r.standard} · {r.dateLabel}</div>
                  </div>
                  {r.isMissing ? (
                    <span style={{ fontWeight: 700, color: COLORS.danger, fontSize: 12 }}>Not submitted</span>
                  ) : (
                    <>
                      <span style={{ fontWeight: 700 }}>{r.score !== null ? `${r.score}%` : "Pending"}</span>
                      <BandBadge band={r.band} />
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Standards Mastery</div>
          {report.standardRows.length === 0 ? (
            <div style={{ fontSize: 13, color: COLORS.textMuted }}>No standards to show yet.</div>
          ) : (
            <div style={{ display: "grid", gap: 2 }}>
              {report.standardRows.map((row) => (
                <div key={row.standard} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 4px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 12.5 }}>
                  <div style={{ fontWeight: 700 }}>{row.title} <span style={{ color: COLORS.textMuted, fontWeight: 400 }}>({row.standard})</span></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {row.avgPct !== null && <span style={{ color: COLORS.textMuted }}>{row.avgPct}%</span>}
                    <BandBadge band={row.band} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginBottom: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Badges &amp; Crystal Points</div>
          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            {report.earnedTiers.length > 0 ? (
              <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                {report.earnedTiers.map((t) => (
                  <div key={t.id} style={{ textAlign: "center", width: 64 }}>
                    <img
                      src={`/badges/transparent/${t.tier_key}.png`}
                      alt={t.label}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = t.image_path; }}
                      style={{ width: 40, height: 40, objectFit: "contain", margin: "0 auto" }}
                    />
                    <div style={{ fontSize: 10, color: COLORS.textMuted, marginTop: 4 }}>{t.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: 12.5, color: COLORS.textMuted }}>No badges earned yet.</div>
            )}
            <div style={{ borderLeft: `1px solid ${COLORS.border}`, paddingLeft: 22 }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 20, color: COLORS.violet }}>✦ {report.crystalPoints}</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted }}>Crystal Points earned</div>
              {report.nextTier && (
                <div style={{ fontSize: 10.5, color: COLORS.textMuted, marginTop: 2 }}>{report.nextTier.threshold - report.missionsCompleted} more mission{report.nextTier.threshold - report.missionsCompleted === 1 ? "" : "s"} to {report.nextTier.label}</div>
              )}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 28, paddingTop: 16, borderTop: `1px solid ${COLORS.border}`, fontSize: 11, color: COLORS.textMuted, textAlign: "center" }}>
          This is a read-only report shared by your teacher via ClearCenters.
        </div>
      </div>
    </div>
  );
}
