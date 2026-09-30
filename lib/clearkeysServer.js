import { supabaseAdmin } from "./supabaseAdmin";
import { centralDateKey } from "./cases/relay-station";

// SERVER ONLY. ClearKeys class settings + typing-time log (Sept 29, 2026).
// Both degrade quietly before their SQL has been run.

export async function readClassSettings(classId) {
  if (!classId) return {};
  try {
    const { data, error } = await supabaseAdmin.from("classes").select("clearkeys_settings").eq("id", classId).maybeSingle();
    if (error || !data) return {};
    return data.clearkeys_settings || {};
  } catch (e) {
    return {};
  }
}

// Adds the time of one saved run to relay_station_progress.daily.timeLog
// ({ "YYYY-MM-DD": ms }, last 21 days). Never fails the caller.
export async function recordTypingTime(studentId, ms) {
  const add = Math.max(0, Math.min(30 * 60 * 1000, Math.floor(Number(ms) || 0)));
  if (!studentId || !add) return;
  try {
    const { data: row } = await supabaseAdmin.from("relay_station_progress").select("student_id, daily").eq("student_id", studentId).maybeSingle();
    const daily = { ...((row && row.daily) || {}) };
    const today = centralDateKey();
    const log = { ...(daily.timeLog || {}) };
    log[today] = (log[today] || 0) + add;
    const keys = Object.keys(log).sort().slice(-21);
    daily.timeLog = Object.fromEntries(keys.map((k) => [k, log[k]]));
    if (row) await supabaseAdmin.from("relay_station_progress").update({ daily }).eq("student_id", studentId);
    else await supabaseAdmin.from("relay_station_progress").insert({ student_id: studentId, current_level: 1, level_results: {}, daily });
  } catch (e) {
    /* time is a nice-to-have */
  }
}

export function minutesOn(daily, key = centralDateKey()) {
  const ms = (daily && daily.timeLog && daily.timeLog[key]) || 0;
  return Math.round(ms / 60000);
}
