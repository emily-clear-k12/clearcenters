import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const body = await request.json();
  const { assignmentId, phaseState, scores, status } = body || {};
  if (!assignmentId) {
    return NextResponse.json({ error: "Missing assignmentId." }, { status: 400 });
  }

  const { data: assignment } = await supabaseAdmin
    .from("briefing_assignments")
    .select("id, class_id")
    .eq("id", assignmentId)
    .maybeSingle();

  if (!assignment) {
    return NextResponse.json({ error: "Assignment not found." }, { status: 404 });
  }

  const { data: student } = await supabaseAdmin
    .from("students")
    .select("id, class_id")
    .eq("id", studentId)
    .maybeSingle();

  if (!student || student.class_id !== assignment.class_id) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { data: targets } = await supabaseAdmin
    .from("briefing_assignment_students")
    .select("student_id")
    .eq("assignment_id", assignmentId);

  if (targets && targets.length > 0 && !targets.some((t) => t.student_id === studentId)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const { data: existing } = await supabaseAdmin
    .from("briefing_submissions")
    .select("id, status, phase_state, scores")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();

  const nextStatus = status || existing?.status || "in_progress";
  const patch = {
    phase_state: phaseState ?? existing?.phase_state ?? {},
    scores: scores ?? existing?.scores ?? {},
    status: nextStatus,
    updated_at: new Date().toISOString(),
  };
  if (nextStatus === "cleared" && existing?.status !== "cleared") {
    patch.cleared_at = new Date().toISOString();
  }

  if (existing) {
    const { error } = await supabaseAdmin
      .from("briefing_submissions")
      .update(patch)
      .eq("id", existing.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    const { error } = await supabaseAdmin.from("briefing_submissions").insert({
      assignment_id: assignmentId,
      student_id: studentId,
      ...patch,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
