import { supabaseAdmin } from "./supabaseAdmin";
import { getRelayStationLesson, buildReadingLesson, isCustomCode } from "./cases/relay-station";

// SERVER ONLY. Resolves any Relay Station case code to a playable lesson:
// built-in track/readings come from the code registry; teacher custom texts
// (RS.C.<teacher8>.<id>) come from the relay_station_custom_texts table.
// Used by app/activity/[assignmentId]/page.js and the submit route so both
// always agree on the exact text being typed.
export async function resolveRelayStationLesson(standard) {
  const builtIn = getRelayStationLesson(standard);
  if (builtIn) return builtIn;
  if (!isCustomCode(standard)) return null;
  const { data: row } = await supabaseAdmin
    .from("relay_station_custom_texts")
    .select("standard, title, grade, subject, kind, intro, text, mode, compose_prompt")
    .eq("standard", standard)
    .maybeSingle();
  if (!row) return null;
  const lesson = buildReadingLesson({
    code: row.standard,
    isCustom: true,
    grade: row.grade,
    subject: row.subject,
    kind: row.kind || "paragraph",
    title: row.title,
    intro: row.intro || null,
    text: row.text,
  });
  // Wave 2: teacher-chosen student mode (copy / dictation / choice) and an
  // optional "Your Turn" writing prompt.
  lesson.lockedMode = ["copy", "dictation", "choice"].includes(row.mode) ? row.mode : "choice";
  if (row.compose_prompt) {
    lesson.compose = { key: "custom", type: "writing", minWords: 25, prompt: row.compose_prompt, checklist: ["Answers the prompt", "Complete sentences with capitals and end punctuation", "Uses details or examples"] };
  }
  return lesson;
}
