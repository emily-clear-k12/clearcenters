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
    .select("id, first_name, crystal_points")
    .eq("id", studentId)
    .single();

  if (studentError || !student) {
    redirect("/login");
  }

  // Only real, final submissions — draft autosaves never set submitted_at
  // (see the fix in /api/submission/save), so this only shows work the
  // student actually turned in.
  //
  // Intentionally NOT selecting ai_score or ai_rationale here — the AI's
  // read is a teacher-only preview (see the grading page), students should
  // only ever see the teacher's own grade and feedback.
  const { data: submissions } = await supabaseAdmin
    .from("submissions")
    .select("id, assignment_id, submitted_at, released, teacher_grade, teacher_feedback, revision_requested")
    .eq("student_id", studentId)
    .not("submitted_at", "is", null)
    .order("submitted_at", { ascending: false });

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
      grade: s.released ? s.teacher_grade : null,
      // The revision note and the released-grade note both live in the same
      // teacher_feedback column — show it either way so the student always
      // sees the teacher's most recent note about this mission.
      feedback: s.released || s.revision_requested ? s.teacher_feedback : null,
    };
  });

  return <ProgressClient student={student} missions={missions} />;
}
