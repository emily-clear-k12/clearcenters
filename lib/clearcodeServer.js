// SERVER ONLY. ClearCode data helpers (Sept 30, 2026).
// clearcode_progress has RLS on with no policies (add_clearcode.sql), so all
// reads and writes go through the admin client after an ownership check.
import { supabaseAdmin } from "./supabaseAdmin";
import { cleanClassWords } from "./clearcode";
import { weekRange } from "./clearkeysFuel";

export const PROGRESS_COLS = "student_id, class_id, status, scan, current_ruin, ruins, log, pass_mark, chamber, created_at, updated_at";

export async function readProgress(studentId) {
  const { data, error } = await supabaseAdmin.from("clearcode_progress").select(PROGRESS_COLS).eq("student_id", studentId).maybeSingle();
  if (error) return { row: null, missingTable: /clearcode_progress/.test(error.message || "") || error.code === "42P01", error };
  return { row: data || null };
}

export async function saveProgress(studentId, fields) {
  return supabaseAdmin.from("clearcode_progress").update({ ...fields, updated_at: new Date().toISOString() }).eq("student_id", studentId);
}

// This week's class words for a class ({ weekOf, words }). Words clear on
// their own when the week changes.
export async function readClassWords(classId) {
  const { data, error } = await supabaseAdmin.from("classes").select("clearcode_settings").eq("id", classId).maybeSingle();
  if (error || !data) return { ready: !error, weekOf: weekRange().start, words: [] };
  const s = data.clearcode_settings || {};
  const thisWeek = weekRange().start;
  return { ready: true, weekOf: thisWeek, words: s.weekOf === thisWeek ? cleanClassWords(s.words) : [] };
}

export async function addCrystals(studentId, amount) {
  if (!amount) return;
  try { await supabaseAdmin.rpc("increment_crystal_points", { p_student_id: studentId, p_amount: amount }); } catch (e) { /* crystals are a bonus; never block saving */ }
}

// Suggested class words: the longest academic words in what the class was
// assigned this week (titles, learning targets, summaries). The teacher
// edits the list before students see it.
const COMMON = new Set(["students", "student", "different", "information", "something", "everything", "important", "understand", "including", "activity", "activities", "question", "questions", "describe", "explain", "evidence", "practice", "complete", "together", "because", "between", "another", "through", "following", "identify", "determine", "describes", "explains", "examples", "example"]);
export async function suggestClassWords(classId) {
  const since = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();
  const { data: asg } = await supabaseAdmin.from("assignments").select("case_standard, created_at").eq("class_id", classId).gte("created_at", since).limit(60);
  const codes = [...new Set((asg || []).map((a) => a.case_standard).filter(Boolean))];
  if (!codes.length) return [];
  const { data: cases } = await supabaseAdmin.from("cases").select("standard, title, learning_target, lesson_summary").in("standard", codes.slice(0, 60));
  const counts = new Map();
  for (const c of cases || []) {
    const text = [c.title, c.learning_target, c.lesson_summary].filter(Boolean).join(" ");
    for (const raw of text.split(/[^A-Za-z]+/)) {
      const w = raw.toLowerCase();
      if (w.length < 8 || COMMON.has(w) || /^(clearkeys|clearcode|relay|station|signal|crystal|transmission|keyboard|expedition|foundation|cadet|mission)/.test(w)) continue;
      counts.set(w, (counts.get(w) || 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || b[0].length - a[0].length).slice(0, 12).map(([w]) => w);
}
