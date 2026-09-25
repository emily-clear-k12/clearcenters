// Sept 24, 2026 — Daily Warm-up + beat-your-best (step 6 of
// FrequencyRush_Fluency_Expansion_v1.md, §11.10e). SERVER ONLY.
//
// DAILY MIX. A teacher assigns "Daily Warm-up" (case FR.<grade>.DAILY) once.
// Every day, each student gets 8 questions built just for them from ALL the
// Frequency Rush activities they can see: questions they missed first, then
// their lowest scores, then a few they already know (to keep them lit), then
// ones they haven't tried. Their answers count toward the Star Chart and My
// Missed Words of the activity each question came from.
//
// How a daily answer knows where it came from: its item id is
//   dm|<case standard>|<the item's own key>
// e.g. "dm|MA.3.4F-FR-MUL|mul:7x8" or "dm|SCI.4.FR.Eco|<word id>". That id is
// saved as frequency_rush_attempts.item_key, so no new column is needed.
//
// STREAK + CRYSTALS match Relay Station's Daily Transmission: +1 crystal for
// the first warm-up finished each day, +3 more every 5 days in a row, and
// weekends never break a streak. Worked out from the student's ended daily
// runs, so there's no new storage either. The daily assignment's submission
// stays a draft (submitted_at null) so it stays on the mission list.
//
// BEAT-YOUR-BEST. Every Frequency Rush run shows the student's best score and
// best streak on that activity, and the submit route says when a run beats it.
// (The racing ghost ship comes with the step 7 game re-export.)

import { loadStarChart } from "./starChart";
import { getSkillSet, skillItemForKey, buildSkillItems, recomputeSkillItem } from "./frequencyRushSkills";
import { isCustomListCode, customItemForKey, recomputeCustomItem } from "./frequencyRushCustomLists";
import { centralDateKey, continuesStreak, DAILY_CRYSTALS } from "./cases/relay-station/index.js";

export const DAILY_SIZE = 8;
export const DAILY_LABELS = { format: "DAILY WARM-UP", encounter: "RAPID SIGNAL", instruction: "Pick the best answer." };
export const DAILY_CODE_RE = /^FR\.[345]\.DAILY$/;
export const DAILY_CODES = ["FR.3.DAILY", "FR.4.DAILY", "FR.5.DAILY"];
export { DAILY_CRYSTALS, centralDateKey };
// A warm-up counts for the day once this many questions are answered.
export const DAILY_MIN_ANSWERS = 4;

// Most questions one activity can put in a warm-up while others still have
// questions to give, so the mix really is a mix.
const PER_ACTIVITY_CAP = 3;
// How many "you know this" questions to slip in to keep lit stars lit.
const REVIEW_SLOTS = 2;

export function isDailyCode(code) {
  return DAILY_CODE_RE.test(String(code || ""));
}

export function dailyItemId(caseStandard, key) {
  return `dm|${caseStandard}|${key}`;
}

// "dm|MA.3.4F-FR-MUL|mul:7x8" → { caseStandard, key }
export function parseDailyItemId(id) {
  const m = String(id || "").match(/^dm\|([^|]+)\|(.+)$/);
  return m ? { caseStandard: m[1], key: m[2] } : null;
}

function shuffle(list) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function choiceId(text) {
  let h = 2166136261;
  for (const ch of String(text)) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return "c" + h.toString(36);
}

// A vocabulary word as a warm-up question: its definition, pick the word.
// Wrong choices are other words from the same unit.
function vocabItem(activity, star) {
  const others = shuffle(activity.stars.filter((s) => s.key !== star.key && s.label && s.label !== star.label)).slice(0, 3);
  if (others.length < 2 || !star.detail) return null;
  const bins = shuffle([star.label, ...others.map((o) => o.label)]).map((text) => ({ id: choiceId(text), label: text }));
  return {
    type: "sort_bins",
    id: star.key,
    prompt: `Which word means "${String(star.detail).trim().replace(/[.]$/, "")}"?`,
    bins,
    correctBinId: choiceId(star.label),
    shuffleBins: false,
    explanation: `"${star.label}" means "${String(star.detail).trim().replace(/[.]$/, "")}."`,
    bankId: "vocab",
    metadata: { skill: "vocab" },
  };
}

// A custom-list star is a word ("cl:3"); pick one of its questions.
function customItem(list, starKeyValue, stuckFirst) {
  const i = String(starKeyValue).replace(/^cl:/, "");
  const kinds = shuffle(["m1", "m2", "sp"]);
  if (stuckFirst) kinds.sort((a, b) => (a === "sp" ? -1 : b === "sp" ? 1 : 0)); // spelling is the usual miss
  for (const k of kinds) {
    const item = customItemForKey(list, `cl:${i}:${k}`);
    if (item) return item;
  }
  return null;
}

// Builds today's 8 questions for one student.
// Returns { items, retryPrompts, sources: [{ caseStandard, title }] }.
export async function buildDailyMix(sb, { classId, studentId, size = DAILY_SIZE }) {
  const chart = await loadStarChart(sb, { classId, onlyStudentId: studentId });
  const activities = chart.activities.filter((a) => !isDailyCode(a.caseStandard));

  const lists = new Map();
  for (const a of activities) {
    if (!isCustomListCode(a.caseStandard)) continue;
    const { data: list } = await sb
      .from("frequency_rush_custom_lists")
      .select("standard, title, words, include_meaning, include_spelling")
      .eq("standard", a.caseStandard)
      .maybeSingle();
    if (list) lists.set(a.caseStandard, list);
  }

  // Every candidate question, with a tier: 0 missed, 1 below 80%, 2 review, 3 untried.
  const candidates = [];
  for (const a of activities) {
    const set = getSkillSet(a.caseStandard);
    const list = lists.get(a.caseStandard);
    const kind = set ? "skill" : list ? "custom" : isCustomListCode(a.caseStandard) ? null : "vocab";
    if (!kind) continue;
    for (const s of a.stars) {
      const pct = s.byStudent[studentId];
      const stuck = (s.stuck || []).includes(studentId);
      const tier = stuck ? 0 : pct == null ? 3 : pct < 80 ? 1 : 2;
      candidates.push({ activity: a, star: s, kind, set, list, pct: pct == null ? null : pct, stuck, tier, rand: Math.random() });
    }
    // Math facts only become stars once practiced, so offer fresh facts as "untried".
    if (set && set.kind !== "authored") {
      const seen = new Set(a.stars.map((s) => s.key));
      for (const item of buildSkillItems(a.caseStandard, 6)) {
        if (seen.has(item.id)) continue;
        candidates.push({ activity: a, star: { key: item.id }, kind: "skill", set, pct: null, stuck: false, tier: 3, rand: Math.random(), prebuilt: item });
      }
    }
  }

  candidates.sort((x, y) => x.tier - y.tier || (x.tier === 1 ? x.pct - y.pct : x.rand - y.rand));
  // Order to take from: missed, weak, then up to REVIEW_SLOTS known, then untried, then any leftover known.
  const missedWeak = candidates.filter((c) => c.tier <= 1);
  const review = candidates.filter((c) => c.tier === 2);
  const untried = candidates.filter((c) => c.tier === 3);
  const ordered = [...missedWeak, ...review.slice(0, REVIEW_SLOTS), ...untried, ...review.slice(REVIEW_SLOTS)];

  const picked = [];
  const perActivity = new Map();
  const used = new Set();
  const take = (c) => {
    const item = c.prebuilt
      || (c.kind === "skill" ? skillItemForKey(c.activity.caseStandard, c.star.key)
        : c.kind === "custom" ? customItem(c.list, c.star.key, c.stuck)
          : vocabItem(c.activity, c.star));
    if (!item) return false;
    const id = dailyItemId(c.activity.caseStandard, item.id);
    if (used.has(id) || used.has(c.activity.caseStandard + "|" + c.star.key)) return false;
    used.add(id);
    used.add(c.activity.caseStandard + "|" + c.star.key);
    picked.push({ c, item: { ...item, id, bankId: `daily:${c.activity.caseStandard}`, metadata: { ...(item.metadata || {}), daily: c.activity.caseStandard } } });
    perActivity.set(c.activity.caseStandard, (perActivity.get(c.activity.caseStandard) || 0) + 1);
    return true;
  };
  // First pass keeps any one activity from taking over; the second fills the rest.
  for (const c of ordered) {
    if (picked.length >= size) break;
    if ((perActivity.get(c.activity.caseStandard) || 0) >= PER_ACTIVITY_CAP) continue;
    take(c);
  }
  for (const c of ordered) {
    if (picked.length >= size) break;
    take(c);
  }

  const items = shuffle(picked.map((p) => p.item));
  const retryPrompts = picked.filter((p) => p.c.stuck).map((p) => p.item.prompt);
  const sources = [...new Map(picked.map((p) => [p.c.activity.caseStandard, { caseStandard: p.c.activity.caseStandard, title: p.c.activity.title }])).values()];
  return { items, retryPrompts, sources };
}

// Grades one daily answer by the activity its question came from. Returns
// { caseStandard, key, correctBinId, wordId } or null for a forged/unknown id.
// `ctx` caches case rows, lists and words across one submit.
export async function recomputeDailyItem(sb, itemId, ctx) {
  const parsed = parseDailyItemId(itemId);
  if (!parsed) return null;
  const { caseStandard, key } = parsed;
  if (!ctx.allowedCases.has(caseStandard)) return null; // only activities assigned to this class
  if (getSkillSet(caseStandard)) {
    const item = recomputeSkillItem(caseStandard, key);
    return item ? { caseStandard, key: String(item.id), correctBinId: item.correctBinId } : null;
  }
  if (isCustomListCode(caseStandard)) {
    if (!ctx.lists.has(caseStandard)) {
      const { data } = await sb
        .from("frequency_rush_custom_lists")
        .select("standard, title, words, include_meaning, include_spelling")
        .eq("standard", caseStandard)
        .maybeSingle();
      ctx.lists.set(caseStandard, data || null);
    }
    const list = ctx.lists.get(caseStandard);
    const item = list ? recomputeCustomItem(list, key) : null;
    return item ? { caseStandard, key: String(item.id), correctBinId: item.correctBinId } : null;
  }
  // Vocabulary: the key is a word id from that activity's unit.
  const caseRow = ctx.caseRows.get(caseStandard);
  if (!caseRow) return null;
  if (!ctx.words.has(caseStandard)) {
    const { data } = await sb
      .from("frequency_rush_words")
      .select("id, word")
      .eq("grade", caseRow.grade)
      .eq("subject", caseRow.subject)
      .eq("unit", caseRow.unit);
    ctx.words.set(caseStandard, new Map((data || []).map((w) => [String(w.id), w])));
  }
  const word = ctx.words.get(caseStandard).get(String(key));
  return word ? { caseStandard, key: String(word.id), correctBinId: choiceId(word.word), wordId: word.id } : null;
}

// The Frequency Rush activities (non-daily) assigned to a class, by case,
// with their case rows — the only ones a daily answer can count toward.
export async function loadDailyContext(sb, classId) {
  const { data: assignments } = await sb
    .from("assignments")
    .select("case_standard, cases(standard, engine, grade, subject, unit)")
    .eq("class_id", classId);
  const caseRows = new Map();
  for (const a of assignments || []) {
    if (a.cases && a.cases.engine === "frequency_rush" && !isDailyCode(a.case_standard)) caseRows.set(a.case_standard, a.cases);
  }
  return { allowedCases: new Set(caseRows.keys()), caseRows, lists: new Map(), words: new Map() };
}

// Streak from the Central-time dates of a student's finished warm-ups.
// `dates` excludes the run being saved now. Returns what today's finish makes it.
export function dailyStreakAfter(dates, today) {
  const days = [...new Set(dates)].sort();
  const firstToday = !days.includes(today);
  const all = firstToday ? [...days, today].sort() : days;
  // best streak over the whole history, and the current one ending today
  let best = 0;
  let run = 0;
  let prev = null;
  for (const d of all) {
    run = prev && continuesStreak(prev, d) ? run + 1 : 1;
    best = Math.max(best, run);
    prev = d;
  }
  const streak = all.length && all[all.length - 1] === today ? run : 0;
  const crystals = firstToday ? DAILY_CRYSTALS.perDay + (streak % DAILY_CRYSTALS.streakBonusEvery === 0 ? DAILY_CRYSTALS.streakBonus : 0) : 0;
  return { firstToday, streak, bestStreak: best, totalDays: all.length, crystals };
}

function bestStreakOf(dates) {
  let best = 0, run = 0, prev = null;
  for (const d of [...new Set(dates)].sort()) {
    run = prev && continuesStreak(prev, d) ? run + 1 : 1;
    best = Math.max(best, run);
    prev = d;
  }
  return best;
}

// Dates (Central) of a student's ended runs of one daily assignment's case.
export async function loadDailyDates(sb, { studentId, caseStandard, excludeSessionId }) {
  const { data: assignments } = await sb.from("assignments").select("id").eq("case_standard", caseStandard);
  const ids = (assignments || []).map((a) => a.id);
  if (!ids.length) return [];
  const { data: sessions } = await sb
    .from("frequency_rush_sessions")
    .select("id, ended_at, length_value")
    .eq("student_id", studentId)
    .in("assignment_id", ids)
    .not("ended_at", "is", null)
    .order("ended_at", { ascending: false })
    .limit(400);
  return (sessions || [])
    .filter((s) => s.id !== excludeSessionId && (Number(s.length_value) || 0) >= DAILY_MIN_ANSWERS)
    .map((s) => centralDateKey(new Date(s.ended_at)));
}

// Today's status for the intro banner, before a run.
export async function getDailyStatus(sb, { studentId, caseStandard }) {
  try {
    const today = centralDateKey();
    const dates = await loadDailyDates(sb, { studentId, caseStandard });
    const doneToday = dates.includes(today);
    // What finishing today makes (or made) the streak.
    const s = dailyStreakAfter(dates.filter((d) => d !== today), today);
    return {
      doneToday,
      // streak right now: today counts only once it's done
      streak: doneToday ? s.streak : s.streak - 1,
      // what they'll earn by finishing today (0 once it's done)
      crystalsToday: doneToday ? 0 : s.crystals,
      nextStreak: s.streak,
      bestStreak: doneToday ? s.bestStreak : bestStreakOf(dates),
      totalDays: new Set(dates).size,
    };
  } catch (err) {
    return null;
  }
}

// Best score and best streak a student has had on an activity (every
// assignment of that case), for beat-your-best.
export async function getPersonalBest(sb, { studentId, caseStandard, excludeSessionId = null }) {
  try {
    const { data: assignments } = await sb.from("assignments").select("id").eq("case_standard", caseStandard);
    const ids = (assignments || []).map((a) => a.id);
    if (!ids.length) return { score: 0, streak: 0, runs: 0 };
    const { data: sessions } = await sb
      .from("frequency_rush_sessions")
      .select("id, score, best_streak")
      .eq("student_id", studentId)
      .in("assignment_id", ids)
      .not("ended_at", "is", null);
    const rows = (sessions || []).filter((s) => s.id !== excludeSessionId);
    return {
      score: rows.reduce((m, s) => Math.max(m, Number(s.score) || 0), 0),
      streak: rows.reduce((m, s) => Math.max(m, Number(s.best_streak) || 0), 0),
      runs: rows.length,
    };
  } catch (err) {
    return null;
  }
}
