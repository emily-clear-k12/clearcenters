import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import ProgressClient from "./ProgressClient";

export default async function ProgressPage() {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    redirect("/login");
  }

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, first_name, crystal_points, last_progress_check_at")
    .eq("id", studentId)
    .single();

  if (studentError || !student) {
    redirect("/login");
  }

  // Captured BEFORE we mark this visit as "seen" below, so "is this grade
  // new" reflects what was already seen as of the student's last visit to
  // this page, not this one.
  const lastCheck = student.last_progress_check_at || null;

  // Only real, final submissions — draft autosaves never set submitted_at
  // (see the fix in /api/submission/save), so this only shows work the
  // student actually turned in.
  //
  // Intentionally NOT selecting ai_score or ai_rationale here — the AI's
  // read is a teacher-only preview (see the grading page), students should
  // only ever see the teacher's own grade and feedback.
  const { data: submissions } = await supabaseAdmin
    .from("submissions")
    .select("id, assignment_id, submitted_at, released, released_at, teacher_grade, teacher_feedback, revision_requested")
    .eq("student_id", studentId)
    .not("submitted_at", "is", null)
    .order("submitted_at", { ascending: false });

  // Mark this visit as "now" — clears the "new grade" badge everywhere
  // else in the app going forward, without touching the "sent back for
  // revision" flag (that only clears once the student actually resubmits).
  // Awaited (not fire-and-forget) since a serverless function can be torn
  // down right after the response is sent, which would silently drop an
  // un-awaited write.
  try {
    await supabaseAdmin
      .from("students")
      .update({ last_progress_check_at: new Date().toISOString() })
      .eq("id", studentId);
  } catch (err) {
    // A hiccup here shouldn't block the page from loading — worst case the
    // badge takes one extra visit to clear.
  }

  const subs = submissions || [];
  const assignmentIds = [...new Set(subs.map((s) => s.assignment_id).filter(Boolean))];

  let assignments = [];
  if (assignmentIds.length > 0) {
    const { data } = await supabaseAdmin.from("assignments").select("id, case_standard").in("id", assignmentIds);
    assignments = data || [];
  }
  const assignmentMap = Object.fromEntries(assignments.map((a) => [a.id, a]));

  const caseStandards = [...new Set(assignments.map((a) => a.case_standard).filter(Boolean))];
  let cases = [];
  if (caseStandards.length > 0) {
    const { data } = await supabaseAdmin.from("cases").select("standard, title").in("standard", caseStandards);
    cases = data || [];
  }
  const caseMap = Object.fromEntries(cases.map((c) => [c.standard, c]));

  const missions = subs.map((s) => {
    const assignment = assignmentMap[s.assignment_id];
    const caseRow = assignment ? caseMap[assignment.case_standard] : null;
    return {
      id: s.id,
      assignmentId: s.assignment_id,
      caseStandard: assignment ? assignment.case_standard : null,
      caseTitle: caseRow ? caseRow.title : (assignment ? assignment.case_standard : "Mission"),
      submittedAt: s.submitted_at,
      released: !!s.released,
      revisionRequested: !!s.revision_requested,
      isNewGrade: !!(s.released && s.released_at && (!lastCheck || new Date(s.released_at) > new Date(lastCheck))),
      grade: s.released ? s.teacher_grade : null,
      // The revision note and the released-grade note both live in the same
      // teacher_feedback column — show it either way so the student always
      // sees the teacher's most recent note about this mission.
      feedback: s.released || s.revision_requested ? s.teacher_feedback : null,
    };
  });

  return <ProgressClient student={student} missions={missions} />;
}
