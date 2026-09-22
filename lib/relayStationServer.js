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
    .select("standard, title, grade, subject, kind, intro, text")
    .eq("standard", standard)
    .maybeSingle();
  if (!row) return null;
  return buildReadingLesson({
    code: row.standard,
    isCustom: true,
    grade: row.grade,
    subject: row.subject,
    kind: row.kind || "paragraph",
    title: row.title,
    intro: row.intro || null,
    text: row.text,
  });
}
