import { supabaseAdmin } from "./supabaseAdmin";

// Returns every assignment visible to this student in their class, in the
// same order the Home screen has always used (most recently assigned
// first) — respecting per-student targeting. An assignment with zero
// targeting rows is whole-class, visible to everyone. An assignment WITH
// targeting rows is only visible to the specific students listed, even
// though it still belongs to this class.
//
// Pulled out of app/home/page.js so app/missions/page.js can show the FULL
// list (Home only ever shows the first 3) without duplicating this logic.
export async function getVisibleAssignmentsForStudent(studentId, classId) {
  const { data: rawAssignments } = await supabaseAdmin
    .from("assignments")
    .select("id, due_date, case_standard, created_at, cases(title)")
    .eq("class_id", classId)
    .order("created_at", { ascending: false });

  const assignmentIds = (rawAssignments || []).map((a) => a.id);
  let targetRows = [];
  if (assignmentIds.length > 0) {
    const { data } = await supabaseAdmin
      .from("assignment_students")
      .select("assignment_id, student_id")
      .in("assignment_id", assignmentIds);
    targetRows = data || [];
  }

  const targetedAssignmentIds = new Set(targetRows.map((t) => t.assignment_id));
  const myTargetedAssignmentIds = new Set(
    targetRows.filter((t) => t.student_id === studentId).map((t) => t.assignment_id)
  );

  return (rawAssignments || []).filter(
    (a) => !targetedAssignmentIds.has(a.id) || myTargetedAssignmentIds.has(a.id)
  );
}
