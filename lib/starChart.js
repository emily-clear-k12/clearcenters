// Sept 24, 2026 — Star Chart (step 5 of FrequencyRush_Fluency_Expansion_v1.md,
// §11.10c). The Living Word Wall, as a sky: every word or fact a class has
// practiced in Frequency Rush is a star, grouped into one constellation per
// activity. SERVER ONLY.
//
// No new tables. Everything is computed from frequency_rush_sessions and
// frequency_rush_attempts at request time.
//
// A STUDENT's star:
//   needs    — currently missed (the My Missed Words rule: latest answer
//              wrong, or 2 of the last 3 wrong)
//   lit      — answered right in at least 2 separate runs, and not missed
//   learning — tried, not missed, not lit yet
//   (no entry) — not tried yet
// The CLASS's star is worked out in the page from these, for whatever group of
// students the teacher is looking at (lib/starChartLayout.js).

import { computeMissed } from "./frequencyRushMissed";
import { getSkillSet } from "./frequencyRushSkills";
import { isCustomListCode } from "./frequencyRushCustomLists";
import { SKILL_BANKS } from "./cases/frequency-rush/skills/index.js";

const PAGE = 1000;
const IN_CHUNK = 150;

async function fetchAll(buildQuery) {
  const out = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await buildQuery().range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    out.push(...(data || []));
    if (!data || data.length < PAGE) break;
  }
  return out;
}

async function fetchIn(sb, table, columns, column, values, extra) {
  const out = [];
  for (let i = 0; i < values.length; i += IN_CHUNK) {
    const chunk = values.slice(i, i + IN_CHUNK);
    const rows = await fetchAll(() => {
      let q = sb.from(table).select(columns).in(column, chunk);
      return extra ? extra(q) : q;
    });
    out.push(...rows);
  }
  return out;
}

// "mul:7x8" → "7 × 8"
function factLabel(key) {
  let m;
  if ((m = key.match(/^mul:(\d+)x(\d+)$/))) return { label: `${m[1]} × ${m[2]}`, detail: `${m[1]} × ${m[2]} = ${m[1] * m[2]}` };
  if ((m = key.match(/^div:(\d+)\/(\d+)$/))) return { label: `${m[1]} ÷ ${m[2]}`, detail: `${m[1]} ÷ ${m[2]} = ${m[1] / m[2]}` };
  if ((m = key.match(/^add:(\d+)\+(\d+)$/))) return { label: `${m[1]} + ${m[2]}`, detail: `${m[1]} + ${m[2]} = ${Number(m[1]) + Number(m[2])}` };
  if ((m = key.match(/^sub:(\d+)-(\d+)$/))) return { label: `${m[1]} − ${m[2]}`, detail: `${m[1]} − ${m[2]} = ${m[1] - m[2]}` };
  return null;
}

// Custom-list answers are saved per question ("cl:3:sp", "cl:3:m1"); the
// star is the word, so both collapse to "cl:3".
function starKey(kind, key) {
  if (kind === "custom") {
    const m = String(key).match(/^(cl:\d+):/);
    return m ? m[1] : null;
  }
  return String(key);
}

// The stars an activity can have, keyed the same way attempts are.
async function catalogFor(sb, caseRow) {
  const std = caseRow.standard;
  const set = getSkillSet(std);
  if (set && set.kind === "authored") {
    const bank = SKILL_BANKS[std];
    return { kind: "authored", items: bank.items.map((it) => ({ key: it.id, label: it.answer, detail: it.prompt })) };
  }
  if (set) return { kind: "generated", items: [] }; // facts: stars appear as they're practiced
  if (isCustomListCode(std)) {
    const { data: list } = await sb.from("frequency_rush_custom_lists").select("words").eq("standard", std).maybeSingle();
    return { kind: "custom", items: ((list && list.words) || []).map((w, i) => ({ key: `cl:${i}`, label: w.word, detail: w.definition })) };
  }
  const { data: words } = await sb
    .from("frequency_rush_words")
    .select("id, word, definition")
    .eq("grade", caseRow.grade)
    .eq("subject", caseRow.subject)
    .eq("unit", caseRow.unit);
  return { kind: "vocab", items: (words || []).map((w) => ({ key: String(w.id), label: w.word, detail: w.definition })) };
}

function studentStatus(rows) {
  // rows: this student's answers to one star, each { correct, runOrder, session, ended }
  if (!rows.length) return null;
  const missed = computeMissed(rows.map((r) => ({ key: "x", correct: r.correct, runOrder: r.runOrder })));
  if (missed.length) return { state: "needs" };
  const rightRuns = new Map();
  rows.filter((r) => r.correct).forEach((r) => rightRuns.set(r.session, r.ended));
  if (rightRuns.size < 2) return { state: "learning" };
  // lit when the second separate right run finished
  const litAt = [...rightRuns.values()].sort()[1];
  return { state: "lit", litAt };
}

// Loads the Star Chart for a class. `onlyStudentId` limits it to one student
// (the student's own My Sky) and to the activities that student can see.
export async function loadStarChart(sb, { classId, onlyStudentId = null }) {
  const { data: studentRows } = await sb.from("students").select("id, first_name, active").eq("class_id", classId).order("first_name");
  let students = (studentRows || []).filter((s) => s.active !== false).map((s) => ({ id: s.id, name: s.first_name }));
  if (onlyStudentId) students = students.filter((s) => s.id === onlyStudentId);
  const studentIds = new Set(students.map((s) => s.id));

  const { data: assignments } = await sb
    .from("assignments")
    .select("id, case_standard, created_at, cases(standard, title, subject, engine, grade, unit)")
    .eq("class_id", classId)
    .order("created_at", { ascending: false });
  let fr = (assignments || []).filter((a) => a.cases && a.cases.engine === "frequency_rush");

  if (onlyStudentId && fr.length) {
    // A targeted assignment is only the targeted students' (same rule as the mission list).
    const targets = await fetchIn(sb, "assignment_students", "assignment_id, student_id", "assignment_id", fr.map((a) => a.id));
    const targeted = new Set(targets.map((t) => t.assignment_id));
    const mine = new Set(targets.filter((t) => t.student_id === onlyStudentId).map((t) => t.assignment_id));
    fr = fr.filter((a) => !targeted.has(a.id) || mine.has(a.id));
  }
  if (!fr.length) return { students, activities: [] };

  // one activity per case, newest assignment first
  const byCase = new Map();
  for (const a of fr) {
    if (!byCase.has(a.case_standard)) byCase.set(a.case_standard, { caseRow: a.cases, assignmentIds: [] });
    byCase.get(a.case_standard).assignmentIds.push(a.id);
  }

  const assignmentIds = fr.map((a) => a.id);
  const sessions = await fetchIn(
    sb, "frequency_rush_sessions", "id, student_id, assignment_id, ended_at", "assignment_id", assignmentIds,
    (q) => q.not("ended_at", "is", null)
  );
  const mySessions = sessions.filter((s) => studentIds.has(s.student_id));
  const caseOfAssignment = Object.fromEntries(fr.map((a) => [a.id, a.case_standard]));
  // runOrder: 0 = the student's newest run of that activity
  const runOrder = new Map();
  const grouped = new Map();
  for (const s of mySessions) {
    const k = s.student_id + "|" + caseOfAssignment[s.assignment_id];
    if (!grouped.has(k)) grouped.set(k, []);
    grouped.get(k).push(s);
  }
  for (const list of grouped.values()) {
    list.sort((a, b) => (a.ended_at < b.ended_at ? 1 : -1)).forEach((s, i) => runOrder.set(s.id, i));
  }
  const sessionById = new Map(mySessions.map((s) => [s.id, s]));

  let attempts = [];
  if (mySessions.length) {
    try {
      attempts = await fetchIn(sb, "frequency_rush_attempts", "session_id, word_id, item_key, correct", "session_id", mySessions.map((s) => s.id));
    } catch (err) {
      if (!/item_key/i.test(err.message)) throw err;
      attempts = await fetchIn(sb, "frequency_rush_attempts", "session_id, word_id, correct", "session_id", mySessions.map((s) => s.id));
    }
  }

  const activities = [];
  for (const [caseStandard, { caseRow, assignmentIds: ids }] of byCase) {
    const catalog = await catalogFor(sb, caseRow);
    const items = new Map(catalog.items.map((it) => [it.key, { ...it }]));
    // answers[starKey][studentId] = [{ correct, runOrder, session }]
    const answers = new Map();
    for (const at of attempts) {
      const sess = sessionById.get(at.session_id);
      if (!sess || caseOfAssignment[sess.assignment_id] !== caseStandard) continue;
      const raw = at.item_key || at.word_id;
      const key = raw == null ? null : starKey(catalog.kind, raw);
      if (!key) continue;
      if (!items.has(key)) {
        if (catalog.kind !== "generated") continue; // e.g. a sort question inside a vocabulary unit
        const fact = factLabel(key);
        if (!fact) continue;
        items.set(key, { key, ...fact });
      }
      if (!answers.has(key)) answers.set(key, new Map());
      const perStudent = answers.get(key);
      if (!perStudent.has(sess.student_id)) perStudent.set(sess.student_id, []);
      perStudent.get(sess.student_id).push({ correct: !!at.correct, runOrder: runOrder.get(sess.id) ?? 99, session: sess.id, ended: sess.ended_at });
    }
    const stars = [...items.values()].map((it) => {
      const byStudent = {};
      const litAt = {};
      const perStudent = answers.get(it.key);
      if (perStudent) for (const [sid, rows] of perStudent) {
        const st = studentStatus(rows);
        if (!st) continue;
        byStudent[sid] = st.state;
        if (onlyStudentId && st.litAt) litAt[sid] = st.litAt;
      }
      return onlyStudentId
        ? { key: it.key, label: it.label, detail: it.detail, byStudent, litAt }
        : { key: it.key, label: it.label, detail: it.detail, byStudent };
    });
    activities.push({
      caseStandard,
      title: String(caseRow.title || caseStandard).replace(/^Frequency Rush:\s*/, "").replace(/^My List:\s*/, "My list: "),
      subject: caseRow.subject,
      assignmentId: ids[0], // newest
      stars,
    });
  }
  return { students, activities };
}
