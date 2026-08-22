import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    redirect("/login");
  }

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, first_name, crystal_points, streak_days, class_id")
    .eq("id", studentId)
    .single();

  if (studentError || !student) {
    redirect("/login");
  }

  const { data: studentClass } = await supabaseAdmin
    .from("classes")
    .select("name, class_code")
    .eq("id", student.class_id)
    .single();

  const { data: rawAssignments } = await supabaseAdmin
    .from("assignments")
    .select("id, due_date, case_standard, created_at, cases(title)")
    .eq("class_id", student.class_id)
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

  // An assignment with zero targeting rows is whole-class, visible to
  // everyone. An assignment WITH targeting rows is only visible to the
  // specific students listed — even though it still belongs to this class.
  const targetedAssignmentIds = new Set(targetRows.map((t) => t.assignment_id));
  const myTargetedAssignmentIds = new Set(targetRows.filter((t) => t.student_id === studentId).map((t) => t.assignment_id));

  const assignments = (rawAssignments || []).filter(
    (a) => !targetedAssignmentIds.has(a.id) || myTargetedAssignmentIds.has(a.id)
  );

  const { count: missionsCompleted } = await supabaseAdmin
    .from("submissions")
    .select("id", { count: "exact", head: true })
    .eq("student_id", studentId);

  return (
    <HomeClient
      student={student}
      studentClass={studentClass}
      assignments={assignments || []}
      missionsCompleted={missionsCompleted || 0}
    />
  );
}
