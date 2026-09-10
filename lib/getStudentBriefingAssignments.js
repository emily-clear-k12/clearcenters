import { supabaseAdmin } from "./supabaseAdmin";

// Parallel to getVisibleAssignmentsForStudent, but for briefing_* tables.
// Briefings never appear in My Missions — this helper is only used by
// /briefings and /briefing/[assignmentId].

export async function getVisibleBriefingAssignmentsForStudent(studentId, classId) {
  const { data: rawAssignments } = await supabaseAdmin
    .from("briefing_assignments")
    .select("id, due_date, briefing_id, created_at, briefings(id, title, tagline, subject, grade, teks, minutes)")
    .eq("class_id", classId)
    .order("created_at", { ascending: false });

  const assignmentIds = (rawAssignments || []).map((a) => a.id);
  let targetRows = [];
  let submissionRows = [];
  if (assignmentIds.length > 0) {
    const [{ data: targeting }, { data: submissions }] = await Promise.all([
      supabaseAdmin
        .from("briefing_assignment_students")
        .select("assignment_id, student_id")
        .in("assignment_id", assignmentIds),
      supabaseAdmin
        .from("briefing_submissions")
        .select("assignment_id, status, cleared_at, phase_state")
        .eq("student_id", studentId)
        .in("assignment_id", assignmentIds),
    ]);
    targetRows = targeting || [];
    submissionRows = submissions || [];
  }

  const targetedAssignmentIds = new Set(targetRows.map((t) => t.assignment_id));
  const myTargetedAssignmentIds = new Set(
    targetRows.filter((t) => t.student_id === studentId).map((t) => t.assignment_id)
  );
  const byAssignment = Object.fromEntries(
    submissionRows.map((s) => [s.assignment_id, s])
  );

  return (rawAssignments || [])
    .filter(
      (a) => !targetedAssignmentIds.has(a.id) || myTargetedAssignmentIds.has(a.id)
    )
    .map((a) => {
      const sub = byAssignment[a.id];
      let status = "not_started";
      if (sub?.status === "cleared") status = "cleared";
      else if (sub) status = "in_progress";
      return { ...a, status, submission: sub || null };
    });
}
