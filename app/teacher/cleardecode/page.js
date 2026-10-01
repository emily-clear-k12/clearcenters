"use client";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import { BridgePage, PageHeading, ClassTabs, Empty } from "../../../components/teacher/BridgeUI";
import { ClearDecodeTabs, useClearDecodeClass, callClearDecode, statusOf, scanLine, weekStats, ruinLabel, needsHelp, troubleSpots, isComplete, RUIN_ORDER } from "../../../components/teacher/ClearDecodeShared";

// ClearDecode teacher Overview (Sept 30, 2026). Mirrors the ClearKeys Overview:
// hero, setup action, who needs you, this week, tools.
function Overview() {
  const cc = useClearDecodeClass();
  const { data, classId, cls } = cc;
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState("");
  const [picked, setPicked] = useState(null);
  const [lesson, setLesson] = useState(null);

  if (!cc.ready) return <div className="cc-loading">Loading...</div>;
  const students = (data && data.students) || [];
  const counts = { none: 0, scanWait: 0, needs: 0, out: 0, on: 0, help: 0, off: 0 };
  students.forEach((s) => { counts[statusOf(s.progress).key] += 1; });
  const inCode = counts.on + counts.help;
  const needsList = students.filter((s) => statusOf(s.progress).key === "needs");
  const sel = picked || needsList.map((s) => s.id);
  const help = students.map((s) => ({ s, h: needsHelp(s.progress) })).filter((x) => x.h);
  const week = students.reduce((a, s) => { const w = weekStats(s.progress); return { sessions: a.sessions + w.sessions, minutes: a.minutes + w.minutes }; }, { sessions: 0, minutes: 0 });
  const q = classId ? `?classId=${classId}` : "";

  async function act(action, extra, done) {
    setBusy(action); setMsg("");
    try { await callClearDecode({ action, classId, ...extra }); await cc.reload(); setMsg(done); setPicked(null); }
    catch (e) { setMsg(e.message); }
    setBusy("");
  }

  return (
    <BridgePage teacherEmail={cc.teacherEmail}>
      <PageHeading title="ClearDecode" subtitle="Daily word-reading practice for students who need it">
        {cc.classes.length > 1 && <ClassTabs classes={cc.classes} value={classId} onChange={cc.setClassId} />}
      </PageHeading>
      <ClearDecodeTabs active="home" classId={classId} />
      {!cc.classes.length ? <Empty>Make a class first, then come back to send the placement scan.</Empty> : (
        <>
          <section className="cc-panel cc-hero" style={{ marginBottom: 18 }}>
            <div className="cc-hero-main">
              <div>
                <p className="cc-eyebrow">20 minutes a day · grown-up practice for struggling readers</p>
                <h2 style={{ margin: "0 0 8px" }}>{data === null ? "Loading your class…" : students.length === 0 ? "No students in this class yet" : `${inCode} of ${students.length} students are in ClearDecode`}</h2>
                <p className="cc-muted" style={{ margin: 0 }}>
                  {cls?.name ? `${cls.name}. ` : ""}Every student takes a short placement scan. Students who need practice start exactly at their first gap in the phonics sequence (UFLI order), then work through one ruin a week. Students never see a level or a score.
                </p>
                {students.length > 0 && (
                  <div className="cc-row" style={{ marginTop: 16 }}>
                    <button type="button" className="cc-btn" disabled={!!busy} onClick={() => act("sendScan", {}, "Scan sent. Students see a ClearDecode orb on their Home screen.")}>
                      {busy === "sendScan" ? "Sending…" : counts.none === students.length ? "Send the placement scan to the class" : "Send the scan again (re-scan)"}
                    </button>
                    <span className="cc-muted" style={{ fontSize: 13 }}>About 10 minutes. Strong readers finish in 3–4.</span>
                  </div>
                )}
                {msg && <p className="cc-muted" style={{ margin: "10px 0 0", fontWeight: 600 }} role="status">{msg}</p>}
              </div>
              <img src="/relay/station_hero.jpg" alt="" />
            </div>
          </section>

          {cc.needsSql && <div className="cc-error" role="alert">ClearDecode needs a quick database update first (add_clearcode.sql). Run it once in Supabase, then refresh.</div>}
          {cc.error && !cc.needsSql && <div className="cc-error" role="alert">{cc.error}</div>}

          {data && students.length > 0 && counts.none === students.length && (
            <section className="cc-panel" style={{ marginBottom: 18 }}>
              <h3>Getting started</h3>
              <p className="cc-muted" style={{ marginTop: 0 }}>Nobody in {cls?.name || "this class"} has taken the scan yet. Here is how it goes.</p>
              <div className="cc-three">
                {[
                  { n: 1, t: "Send the scan", d: "Click the button above. Every student gets a ClearDecode orb on Home with a short placement scan." },
                  { n: 2, t: "Students scan the ruins", d: "Students hear words and tap or build them. They only see \"Scan complete,\" never a score." },
                  { n: 3, t: "Turn it on", d: "Results show up here. ClearDecode suggests who needs it and where each student starts. One click turns it on." },
                ].map((x) => (
                  <div key={x.n} className="cc-mini" style={{ alignItems: "flex-start", background: "#f8f6fc" }}>
                    <div><strong>{x.n}. {x.t}</strong><p>{x.d}</p></div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data && students.length > 0 && counts.none < students.length && (
            <div className="cc-three" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))", marginBottom: 18 }}>
              {[
                { n: counts.scanWait, label: "scan waiting", color: "#70658d" },
                { n: counts.needs, label: "need ClearDecode", color: "#b06a00" },
                { n: inCode, label: "in ClearDecode", color: "#513193" },
                { n: counts.out, label: "scored out", color: "#087b64" },
              ].map((t) => (
                <div key={t.label} className="cc-summary" style={{ margin: 0 }}><strong style={{ color: t.color }}>{t.n}</strong><span>{t.label}</span></div>
              ))}
            </div>
          )}

          {needsList.length > 0 && (
            <section className="cc-panel" style={{ marginBottom: 18 }}>
              <h3>Scan results: who needs ClearDecode</h3>
              <p className="cc-muted" style={{ marginTop: 0 }}>Checked students are ClearDecode&apos;s suggestion. Uncheck anyone you don&apos;t want to turn on.</p>
              <div className="cc-table-scroll">
                <table className="cc-table">
                  <thead><tr><th style={{ width: 40 }}></th><th>Student</th><th>Scan result</th></tr></thead>
                  <tbody>
                    {needsList.map((s) => (
                      <tr key={s.id}>
                        <td><input type="checkbox" aria-label={`Turn on for ${s.firstName}`} checked={sel.includes(s.id)} onChange={(e) => setPicked(e.target.checked ? [...sel, s.id] : sel.filter((x) => x !== s.id))} /></td>
                        <td><b>{s.firstName}</b></td>
                        <td>{scanLine(s.progress)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="cc-row" style={{ marginTop: 14 }}>
                <button type="button" className="cc-btn" disabled={!sel.length || !!busy} onClick={() => act("turnOn", { studentIds: sel }, `ClearDecode is on for ${sel.length} ${sel.length === 1 ? "student" : "students"}.`)}>
                  {busy === "turnOn" ? "Turning on…" : `Turn on ClearDecode for ${sel.length} ${sel.length === 1 ? "student" : "students"}`}
                </button>
              </div>
            </section>
          )}

          {data && inCode > 0 && (
            <div className="cc-two" style={{ marginBottom: 18 }}>
              <section className="cc-panel cc-attention">
                <h3>Who needs you</h3>
                {help.length === 0 ? <p className="cc-muted" style={{ margin: 0 }}>Nobody is stuck right now. A student shows up here after missing a vault twice, or two sessions under 60%.</p> : help.map(({ s, h }) => {
                  const ml = s.miniLesson;
                  return (
                    <div key={s.id}>
                      <div className="cc-person">
                        <div className="cc-avatar">{(s.firstName || "?").slice(0, 1)}</div>
                        <div><strong>{s.firstName}</strong><p>{h.reason}</p></div>
                        {ml && <button type="button" className="cc-btn secondary" onClick={() => setLesson(lesson === s.id ? null : s.id)}>{lesson === s.id ? "Hide" : "Mini-lesson"}</button>}
                      </div>
                      {lesson === s.id && ml && (
                        <div style={{ background: "#f8f6fc", borderRadius: 12, padding: "12px 16px", margin: "6px 0 12px" }}>
                          <strong>{ml.title}</strong> <span className="cc-muted">· 5 minutes, small group</span>
                          <ol style={{ margin: "8px 0 0", paddingLeft: 20 }}>{ml.steps.map((st, i) => <li key={i} style={{ marginBottom: 4 }}>{st}</li>)}</ol>
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>
              <section className="cc-panel">
                <h3>This week</h3>
                <p className="cc-muted" style={{ marginTop: 0 }}>{week.sessions} {week.sessions === 1 ? "session" : "sessions"} finished · {week.minutes} minutes of practice across the class.</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    { href: `/teacher/cleardecode/progress${q}`, name: "Class progress", what: "Each student's ruin, vault results, pass mark and place-at." },
                    { href: `/teacher/cleardecode/report${q}`, name: "Report", what: "Patterns mastered, re-scan growth, family notes, Excel." },
                    { href: `/teacher/cleardecode/words${q}`, name: "Class words", what: "This week's big words from what your class is assigned." },
                    { href: `/teacher/cleardecode/kit${q}`, name: "Small-group kits", what: "Print a mini-lesson, cards, sort and logs for any pattern." },
                  ].map((t) => (
                    <Link key={t.name} href={t.href} className="cc-board-tile" style={{ border: "1px solid #eee9f7" }}>
                      <strong>{t.name}</strong>
                      <span>{t.what}</span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          )}
          {data && inCode > 0 && (() => {
            const active = students.filter((st) => st.progress && st.progress.status === "on");
            const byRuin = {};
            active.forEach((st) => { const k = st.progress.current_ruin || (isComplete(st.progress) ? "KEEP" : null); if (k) (byRuin[k] = byRuin[k] || []).push(st); });
            const order = (k) => (k === "KEEP" ? 999 : RUIN_ORDER.indexOf(k));
            const groups = Object.entries(byRuin).sort((a, b) => order(a[0]) - order(b[0]));
            const shared = {};
            active.forEach((st) => troubleSpots(st.progress).forEach((t) => { (shared[t.ruin] = shared[t.ruin] || []).push(st.firstName); }));
            const common = Object.entries(shared).filter(([, names]) => names.length >= 2).sort((a, b) => b[1].length - a[1].length).slice(0, 4);
            const kit = (ruin) => `/teacher/cleardecode/kit?ruin=${ruin}${classId ? `&classId=${classId}` : ""}`;
            return (
              <section className="cc-panel" style={{ marginBottom: 18 }}>
                <h3>Small groups</h3>
                <p className="cc-muted" style={{ marginTop: 0 }}>Students working on the same pattern, and trouble spots more than one student shares. Each kit prints the mini-lesson, word cards, a sort, spelling words and the logs.</p>
                <div className="cc-two">
                  <div>
                    <strong style={{ fontSize: 14 }}>Working on the same pattern</strong>
                    {groups.map(([ruin, list]) => (
                      <div key={ruin} className="cc-person">
                        <div className="cc-avatar">{list.length}</div>
                        <div><strong>{ruin === "KEEP" ? "Finished · keeper practice" : ruinLabel(ruin)}</strong><p>{list.map((st) => `${st.firstName}${needsHelp(st.progress) ? " (stuck)" : ""}`).join(", ")}</p></div>
                        {ruin !== "KEEP" && <Link href={kit(ruin)} className="cc-btn secondary">Group kit</Link>}
                      </div>
                    ))}
                  </div>
                  <div>
                    <strong style={{ fontSize: 14 }}>Shared trouble spots</strong>
                    {common.length === 0 ? <p className="cc-muted">None yet. When two or more students struggle with the same pattern, it shows up here.</p> : common.map(([ruin, names]) => (
                      <div key={ruin} className="cc-person">
                        <div className="cc-avatar" style={{ background: "#fde8eb", color: "#b42b3a" }}>{names.length}</div>
                        <div><strong>{ruinLabel(ruin)}</strong><p>{names.join(", ")}</p></div>
                        <Link href={kit(ruin)} className="cc-btn secondary">Reteach kit</Link>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })()}
          <p className="cc-muted" style={{ fontSize: 12.5 }}>ClearDecode is supplemental practice. It reinforces, and does not replace, your district&apos;s reading intervention or dyslexia program, and the placement scan is not a reading screener.</p>
        </>
      )}
    </BridgePage>
  );
}

export default function Page() {
  return <Suspense fallback={null}><Overview /></Suspense>;
}
