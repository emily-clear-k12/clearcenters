import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { assignmentId, ...fields } = await request.json();
  if (!assignmentId) {
    return NextResponse.json({ error: "Missing assignmentId." }, { status: 400 });
  }

  // Upsert: create the draft submission row if it doesn't exist yet, or
  // update whichever fields were passed if it does.
  const { data: existing } = await supabaseAdmin
    .from("submissions")
    .select("id")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabaseAdmin.from("submissions").update(fields).eq("id", existing.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    // IMPORTANT: submitted_at must be explicitly null here. The submissions
    // table has "submitted_at timestamp default now()" — if this column is
    // left out of the insert entirely, Postgres fills it in with the
    // current time on its own, which silently marked a DRAFT save (the
    // very first autosave, e.g. right after finishing the Organizer step)
    // as "already submitted." That made the app treat a student as done
    // with the whole activity after just Read + Organizer, dropping them
    // straight to the Share screen if they ever came back to it. Only
    // /api/submission/submit should ever set a real submitted_at.
    const { error } = await supabaseAdmin.from("submissions").insert({ assignment_id: assignmentId, student_id: studentId, submitted_at: null, ...fields });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
