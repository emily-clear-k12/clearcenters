import { centralDateKey } from "./cases/relay-station";

// ClearKeys class fuel goal (Sept 29, 2026). Every Daily Transmission a
// student finishes and every Foundations Track level they pass this week adds
// 1 fuel to the class relay beam. Goal: 4 fuel per student per week (at least
// 20), Monday through Sunday in Central time. Nothing new is stored: it is
// counted from relay_station_progress (daily.history and level_results.passedAt).
export const FUEL_PER_STUDENT = 4;

function dayNum(key) {
  const [y, m, d] = key.split("-").map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
}
function keyOf(n) {
  return new Date(n * 86400000).toISOString().slice(0, 10);
}

export function weekRange(todayKey = centralDateKey()) {
  const n = dayNum(todayKey);
  const dow = new Date(n * 86400000).getUTCDay(); // 0 Sunday
  const monday = n - ((dow + 6) % 7);
  return { start: keyOf(monday), end: keyOf(monday + 6) };
}

export function classFuel(progressRows, studentCount, todayKey = centralDateKey()) {
  const { start, end } = weekRange(todayKey);
  const inWeek = (k) => k && k >= start && k <= end;
  let fuel = 0;
  for (const p of progressRows || []) {
    const hist = (p && p.daily && Array.isArray(p.daily.history)) ? p.daily.history : [];
    fuel += hist.filter((h) => inWeek(h && h.date)).length;
    const fluencyResults = Object.values((p && p.fluency && p.fluency.results) || {});
    for (const r of [...Object.values((p && p.level_results) || {}), ...fluencyResults]) {
      if (r && r.passed && r.passedAt) {
        let k = null;
        try { k = centralDateKey(new Date(r.passedAt)); } catch (e) { k = null; }
        if (inWeek(k)) fuel += 1;
      }
    }
  }
  const goal = Math.max(20, (studentCount || 0) * FUEL_PER_STUDENT);
  return { fuel, goal, pct: Math.min(100, Math.round((fuel / goal) * 100)), start, end };
}
