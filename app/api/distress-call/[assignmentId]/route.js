import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { computeDistressCallProgress } from "../../../../lib/distressCall";

// Shared by both the in-activity student badge (§4's "in-activity
// acknowledgment") and the teacher's assign screen / Live Ops Board — same
// meter, same read, two different callers. A student may only read the
// meter for an assignment they're actually targeted by (same check
// app/activity/[assignmentId]/page.js already does); a teacher may only
// read one for an assignment in one of their own classes (same
// access-token pattern as api/teacher/assignment/delete).
export async function GET(request, { params }) {
  const { assignmentId } = params;
  const { searchParams } = new URL(request.url);
  const accessToken = searchParams.get("accessToken");

  const { data: assignment } = await supabaseAdmin
    .from("assignments")
    .select("id, class_id, classes(teacher_id)")
    .eq("id", assignmentId)
    .maybeSingle();

  if (!assignment) {
    return NextResponse.json({ error: "Assignment not found." }, { status: 404 });
  }

  if (accessToken) {
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
    if (userError || !userData?.user || assignment.classes?.teacher_id !== userData.user.id) {
      return NextResponse.json({ error: "Not authorized." }, { status: 403 });
    }
  } else {
    const cookieStore = cookies();
    const studentId = cookieStore.get("cc_student_id")?.value;
    if (!studentId) {
      return NextResponse.json({ error: "Not logged in." }, { status: 401 });
    }
    const { data: student } = await supabaseAdmin.from("students").select("class_id").eq("id", studentId).maybeSingle();
    if (!student || student.class_id !== assignment.class_id) {
      return NextResponse.json({ error: "Not authorized." }, { status: 403 });
    }
    const { data: targets } = await supabaseAdmin.from("assignment_students").select("student_id").eq("assignment_id", assignmentId);
    if (targets && targets.length > 0 && !targets.some((t) => t.student_id === studentId)) {
      return NextResponse.json({ error: "Not authorized." }, { status: 403 });
    }
  }

  const progress = await computeDistressCallProgress(assignmentId);
  return NextResponse.json(progress);
}
