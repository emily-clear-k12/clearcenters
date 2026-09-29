"use client";

// The printable student report card — Sept 29, 2026.
// Drawn from lib/studentReport.js. The teacher's page and the shared link
// a family opens both render this same card, so they never disagree.

import React from "react";
import { levelWord } from "../lib/gradeScale";
import "./studentReport.css";

function niceDate(value, long) {
  if (!value) return "";
  const d = new Date(String(value).length <= 10 ? `${value}T12:00:00` : value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, long ? { year: "numeric", month: "long", day: "numeric" } : { month: "short", day: "numeric" });
}

function Level({ level, big }) {
  if (level == null) return <span className={`sr-level none${big ? " big" : ""}`}>No grade yet</span>;
  return <span className={`sr-level l${level}${big ? " big" : ""}`}>{levelWord(level)}</span>;
}

function Result({ item }) {
  if (item.level != null) return <Level level={item.level} />;
  return <span className={`sr-result${item.missing ? " late" : ""}`}>{item.result}</span>;
}

function Skill({ s }) {
  return (
    <li>
      <div className="sr-skill-top"><b>TEKS {s.code}</b>{s.subject && <span>{s.subject}</span>}<Level level={s.level} /></div>
      <p>{s.target || s.wording}</p>
    </li>
  );
}

export default function StudentReportCard({ report, showAllWork = false }) {
  const total = report.counts[0] + report.counts[1] + report.counts[2];
  const work = showAllWork ? report.work : report.work.slice(0, 12);
  return (
    <article className="sr-card">
      <header className="sr-head">
        <img src="/clearcenters_logo.png" alt="ClearCenters" />
        <div>
          <p className="sr-kicker">Student report</p>
          <h1>{report.studentName}</h1>
          <p className="sr-meta">{[report.className, report.teacherName, `Printed ${niceDate(new Date().toISOString(), true)}`].filter(Boolean).join(" · ")}</p>
        </div>
      </header>

      <section className="sr-summary" aria-label="Summary">
        <div className="sr-overall">
          <span className="sr-label">Overall</span>
          <Level level={report.level} big />
          {total > 0 && (
            <>
              <span className="sr-bar" aria-hidden="true">
                {[2, 1, 0].map((k) => report.counts[k] > 0 && <span key={k} className={`b${k}`} style={{ width: `${(report.counts[k] / total) * 100}%` }} />)}
              </span>
              <span className="sr-counts">{report.counts[2]} Got it · {report.counts[1]} Almost · {report.counts[0]} Not yet</span>
            </>
          )}
        </div>
        <div className="sr-stat"><b>{report.turnedIn} of {report.assigned}</b><span>turned in</span></div>
        <div className={`sr-stat${report.pastDue ? " warn" : ""}`}><b>{report.pastDue}</b><span>past due</span></div>
        <div className="sr-stat"><b>{report.gotShare == null ? "—" : `${report.gotShare}%`}</b><span>of graded work at Got it{report.classGotShare != null ? ` · class ${report.classGotShare}%` : ""}</span></div>
      </section>

      <section className="sr-two">
        <div>
          <h2>Strong in</h2>
          {report.strengths.length ? <ul className="sr-skills">{report.strengths.map((s) => <Skill key={s.key} s={s} />)}</ul> : <p className="sr-empty">Nothing at Got it yet.</p>}
        </div>
        <div>
          <h2>Working on</h2>
          {report.workingOn.length ? <ul className="sr-skills">{report.workingOn.map((s) => <Skill key={s.key} s={s} />)}</ul> : <p className="sr-empty">{report.strengths.length ? "Nothing right now. Every graded standard is at Got it." : "No graded standards yet."}</p>}
        </div>
      </section>
      {report.notGraded.length > 0 && <p className="sr-note">Not graded yet: {report.notGraded.map((s) => `TEKS ${s.code}`).join(", ")}.</p>}

      <section>
        <h2>{showAllWork || report.work.length <= 12 ? "All work" : "Recent work"}</h2>
        {work.length ? (
          <table className="sr-work">
            <thead><tr><th>Activity</th><th>TEKS</th><th>Date</th><th>Result</th></tr></thead>
            <tbody>
              {work.map((w) => (
                <tr key={w.id}>
                  <td><b>{w.title}</b><small>{w.activity}</small></td>
                  <td>{w.code || "—"}</td>
                  <td>{niceDate(w.date)}</td>
                  <td><Result item={w} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p className="sr-empty">Nothing assigned yet.</p>}
        {!showAllWork && report.work.length > 12 && <p className="sr-note">Showing the newest 12 of {report.work.length}.</p>}
      </section>

      <section className="sr-badges">
        <h2>Badges and Crystal Points</h2>
        <div className="sr-badge-row">
          {report.earnedTiers.length ? report.earnedTiers.map((t) => (
            <figure key={t.id}>
              <img src={`/badges/transparent/${t.tier_key}.png`} alt="" onError={(e) => { e.currentTarget.onerror = null; if (t.image_path) e.currentTarget.src = t.image_path; }} />
              <figcaption>{t.label}</figcaption>
            </figure>
          )) : <p className="sr-empty">No badges yet.</p>}
          <div className="sr-points">
            <b>{report.crystalPoints}</b>
            <span>Crystal Points</span>
            {report.nextTier && <small>{report.nextTier.threshold - report.missionsCompleted} more {report.nextTier.threshold - report.missionsCompleted === 1 ? "mission" : "missions"} to {report.nextTier.label}</small>}
          </div>
        </div>
      </section>

      <footer className="sr-foot">Got it means the student showed the skill. Almost means they're close. Not yet means they're still learning it.</footer>
    </article>
  );
}
