import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

// Powers the small badges in the student nav ("Progress") and the banner on
// Home — a lightweight read-only count, not the source of truth for any
// page's own content. Three things count toward it, but `count` itself
// stays grades+revisions only (unchanged) since that's what the Home
// banner's sentence is built around — `unreadMessageCount` is returned
// separately for the small envelope badge (Feature 5) to use on its own:
//   1. Missions the teacher sent back for revision — these stay "flagged"
//      the whole time they're waiting on the student, and only clear
//      themselves when the student actually resubmits (handled elsewhere,
//      in /api/submission/submit).
//   2. Missions with a grade released since the student last opened "My
//      Progress" — these are informational and clear the moment the
//      student visits that page (see app/progress/page.js), tracked via
//      students.last_progress_check_at.
//   3. Unread messages/announcements from their teacher (Feature 5) —
//      clear the moment the student opens /messages (see that page).
//      `teacher_messages` is a brand-new table, so this is wrapped so a
//      not-yet-run migration degrades to 0 instead of breaking the whole
//      endpoint (and the existing grades/revisions badge along with it).
export async function GET() {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const { data: student } = await supabaseAdmin
    .from("students")
    .select("last_progress_check_at")
    .eq("id", studentId)
    .single();

  const lastCheck = student?.last_progress_check_at || null;

  const { data: subs } = await supabaseAdmin
    .from("submissions")
    .select("id, released, released_at, revision_requested")
    .eq("student_id", studentId)
    .not("submitted_at", "is", null);

  const list = subs || [];
  const revisionCount = list.filter((s) => s.revision_requested).length;
  const newGradeCount = list.filter(
    (s) => s.released && s.released_at && (!lastCheck || new Date(s.released_at) > new Date(lastCheck))
  ).length;

  const { data: unreadMessages, error: messagesError } = await supabaseAdmin
    .from("teacher_messages")
    .select("id")
    .eq("student_id", studentId)
    .is("read_at", null);
  if (messagesError) {
    console.error("Notifications: 'teacher_messages' not available yet (migration likely not run) — unreadMessageCount defaulting to 0:", messagesError);
  }
  const unreadMessageCount = messagesError ? 0 : (unreadMessages || []).length;

  return NextResponse.json({
    count: revisionCount + newGradeCount,
    revisionCount,
    newGradeCount,
    unreadMessageCount,
  });
}
