import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getRelayStationLesson, computeStars } from "../../../../lib/cases/relay-station";

// Relay Station (typing center) submit — added Sept 22, 2026.
// Same shape as /api/signal-defense/submit: one `submissions` row per
// (assignment, student). Differences:
//   - The BEST run is kept, not the latest (design doc §6). A retry only
//     overwrites when it earns more stars, or the same stars at a higher WPM.
//   - WPM, accuracy, and stars are recomputed here from the raw counts
//     (characters, keystrokes, errors, elapsed ms) against the lesson's own
//     goals, rather than trusting the client's numbers.
// Needs the `submissions.relay_station_data` JSONB column (see
// add_relay_station_migration.sql).
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const { assignmentId, result } = body || {};
  if (!assignmentId || !result || typeof result !== "object") {
    return NextResponse.json({ error: "Missing assignment or result." }, { status: 400 });
  }

  const { data: student } = await supabaseAdmin
    .from("students")
    .select("id, class_id")
    .eq("id", studentId)
    .single();
  if (!student) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { data: assignment } = await supabaseAdmin
    .from("assignments")
    .select("id, class_id, case_standard")
    .eq("id", assignmentId)
    .single();
  if (!assignment || assignment.class_id !== student.class_id) {
    return NextResponse.json({ error: "Assignment not found." }, { status: 404 });
  }

  const lesson = getRelayStationLesson(assignment.case_standard);
  if (!lesson) {
    return NextResponse.json({ error: "This typing lesson isn't set up yet." }, { status: 404 });
  }

  // Recompute from raw counts. The text length comes from the lesson itself.
  const chars = lesson.text.length;
  const ms = Math.max(1000, Number(result.ms) || 0);
  const errors = Math.max(0, Math.floor(Number(result.errors) || 0));
  const keystrokes = Math.max(chars + errors, Math.floor(Number(result.keystrokes) || 0));
  const wpm = Math.min(200, Math.round((chars / 5) / (ms / 60000)));
  const accuracy = Math.round(((keystrokes - errors) / keystrokes) * 100);
  const stars = computeStars(lesson.goals, wpm, accuracy);
  const troubleKeys = Array.isArray(result.troubleKeys)
    ? result.troubleKeys
        .slice(0, 5)
        .filter((t) => t && typeof t.key === "string" && t.key.length === 1)
        .map((t) => ({ key: t.key, count: Math.max(0, Math.floor(Number(t.count) || 0)) }))
    : [];

  const run = {
    lessonCode: lesson.code,
    kind: lesson.kind,
    wpm,
    accuracy,
    stars,
    errors,
    keystrokes,
    chars,
    ms,
    troubleKeys,
    goals: lesson.goals,
    finishedAt: new Date().toISOString(),
  };

  const { data: existing } = await supabaseAdmin
    .from("submissions")
    .select("id, relay_station_data")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();

  const prevBest = existing && existing.relay_station_data ? existing.relay_station_data.best : null;
  const isNewBest =
    !prevBest || stars > prevBest.stars || (stars === prevBest.stars && wpm > prevBest.wpm);
  const best = isNewBest ? run : prevBest;
  const attempts = ((existing && existing.relay_station_data && existing.relay_station_data.attempts) || 0) + 1;

  const summary =
    `Relay Station (${lesson.code}, ${lesson.title}): best run ${"★".repeat(best.stars)} — ` +
    `${best.wpm} WPM, ${best.accuracy}% accuracy, ${best.errors} errors` +
    (best.troubleKeys.length ? `; trouble keys: ${best.troubleKeys.map((t) => ({ " ": "Space", "\n": "Enter", "\t": "Tab" }[t.key] || t.key)).join(" ")}` : "") +
    `. ${attempts} attempt${attempts === 1 ? "" : "s"}.`;

  const fields = {
    attempt2: summary,
    relay_station_data: { best, last: run, attempts },
    submitted_at: new Date().toISOString(),
    revision_requested: false,
  };

  if (existing) {
    const { error } = await supabaseAdmin.from("submissions").update(fields).eq("id", existing.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    const { error } = await supabaseAdmin
      .from("submissions")
      .insert({ assignment_id: assignmentId, student_id: studentId, ...fields });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  try {
    await supabaseAdmin.rpc("bump_daily_streak", { p_student_id: studentId });
  } catch (err) {
    // streak is a nice-to-have, never worth failing the submit over
  }

  return NextResponse.json({ success: true, run, best, isNewBest });
}
