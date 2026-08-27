import { supabaseAdmin } from "./supabaseAdmin";

// Returns every assignment visible to this student in their class that
// they have NOT already submitted — in the same order the Home screen has
// always used (most recently assigned first) — respecting per-student
// targeting. An assignment with zero targeting rows is whole-class,
// visible to everyone. An assignment WITH targeting rows is only visible
// to the specific students listed, even though it still belongs to this
// class.
//
// Pulled out of app/home/page.js so app/missions/page.js can show the FULL
// list (Home only ever shows the first 3) without duplicating this logic.
export async function getVisibleAssignmentsForStudent(studentId, classId) {
  const { data: rawAssignments } = await supabaseAdmin
    .from("assignments")
    .select("id, due_date, case_standard, created_at, cases(title, learning_target, subject)")
    .eq("class_id", classId)
    .order("created_at", { ascending: false });

  const assignmentIds = (rawAssignments || []).map((a) => a.id);
  let targetRows = [];
  let completedRows = [];
  if (assignmentIds.length > 0) {
    const [{ data: targeting }, { data: completed }] = await Promise.all([
      supabaseAdmin
        .from("assignment_students")
        .select("assignment_id, student_id")
        .in("assignment_id", assignmentIds),
      // Only a real final submit sets submitted_at (see the fix in
      // /api/submission/save's route — a draft autosave now explicitly
      // leaves it null instead of letting Postgres's column default fill
      // it in). So this only catches assignments the student has actually
      // finished and turned in, not ones they've merely started. Also
      // pulling revision_requested here — a submission the teacher sent
      // back for another try should NOT count as "completed" (it needs to
      // stay visible so the student can get back in and revise it).
      supabaseAdmin
        .from("submissions")
        .select("assignment_id, revision_requested")
        .eq("student_id", studentId)
        .in("assignment_id", assignmentIds)
        .not("submitted_at", "is", null),
    ]);
    targetRows = targeting || [];
    completedRows = completed || [];
  }

  const targetedAssignmentIds = new Set(targetRows.map((t) => t.assignment_id));
  const myTargetedAssignmentIds = new Set(
    targetRows.filter((t) => t.student_id === studentId).map((t) => t.assignment_id)
  );
  const completedAssignmentIds = new Set(
    completedRows.filter((s) => !s.revision_requested).map((s) => s.assignment_id)
  );
  const revisionRequestedAssignmentIds = new Set(
    completedRows.filter((s) => s.revision_requested).map((s) => s.assignment_id)
  );

  return (rawAssignments || [])
    .filter(
      (a) =>
        (!targetedAssignmentIds.has(a.id) || myTargetedAssignmentIds.has(a.id)) &&
        !completedAssignmentIds.has(a.id)
    )
    .map((a) => ({ ...a, revisionRequested: revisionRequestedAssignmentIds.has(a.id) }));
}
