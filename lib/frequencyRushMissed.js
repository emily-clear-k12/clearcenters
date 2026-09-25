// Sept 24, 2026 — My Missed Words (step 4 of FrequencyRush_Fluency_Expansion_v1.md).
// What a student missed in earlier runs of the same activity comes back in
// their next run, marked "SECOND CHANCE".
//
// No new tables. Reads the student's own recent runs of this activity
// (frequency_rush_sessions) and their answers (frequency_rush_attempts). A
// question is keyed by `item_key` (facts, word study, custom lists) or by
// `word_id` (vocabulary units).
//
// A question counts as MISSED when the student's latest answer to it was
// wrong, or they got it wrong in 2 of their last 3 tries. Two right in a row
// clears it.

export const MAX_RETRY_PER_RUN = 4;
const DAILY_CODES = ["FR.3.DAILY", "FR.4.DAILY", "FR.5.DAILY"];
const RECENT_RUNS = 30;

// rows: [{ key, correct, runOrder }] where runOrder 0 = newest run.
// Returns missed keys, weakest first.
export function computeMissed(rows) {
  const byKey = new Map();
  for (const r of rows) {
    if (!r || r.key == null) continue;
    const key = String(r.key);
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(r);
  }
  const missed = [];
  for (const [key, list] of byKey) {
    list.sort((a, b) => a.runOrder - b.runOrder);
    const results = list.map((x) => !!x.correct); // newest first
    const last3Wrong = results.slice(0, 3).filter((ok) => !ok).length;
    if (!results[0] || last3Wrong >= 2) {
      const wrong5 = results.slice(0, 5).filter((ok) => !ok).length;
      const newestWrong = list.find((x) => !x.correct);
      missed.push({ key, wrongRecent: wrong5, lastWrongRun: newestWrong ? newestWrong.runOrder : 99 });
    }
  }
  missed.sort((a, b) => b.wrongRecent - a.wrongRecent || a.lastWrongRun - b.lastWrongRun);
  return missed;
}

// Loads this student's missed questions for one activity (by case code,
// across every assignment of that activity).
export async function getMissedForStudent(supabaseAdmin, { studentId, caseStandard }) {
  try {
    // Sept 24, 2026 (step 6) — Daily Warm-up answers count too: a daily
    // question's item_key is "dm|<case>|<key>" (lib/frequencyRushDaily.js).
    const { data: assignments } = await supabaseAdmin
      .from("assignments")
      .select("id, case_standard")
      .in("case_standard", [caseStandard, ...DAILY_CODES]);
    const ownIds = (assignments || []).filter((a) => a.case_standard === caseStandard).map((a) => a.id);
    const dailyIds = new Set((assignments || []).filter((a) => a.case_standard !== caseStandard).map((a) => a.id));
    const allIds = [...ownIds, ...dailyIds];
    if (!allIds.length) return [];
    const { data: sessions } = await supabaseAdmin
      .from("frequency_rush_sessions")
      .select("id, assignment_id, ended_at")
      .eq("student_id", studentId)
      .in("assignment_id", allIds)
      .not("ended_at", "is", null)
      .order("ended_at", { ascending: false })
      .limit(RECENT_RUNS * 2);
    if (!sessions || !sessions.length) return [];
    const sessionIds = sessions.map((s) => s.id);
    let { data: attempts, error } = await supabaseAdmin
      .from("frequency_rush_attempts")
      .select("session_id, word_id, item_key, correct")
      .in("session_id", sessionIds);
    if (error && /item_key/i.test(error.message || "")) {
      ({ data: attempts } = await supabaseAdmin
        .from("frequency_rush_attempts")
        .select("session_id, word_id, correct")
        .in("session_id", sessionIds));
    }
    const isDaily = new Map(sessions.map((s) => [s.id, dailyIds.has(s.assignment_id)]));
    const prefix = `dm|${caseStandard}|`;
    const rows = [];
    for (const a of attempts || []) {
      if (isDaily.get(a.session_id)) {
        const k = String(a.item_key || "");
        if (k.startsWith(prefix)) rows.push({ session: a.session_id, key: k.slice(prefix.length), correct: a.correct });
      } else {
        rows.push({ session: a.session_id, key: a.item_key || a.word_id, correct: a.correct });
      }
    }
    // A run is a session that asked something from this activity, newest first.
    const touched = new Set(rows.map((r) => r.session));
    const runOrder = new Map(sessions.filter((s) => touched.has(s.id)).slice(0, RECENT_RUNS).map((s, i) => [s.id, i]));
    return computeMissed(rows.filter((r) => runOrder.has(r.session)).map((r) => ({ key: r.key, correct: r.correct, runOrder: runOrder.get(r.session) })));
  } catch (err) {
    // Never block a run over this — it's an extra, not the run itself.
    console.error("Frequency Rush: couldn't load missed questions:", err.message);
    return [];
  }
}

// Builds this run's pool when there are questions to retry: up to
// MAX_RETRY_PER_RUN retry items first, then fresh items to fill `size`.
// With a pool exactly the run's length, every retry item is sure to appear.
export function mixRetryPool(retryItems, freshItems, size) {
  const retry = retryItems.slice(0, MAX_RETRY_PER_RUN);
  const ids = new Set(retry.map((i) => String(i.id)));
  const fresh = freshItems.filter((i) => !ids.has(String(i.id)));
  const pool = [...retry, ...fresh.slice(0, Math.max(0, size - retry.length))];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}
