import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

// SERVER ONLY. Feature 5 of the teacher-efficiency build (see
// Teacher_SiteWide_Redesign_Plan.md) — sends either a class-wide
// announcement or a direct nudge to one student. Admin-key + explicit
// ownership verification, same reasoning as every other teacher-write
// route in this app (assignment delete, roster add/remove/transfer,
// share-link): RLS has silently no-op'd writes before instead of failing
// loudly, and a message that silently never sends is a bad failure mode.
//
// One row per recipient (`teacher_messages`), all sharing one `batch_id`
// per send — same "fan out to a row per student" shape already used for
// submissions/assignment targeting elsewhere in this app, so read state
// ("has this student seen it") is a plain column on their own row rather
// than needing a separate read-receipts table.
export async function POST(request) {
  const { classId, studentId, body, accessToken } = await request.json();

  if (!classId || !body || !body.trim() || !accessToken) {
    return NextResponse.json({ error: "Missing class, message, or session." }, { status: 400 });
  }
  const trimmedBody = body.trim().slice(0, 2000);

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Your session expired — refresh the page and try again." }, { status: 401 });
  }
  const teacherId = userData.user.id;

  const { data: cls, error: classError } = await supabaseAdmin
    .from("classes")
    .select("id, teacher_id")
    .eq("id", classId)
    .maybeSingle();
  if (classError || !cls || cls.teacher_id !== teacherId) {
    return NextResponse.json({ error: "That class doesn't belong to you." }, { status: 403 });
  }

  let targetIds = [];
  const isBroadcast = !studentId;

  if (isBroadcast) {
    // Same "SQL delivered != SQL run" hardening as Roster Management and
    // Curriculum Analytics — `active` may not exist yet, so fall back to
    // messaging everyone in the class rather than erroring out.
    let { data: students, error: studentsError } = await supabaseAdmin
      .from("students")
      .select("id, active")
      .eq("class_id", classId);
    if (studentsError) {
      const fallback = await supabaseAdmin.from("students").select("id").eq("class_id", classId);
      students = (fallback.data || []).map((s) => ({ ...s, active: true }));
    } else {
      students = (students || []).map((s) => ({ ...s, active: s.active !== false }));
    }
    targetIds = students.filter((s) => s.active).map((s) => s.id);
    if (targetIds.length === 0) {
      return NextResponse.json({ error: "No active students in this class to message." }, { status: 400 });
    }
  } else {
    const { data: student, error: studentError } = await supabaseAdmin
      .from("students")
      .select("id, class_id, active")
      .eq("id", studentId)
      .maybeSingle();
    if (studentError || !student || student.class_id !== classId) {
      return NextResponse.json({ error: "That student isn't in this class." }, { status: 403 });
    }
    if (student.active === false) {
      return NextResponse.json({ error: "That student has been removed from the roster." }, { status: 400 });
    }
    targetIds = [studentId];
  }

  const batchId = crypto.randomUUID();
  const rows = targetIds.map((sid) => ({
    batch_id: batchId,
    teacher_id: teacherId,
    class_id: classId,
    student_id: sid,
    is_broadcast: isBroadcast,
    body: trimmedBody,
  }));

  const { error: insertError } = await supabaseAdmin.from("teacher_messages").insert(rows);
  if (insertError) {
    return NextResponse.json({ error: "Couldn't send that: " + insertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, batchId, recipientCount: targetIds.length });
}
