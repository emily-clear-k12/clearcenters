import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

// SERVER ONLY. Deletes an assignment and everything hanging off it, using
// the admin key so this works no matter what RLS policies do or don't
// exist on assignments/assignment_students/submissions. The first version
// of this deleted straight from the browser with the anon key, which
// silently no-ops under RLS (0 rows affected, no error) instead of failing
// loudly — that's why the assignment kept reappearing with no error shown.
//
// Works identically for every challenge type/engine — it only ever touches
// the generic assignment tables, never engine-specific case content — so
// nothing extra is needed as new challenge types come online.
export async function POST(request) {
  const { assignmentId, accessToken } = await request.json();

  if (!assignmentId || !accessToken) {
    return NextResponse.json({ error: "Missing assignmentId or accessToken." }, { status: 400 });
  }

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Your session expired — refresh the page and try again." }, { status: 401 });
  }
  const teacherId = userData.user.id;

  // Confirm this assignment actually belongs to one of THIS teacher's own
  // classes before deleting anything — without this check, any signed-in
  // teacher could delete any other teacher's assignment just by knowing
  // (or guessing) its id, since the admin key bypasses RLS entirely.
  const { data: assignment, error: assignmentError } = await supabaseAdmin
    .from("assignments")
    .select("id, class_id, classes(teacher_id)")
    .eq("id", assignmentId)
    .maybeSingle();

  if (assignmentError || !assignment) {
    return NextResponse.json({ error: "Assignment not found." }, { status: 404 });
  }
  if (assignment.classes?.teacher_id !== teacherId) {
    return NextResponse.json({ error: "This assignment doesn't belong to one of your classes." }, { status: 403 });
  }

  const { error: subsError } = await supabaseAdmin.from("submissions").delete().eq("assignment_id", assignmentId);
  if (subsError) {
    return NextResponse.json({ error: "Couldn't delete this assignment's submissions: " + subsError.message }, { status: 500 });
  }

  // assignment_students cascade-deletes with the assignment row too, but
  // clearing it explicitly first means this doesn't depend on that.
  await supabaseAdmin.from("assignment_students").delete().eq("assignment_id", assignmentId);

  const { error: deleteError } = await supabaseAdmin.from("assignments").delete().eq("id", assignmentId);
  if (deleteError) {
    return NextResponse.json({ error: "Couldn't delete the assignment: " + deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
