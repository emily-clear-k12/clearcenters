"use client";
import React, { useState, Suspense } from "react";
import { BridgePage, PageHeading, ClassTabs, Empty } from "../../../../components/teacher/BridgeUI";
import { ClearCodeTabs, useClearCodeClass, callClearCode, statusOf, scanLine, weekStats, ruinLabel, ruinState, recentAccuracy } from "../../../../components/teacher/ClearCodeShared";
import { RUINS, PLANETS, CHAMBERS_PER_RUIN } from "../../../../lib/clearcode/core";

// ClearCode Class progress (Sept 30, 2026): one row per student with the
// teacher controls (on/off, pass mark, place at).
function Progress() {
  const cc = useClearCodeClass();
  const { data, classId } = cc;
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState("");

  if (!cc.ready) return <div className="cc-loading">Loading...</div>;
  const students = (data && data.students) || [];

  async function act(key, payload, done) {
    setBusy(key); setMsg("");
    try { await callClearCode({ classId, ...payload }); await cc.reload(); setMsg(done); }
    catch (e) { setMsg(e.message); }
    setBusy("");
  }

  return (
    <BridgePage teacherEmail={cc.teacherEmail}>
      <PageHeading title="ClearCode" subtitle="Class progress">
        {cc.classes.length > 1 && <ClassTabs classes={cc.classes} value={classId} onChange={cc.setClassId} />}
      </PageHeading>
      <ClearCodeTabs active="progress" classId={classId} />
      {cc.needsSql && <div className="cc-error" role="alert">ClearCode needs a quick database update first (add_clearcode.sql). Run it once in Supabase, then refresh.</div>}
      {cc.error && !cc.needsSql && <div className="cc-error" role="alert">{cc.error}</div>}
      {!cc.classes.length ? <Empty>Make a class first.</Empty> : data === null ? <div className="cc-loading">Loading your class…</div> : !students.length ? <Empty>No students in this class yet.</Empty> : (
        <section className="cc-panel">
          <div className="cc-between" style={{ marginBottom: 6 }}>
            <h3 style={{ margin: 0 }}>Every student</h3>
            {msg && <span className="cc-muted" style={{ fontWeight: 600 }} role="status">{msg}</span>}
          </div>
          <p className="cc-muted" style={{ marginTop: 0 }}>Each ruin is {CHAMBERS_PER_RUIN} daily chambers, then a 15-seal vault. Pass the vault and the student moves to the next ruin. &quot;Place at&quot; moves a student and opens a fresh session today.</p>
          <div className="cc-table-scroll">
            <table className="cc-table">
              <thead>
                <tr><th>Student</th><th>Status</th><th>Ruin</th><th>Chambers</th><th>Vault</th><th>This week</th><th>Recent</th><th>Placement scan</th><th>Pass mark</th><th>Place at</th><th></th></tr>
              </thead>
              <tbody>
                {students.map((s) => {
                  const p = s.progress;
                  const st = statusOf(p);
                  const live = p && (p.status === "on" || p.status === "off") && p.current_ruin;
                  const rs = live ? ruinState(p, p.current_ruin) : null;
                  const wk = weekStats(p);
                  const acc = recentAccuracy(p);
                  const canOn = p && p.status !== "on" && !(p.scan && p.scan.pending);
                  return (
                    <tr key={s.id}>
                      <td><b>{s.firstName}</b></td>
                      <td><span className={`cc-badge ${st.color}`}>{st.label}</span></td>
                      <td>{live ? ruinLabel(p.current_ruin) : "—"}</td>
                      <td>{rs ? `${Math.min(rs.chambers, CHAMBERS_PER_RUIN)} of ${CHAMBERS_PER_RUIN}` : "—"}</td>
                      <td>{rs && rs.vaultTries ? `${rs.vaultTries} ${rs.vaultTries === 1 ? "try" : "tries"} · best ${rs.vaultBest ?? 0}/15` : "—"}</td>
                      <td>{p ? `${wk.sessions} · ${wk.minutes} min` : "—"}</td>
                      <td>{acc === null ? "—" : `${acc}%`}</td>
                      <td style={{ maxWidth: 240 }}>{scanLine(p)}</td>
                      <td>
                        {p ? (
                          <select aria-label={`Pass mark for ${s.firstName}`} value={p.pass_mark === 90 ? 90 : 80} disabled={!!busy}
                            onChange={(e) => act(`mark-${s.id}`, { action: "setPassMark", studentId: s.id, mark: Number(e.target.value) }, `${s.firstName}'s pass mark is now ${e.target.value}%.`)}>
                            <option value={80}>80% (12 of 15)</option>
                            <option value={90}>90% (14 of 15)</option>
                          </select>
                        ) : "—"}
                      </td>
                      <td>
                        <select aria-label={`Place ${s.firstName} at a ruin`} value="" disabled={!!busy}
                          onChange={(e) => e.target.value && act(`place-${s.id}`, { action: "placeAt", studentId: s.id, ruin: e.target.value }, `${s.firstName} now starts at ${ruinLabel(e.target.value)}.`)}>
                          <option value="">Move to…</option>
                          {PLANETS.map((pl) => (
                            <optgroup key={pl.id} label={`${pl.id} · ${pl.name} · ${pl.skill}`}>
                              {RUINS.filter((r) => r.id[0] === pl.id).map((r) => <option key={r.id} value={r.id}>{ruinLabel(r.id)}</option>)}
                            </optgroup>
                          ))}
                        </select>
                      </td>
                      <td>
                        {p && p.status === "on" ? (
                          <button type="button" className="cc-btn quiet" disabled={!!busy} onClick={() => act(`off-${s.id}`, { action: "turnOff", studentId: s.id }, `ClearCode is off for ${s.firstName}. Progress is saved.`)}>Turn off</button>
                        ) : canOn ? (
                          <button type="button" className="cc-btn secondary" disabled={!!busy} onClick={() => act(`on-${s.id}`, { action: "turnOn", studentIds: [s.id] }, `ClearCode is on for ${s.firstName}.`)}>Turn on</button>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </BridgePage>
  );
}

export default function Page() {
  return <Suspense fallback={null}><Progress /></Suspense>;
}
