"use client";

// Reports — Sept 28, 2026 rebuild.
// One page, four tabs, each answering one question a teacher asks:
//   Snapshot          What needs me this week?
//   Standards         Where is the class on each TEKS?
//   Students          Who is growing, and who is slipping?
//   Confidence Check  Who believes something that isn't right?
// The numbers come from the same book as the gradebook (lib/gradebook.js),
// worked out in lib/reports.js, so the two pages always agree.
// A student's own report (reports/student/[id]) is unchanged and linked from
// the Students tab. It has the family share link.

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import { BridgePage, Empty } from "../../../components/teacher/BridgeUI";
import { rememberedTeacherClass, rememberTeacherClass } from "../../../lib/teacherClass";
import { levelWord } from "../../../lib/gradeScale";
import { PERIODS, buildGradebook, clip } from "../../../lib/gradebook";
import { buildReport } from "../../../lib/reports";
import "./reports.css";

const TABS = [
  ["snapshot", "Snapshot", "What needs me this week?"],
  ["standards", "Standards", "Where is the class on each TEKS?"],
  ["students", "Students", "Who is growing, who is slipping?"],
  ["confidence", "Confidence Check", "Who believes something that isn't right?"],
];
const COLOR = { 2: "#1f8a4d", 1: "#e0a800", 0: "#d64545" };
const SURE = [["strong", "Really strong"], ["solid", "Pretty solid"], ["shaky", "Still shaky"]];
const DIRECTION = { improving: "Improving", slipping: "Slipping", steady: "Steady" };

function niceWeek(t) {
  return new Date(t).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function assignHref({ classId, code, subject, students }) {
  const params = new URLSearchParams();
  if (classId) params.set("classId", classId);
  if (code) params.set("standard", code);
  if (subject) params.set("subject", subject);
  if (students && students.length) params.set("students", students.join(","));
  return `/teacher/assign/new?${params.toString()}`;
}

function Bar({ counts, tip }) {
  const total = counts[0] + counts[1] + counts[2];
  if (!total) return <div className="rp-bar empty" aria-label="Nothing graded yet" />;
  return (
    <div className="rp-bar" role="img" aria-label={`${counts[2]} got it, ${counts[1]} almost, ${counts[0]} not yet`}>
      {[2, 1, 0].filter((k) => counts[k]).map((k) => (
        <span key={k} style={{ width: `${(counts[k] / total) * 100}%`, background: COLOR[k] }}
          onMouseMove={(e) => tip(e, `${levelWord(k)}: ${counts[k]} (${Math.round((counts[k] / total) * 100)}%)`)} onMouseLeave={() => tip(null)} />
      ))}
    </div>
  );
}

function Legend() {
  return <div className="rp-legend"><span><i style={{ background: COLOR[2] }} />Got it</span><span><i style={{ background: COLOR[1] }} />Almost</span><span><i style={{ background: COLOR[0] }} />Not yet</span></div>;
}

function Chip({ level }) {
  if (level == null) return <span className="rp-muted">—</span>;
  return <span className={`rp-chip k${level}`}>{levelWord(level)}</span>;
}

// Share of graded work at Got it and at Not yet, week by week.
function WeekChart({ weeks, tip }) {
  if (weeks.length < 2) return <p className="rp-muted" style={{ marginTop: 12 }}>This fills in once work has been graded in at least two different weeks.</p>;
  const W = 560, H = 200, P = { l: 38, r: 58, t: 14, b: 28 };
  const x = (i) => P.l + (i * (W - P.l - P.r)) / (weeks.length - 1);
  const y = (v) => P.t + (1 - v) * (H - P.t - P.b);
  const last = weeks[weeks.length - 1];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Share of graded work at Got it and Not yet by week">
      {[0, 0.25, 0.5, 0.75, 1].map((v) => (
        <g key={v}><line x1={P.l} x2={W - P.r} y1={y(v)} y2={y(v)} stroke="#eeeaf5" /><text x={P.l - 6} y={y(v) + 4} fontSize="10" fill="#8a80a6" textAnchor="end">{v * 100}%</text></g>
      ))}
      {weeks.map((w, i) => <text key={w.week} x={x(i)} y={H - 8} fontSize="11" fill="#70658d" textAnchor="middle">{niceWeek(w.week)}</text>)}
      {[["got", COLOR[2]], ["notYet", COLOR[0]]].map(([key, c]) => (
        <g key={key}>
          <polyline fill="none" stroke={c} strokeWidth="2.5" points={weeks.map((w, i) => `${x(i)},${y(w[key])}`).join(" ")} />
          {weeks.map((w, i) => <circle key={w.week} cx={x(i)} cy={y(w[key])} r="5" fill={c} stroke="#fff" strokeWidth="2" />)}
        </g>
      ))}
      <text x={x(weeks.length - 1) + 9} y={y(last.got) + 4} fontSize="11" fontWeight="700" fill="#1f8a4d">Got it</text>
      <text x={x(weeks.length - 1) + 9} y={y(last.notYet) + 4} fontSize="11" fontWeight="700" fill="#c93c3c">Not yet</text>
      {weeks.map((w, i) => (
        <rect key={w.week} x={x(i) - 30} y={0} width={60} height={H} fill="transparent"
          onMouseMove={(e) => tip(e, `Week of ${niceWeek(w.week)}: Got it ${Math.round(w.got * 100)}% · Almost ${Math.round(w.almost * 100)}% · Not yet ${Math.round(w.notYet * 100)}% (${w.n} graded)`)}
          onMouseLeave={() => tip(null)} />
      ))}
    </svg>
  );
}

function Dots({ marks, tip }) {
  if (marks.length < 2) return <span className="rp-muted">—</span>;
  const W = 110, H = 26;
  const x = (i) => 5 + (i * (W - 10)) / (marks.length - 1);
  const y = (k) => H - 5 - (k * (H - 10)) / 2;
  return (
    <svg width={W} height={H} role="img" aria-label={marks.map((m) => levelWord(m.kind)).join(", ")}>
      <polyline fill="none" stroke="#b7a6dd" strokeWidth="2" points={marks.map((m, i) => `${x(i)},${y(m.kind)}`).join(" ")} />
      {marks.map((m, i) => <circle key={i} cx={x(i)} cy={y(m.kind)} r="4" fill={COLOR[m.kind]} stroke="#fff" strokeWidth="1.5"
        onMouseMove={(e) => tip(e, `${m.title}: ${levelWord(m.kind)}`)} onMouseLeave={() => tip(null)} />)}
    </svg>
  );
}

function Snapshot({ report, classId, setTab, tip }) {
  const { snap, todo, rows, weeks } = report;
  const tiles = [[2, "On track", "mostly Got it"], [1, "Getting there", "mostly Almost"], [0, "Needs help", "mostly Not yet"]];
  function delta(k) {
    if (!snap.beforeCounts) return null;
    const n = snap.nowCounts[k] - snap.beforeCounts[k];
    if (!n) return <div className="rp-delta same">Same as two weeks ago</div>;
    const good = (k === 2) === (n > 0) && k !== 1;
    return <div className={`rp-delta ${k === 1 ? "same" : good ? "good" : "bad"}`}>{n > 0 ? "▲" : "▼"} {Math.abs(n)} since two weeks ago</div>;
  }
  function actions(item) {
    if (item.kind === "reteach") {
      const ids = item.students.map((s) => s.id);
      return <>
        <Link className="cc-btn" href={assignHref({ classId, code: item.standard.code, subject: item.standard.subject, students: ids })}>Assign to these {ids.length}</Link>
        <Link className="cc-btn secondary" href={`/teacher/gradebook?classId=${classId}&view=standard&groups=${encodeURIComponent(item.standard.key)}`}>Small groups</Link>
      </>;
    }
    if (item.kind === "direction") return <>
      <Link className="cc-btn" href="/teacher/messages">Send a note</Link>
      <button type="button" className="cc-btn secondary" onClick={() => setTab("students")}>See the Students tab</button>
    </>;
    if (item.kind === "confidence") return <button type="button" className="cc-btn" onClick={() => setTab("confidence")}>Open Confidence Check</button>;
    if (item.kind === "missing") return <>
      <Link className="cc-btn" href="/teacher/messages">Send reminders</Link>
      <Link className="cc-btn secondary" href={`/teacher/gradebook?classId=${classId}&view=grid`}>Open the gradebook</Link>
    </>;
    if (item.kind === "waiting") return <Link className="cc-btn" href="/teacher/grade">Open the review list</Link>;
    return null;
  }
  return (
    <>
      <div className="rp-grid rp-g3">
        {tiles.map(([k, label, sub]) => (
          <div key={k} className={`rp-tile k${k}`}><strong>{snap.nowCounts[k]}</strong><div><b>{label}</b><span>{sub}</span>{delta(k)}</div></div>
        ))}
      </div>
      <div className="rp-grid rp-g2" style={{ marginTop: 14 }}>
        <section className="rp-panel">
          <h2>What to do this week</h2>
          <p className="rp-muted">Worked out from the grades. Each one has the next step ready.</p>
          {todo.length ? todo.map((item, i) => (
            <div key={i} className="rp-todo">
              <div className={`rp-todo-mark ${item.tone}`} />
              <div style={{ minWidth: 0 }}>
                <h3>{item.title}</h3>
                {item.sub && <p className="rp-small">{item.sub}</p>}
                <p>{item.text}</p>
                <div className="rp-row">{actions(item)}</div>
              </div>
            </div>
          )) : <p className="rp-muted" style={{ marginTop: 14 }}>Nothing needs you right now. Nice.</p>}
        </section>
        <div className="rp-grid" style={{ alignContent: "start" }}>
          <section className="rp-panel">
            <h2>Is the class getting it?</h2>
            <p className="rp-muted">Share of graded work at Got it and at Not yet, week by week.</p>
            <WeekChart weeks={weeks} tip={tip} />
          </section>
          <section className="rp-panel">
            <h2>Standards at a glance</h2>
            <p className="rp-muted">Weakest first. Full detail on the Standards tab.</p>
            {rows.map((r) => (
              <div key={r.key} className="rp-glance">
                <b>{r.code}{new Set(rows.map((x) => x.subject)).size > 1 && <small>{r.subject}</small>}</b>
                {r.assessed ? <Bar counts={r.counts} tip={tip} /> : <span className="rp-muted" style={{ fontSize: 12 }}>Not graded yet</span>}
              </div>
            ))}
            {rows.length > 0 && <Legend />}
          </section>
        </div>
      </div>
    </>
  );
}

function Standards({ report, book, classId, grade, tip }) {
  const multi = new Set(report.rows.map((r) => r.subject)).size > 1;
  return (
    <>
      <section className="rp-panel">
        <h2>Where the class is on each standard</h2>
        <p className="rp-muted">Each student's level on a standard comes from every activity for it. Weakest first.</p>
        <div className="rp-std head" style={{ marginTop: 12 }}><span>Standard</span><span>Class</span><span>Assessed</span><span>Waiting</span><span /></div>
        {report.rows.map((r) => (
          <div key={r.key} className="rp-std">
            <div>
              <b>TEKS {r.code}</b> {multi && r.subject && <span className="rp-pill">{r.subject}</span>}
              <div className="rp-muted" title={r.wording}>{r.topic}</div>
            </div>
            <div>
              <Bar counts={r.counts} tip={tip} />
              <div className="rp-muted" style={{ marginTop: 4 }}>{r.counts[2]} got it · {r.counts[1]} almost · {r.counts[0]} not yet</div>
            </div>
            <div className="rp-muted">{r.assessed} of {book.students.length} · {r.columnIds.length} {r.columnIds.length === 1 ? "activity" : "activities"}</div>
            <div className="rp-muted">{r.waiting ? `${r.waiting} to grade` : "—"}</div>
            <div className="rp-row">
              <Link className="cc-btn" href={`/teacher/gradebook?classId=${classId}&view=standard&groups=${encodeURIComponent(r.key)}`}>Small groups</Link>
              <Link className="cc-btn secondary" href={assignHref({ classId, code: r.code, subject: r.subject })}>Assign</Link>
            </div>
          </div>
        ))}
        {!report.rows.length && <p className="rp-muted" style={{ marginTop: 12 }}>No standards yet. They appear as activities are assigned.</p>}
        {report.rows.length > 0 && <Legend />}
      </section>
      {Object.keys(report.gaps).length > 0 && (
        <div className={`rp-grid ${Object.keys(report.gaps).length > 1 ? "rp-gh" : ""}`} style={{ marginTop: 14 }}>
          {Object.entries(report.gaps).map(([subject, list]) => (
            <section key={subject} className="rp-panel">
              <h2>Not taught yet · Grade {grade} {subject}</h2>
              <p className="rp-muted">Grade-level standards with no activity assigned to this class in this time. Click one to find activities for it.</p>
              <div className="rp-gaps">
                {list.map((g) => <Link key={g.code} href={assignHref({ classId, code: g.code, subject })} title={g.text}><b>{g.code}</b> {clip(g.text, 34)}</Link>)}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}

function Students({ report, tip }) {
  return (
    <section className="rp-panel">
      <h2>Every student, needs-help first</h2>
      <p className="rp-muted">The dots are each graded activity in order, so you can see the direction, not just the average. Click a name for that student's full report and family link.</p>
      <div style={{ overflowX: "auto", marginTop: 12 }}>
        <table className="rp-table">
          <thead><tr><th>Student</th><th>Now</th><th>Grades in order</th><th>Direction</th><th>Strongest</th><th>Weakest</th><th>Missing</th><th>Strong, but Not yet</th></tr></thead>
          <tbody>
            {report.students.map((r) => (
              <tr key={r.student.id}>
                <td><Link href={`/teacher/reports/student/${r.student.id}`}>{r.student.first_name}</Link></td>
                <td><Chip level={r.now} /></td>
                <td><Dots marks={r.marks} tip={tip} /></td>
                <td><span className={`rp-pill ${r.direction}`}>{DIRECTION[r.direction]}</span></td>
                <td>{r.strongest ? <>{r.strongest.code} <span className={`rp-chip k${r.strongest.level}`}>{r.strongest.level}</span></> : "—"}</td>
                <td>{r.weakest ? <>{r.weakest.code} <span className={`rp-chip k${r.weakest.level}`}>{r.weakest.level}</span></> : "—"}</td>
                <td>{r.missing ? <span className="rp-flag">{r.missing}{r.pastDue ? ` (${r.pastDue} past due)` : ""}</span> : "—"}</td>
                <td>{r.sureNotYet ? <span className="rp-flag wait">{r.sureNotYet}</span> : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Confidence({ report, classId }) {
  const { grid } = report;
  const unique = (list) => [...new Map(list.map((x) => [x.studentId, x])).values()];
  const hot = unique(grid.strong0 || []);
  const warm = unique(grid.shaky2 || []);
  const total = Object.values(grid).reduce((n, l) => n + l.length, 0);
  return (
    <div className="rp-grid rp-g2">
      <section className="rp-panel">
        <h2>How sure were they, and were they right?</h2>
        <p className="rp-muted">Every graded piece of work, placed by what the student said before turning it in ("How sure are you?") and the grade you gave it.</p>
        {total === 0 ? <p className="rp-muted" style={{ marginTop: 12 }}>This fills in as graded work comes in with the students' answers.</p> : (
          <div className="rp-conf">
            <div />
            {[2, 1, 0].map((g) => <div key={g} className="h col"><Chip level={g} /></div>)}
            {SURE.map(([id, label]) => (
              <React.Fragment key={id}>
                <div className="h">{label}</div>
                {[2, 1, 0].map((g) => {
                  const list = grid[`${id}${g}`] || [];
                  const cls = id === "strong" && g === 0 ? "hot" : id === "shaky" && g === 2 ? "warm" : "";
                  return (
                    <div key={g} className={`c ${cls}`}>
                      <b>{list.length}</b>
                      {cls && list.length > 0 && <div className="rp-names">{unique(list).map((x) => x.name).join(", ")}</div>}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        )}
      </section>
      <div className="rp-grid" style={{ alignContent: "start" }}>
        <section className="rp-panel" style={{ borderColor: "#f3c4c4" }}>
          <h3 style={{ color: "#c93c3c" }}>Really strong, but Not yet</h3>
          <p className="rp-muted">The most important box. These students believe something that isn't right. Reteach the idea, not just the steps.</p>
          {hot.length > 0 && <>
            <div className="rp-names" style={{ margin: "8px 0 10px", fontSize: 12 }}>{hot.map((x) => `${x.name} (${x.column?.short || ""})`).join(", ")}</div>
            <div className="rp-row"><Link className="cc-btn" href={assignHref({ classId, students: hot.map((x) => x.studentId) })}>Assign to these {hot.length}</Link></div>
          </>}
        </section>
        <section className="rp-panel" style={{ borderColor: "#d9c9f5" }}>
          <h3 style={{ color: "#6a3fc6" }}>Still shaky, but Got it</h3>
          <p className="rp-muted">They know more than they think. A quick "you had this" goes a long way.</p>
          {warm.length > 0 && <>
            <div className="rp-names" style={{ margin: "8px 0 10px", fontSize: 12 }}>{warm.map((x) => x.name).join(", ")}</div>
            <div className="rp-row"><Link className="cc-btn secondary" href="/teacher/messages">Send a note</Link></div>
          </>}
        </section>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const router = useRouter();
  const [teacherEmail, setTeacherEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ classes: [], students: [], assignments: [], targets: [], submissions: [], cases: [] });
  const [classId, setClassId] = useState("");
  const [period, setPeriod] = useState("all");
  const [tab, setTab] = useState("snapshot");
  const [tipState, setTipState] = useState(null);

  // ?tab=students when coming back from a student's report.
  useEffect(() => {
    const asked = new URLSearchParams(window.location.search).get("tab");
    if (TABS.some(([key]) => key === asked)) setTab(asked);
  }, []);

  const tip = useCallback((e, text) => {
    if (!e) { setTipState(null); return; }
    setTipState({ x: Math.min(e.clientX + 14, window.innerWidth - 270), y: e.clientY + 14, text });
  }, []);

  const load = useCallback(async (teacherId) => {
    setLoading(true);
    setError(null);
    const { data: classes, error: classError } = await supabase.from("classes").select("id, name, subject, grade").eq("teacher_id", teacherId).order("name");
    if (classError) { setError("Couldn't load your classes. Refresh and try again."); setLoading(false); return; }
    const classIds = (classes || []).map((c) => c.id);
    if (!classIds.length) { setData((d) => ({ ...d, classes: [] })); setLoading(false); return; }
    const [{ data: students }, { data: assignments }] = await Promise.all([
      supabase.from("students").select("*").in("class_id", classIds),
      supabase.from("assignments").select("id, case_standard, class_id, game_skin, due_date, created_at").in("class_id", classIds),
    ]);
    const assignmentIds = (assignments || []).map((a) => a.id);
    const standards = [...new Set((assignments || []).map((a) => a.case_standard).filter(Boolean))];
    const [targetResult, submissionResult, caseResult] = await Promise.all([
      assignmentIds.length ? supabase.from("assignment_students").select("assignment_id, student_id").in("assignment_id", assignmentIds) : { data: [] },
      assignmentIds.length ? supabase.from("submissions").select("id, student_id, assignment_id, submitted_at, teacher_grade, released, revision_requested, self_confidence").in("assignment_id", assignmentIds) : { data: [] },
      standards.length ? supabase.from("cases").select("standard, title, engine, subject, learning_target").in("standard", standards) : { data: [] },
    ]);
    let caseRows = caseResult.data;
    if (caseResult.error) {
      const retry = await supabase.from("cases").select("standard, title, engine, subject").in("standard", standards);
      caseRows = retry.data;
    }
    if (submissionResult.error) setError("Couldn't load student work. Some numbers may be missing.");
    setData({ classes: classes || [], students: students || [], assignments: assignments || [], targets: targetResult.data || [], submissions: submissionResult.data || [], cases: caseRows || [] });
    setClassId((current) => current || rememberedTeacherClass(classes || [], (classes || [])[0]?.id || ""));
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: auth, error: authError }) => {
      if (authError || !auth?.user) { router.push("/login"); return; }
      setTeacherEmail(auth.user.email || "");
      load(auth.user.id);
    });
  }, [router, load]);

  const current = data.classes.find((c) => c.id === classId) || null;
  const book = useMemo(() => buildGradebook({ classId, periodKey: period, ...data }), [classId, period, data]);
  const subjects = useMemo(() => {
    const list = new Set(book.columns.map((c) => c.subject).filter(Boolean));
    if (current?.subject) list.add(current.subject);
    return [...list];
  }, [book, current]);
  const report = useMemo(() => buildReport(book, { grade: current?.grade, subjects }), [book, current, subjects]);

  if (loading) return <div className="cc-loading">Loading…</div>;

  const graded = report.rows.some((r) => r.assessed > 0) || report.students.some((r) => r.now != null);

  return (
    <BridgePage teacherEmail={teacherEmail}>
      <div className="rp">
        <div className="rp-top">
          <div>
            <h1>Reports</h1>
            <p className="rp-sub">{current ? current.name : "No class yet"} · {book.students.length} {book.students.length === 1 ? "student" : "students"} · {book.columns.length} {book.columns.length === 1 ? "activity" : "activities"} · {(PERIODS.find((p) => p.key === period) || PERIODS[0]).label.toLowerCase()}</p>
          </div>
          <div className="rp-controls">
            <select aria-label="Class" value={classId} onChange={(e) => { setClassId(e.target.value); rememberTeacherClass(e.target.value); }}>
              {[...data.classes].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true })).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select aria-label="Time" value={period} onChange={(e) => setPeriod(e.target.value)}>
              {PERIODS.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
            </select>
            <Link className="cc-btn secondary" href={`/teacher/gradebook?classId=${classId}`}>Gradebook</Link>
            <button type="button" className="cc-btn secondary" onClick={() => window.print()}>Print</button>
          </div>
        </div>

        {error && <div className="cc-error" role="alert">{error}</div>}

        <div className="rp-tabs" role="tablist" aria-label="Reports">
          {TABS.map(([key, label, sub]) => (
            <button key={key} type="button" role="tab" aria-selected={tab === key} onClick={() => setTab(key)}>{label}<small>{sub}</small></button>
          ))}
        </div>

        {!data.classes.length ? <Empty>Add a class to see reports.</Empty>
          : !book.students.length ? <Empty>No students in this class yet.</Empty>
          : !book.columns.length ? <Empty>No graded activities {period === "all" ? "assigned yet" : "in this time"}. Practice games like Frequency Rush don't count toward reports.</Empty>
          : !graded && tab !== "standards" ? <Empty>Nothing graded yet. Reports fill in as you grade work.</Empty>
          : tab === "standards" ? <Standards report={report} book={book} classId={classId} grade={current?.grade} tip={tip} />
          : tab === "students" ? <Students report={report} tip={tip} />
          : tab === "confidence" ? <Confidence report={report} classId={classId} />
          : <Snapshot report={report} classId={classId} setTab={setTab} tip={tip} />}
      </div>
      {tipState && <div className="rp-tip" style={{ left: tipState.x, top: tipState.y }}>{tipState.text}</div>}
    </BridgePage>
  );
}
