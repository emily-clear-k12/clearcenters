"use client";
import React, { useState, Suspense } from "react";
import { BridgePage, PageHeading, ClassTabs, Empty } from "../../../../components/teacher/BridgeUI";
import { ClearDecodeTabs, useClearDecodeClass, statusOf, weekStats, recentAccuracy, familyNote, ruinLabel, masteredRuins, troubleSpots, rereadNote, isComplete } from "../../../../components/teacher/ClearDecodeShared";
import { RUIN_ORDER } from "../../../../lib/cleardecode/core";

// ClearDecode Report (Sept 30, 2026): patterns mastered, re-scan growth,
// practice time, family notes, and a CSV for Excel.
function growthOf(p) {
  const h = (p && p.scan && p.scan.history) || [];
  if (h.length < 2) return null;
  const first = h[0];
  const last = h[h.length - 1];
  return { from: first.scoredOut ? "scored out" : ruinLabel(first.startRuin), to: last.scoredOut ? "scored out" : ruinLabel(last.startRuin), gained: (last.mastered || 0) - (first.mastered || 0) };
}

function rowFor(s) {
  const p = s.progress;
  const st = statusOf(p);
  const wk = weekStats(p);
  const g = growthOf(p);
  return {
    s, p, st, wk, g,
    mastered: masteredRuins(p || {}).length,
    acc: recentAccuracy(p),
    ruin: p && p.status === "on" && p.current_ruin ? ruinLabel(p.current_ruin) : p && p.status === "on" && isComplete(p) ? "Finished (keeper practice)" : "—",
    trouble: troubleSpots(p).map((t) => `${ruinLabel(t.ruin)} (${t.why})`).join("; "),
    reread: rereadNote(p) || "",
  };
}

const csvCell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

function Report() {
  const cc = useClearDecodeClass();
  const { data, classId, cls } = cc;
  const [copied, setCopied] = useState(null);
  if (!cc.ready) return <div className="cc-loading">Loading...</div>;
  const students = (data && data.students) || [];
  const rows = students.filter((s) => s.progress).map(rowFor);
  const total = RUIN_ORDER.length;

  function download() {
    const head = ["Student", "Status", "Current ruin", "Patterns mastered", `Of ${total}`, "Sessions this week", "Minutes this week", "Recent accuracy %", "First scan start", "Latest scan start", "Patterns gained since first scan", "Trouble spots", "Last reread"];
    const lines = rows.map((r) => [r.s.firstName, r.st.label, r.ruin, r.mastered, total, r.wk.sessions, r.wk.minutes, r.acc ?? "", r.g ? r.g.from : "", r.g ? r.g.to : "", r.g ? r.g.gained : "", r.trouble, r.reread].map(csvCell).join(","));
    const blob = new Blob([[head.map(csvCell).join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ClearDecode report${cls?.name ? ` - ${cls.name}` : ""}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function copy(text, key) {
    try { await navigator.clipboard.writeText(text); setCopied(key); setTimeout(() => setCopied(null), 1800); } catch (e) { setCopied("fail"); }
  }

  return (
    <BridgePage teacherEmail={cc.teacherEmail}>
      <PageHeading title="ClearDecode" subtitle="Report">
        {cc.classes.length > 1 && <ClassTabs classes={cc.classes} value={classId} onChange={cc.setClassId} />}
      </PageHeading>
      <ClearDecodeTabs active="report" classId={classId} />
      {cc.needsSql && <div className="cc-error" role="alert">ClearDecode needs a quick database update first (add_clearcode.sql). Run it once in Supabase, then refresh.</div>}
      {cc.error && !cc.needsSql && <div className="cc-error" role="alert">{cc.error}</div>}
      {!cc.classes.length ? <Empty>Make a class first.</Empty> : data === null ? <div className="cc-loading">Loading your class…</div> : !rows.length ? <Empty>No ClearDecode results yet. Send the placement scan from the Overview tab.</Empty> : (
        <>
          <section className="cc-panel" style={{ marginBottom: 18 }}>
            <div className="cc-between" style={{ marginBottom: 6 }}>
              <h3 style={{ margin: 0 }}>Patterns and practice</h3>
              <button type="button" className="cc-btn secondary" onClick={download}>Download for Excel</button>
            </div>
            <p className="cc-muted" style={{ marginTop: 0 }}>&quot;Patterns mastered&quot; counts the ruins below a student&apos;s scan start plus every vault passed, out of {total} in UFLI order. Growth compares the first placement scan to the latest re-scan.</p>
            <div className="cc-table-scroll">
              <table className="cc-table">
                <thead><tr><th>Student</th><th>Status</th><th>Working on</th><th>Patterns mastered</th><th>This week</th><th>Recent accuracy</th><th>Trouble spots</th><th>Re-scan growth</th></tr></thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.s.id}>
                      <td><b>{r.s.firstName}</b></td>
                      <td><span className={`cc-badge ${r.st.color}`}>{r.st.label}</span></td>
                      <td>{r.ruin}</td>
                      <td>{r.mastered} of {total}</td>
                      <td>{r.wk.sessions} {r.wk.sessions === 1 ? "session" : "sessions"} · {r.wk.minutes} min</td>
                      <td>{r.acc === null ? "—" : `${r.acc}%`}{r.reread && <div className="cc-muted" style={{ fontSize: 12 }}>{r.reread}</div>}</td>
                      <td style={{ maxWidth: 240, fontSize: 13 }}>{r.trouble || "—"}</td>
                      <td>{r.g ? `${r.g.from} → ${r.g.to}${r.g.gained > 0 ? ` (+${r.g.gained})` : ""}` : "Re-scan to see growth"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="cc-panel">
            <h3>Family notes</h3>
            <p className="cc-muted" style={{ marginTop: 0 }}>A short, plain-language note for each student in ClearDecode. Copy it into an email or your parent app.</p>
            {rows.filter((r) => r.p.status === "on").length === 0 ? <p className="cc-muted" style={{ margin: 0 }}>Notes show up once students are in ClearDecode.</p> : rows.filter((r) => r.p.status === "on").map((r) => {
              const note = familyNote(r.s.firstName, r.p);
              return (
                <div key={r.s.id} className="cc-person" style={{ alignItems: "flex-start" }}>
                  <div className="cc-avatar">{(r.s.firstName || "?").slice(0, 1)}</div>
                  <div style={{ flex: 1 }}><strong>{r.s.firstName}</strong><p>{note}</p></div>
                  <button type="button" className="cc-btn quiet" onClick={() => copy(note, r.s.id)}>{copied === r.s.id ? "Copied" : "Copy"}</button>
                </div>
              );
            })}
          </section>
        </>
      )}
    </BridgePage>
  );
}

export default function Page() {
  return <Suspense fallback={null}><Report /></Suspense>;
}
