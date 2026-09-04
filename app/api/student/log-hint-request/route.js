import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

// Sept 4, 2026 — Teacher-facing S.A.M. expansion, Feature A (see
// SAM_Companion_Concept_v1.md §9/§10). Every "Get a hint" tap across the
// hint-bearing engines (group_chat, fact_check_desk, mission_map) fires a
// fire-and-forget POST here so the teacher dashboard can fold hint usage
// into the existing "Needs Support/Check-In" card — no student-facing
// change at all, and nothing here ever blocks or slows the hint itself.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { assignmentId, caseStandard } = await request.json();
  if (!assignmentId) {
    return NextResponse.json({ error: "Missing assignmentId." }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("hint_requests").insert({
    student_id: studentId,
    assignment_id: assignmentId,
    case_standard: caseStandard || null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
