import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { getVisibleAssignmentsForStudent, isClearKeysAlwaysOn } from "../../lib/getStudentAssignments";
import MissionsClient from "./MissionsClient";

export default async function MissionsPage() {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    redirect("/login");
  }

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, first_name, crystal_points, class_id, equipped_sam_skin, sam_nickname")
    .eq("id", studentId)
    .single();

  if (studentError || !student) {
    redirect("/login");
  }

  const assignments = (await getVisibleAssignmentsForStudent(studentId, student.class_id)).filter((a) => !isClearKeysAlwaysOn(a.case_standard));

  return <MissionsClient student={student} assignments={assignments} />;
}
