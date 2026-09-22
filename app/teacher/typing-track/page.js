"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import TeacherHUD from "../../../components/TeacherHUD";
import { COLORS, PAGE_ACCENTS, panelStyle } from "../../../lib/teacherTheme";
import { TRACK_LEVELS, TRACK_UNITS } from "../../../lib/cases/relay-station";

// Relay Station — Typing Track board (Sept 22, 2026). Design doc:
// claude/RelayStation_Digital_Design_v1.md §9. One row per student: where
// they are on the 20-level Foundations Track, how many tries they've spent
// on their current level (so a stuck student jumps out), and a placement
// dropdown to move anyone up or back.
//
// Reads/writes go through /api/teacher/typing-track (admin key after an
// ownership check), because relay_station_progress has no RLS policies.
const ACCENT = PAGE_ACCENTS["/teacher/progress"] || COLORS.aqua;
const TOTAL = TRACK_LEVELS.length;
const STUCK_ATTEMPTS = 4; // tries on the current level without a pass = flag it
const UNIT_BY_ID = Object.fromEntries(TRACK_UNITS.map((u) => [u.id, u]));

function statusFor(p) {
  if (!p) return { key: "new", label: "Not started", color: COLORS.textMuted };
  if (p.completed_at || p.current_level > TOTAL) return { key: "done", label: "Complete 🏅", color: COLORS.success };
  const cur = (p.level_results || {})[String(p.current_level)];
  if (cur && !cur.passed && (cur.attempts || 0) >= STUCK_ATTEMPTS) return { key: "stuck", label: "Needs help", color: COLORS.danger };
  return { key: "on", label: "On track", color: COLORS.info };
}

function TypingTrackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState(searchParams.get("classId") || "");
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError || !data?.user) { router.push("/login"); return; }
      setTeacherEmail(data.user.email || "");
      setLoadingAuth(false);
      supabase.from("classes").select("id, name").eq("teacher_id", data.user.id).order("created_at").then(({ data: cls }) => {
        setClasses(cls || []);
        if (!classId && cls && cls.length) setClassId(cls[0].id);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const callApi = useCallback(async (payload) => {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/teacher/typing-track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, accessToken: session?.access_token }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Something went wrong.");
    return data;
  }, []);

  const load = useCallback(async () => {
    if (!classId) return;
    setError(null);
    try {
      const data = await callApi({ action: "list", classId });
      setRows(data.students);
    } catch (err) {
      setError(err.message);
    }
  }, [classId, callApi]);

  useEffect(() => { setRows(null); load(); }, [load]);

  async function setLevel(studentId, level) {
    setSavingId(studentId);
    setError(null);
    try {
      await callApi({ action: "setLevel", studentId, level });
      await load();
    } catch (err) {
      setError(err.message);
    }
    setSavingId(null);
  }

  if (loadingAuth) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  const counts = { new: 0, on: 0, stuck: 0, done: 0 };
  (rows || []).forEach((r) => { counts[statusFor(r.progress).key] += 1; });
  // Stuck students first, then least progress first — who needs me most.
  const order = { stuck: 0, new: 1, on: 2, done: 3 };
  const sorted = [...(rows || [])].sort((a, b) => {
    const sa = statusFor(a.progress).key, sb = statusFor(b.progress).key;
    if (order[sa] !== order[sb]) return order[sa] - order[sb];
    return ((a.progress && a.progress.current_level) || 0) - ((b.progress && b.progress.current_level) || 0);
  });

  return (
    <div style={{ minHeight: "100vh", background: COLORS.canvas, fontFamily: "'Inter', sans-serif", color: COLORS.textDark, display: "flex", flexDirection: "column" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');`}</style>
      <TeacherHUD title="Typing Track" subtitle="Relay Station · Foundations Track progress" accent={ACCENT} teacherEmail={teacherEmail} />

      <main style={{ flex: 1, padding: "28px 32px", maxWidth: 1100, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <div style={{ ...panelStyle(ACCENT, { padding: 18, marginBottom: 16 }) }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            <label style={{ fontSize: 13, fontWeight: 700 }}>
              Class{" "}
              <select value={classId} onChange={(e) => setClassId(e.target.value)} style={{ marginLeft: 6, padding: "6px 10px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 13 }}>
                {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", fontSize: 12.5 }}>
              <Chip color={COLORS.danger} label={`${counts.stuck} need help`} />
              <Chip color={COLORS.info} label={`${counts.on} on track`} />
              <Chip color={COLORS.textMuted} label={`${counts.new} not started`} />
              <Chip color={COLORS.success} label={`${counts.done} complete`} />
            </div>
          </div>
          <p style={{ fontSize: 12.5, color: COLORS.textMuted, margin: "10px 0 0" }}>
            Students move up automatically when they pass a level. The bar rises: <b>90%</b> accuracy for levels 1–10, <b>95%</b> for 11–15, <b>100%</b> for 16–20. Assign it once (Challenge Library → Relay Station → <b>Foundations Track</b> tile) and every student works at their own level.
            Use <b>Place at</b> to skip a strong typist ahead (Level 13 = all letters known, Level 14 = capitals) or send someone back for review. <b>Needs help</b> = {STUCK_ATTEMPTS}+ tries on the same level without passing.
          </p>
        </div>

        {error && <div style={{ background: `${COLORS.danger}18`, color: COLORS.danger, borderRadius: 10, padding: "10px 14px", marginBottom: 12, fontSize: 13.5 }}>{error}</div>}

        <div style={{ ...panelStyle(ACCENT, { padding: 0, overflow: "hidden" }) }}>
          {rows === null ? (
            <div style={{ padding: 24, color: COLORS.textMuted, fontSize: 14 }}>{classId ? "Loading students…" : "Pick a class."}</div>
          ) : rows.length === 0 ? (
            <div style={{ padding: 24, color: COLORS.textMuted, fontSize: 14 }}>No students in this class yet.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
                <thead>
                  <tr style={{ background: `${ACCENT}14`, textAlign: "left" }}>
                    {["Student", "Status", "Current level", "Progress", "Tries on this level", "Last try", "Place at"].map((h) => (
                      <th key={h} style={{ padding: "10px 12px", fontSize: 12, color: COLORS.textMuted, fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((s) => {
                    const p = s.progress;
                    const st = statusFor(p);
                    const cur = p ? Math.min(p.current_level, TOTAL) : 1;
                    const passed = p ? Math.min(p.current_level - 1, TOTAL) : 0;
                    const curRes = p ? (p.level_results || {})[String(p.current_level)] : null;
                    const levelInfo = TRACK_LEVELS[cur - 1];
                    const unit = UNIT_BY_ID[levelInfo.unit];
                    const last = curRes && !curRes.passed ? curRes : null;
                    return (
                      <tr key={s.id} style={{ borderTop: `1px solid ${COLORS.border}` }}>
                        <td style={{ padding: "10px 12px", fontWeight: 700 }}>{s.firstName}</td>
                        <td style={{ padding: "10px 12px" }}><Chip color={st.color} label={st.label} /></td>
                        <td style={{ padding: "10px 12px" }}>
                          {st.key === "done" ? "All 20 passed" : (
                            <>
                              <b>{cur}.</b> {levelInfo.title}
                              <div style={{ fontSize: 11.5, color: COLORS.textMuted }}>{unit ? unit.name : ""}{p && p.placement ? ` · placement check → Level ${p.placement.level}` : ""}</div>
                            </>
                          )}
                        </td>
                        <td style={{ padding: "10px 12px", minWidth: 140 }}>
                          <div style={{ height: 8, background: `${COLORS.textMuted}22`, borderRadius: 99, overflow: "hidden" }}>
                            <div style={{ width: `${(passed / TOTAL) * 100}%`, height: "100%", background: st.key === "done" ? COLORS.success : ACCENT }} />
                          </div>
                          <div style={{ fontSize: 11.5, color: COLORS.textMuted, marginTop: 3 }}>{passed} / {TOTAL}</div>
                        </td>
                        <td style={{ padding: "10px 12px" }}>{curRes ? curRes.attempts || 0 : 0}</td>
                        <td style={{ padding: "10px 12px", fontSize: 12.5, color: COLORS.textMuted }}>
                          {last ? `${last.accuracy}% acc · ${last.wpm} WPM` : "—"}
                          {last && last.troubleKeys && last.troubleKeys.length > 0 && (
                            <div>Trouble: {last.troubleKeys.map((t) => ({ " ": "Space", "\n": "Enter", "\t": "Tab" }[t.key] || t.key)).join(" ")}</div>
                          )}
                        </td>
                        <td style={{ padding: "10px 12px" }}>
                          <select
                            disabled={savingId === s.id}
                            value=""
                            onChange={(e) => { if (e.target.value) setLevel(s.id, Number(e.target.value)); }}
                            style={{ padding: "5px 8px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 12.5 }}
                          >
                            <option value="">{savingId === s.id ? "Saving…" : "Move to…"}</option>
                            {TRACK_LEVELS.map((l, i) => (
                              <option key={i} value={i + 1}>Level {i + 1}: {l.title}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Chip({ color, label }) {
  return <span style={{ display: "inline-block", background: `${color}1F`, color, fontWeight: 700, fontSize: 12, padding: "3px 10px", borderRadius: 999, whiteSpace: "nowrap" }}>{label}</span>;
}

export default function TypingTrackPage() {
  return (
    <Suspense fallback={null}>
      <TypingTrackContent />
    </Suspense>
  );
}
