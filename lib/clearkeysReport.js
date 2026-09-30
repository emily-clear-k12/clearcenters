import { TRACK_LEVELS, normalizeAccommodations, hasSupports } from "./cases/relay-station";
import { fluencyPassedCount } from "./cases/relay-station/fluency";
import { weekRange } from "./clearkeysFuel";
import { recommendedTypingLevel, typingLevelInfo } from "./cases/relay-station/typingLevel";

// ClearKeys teacher report (Sept 29, 2026). Pure functions over one student's
// relay_station_progress row, so the report page, the CSV and the family line
// all agree.
//
// End-of-year typing goals by grade (ClearKeys goals, not an official
// standard): Tech Apps 3/4/5.12C asks for accuracy in grade 3, speed and
// accuracy in grade 4, increasing speed and accuracy in grade 5.
export const YEAR_GOALS = {
  3: { wpm: 12, accuracy: 90 },
  4: { wpm: 16, accuracy: 92 },
  5: { wpm: 20, accuracy: 94 },
};

const TOTAL = TRACK_LEVELS.length;
const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : null);

export function summarizeStudent(firstName, progress, grade) {
  const g = YEAR_GOALS[grade] ? grade : 4;
  const goal = YEAR_GOALS[g];
  const p = progress || null;
  const levelResults = Object.values((p && p.level_results) || {}).filter(Boolean);
  const passedRuns = levelResults.filter((r) => r.passed && !r.placed);
  const history = (p && p.daily && Array.isArray(p.daily.history) ? p.daily.history : []).filter((h) => h && h.date).sort((a, b) => (a.date < b.date ? -1 : 1));
  const fluencyRuns = Object.values((p && p.fluency && p.fluency.results) || {}).filter((r) => r && r.passed);

  const levelsPassed = p ? Math.min((p.current_level || 1) - 1, TOTAL) : 0;
  const complete = !!(p && (p.completed_at || p.current_level > TOTAL));
  const stars = passedRuns.reduce((n, r) => n + (r.stars || 0), 0);

  // "Now" speed: average of the last 5 Daily runs, else the last 5 passed runs.
  const recentPool = history.length ? history.slice(-5) : [...passedRuns, ...fluencyRuns].sort((a, b) => ((a.passedAt || "") < (b.passedAt || "") ? -1 : 1)).slice(-5);
  const nowWpm = recentPool.length ? Math.round(avg(recentPool.map((r) => Number(r.wpm) || 0))) : null;
  const nowAcc = recentPool.length ? Math.round(avg(recentPool.map((r) => Number(r.accuracy) || 0))) : null;
  const firstPool = history.length >= 6 ? history.slice(0, 3) : [];
  const startWpm = firstPool.length ? Math.round(avg(firstPool.map((r) => Number(r.wpm) || 0))) : null;
  const bestWpm = Math.round(Math.max(0, ...[...passedRuns, ...history, ...fluencyRuns].map((r) => Number(r.wpm) || 0))) || null;

  let status;
  if (!p || (!levelResults.length && !history.length)) status = { key: "none", label: "Not started" };
  else if (nowWpm !== null && nowWpm >= goal.wpm && (nowAcc || 0) >= goal.accuracy) status = { key: "met", label: "Met the year goal" };
  else if (nowWpm !== null && nowWpm >= goal.wpm * 0.6 && (nowAcc || 0) >= goal.accuracy - 5) status = { key: "on", label: "On the way" };
  else status = { key: "build", label: "Building" };

  // Gradebook mark uses the site's Got it / Almost / Not yet words.
  const mark = status.key === "met" ? "Got it" : status.key === "on" ? "Almost" : status.key === "none" ? "" : "Not yet";

  // Minutes typed this week (saved runs only), from daily.timeLog.
  const wk = weekRange();
  const minutesWeek = Math.round(Object.entries((p && p.daily && p.daily.timeLog) || {}).filter(([k]) => k >= wk.start && k <= wk.end).reduce((n, [, ms]) => n + (Number(ms) || 0), 0) / 60000);
  // Supports (accommodations): which are on, since when, and accuracy before vs after.
  let supports = null;
  if (p && hasSupports(p.accommodations)) {
    const acc = normalizeAccommodations(p.accommodations);
    const labels = [acc.largeText && "Large text", acc.dyslexiaFont && "Dyslexia font", acc.reducedMotion && "Less motion", acc.hideSpeed && "Speed hidden", acc.passOffset && `Pass bar -${acc.passOffset}`].filter(Boolean);
    let beforeAcc = null, afterAcc = null;
    if (acc.since) {
      const sinceDay = acc.since.slice(0, 10);
      const dated = [
        ...levelResults.filter((r) => typeof r.accuracy === "number" && (r.passedAt || r.lastTryAt)).map((r) => ({ day: String(r.passedAt || r.lastTryAt).slice(0, 10), acc: r.accuracy })),
        ...history.filter((h) => typeof h.accuracy === "number").map((h) => ({ day: h.date, acc: h.accuracy })),
      ];
      const b = dated.filter((x) => x.day < sinceDay).map((x) => x.acc), a2 = dated.filter((x) => x.day >= sinceDay).map((x) => x.acc);
      beforeAcc = b.length >= 2 ? Math.round(avg(b)) : null;
      afterAcc = a2.length >= 2 ? Math.round(avg(a2)) : null;
    }
    supports = { labels, since: acc.since, beforeAcc, afterAcc };
  }
  // Sept 30: the typing level (1-4) this student should read at, from skill not grade.
  const typingLevel = recommendedTypingLevel({ currentLevel: p ? p.current_level || 1 : 1, trackComplete: complete, recentWpm: nowWpm });
  const name = firstName || "Your child";
  if (status.key === "none") {
    const fam = `${name} hasn't started ClearKeys typing practice yet. Our class goal for grade ${g} is ${goal.wpm} words per minute by the end of the year, and a few minutes a day with fingers on the home row makes a big difference.`;
    return { firstName, typingLevel, minutesWeek, supports, levelsPassed, complete, stars, nowWpm, nowAcc, startWpm, bestWpm, dailyDays: (p && p.daily && p.daily.totalDays) || 0, streak: 0, fluencyPassed: fluencyPassedCount(p && p.fluency), history: [], status, mark, family: fam, goal };
  }
  const parts = [];
  parts.push(complete ? `${name} passed all ${TOTAL} typing levels in ClearKeys` : `${name} has passed ${levelsPassed} of ${TOTAL} typing levels in ClearKeys`);
  if (nowWpm !== null) parts.push(`and is typing about ${nowWpm} words per minute with ${nowAcc}% accuracy`);
  let family = parts.join(" ") + ".";
  if (startWpm !== null && nowWpm !== null && nowWpm > startWpm) family += ` That is up from ${startWpm} words per minute earlier this year.`;
  family += ` Our class goal for grade ${g} is ${goal.wpm} words per minute by the end of the year.`;
  if (status.key === "build") family += " A few minutes of practice at home with fingers on the home row will help.";

  return {
    firstName,
    typingLevel,
    minutesWeek,
    supports,
    levelsPassed,
    complete,
    stars,
    nowWpm,
    nowAcc,
    startWpm,
    bestWpm,
    dailyDays: (p && p.daily && p.daily.totalDays) || 0,
    streak: (p && p.daily && p.daily.streak) || 0,
    fluencyPassed: fluencyPassedCount(p && p.fluency),
    history: history.slice(-20).map((h) => Number(h.wpm) || 0),
    status,
    mark,
    family,
    goal,
  };
}

export function reportCsv(rows, className) {
  const esc = (v) => `"${String(v == null ? "" : v).replace(/"/g, '""')}"`;
  const head = ["Student", "Typing level", "Supports", "Minutes this week", "Levels passed (of 20)", "Speed now (WPM)", "Accuracy now (%)", "Best WPM", "Daily days", "Fluency levels passed", "Year goal status", "Gradebook mark", "Family note"];
  const lines = [head.map(esc).join(",")];
  rows.forEach((r) => lines.push([r.firstName, `Level ${r.typingLevel}: ${typingLevelInfo(r.typingLevel).name}`, r.supports ? `${r.supports.labels.join("; ")}${r.supports.beforeAcc != null && r.supports.afterAcc != null ? ` (accuracy ${r.supports.beforeAcc}% before, ${r.supports.afterAcc}% after)` : ""}` : "", r.minutesWeek, r.levelsPassed, r.nowWpm ?? "", r.nowAcc ?? "", r.bestWpm ?? "", r.dailyDays, r.fluencyPassed, r.status.label, r.mark, r.family].map(esc).join(",")));
  return `﻿${className ? `ClearKeys report: ${className}\n` : ""}${lines.join("\n")}\n`;
}
