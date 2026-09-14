import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

// SERVER ONLY. Deactivate / reactivate / transfer a single student. All
// three change whether (or where) a student shows up on a roster, or
// whether they can log in at all, so both the student's current class and
// (for a transfer) the destination class are ownership-checked with the
// admin key rather than trusted to RLS — same reasoning as the
// assignment-delete route.
//
// "Remove" is a soft delete (`students.active = false`), not a real
// DELETE: it drops the student off the active roster and blocks their
// login (see app/api/student-login/route.js), but keeps every bit of their
// submission/grade history intact and reversible with one click
// ("Restore"). A hard delete would need to cascade across a dozen+ tables
// (submissions, hint_requests, crystal_points_history, frequency rush and
// signal ops history, etc.) for a case — a student leaving mid-year — where
// a teacher almost always wants the record kept, not erased.
export async function POST(request) {
  const { studentId, action, targetClassId, accessToken } = await request.json();

  if (!studentId || !action || !accessToken) {
    return NextResponse.json({ error: "Missing student, action, or session." }, { status: 400 });
  }
  if (!["deactivate", "reactivate", "transfer"].includes(action)) {
    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  }
  if (action === "transfer" && !targetClassId) {
    return NextResponse.json({ error: "Missing the class to transfer to." }, { status: 400 });
  }

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Your session expired — refresh the page and try again." }, { status: 401 });
  }
  const teacherId = userData.user.id;

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, class_id, classes(teacher_id)")
    .eq("id", studentId)
    .maybeSingle();
  if (studentError || !student || student.classes?.teacher_id !== teacherId) {
    return NextResponse.json({ error: "That student doesn't belong to one of your classes." }, { status: 403 });
  }

  if (action === "transfer") {
    if (targetClassId === student.class_id) {
      return NextResponse.json({ error: "That student is already in that class." }, { status: 400 });
    }
    const { data: targetClass, error: targetError } = await supabaseAdmin
      .from("classes")
      .select("id, teacher_id")
      .eq("id", targetClassId)
      .maybeSingle();
    if (targetError || !targetClass || targetClass.teacher_id !== teacherId) {
      return NextResponse.json({ error: "That destination class doesn't belong to you." }, { status: 403 });
    }
    const { error: updateError } = await supabaseAdmin.from("students").update({ class_id: targetClassId }).eq("id", studentId);
    if (updateError) return NextResponse.json({ error: "Couldn't transfer: " + updateError.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }

  const { error: updateError } = await supabaseAdmin
    .from("students")
    .update({ active: action === "reactivate" })
    .eq("id", studentId);
  if (updateError) return NextResponse.json({ error: "Couldn't update: " + updateError.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
