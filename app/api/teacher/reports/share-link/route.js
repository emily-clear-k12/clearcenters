import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

// SERVER ONLY. Gets-or-creates a student's public share token — the same
// token, reused, is what "Copy Share Link" on the teacher's report page
// hands out until the teacher explicitly regenerates it. Ownership
// (this student belongs to one of the requesting teacher's own classes)
// is verified with the admin key before touching anything, same reasoning
// as every other teacher-write route in this app.
//
// The token itself is the only "auth" the public report route
// (app/api/reports/shared/[token]) checks — anyone with the link can view
// that one student's report, nothing else. `regenerate: true` invalidates
// the old link immediately (anyone still holding it gets a 404).
export async function POST(request) {
  const { studentId, accessToken, regenerate } = await request.json();

  if (!studentId || !accessToken) {
    return NextResponse.json({ error: "Missing student or session." }, { status: 400 });
  }

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Your session expired — refresh the page and try again." }, { status: 401 });
  }
  const teacherId = userData.user.id;

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, share_token, class_id, classes(teacher_id)")
    .eq("id", studentId)
    .maybeSingle();
  if (studentError || !student || student.classes?.teacher_id !== teacherId) {
    return NextResponse.json({ error: "That student doesn't belong to one of your classes." }, { status: 403 });
  }

  if (student.share_token && !regenerate) {
    return NextResponse.json({ success: true, token: student.share_token });
  }

  const token = crypto.randomUUID();
  const { error: updateError } = await supabaseAdmin.from("students").update({ share_token: token }).eq("id", studentId);
  if (updateError) {
    return NextResponse.json({ error: "Couldn't create a share link: " + updateError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, token });
}
