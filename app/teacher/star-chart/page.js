"use client";
import { BridgePage, PageHeading, ClassTabs, Empty } from "../../../components/teacher/BridgeUI";

import React, { useState, useEffect, useCallback, useMemo, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { COLORS, panelStyle } from "../../../lib/teacherTheme";
import StarSky from "../../../components/StarSky";
import { layoutSky, classStar, starDotStyle, BANDS, BAND_ON_WHITE } from "../../../lib/starChartLayout";

// Star Chart — teacher desk view (Sept 24, 2026;
// FrequencyRush_Fluency_Expansion_v1.md §11.10c). The Living Word Wall as a
// sky: every word or fact the class has practiced in Frequency Rush is a star,
// one constellation per activity.
//
// It answers one question: what do I reteach next?
//   1. "Reteach next": the 3 stars the most students are stuck on, each with
//      Quick run (assigns that activity again to just those students; My
//      Missed Words brings their misses back first, marked SECOND CHANCE).
//   2. The class sky. Tap a constellation to list its stars; tap a star to
//      see who is stuck. Names never appear on the sky itself.
// Reads go through /api/teacher/star-chart. Nothing is stored.
const ACCENT = "#5B2FB5";
// Star colors are the teacher home page's score bands (0–50 red … 90–100 blue).

function StarChartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState(searchParams.get("classId") || "");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [scope, setScope] = useState("whole"); // whole | group
  const [group, setGroup] = useState([]); // student ids when scope is "group"
  const [selCase, setSelCase] = useState(null);
  const [selKey, setSelKey] = useState(null);
  const [busy, setBusy] = useState(false);
  const skyBox = useRef(null);
  const [skyWidth, setSkyWidth] = useState(880);

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

  useEffect(() => {
    if (!skyBox.current || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const w = Math.floor(entries[0].contentRect.width) - 32;
      if (w > 200) setSkyWidth(w);
    });
    ro.observe(skyBox.current);
    return () => ro.disconnect();
  }, [data]);

  const callApi = useCallback(async (payload) => {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch("/api/teacher/star-chart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, classId, accessToken: session?.access_token }),
    });
    const d = await res.json();
    if (!res.ok) throw new Error(d.error || "Something went wrong.");
    return d;
  }, [classId]);

  const load = useCallback(async () => {
    if (!classId) return;
    setError(null);
    setData(null);
    try {
      const d = await callApi({ action: "load" });
      setData(d);
      setGroup([]);
      setScope("whole");
      setSelCase(d.activities[0] ? d.activities[0].caseStandard : null);
      setSelKey(null);
    } catch (err) {
      setError(err.message);
    }
  }, [classId, callApi]);

  useEffect(() => { if (!loadingAuth) load(); }, [loadingAuth, load]);

  const nameOf = useMemo(() => Object.fromEntries(((data && data.students) || []).map((s) => [s.id, s.name])), [data]);
  const scopeIds = useMemo(() => {
    if (!data) return [];
    if (scope === "group" && group.length) return group;
    return data.students.map((s) => s.id);
  }, [data, scope, group]);

  // Class version of every star, for the students in view.
  const classStars = useMemo(() => {
    const out = new Map();
    if (!data) return out;
    data.activities.forEach((a) => a.stars.forEach((s) => out.set(a.caseStandard + "|" + s.key, classStar(s, scopeIds))));
    return out;
  }, [data, scopeIds]);

  const layout = useMemo(() => {
    if (!data) return { constellations: [], height: 0 };
    return layoutSky(data.activities, { width: skyWidth, bandOf: (a, s) => classStars.get(a.caseStandard + "|" + s.key).band });
  }, [data, skyWidth, classStars]);

  const totals = useMemo(() => {
    let lit = 0, all = 0;
    classStars.forEach((c) => { all += 1; if (c.pct != null && c.pct >= 80) lit += 1; });
    return { lit, all };
  }, [classStars]);

  const reteach = useMemo(() => {
    if (!data) return [];
    const list = [];
    data.activities.forEach((a) => a.stars.forEach((s) => {
      const c = classStars.get(a.caseStandard + "|" + s.key);
      if (c.stuckIds.length) list.push({ act: a, star: s, stuckIds: c.stuckIds });
    }));
    return list.sort((x, y) => y.stuckIds.length - x.stuckIds.length).slice(0, 3);
  }, [data, classStars]);

  const selAct = data && data.activities.find((a) => a.caseStandard === selCase);
  const selRows = useMemo(() => {
    if (!selAct) return [];
    // lowest scores first; never-practiced words at the bottom
    return selAct.stars
      .map((s) => ({ star: s, c: classStars.get(selAct.caseStandard + "|" + s.key) }))
      .sort((x, y) => (x.c.pct ?? 101) - (y.c.pct ?? 101) || y.c.stuckIds.length - x.c.stuckIds.length || x.star.label.localeCompare(y.star.label));
  }, [selAct, classStars]);
  const selRow = selRows.find((r) => r.star.key === selKey);
  const selCounts = useMemo(() => {
    const n = { red: 0, orange: 0, yellow: 0, green: 0, blue: 0, untried: 0 };
    selRows.forEach((r) => { n[r.c.band] += 1; });
    return n;
  }, [selRows]);

  async function quickRun(caseStandard, studentIds, label) {
    setBusy(true); setError(null); setNotice(null);
    try {
      const d = await callApi({ action: "quickRun", caseStandard, studentIds });
      setNotice(`Assigned a quick run of ${label} to ${d.count} student${d.count === 1 ? "" : "s"}. Their missed questions come back first as SECOND CHANCE.`);
    } catch (err) {
      setError(err.message);
    }
    setBusy(false);
  }

  function toggleGroup(id) {
    setGroup((g) => (g.includes(id) ? g.filter((x) => x !== id) : [...g, id]));
  }

  if (loadingAuth) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  const chip = (on) => ({ border: "none", cursor: "pointer", borderRadius: 999, padding: "8px 14px", fontSize: 13, fontWeight: 700, minHeight: 36, fontFamily: "inherit", background: on ? "#FFFFFF" : "transparent", color: on ? "#3F1F86" : COLORS.textMuted, boxShadow: on ? "0 1px 2px rgba(30,27,46,0.12)" : "none" });
  const primary = { background: ACCENT, color: "#FFFFFF", border: "none", borderRadius: 999, padding: "10px 16px", fontSize: 13, fontWeight: 700, minHeight: 40, cursor: busy ? "default" : "pointer", fontFamily: "inherit", opacity: busy ? 0.6 : 1 };

  return (
    <BridgePage teacherEmail={teacherEmail}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .sc-row{width:100%;border:none;background:transparent;text-align:left;cursor:pointer;font:inherit;color:inherit;display:flex;align-items:center;gap:10px;padding:9px 8px;border-bottom:1px solid #EEEAF6;min-height:40px;border-radius:8px}
        .sc-row:hover{background:#F1ECFB}`}</style>
      <PageHeading title="Star Chart" subtitle="Frequency Rush · every word and fact your class has practiced">
        <div style={{ display: "flex", background: "#ECE7F7", borderRadius: 999, padding: 4, gap: 4 }}>
          <button type="button" aria-pressed={scope === "whole"} onClick={() => setScope("whole")} style={chip(scope === "whole")}>Whole class</button>
          <button type="button" aria-pressed={scope === "group"} onClick={() => setScope("group")} style={chip(scope === "group")}>A group</button>
        </div>
      </PageHeading>

      <div className="cc-detail-content">
        <ClassTabs classes={classes} value={classId} onChange={(id) => setClassId(id)} />
        {error && <div style={{ background: `${COLORS.danger}18`, color: COLORS.danger, borderRadius: 10, padding: "10px 14px", margin: "12px 0", fontSize: 13.5 }}>{error}</div>}
        {notice && <div style={{ background: `${COLORS.success}18`, color: COLORS.success, borderRadius: 10, padding: "10px 14px", margin: "12px 0", fontSize: 13.5, fontWeight: 600 }}>{notice}</div>}

        {!data ? (
          <Empty>{error ? "" : "Loading the sky…"}</Empty>
        ) : data.activities.length === 0 ? (
          <Empty>No Frequency Rush activities have been assigned to this class yet. Once students play, their words and facts appear here as stars.</Empty>
        ) : (
          <>
            {scope === "group" && (
              <div style={panelStyle(ACCENT, { padding: 14, marginTop: 12 })}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.textMuted, marginBottom: 8 }}>
                  {group.length ? `Showing ${group.length} student${group.length === 1 ? "" : "s"}. Tap names to add or remove.` : "Tap students to build a group. Until you pick, the whole class shows."}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {data.students.map((s) => {
                    const on = group.includes(s.id);
                    return (
                      <button key={s.id} type="button" aria-pressed={on} onClick={() => toggleGroup(s.id)} style={{ border: `1.5px solid ${on ? ACCENT : "#E0D8F2"}`, background: on ? ACCENT : "#FFFFFF", color: on ? "#FFFFFF" : "#1E1B2E", borderRadius: 999, padding: "6px 12px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", minHeight: 34, fontFamily: "inherit" }}>
                        {s.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div style={{ margin: "18px 0 10px", display: "flex", alignItems: "baseline", gap: 12 }}>
              <h2 style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 18 }}>Reteach next</h2>
              <span style={{ fontSize: 13, color: COLORS.textMuted }}>The words the most students are still missing</span>
            </div>
            {reteach.length === 0 ? (
              <div style={{ ...panelStyle(ACCENT, { padding: 16 }), fontSize: 14, color: COLORS.textMuted }}>Nobody is stuck on anything right now. Nice.</div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
                {reteach.map((r) => (
                  <div key={r.act.caseStandard + r.star.key} style={{ background: "#FFFFFF", border: "1px solid #E4DEF0", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "#1B1537", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={starDotStyle("red")} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 17, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.star.label}</div>
                      <div style={{ fontSize: 13, color: COLORS.textMuted }}>{r.stuckIds.length} of {scopeIds.length} students · {r.act.title}</div>
                    </div>
                    <button type="button" disabled={busy} onClick={() => quickRun(r.act.caseStandard, r.stuckIds, r.act.title)} style={primary}>Quick run</button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: 18, marginTop: 18, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div ref={skyBox} style={{ flex: "1 1 560px", minWidth: 0, background: "#0D1428", borderRadius: 20, padding: "16px 16px 20px", boxSizing: "border-box" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <h2 style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontSize: 17, color: "#F2F0FA" }}>{scope === "group" && group.length ? "The group's sky" : "The class sky"}</h2>
                    <span style={{ fontSize: 13, color: "#A9A3C6" }}>{totals.lit} of {totals.all} stars at 80%+</span>
                  </div>
                  <div style={{ display: "flex", gap: 14, fontSize: 12, color: "#C9C4E0", flexWrap: "wrap" }}>
                    {BANDS.map((b) => (
                      <span key={b.key} style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={starDotStyle(b.key, { inline: true })} />{b.label}</span>
                    ))}
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={starDotStyle("untried", { inline: true })} />Not practiced</span>
                  </div>
                </div>
                <div style={{ overflowX: "hidden" }}>
                  <StarSky
                    layout={layout}
                    width={skyWidth}
                    selectedCase={selCase}
                    selectedKey={selKey}
                    onPickCons={(cs) => { setSelCase(cs); setSelKey(null); }}
                    onPickStar={(cs, key) => { setSelCase(cs); setSelKey(key); }}
                    ariaFor={(cs, s) => { const c = classStars.get(cs + "|" + s.key); return c.pct == null ? `${s.label}, not practiced yet` : `${s.label}, class average ${c.pct}%`; }}
                  />
                </div>
              </div>

              <div style={{ flex: "0 0 360px", maxWidth: "100%", background: "#FFFFFF", border: "1px solid #E4DEF0", borderRadius: 20, padding: 18, boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 12 }}>
                {!selAct ? (
                  <div style={{ fontSize: 14, color: COLORS.textMuted }}>Tap a constellation to see its words.</div>
                ) : (
                  <>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: COLORS.textMuted, textTransform: "uppercase" }}>{selAct.subject}</div>
                      <h2 style={{ margin: "2px 0 4px", fontFamily: "Poppins, sans-serif", fontSize: 20 }}>{selAct.title}</h2>
                      <div style={{ display: "flex", gap: 12, fontSize: 13, color: COLORS.textMuted, flexWrap: "wrap" }}>
                        {BANDS.filter((b) => selCounts[b.key]).map((b) => (
                          <span key={b.key}><strong style={{ color: BAND_ON_WHITE[b.key] }}>{selCounts[b.key]}</strong> at {b.label}</span>
                        ))}
                        {selCounts.untried > 0 && <span><strong style={{ color: "#1E1B2E" }}>{selCounts.untried}</strong> not practiced</span>}
                      </div>
                    </div>
                    <div style={{ maxHeight: 360, overflowY: "auto", borderTop: "1px solid #EEEAF6" }}>
                      {selRows.map(({ star, c }) => (
                        <button key={star.key} type="button" className="sc-row" onClick={() => setSelKey(star.key)} style={star.key === selKey ? { background: "#F1ECFB" } : undefined}>
                          <span style={{ ...starDotStyle(c.band, { inline: true }), boxShadow: "none", background: BAND_ON_WHITE[c.band] }} />
                          <span style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>{star.label}</span>
                          <span style={{ fontSize: 12, color: COLORS.textMuted }}>
                            {c.pct == null ? "Not practiced" : <strong style={{ color: BAND_ON_WHITE[c.band] }}>{c.pct}%</strong>}{c.stuckIds.length ? ` · ${c.stuckIds.length} stuck` : ""}
                          </span>
                        </button>
                      ))}
                    </div>
                    {selRow && (
                      <div style={{ background: "#F6F2FD", borderRadius: 14, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 700 }}>{selRow.star.label}</div>
                        {selRow.star.detail && <div style={{ fontSize: 13, color: COLORS.textMuted }}>{selRow.star.detail}</div>}
                        <div style={{ fontSize: 12.5, color: COLORS.textMuted }}>
                          {selRow.c.pct == null ? "Nobody has practiced it yet." : <><strong style={{ color: BAND_ON_WHITE[selRow.c.band] }}>{selRow.c.pct}% class average</strong> · {selRow.c.lit} at 80%+ · {selRow.c.stuckIds.length} stuck · {scopeIds.length - selRow.c.tried} haven't tried it</>}
                        </div>
                        {selRow.c.stuckIds.length > 0 ? (
                          <>
                            <div style={{ fontSize: 12.5, fontWeight: 700 }}>Still working on it</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                              {selRow.c.stuckIds.map((id) => (
                                <span key={id} style={{ background: "#FFFFFF", border: "1px solid #E0D8F2", borderRadius: 999, padding: "4px 10px", fontSize: 12.5 }}>{nameOf[id]}</span>
                              ))}
                            </div>
                            <button type="button" disabled={busy} onClick={() => quickRun(selAct.caseStandard, selRow.c.stuckIds, selAct.title)} style={{ ...primary, alignSelf: "flex-start" }}>
                              Quick run for these {selRow.c.stuckIds.length}
                            </button>
                          </>
                        ) : selRow.c.tried ? (
                          <div style={{ fontSize: 13, color: COLORS.textMuted }}>Nobody is stuck on this one.</div>
                        ) : null}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </BridgePage>
  );
}

export default function StarChartPage() {
  return (
    <Suspense fallback={null}>
      <StarChartContent />
    </Suspense>
  );
}
