import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getRelayStationLesson, placementResult } from "../../../../lib/cases/relay-station";

// Relay Station Placement Check (design doc §12). A brand-new track student
// can take a short 3-stage test; the server re-scores every stage from raw
// counts and places them on the track. Only allowed ONCE, and only before a
// student has played any level (a teacher can still move anyone on the
// Typing Track board). Skipped levels are marked passed with 0 stars and
// `placed: true`, so the student can replay them later for stars/crystals.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) return NextResponse.json({ error: "Not logged in." }, { status: 401 });

  const body = await request.json().catch(() => null);
  const { assignmentId, stages } = body || {};
  if (!assignmentId || !Array.isArray(stages)) {
    return NextResponse.json({ error: "Missing assignment or results." }, { status: 400 });
  }

  const { data: student } = await supabaseAdmin.from("students").select("id, class_id").eq("id", studentId).single();
  const { data: assignment } = await supabaseAdmin.from("assignments").select("id, class_id, case_standard").eq("id", assignmentId).single();
  if (!student || !assignment || assignment.class_id !== student.class_id) {
    return NextResponse.json({ error: "Assignment not found." }, { status: 404 });
  }
  const track = getRelayStationLesson(assignment.case_standard);
  if (!track || !track.isTrack) {
    return NextResponse.json({ error: "Placement is only for the Foundations Track." }, { status: 400 });
  }

  const { data: row } = await supabaseAdmin
    .from("relay_station_progress")
    .select("current_level, level_results, placement")
    .eq("student_id", studentId)
    .maybeSingle();
  const alreadyStarted = row && (row.placement || row.current_level > 1 || Object.keys(row.level_results || {}).length > 0);
  if (alreadyStarted) {
    return NextResponse.json({ error: "Placement is only available before you start the track." }, { status: 409 });
  }

  const result = placementResult(stages);
  const now = new Date().toISOString();
  const levelResults = {};
  for (let n = 1; n < result.level; n += 1) {
    levelResults[String(n)] = { passed: true, placed: true, stars: 0, attempts: 0, passedAt: now };
  }
  const { error } = await supabaseAdmin.from("relay_station_progress").upsert(
    {
      student_id: studentId,
      current_level: result.level,
      level_results: levelResults,
      placement: { ...result, takenAt: now },
      completed_at: null,
      updated_at: now,
    },
    { onConflict: "student_id" }
  );
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    success: true,
    placement: result,
    progress: { current_level: result.level, level_results: levelResults, completed_at: null },
  });
}
