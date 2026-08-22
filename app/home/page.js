import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { getVisibleAssignmentsForStudent } from "../../lib/getStudentAssignments";
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

  const assignments = await getVisibleAssignmentsForStudent(studentId, student.class_id);

  // Only count real, final submissions — not draft rows created by
  // autosave while a student is still mid-activity (see the submitted_at
  // fix in /api/submission/save).
  const { count: missionsCompleted } = await supabaseAdmin
    .from("submissions")
    .select("id", { count: "exact", head: true })
    .eq("student_id", studentId)
    .not("submitted_at", "is", null);

  return (
    <HomeClient
      student={student}
      studentClass={studentClass}
      assignments={assignments || []}
      missionsCompleted={missionsCompleted || 0}
    />
  );
}
