"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import TeacherHUD from "../../../components/TeacherHUD";
import { COLORS, PAGE_ACCENTS, panelStyle } from "../../../lib/teacherTheme";

// Assembly Deck — Sentence Sort board (Sept 22, 2026). Design doc:
// claude/AssemblyDeck_Digital_Design_v1.md §7.
//
// Every other board in ClearCenters answers "how far did they get." This one
// answers the question only this engine can: WHAT KIND of bad sentence gets
// past this class. A student who calls an opinion "off topic" is making a
// different mistake than one who calls it "not in the notes," and that
// difference is a lesson, not a score.
//
// Reads go through /api/teacher/assembly-deck (admin key after an ownership
// check). Nothing here is stored — it is recomputed from submissions.
const ACCENT = PAGE_ACCENTS["/teacher/progress"] || COLORS.aqua;

const pct = (c, t) => (t ? Math.round((c / t) * 100) : null);

function Bar({ correct, total, color }) {
  const p = pct(correct, total);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ flex: 1, height: 10, background: "rgba(42,35,80,.1)", borderRadius: 99, overflow: "hidden", minWidth: 80 }}>
        <div style={{ width: `${p || 0}%`, height: "100%", background: color, transition: "width .3s" }} />
      </div>
      <div style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.textMuted, width: 62, textAlign: "right" }}>
        {p === null ? "—" : `${p}% · ${correct}/${total}`}
      </div>
    </div>
  );
}

function colorFor(p) {
  if (p === null) return COLORS.textMuted;
  if (p >= 80) return COLORS.success;
  if (p >= 60) return COLORS.warning;
  return COLORS.danger;
}

function AssemblyDeckContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState(searchParams.get("classId") || "");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [openStudent, setOpenStudent] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: d, error: authError }) => {
      if (authError || !d?.user) { router.push("/login"); return; }
      setTeacherEmail(d.user.email || "");
      setLoadingAuth(false);
      supabase.from("classes").select("id, name").eq("teacher_id", d.user.id).order("created_at").then(({ data: cls }) => {
        setClasses(cls || []);
        if (!classId && cls && cls.length) setClassId(cls[0].id);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const load = useCallback(async () => {
    if (!classId) return;
    setError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/teacher/assembly-deck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "list", classId, accessToken: session?.access_token }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Something went wrong.");
      setData(d);
    } catch (err) {
      setError(err.message);
    }
  }, [classId]);

  useEffect(() => { setData(null); load(); }, [load]);

  if (loadingAuth) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  const labelFor = (key) => {
    if (key === "(no answer)") return "left blank";
    const r = ((data && data.reasons) || []).find((x) => x.key === key);
    return r ? r.short : key;
  };

  // The headline: the category this class lets through most often.
  const worst = data && data.confusion
    ? [...data.confusion].filter((c) => c.total > 0).sort((a, b) => {
        const ar = (a.byChoice[a.key] || 0) / a.total, br = (b.byChoice[b.key] || 0) / b.total;
        return ar - br;
      })[0]
    : null;
  const worstRate = worst ? pct(worst.byChoice[worst.key] || 0, worst.total) : null;
  const worstMistake = worst
    ? Object.entries(worst.byChoice).filter(([k]) => k !== worst.key).sort((a, b) => b[1] - a[1])[0]
    : null;

  return (
    <div style={{ minHeight: "100vh", background: COLORS.canvas, fontFamily: "'Inter', sans-serif", color: COLORS.textDark, display: "flex", flexDirection: "column" }}>
      <TeacherHUD title="Sentence Sort" subtitle="Assembly Deck · what kind of bad sentence gets past this class" accent={ACCENT} teacherEmail={teacherEmail} />

      <main style={{ flex: 1, padding: "28px 32px", maxWidth: 1100, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <div style={{ ...panelStyle(ACCENT, { padding: 18, marginBottom: 16 }) }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            <label style={{ fontSize: 13, fontWeight: 700 }}>Class</label>
            <select value={classId} onChange={(e) => setClassId(e.target.value)} style={{ padding: "8px 12px", borderRadius: 10, border: `1px solid ${ACCENT}66`, fontFamily: "inherit", fontSize: 14 }}>
              {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {data && data.totals && (
              <div style={{ fontSize: 13, color: COLORS.textMuted }}>
                {data.totals.builds} build{data.totals.builds === 1 ? "" : "s"} from {data.totals.students} of {data.totals.ofClass} students
                {data.totals.pinpoint && data.totals.pinpoint.total > 0 && (
                  <> · debrief {data.totals.pinpoint.correct + data.totals.quickCheck.correct}/{data.totals.pinpoint.total + data.totals.quickCheck.total}</>
                )}
              </div>
            )}
          </div>
        </div>

        {error && <div style={{ ...panelStyle(COLORS.danger, { padding: 16, marginBottom: 16 }), color: COLORS.danger }}>{error}</div>}

        {data && !data.totals && (
          <div style={{ ...panelStyle(ACCENT, { padding: 22 }) }}>
            <h2 style={{ margin: "0 0 6px", fontSize: 19 }}>No builds turned in yet</h2>
            <p style={{ margin: 0, color: COLORS.textMuted, fontSize: 14.5, lineHeight: 1.6 }}>
              {data.assignments.length
                ? "Assembly Deck is assigned to this class, but nobody has finished a build. This board fills in as they do."
                : "Assign an Assembly Deck case to this class and this board will show what kinds of sentences get past them."}
            </p>
          </div>
        )}

        {data && data.totals && (
          <>
            {worst && worstMistake && (
              <div style={{ ...panelStyle(COLORS.warning, { padding: 20, marginBottom: 16 }) }}>
                <div style={{ fontSize: 11.5, letterSpacing: 1.2, fontWeight: 800, color: COLORS.warning, marginBottom: 6 }}>WHAT TO TEACH TOMORROW</div>
                <div style={{ fontSize: 17, lineHeight: 1.6, fontWeight: 700 }}>
                  This class is weakest on <span style={{ color: COLORS.danger }}>&ldquo;{worst.label}&rdquo;</span> — they name it correctly {worstRate}% of the time.
                </div>
                <div style={{ marginTop: 8, fontSize: 14.5, color: COLORS.textMuted, lineHeight: 1.6 }}>
                  When they miss it, they most often call it <strong>&ldquo;{labelFor(worstMistake[0])}&rdquo;</strong> instead ({worstMistake[1]} time{worstMistake[1] === 1 ? "" : "s"}).
                </div>
              </div>
            )}

            <div style={{ ...panelStyle(ACCENT, { padding: 20, marginBottom: 16 }) }}>
              <h2 style={{ margin: "0 0 4px", fontSize: 17 }}>Naming what a bad sentence is doing</h2>
              <p style={{ margin: "0 0 14px", color: COLORS.textMuted, fontSize: 13.5 }}>
                Each row is a kind of sentence that did not belong. The bar is how often this class named it correctly.
              </p>
              {data.confusion.filter((c) => c.total > 0).map((c) => {
                const right = c.byChoice[c.key] || 0;
                const wrong = Object.entries(c.byChoice).filter(([k]) => k !== c.key).sort((a, b) => b[1] - a[1]);
                return (
                  <div key={c.key} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                      <strong style={{ fontSize: 14.5 }}>{c.label}</strong>
                      {!!wrong.length && (
                        <span style={{ fontSize: 12.5, color: COLORS.textMuted }}>
                          called {wrong.slice(0, 2).map(([k, n]) => `"${labelFor(k)}" ${n}×`).join(", ")}
                        </span>
                      )}
                    </div>
                    <Bar correct={right} total={c.total} color={colorFor(pct(right, c.total))} />
                  </div>
                );
              })}
            </div>

            <div style={{ ...panelStyle(ACCENT, { padding: 20, marginBottom: 16 }) }}>
              <h2 style={{ margin: "0 0 4px", fontSize: 17 }}>Where sentences land in the paragraph</h2>
              <p style={{ margin: "0 0 14px", color: COLORS.textMuted, fontSize: 13.5 }}>
                Hardest slot first. A low bar on Reasoning usually means they can find evidence but cannot say why it matters.
              </p>
              {data.slots.map((s) => (
                <div key={s.label} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                  <Bar correct={s.correct} total={s.total} color={colorFor(pct(s.correct, s.total))} />
                </div>
              ))}
            </div>

            <div style={{ ...panelStyle(ACCENT, { padding: 20 }) }}>
              <h2 style={{ margin: "0 0 14px", fontSize: 17 }}>By student</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {data.students.map((s) => {
                  const decoyPct = pct(s.decoys.correct, s.decoys.total);
                  const open = openStudent === s.id;
                  const missed = Object.entries(s.missedBy).sort((a, b) => b[1] - a[1]);
                  return (
                    <div key={s.id} style={{ border: `1px solid ${ACCENT}33`, borderRadius: 12, padding: "10px 12px", background: "rgba(255,255,255,.5)" }}>
                      <button
                        onClick={() => setOpenStudent(open ? null : s.id)}
                        style={{ display: "flex", width: "100%", gap: 12, alignItems: "center", background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "inherit", color: COLORS.textDark, textAlign: "left" }}
                      >
                        <strong style={{ fontSize: 15, width: 120 }}>{s.name}</strong>
                        <span style={{ fontSize: 12.5, color: COLORS.textMuted, width: 90 }}>{s.builds} build{s.builds === 1 ? "" : "s"}</span>
                        <span style={{ flex: 1 }}><Bar correct={s.decoys.correct} total={s.decoys.total} color={colorFor(decoyPct)} /></span>
                        <span style={{ fontSize: 12.5, color: COLORS.textMuted }}>{open ? "▾" : "▸"}</span>
                      </button>
                      {open && (
                        <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${ACCENT}22`, fontSize: 13.5, color: COLORS.textMuted, lineHeight: 1.7 }}>
                          <div>Sentences placed correctly: <strong style={{ color: COLORS.textDark }}>{s.placement.correct}/{s.placement.total}</strong> · paragraph order: <strong style={{ color: COLORS.textDark }}>{s.assembly.correct}/{s.assembly.total}</strong></div>
                          <div>Editor&apos;s Trap caught: <strong style={{ color: COLORS.textDark }}>{s.traps.caught}/{s.traps.offered}</strong>{s.challenge ? ` · ran Chief's Challenge ${s.challenge}×` : ""}</div>
                          {s.debrief && (s.debrief.pinpoint.asked > 0 || s.debrief.quickCheck.asked > 0) && (
                            <div>
                              Debrief — found the sentence: <strong style={{ color: COLORS.textDark }}>{s.debrief.pinpoint.correct}/{s.debrief.pinpoint.asked}</strong>
                              {" · "}multiple choice: <strong style={{ color: COLORS.textDark }}>{s.debrief.quickCheck.correct}/{s.debrief.quickCheck.asked}</strong>
                            </div>
                          )}
                          {missed.length
                            ? <div>Keeps missing: {missed.map(([k, n]) => `${labelFor(k)} (${n}×)`).join(", ")}</div>
                            : <div style={{ color: COLORS.success }}>Named every leftover correctly.</div>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {!!(data.notStarted || []).length && (
                <div style={{ marginTop: 14, fontSize: 13, color: COLORS.textMuted }}>
                  Not started: {data.notStarted.join(", ")}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default function AssemblyDeckBoardPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: COLORS.canvas }} />}>
      <AssemblyDeckContent />
    </Suspense>
  );
}
